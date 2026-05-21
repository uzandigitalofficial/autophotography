"use client";

import { useState } from "react";
import Image from "next/image";
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
        <span className="material-symbols-outlined text-gray-300 mb-4" style={{ fontSize: 48 }}>collections</span>
        <h3 className="text-lg font-semibold text-black mb-2">Your gallery is empty</h3>
        <p className="text-gray-500 text-sm">
          Head to the dashboard and generate your first car image.
        </p>
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
            className="group relative aspect-video rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#F3F4F6] hover:border-[#E8002D]/40 transition-all"
          >
            {gen.imageUrl ? (
              <Image
                src={gen.imageUrl}
                alt={gen.rawPrompt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                No image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
              <p className="text-xs text-white line-clamp-2">{gen.rawPrompt}</p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.imageUrl && (
              <div className="relative aspect-video">
                <Image
                  src={selected.imageUrl}
                  alt={selected.rawPrompt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-5">
              <p className="text-sm text-gray-700 mb-3">{selected.rawPrompt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>calendar_today</span>
                  {format(new Date(selected.createdAt), "MMM d, yyyy")}
                </div>
                {selected.imageUrl && (
                  <a
                    href={selected.imageUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#E8002D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#C5001F] transition-colors"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>download</span>
                    Download
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
