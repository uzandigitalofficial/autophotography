export function GenerationSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="aspect-video w-full rounded-xl bg-zinc-900 border border-zinc-800" />
      <div className="h-3 w-3/4 rounded bg-zinc-800" />
      <div className="flex gap-2">
        <div className="h-10 flex-1 rounded-lg bg-zinc-900" />
        <div className="h-10 w-12 rounded-lg bg-zinc-900" />
      </div>
    </div>
  );
}

export function PromptEngineStatus({ step }: { step: "prompt" | "generating" | "uploading" }) {
  const steps = [
    { id: "prompt", label: "Building cinematic brief", icon: "🧠" },
    { id: "generating", label: "Rendering with FLUX.1", icon: "🎨" },
    { id: "uploading", label: "Saving to CDN", icon: "☁️" },
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-3">
      {steps.map((s) => {
        const isActive = s.id === step;
        const isDone =
          (step === "generating" && s.id === "prompt") ||
          (step === "uploading" && s.id !== "uploading");

        return (
          <div key={s.id} className="flex items-center gap-3">
            <span className="text-base">{s.icon}</span>
            <span
              className={
                isDone
                  ? "text-sm text-zinc-500 line-through"
                  : isActive
                  ? "text-sm text-white font-medium"
                  : "text-sm text-zinc-600"
              }
            >
              {s.label}
            </span>
            {isActive && (
              <div className="ml-auto flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
            {isDone && <span className="ml-auto text-emerald-500 text-xs">✓</span>}
          </div>
        );
      })}
    </div>
  );
}
