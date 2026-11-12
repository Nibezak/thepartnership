import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AGENCY_CONTACT } from "../data/kolibrieData";
import { AppRoute, NAV_ROUTES } from "../data/agencyPagesData";
import { PartnershipLionCrest } from "./templates/smm-agency-landing-page-growlio/Header Growlio";

interface SiteNavProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

export const SiteNav: React.FC<SiteNavProps> = ({ currentRoute, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    route: AppRoute
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <>
      <header className="site-nav">
        <a
          href="/"
          className="nav-logo"
          onClick={(e) => handleNavClick(e, "/")}
          aria-label="The Partnership Africa Home"
        >
          <PartnershipLionCrest size={26} color="#30261D" />
          <span className="nav-logo-wordmark">the Partnership</span>
        </a>

        <nav className="nav-center" aria-label="Primary">
          <a
            href="/"
            className={`nav-link ${currentRoute === "/" ? "is-active" : ""}`}
            onClick={(e) => handleNavClick(e, "/")}
          >
            <span>Home</span>
            <span className="draw-line" data-draw-line="" aria-hidden="true" />
          </a>
          {NAV_ROUTES.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`nav-link ${currentRoute === item.path ? "is-active" : ""}`}
              onClick={(e) => handleNavClick(e, item.path)}
            >
              <span>{item.label}</span>
              <span className="draw-line" data-draw-line="" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="nav-right-group">
          <a
            href="/contact"
            className="nav-contact"
            onClick={(e) => handleNavClick(e, "/contact")}
            style={{
              backgroundColor: "#30261D",
              color: "#FFCD06",
              borderRadius: "999px",
              padding: "0.6rem 1.25rem",
              border: "none",
            }}
          >
            <span className="nav-dot" aria-hidden="true" style={{ backgroundColor: "#FFCD06" }} />
            <span style={{ position: "relative", display: "inline-flex" }}>
              <span>Start a Brief</span>
            </span>
          </a>

          <button
            type="button"
            className="nav-mobile-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Powered by Publicis · Nairobi
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation drawer"
              style={{
                background: "var(--gold)",
                color: "var(--espresso)",
                border: "none",
                borderRadius: "999px",
                width: "2.5rem",
                height: "2.5rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-drawer-links">
            {(
              [
                { path: "/", label: "Home" },
                ...NAV_ROUTES,
                { path: "/contact", label: "Contact Us" },
              ] as { path: AppRoute; label: string }[]
            ).map((item) => (
              <button
                key={item.path}
                type="button"
                className={`mobile-drawer-link ${currentRoute === item.path ? "is-active" : ""}`}
                onClick={(e) => handleNavClick(e, item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,205,6,0.22)", paddingTop: "1.25rem" }}>
            <p style={{ fontFamily: "'Goudy Bookletter 1911', Georgia, serif", fontSize: "1rem", opacity: 0.85 }}>
              {AGENCY_CONTACT.address}
            </p>
            <p
              style={{
                marginTop: "0.5rem",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.9rem",
                color: "var(--gold)",
              }}
            >
              {AGENCY_CONTACT.email} · {AGENCY_CONTACT.phone}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

interface SiteFooterProps {
  onNavigate: (route: AppRoute) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, route: AppRoute) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <footer className="site-footer">
      <div
        style={{
          maxWidth: "78rem",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
          gap: "3rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid rgba(255, 205, 6, 0.22)",
        }}
      >
        <div>
          <a
            href="/"
            onClick={(e) => handleLink(e, "/")}
            style={{ display: "inline-block", marginBottom: "1rem" }}
          >
            <span
              style={{
                fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                fontWeight: 800,
                fontSize: "2rem",
                color: "var(--gold)",
                letterSpacing: "-0.03em",
              }}
            >
              the Partnership
            </span>
          </a>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1rem",
            }}
          >
            Powered by Publicis · East Africa
          </p>
          <p
            style={{
              fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
              fontSize: "1.05rem",
              lineHeight: 1.5,
              opacity: 0.88,
              maxWidth: "22rem",
            }}
          >
            Africa’s leading consumer influence specialists. Problem identification, strategy, brave creative ideas, and through-the-line execution.
          </p>
        </div>

        <div>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.1rem",
            }}
          >
            Explore
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {(
              [
                { path: "/", label: "Home" },
                { path: "/about", label: "About Us & Leadership" },
                { path: "/work", label: "Our Work & Case Studies" },
                { path: "/clients", label: "Clients & Coalition" },
                { path: "/contact", label: "Start a Brief" },
              ] as { path: AppRoute; label: string }[]
            ).map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onClick={(e) => handleLink(e, item.path)}
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={15} style={{ color: "var(--gold)" }} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.1rem",
            }}
          >
            Nairobi Studio Hub
          </p>
          <p
            style={{
              fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
              fontSize: "1rem",
              lineHeight: 1.5,
              opacity: 0.88,
              marginBottom: "1rem",
            }}
          >
            {AGENCY_CONTACT.address}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <a
              href={`mailto:${AGENCY_CONTACT.email}`}
              style={{
                color: "var(--gold)",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.95rem",
              }}
            >
              {AGENCY_CONTACT.email}
            </a>
            <a
              href="tel:+254746444333"
              style={{
                color: "var(--cream)",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.95rem",
              }}
            >
              {AGENCY_CONTACT.phone}
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.25rem" }}>
            {AGENCY_CONTACT.socials.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--gold)",
                }}
              >
                {soc.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "78rem",
          margin: "1.75rem auto 0",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "1rem",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.8rem",
          opacity: 0.72,
        }}
      >
        <span>© {new Date().getFullYear()} The Partnership Africa · Powered by Publicis</span>
        <span>Kenya · Uganda · Tanzania · Rwanda</span>
      </div>
    </footer>
  );
};
