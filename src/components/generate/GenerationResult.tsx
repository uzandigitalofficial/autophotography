"use client";

import Image from "next/image";
import { Download, Share2, Sparkles } from "lucide-react";

interface GenerationResultProps {
  imageUrl: string;
  prompt: string;
  cached?: boolean;
}

export function GenerationResult({ imageUrl, prompt, cached }: GenerationResultProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="relative aspect-video bg-zinc-950">
        <Image
          src={imageUrl}
          alt={prompt}
          fill
          className="object-cover"
          priority
        />
        {cached && (
          <div className="absolute top-3 right-3 rounded-full border border-zinc-700 bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-400 backdrop-blur-sm">
            Cached result
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{prompt}</p>
        <div className="flex gap-3">
          <a
            href={imageUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
          >
            <Download className="h-4 w-4" /> Download
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(imageUrl)}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <Share2 className="h-4 w-4" /> Copy link
          </button>
        </div>
      </div>
    </div>
  );
}
