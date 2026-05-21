"use client";

import { Zap } from "lucide-react";

interface CreditsBadgeProps {
  credits: number;
}

export function CreditsBadge({ credits }: CreditsBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm">
      <Zap className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
      <span className="font-semibold text-white">{credits}</span>
      <span className="text-zinc-500">credits</span>
    </div>
  );
}
