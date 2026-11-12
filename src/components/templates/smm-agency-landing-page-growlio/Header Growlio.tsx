import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaSnapchat,
  FaThreads,
  FaPinterestP,
  FaFacebookF,
} from 'react-icons/fa6';
import spotifyPhoto from '../../../assets/images/campaign_spotify_culture_1794516064451.jpg';
import { AppRoute, INSTAGRAM_EMBEDS } from '../../../data/agencyPagesData';
import { InstagramEmbed } from '../../InstagramEmbed';

interface HeaderProps {
  onNavigate?: (route: AppRoute) => void;
}

const socialChannels = [
  {
    name: 'Instagram',
    Icon: FaInstagram,
    bg: 'linear-gradient(135deg, #F58529 0%, #DD2A7B 52%, #8134AF 100%)',
    color: '#FFFFFF',
  },
  { name: 'TikTok', Icon: FaTiktok, bg: '#111111', color: '#FFFFFF' },
  { name: 'YouTube', Icon: FaYoutube, bg: '#FF0000', color: '#FFFFFF' },
  { name: 'X', Icon: FaXTwitter, bg: '#0F0F0F', color: '#FFFFFF' },
  { name: 'WhatsApp', Icon: FaWhatsapp, bg: '#25D366', color: '#FFFFFF' },
  { name: 'LinkedIn', Icon: FaLinkedinIn, bg: '#0A66C2', color: '#FFFFFF' },
  { name: 'Snapchat', Icon: FaSnapchat, bg: '#FFFC00', color: '#111111' },
  { name: 'Threads', Icon: FaThreads, bg: '#181818', color: '#FFFFFF' },
  { name: 'Pinterest', Icon: FaPinterestP, bg: '#E60023', color: '#FFFFFF' },
  { name: 'Facebook', Icon: FaFacebookF, bg: '#1877F2', color: '#FFFFFF' },
];

const orbitalCoords = [
  { rotate: '12.56deg', left: -285, top: 551 },
  { rotate: '12.56deg', left: -202, top: 575 },
  { rotate: '12.56deg', left: -119, top: 599 },
  { rotate: '12.56deg', left: -36, top: 623 },
  { rotate: '3.6deg', left: 47, top: 647 },
  { rotate: '1.56deg', left: 134, top: 662 },
  { rotate: '0deg', left: 220, top: 665 },
  { rotate: '0.09deg', left: 307, top: 662 },
  { rotate: '-9.48deg', left: 387, top: 644 },
  { rotate: '-14.55deg', left: 470, top: 619 },
  { rotate: '-21.55deg', left: 548, top: 589 },
  { rotate: '-26.7deg', left: 626, top: 548 },
  { rotate: '-35.98deg', left: 694, top: 502 },
  { rotate: '-37.93deg', left: 764, top: 449 },
  { rotate: '-37.93deg', left: 832, top: 397 },
  { rotate: '-37.93deg', left: 900, top: 345 },
  { rotate: '-36.97deg', left: 966, top: 296 },
  { rotate: '-36.43deg', left: 1035, top: 249 },
  { rotate: '-10.98deg', left: 1125, top: 220 },
  { rotate: '2.44deg', left: 1234, top: 225 },
  { rotate: '5.94deg', left: 1313, top: 228 },
  { rotate: '12deg', left: 1396, top: 236 },
  { rotate: '15.54deg', left: 1474, top: 259 },
  { rotate: '15.2deg', left: 1550, top: 284 },
  { rotate: '15.2deg', left: 1626, top: 309 },
  { rotate: '15.2deg', left: 1702, top: 334 },
  { rotate: '15.2deg', left: 1778, top: 359 },
].map((icon, idx) => ({
  ...icon,
  channel: socialChannels[idx % socialChannels.length],
}));

export const PartnershipLionCrest: React.FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = '#30261D',
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle cx="32" cy="32" r="14" stroke={color} strokeWidth="2.4" />
    <circle cx="27" cy="29" r="1.7" fill={color} />
    <circle cx="37" cy="29" r="1.7" fill={color} />
    <path d="M28 36c2.5 2 5.5 2 8 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {Array.from({ length: 16 }).map((_, i) => {
      const a = (i * 22.5 * Math.PI) / 180;
      const x1 = 32 + Math.cos(a) * 18;
      const y1 = 32 + Math.sin(a) * 18;
      const x2 = 32 + Math.cos(a + 0.14) * 29;
      const y2 = 32 + Math.sin(a + 0.14) * 29;
      return (
        <path
          key={i}
          d={`M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${(32 + Math.cos(a - 0.12) * 24).toFixed(1)} ${(32 + Math.sin(a - 0.12) * 24).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`}
          stroke={color}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

const HeaderGrowlio: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const featuredReel = INSTAGRAM_EMBEDS[0];

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isCompact = viewportWidth <= 1024;
  const isMobile = viewportWidth <= 640;
  const waveScale = Math.min(Math.max(viewportWidth / 1440, 0.7), 1.15);

  const goTo = (route: AppRoute) => {
    if (onNavigate) {
      onNavigate(route);
    } else if (route === '/work') {
      document.getElementById('work-showcase')?.scrollIntoView({ behavior: 'smooth' });
    } else if (route === '/contact') {
      document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        width: '100%',
        minHeight: isCompact ? 'auto' : '100vh',
        backgroundColor: '#FFCD06',
        backgroundImage: 'radial-gradient(circle at 60% 45%, #FFF2A6 0%, #FFCD06 42%, #FAF5E6 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        padding: isMobile ? '84px 12px 36px' : isCompact ? '96px 20px 44px' : '90px 24px 36px',
        boxSizing: 'border-box',
      }}
    >
      {/* Signature Subtle Sun Gold Ripples behind hero composition */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <video
          src="/assets/partnership/P_web006_new.mp4"
          poster="/assets/partnership/P_web006_new-poster-00001.jpg"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.34,
            mixBlendMode: 'multiply',
          }}
        />
        {[340, 560, 820, 1120, 1440].map((size, idx) => (
          <div
            key={size}
            style={{
              position: 'absolute',
              left: isCompact ? '50%' : '64%',
              top: isCompact ? '44%' : '52%',
              width: `${size}px`,
              height: `${size}px`,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: '1px solid rgba(134, 108, 29, 0.2)',
              boxShadow:
                idx % 2 === 0
                  ? 'inset 0 18px 40px rgba(216, 155, 28, 0.16)'
                  : 'inset 0 -14px 30px rgba(255, 232, 110, 0.35)',
            }}
          />
        ))}
      </div>

      {/* Flowing S-Curve Wave of Multi-Channel Social Icons — Desktop & Wide Tablet */}
      {!isCompact && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 4,
          }}
        >
          <motion.div
            style={{
              position: 'relative',
              width: '1440px',
              height: '805px',
              transform: `scale(${waveScale})`,
              transformOrigin: 'center center',
              flexShrink: 0,
            }}
            initial={{ y: 120, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {orbitalCoords.map((item, idx) => {
              const N = orbitalCoords.length;
              const startIdx = idx + 1;

              const getSequence = <T,>(arr: T[], sIdx: number) => {
                const seq: T[] = [];
                for (let i = 0; i <= arr.length; i++) {
                  seq.push(arr[(sIdx + i) % arr.length]);
                }
                return seq;
              };

              const xSeq = getSequence(orbitalCoords.map((s) => s.left), startIdx);
              const ySeq = getSequence(orbitalCoords.map((s) => s.top), startIdx);
              const rotateSeq = getSequence(orbitalCoords.map((s) => s.rotate), startIdx);

              const segments = orbitalCoords.map((p1, i) => {
                if (i === N - 1) return 0.0001;
                const p2 = orbitalCoords[i + 1];
                const dx = p2.left - p1.left;
                const dy = p2.top - p1.top;
                return Math.sqrt(dx * dx + dy * dy);
              });

              const totalDistance = segments.reduce((sum, val) => sum + val, 0);
              const segmentTimes = segments.map((d) => d / totalDistance);

              const times = [0];
              let currentTime = 0;
              for (let i = 0; i < N; i++) {
                const currentSegmentIdx = (startIdx + i) % N;
                currentTime += segmentTimes[currentSegmentIdx];
                if (currentTime > 1) currentTime = 1;
                times.push(currentTime);
              }
              times[times.length - 1] = 1;

              const ChannelIcon = item.channel.Icon;

              return (
                <motion.div
                  key={idx}
                  title={item.channel.name}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '66px',
                    height: '66px',
                    borderRadius: '18px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid rgba(48, 38, 29, 0.16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 24px rgba(48, 38, 29, 0.14)',
                  }}
                  animate={{ x: xSeq, y: ySeq, rotate: rotateSeq, opacity: 1 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear', times }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '13px',
                      background: item.channel.bg,
                      color: item.channel.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ChannelIcon size={24} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* Responsive 2-Side Hero Stage: Copy Left + Massive 16:9 Side-TV Video Right */}
      <div
        style={{
          width: '100%',
          maxWidth: '1700px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 15,
          display: 'grid',
          gridTemplateColumns: isCompact ? 'minmax(0, 1fr)' : 'minmax(0, 0.64fr) minmax(0, 1.36fr)',
          gap: isCompact ? '28px' : '32px',
          alignItems: 'center',
        }}
      >
        {/* Left Side: Hero Copy & CTA */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isCompact ? 'center' : 'flex-start',
            textAlign: isCompact ? 'center' : 'left',
            gap: isMobile ? '16px' : '20px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(250, 245, 230, 0.78)',
              border: '1px solid #30261D',
              borderRadius: '999px',
              padding: '5px 14px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: isMobile ? '10px' : '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#30261D',
            }}
          >
            <span>Powered by PUBLICIS · Nairobi &amp; East Africa</span>
          </div>

          <motion.h1
            style={{
              fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
              fontWeight: 400,
              fontSize: isMobile ? 'clamp(2.3rem, 10.5vw, 3.1rem)' : isCompact ? 'clamp(2.9rem, 6.8vw, 4.2rem)' : 'clamp(2.9rem, 3.9vw, 4.25rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
              color: '#30261D',
              margin: 0,
              maxWidth: '480px',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            variants={{
              visible: { transition: { staggerChildren: 0.06 } },
              hidden: {},
            }}
          >
            {'Turn culture into real brand influence.'.split(' ').map((word, i, arr) => (
              <React.Fragment key={i}>
                <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'top' }}>
                  <motion.span
                    variants={{
                      hidden: { y: '-100%', opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < arr.length - 1 && ' '}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: isMobile ? '15px' : '18px',
              lineHeight: 1.5,
              color: '#30261D',
              margin: 0,
              maxWidth: '520px',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            variants={{
              visible: { transition: { staggerChildren: 0.015, delayChildren: 0.2 } },
              hidden: {},
            }}
          >
            {'We unite problem identification, sharp strategy, and fearless creative coalitions for Spotify, Airtel Africa, KCB, and Diageo across East Africa.'
              .split(' ')
              .map((word, i, arr) => (
                <React.Fragment key={i}>
                  <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'top' }}>
                    <motion.span
                      variants={{
                        hidden: { y: '-100%', opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {i < arr.length - 1 && ' '}
                </React.Fragment>
              ))}
          </motion.p>

          <button
            type="button"
            onClick={() => goTo('/work')}
            className="animated-btn"
            style={{
              boxSizing: 'border-box',
              display: 'inline-flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5px',
              gap: '7px',
              border: '1.5px solid #30261D',
              borderRadius: '999px',
              marginTop: '4px',
              cursor: 'pointer',
              background: 'transparent',
              maxWidth: '100%',
            }}
          >
            <div
              style={{
                width: isMobile ? '44px' : '50px',
                height: isMobile ? '44px' : '50px',
                backgroundColor: '#30261D',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6 5L13 12L6 19" stroke="#FFCD06" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="4 5" />
                <path d="M13 5L20 12L13 19" stroke="#FFCD06" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="4 5" />
              </svg>
            </div>
            <div
              style={{
                minHeight: isMobile ? '44px' : '50px',
                padding: isMobile ? '0 20px' : '0 26px',
                backgroundColor: '#30261D',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                  fontWeight: 700,
                  fontSize: isMobile ? '17px' : '20px',
                  color: '#FAF5E6',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                Explore Coalition Work
              </span>
            </div>
          </button>
        </div>

        {/* Right Side: Massive 16:9 Side-TV Rounded Auto-Repeating Video (Zero Comment/Footer UI) */}
        <motion.div
          style={{
            width: '100%',
            position: 'relative',
            borderRadius: isMobile ? '22px' : '32px',
            overflow: 'hidden',
            boxShadow: '0 32px 76px rgba(48, 38, 29, 0.32)',
            border: '2.5px solid rgba(48, 38, 29, 0.25)',
            backgroundColor: '#231B14',
          }}
          initial={{ y: 36, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <InstagramEmbed
            permalink={featuredReel.permalink}
            campaignTitle={featuredReel.campaignTitle}
            posterSrc={spotifyPhoto}
            aspectRatio="1.95 / 1"
            borderRadius={isMobile ? '20px' : '30px'}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeaderGrowlio;
