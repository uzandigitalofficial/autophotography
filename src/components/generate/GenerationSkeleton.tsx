"use client";

import { Loader2 } from "lucide-react";

export function GenerationSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden">
      <div className="aspect-video bg-[#F3F4F6] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-gray-300 animate-spin" />
      </div>
      <div className="p-5 space-y-3">
        <div className="h-3 bg-[#E5E7EB] rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-[#E5E7EB] rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}

type GenerationStep = "prompt" | "generating" | "uploading" | null;

interface PromptEngineStatusProps {
  step: GenerationStep;
}

const STAGES = [
  { id: "prompt", icon: "psychology", label: "Engineering your prompt", desc: "Car Visual Director AI is structuring your brief" },
  { id: "generating", icon: "photo_camera", label: "Generating image", desc: "Cinematic image engine is rendering your shot" },
  { id: "uploading", icon: "auto_awesome", label: "Finalising", desc: "Saving to your gallery" },
];

export function PromptEngineStatus({ step }: PromptEngineStatusProps) {
  const currentIndex = STAGES.findIndex((s) => s.id === step);

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
      <div className="space-y-4">
        {STAGES.map((s, i) => {
          const isActive = i === currentIndex;
          const isDone = i < currentIndex;
          return (
            <div
              key={s.id}
              className={`flex items-start gap-4 transition-all ${
                isActive ? "opacity-100" : isDone ? "opacity-40" : "opacity-20"
              }`}
            >
              <div className={`rounded-xl p-2.5 ${isActive ? "bg-[#E8002D]/5 border border-[#E8002D]/20" : "bg-[#F3F4F6]"}`}>
                {isActive ? (
                  <Loader2 className="h-5 w-5 text-[#E8002D] animate-spin" />
                ) : (
                  <span className="material-symbols-outlined text-gray-400" style={{ fontSize: 20 }}>{s.icon}</span>
                )}
              </div>
              <div>
                <p className={`text-sm font-medium ${isActive ? "text-black" : "text-gray-500"}`}>{s.label}</p>
                {isActive && <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
