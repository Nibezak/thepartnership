import React from "react";
import { ArrowRight } from "lucide-react";
import { AppRoute, LEADERSHIP_TEAM } from "../data/agencyPagesData";

interface AboutPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="subpage-wrap">
      {/* Sun-Gold Hero */}
      <section className="subpage-hero">
        <div style={{ maxWidth: "78rem", margin: "0 auto" }}>
          <p className="subpage-eyebrow">ABOUT THE PARTNERSHIP AFRICA · POWERED BY PUBLICIS</p>
          <h1
            className="hero-h1"
            style={{ marginTop: "1rem", fontSize: "clamp(2.5rem, 6.2vw, 6.2rem)" }}
          >
            Communication is not a{" "}
            <span className="alt" style={{ fontWeight: 400 }}>
              solo journey.
            </span>
          </h1>
          <p
            className="body-copy"
            style={{
              marginTop: "1.35rem",
              maxWidth: "42rem",
              fontSize: "clamp(1.05rem, 1.5vw, 1.32rem)",
              lineHeight: 1.48,
            }}
          >
            In an industry plagued with “who did what”, we believe in “we”. Partnerships multiply
            talent, technology, platforms, and channels exponentially.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginTop: "1.85rem" }}>
            <button
              type="button"
              className="subpage-btn-primary"
              onClick={() => onNavigate("/work")}
            >
              <span>See Our Work</span>
              <ArrowRight size={17} />
            </button>
            <button
              type="button"
              className="subpage-btn-outline"
              onClick={() => onNavigate("/contact")}
            >
              <span>Brief Nairobi Hub</span>
            </button>
          </div>
        </div>
      </section>

      {/* Coalition Metrics Strip */}
      <section
        style={{
          backgroundColor: "var(--espresso)",
          color: "var(--cream)",
          padding: "clamp(2rem, 4vw, 3rem) clamp(1.25rem, 5vw, 5rem)",
        }}
      >
        <div
          style={{
            maxWidth: "78rem",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            { num: "100+", label: "Years combined senior leadership" },
            { num: "2", label: "Continents of market experience" },
            { num: "4", label: "Core East African markets (KE, UG, TZ, RW)" },
            { num: "360°", label: "Through-the-Line creative & media delivery" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                borderTop: "1px solid rgba(255, 205, 6, 0.35)",
                paddingTop: "1.1rem",
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 3.2vw, 3.1rem)",
                  lineHeight: 1,
                  color: "var(--gold)",
                }}
              >
                {stat.num}
              </div>
              <p
                style={{
                  marginTop: "0.55rem",
                  fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                  fontSize: "1rem",
                  opacity: 0.88,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Trio — Studio Portrait Displayed Once Only */}
      <section className="subpage-container">
        <p className="subpage-eyebrow">LEADERSHIP · NAIROBI &amp; EAST AFRICA</p>
        <h2
          className="section-h2"
          style={{ marginTop: "0.75rem", fontSize: "clamp(2.2rem, 4.5vw, 4.4rem)" }}
        >
          Heart, mind &amp;{" "}
          <span className="alt" style={{ fontWeight: 400 }}>
            instinct
          </span>
        </h2>

        {/* Single Studio Portrait of Leadership Trio */}
        <div
          style={{
            marginTop: "2rem",
            border: "2px solid var(--espresso)",
            borderRadius: "28px",
            overflow: "hidden",
            backgroundColor: "#FFCD06",
          }}
        >
          <img
            src="/assets/partnership/leadership_7.0.jpg"
            alt="The Partnership Africa Leadership Trio: Deepesh Jha, Sally Sawe, and Sandeep Madan"
            style={{
              width: "100%",
              maxHeight: "480px",
              objectFit: "cover",
              objectPosition: "52% 24%",
              display: "block",
            }}
          />
        </div>

        {/* Concise Leadership Cards */}
        <div
          style={{
            marginTop: "2.25rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))",
            gap: "1.5rem",
          }}
        >
          {LEADERSHIP_TEAM.map((leader, idx) => (
            <article
              key={leader.name}
              style={{
                backgroundColor: "#f3ead3",
                border: "1.5px solid var(--espresso)",
                borderRadius: "24px",
                padding: "clamp(1.35rem, 2.5vw, 1.85rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span
                    style={{
                      backgroundColor: "var(--espresso)",
                      color: "var(--gold)",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "999px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    style={{
                      backgroundColor: "var(--gold)",
                      color: "var(--espresso)",
                      border: "1px solid var(--espresso)",
                      borderRadius: "999px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      padding: "0.3rem 0.75rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {leader.focus}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.35rem, 2vw, 1.65rem)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  {leader.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.82rem",
                    color: "var(--bronze)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {leader.role}
                </p>
              </div>

              <p
                className="body-copy"
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.55,
                  color: "var(--umber)",
                  margin: 0,
                  paddingTop: "0.85rem",
                  borderTop: "1px solid rgba(48, 38, 29, 0.2)",
                }}
              >
                {leader.bio}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
