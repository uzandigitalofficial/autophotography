"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

const STYLE_PRESETS = [
  { id: "RAIN_NEON_CINEMATIC", name: "Rain Neon" },
  { id: "DESERT_HERO_SHOT", name: "Desert Hero" },
  { id: "LUXURY_STUDIO_LIGHTBOX", name: "Studio" },
  { id: "OFFROAD_DOCUMENTARY", name: "Offroad" },
  { id: "TUNNEL_MOTION_BLUR", name: "Tunnel" },
  { id: "GOLDEN_HOUR_SHOWCASE", name: "Golden Hour" },
  { id: "INDUSTRIAL_URBAN_RAW", name: "Industrial" },
  { id: "DEALERSHIP_CLEAN_LISTING", name: "Clean Listing" },
];

type GenerationStep = "prompt" | "generating" | "uploading" | null;

interface PromptInputProps {
  credits: number;
  onResult: (imageUrl: string, generationId: string, cached: boolean, rawPrompt: string) => void;
  onGenerating: (step: GenerationStep) => void;
  onCreditsUpdate: () => void;
}

export function PromptInput({ credits, onResult, onGenerating, onCreditsUpdate }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isLoading || credits < 1) return;
    const rawPrompt = prompt.trim();
    setIsLoading(true);
    setPrompt("");

    try {
      onGenerating("prompt");
      await new Promise((r) => setTimeout(r, 600));
      onGenerating("generating");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: rawPrompt, preset: selectedPreset }),
      });

      onGenerating("uploading");
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Generation failed");

      onResult(data.imageUrl, data.generationId, data.cached, rawPrompt);
      onCreditsUpdate();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      onGenerating(null);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Describe your car shot
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. BMW M4 Competition wet Tokyo street at night, neon reflections"
            rows={3}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Style preset <span className="text-zinc-600">(optional - AI auto-detects)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {STYLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() =>
                  setSelectedPreset(selectedPreset === preset.id ? undefined : preset.id)
                }
                className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedPreset === preset.id
                    ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
                    : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600"
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-zinc-600">{credits} credits remaining</p>
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
