"use client";

import { useEffect, useState } from "react";
import { Coins } from "lucide-react";

export function CreditsBadge() {
  const [credits, setCredits] = useState<number | null>(null);
  const [plan, setPlan] = useState<string>("FREE");

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => {
        if (data.credits !== undefined) setCredits(data.credits);
        if (data.plan) setPlan(data.plan);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2">
      <Coins className="h-3.5 w-3.5 text-amber-400" />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-white">
          {credits === null ? "—" : credits === 999999 ? "∞" : credits}{" "}
          credit{credits !== 1 ? "s" : ""}
        </div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-wide">{plan} plan</div>
      </div>
    </div>
  );
}
