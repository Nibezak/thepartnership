import React from "react";

const PARTNER_NAMES = [
  "SPOTIFY",
  "AIRTEL AFRICA",
  "KCB BANK",
  "DIAGEO · TUSKER",
  "ISUZU",
  "CAPWELL",
  "PUBLICIS GROUPE",
  "INDAHASH",
];

export const MarqueeCollection: React.FC<{ ariaHidden?: boolean }> = ({
  ariaHidden = false,
}) => {
  return (
    <div className="hero-marquee-collection" aria-hidden={ariaHidden}>
      {PARTNER_NAMES.map((name) => (
        <div key={name} className="hero-marquee-item">
          <span className="hero-marquee-wordmark">{name}</span>
          <svg
            viewBox="0 0 24 24"
            className="hero-marquee-sun"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4.5" />
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="2" x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="2" y1="12" x2="5" y2="12" />
              <line x1="19" y1="12" x2="22" y2="12" />
              <line x1="4.9" y1="4.9" x2="7.1" y2="7.1" />
              <line x1="16.9" y1="16.9" x2="19.1" y2="19.1" />
              <line x1="19.1" y1="4.9" x2="16.9" y2="7.1" />
              <line x1="7.1" y1="16.9" x2="4.9" y2="19.1" />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
};
