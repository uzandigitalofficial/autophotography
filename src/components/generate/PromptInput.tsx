"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

const STYLE_PRESETS = [
  { id: "RAIN_NEON_CINEMATIC", name: "Rain Neon", emoji: "???" },
  { id: "DESERT_HERO_SHOT", name: "Desert Hero", emoji: "???" },
  { id: "LUXURY_STUDIO_LIGHTBOX", name: "Studio", emoji: "??" },
  { id: "OFFROAD_DOCUMENTARY", name: "Offroad", emoji: "??" },
  { id: "TUNNEL_MOTION_BLUR", name: "Tunnel", emoji: "?" },
  { id: "GOLDEN_HOUR_SHOWCASE", name: "Golden Hour", emoji: "??" },
  { id: "INDUSTRIAL_URBAN_RAW", name: "Industrial", emoji: "??" },
  { id: "DEALERSHIP_CLEAN_LISTING", name: "Clean Listing", emoji: "??" },
];

interface PromptInputProps {
  onGenerate: (prompt: string, preset?: string) => Promise<void>;
  isLoading: boolean;
  credits: number;
}

export function PromptInput({ onGenerate, isLoading, credits }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(undefined);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isLoading || credits < 1) return;
    await onGenerate(prompt.trim(), selectedPreset);
    setPrompt("");
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Describe your car shot</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='e.g. "BMW M4 Competition wet Tokyo street at night, neon reflections"'
            rows={3}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Style preset <span className="text-zinc-600">(optional — AI will auto-detect)</span></label>
          <div className="flex flex-wrap gap-2">
            {STYLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedPreset(selectedPreset === preset.id ? undefined : preset.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedPreset === preset.id
                    ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
                    : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600"
                }`}
              >
                {preset.emoji} {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-zinc-600">1 credit per generation · {credits} remaining</p>
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading || credits < 1}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="h-4 w-4" /> Generate</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
