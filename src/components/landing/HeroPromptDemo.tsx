"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

const DEMO_PROMPTS = [
  "BMW M4 Competition wet Tokyo street at night, neon reflections",
  "Lamborghini Huracan desert dunes at sunset, golden hour",
  "Porsche 911 GT3 RS studio white background, perfect lighting",
  "Range Rover Sport muddy mountain trail, overcast sky",
  "Ferrari SF90 underground tunnel motion blur, red speed",
];

export function HeroPromptDemo() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [placeholder, setPlaceholder] = useState(DEMO_PROMPTS[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/sign-up");
  }

  function handleFocus() {
    const random = DEMO_PROMPTS[Math.floor(Math.random() * DEMO_PROMPTS.length)];
    setPlaceholder(random);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl mb-12">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-lg shadow-indigo-500/20"
        >
          Generate free <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-3 text-xs text-zinc-600 text-center">
        3 free credits on signup - No credit card required
      </p>
    </form>
  );
}
