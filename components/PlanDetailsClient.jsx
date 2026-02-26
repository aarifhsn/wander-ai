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
      } catch (err) {}
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --ink: #0d0d0d;
          --ink-2: #141414;
          --paper: #f5f0e8;
          --paper-dim: rgba(245,240,232,0.55);
          --gold: #c9a84c;
          --gold-light: #e8d5a3;
          --muted: #6b6255;
          --rule: rgba(201,168,76,0.2);
          --card-bg: #161616;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pd-root {
          min-height: 100vh;
          background: var(--ink);
          color: var(--paper);
          font-family: 'DM Sans', sans-serif;
        }

        .pd-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 999;
          opacity: 0.5;
        }

        /* ── Hero ── */
        .pd-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 640px;
          overflow: hidden;
        }

        .pd-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 8s ease;
          transform: scale(1.06);
          filter: brightness(0.7);
        }

        .pd-hero:hover .pd-hero-img { transform: scale(1.0); }

        .pd-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(13,13,13,1) 0%,
            rgba(13,13,13,0.55) 40%,
            rgba(13,13,13,0.15) 70%,
            transparent 100%
          );
        }

        /* Top bar inside hero */
        .pd-hero-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 48px;
          border-bottom: 1px solid rgba(201,168,76,0.12);
          backdrop-filter: blur(2px);
        }

        .pd-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 900;
          color: var(--paper);
        }
        .pd-logo span { color: var(--gold); }

        .pd-hero-badge {
          border: 1px solid rgba(201,168,76,0.5);
          color: var(--gold-light);
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 6px 14px;
          backdrop-filter: blur(8px);
          background: rgba(13,13,13,0.35);
        }

        /* Hero content */
        .pd-hero-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 0 48px 56px;
          max-width: 900px;
        }

        @media (max-width: 768px) {
          .pd-hero-topbar { padding: 20px 24px; }
          .pd-hero-content { padding: 0 24px 40px; }
        }

        .pd-hero-overline {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .pd-hero-overline-rule {
          width: 40px; height: 1px;
          background: var(--gold);
        }

        .pd-hero-overline-text {
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .pd-hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -1px;
          color: var(--paper);
          margin-bottom: 20px;
        }

        .pd-hero-h1 em {
          font-style: italic;
          color: var(--gold);
        }

        .pd-hero-desc {
          font-size: 1.05rem;
          color: var(--paper-dim);
          font-weight: 300;
          line-height: 1.7;
          max-width: 620px;
          margin-bottom: 32px;
        }

        .pd-hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        .pd-btn-primary {
          background: var(--gold);
          color: var(--ink);
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 13px 26px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .pd-btn-primary:hover { background: var(--gold-light); }

        .pd-btn-ghost {
          background: transparent;
          color: var(--paper);
          border: 1px solid rgba(245,240,232,0.25);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 13px 26px;
          cursor: pointer;
          transition: all 0.25s;
          backdrop-filter: blur(6px);
        }
        .pd-btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

        .pd-share-msg {
          font-size: 0.8rem;
          color: var(--gold);
          letter-spacing: 0.06em;
          margin-top: 4px;
        }

        /* ── Section wrapper ── */
        .pd-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 768px) { .pd-section { padding: 0 24px; } }

        .pd-rule { border: none; border-top: 1px solid var(--rule); }

        .pd-section-label {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 28px 0;
        }

        .pd-section-label-text {
          font-size: 0.68rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
        }

        .pd-section-label-rule {
          flex: 1; height: 1px;
          background: var(--rule);
        }

        /* ── Highlights ── */
        .pd-highlights-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
          padding-bottom: 56px;
        }

        @media (max-width: 768px) { .pd-highlights-header { grid-template-columns: 1fr; } }

        .pd-highlights-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.5px;
          color: var(--paper);
        }

        .pd-highlights-h2 em {
          font-style: italic;
          color: var(--gold);
        }

        .pd-highlights-sub {
          font-size: 1rem;
          color: var(--muted);
          font-weight: 300;
          line-height: 1.75;
          padding-top: 8px;
        }

        .pd-highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-bottom: 80px;
        }

        @media (max-width: 900px) { .pd-highlights-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .pd-highlights-grid { grid-template-columns: 1fr; } }

        .pd-highlight-card {
          background: var(--card-bg);
          border: 1px solid rgba(245,240,232,0.04);
          padding: 32px 28px;
          transition: border-color 0.25s, background 0.25s;
          position: relative;
        }

        .pd-highlight-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: transparent;
          transition: background 0.3s;
        }

        .pd-highlight-card:hover {
          border-color: rgba(201,168,76,0.25);
          background: #1a1a1a;
        }

        .pd-highlight-card:hover::before {
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .pd-highlight-icon {
          font-size: 1.6rem;
          margin-bottom: 20px;
          display: block;
        }

        .pd-highlight-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 10px;
        }

        .pd-highlight-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--paper);
        }

        .pd-highlight-rating {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--gold);
          border: 1px solid rgba(201,168,76,0.35);
          padding: 2px 8px;
          white-space: nowrap;
        }

        .pd-highlight-desc {
          font-size: 0.88rem;
          color: var(--muted);
          line-height: 1.7;
          font-weight: 300;
        }

        /* ── Itinerary ── */
        .pd-itinerary-wrap {
          background: var(--ink-2);
          border-top: 1px solid var(--rule);
          padding-bottom: 80px;
        }

        .pd-itinerary-header {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 768px) { .pd-itinerary-header { padding: 0 24px; } }

        .pd-itinerary-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.5px;
          color: var(--paper);
          margin-bottom: 48px;
        }

        .pd-itinerary-h2 em {
          font-style: italic;
          color: var(--gold);
        }

        .pd-days-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }

        @media (max-width: 900px) { .pd-days-grid { grid-template-columns: 1fr; padding: 0 24px; } }

        .pd-day-card {
          background: #111;
          border: 1px solid rgba(245,240,232,0.04);
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .pd-day-card:hover { border-color: rgba(201,168,76,0.25); }

        .pd-day-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .pd-day-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(20%) brightness(0.8);
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s;
        }

        .pd-day-card:hover .pd-day-img {
          transform: scale(1.05);
          filter: grayscale(0%) brightness(0.75);
        }

        .pd-day-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(17,17,17,0.9) 0%, transparent 60%);
        }

        .pd-day-num-badge {
          position: absolute;
          bottom: 16px; left: 20px;
          font-family: 'Playfair Display', serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-light);
          border: 1px solid rgba(201,168,76,0.45);
          padding: 4px 12px;
          backdrop-filter: blur(6px);
          background: rgba(13,13,13,0.4);
        }

        .pd-day-body { padding: 28px; }

        .pd-day-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--paper);
          margin-bottom: 24px;
          line-height: 1.2;
        }

        .pd-activities { display: flex; flex-direction: column; gap: 16px; }

        .pd-activity {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(245,240,232,0.05);
        }

        .pd-activity:last-child { border-bottom: none; padding-bottom: 0; }

        .pd-activity-time {
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: var(--gold);
          font-weight: 500;
          width: 52px;
          flex-shrink: 0;
          padding-top: 2px;
        }

        .pd-activity-info {}

        .pd-activity-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--paper);
          margin-bottom: 3px;
        }

        .pd-activity-note {
          font-size: 0.78rem;
          color: var(--muted);
          font-weight: 300;
          line-height: 1.5;
        }

        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pd-anim-1 { animation: fadeUp 0.7s ease both; }
        .pd-anim-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .pd-anim-3 { animation: fadeUp 0.7s 0.3s ease both; }
      `}</style>

      <div className="pd-root">
        {/* ── Hero ── */}
        <header className="pd-hero pd-anim-1">
          <Image
            src={plan.heroImage?.url || plan.images?.[0]?.url}
            alt={plan.destinationName}
            fill
            priority
            className="pd-hero-img"
          />
          <div className="pd-hero-overlay" />

          {/* Top bar */}
          <div className="pd-hero-topbar">
            <div className="pd-logo">
              Wander<span>.</span>AI
            </div>
            <div className="pd-hero-badge">{plan.days} Day Itinerary</div>
          </div>

          {/* Bottom content */}
          <div className="pd-hero-content pd-anim-2">
            <div className="pd-hero-overline">
              <span className="pd-hero-overline-rule" />
              <span className="pd-hero-overline-text">
                {plan.destinationName}
              </span>
            </div>

            <h1 className="pd-hero-h1">
              {plan.title.split(":")[0]}
              {plan.title.includes(":") && (
                <>
                  :<br />
                  <em>{plan.title.split(":")[1]}</em>
                </>
              )}
            </h1>

            <p className="pd-hero-desc">{plan.description}</p>

            <div className="pd-hero-actions">
              <button className="pd-btn-primary" onClick={handleShare}>
                ↗ Share on Facebook
              </button>
              <button className="pd-btn-ghost" onClick={handleCopyLink}>
                ⟳ Copy Link
              </button>
              {shareMessage && (
                <span className="pd-share-msg">{shareMessage}</span>
              )}
            </div>
          </div>
        </header>

        {/* ── Highlights ── */}
        <section style={{ paddingTop: 0 }}>
          <div className="pd-section">
            <hr className="pd-rule" />
            <div className="pd-section-label">
              <span className="pd-section-label-text">
                Destination Highlights
              </span>
              <span className="pd-section-label-rule" />
            </div>

            <div className="pd-highlights-header pd-anim-3">
              <h2 className="pd-highlights-h2">
                Essentials for your
                <br />
                <em>{plan.destinationName}</em> journey
              </h2>
              <p className="pd-highlights-sub">
                {plan.subtitle ||
                  "Curated experiences, insider picks, and everything you need to know before you go."}
              </p>
            </div>
          </div>

          <div
            className="pd-section"
            style={{ paddingLeft: 48, paddingRight: 48 }}
          >
            <div className="pd-highlights-grid">
              {plan.highlights?.map((highlight, idx) => (
                <div className="pd-highlight-card" key={idx}>
                  <span className="pd-highlight-icon">
                    {iconMap[highlight.icon] || "⭐"}
                  </span>
                  <div className="pd-highlight-head">
                    <h3 className="pd-highlight-name">{highlight.name}</h3>
                    {highlight.rating && (
                      <span className="pd-highlight-rating">
                        {highlight.rating} ★
                      </span>
                    )}
                  </div>
                  <p className="pd-highlight-desc">{highlight.description}</p>
                </div>
              ))}

              {plan.tips?.gastronomy && (
                <div className="pd-highlight-card">
                  <span className="pd-highlight-icon">🍴</span>
                  <div className="pd-highlight-head">
                    <h3 className="pd-highlight-name">Gastronomy</h3>
                  </div>
                  <p className="pd-highlight-desc">{plan.tips.gastronomy}</p>
                </div>
              )}

              {plan.tips?.smartTravel && (
                <div className="pd-highlight-card">
                  <span className="pd-highlight-icon">💡</span>
                  <div className="pd-highlight-head">
                    <h3 className="pd-highlight-name">Smart Travel</h3>
                  </div>
                  <p className="pd-highlight-desc">{plan.tips.smartTravel}</p>
                </div>
              )}

              {plan.tips?.budget && (
                <div className="pd-highlight-card">
                  <span className="pd-highlight-icon">💰</span>
                  <div className="pd-highlight-head">
                    <h3 className="pd-highlight-name">Budget Estimate</h3>
                  </div>
                  <p className="pd-highlight-desc">{plan.tips.budget}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Itinerary ── */}
        <div className="pd-itinerary-wrap">
          <div className="pd-itinerary-header">
            <hr className="pd-rule" />
            <div className="pd-section-label">
              <span className="pd-section-label-text">Travel Plan</span>
              <span className="pd-section-label-rule" />
            </div>
            <h2 className="pd-itinerary-h2">
              Your {plan.days}-day
              <br />
              <em>{plan.destinationName}</em> itinerary
            </h2>
          </div>

          <div className="pd-days-grid">
            {plan.itinerary?.map((day, idx) => (
              <div className="pd-day-card" key={idx}>
                {plan.images?.[idx + 1] && (
                  <div className="pd-day-img-wrap">
                    <Image
                      src={plan.images[idx + 1].url}
                      alt={`Day ${day.day}`}
                      width={800}
                      height={450}
                      className="pd-day-img"
                    />
                    <div className="pd-day-img-overlay" />
                    <div className="pd-day-num-badge">
                      Day {String(day.day).padStart(2, "0")}
                    </div>
                  </div>
                )}

                <div className="pd-day-body">
                  {!plan.images?.[idx + 1] && (
                    <div
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        marginBottom: 12,
                      }}
                    >
                      Day {String(day.day).padStart(2, "0")}
                    </div>
                  )}
                  <h3 className="pd-day-title">{day.title}</h3>

                  <div className="pd-activities">
                    {day.activities?.map((activity, actIdx) => (
                      <div className="pd-activity" key={actIdx}>
                        <span className="pd-activity-time">
                          {activity.time}
                        </span>
                        <div className="pd-activity-info">
                          <p className="pd-activity-name">
                            {activity.activity}
                          </p>
                          {activity.note && (
                            <p className="pd-activity-note">{activity.note}</p>
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
    </>
  );
}
