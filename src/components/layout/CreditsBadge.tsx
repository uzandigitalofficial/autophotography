"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export function CreditsBadge() {
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.credits === "number") setCredits(data.credits);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm w-fit">
      <Zap className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
      <span className="font-semibold text-white">
        {credits === null ? "..." : credits}
      </span>
      <span className="text-zinc-500">credits</span>
    </div>
  );
}
