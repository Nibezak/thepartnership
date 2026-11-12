import React, { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { AGENCY_CONTACT } from "../data/kolibrieData";

const SERVICE_OPTIONS = [
  "Problem ID & Strategy",
  "Integrated Brand Campaign (ATL)",
  "Social & Indahash Creators",
  "Through-the-Line & Experiential",
  "Multi-Market East Africa Rollout",
];

export const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Problem ID & Strategy",
  ]);
  const [brief, setBrief] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name so our Nairobi team knows who to greet.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid work email address.");
      return;
    }
    if (brief.trim().length < 15) {
      setError("Share a quick sentence or two about your campaign brief or challenge.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="subpage-wrap">
      <section className="subpage-hero">
        <div style={{ maxWidth: "78rem", margin: "0 auto" }}>
          <p className="subpage-eyebrow">CONTACT US · WESTLANDS SQUARE, NAIROBI</p>
          <h1
            className="hero-h1"
            style={{ marginTop: "1rem", fontSize: "clamp(3.2rem, 6.2vw, 6.4rem)" }}
          >
            Let’s build a{" "}
            <span className="alt" style={{ fontWeight: 400 }}>
              coalition.
            </span>
          </h1>
          <p
            className="body-copy"
            style={{
              marginTop: "1.6rem",
              maxWidth: "42rem",
              fontSize: "1.3rem",
              lineHeight: 1.45,
            }}
          >
            Bring us a commercial problem, a regional launch across East Africa, or a culture-shaping
            creative ambition.
          </p>
        </div>
      </section>

      <section className="subpage-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 21rem), 1fr))",
            gap: "2.25rem",
            alignItems: "start",
          }}
        >
          {/* Left: Direct Nairobi Studio Info */}
          <div
            style={{
              backgroundColor: "var(--espresso)",
              color: "var(--cream)",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                }}
              >
                NAIROBI HEADQUARTERS
              </p>
              <h2
                style={{
                  marginTop: "0.65rem",
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 800,
                  fontSize: "2rem",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                The Partnership Africa
              </h2>
              <p
                style={{
                  marginTop: "0.75rem",
                  fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                  fontSize: "1.05rem",
                  opacity: 0.88,
                }}
              >
                {AGENCY_CONTACT.leadership}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
                <MapPin size={20} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.76rem", color: "var(--gold)", textTransform: "uppercase" }}>
                    Studio Office
                  </div>
                  <p style={{ fontFamily: "'Goudy Bookletter 1911', Georgia, serif", fontSize: "1.05rem", marginTop: "0.2rem" }}>
                    {AGENCY_CONTACT.address}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
                <Mail size={20} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.76rem", color: "var(--gold)", textTransform: "uppercase" }}>
                    New Business &amp; Briefs
                  </div>
                  <a
                    href={`mailto:${AGENCY_CONTACT.email}`}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "1rem",
                      color: "var(--cream)",
                      display: "inline-block",
                      marginTop: "0.2rem",
                    }}
                  >
                    {AGENCY_CONTACT.email}
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
                <Phone size={20} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.76rem", color: "var(--gold)", textTransform: "uppercase" }}>
                    Direct Line
                  </div>
                  <a
                    href="tel:+254746444333"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "1rem",
                      color: "var(--cream)",
                      display: "inline-block",
                      marginTop: "0.2rem",
                    }}
                  >
                    {AGENCY_CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "1.25rem", borderTop: "1px solid rgba(255,205,6,0.22)" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.76rem", color: "var(--gold)", textTransform: "uppercase", marginBottom: "0.65rem" }}>
                Channels
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {AGENCY_CONTACT.socials.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      color: "var(--cream)",
                    }}
                  >
                    {soc.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Brief Submission Form */}
          <div
            style={{
              backgroundColor: "#f3ead3",
              border: "2px solid var(--espresso)",
              borderRadius: "24px",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", color: "var(--espresso)" }}>
                  <CheckCircle2 size={28} />
                  <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: "2rem", textTransform: "uppercase" }}>
                    Brief Received
                  </h2>
                </div>
                <p className="body-copy" style={{ fontSize: "1.12rem", color: "var(--umber)" }}>
                  Asante, <strong>{name}</strong>. Your inquiry for{" "}
                  <strong>{company || "your brand"}</strong> has been logged for our Nairobi
                  leadership team ({selectedServices.join(", ") || "Full Coalition"}). We will reply
                  to <strong>{email}</strong> shortly.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginTop: "0.5rem" }}>
                  <a
                    href={`mailto:${AGENCY_CONTACT.email}?subject=${encodeURIComponent(
                      `Project Brief: ${company || name}`
                    )}&body=${encodeURIComponent(
                      `Name: ${name}\nCompany: ${company}\nFocus: ${selectedServices.join(", ")}\n\n${brief}`
                    )}`}
                    className="subpage-btn-primary"
                  >
                    Open in Email App
                  </a>
                  <button
                    type="button"
                    className="subpage-btn-outline"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setCompany("");
                      setBrief("");
                    }}
                  >
                    Send Another Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
                <div>
                  <p className="subpage-eyebrow">START A CONVERSATION</p>
                  <h2
                    style={{
                      marginTop: "0.35rem",
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 800,
                      fontSize: "2rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Share your brief
                  </h2>
                </div>

                {error && (
                  <div
                    role="alert"
                    style={{
                      backgroundColor: "var(--espresso)",
                      color: "var(--gold)",
                      padding: "0.85rem 1rem",
                      borderRadius: "12px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                    }}
                  >
                    {error}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))", gap: "1rem" }}>
                  <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 600 }}>
                      Your Name *
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Amina Wanjiku"
                      required
                      style={{
                        padding: "0.8rem 0.9rem",
                        border: "1.5px solid var(--espresso)",
                        borderRadius: "12px",
                        backgroundColor: "var(--cream)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1rem",
                      }}
                    />
                  </label>

                  <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 600 }}>
                      Work Email *
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="amina@company.co.ke"
                      required
                      style={{
                        padding: "0.8rem 0.9rem",
                        border: "1.5px solid var(--espresso)",
                        borderRadius: "12px",
                        backgroundColor: "var(--cream)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1rem",
                      }}
                    />
                  </label>
                </div>

                <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 600 }}>
                    Brand / Organization
                  </span>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Regional Telecom / FMCG / Fintech"
                    style={{
                      padding: "0.8rem 0.9rem",
                      border: "1.5px solid var(--espresso)",
                      borderRadius: "12px",
                      backgroundColor: "var(--cream)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                    }}
                  />
                </label>

                <div>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "0.55rem" }}>
                    Coalition Focus
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {SERVICE_OPTIONS.map((service) => {
                      const active = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          style={{
                            padding: "0.5rem 0.95rem",
                            border: "1.5px solid var(--espresso)",
                            borderRadius: "999px",
                            backgroundColor: active ? "var(--gold)" : "var(--cream)",
                            color: "var(--espresso)",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.85rem",
                            fontWeight: active ? 700 : 500,
                            cursor: "pointer",
                          }}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 600 }}>
                    Challenge &amp; Markets *
                  </span>
                  <textarea
                    rows={4}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Tell us the business problem you’re solving, target markets (Kenya, Uganda, Tanzania, Rwanda), and timeline..."
                    required
                    style={{
                      padding: "0.85rem 0.9rem",
                      border: "1.5px solid var(--espresso)",
                      borderRadius: "14px",
                      backgroundColor: "var(--cream)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      resize: "vertical",
                    }}
                  />
                </label>

                <div>
                  <button type="submit" className="subpage-btn-primary">
                    <span>Submit Brief</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
