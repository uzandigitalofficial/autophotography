import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "AutoPhotography — Professional Automotive Photography",
  description:
    "Transform simple car prompts into cinematic automotive photography. Studio-quality images in seconds.",
  keywords: ["car photography", "automotive photography", "automotive", "cinematic image generation"],
  openGraph: {
    title: "AutoPhotography — Professional Automotive Photography",
    description: "Professional automotive photography, generated instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("h-full", "font-sans", geist.variable)}>
        <head>
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
          <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
          <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </head>
        <body className={`${inter.className} min-h-full antialiased bg-white`}>
          {children}
          <Toaster theme="light" position="bottom-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
