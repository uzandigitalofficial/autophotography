"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { CreditsBadge } from "@/components/layout/CreditsBadge";

const NAV = [
  { href: "/dashboard", label: "Generate", icon: "auto_awesome" },
  { href: "/dashboard/gallery", label: "Gallery", icon: "collections" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-60 flex-col border-r border-[#E5E7EB] bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-[#E5E7EB]">
          <span className="material-symbols-outlined text-[#E8002D]" style={{ fontSize: 22 }}>photo_camera</span>
          <span className="font-bold text-sm text-black">AutoPhotography</span>
        </div>

        {/* Credits badge */}
        <div className="px-3 py-3 border-b border-[#E5E7EB]">
          <CreditsBadge />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all rounded-lg",
                  active
                    ? "bg-[#E8002D]/5 text-[#E8002D] border-l-2 border-[#E8002D] rounded-l-none pl-[10px]"
                    : "text-gray-500 hover:text-black hover:bg-[#F3F4F6]"
                )}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {icon}
                </span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade banner */}
        <div className="px-3 pb-3">
          <Link
            href="/pricing"
            className="flex items-center gap-2 rounded-lg border border-[#003087]/20 bg-[#003087]/5 px-3 py-2.5 text-xs text-[#003087] hover:bg-[#003087]/10 transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>credit_card</span>
            Upgrade for more credits
          </Link>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 border-t border-[#E5E7EB] px-4 py-4">
          <UserButton />
          <span className="text-xs text-gray-500 truncate">Account</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  );
}
