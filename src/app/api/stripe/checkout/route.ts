import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const CREDIT_PACKS = [
  { credits: 10, priceId: process.env.STRIPE_PRICE_10_CREDITS!, label: "10 Credits" },
  { credits: 30, priceId: process.env.STRIPE_PRICE_30_CREDITS!, label: "30 Credits" },
  { credits: 100, priceId: process.env.STRIPE_PRICE_100_CREDITS!, label: "100 Credits" },
];

const checkoutSchema = z.object({
  credits: z.number().int().positive(),
});

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-04-10" as never });
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { credits } = parsed.data;
  const pack = CREDIT_PACKS.find((p) => p.credits === credits);
  if (!pack) {
    return NextResponse.json({ error: "Invalid credit pack" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: pack.priceId, quantity: 1 }],
    metadata: { userId: user.id, credits: String(credits) },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?cancelled=true`,
    customer_email: user.email,
  });

  return NextResponse.json({ url: session.url });
}
