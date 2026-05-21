export default function GalleryLoading() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="h-7 w-24 rounded-lg bg-[#E5E7EB] animate-pulse mb-8" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-video rounded-xl bg-[#F3F4F6] animate-pulse" />
        ))}
      </div>
    </div>
  );
}
