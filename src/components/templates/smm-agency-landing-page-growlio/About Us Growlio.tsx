import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppRoute } from '../../../data/agencyPagesData';
import { BrandKey, BrandLogoMark } from '../../BrandLogos';

interface AboutProps {
  onNavigate?: (route: AppRoute) => void;
}

const PARTNER_LOGOS: BrandKey[] = [
  'spotify',
  'airtel',
  'kcb',
  'tusker',
  'isuzu',
  'capwell',
  'publicis',
  'indahash',
];

const AboutUsGrowlio: React.FC<AboutProps> = ({ onNavigate }) => {
  const [scale, setScale] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const isMobile = viewportWidth <= 1024;
  const isSmallPhone = viewportWidth <= 480;

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setViewportWidth(w);
      if (w <= 1024) {
        setScale(1);
      } else {
        const baseWidth = 1600;
        let newScale = w / baseWidth;
        if (newScale > 1.15) newScale = 1.15;
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAboutClick = () => {
    if (onNavigate) onNavigate('/about');
  };

  return (
    <section
      id="about-coalition"
      style={
        isMobile
          ? { ...styles.fullWidthWrapper, height: 'auto', minHeight: 'auto' }
          : { ...styles.fullWidthWrapper, height: `${890 * scale}px` }
      }
    >
      <div
        style={
          isMobile
            ? {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }
            : { ...styles.container, transform: `scale(${scale})` }
        }
      >
        {/* Top Real Brand Logo Strip (Sharp architectural border grid) */}
        <div
          style={
            isMobile
              ? {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  width: '100%',
                  backgroundColor: '#FAF5E6',
                  borderBottom: '2px solid #30261D',
                }
              : styles.logosBar
          }
        >
          {PARTNER_LOGOS.map((brand, idx) => (
            <div
              key={brand}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '16px 10px' : '0 16px',
                borderRight: isMobile
                  ? idx % 2 === 0
                    ? '1.5px solid rgba(48,38,29,0.2)'
                    : 'none'
                  : idx < PARTNER_LOGOS.length - 1
                  ? '1.5px solid rgba(48,38,29,0.18)'
                  : 'none',
                borderBottom: isMobile && idx < 6 ? '1.5px solid rgba(48,38,29,0.2)' : 'none',
                height: isMobile ? 'auto' : '100%',
              }}
            >
              <BrandLogoMark brand={brand} theme="light" compact />
            </div>
          ))}
        </div>

        {/* Rounded Dark Block */}
        <div
          style={
            isMobile
              ? {
                  width: 'calc(100% - 24px)',
                  margin: '16px 12px',
                  backgroundColor: '#30261D',
                  borderRadius: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '28px 18px 40px',
                  gap: '24px',
                  boxSizing: 'border-box',
                }
              : styles.darkArchitecturalGrid
          }
        >
          {/* Left Panel: Studio Photography + Problem ID */}
          <div style={isMobile ? styles.mobilePanel : styles.leftSquarePanel}>
            <div style={styles.panelMetaRow}>
              <span style={styles.squareTag}>01 / NAIROBI STUDIO</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#FFCD06' }}>
                KE · UG · TZ · RW
              </span>
            </div>

            <div style={isMobile ? { width: '100%', height: '240px', border: '2px solid #FFCD06', borderRadius: '18px', overflow: 'hidden' } : styles.squarePhotoBox}>
              <img
                src="/assets/partnership/leadership_7.0.jpg"
                alt="The Partnership Africa leadership team: Deepesh Jha, Sally Sawe, and Sandeep Madan"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 25%', display: 'block', borderRadius: '16px' }}
              />
            </div>

            <motion.p
              style={styles.panelBodyCopy}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              Communication is not a solo journey. We inspect category truth on the street across East Africa before producing a single campaign frame.
            </motion.p>
          </div>

          {/* Center Architectural Block: Large Statement + CTA Pill */}
          <div style={isMobile ? styles.mobileCenterPanel : styles.centerSquarePanel}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#FFCD06' }} />
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: '#FFCD06',
                  textTransform: 'uppercase',
                }}
              >
                ABOUT THE PARTNERSHIP
              </span>
            </div>

            <motion.h2
              style={
                isMobile
                  ? {
                      ...styles.mainStatement,
                      fontSize: '36px',
                      lineHeight: '42px',
                    }
                  : styles.mainStatement
              }
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                visible: { transition: { staggerChildren: 0.04 } },
                hidden: {},
              }}
            >
              {'In an industry plagued with “who did what”, we believe in “we”.'
                .split(' ')
                .map((word, i, arr) => (
                  <React.Fragment key={i}>
                    <span style={{ overflow: 'hidden', display: 'inline-flex', verticalAlign: 'bottom' }}>
                      <motion.span
                        variants={{
                          hidden: { y: '100%', opacity: 0 },
                          visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                    {i < arr.length - 1 && ' '}
                  </React.Fragment>
                ))}
            </motion.h2>

            {/* Rounded Stat Ledger Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                width: '100%',
                border: '1.5px solid #FFCD06',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#231B14',
              }}
            >
              {[
                { val: '100+', lbl: 'Yrs Leadership' },
                { val: '4', lbl: 'EA Markets' },
                { val: '2', lbl: 'Continents' },
              ].map((stat, idx) => (
                <div
                  key={stat.lbl}
                  style={{
                    padding: isMobile ? '14px 8px' : '18px 20px',
                    borderRight: idx < 2 ? '1.5px solid rgba(255,205,6,0.35)' : 'none',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                      fontSize: isMobile ? '28px' : '38px',
                      lineHeight: 1,
                      color: '#FFCD06',
                    }}
                  >
                    {stat.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      color: '#FAF5E6',
                      marginTop: '6px',
                      opacity: 0.85,
                    }}
                  >
                    {stat.lbl}
                  </div>
                </div>
              ))}
            </div>

            {/* Keep Beloved Double-Circle Pill CTA Button */}
            <button
              type="button"
              onClick={handleAboutClick}
              className="animated-btn"
              style={{
                ...styles.ctaButtonWrapper,
                maxWidth: '100%',
              }}
            >
              <div
                style={{
                  ...styles.ctaIconCircle,
                  width: isSmallPhone ? '42px' : '48px',
                  height: isSmallPhone ? '42px' : '48px',
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 5L13 12L6 19" stroke="#30261D" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="4 5" />
                  <path d="M13 5L20 12L13 19" stroke="#30261D" strokeWidth="2.5" strokeLinecap="square" strokeDasharray="4 5" />
                </svg>
              </div>
              <div
                style={{
                  ...styles.ctaTextPill,
                  height: 'auto',
                  minHeight: isSmallPhone ? '42px' : '48px',
                  padding: isSmallPhone ? '8px 16px' : '8px 24px',
                }}
              >
                <span
                  style={{
                    ...styles.ctaText,
                    fontSize: isSmallPhone ? '16px' : '19px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Meet Leadership &amp; Story
                </span>
              </div>
            </button>
          </div>

          {/* Right Square Panel: Coalition Action + Execution Photo */}
          <div style={isMobile ? styles.mobilePanel : styles.rightSquarePanel}>
            <div style={styles.panelMetaRow}>
              <span style={styles.squareTag}>02 / PUBLICIS ALLIANCE</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#FFCD06' }}>
                HEART · MIND
              </span>
            </div>

            <motion.p
              style={styles.panelBodyCopy}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              Partnerships multiply talent, technology, and channels exponentially under Publicis Groupe Africa backing—linking creatives directly to trade impact.
            </motion.p>

            <div style={isMobile ? { width: '100%', height: '240px', border: '2px solid #FFCD06', borderRadius: '18px', overflow: 'hidden' } : styles.squarePhotoBox}>
              <img
                src="/assets/partnership/x01_mid.jpg"
                alt="Art and craft create execution brilliance at The Partnership Africa"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '16px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  fullWidthWrapper: {
    width: '100%',
    backgroundColor: '#FAF5E6',
    borderTop: '2px solid #30261D',
    borderBottom: '2px solid #FFCD06',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  container: {
    width: '1600px',
    height: '890px',
    position: 'relative',
    transformOrigin: 'center center',
    flexShrink: 0,
    backgroundColor: '#FAF5E6',
  },
  logosBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '1600px',
    height: '108px',
    backgroundColor: '#FAF5E6',
    borderBottom: '2px solid #30261D',
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  darkArchitecturalGrid: {
    position: 'absolute',
    top: '126px',
    left: '28px',
    width: '1544px',
    height: '740px',
    backgroundColor: '#30261D',
    borderRadius: '36px',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '380px 1fr 380px',
    boxSizing: 'border-box',
  },
  leftSquarePanel: {
    borderRight: '1.5px solid rgba(255, 205, 6, 0.35)',
    padding: '44px 34px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  centerSquarePanel: {
    padding: '48px 56px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  rightSquarePanel: {
    borderLeft: '1.5px solid rgba(255, 205, 6, 0.35)',
    padding: '44px 34px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  mobilePanel: {
    border: '1.5px solid rgba(255, 205, 6, 0.45)',
    borderRadius: '20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  mobileCenterPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '24px',
  },
  panelMetaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    borderBottom: '1px solid rgba(255, 205, 6, 0.25)',
    paddingBottom: '12px',
  },
  squareTag: {
    backgroundColor: '#FFCD06',
    color: '#30261D',
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 700,
    fontSize: '11px',
    padding: '4px 12px',
    letterSpacing: '0.06em',
    borderRadius: '999px',
    whiteSpace: 'nowrap',
  },
  squarePhotoBox: {
    width: '100%',
    height: '330px',
    border: '2px solid #FFCD06',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  panelBodyCopy: {
    fontFamily: "'Inter Tight', sans-serif",
    fontSize: '16px',
    lineHeight: '1.55',
    color: '#FAF5E6',
    margin: 0,
  },
  mainStatement: {
    fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
    fontWeight: 400,
    fontSize: '74px',
    lineHeight: '78px',
    textAlign: 'center',
    letterSpacing: '-0.02em',
    color: '#FAF5E6',
    margin: 0,
  },
  ctaButtonWrapper: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px',
    gap: '6px',
    border: '1.5px solid #FFCD06',
    borderRadius: '999px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  ctaIconCircle: {
    width: '48px',
    height: '48px',
    backgroundColor: '#FFCD06',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTextPill: {
    height: '48px',
    padding: '0 26px',
    backgroundColor: '#FFCD06',
    borderRadius: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
    fontWeight: 700,
    fontSize: '19px',
    color: '#30261D',
  },
};

export default AboutUsGrowlio;
