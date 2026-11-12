import React from 'react';

export type BrandKey =
  | 'airtel'
  | 'spotify'
  | 'kcb'
  | 'tusker'
  | 'isuzu'
  | 'publicis'
  | 'indahash'
  | 'capwell';

interface LogoProps {
  brand: BrandKey;
  theme?: 'light' | 'dark' | 'gold' | 'coin';
  compact?: boolean;
}

export const BrandLogoMark: React.FC<LogoProps> = ({
  brand,
  theme = 'light',
  compact = false,
}) => {
  const ink = theme === 'dark' ? '#FAF5E6' : '#30261D';
  const accent = theme === 'dark' ? '#FFCD06' : '#D89B1C';

  switch (brand) {
    case 'airtel':
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: compact ? '6px' : '10px',
            color: ink,
          }}
        >
          <svg
            width={compact ? 26 : 32}
            height={compact ? 26 : 32}
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <rect width="36" height="36" fill="#E40000" />
            <path
              d="M23.5 9.2c-4.6 1-8.5 4.4-9.8 8.8-.8 2.6-.1 5.6 2 7.2 2.4 1.8 6 1.2 8-1.1 1.7-2 1.8-5.1-.1-7-1.6-1.6-4.4-1.3-5.6.6-.7 1.1-.4 2.7.8 3.3 1 .5 2.1-.1 2.2-1.1"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 800,
              fontSize: compact ? '16px' : '20px',
              letterSpacing: '-0.03em',
              color: theme === 'coin' ? '#FFFFFF' : ink,
              textTransform: 'lowercase',
            }}
          >
            airtel
          </span>
        </div>
      );

    case 'spotify':
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: compact ? '6px' : '10px',
            color: ink,
          }}
        >
          <svg
            width={compact ? 26 : 32}
            height={compact ? 26 : 32}
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="18" cy="18" r="16" fill="#1DB954" />
            <path
              d="M10.5 13.8c4.9-1.5 10.6-1.2 14.9.9"
              stroke="#121212"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M11.8 18.2c4-1.1 8.5-.9 12 .8"
              stroke="#121212"
              strokeWidth="2.1"
              strokeLinecap="round"
            />
            <path
              d="M13 22.3c3.1-.8 6.5-.6 9.3.6"
              stroke="#121212"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 800,
              fontSize: compact ? '16px' : '20px',
              letterSpacing: '-0.02em',
              color: theme === 'coin' ? '#FFFFFF' : ink,
            }}
          >
            Spotify
          </span>
        </div>
      );

    case 'kcb':
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: compact ? '6px' : '10px',
            color: ink,
          }}
        >
          <svg
            width={compact ? 26 : 32}
            height={compact ? 26 : 32}
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <rect width="36" height="36" fill="#006B3F" />
            <path
              d="M18 6l9 4v7c0 6.2-3.9 10.7-9 12.6C12.9 27.7 9 23.2 9 17v-7l9-4z"
              stroke="#FFCD06"
              strokeWidth="2"
            />
            <path
              d="M14 21l2.2-6 1.8 2.2 1.8-2.2L22 21h-8z"
              fill="#FFCD06"
            />
          </svg>
          <span
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 900,
              fontSize: compact ? '16px' : '19px',
              letterSpacing: '0.04em',
              color: theme === 'coin' ? '#FFFFFF' : ink,
            }}
          >
            KCB
          </span>
        </div>
      );

    case 'tusker':
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: compact ? '6px' : '10px',
          }}
        >
          <svg
            width={compact ? 26 : 32}
            height={compact ? 26 : 32}
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <rect width="36" height="36" fill="#FFCD06" stroke="#30261D" strokeWidth="2" />
            <path
              d="M9 22c2-6 5.5-9 9-9s7 3 9 9"
              stroke="#30261D"
              strokeWidth="2.3"
              strokeLinecap="round"
            />
            <path
              d="M12 13l6-5 6 5"
              stroke="#C8102E"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
              fontWeight: 700,
              fontSize: compact ? '16px' : '20px',
              letterSpacing: '0.03em',
              color: theme === 'coin' ? '#30261D' : ink,
            }}
          >
            TUSKER
          </span>
        </div>
      );

    case 'isuzu':
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: compact ? '6px' : '10px',
          }}
        >
          <svg
            width={compact ? 26 : 32}
            height={compact ? 26 : 32}
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <rect width="36" height="36" fill="#CC0000" />
            <path d="M11 9v18M25 9v18M11 18h14" stroke="#FFFFFF" strokeWidth="3.2" />
          </svg>
          <span
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 900,
              fontSize: compact ? '16px' : '20px',
              letterSpacing: '0.08em',
              color: theme === 'coin' ? '#FFFFFF' : ink,
            }}
          >
            ISUZU
          </span>
        </div>
      );

    case 'publicis':
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: compact ? '6px' : '10px',
          }}
        >
          <svg
            width={compact ? 26 : 32}
            height={compact ? 26 : 32}
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="18" cy="18" r="15" stroke={accent} strokeWidth="2.2" />
            <circle cx="18" cy="18" r="7" fill={accent} />
            <path
              d="M18 4v5M18 27v5M4 18h5M27 18h5"
              stroke={accent}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 800,
              fontSize: compact ? '15px' : '18px',
              letterSpacing: '0.14em',
              color: theme === 'coin' ? '#FFCD06' : ink,
            }}
          >
            PUBLICIS
          </span>
        </div>
      );

    case 'indahash':
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: compact ? '6px' : '10px',
          }}
        >
          <svg
            width={compact ? 26 : 30}
            height={compact ? 26 : 30}
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <rect width="36" height="36" fill="#FFCD06" stroke="#30261D" strokeWidth="2" />
            <path
              d="M14 9l-3 18M25 9l-3 18M8 14h19M7 22h19"
              stroke="#30261D"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 800,
              fontSize: compact ? '15px' : '18px',
              letterSpacing: '-0.02em',
              color: ink,
            }}
          >
            indahash
          </span>
        </div>
      );

    case 'capwell':
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: compact ? '6px' : '10px',
          }}
        >
          <svg
            width={compact ? 26 : 30}
            height={compact ? 26 : 30}
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <rect width="36" height="36" fill="#30261D" />
            <circle cx="18" cy="18" r="10" stroke="#FFCD06" strokeWidth="2.4" />
            <circle cx="18" cy="18" r="4" fill="#FFCD06" />
          </svg>
          <span
            style={{
              fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
              fontWeight: 700,
              fontSize: compact ? '16px' : '19px',
              letterSpacing: '0.04em',
              color: ink,
            }}
          >
            CAPWELL
          </span>
        </div>
      );
  }
};

export const CoinBrandFace: React.FC<{
  brand: 'airtel' | 'spotify' | 'kcb' | 'tusker' | 'publicis' | 'isuzu';
  subtitle: string;
}> = ({ brand, subtitle }) => {
  const palette: Record<
    typeof brand,
    { bg: string; ring: string; ink: string; accent: string }
  > = {
    airtel: {
      bg: '#C8102E',
      ring: '#FFCD06',
      ink: '#FFFFFF',
      accent: 'rgba(255,255,255,0.85)',
    },
    spotify: {
      bg: '#162119',
      ring: '#1DB954',
      ink: '#FFFFFF',
      accent: '#1DB954',
    },
    kcb: {
      bg: '#064E32',
      ring: '#FFCD06',
      ink: '#FAF5E6',
      accent: '#FFCD06',
    },
    tusker: {
      bg: '#FFCD06',
      ring: '#30261D',
      ink: '#30261D',
      accent: '#866C1D',
    },
    publicis: {
      bg: '#30261D',
      ring: '#FFCD06',
      ink: '#FAF5E6',
      accent: '#FFCD06',
    },
    isuzu: {
      bg: '#231B14',
      ring: '#E40000',
      ink: '#FAF5E6',
      accent: '#FFCD06',
    },
  };

  const theme = palette[brand];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.bg,
        color: theme.ink,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '16px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Concentric engraved coin ring */}
      <div
        style={{
          position: 'absolute',
          inset: '8px',
          borderRadius: '50%',
          border: `1.5px dashed ${theme.ring}`,
          opacity: 0.65,
          pointerEvents: 'none',
        }}
      />
      <BrandLogoMark brand={brand} theme={brand === 'tusker' ? 'light' : 'coin'} compact />
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: theme.accent,
          textAlign: 'center',
        }}
      >
        {subtitle}
      </span>
    </div>
  );
};
