"use client";

import Image from "next/image";

interface GalleryCardProps {
  id: string;
  imageUrl: string;
  rawPrompt: string;
  stylePreset: string;
  carMake: string | null;
  carModel: string | null;
  carYear: number | null;
  createdAt: string;
  onExpand: (id: string) => void;
}

const PRESET_LABELS: Record<string, string> = {
  RAIN_NEON_CINEMATIC:      "Rain Neon",
  DESERT_HERO_SHOT:         "Desert Hero",
  LUXURY_STUDIO_LIGHTBOX:   "Studio",
  OFFROAD_DOCUMENTARY:      "Offroad",
  TUNNEL_MOTION_BLUR:       "Motion Blur",
  GOLDEN_HOUR_SHOWCASE:     "Golden Hour",
  INDUSTRIAL_URBAN_RAW:     "Industrial",
  DEALERSHIP_CLEAN_LISTING: "Clean",
};

export function GalleryCard({
  id, imageUrl, rawPrompt, stylePreset, carMake, carModel, onExpand,
}: GalleryCardProps) {
  const label = carMake && carModel ? `${carMake} ${carModel}` : rawPrompt;

  async function handleDownload(e: React.MouseEvent) {
    e.stopPropagation();
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `autophotography-${id}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      className="group relative aspect-video rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#F3F4F6] cursor-pointer hover:border-[#E8002D]/40 transition-all"
      onClick={() => onExpand(id)}
    >
      <Image
        src={imageUrl}
        alt={rawPrompt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-xs font-medium text-white truncate mb-1">{label}</p>
        <span className="inline-flex items-center rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] text-gray-300">
          {PRESET_LABELS[stylePreset] ?? stylePreset}
        </span>
      </div>
      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleDownload}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>download</span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onExpand(id); }}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_full</span>
        </button>
      </div>
    </div>
  );
}
