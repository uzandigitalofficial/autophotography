"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Settings, CreditCard, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UserData {
  email: string;
  name: string | null;
  credits: number;
  plan: string;
  createdAt: string;
  _count: { generations: number };
}

const CREDIT_PACKS = [
  { credits: 10, label: "10 Credits", price: "$4", perCredit: "$0.40" },
  { credits: 30, label: "30 Credits", price: "$9", perCredit: "$0.30", popular: true },
  { credits: 100, label: "100 Credits", price: "$24", perCredit: "$0.24" },
];

const PLANS = [
  { id: "FREE", label: "Free", price: "0", credits: "3 lifetime", features: ["3 credits", "All presets", "Gallery access"] },
  { id: "PRO", label: "Pro", price: "12/mo", credits: "50/month", features: ["50 credits/mo", "All presets", "Gallery access", "Priority queue"], popular: true },
  { id: "UNLIMITED", label: "Unlimited", price: "29/mo", credits: "Unlimited", features: ["Unlimited credits", "All presets", "Gallery access", "Priority queue"] },
];

function PaymentToasts() {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Payment successful! Credits added.");
    }
    if (searchParams.get("cancelled") === "true") {
      toast("Payment cancelled.");
    }
  }, [searchParams]);
  return null;
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [purchasing, setPurchasing] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then(setUser)
      .catch(() => {});
  }, []);

  async function handlePurchase(credits: number) {
    setPurchasing(credits);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credits }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to create checkout session.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setPurchasing(null);
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-8">
      <Suspense fallback={null}><PaymentToasts /></Suspense>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Settings className="h-5 w-5 text-indigo-400" />
          <h1 className="text-xl font-bold text-white">Settings</h1>
        </div>
        <p className="text-sm text-zinc-500">Manage your account, credits, and billing.</p>
      </div>

      {/* Profile card */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="text-sm font-semibold text-zinc-300 mb-4">Account</h2>
        {user ? (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Email</span>
              <span className="text-zinc-200">{user.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Plan</span>
              <span className="text-zinc-200">{user.plan}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Credits remaining</span>
              <span className="text-zinc-200 font-semibold">
                {user.credits === 999999 ? "Unlimited" : user.credits}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Total generations</span>
              <span className="text-zinc-200">{user._count.generations}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Member since</span>
              <span className="text-zinc-200">{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-24 rounded bg-zinc-800" />
                <div className="h-4 w-32 rounded bg-zinc-800" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Credit packs */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-4 w-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-zinc-300">Buy Credits</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.credits}
              className={`relative rounded-xl border p-4 ${
                pack.popular
                  ? "border-indigo-500 bg-indigo-500/5"
                  : "border-zinc-700 bg-zinc-900/50"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
                  Best value
                </div>
              )}
              <div className="text-lg font-bold text-white mb-0.5">{pack.price}</div>
              <div className="text-sm text-zinc-300 mb-0.5">{pack.label}</div>
              <div className="text-xs text-zinc-600 mb-3">{pack.perCredit} per image</div>
              <button
                onClick={() => handlePurchase(pack.credits)}
                disabled={purchasing === pack.credits}
                className="w-full rounded-lg bg-indigo-600 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {purchasing === pack.credits ? (
                  <><Loader2 className="h-3 w-3 animate-spin" />Processing…</>
                ) : (
                  "Buy now"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="text-sm font-semibold text-zinc-300 mb-4">Subscription Plans</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {PLANS.map((plan) => {
            const isCurrent = user?.plan === plan.id;
            return (
              <div
                key={plan.id}
                className={`relative rounded-xl border p-4 ${
                  plan.popular
                    ? "border-indigo-500 bg-indigo-500/5"
                    : isCurrent
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-zinc-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
                    Popular
                  </div>
                )}
                <div className="text-base font-bold text-white mb-0.5">{plan.label}</div>
                <div className="text-xs text-zinc-400 mb-2">${plan.price}</div>
                <div className="space-y-1 mb-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                {isCurrent ? (
                  <div className="w-full rounded-lg border border-emerald-500/30 py-2 text-xs text-center text-emerald-400">
                    Current plan
                  </div>
                ) : (
                  <button className="w-full rounded-lg bg-zinc-800 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors">
                    {plan.id === "FREE" ? "Downgrade" : "Upgrade"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-zinc-600 text-center">
          Subscription management coming soon. Contact support to change your plan.
        </p>
      </div>
    </div>
  );
}
