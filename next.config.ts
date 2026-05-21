import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  serverExternalPackages: ["@prisma/client", "pg"],
};

export default nextConfig;
