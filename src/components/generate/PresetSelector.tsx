"use client";

import { StylePreset } from "@prisma/client";
import { cn } from "@/lib/utils";

interface Preset {
  id: StylePreset;
  name: string;
  icon: string;
  accent: string;
  desc: string;
}

const PRESETS: Preset[] = [
  { id: "RAIN_NEON_CINEMATIC",      name: "Rain Neon",      icon: "🌧️", accent: "indigo",  desc: "Tokyo nights, neon reflections" },
  { id: "DESERT_HERO_SHOT",         name: "Desert Hero",    icon: "🏜️", accent: "amber",   desc: "Salt flats, directional sun" },
  { id: "LUXURY_STUDIO_LIGHTBOX",   name: "Studio",         icon: "💡", accent: "yellow",  desc: "Commercial perfection" },
  { id: "OFFROAD_DOCUMENTARY",      name: "Offroad Doc",    icon: "🌲", accent: "emerald", desc: "Raw terrain, gritty light" },
  { id: "TUNNEL_MOTION_BLUR",       name: "Motion Blur",    icon: "⚡", accent: "cyan",    desc: "Speed, streaking tunnel lights" },
  { id: "GOLDEN_HOUR_SHOWCASE",     name: "Golden Hour",    icon: "🌅", accent: "orange",  desc: "Warm coastal sunset" },
  { id: "INDUSTRIAL_URBAN_RAW",     name: "Industrial",     icon: "🏭", accent: "zinc",    desc: "Concrete, harsh shadows" },
  { id: "DEALERSHIP_CLEAN_LISTING", name: "Clean Listing",  icon: "🚘", accent: "sky",     desc: "True-to-life, dealership" },
];

const ACCENT_CLASSES: Record<string, string> = {
  indigo:  "border-indigo-500/60  bg-indigo-500/10  text-indigo-300",
  amber:   "border-amber-500/60   bg-amber-500/10   text-amber-300",
  yellow:  "border-yellow-500/60  bg-yellow-500/10  text-yellow-300",
  emerald: "border-emerald-500/60 bg-emerald-500/10 text-emerald-300",
  cyan:    "border-cyan-500/60    bg-cyan-500/10    text-cyan-300",
  orange:  "border-orange-500/60  bg-orange-500/10  text-orange-300",
  zinc:    "border-zinc-500/60    bg-zinc-500/10    text-zinc-300",
  sky:     "border-sky-500/60     bg-sky-500/10     text-sky-300",
};

interface PresetSelectorProps {
  selected: StylePreset | undefined;
  onSelect: (p: StylePreset | undefined) => void;
}

export function PresetSelector({ selected, onSelect }: PresetSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-300">Style preset</label>
        {selected && (
          <button
            onClick={() => onSelect(undefined)}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Auto-detect
          </button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {PRESETS.map((p) => {
          const isSelected = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(isSelected ? undefined : p.id)}
              title={p.desc}
              className={cn(
                "rounded-lg border px-2 py-2.5 text-center transition-all",
                isSelected
                  ? ACCENT_CLASSES[p.accent]
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800/70"
              )}
            >
              <div className="text-lg mb-1 leading-none">{p.icon}</div>
              <div className="text-[10px] font-medium leading-tight">{p.name}</div>
            </button>
          );
        })}
      </div>
      {selected && (
        <p className="text-[11px] text-zinc-600">
          {PRESETS.find((p) => p.id === selected)?.desc}
        </p>
      )}
    </div>
  );
}
