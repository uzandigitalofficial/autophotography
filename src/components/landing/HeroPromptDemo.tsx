"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSubmit} className="w-full">
      <label className="block text-xs font-medium text-gray-400 mb-2">Try a prompt</label>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#E8002D] focus:outline-none focus:ring-2 focus:ring-[#E8002D]/20 text-sm transition-all"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E8002D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#C5001F] transition-colors whitespace-nowrap w-full"
        >
          Generate free
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-600 text-center">
        3 free credits on signup
      </p>
    </form>
  );
}
