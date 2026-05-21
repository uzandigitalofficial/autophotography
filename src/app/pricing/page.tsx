import Link from "next/link";
import { CheckCircle2, Camera } from "lucide-react";

const TIERS = [
  {
    id: "FREE",
    name: "Free",
    price: "0",
    period: "",
    description: "Get started with 3 cinematic shots",
    credits: "3 lifetime credits",
    features: [
      "3 image generations",
      "All 8 style presets",
      "Gallery access",
      "1344×768 WebP download",
      "24h smart cache",
    ],
    cta: "Get started free",
    href: "/sign-up",
    highlighted: false,
  },
  {
    id: "PRO",
    name: "Pro",
    price: "12",
    period: "/month",
    description: "For creators and professionals",
    credits: "50 credits per month",
    features: [
      "50 image generations/mo",
      "All 8 style presets",
      "Full gallery history",
      "1344×768 WebP download",
      "24h smart cache",
      "Priority generation queue",
    ],
    cta: "Start Pro",
    href: "/sign-up",
    highlighted: true,
  },
  {
    id: "UNLIMITED",
    name: "Unlimited",
    price: "29",
    period: "/month",
    description: "For power users and studios",
    credits: "Unlimited credits",
    features: [
      "Unlimited generations",
      "All 8 style presets",
      "Full gallery history",
      "1344×768 WebP download",
      "24h smart cache",
      "Priority generation queue",
      "Early access to new presets",
    ],
    cta: "Start Unlimited",
    href: "/sign-up",
    highlighted: false,
  },
];

const CREDIT_PACKS = [
  { credits: "10", price: "$4", perImage: "$0.40" },
  { credits: "30", price: "$9", perImage: "$0.30", popular: true },
  { credits: "100", price: "$24", perImage: "$0.24" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-indigo-400" />
            <span className="font-bold">AutoPhotography</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-zinc-400 hover:text-white text-sm transition-colors">Sign in</Link>
            <Link href="/sign-up" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 transition-colors">Get started</Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Simple, transparent pricing</h1>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            Start free. Scale when you need. No hidden fees, no surprise charges.
          </p>
        </div>

        {/* Subscription tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                tier.highlighted
                  ? "border-indigo-500 bg-indigo-500/5 shadow-xl shadow-indigo-500/10"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-1">{tier.name}</h2>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black">${tier.price}</span>
                  <span className="text-zinc-500 text-sm">{tier.period}</span>
                </div>
                <p className="text-zinc-400 text-sm">{tier.description}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
                  {tier.credits}
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`w-full rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Credit packs */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Or buy credits one-time</h2>
          <p className="text-zinc-400 text-sm">No subscription required. Credits never expire.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.credits}
              className={`relative rounded-xl border p-5 text-center ${
                pack.popular ? "border-indigo-500 bg-indigo-500/5" : "border-zinc-800 bg-zinc-900"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
                  Best value
                </div>
              )}
              <div className="text-2xl font-black mb-0.5">{pack.price}</div>
              <div className="text-sm text-zinc-300 mb-0.5">{pack.credits} credits</div>
              <div className="text-xs text-zinc-600 mb-4">{pack.perImage} per image</div>
              <Link
                href="/sign-up"
                className="block w-full rounded-lg bg-zinc-800 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                Buy now
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="mt-20 text-center">
          <p className="text-zinc-500 text-sm">
            Questions? Each credit = 1 image generation. Credits are refunded automatically on failure.
          </p>
        </div>
      </div>
    </div>
  );
}
