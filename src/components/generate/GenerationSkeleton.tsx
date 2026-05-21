"use client";

import { Loader2, Brain, Camera, Sparkles } from "lucide-react";

export function GenerationSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden animate-pulse">
      <div className="aspect-video bg-zinc-800 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-zinc-600 animate-spin" />
      </div>
      <div className="p-5 space-y-3">
        <div className="h-3 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800 rounded w-1/2" />
      </div>
    </div>
  );
}

interface PromptEngineStatusProps {
  stage: "prompt" | "generating" | "uploading";
}

export function PromptEngineStatus({ stage }: PromptEngineStatusProps) {
  const stages = [
    { id: "prompt", icon: Brain, label: "Engineering your prompt", desc: "Car Visual Director AI is structuring your brief" },
    { id: "generating", icon: Camera, label: "Generating image", desc: "FLUX.1 is rendering your cinematic shot" },
    { id: "uploading", icon: Sparkles, label: "Finalising", desc: "Saving to your gallery" },
  ];

  const currentIndex = stages.findIndex((s) => s.id === stage);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-4">
        {stages.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === currentIndex;
          const isDone = i < currentIndex;
          return (
            <div key={s.id} className={`flex items-start gap-4 transition-all ${isActive ? "opacity-100" : isDone ? "opacity-40" : "opacity-20"}`}>
              <div className={`rounded-xl p-2.5 ${isActive ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-zinc-800"}`}>
                {isActive ? (
                  <Loader2 className="h-5 w-5 text-indigo-400 animate-spin" />
                ) : (
                  <Icon className="h-5 w-5 text-zinc-500" />
                )}
              </div>
              <div>
                <p className={`text-sm font-medium ${isActive ? "text-white" : "text-zinc-500"}`}>{s.label}</p>
                {isActive && <p className="text-xs text-zinc-500 mt-0.5">{s.desc}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
