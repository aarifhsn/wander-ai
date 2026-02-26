"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeClient({ latestPlans = [] }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tick, setTick] = useState(0);
  const router = useRouter();

  // Rotating destination words
  const destinations = [
    "Paris",
    "Tokyo",
    "Patagonia",
    "Tuscany",
    "Kyoto",
    "Maldives",
  ];
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

  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --ink: #0d0d0d;
          --paper: #f5f0e8;
          --gold: #c9a84c;
          --gold-light: #e8d5a3;
          --muted: #6b6255;
          --rule: rgba(201,168,76,0.25);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hc-root {
          min-height: 100vh;
          background: var(--ink);
          color: var(--paper);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ---- Grain overlay ---- */
        .hc-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 999;
          opacity: 0.5;
        }

        /* ---- Layout ---- */
        .hc-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ---- Masthead ---- */
        .hc-masthead {
          border-bottom: 1px solid var(--rule);
          padding: 28px 0 20px;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }

        .hc-logo {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 900;
          letter-spacing: -0.5px;
          color: var(--paper);
          line-height: 1;
        }

        .hc-logo span { color: var(--gold); }

        .hc-issue {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ---- Hero ---- */
        .hc-hero {
          padding: 80px 0 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .hc-hero { grid-template-columns: 1fr; gap: 40px; }
        }

        .hc-headline-block {}

        .hc-overline {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .hc-overline-rule {
          width: 48px;
          height: 1px;
          background: var(--gold);
        }

        .hc-overline-text {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 500;
        }

        .hc-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.2rem, 6vw, 5.5rem);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }

        .hc-h1-italic {
          font-style: italic;
          color: var(--gold);
        }

        .hc-rotating-wrapper {
          overflow: hidden;
          height: 1.1em;
          display: inline-block;
          vertical-align: bottom;
        }

        .hc-rotating-inner {
          display: flex;
          flex-direction: column;
          transition: transform 0.6s cubic-bezier(0.76,0,0.24,1);
        }

        .hc-rotating-word {
          display: block;
          height: 1.1em;
          color: var(--gold);
          font-style: italic;
        }

        .hc-subheadline {
          font-size: 1.05rem;
          color: var(--muted);
          font-weight: 300;
          line-height: 1.7;
          max-width: 420px;
          margin-top: 24px;
        }

        /* ---- Input card ---- */
        .hc-input-card {
          background: #161616;
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 4px;
          padding: 28px;
          position: relative;
        }

        .hc-input-card::before {
          content: '';
          position: absolute;
          top: -1px; left: 32px; right: 32px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .hc-input-label {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hc-input-label::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          background: var(--gold);
          border-radius: 50%;
        }

        .hc-textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(245,240,232,0.15);
          color: var(--paper);
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.7;
          padding: 0 0 16px;
          resize: none;
          height: 110px;
          outline: none;
          transition: border-color 0.2s;
        }

        .hc-textarea::placeholder { color: rgba(245,240,232,0.25); }
        .hc-textarea:focus { border-bottom-color: var(--gold); }

        .hc-input-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
        }

        .hc-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .hc-chip {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.3);
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          padding: 5px 12px;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.04em;
        }

        .hc-chip:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: rgba(201,168,76,0.06);
        }

        .hc-submit-btn {
          background: var(--gold);
          color: var(--ink);
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 12px 24px;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.25s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .hc-submit-btn:hover { background: var(--gold-light); transform: translateY(-1px); }
        .hc-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .hc-error {
          margin-top: 10px;
          font-size: 0.82rem;
          color: #e05555;
        }

        .hc-loading {
          margin-top: 10px;
          font-size: 0.82rem;
          color: var(--gold);
          letter-spacing: 0.04em;
        }

        /* ---- Divider ---- */
        .hc-section-rule {
          border: none;
          border-top: 1px solid var(--rule);
          margin: 0;
        }

        .hc-section-header {
          padding: 28px 0;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .hc-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.82rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
        }

        .hc-section-rule-side {
          flex: 1;
          height: 1px;
          background: var(--rule);
        }

        /* ---- Plans grid ---- */
        .hc-plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-bottom: 80px;
        }

        @media (max-width: 900px) {
          .hc-plans-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 600px) {
          .hc-plans-grid { grid-template-columns: 1fr; }
        }

        .hc-plan-card {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          display: block;
          cursor: pointer;
        }

        .hc-plan-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: grayscale(20%) brightness(0.85);
        }

        .hc-plan-card:hover .hc-plan-img {
          transform: scale(1.06);
          filter: grayscale(0%) brightness(0.75);
        }

        .hc-plan-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.3) 50%, transparent 100%);
        }

        .hc-plan-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          border: 1px solid rgba(201,168,76,0.6);
          color: var(--gold-light);
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 4px 10px;
          backdrop-filter: blur(6px);
          background: rgba(13,13,13,0.4);
        }

        .hc-plan-body {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px 20px;
        }

        .hc-plan-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--paper);
          line-height: 1.2;
          margin-bottom: 6px;
          transition: color 0.2s;
        }

        .hc-plan-card:hover .hc-plan-title { color: var(--gold-light); }

        .hc-plan-sub {
          font-size: 0.78rem;
          color: rgba(245,240,232,0.55);
          font-weight: 300;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hc-plan-arrow {
          position: absolute;
          bottom: 24px;
          right: 20px;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(201,168,76,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          font-size: 0.9rem;
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: all 0.3s;
        }

        .hc-plan-card:hover .hc-plan-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* ---- Empty state ---- */
        .hc-empty {
          text-align: center;
          padding: 80px 0;
          color: var(--muted);
        }

        .hc-empty-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .hc-empty-text {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 1.1rem;
        }

        /* ---- Animations ---- */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hc-anim-1 { animation: fadeUp 0.7s ease both; }
        .hc-anim-2 { animation: fadeUp 0.7s 0.12s ease both; }
        .hc-anim-3 { animation: fadeUp 0.7s 0.24s ease both; }
        .hc-anim-4 { animation: fadeUp 0.7s 0.36s ease both; }
      `}</style>

      <div className="hc-root">
        <div className="hc-inner">
          {/* ── Masthead ── */}
          <header className="hc-masthead hc-anim-1">
            <div className="hc-logo">
              Wander<span>.</span>AI
            </div>
            <div className="hc-issue">AI-Powered Travel Planning</div>
          </header>

          {/* ── Hero ── */}
          <section className="hc-hero">
            <div className="hc-headline-block hc-anim-2">
              <div className="hc-overline">
                <span className="hc-overline-rule" />
                <span className="hc-overline-text">
                  Intelligent Itineraries
                </span>
              </div>

              <h1 className="hc-h1">
                Your next
                <br />
                trip to{" "}
                <span className="hc-rotating-wrapper">
                  <span
                    className="hc-rotating-inner"
                    style={{
                      transform: `translateY(-${(tick % destinations.length) * 1.1}em)`,
                    }}
                  >
                    {destinations.map((d) => (
                      <span key={d} className="hc-rotating-word">
                        {d}
                      </span>
                    ))}
                  </span>
                </span>
                <br />
                <span className="hc-h1-italic">starts here.</span>
              </h1>

              <p className="hc-subheadline">
                Describe your dream destination in plain language. Our AI crafts
                a curated, day-by-day itinerary — hidden gems included.
              </p>
            </div>

            {/* ── Input card ── */}
            <div className="hc-anim-3">
              <div className="hc-input-card">
                <div className="hc-input-label">Describe your trip</div>

                <textarea
                  className="hc-textarea"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="e.g. A romantic 4-day trip to Paris in Spring, focusing on art museums and hidden cafes..."
                  disabled={loading}
                />

                <div className="hc-input-footer">
                  <div className="hc-suggestions">
                    {suggestions.map((s) => (
                      <button
                        key={s.label}
                        className="hc-chip"
                        onClick={() => setPrompt(s.value)}
                      >
                        {s.icon} {s.label}
                      </button>
                    ))}
                  </div>
                  <button
                    className="hc-submit-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{ marginLeft: 12 }}
                  >
                    {loading ? "Crafting…" : "Generate →"}
                  </button>
                </div>

                {error && <p className="hc-error">{error}</p>}
                {loading && (
                  <p className="hc-loading">
                    ✦ Crafting your itinerary — this takes 10–30 seconds…
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ── Plans ── */}
          <hr className="hc-section-rule" />
          <div className="hc-section-header">
            <span className="hc-section-title">Recently Generated</span>
            <span className="hc-section-rule-side" />
          </div>

          {latestPlans.length > 0 ? (
            <div className="hc-plans-grid hc-anim-4">
              {latestPlans.map((plan) => (
                <Link
                  key={plan._id}
                  href={`/plan/${plan.slug}`}
                  className="hc-plan-card"
                >
                  <Image
                    src={
                      plan.heroImage?.url ||
                      plan.images?.[0]?.url ||
                      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2679&auto=format&fit=crop"
                    }
                    alt={plan.destinationName}
                    fill
                    className="hc-plan-img"
                  />
                  <div className="hc-plan-overlay" />
                  <div className="hc-plan-badge">{plan.days} Days</div>
                  <div className="hc-plan-body">
                    <h3 className="hc-plan-title">{plan.title}</h3>
                    <p className="hc-plan-sub">
                      {plan.subtitle || plan.description}
                    </p>
                  </div>
                  <div className="hc-plan-arrow">↗</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="hc-empty hc-anim-4">
              <div className="hc-empty-icon">✦</div>
              <p className="hc-empty-text">
                No itineraries yet. Create your first one above.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
