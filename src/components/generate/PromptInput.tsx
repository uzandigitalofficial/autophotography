"use client";

import { useState } from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { StylePreset } from "@prisma/client";
import { PresetSelector } from "./PresetSelector";
import { toast } from "sonner";

interface PromptInputProps {
  onResult: (imageUrl: string, generationId: string, cached: boolean, rawPrompt: string) => void;
  onGenerating: (step: "prompt" | "generating" | "uploading" | null) => void;
  credits: number;
  onCreditsUpdate: () => void;
}

const EXAMPLE_PROMPTS = [
  "BMW M4 Competition rainy night Tokyo street, cinematic",
  "Ferrari 488 Pista desert sunset, hero shot",
  "Porsche 911 GT3 RS Nürburgring tunnel motion blur",
  "Lamborghini Huracán golden hour coastal road",
  "Mercedes AMG G63 off-road mud documentary",
];

export function PromptInput({ onResult, onGenerating, credits, onCreditsUpdate }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [preset, setPreset] = useState<StylePreset | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!prompt.trim() || loading) return;
    if (credits < 1) {
      toast.error("No credits remaining", { description: "Purchase credits to continue." });
      return;
    }

    setLoading(true);
    setError(null);
    onGenerating("prompt");

    try {
      // Simulate step progression for UX
      const promptTimer = setTimeout(() => onGenerating("generating"), 3000);
      const genTimer = setTimeout(() => onGenerating("uploading"), 25000);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), preset }),
      });

      clearTimeout(promptTimer);
      clearTimeout(genTimer);
      onGenerating(null);

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "NO_CREDITS") {
          toast.error("No credits remaining", { description: "Add more credits to generate." });
        } else {
          const msg = data.error ?? "Generation failed";
          setError(msg);
          toast.error("Generation failed", { description: msg });
        }
        return;
      }

      onCreditsUpdate();
      onResult(data.imageUrl, data.generationId, !!data.cached, prompt.trim());

      if (data.cached) {
        toast.success("Loaded from cache", { description: "Identical prompt found — no credit used." });
      } else {
        toast.success("Image generated!");
      }
    } catch (err) {
      onGenerating(null);
      const msg = "Network error — please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  function useExample() {
    const random = EXAMPLE_PROMPTS[Math.floor(Math.random() * EXAMPLE_PROMPTS.length)];
    setPrompt(random);
  }

  return (
    <div className="space-y-4">
      {/* Prompt textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-300">Prompt</label>
          <button
            onClick={useExample}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Use example
          </button>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate();
          }}
          placeholder={'Try: "BMW M4 Competition rainy night Tokyo" or "Ferrari desert golden hour"'}
          maxLength={300}
          rows={3}
          className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-colors"
        />
        <div className="flex justify-between text-[11px] text-zinc-600">
          <span>{credits} credit{credits !== 1 ? "s" : ""} remaining</span>
          <span>{prompt.length}/300</span>
        </div>
      </div>

      {/* Preset selector */}
      <PresetSelector selected={preset} onSelect={setPreset} />

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-900/20 border border-red-500/20 px-3 py-2 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || loading || credits < 1}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 shadow-lg shadow-indigo-500/20"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate — 1 credit
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-zinc-600">
        ⌘ + Enter to generate · Credits refunded on failure
      </p>
    </div>
  );
}
