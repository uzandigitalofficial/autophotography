import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { addCredits } from "@/lib/credits";
import { CreditReason, Plan } from "@prisma/client";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-04-10" as never });
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const obj = event.data.object as unknown as Record<string, unknown>;

  switch (event.type) {
    case "checkout.session.completed": {
      const metadata = (obj.metadata ?? {}) as Record<string, string>;
      const userId = metadata.userId;
      const creditAmount = parseInt(metadata.credits ?? "0");
      if (userId && creditAmount > 0) {
        await addCredits(userId, creditAmount, CreditReason.PURCHASE, String(obj.id));
      }
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.created": {
      const metadata = (obj.metadata ?? {}) as Record<string, string>;
      const userId = metadata.userId;
      if (userId) {
        const items = (obj.items as { data: Array<{ price?: { lookup_key?: string } }> })?.data ?? [];
        const lookupKey = items[0]?.price?.lookup_key?.toUpperCase();
        const planName = (lookupKey as Plan) ?? Plan.PRO;
        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: planName,
            stripeSubscriptionId: String(obj.id),
            credits: planName === "UNLIMITED" ? 999999 : 50,
          },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const metadata = (obj.metadata ?? {}) as Record<string, string>;
      const userId = metadata.userId;
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { plan: Plan.FREE, credits: 0, stripeSubscriptionId: null },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
