import React, { useState } from "react";
import { ArrowRight, Globe2 } from "lucide-react";
import {
  AppRoute,
  CLIENT_ROSTER,
  ClientCategory,
} from "../data/agencyPagesData";
import { BrandKey, BrandLogoMark } from "../components/BrandLogos";

const CATEGORIES: ClientCategory[] = [
  "All",
  "Tech & Audio",
  "Telecom & Finance",
  "FMCG & Beverage",
  "Automotive",
  "Coalition Partners",
];

const CLIENT_BRAND_MAP: Record<string, BrandKey | undefined> = {
  Spotify: "spotify",
  "Airtel Africa": "airtel",
  "KCB Group": "kcb",
  "Diageo / KBL · Tusker": "tusker",
  "Isuzu East Africa": "isuzu",
  "Capwell Industries": "capwell",
  "Publicis Groupe Africa": "publicis",
  Indahash: "indahash",
};

interface ClientsPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<ClientCategory>("All");

  const visibleClients =
    filter === "All"
      ? CLIENT_ROSTER
      : CLIENT_ROSTER.filter((c) => c.category === filter);

  return (
    <div className="subpage-wrap">
      <section className="subpage-hero">
        <div style={{ maxWidth: "78rem", margin: "0 auto" }}>
          <p className="subpage-eyebrow">CLIENTS &amp; COALITION</p>
          <h1
            className="hero-h1"
            style={{ marginTop: "0.85rem", fontSize: "clamp(2.6rem, 6vw, 6rem)" }}
          >
            Trusted by{" "}
            <span className="alt" style={{ fontWeight: 400 }}>
              category leaders.
            </span>
          </h1>
          <p
            className="body-copy"
            style={{
              marginTop: "1.4rem",
              maxWidth: "44rem",
              fontSize: "clamp(1.05rem, 1.5vw, 1.28rem)",
              lineHeight: 1.45,
            }}
          >
            From Spotify, Airtel Africa, and KCB Group to Diageo / Tusker, Isuzu, and Capwell
            Industries across East Africa.
          </p>
        </div>
      </section>

      <section className="subpage-container">
        {/* Filter Controls */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.65rem",
            marginBottom: "2.25rem",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`subpage-btn-outline ${filter === cat ? "is-active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* All Clients & Coalition Partners Grid — Rounded Containers, Zero Videos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 19rem), 1fr))",
            gap: "1.4rem",
          }}
        >
          {visibleClients.map((client) => {
            const mappedBrand = CLIENT_BRAND_MAP[client.name];
            return (
              <article
                key={client.name}
                style={{
                  padding: "clamp(1.45rem, 2.5vw, 1.95rem)",
                  border: "2px solid var(--espresso)",
                  borderRadius: "24px",
                  backgroundColor: client.featured ? "var(--gold)" : "#f3ead3",
                  color: "var(--espresso)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.2rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.74rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: client.featured ? "var(--espresso)" : "var(--bronze)",
                      fontWeight: 600,
                      marginBottom: "0.95rem",
                    }}
                  >
                    {client.category}
                  </div>

                  {mappedBrand ? (
                    <div style={{ marginBottom: "0.6rem" }}>
                      <BrandLogoMark brand={mappedBrand} theme="light" />
                    </div>
                  ) : (
                    <h2
                      style={{
                        marginTop: "0.25rem",
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 800,
                        fontSize: "1.75rem",
                        lineHeight: 1,
                        textTransform: "uppercase",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {client.name}
                    </h2>
                  )}

                  <p
                    className="body-copy"
                    style={{
                      marginTop: "0.85rem",
                      fontSize: "1rem",
                      color: client.featured ? "var(--espresso)" : "var(--umber)",
                    }}
                  >
                    {client.highlight}
                  </p>
                </div>
                <div
                  style={{
                    paddingTop: "0.85rem",
                    borderTop: "1px solid rgba(48, 38, 29, 0.22)",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  {client.scope}
                </div>
              </article>
            );
          })}
        </div>

        {/* Regional Footprint Band */}
        <div
          style={{
            marginTop: "3.75rem",
            backgroundColor: "var(--espresso)",
            color: "var(--cream)",
            padding: "clamp(1.5rem, 3.5vw, 2.75rem)",
            borderRadius: "28px",
            border: "2px solid var(--espresso)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17rem), 1fr))",
            gap: "1.75rem",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--gold)",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.8rem",
                textTransform: "uppercase",
              }}
            >
              <Globe2 size={16} />
              <span>East African Footprint · Global Network</span>
            </div>
            <h3
              style={{
                marginTop: "0.75rem",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.65rem, 3vw, 2.2rem)",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              One brief across Kenya, Uganda, Tanzania &amp; Rwanda
            </h3>
            <p
              className="body-copy"
              style={{ marginTop: "0.85rem", fontSize: "1.05rem", opacity: 0.9 }}
            >
              Rooted in Westlands, Nairobi and powered by Publicis Groupe Africa, our coalition
              gives ambitious brands local cultural fluency at continental scale.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", justifyContent: "flex-start" }}>
            <button
              type="button"
              onClick={() => onNavigate("/work")}
              className="subpage-btn-outline"
              style={{
                color: "var(--gold)",
                borderColor: "var(--gold)",
              }}
            >
              View Case Studies
            </button>
            <button
              type="button"
              onClick={() => onNavigate("/contact")}
              className="subpage-btn-primary"
              style={{
                backgroundColor: "var(--gold)",
                color: "var(--espresso)",
                borderColor: "var(--gold)",
              }}
            >
              <span>Partner With Us</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
