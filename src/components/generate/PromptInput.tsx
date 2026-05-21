"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

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
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Describe your car shot
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. BMW M4 Competition wet Tokyo street at night, neon reflections"
            rows={3}
            className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:border-[#E8002D] focus:outline-none focus:ring-2 focus:ring-[#E8002D]/20 resize-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Style preset <span className="text-gray-400">(optional — AI auto-detects)</span>
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
                    ? "border-[#E8002D] bg-[#E8002D]/5 text-[#E8002D]"
                    : "border-[#E5E7EB] bg-[#F3F4F6] text-gray-600 hover:border-[#E8002D]/40"
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-gray-400">{credits} credits remaining</p>
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading || credits < 1}
            className="inline-flex items-center gap-2 rounded-xl bg-[#E8002D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#C5001F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>auto_awesome</span>
                Generate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
