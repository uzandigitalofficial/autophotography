"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const DEMO_PROMPTS = [
  "BMW M4 Competition rainy night Tokyo street",
  "Ferrari 488 Pista desert golden hour hero shot",
  "Porsche 911 GT3 RS tunnel motion blur",
  "Lamborghini Huracán coastal sunset showcase",
  "Mercedes AMG G63 offroad documentary mud",
];

export function HeroPromptDemo() {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = DEMO_PROMPTS[current];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 40);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 18);
        return () => clearTimeout(t);
      } else {
        setCurrent((c) => (c + 1) % DEMO_PROMPTS.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, current]);

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="flex gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/80 p-2 backdrop-blur-sm shadow-2xl">
        <div className="flex-1 px-4 py-3 text-sm text-zinc-300 min-h-[44px] flex items-center">
          <span>{displayed}</span>
          <span className="ml-0.5 inline-block w-0.5 h-4 bg-indigo-400 animate-pulse" />
        </div>
        <Link
          href="/sign-up"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors whitespace-nowrap"
        >
          Try free <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <p className="mt-2 text-xs text-zinc-600 text-center">3 free credits on signup — no card required</p>
    </div>
  );
}
