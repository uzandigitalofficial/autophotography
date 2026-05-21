import { prisma } from "./prisma";
import { CreditReason } from "@prisma/client";

export const CREDIT_COSTS = {
  STANDARD_GENERATION: 1,
} as const;

export const CREDIT_LIMITS = {
  FREE: 3,
  PRO: 50,
  UNLIMITED: 999999,
} as const;

export async function hasEnoughCredits(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  return (user?.credits ?? 0) >= CREDIT_COSTS.STANDARD_GENERATION;
}

export async function deductCredit(userId: string, generationId: string): Promise<void> {
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { credits: { decrement: CREDIT_COSTS.STANDARD_GENERATION } },
    }),
    prisma.creditLog.create({
      data: {
        userId,
        delta: -CREDIT_COSTS.STANDARD_GENERATION,
        reason: CreditReason.GENERATION_USED,
        referenceId: generationId,
      },
    }),
  ]);
}

export async function addCredits(
  userId: string,
  amount: number,
  reason: CreditReason,
  referenceId?: string
): Promise<void> {
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } },
    }),
    prisma.creditLog.create({
      data: { userId, delta: amount, reason, referenceId },
    }),
  ]);
}
