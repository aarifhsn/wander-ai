"use client";

import Image from "next/image";
import { useState } from "react";

const iconMap = {
  "tower-control": "🗼",
  frame: "🖼️",
  crown: "👑",
  croissant: "🥐",
  lightbulb: "💡",
  wallet: "💰",
  utensils: "🍴",
  map: "🗺️",
  camera: "📷",
};

export default function PlanDetailsClient({ plan }) {
  const [shareMessage, setShareMessage] = useState("");

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: plan.title,
          text: plan.description,
          url,
        });
        setShareMessage("Shared successfully!");
        setTimeout(() => setShareMessage(""), 3000);
        return;
      } catch (err) {
        console.log("Share cancelled or failed:", err);
      }
    }
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(plan.title + " - " + plan.description)}`;
    window.open(
      facebookUrl,
      "_blank",
      "width=600,height=400,scrollbars=yes,resizable=yes",
    );
    setShareMessage("Opening Facebook share...");
    setTimeout(() => setShareMessage(""), 3000);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage("✦ Link copied to clipboard");
      setTimeout(() => setShareMessage(""), 3000);
    } catch {
      setShareMessage("Failed to copy link");
      setTimeout(() => setShareMessage(""), 3000);
    }
  };

  const titleParts = plan.title.split(":");

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f0e8]">
      {/* ── Hero ── */}
      <header className="relative w-full h-screen min-h-[640px] overflow-hidden group">
        <Image
          src={plan.heroImage?.url || plan.images?.[0]?.url}
          alt={plan.destinationName}
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] scale-[1.06] group-hover:scale-100 brightness-75"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/50 to-[#0d0d0d]/10" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 border-b border-[#c9a84c]/15 px-12 py-7 flex items-center justify-between backdrop-blur-sm">
          <span className="font-serif text-xl font-black tracking-tight text-[#f5f0e8]">
            Wander<span className="text-[#c9a84c]">.</span>AI
          </span>
          <span className="border border-[#c9a84c]/50 text-[#e8d5a3] text-[0.65rem] tracking-[0.2em] uppercase px-4 py-1.5 backdrop-blur-sm bg-[#0d0d0d]/35">
            {plan.days} Day Itinerary
          </span>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-12 pb-14 max-w-4xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#c9a84c]" />
            <span className="text-[0.68rem] tracking-[0.22em] uppercase text-[#c9a84c]">
              {plan.destinationName}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-5">
            {titleParts[0]}
            {titleParts[1] && (
              <>
                :<br />
                <span className="italic text-[#c9a84c]">{titleParts[1]}</span>
              </>
            )}
          </h1>

          <p className="text-[#f5f0e8]/60 text-base font-light leading-relaxed max-w-xl mb-8">
            {plan.description}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleShare}
              className="bg-[#c9a84c] text-[#0d0d0d] text-[0.72rem] font-medium tracking-[0.15em] uppercase px-6 py-3 hover:bg-[#e8d5a3] transition-all"
            >
              ↗ Share on Facebook
            </button>
            <button
              onClick={handleCopyLink}
              className="border border-[#f5f0e8]/20 text-[#f5f0e8] text-[0.72rem] font-light tracking-[0.14em] uppercase px-6 py-3 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all backdrop-blur-sm"
            >
              ⟳ Copy Link
            </button>
            {shareMessage && (
              <span className="text-[#c9a84c] text-xs tracking-wider">
                {shareMessage}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── Highlights ── */}
      <section className="max-w-7xl mx-auto px-8">
        <hr className="border-[#c9a84c]/15" />
        <div className="flex items-center gap-5 py-7">
          <span className="text-[0.68rem] tracking-[0.24em] uppercase text-[#6b6255] whitespace-nowrap">
            Destination Highlights
          </span>
          <span className="flex-1 h-px bg-[#c9a84c]/15" />
        </div>

        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
            Essentials for your
            <br />
            <span className="italic text-[#c9a84c]">
              {plan.destinationName}
            </span>{" "}
            journey
          </h2>
          <p className="text-[#6b6255] text-base font-light leading-relaxed self-end">
            {plan.subtitle ||
              "Curated experiences, insider picks, and everything you need to know before you go."}
          </p>
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 mb-20">
          {plan.highlights?.map((highlight, idx) => (
            <div
              key={idx}
              className="group bg-[#161616] border border-[#f5f0e8]/[0.03] p-8 hover:border-[#c9a84c]/25 hover:bg-[#1a1a1a] transition-all relative"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#c9a84c] group-hover:to-transparent transition-all" />
              <span className="text-2xl mb-5 block">
                {iconMap[highlight.icon] || "⭐"}
              </span>
              <div className="flex items-baseline justify-between gap-2 mb-3">
                <h3 className="font-serif text-lg font-bold text-[#f5f0e8]">
                  {highlight.name}
                </h3>
                {highlight.rating && (
                  <span className="text-[0.65rem] tracking-[0.1em] text-[#c9a84c] border border-[#c9a84c]/35 px-2 py-0.5 shrink-0">
                    {highlight.rating} ★
                  </span>
                )}
              </div>
              <p className="text-[#6b6255] text-sm font-light leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}

          {plan.tips?.gastronomy && (
            <div className="group bg-[#161616] border border-[#f5f0e8]/[0.03] p-8 hover:border-[#c9a84c]/25 hover:bg-[#1a1a1a] transition-all relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#c9a84c] group-hover:to-transparent transition-all" />
              <span className="text-2xl mb-5 block">🍴</span>
              <h3 className="font-serif text-lg font-bold text-[#f5f0e8] mb-3">
                Gastronomy
              </h3>
              <p className="text-[#6b6255] text-sm font-light leading-relaxed">
                {plan.tips.gastronomy}
              </p>
            </div>
          )}

          {plan.tips?.smartTravel && (
            <div className="group bg-[#161616] border border-[#f5f0e8]/[0.03] p-8 hover:border-[#c9a84c]/25 hover:bg-[#1a1a1a] transition-all relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#c9a84c] group-hover:to-transparent transition-all" />
              <span className="text-2xl mb-5 block">💡</span>
              <h3 className="font-serif text-lg font-bold text-[#f5f0e8] mb-3">
                Smart Travel
              </h3>
              <p className="text-[#6b6255] text-sm font-light leading-relaxed">
                {plan.tips.smartTravel}
              </p>
            </div>
          )}

          {plan.tips?.budget && (
            <div className="group bg-[#161616] border border-[#f5f0e8]/[0.03] p-8 hover:border-[#c9a84c]/25 hover:bg-[#1a1a1a] transition-all relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#c9a84c] group-hover:to-transparent transition-all" />
              <span className="text-2xl mb-5 block">💰</span>
              <h3 className="font-serif text-lg font-bold text-[#f5f0e8] mb-3">
                Budget Estimate
              </h3>
              <p className="text-[#6b6255] text-sm font-light leading-relaxed">
                {plan.tips.budget}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Itinerary ── */}
      <div className="bg-[#111111] border-t border-[#c9a84c]/15">
        <div className="max-w-7xl mx-auto px-8">
          <hr className="border-[#c9a84c]/15" />
          <div className="flex items-center gap-5 py-7">
            <span className="text-[0.68rem] tracking-[0.24em] uppercase text-[#6b6255] whitespace-nowrap">
              Travel Plan
            </span>
            <span className="flex-1 h-px bg-[#c9a84c]/15" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-12">
            Your {plan.days}-day
            <br />
            <span className="italic text-[#c9a84c]">
              {plan.destinationName}
            </span>{" "}
            itinerary
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-8 pb-20 grid grid-cols-1 md:grid-cols-2 gap-0.5">
          {plan.itinerary?.map((day, idx) => (
            <div
              key={idx}
              className="group bg-[#0d0d0d] border border-[#f5f0e8]/[0.04] hover:border-[#c9a84c]/25 transition-all overflow-hidden"
            >
              {/* Day image */}
              {plan.images?.[idx + 1] && (
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={plan.images[idx + 1].url}
                    alt={`Day ${day.day}`}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover brightness-75 group-hover:scale-105 group-hover:brightness-[0.65] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 to-transparent" />
                  <div className="absolute bottom-4 left-5 border border-[#c9a84c]/45 text-[#e8d5a3] text-[0.65rem] tracking-[0.2em] uppercase px-3 py-1 backdrop-blur-sm bg-[#0d0d0d]/40">
                    Day {String(day.day).padStart(2, "0")}
                  </div>
                </div>
              )}

              <div className="p-7">
                {/* Day number if no image */}
                {!plan.images?.[idx + 1] && (
                  <div className="text-[0.68rem] tracking-[0.2em] uppercase text-[#c9a84c] mb-3">
                    Day {String(day.day).padStart(2, "0")}
                  </div>
                )}

                <h3 className="font-serif text-2xl font-bold text-[#f5f0e8] leading-tight mb-6">
                  {day.title}
                </h3>

                <div className="flex flex-col gap-4">
                  {day.activities?.map((activity, actIdx) => (
                    <div
                      key={actIdx}
                      className="flex gap-4 pb-4 border-b border-[#f5f0e8]/[0.05] last:border-0 last:pb-0"
                    >
                      <span className="text-[0.68rem] tracking-[0.1em] text-[#c9a84c] font-medium w-14 shrink-0 pt-0.5">
                        {activity.time}
                      </span>
                      <div>
                        <p className="text-[#f5f0e8] text-sm font-medium mb-1">
                          {activity.activity}
                        </p>
                        {activity.note && (
                          <p className="text-[#6b6255] text-xs font-light leading-relaxed">
                            {activity.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
