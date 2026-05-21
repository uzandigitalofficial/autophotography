import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { buildStructuredPrompt } from "@/lib/prompt-engine";
import { generateCarImage } from "@/lib/image-generator";
import { hasEnoughCredits, deductCredit } from "@/lib/credits";
import { StylePreset, GenerationStatus, CreditReason } from "@prisma/client";

const generateSchema = z.object({
  prompt: z.string().min(3).max(300),
  preset: z.nativeEnum(StylePreset).optional(),
});

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }

  const { prompt, preset } = parsed.data;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const hasCreds = await hasEnoughCredits(user.id);
  if (!hasCreds) {
    return NextResponse.json(
      { error: "Insufficient credits", code: "NO_CREDITS" },
      { status: 402 }
    );
  }

  // Dedup check — same prompt+preset generated in last 24h?
  const promptHash = crypto
    .createHash("sha256")
    .update(`${prompt.toLowerCase().trim()}::${preset ?? "auto"}`)
    .digest("hex");

  const recent = await prisma.generation.findFirst({
    where: {
      userId: user.id,
      promptHash,
      status: GenerationStatus.COMPLETED,
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
  });

  if (recent) {
    return NextResponse.json({
      generationId: recent.id,
      imageUrl: recent.imageUrl,
      cached: true,
    });
  }

  const generation = await prisma.generation.create({
    data: {
      userId: user.id,
      rawPrompt: prompt,
      stylePreset: preset ?? "RAIN_NEON_CINEMATIC",
      status: GenerationStatus.PENDING,
      promptHash,
    },
  });

  await deductCredit(user.id, generation.id);

  try {
    await prisma.generation.update({
      where: { id: generation.id },
      data: { status: GenerationStatus.PROCESSING },
    });

    const structured = await buildStructuredPrompt(prompt, preset);

    await prisma.structuredPrompt.create({
      data: {
        generationId: generation.id,
        subjectLock: structured.subjectLock,
        cameraSystem: structured.cameraSystem,
        lightingDesign: structured.lightingDesign,
        environment: structured.environment,
        materials: structured.materials,
        cinematicStyle: structured.cinematicStyle,
        qualityFlags: structured.qualityFlags,
        finalPrompt: structured.finalPrompt,
        negativePrompt: structured.negativePrompt,
      },
    });

    await prisma.generation.update({
      where: { id: generation.id },
      data: {
        carMake: structured.carMake,
        carModel: structured.carModel,
        carYear: structured.carYear,
        stylePreset: structured.detectedPreset,
        promptTokens: structured.tokensUsed,
      },
    });

    const result = await generateCarImage(
      structured.finalPrompt,
      structured.negativePrompt,
      generation.id
    );

    await prisma.generation.update({
      where: { id: generation.id },
      data: {
        imageUrl: result.imageUrl,
        imagePath: result.imagePath,
        replicateId: result.replicateId,
        status: GenerationStatus.COMPLETED,
      },
    });

    return NextResponse.json({
      generationId: generation.id,
      imageUrl: result.imageUrl,
      cached: false,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    await prisma.generation.update({
      where: { id: generation.id },
      data: { status: GenerationStatus.FAILED, errorMessage },
    });

    // Refund the credit
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { credits: { increment: 1 } },
      }),
      prisma.creditLog.create({
        data: {
          userId: user.id,
          delta: 1,
          reason: CreditReason.REFUND,
          referenceId: generation.id,
        },
      }),
    ]);

    return NextResponse.json(
      { error: "Generation failed. Credit refunded.", detail: errorMessage },
      { status: 500 }
    );
  }
}
