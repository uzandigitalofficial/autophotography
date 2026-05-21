"use client";

import { useEffect, useState, useCallback } from "react";
import { PromptInput } from "@/components/generate/PromptInput";
import { GenerationResult } from "@/components/generate/GenerationResult";
import { GenerationSkeleton, PromptEngineStatus } from "@/components/generate/GenerationSkeleton";
import { Sparkles } from "lucide-react";

type GenerationStep = "prompt" | "generating" | "uploading" | null;

interface Result {
  imageUrl: string;
  generationId: string;
  cached: boolean;
  rawPrompt: string;
}

export default function DashboardPage() {
  const [credits, setCredits] = useState(0);
  const [step, setStep] = useState<GenerationStep>(null);
  const [result, setResult] = useState<Result | null>(null);

  const fetchCredits = useCallback(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.credits === "number") setCredits(data.credits);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  const isGenerating = step !== null;

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <h1 className="text-xl font-bold text-white">Generate</h1>
        </div>
        <p className="text-sm text-zinc-500">
          Type a car prompt and our AI prompt engine will build the cinematic brief.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: controls */}
        <div>
          <PromptInput
            credits={credits}
            onResult={(imageUrl, generationId, cached, rawPrompt) => {
              setResult({ imageUrl, generationId, cached, rawPrompt });
            }}
            onGenerating={setStep}
            onCreditsUpdate={fetchCredits}
          />
        </div>

        {/* Right: result / status */}
        <div>
          {isGenerating && step && (
            <div className="space-y-4">
              <PromptEngineStatus step={step} />
              <GenerationSkeleton />
            </div>
          )}

          {!isGenerating && result && (
            <GenerationResult
              imageUrl={result.imageUrl}
              generationId={result.generationId}
              rawPrompt={result.rawPrompt}
              cached={result.cached}
            />
          )}

          {!isGenerating && !result && (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 text-center">
              <div className="text-4xl mb-3">📸</div>
              <p className="text-sm text-zinc-500">Your generated image will appear here</p>
              <p className="text-xs text-zinc-700 mt-1">First time? Try an example prompt</p>
            </div>
          )}
        </div>
      </div>

      {/* Tip */}
      <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Prompt tips</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { tip: "Name the car", example: '"BMW M4 Competition" not "sports car"' },
            { tip: "Add a scene", example: '"rainy Tokyo night" or "desert sunset"' },
            { tip: "Pick a preset", example: "Or let AI auto-detect from your description" },
          ].map(({ tip, example }) => (
            <div key={tip} className="text-xs">
              <div className="font-medium text-zinc-300 mb-0.5">{tip}</div>
              <div className="text-zinc-600">{example}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
