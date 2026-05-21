import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GenerationStatus } from "@prisma/client";

export default async function GalleryPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/sign-in");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) redirect("/sign-in");

  const generations = await prisma.generation.findMany({
    where: { userId: user.id, status: GenerationStatus.COMPLETED },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      imageUrl: true,
      rawPrompt: true,
      stylePreset: true,
      createdAt: true,
    },
  });

  const serialized = generations.map((g) => ({
    ...g,
    stylePreset: String(g.stylePreset),
    createdAt: g.createdAt.toISOString(),
  }));

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#E8002D]" style={{ fontSize: 22 }}>collections</span>
          <h1 className="text-xl font-bold text-black">Gallery</h1>
        </div>
        <p className="text-sm text-gray-500">All your generated automotive images.</p>
      </div>
      <GalleryGrid generations={serialized} />
    </div>
  );
}
