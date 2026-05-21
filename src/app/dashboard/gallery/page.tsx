import { Images } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Images className="h-5 w-5 text-indigo-400" />
          <h1 className="text-xl font-bold text-white">Gallery</h1>
        </div>
        <p className="text-sm text-zinc-500">All your generated automotive images.</p>
      </div>

      <GalleryGrid />
    </div>
  );
}
