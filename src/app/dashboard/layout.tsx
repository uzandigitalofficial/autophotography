"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Camera, Sparkles, Images, Settings, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { CreditsBadge } from "@/components/layout/CreditsBadge";

const NAV = [
  { href: "/dashboard", label: "Generate", icon: Sparkles },
  { href: "/dashboard/gallery", label: "Gallery", icon: Images },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-60 flex-col border-r border-zinc-800 bg-zinc-950">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-zinc-800">
          <Camera className="h-5 w-5 text-indigo-400" />
          <span className="font-bold text-sm text-white">AutoPhotography</span>
        </div>

        {/* Credits badge */}
        <div className="px-3 py-3 border-b border-zinc-800">
          <CreditsBadge />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade banner */}
        <div className="px-3 pb-3">
          <Link
            href="/pricing"
            className="flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-3 py-2.5 text-xs text-indigo-300 hover:bg-indigo-500/10 transition-colors"
          >
            <CreditCard className="h-3.5 w-3.5" />
            Upgrade for more credits
          </Link>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 border-t border-zinc-800 px-4 py-4">
          <UserButton />
          <span className="text-xs text-zinc-500 truncate">Account</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
