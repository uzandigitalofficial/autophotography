"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GalleryCard } from "./GalleryCard";
import { Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Generation {
  id: string;
  imageUrl: string;
  rawPrompt: string;
  stylePreset: string;
  carMake: string | null;
  carModel: string | null;
  carYear: number | null;
  createdAt: string;
}

export function GalleryGrid() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchGallery = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gallery?page=${p}&limit=18`);
      const data = await res.json();
      setGenerations(data.generations ?? []);
      setTotalPages(data.pages ?? 1);
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery(page);
  }, [fetchGallery, page]);

  const expandedItem = expanded ? generations.find((g) => g.id === expanded) : null;
  const expandedIndex = expanded ? generations.findIndex((g) => g.id === expanded) : -1;

  function goNext() {
    const next = generations[expandedIndex + 1];
    if (next) setExpanded(next.id);
  }
  function goPrev() {
    const prev = generations[expandedIndex - 1];
    if (prev) setExpanded(prev.id);
  }

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-video rounded-xl border border-zinc-800 bg-zinc-900 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!generations.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">📷</div>
        <h3 className="text-lg font-semibold text-zinc-300 mb-2">No images yet</h3>
        <p className="text-zinc-500 text-sm">Generate your first car image to see it here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {generations.map((gen) => (
          <GalleryCard
            key={gen.id}
            {...gen}
            onExpand={setExpanded}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-400 hover:text-white disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>
          <span className="text-sm text-zinc-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-400 hover:text-white disabled:opacity-40 transition-colors"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Lightbox */}
      {expandedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setExpanded(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setExpanded(null)}
              className="absolute -top-10 right-0 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev */}
            {expandedIndex > 0 && (
              <button
                onClick={goPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {/* Image */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden">
              <Image
                src={expandedItem.imageUrl}
                alt={expandedItem.rawPrompt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Caption */}
            <p className="mt-3 text-center text-sm text-zinc-400 truncate">
              {expandedItem.rawPrompt}
            </p>

            {/* Next */}
            {expandedIndex < generations.length - 1 && (
              <button
                onClick={goNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
