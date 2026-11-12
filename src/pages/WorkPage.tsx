import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CropPhoto } from "../components/CropPhoto";
import { InstagramEmbed } from "../components/InstagramEmbed";
import { AGENCY_CASE_STUDIES, AppRoute, INSTAGRAM_EMBEDS } from "../data/agencyPagesData";

function useAnimatedCount(target: number, resetKey: string, duration = 650) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(target);
      return;
    }

    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, resetKey, duration]);

  return val;
}

const MetricCard: React.FC<{
  value: number;
  suffix: string;
  label: string;
  studyId: string;
}> = ({ value, suffix, label, studyId }) => {
  const animated = useAnimatedCount(value, studyId);
  return (
    <div
      style={{
        backgroundColor: "var(--espresso)",
        color: "var(--cream)",
        padding: "1.15rem",
        borderTop: "3px solid var(--gold)",
        borderRadius: "16px",
      }}
    >
      <div
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2rem, 3vw, 2.5rem)",
          lineHeight: 1,
          color: "var(--gold)",
        }}
      >
        {animated}
        {suffix}
      </div>
      <div
        style={{
          marginTop: "0.45rem",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.74rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          opacity: 0.9,
        }}
      >
        {label}
      </div>
    </div>
  );
};

interface WorkPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = AGENCY_CASE_STUDIES[selectedIdx];

  return (
    <div className="subpage-wrap">
      <section className="subpage-hero">
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <p className="subpage-eyebrow">OUR WORK</p>
          <h1
            className="hero-h1"
            style={{ marginTop: "0.85rem", fontSize: "clamp(2.6rem, 6vw, 5.8rem)" }}
          >
            Influence engineered for{" "}
            <span className="alt" style={{ fontWeight: 400 }}>
              scale.
            </span>
          </h1>
        </div>
      </section>

      {/* Stacked Full-Width Single-Row Videos — Scroll-Triggered Play/Stop, Rounded, Zero Text Clutter */}
      <section className="subpage-container" style={{ paddingBottom: "2.5rem" }}>
        <div
          style={{
            maxWidth: "66rem",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.75rem, 4vw, 3rem)",
          }}
        >
          {INSTAGRAM_EMBEDS.map((item) => (
            <div
              key={item.id}
              style={{
                width: "100%",
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "0 22px 54px rgba(48, 38, 29, 0.16)",
                backgroundColor: "#231B14",
              }}
            >
              <InstagramEmbed
                permalink={item.permalink}
                campaignTitle={item.campaignTitle}
                posterSrc={item.posterSrc}
                aspectRatio="1.95 / 1"
                borderRadius="28px"
                scrollAutoPlay
              />
            </div>
          ))}
        </div>
      </section>

      {/* Clean Minimal Case Switcher (No Heavy Wall-of-Text Descriptions) */}
      <section className="subpage-container" style={{ paddingTop: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.65rem",
            marginBottom: "1.75rem",
          }}
          role="tablist"
          aria-label="Client Case Studies"
        >
          {AGENCY_CASE_STUDIES.map((cs, idx) => {
            const active = selectedIdx === idx;
            return (
              <button
                key={cs.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`subpage-btn-outline ${active ? "is-active" : ""}`}
                onClick={() => setSelectedIdx(idx)}
              >
                {cs.client}
              </button>
            );
          })}
        </div>

        <article
          style={{
            border: "2px solid var(--espresso)",
            borderRadius: "26px",
            overflow: "hidden",
            backgroundColor: "#f3ead3",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
          }}
        >
          <div style={{ minHeight: "260px", position: "relative", overflow: "hidden" }}>
            <CropPhoto crop={current.crop} alt={current.alt} />
          </div>

          <div
            style={{
              padding: "clamp(1.35rem, 3vw, 2.25rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.5rem",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--bronze)",
                  textTransform: "uppercase",
                }}
              >
                {current.client} · {current.markets}
              </span>
              <h2
                style={{
                  marginTop: "0.5rem",
                  fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(1.65rem, 2.8vw, 2.35rem)",
                  lineHeight: 1.12,
                  marginBottom: 0,
                }}
              >
                {current.title}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 8rem), 1fr))",
                gap: "0.75rem",
              }}
            >
              {current.metrics.map((m) => (
                <MetricCard
                  key={m.label}
                  value={m.value}
                  suffix={m.suffix}
                  label={m.label}
                  studyId={current.id}
                />
              ))}
            </div>
          </div>
        </article>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            padding: "clamp(1.35rem, 3vw, 2rem)",
            backgroundColor: "var(--gold)",
            border: "2px solid var(--espresso)",
            borderRadius: "26px",
          }}
        >
          <h3
            style={{
              fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              margin: 0,
            }}
          >
            Ready to build your coalition campaign?
          </h3>
          <button
            type="button"
            className="subpage-btn-primary"
            onClick={() => onNavigate("/contact")}
          >
            <span>Start a Brief</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
};
