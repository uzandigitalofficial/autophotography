import Link from "next/link";

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
      "1344x768 WebP download",
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
      "1344x768 WebP download",
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
      "1344x768 WebP download",
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
    <div className="min-h-screen bg-white text-black">
      {/* Nav */}
      <nav className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#E8002D]" style={{ fontSize: 22 }}>photo_camera</span>
            <span className="font-bold text-black">AutoPhotography</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-[#003087] font-medium text-sm transition-colors hover:text-[#002070]">Sign in</Link>
            <Link href="/sign-up" className="rounded-lg bg-[#E8002D] px-4 py-2 text-sm font-medium text-white hover:bg-[#C5001F] transition-colors">Get started</Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-black mb-4">Simple, transparent pricing</h1>
          <p className="text-[#374151] text-lg max-w-lg mx-auto">
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
                  ? "border-[#E8002D] shadow-[0_0_0_2px_rgba(232,0,45,0.12)] bg-white"
                  : "border-[#E5E7EB] bg-white"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#E8002D] px-4 py-1 text-xs font-semibold text-white">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold text-black mb-1">{tier.name}</h2>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black text-black">${tier.price}</span>
                  <span className="text-gray-500 text-sm">{tier.period}</span>
                </div>
                <p className="text-[#374151] text-sm">{tier.description}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-2.5 py-1 text-xs text-gray-700">
                  {tier.credits}
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#374151]">
                    <span className="material-symbols-outlined text-[#E8002D] shrink-0" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`w-full rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-[#E8002D] text-white hover:bg-[#C5001F]"
                    : "border border-[#003087] text-[#003087] hover:bg-[#003087]/5"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Credit packs */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-black mb-2">Or buy credits one-time</h2>
          <p className="text-[#374151] text-sm">No subscription required. Credits never expire.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.credits}
              className={`relative rounded-xl border p-5 text-center bg-[#F3F4F6] ${
                pack.popular ? "border-[#E8002D]" : "border-[#E5E7EB]"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#E8002D] px-2.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
                  Best value
                </div>
              )}
              <div className="text-2xl font-black text-black mb-0.5">{pack.price}</div>
              <div className="text-sm text-[#374151] mb-0.5">{pack.credits} credits</div>
              <div className="text-xs text-gray-500 mb-4">{pack.perImage} per image</div>
              <Link
                href="/sign-up"
                className="block w-full rounded-lg bg-[#003087] py-2 text-xs font-medium text-white hover:bg-[#002070] transition-colors"
              >
                Buy now
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm">
            Questions? Each credit = 1 image generation. Credits are refunded automatically on failure.
          </p>
        </div>
      </div>
    </div>
  );
}
