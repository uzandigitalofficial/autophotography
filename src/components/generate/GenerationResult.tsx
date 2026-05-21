"use client";

import Image from "next/image";

interface GenerationResultProps {
  imageUrl: string;
  generationId: string;
  rawPrompt: string;
  cached?: boolean;
}

export function GenerationResult({ imageUrl, rawPrompt, cached }: GenerationResultProps) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden">
      <div className="relative aspect-video bg-[#F3F4F6]">
        <Image src={imageUrl} alt={rawPrompt} fill className="object-cover" priority />
        {cached && (
          <div className="absolute top-3 right-3 rounded-full border border-[#E5E7EB] bg-white/90 px-2.5 py-1 text-xs text-gray-500 backdrop-blur-sm">
            Cached result
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{rawPrompt}</p>
        <div className="flex gap-3">
          <a
            href={imageUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#E8002D] px-4 py-2 text-sm font-medium text-white hover:bg-[#C5001F] transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
            Download
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(imageUrl)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#F3F4F6] transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>link</span>
            Copy link
          </button>
        </div>
      </div>
    </div>
  );
}
