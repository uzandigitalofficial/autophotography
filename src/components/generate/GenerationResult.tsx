"use client";

import Image from "next/image";
import { useState } from "react";
import { Download, Share2, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  imageUrl: string;
  generationId: string;
  rawPrompt: string;
  cached?: boolean;
}

export function GenerationResult({ imageUrl, generationId, rawPrompt, cached }: Props) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleDownload() {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `autophotography-${generationId}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Image downloaded!");
    } catch {
      toast.error("Download failed. Try right-clicking the image.");
    }
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    toast.success("Image URL copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-video w-full rounded-xl overflow-hidden ring-1 ring-zinc-700 shadow-2xl shadow-black/40 group">
        <Image
          src={imageUrl}
          alt={rawPrompt || "Generated car"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {cached && (
          <div className="absolute top-2 right-2 rounded-full bg-black/60 backdrop-blur-sm px-2 py-1 text-[10px] text-zinc-400 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Cached
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all"
        >
          <Download className="h-4 w-4" /> Download
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all"
        >
          {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
        </button>
      </div>
      <button
        onClick={() => setShowPrompt((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <span>View structured prompt</span>
        {showPrompt ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {showPrompt && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3">
          <p className="text-[11px] text-zinc-500 leading-relaxed font-mono break-words">
            {rawPrompt || "Structured prompt not available for this generation."}
          </p>
        </div>
      )}
    </div>
  );
}
