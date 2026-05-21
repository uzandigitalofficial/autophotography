import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GenerationStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 50);
  const skip = (page - 1) * limit;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [generations, total] = await prisma.$transaction([
    prisma.generation.findMany({
      where: { userId: user.id, status: GenerationStatus.COMPLETED },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        imageUrl: true,
        thumbnailUrl: true,
        rawPrompt: true,
        stylePreset: true,
        carMake: true,
        carModel: true,
        carYear: true,
        createdAt: true,
      },
    }),
    prisma.generation.count({
      where: { userId: user.id, status: GenerationStatus.COMPLETED },
    }),
  ]);

  return NextResponse.json({ generations, total, page, pages: Math.ceil(total / limit) });
}
