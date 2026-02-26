"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const destinations = [
  "Paris",
  "Tokyo",
  "Patagonia",
  "Tuscany",
  "Kyoto",
  "Maldives",
];

const suggestions = [
  {
    label: "3 Days in Tokyo",
    value: "3 Days in Tokyo exploring traditional culture",
    icon: "⛩",
  },
  {
    label: "Tuscany Wine Tour",
    value: "Wine tasting tour in Tuscany for 5 days",
    icon: "🍷",
  },
  {
    label: "Patagonia Trek",
    value: "7-day hiking adventure in Patagonia",
    icon: "🏔",
  },
];

export default function HomeClient({ latestPlans = [] }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tick, setTick] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError("Please enter your travel plans");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate plan");
      router.push(`/plan/${data.slug}`);
    } catch (e) {
      console.error("❌ Error:", e);
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#f5f0e8] flex flex-col w-full">
      {/* ── Masthead ── */}
      <header className="border-b border-[#c9a84c]/20 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-baseline justify-between">
          <span className="font-serif text-2xl font-black tracking-tight">
            Wander<span className="text-[#c9a84c]">.</span>AI
          </span>
          <span className="text-[0.68rem] tracking-[0.2em] uppercase text-[#6b6255]">
            AI-Powered Travel Planning
          </span>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="max-w-7xl mx-auto w-full px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Headline */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-[#c9a84c]" />
            <span className="text-[0.68rem] tracking-[0.22em] uppercase text-[#c9a84c]">
              Intelligent Itineraries
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6">
            Your next trip
            <br />
            to{" "}
            <span className="italic text-[#c9a84c] transition-all duration-500">
              {destinations[tick % destinations.length]}
            </span>
            <br />
            <span className="italic">starts here.</span>
          </h1>

          <p className="text-[#6b6255] text-base font-light leading-relaxed max-w-md">
            Describe your dream destination in plain language. Our AI crafts a
            curated, day-by-day itinerary — hidden gems included.
          </p>
        </div>

        {/* Input card */}
        <div className="relative bg-[#161616] border border-[#c9a84c]/20 p-7">
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
            <span className="text-[0.68rem] tracking-[0.2em] uppercase text-[#c9a84c]">
              Describe your trip
            </span>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="w-full bg-transparent border-b border-[#f5f0e8]/10 focus:border-[#c9a84c] text-[#f5f0e8] placeholder:text-[#f5f0e8]/20 text-base font-light leading-relaxed pb-4 resize-none h-28 outline-none transition-colors"
            placeholder="e.g. A romantic 4-day trip to Paris in Spring, focusing on art museums and hidden cafes..."
            disabled={loading}
          />

          <div className="flex items-center justify-between mt-5 gap-3 flex-wrap">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setPrompt(s.value)}
                  className="text-[0.7rem] border border-[#c9a84c]/25 text-[#6b6255] px-3 py-1 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#c9a84c] text-[#0d0d0d] text-[0.72rem] font-medium tracking-[0.15em] uppercase px-6 py-3 hover:bg-[#e8d5a3] transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {loading ? "Crafting…" : "Generate →"}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          {loading && (
            <p className="text-[#c9a84c] text-xs tracking-wider mt-3 animate-pulse">
              ✦ Crafting your itinerary — this takes 10–30 seconds…
            </p>
          )}
        </div>
      </div>

      {/* ── Plans ── */}
      <div className="max-w-7xl mx-auto w-full px-8">
        <hr className="border-[#c9a84c]/15" />
        <div className="flex items-center gap-5 py-7">
          <span className="text-[0.68rem] tracking-[0.24em] uppercase text-[#6b6255] whitespace-nowrap">
            Recently Generated
          </span>
          <span className="flex-1 h-px bg-[#c9a84c]/15" />
        </div>
      </div>

      {latestPlans.length > 0 ? (
        <div className="max-w-7xl mx-auto w-full px-8 pb-20 grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {latestPlans.map((plan) => (
            <Link
              key={plan._id}
              href={`/plan/${plan.slug}`}
              className="group relative aspect-[3/4] overflow-hidden block"
            >
              <Image
                src={
                  plan.heroImage?.url ||
                  plan.images?.[0]?.url ||
                  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2679&auto=format&fit=crop"
                }
                alt={plan.destinationName}
                fill
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-[0.65]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/95 via-[#0d0d0d]/20 to-transparent" />

              <div className="absolute top-4 left-4 border border-[#c9a84c]/50 text-[#e8d5a3] text-[0.65rem] tracking-[0.18em] uppercase px-3 py-1 backdrop-blur-sm bg-[#0d0d0d]/40">
                {plan.days} Days
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl font-bold text-[#f5f0e8] leading-tight mb-1 group-hover:text-[#e8d5a3] transition-colors">
                  {plan.title}
                </h3>
                <p className="text-[#f5f0e8]/50 text-xs line-clamp-2 font-light">
                  {plan.subtitle || plan.description}
                </p>
              </div>

              <div className="absolute bottom-5 right-5 w-8 h-8 border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c] opacity-0 translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                ↗
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto w-full px-8 pb-20 text-center py-20">
          <div className="text-3xl mb-4 opacity-30">✦</div>
          <p className="font-serif italic text-[#6b6255] text-lg">
            No itineraries yet. Create your first one above.
          </p>
        </div>
      )}
    </main>
  );
}
