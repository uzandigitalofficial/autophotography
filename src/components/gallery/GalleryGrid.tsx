"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Generation {
  id: string;
  imageUrl: string | null;
  rawPrompt: string;
  stylePreset: string;
  createdAt: string;
}

interface GalleryGridProps {
  generations: Generation[];
}

export function GalleryGrid({ generations }: GalleryGridProps) {
  const [selected, setSelected] = useState<Generation | null>(null);

  if (generations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">??</div>
        <h3 className="text-lg font-semibold mb-2">No generations yet</h3>
        <p className="text-zinc-500 text-sm">Head to the dashboard and generate your first car image.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {generations.map((gen) => (
          <button
            key={gen.id}
            onClick={() => setSelected(gen)}
            className="group relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-indigo-500/50 transition-all"
          >
            {gen.imageUrl ? (
              <Image
                src={gen.imageUrl}
                alt={gen.rawPrompt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-xs">No image</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
              <p className="text-xs text-white line-clamp-2">{gen.rawPrompt}</p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative max-w-3xl w-full rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {selected.imageUrl && (
              <div className="relative aspect-video">
                <Image src={selected.imageUrl} alt={selected.rawPrompt} fill className="object-cover" />
              </div>
            )}
            <div className="p-5">
              <p className="text-sm text-zinc-300 mb-3">{selected.rawPrompt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(new Date(selected.createdAt), "MMM d, yyyy")}
                </div>
                {selected.imageUrl && (
                  <a
                    href={selected.imageUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
