import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { CreditReason } from "@prisma/client";

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = await headers();

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": headerPayload.get("svix-id")!,
      "svix-timestamp": headerPayload.get("svix-timestamp")!,
      "svix-signature": headerPayload.get("svix-signature")!,
    }) as WebhookEvent;
  } catch {
    return new Response("Webhook verification failed", { status: 400 });
  }

  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const email = email_addresses[0]?.email_address ?? "";
    const name = [first_name, last_name].filter(Boolean).join(" ");

    const user = await prisma.user.create({
      data: {
        clerkId: id,
        email,
        name: name || null,
        avatarUrl: image_url,
        credits: 3,
      },
    });

    await prisma.creditLog.create({
      data: {
        userId: user.id,
        delta: 3,
        reason: CreditReason.SIGNUP_BONUS,
      },
    });
  }

  if (event.type === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    await prisma.user.update({
      where: { clerkId: id },
      data: {
        email: email_addresses[0]?.email_address,
        name: [first_name, last_name].filter(Boolean).join(" ") || null,
        avatarUrl: image_url,
      },
    });
  }

  return new Response("OK", { status: 200 });
}
