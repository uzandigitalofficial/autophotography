"use client";

import { useEffect, useState } from "react";

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
    <div className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#F3F4F6] px-3 py-1 text-sm w-fit">
      <span className="material-symbols-outlined text-[#E8002D]" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>bolt</span>
      <span className="font-semibold text-black">
        {credits === null ? "..." : credits}
      </span>
      <span className="text-gray-500">credits</span>
    </div>
  );
}
