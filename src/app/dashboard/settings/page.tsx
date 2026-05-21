"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
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
          <span className="material-symbols-outlined text-[#E8002D]" style={{ fontSize: 22 }}>settings</span>
          <h1 className="text-xl font-bold text-black">Settings</h1>
        </div>
        <p className="text-sm text-gray-500">Manage your account, credits, and billing.</p>
      </div>

      {/* Profile card */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
        <h2 className="text-sm font-semibold text-black mb-4">Account</h2>
        {user ? (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Email</span>
              <span className="text-black">{user.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Plan</span>
              <span className="text-black">{user.plan}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Credits remaining</span>
              <span className="text-black font-semibold">
                {user.credits === 999999 ? "Unlimited" : user.credits}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total generations</span>
              <span className="text-black">{user._count.generations}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Member since</span>
              <span className="text-black">{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-24 rounded bg-[#F3F4F6]" />
                <div className="h-4 w-32 rounded bg-[#F3F4F6]" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Credit packs */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[#E8002D]" style={{ fontSize: 18 }}>credit_card</span>
          <h2 className="text-sm font-semibold text-black">Buy Credits</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.credits}
              className={`relative rounded-xl border p-4 bg-[#F3F4F6] ${
                pack.popular
                  ? "border-[#E8002D]"
                  : "border-[#E5E7EB]"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#E8002D] px-2.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
                  Best value
                </div>
              )}
              <div className="text-lg font-bold text-black mb-0.5">{pack.price}</div>
              <div className="text-sm text-[#374151] mb-0.5">{pack.label}</div>
              <div className="text-xs text-gray-500 mb-3">{pack.perCredit} per image</div>
              <button
                onClick={() => handlePurchase(pack.credits)}
                disabled={purchasing === pack.credits}
                className="w-full rounded-lg bg-[#E8002D] py-2 text-xs font-semibold text-white hover:bg-[#C5001F] transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {purchasing === pack.credits ? (
                  <><Loader2 className="h-3 w-3 animate-spin" />Processing...</>
                ) : (
                  "Buy now"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
        <h2 className="text-sm font-semibold text-black mb-4">Subscription Plans</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {PLANS.map((plan) => {
            const isCurrent = user?.plan === plan.id;
            return (
              <div
                key={plan.id}
                className={`relative rounded-xl border p-4 bg-[#F3F4F6] ${
                  plan.popular
                    ? "border-[#E8002D]"
                    : isCurrent
                    ? "border-[#003087]/40"
                    : "border-[#E5E7EB]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#E8002D] px-2.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
                    Popular
                  </div>
                )}
                <div className="text-base font-bold text-black mb-0.5">{plan.label}</div>
                <div className="text-xs text-gray-500 mb-2">${plan.price}</div>
                <div className="space-y-1 mb-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-xs text-[#374151]">
                      <span className="material-symbols-outlined text-[#E8002D] shrink-0" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      {f}
                    </div>
                  ))}
                </div>
                {isCurrent ? (
                  <div className="w-full rounded-lg border border-[#003087]/30 py-2 text-xs text-center text-[#003087]">
                    Current plan
                  </div>
                ) : (
                  <button className="w-full rounded-lg bg-[#003087] py-2 text-xs font-medium text-white hover:bg-[#002070] transition-colors">
                    {plan.id === "FREE" ? "Downgrade" : "Upgrade"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-gray-500 text-center">
          Subscription management coming soon. Contact support to change your plan.
        </p>
      </div>
    </div>
  );
}
