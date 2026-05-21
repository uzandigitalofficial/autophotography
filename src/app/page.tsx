import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Camera, Zap, Shield, ChevronRight, Star } from "lucide-react";
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
    icon: "✏️",
    title: "Type your prompt",
    desc: 'e.g. "BMW M4 Competition rainy night Tokyo street"',
  },
  {
    icon: "🧠",
    title: "AI engineering pipeline",
    desc: "Our Claude-powered director converts your prompt into a precise cinematic brief",
  },
  {
    icon: "📸",
    title: "Cinematic result",
    desc: "FLUX.1 generates photorealistic automotive photography in seconds",
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
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-indigo-400" />
            <span className="font-bold text-lg">AutoPhotography</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-zinc-400 hover:text-white text-sm transition-colors">
              Pricing
            </Link>
            {isSignedIn ? (
              <Link href="/dashboard" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">Dashboard</Link>
            ) : (
              <>
                <Link href="/sign-in" className="text-zinc-400 hover:text-white text-sm transition-colors">Sign in</Link>
                <Link href="/sign-up" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">Get started free</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-8">
            <Star className="h-3.5 w-3.5 fill-current" />
            Powered by FLUX.1 + Claude AI
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
            Cinematic car photos,
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">generated instantly</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Type a simple prompt. Our AI prompt engine transforms it into a precise cinematic photography brief — then FLUX.1 renders studio-quality automotive imagery in seconds.
          </p>
          <HeroPromptDemo />
          <div className="flex items-center justify-center gap-8 text-sm text-zinc-500">
            <div className="text-center"><div className="text-2xl font-bold text-white">8</div><div>Style presets</div></div>
            <div className="w-px h-8 bg-zinc-800" />
            <div className="text-center"><div className="text-2xl font-bold text-white">~30s</div><div>Generation time</div></div>
            <div className="w-px h-8 bg-zinc-800" />
            <div className="text-center"><div className="text-2xl font-bold text-white">8K</div><div>Output quality</div></div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">Unlike generic image generators, AutoPhotography has a dedicated prompt engineering layer that understands automotive photography.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">Step {i + 1}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style presets */}
      <section className="py-24 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">8 cinematic presets</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">Each preset encodes a complete visual language — lighting, camera, environment, and mood.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESETS.map((preset) => (
              <div key={preset.id} className="group rounded-xl border border-zinc-800 bg-zinc-900 p-5 hover:border-indigo-500/50 hover:bg-zinc-800/80 transition-all">
                <div className="text-3xl mb-3">{preset.emoji}</div>
                <h3 className="font-semibold text-sm mb-1">{preset.name}</h3>
                <p className="text-zinc-500 text-xs">{preset.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4"><Zap className="h-5 w-5 text-indigo-400" /></div>
              <h3 className="text-lg font-semibold mb-2">Prompt Engineering Layer</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Every prompt passes through our Claude-powered Car Visual Director AI. It enforces car identity, camera specs, and cinematic lighting — no hallucinated body kits.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4"><Camera className="h-5 w-5 text-purple-400" /></div>
              <h3 className="text-lg font-semibold mb-2">FLUX.1 Image Engine</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">We use the FLUX.1 dev model — the highest-fidelity open model for photorealism. Output at 1344×768 cinematic 16:9 with 90% WebP quality.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4"><Shield className="h-5 w-5 text-emerald-400" /></div>
              <h3 className="text-lg font-semibold mb-2">24-hour smart cache</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Identical prompts within 24 hours return cached results instantly — no credit used. Your images are stored permanently on CDN so they never expire.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl sm:text-4xl font-bold mb-4">Trusted by car people</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex gap-0.5 mb-4">{Array.from({ length: 5 }).map((_, j) => (<Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />))}</div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div><div className="font-semibold text-sm">{t.name}</div><div className="text-zinc-500 text-xs">{t.role}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">Start generating today</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">3 free credits on signup. No credit card required.</p>
          <Link href="/sign-up" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
            Get started — it's free <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-500 text-sm"><Camera className="h-4 w-4" />AutoPhotography © {new Date().getFullYear()}</div>
          <div className="flex gap-6 text-zinc-500 text-sm">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/sign-in" className="hover:text-white transition-colors">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

