import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { HeroPromptDemo } from "@/components/landing/HeroPromptDemo";

const PRESETS = [
  { id: "RAIN_NEON_CINEMATIC", name: "Rain Neon Cinematic", emoji: "🌧️", desc: "Tokyo nights, neon-soaked streets" },
  { id: "DESERT_HERO_SHOT", name: "Desert Hero Shot", emoji: "🏜️", desc: "Salt flats, endless horizon" },
  { id: "LUXURY_STUDIO_LIGHTBOX", name: "Studio Lightbox", emoji: "💡", desc: "Commercial studio perfection" },
  { id: "OFFROAD_DOCUMENTARY", name: "Offroad Documentary", emoji: "🌲", desc: "Raw terrain, authentic adventure" },
  { id: "TUNNEL_MOTION_BLUR", name: "Tunnel Motion Blur", emoji: "⚡", desc: "Speed lines, pure velocity" },
  { id: "GOLDEN_HOUR_SHOWCASE", name: "Golden Hour", emoji: "🌅", desc: "Warm sunset, coastal roads" },
  { id: "INDUSTRIAL_URBAN_RAW", name: "Industrial Urban", emoji: "🏭", desc: "Concrete, grit, underground" },
  { id: "DEALERSHIP_CLEAN_LISTING", name: "Clean Listing", emoji: "🚘", desc: "True-to-life, listing-ready" },
];

const STEPS = [
  {
    icon: "edit",
    title: "Type your prompt",
    desc: 'e.g. "BMW M4 Competition rainy night Tokyo street"',
  },
  {
    icon: "psychology",
    title: "AI photography director",
    desc: "Our AI photography director analyses your prompt and builds a precise cinematic brief",
  },
  {
    icon: "photo_camera",
    title: "Cinematic result",
    desc: "Our cinematic image engine renders photorealistic automotive photography in seconds",
  },
];

const FEATURES = [
  {
    icon: "bolt",
    title: "Prompt Engineering Layer",
    desc: "Every prompt passes through our Car Visual Director AI. It enforces car identity, camera specs, and cinematic lighting — no hallucinated body kits.",
  },
  {
    icon: "photo_camera",
    title: "Cinematic Image Engine",
    desc: "We use the highest-fidelity photorealism engine available. Output at 1344x768 cinematic 16:9 with 90% WebP quality.",
  },
  {
    icon: "cache",
    title: "24-hour smart cache",
    desc: "Identical prompts within 24 hours return cached results instantly — no credit used. Your images are stored permanently on CDN so they never expire.",
  },
];

const TESTIMONIALS = [
  { name: "Marcus T.", role: "Car dealer", text: "Replaced our $2,000/day studio shoots. Incredible quality." },
  { name: "Priya S.", role: "Automotive journalist", text: "The prompt engine understands cars better than any tool I've tried." },
  { name: "Jake M.", role: "Instagram creator", text: "700k followers — my feed has never looked this good." },
];

export default async function LandingPage() {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#E8002D]" style={{ fontSize: 24 }}>photo_camera</span>
            <span className="font-bold text-lg text-black">AutoPhotography</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-gray-600 hover:text-black text-sm transition-colors">
              Pricing
            </Link>
            {isSignedIn ? (
              <Link href="/dashboard" className="rounded-lg bg-[#E8002D] px-4 py-2 text-sm font-medium text-white hover:bg-[#C5001F] transition-colors">Dashboard</Link>
            ) : (
              <>
                <Link href="/sign-in" className="text-[#003087] font-medium text-sm transition-colors hover:text-[#002070]">Sign in</Link>
                <Link href="/sign-up" className="rounded-lg bg-[#E8002D] px-4 py-2 text-sm font-medium text-white hover:bg-[#C5001F] transition-colors">Get started free</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero — dark background, rule-of-thirds layout */}
      <section className="relative min-h-screen bg-black text-white flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(232,0,45,0.12),transparent_60%),radial-gradient(ellipse_at_70%_50%,rgba(0,48,135,0.10),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid grid-cols-3 gap-8 min-h-[60vh] items-center">
            {/* Left third — main content */}
            <div className="col-span-1 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E8002D]/30 bg-[#E8002D]/10 px-4 py-1.5 text-sm text-[#ff6680] mb-8 w-fit">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Professional automotive photography
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight mb-6">
                Cinematic car photos,
                <br />
                <span className="text-[#E8002D]">generated</span>
                <br />
                <span className="text-white">instantly</span>
              </h1>
              <p className="text-base text-gray-400 mb-8 leading-relaxed">
                Type a simple prompt. Our AI photography engine transforms it into a cinematic brief and renders studio-quality automotive imagery in seconds.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E8002D] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#C5001F] transition-colors w-full"
                >
                  Get started free
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/5 transition-colors w-full"
                >
                  View pricing
                </Link>
              </div>
              <p className="mt-4 text-xs text-gray-600 text-center">3 free credits on signup. No credit card required.</p>
            </div>

            {/* Center third — intentionally empty (rule of thirds) */}
            <div className="col-span-1" />

            {/* Right third — stats + demo */}
            <div className="col-span-1 flex flex-col justify-center gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <HeroPromptDemo />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-black text-white">8</div>
                  <div className="text-xs text-gray-500 mt-1">Presets</div>
                </div>
                <div className="text-center rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-black text-white">~30s</div>
                  <div className="text-xs text-gray-500 mt-1">Generation</div>
                </div>
                <div className="text-center rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-black text-white">8K</div>
                  <div className="text-xs text-gray-500 mt-1">Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">How it works</h2>
            <p className="text-[#374151] max-w-xl mx-auto">Unlike generic image generators, AutoPhotography has a dedicated prompt engineering layer that understands automotive photography.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] p-8">
                <div className="w-10 h-10 rounded-xl bg-[#E8002D]/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#E8002D]">{step.icon}</span>
                </div>
                <div className="text-xs font-semibold text-[#E8002D] uppercase tracking-widest mb-2">Step {i + 1}</div>
                <h3 className="text-lg font-semibold text-black mb-2">{step.title}</h3>
                <p className="text-[#374151] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style presets */}
      <section className="py-24 bg-white border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">8 cinematic presets</h2>
            <p className="text-[#374151] max-w-xl mx-auto">Each preset encodes a complete visual language — lighting, camera, environment, and mood.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESETS.map((preset) => (
              <div key={preset.id} className="group rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] p-5 hover:border-[#E8002D]/50 hover:bg-white transition-all cursor-default">
                <div className="text-3xl mb-3">{preset.emoji}</div>
                <h3 className="font-semibold text-sm text-black mb-1">{preset.name}</h3>
                <p className="text-gray-500 text-xs">{preset.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#F3F4F6] border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Built for automotive photography</h2>
            <p className="text-[#374151] max-w-xl mx-auto">Every detail engineered to produce professional-grade automotive imagery.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="rounded-2xl border border-[#E5E7EB] bg-white p-8">
                <div className="w-10 h-10 rounded-xl bg-[#E8002D]/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#E8002D]">{f.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{f.title}</h3>
                <p className="text-[#374151] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Trusted by car people</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="material-symbols-outlined text-yellow-400" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-[#374151] text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-sm text-black">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#003087]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Start generating today</h2>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">3 free credits on signup. No credit card required.</p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-xl bg-[#E8002D] px-8 py-4 text-base font-semibold text-white hover:bg-[#C5001F] transition-colors shadow-lg"
          >
            Get started — it is free
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="material-symbols-outlined text-[#E8002D]" style={{ fontSize: 16 }}>photo_camera</span>
            AutoPhotography &copy; {new Date().getFullYear()}
          </div>
          <div className="flex gap-6 text-gray-500 text-sm">
            <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
            <Link href="/sign-in" className="hover:text-black transition-colors">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
