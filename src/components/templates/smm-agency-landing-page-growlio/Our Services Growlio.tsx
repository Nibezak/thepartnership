import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import spotifyPhoto from '../../../assets/images/campaign_spotify_culture_1794516064451.jpg';
import airtelPhoto from '../../../assets/images/campaign_airtel_mobile_1794516064598.jpg';
import kcbPhoto from '../../../assets/images/campaign_kcb_tusker_1794516063709.jpg';
import teamPhoto from '../../../assets/images/partnership_nairobi_team_1794516081711.jpg';
import { AppRoute } from '../../../data/agencyPagesData';

interface ServicesProps {
  onNavigate?: (route: AppRoute) => void;
}

const ArrowUpIcon = ({ stroke = '#866C1D' }: { stroke?: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#30261D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const Card1Design = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', background: '#FAF5E6', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div style={{ display: 'flex', gap: '15px', height: '54%' }}>
        {/* Market Diagnosis */}
        <div style={{ flex: 1.2, backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(48,38,29,0.12)', padding: '18px', display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#30261D', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>EA Audience Truth</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h4 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#30261D' }}>14.2M</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#866C1D', fontSize: '12px', fontWeight: 700 }}>
              <ArrowUpIcon /> +64%
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', alignItems: 'flex-end', height: '58px' }}>
            {[30, 42, 38, 56, 74, 88, 100].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i > 4 ? '#FFCD06' : i > 2 ? '#D89B1C' : '#30261D',
                  borderRadius: '6px',
                }}
              />
            ))}
          </div>
        </div>

        {/* Regional Rollout Calendar */}
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(48,38,29,0.12)', padding: '16px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#30261D', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Regional Rollout</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#866C1D', marginBottom: '12px', fontWeight: 700 }}>
            <span>KE</span><span>UG</span><span>TZ</span><span>RW</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
            <div style={{ width: '44%', height: '16px', backgroundColor: '#30261D', borderRadius: '6px' }} />
            <div style={{ width: '24%', height: '16px', backgroundColor: '#FFCD06', borderRadius: '6px' }} />
            <div style={{ width: '32%', height: '16px', backgroundColor: '#F2E7CA', borderRadius: '6px' }} />
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '26%', height: '16px', backgroundColor: '#D89B1C', borderRadius: '6px' }} />
            <div style={{ width: '40%', height: '16px', backgroundColor: '#F2E7CA', borderRadius: '6px' }} />
            <div style={{ width: '34%', height: '16px', backgroundColor: '#FFCD06', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CheckIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'flex', gap: '15px', height: '46%' }}>
        <div style={{ flex: 1.1, backgroundColor: '#30261D', color: '#FAF5E6', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#FFCD06', margin: 0, fontFamily: "'IBM Plex Mono', monospace", textTransform: 'uppercase' }}>Coalition Stack</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Publicis', 'Indahash', 'TDF', 'Yellow', 'P&L'].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '5px 10px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 205, 6, 0.16)',
                  border: '1px solid #FFCD06',
                  color: '#FFCD06',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(48,38,29,0.12)', padding: '16px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#30261D', margin: '0 0 12px 0' }}>Diagnostic Checklist</p>
          {['Category Tension', 'Street Immersion', 'Coalition Architecture', 'ROI Framework'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFCD06', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <CheckIcon />
              </div>
              <span style={{ fontSize: '11px', color: '#30261D', fontWeight: 600 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Card2Design = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', background: '#FAF5E6', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', position: 'relative', zIndex: 10, transform: 'scale(0.95)' }}>
      {/* Airtel / Telecom Campaign Card */}
      <div style={{ width: '140px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid rgba(48,38,29,0.14)', padding: '10px', boxShadow: '0 10px 30px rgba(48,38,29,0.08)', display: 'flex', flexDirection: 'column', height: '310px' }}>
        <div style={{ marginBottom: '8px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, margin: 0, color: '#30261D' }}>Airtel Africa</p>
          <p style={{ fontSize: '8px', color: '#866C1D', margin: 0 }}>ATL · Multi-Market</p>
        </div>
        <div style={{ flex: 1, borderRadius: '10px', marginBottom: '10px', overflow: 'hidden' }}>
          <img src={airtelPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Airtel Africa entrepreneur campaign" />
        </div>
        <div style={{ backgroundColor: '#30261D', color: '#FFCD06', borderRadius: '999px', padding: '6px', fontSize: '10px', fontWeight: 700, textAlign: 'center' }}>Imagine More</div>
      </div>

      {/* KCB / Integrated Video Card */}
      <div style={{ width: '160px', backgroundColor: '#30261D', color: '#FAF5E6', borderRadius: '18px', padding: '10px', boxShadow: '0 20px 40px rgba(48,38,29,0.18)', display: 'flex', flexDirection: 'column', height: '350px', transform: 'translateY(-8px)', zIndex: 2 }}>
        <div style={{ marginBottom: '8px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, margin: 0, color: '#FFCD06' }}>KCB Group</p>
          <p style={{ fontSize: '9px', color: 'rgba(250,245,230,0.75)', margin: 0 }}>Go Ahead Campaign</p>
        </div>
        <div style={{ flex: 1, borderRadius: '12px', marginBottom: '10px', overflow: 'hidden', position: 'relative' }}>
          <img src={kcbPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="KCB Group campaign" />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '34px', height: '34px', borderRadius: '50%', border: '2px solid #FFCD06', backgroundColor: 'rgba(48,38,29,0.55)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFCD06"><path d="M5 3l14 9-14 9V3z" /></svg>
          </div>
        </div>
        <div style={{ backgroundColor: '#FFCD06', color: '#30261D', borderRadius: '999px', padding: '6px', fontSize: '10px', fontWeight: 700, textAlign: 'center' }}>Watch Film</div>
      </div>

      {/* Metrics Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '132px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '14px', border: '1px solid rgba(48,38,29,0.12)', padding: '12px' }}>
          <p style={{ fontSize: '10px', color: '#866C1D', margin: '0 0 4px 0', fontWeight: 700 }}>Recall Lift</p>
          <h4 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#30261D' }}>+42%</h4>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '14px', border: '1px solid rgba(48,38,29,0.12)', padding: '12px' }}>
          <p style={{ fontSize: '10px', color: '#866C1D', margin: '0 0 4px 0', fontWeight: 700 }}>Touchpoints</p>
          <h4 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#30261D' }}>12+ TTL</h4>
        </div>
        <div style={{ backgroundColor: '#FFCD06', borderRadius: '14px', padding: '12px' }}>
          <p style={{ fontSize: '10px', color: '#30261D', margin: '0 0 4px 0', fontWeight: 700 }}>Regional Velocity</p>
          <h4 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#30261D' }}>4 Markets</h4>
        </div>
      </div>
    </div>
  </div>
);

const Card3Design = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', background: '#FAF5E6', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ width: '185px', height: '356px', backgroundColor: '#30261D', borderRadius: '22px', padding: '10px', boxShadow: '0 20px 40px rgba(48,38,29,0.2)', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px', color: '#FFCD06', fontSize: '10px', fontWeight: 700 }}>
        <span>Spotify EA</span>
        <span>• Sounds</span>
      </div>
      <div style={{ flex: 1, borderRadius: '14px', position: 'relative', overflow: 'hidden', marginBottom: '10px' }}>
        <img src={spotifyPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Spotify East Africa creator reel" />
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', background: 'rgba(48,38,29,0.82)', color: '#FAF5E6', padding: '6px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: 600 }}>
          Gengetone · Amapiano · Bongo
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFCD06', fontSize: '11px', fontWeight: 700, padding: '0 4px' }}>
        <span>Indahash Pods</span>
        <span>3.0x Lift</span>
      </div>
    </div>

    <div style={{ position: 'absolute', left: '24px', top: '42px', width: '126px', height: '165px', backgroundColor: 'white', padding: '8px', borderRadius: '14px', border: '1px solid rgba(48,38,29,0.12)', boxShadow: '0 10px 26px rgba(48,38,29,0.1)', transform: 'rotate(-7deg)', zIndex: 5 }}>
      <img src={airtelPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} alt="Creator story 1" />
    </div>

    <div style={{ position: 'absolute', right: '24px', top: '48px', width: '126px', height: '165px', backgroundColor: 'white', padding: '8px', borderRadius: '14px', border: '1px solid rgba(48,38,29,0.12)', boxShadow: '0 10px 26px rgba(48,38,29,0.1)', transform: 'rotate(7deg)', zIndex: 5 }}>
      <img src={kcbPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} alt="Creator story 2" />
    </div>

    <div style={{ position: 'absolute', right: '18px', bottom: '28px', backgroundColor: '#30261D', color: '#FAF5E6', padding: '14px', borderRadius: '16px', width: '138px', zIndex: 12, border: '1.5px solid #FFCD06' }}>
      <p style={{ fontSize: '10px', color: '#FFCD06', margin: '0 0 4px 0', fontWeight: 700 }}>Creator Velocity</p>
      <h4 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0' }}>+186%</h4>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end', height: '32px' }}>
        {[24, 38, 50, 68, 84, 100].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: '#FFCD06', borderRadius: '3px' }} />
        ))}
      </div>
    </div>
  </div>
);

const Card4Design = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', background: '#FAF5E6', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ position: 'absolute', left: '22px', top: '64px', width: '140px', height: '272px', backgroundColor: 'white', padding: '6px', borderRadius: '16px', border: '1px solid rgba(48,38,29,0.12)', boxShadow: '0 15px 35px rgba(48,38,29,0.1)', transform: 'rotate(-5deg)', zIndex: 5 }}>
      <img src={kcbPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} alt="On-trade brand activation" />
    </div>

    <div style={{ width: '190px', height: '376px', backgroundColor: '#30261D', borderRadius: '24px', padding: '8px', boxShadow: '0 25px 50px rgba(48,38,29,0.22)', display: 'flex', flexDirection: 'column', zIndex: 10, border: '2px solid #FFCD06' }}>
      <div style={{ flex: 1, borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
        <img src={teamPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Through the line Nairobi production" />
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', backgroundColor: '#FFCD06', color: '#30261D', borderRadius: '10px', padding: '8px 10px', fontSize: '11px', fontWeight: 700 }}>
          Diageo · Tusker · Isuzu · Capwell
        </div>
      </div>
    </div>

    <div style={{ position: 'absolute', left: '16px', bottom: '70px', backgroundColor: '#30261D', color: '#FAF5E6', padding: '12px 16px', borderRadius: '16px', zIndex: 12, border: '1.5px solid #FFCD06' }}>
      <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#FFCD06' }}>250+ Venues</h4>
      <p style={{ fontSize: '10px', color: '#FAF5E6', margin: '2px 0 0', fontWeight: 600 }}>BTL &amp; Retail Footprint</p>
    </div>
  </div>
);

const OurServicesGrowlio: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [scale, setScale] = useState(1);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setScale(1);
      } else {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const scaleX = screenWidth / 1600;
        const scaleY = screenHeight / 946;
        let newScale = Math.min(scaleX, scaleY);
        if (newScale > 1.15) newScale = 1.15;
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const y1 = 0;
  const y2 = useTransform(scrollYProgress, [0, 0.33], [1200, 20]);
  const y3 = useTransform(scrollYProgress, [0.33, 0.66], [1200, 40]);
  const y4 = useTransform(scrollYProgress, [0.66, 0.99], [1200, 60]);
  const cardYs = [y1, y2, y3, y4];

  const cards = [
    {
      bgColor: '#FFCD06',
      textColor: '#30261D',
      badgeBg: '#30261D',
      badgeText: '#FFCD06',
      title: 'Problem Identification',
      desc: 'We begin by diagnosing the real commercial and cultural barrier across East Africa—never writing a creative brief around guesswork.',
      badges: ['Category Audit', 'Street Immersion', 'Audience Truth', 'Coalition Architecture'],
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#30261D" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      rightSide: <Card1Design />,
    },
    {
      bgColor: '#30261D',
      textColor: '#FAF5E6',
      badgeBg: '#FFCD06',
      badgeText: '#30261D',
      title: 'Integrated Brand & ATL',
      desc: 'Bold brand platforms and television, outdoor, and digital storytelling scaled seamlessly for Airtel Africa, KCB Group, and Isuzu.',
      badges: ['Brand Platforms', 'Multi-Market ATL', 'Regional Adaptation'],
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FFCD06" strokeWidth="1.8">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      rightSide: <Card2Design />,
    },
    {
      bgColor: '#D89B1C',
      textColor: '#30261D',
      badgeBg: '#30261D',
      badgeText: '#FFCD06',
      title: 'Social & Creator Coalitions',
      desc: 'Uniting Indahash creator technology with street tastemakers for Spotify East Africa—turning launches into cultural movements.',
      badges: ['Indahash Creators', 'Short-Form Reels', 'Youth Culture'],
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#30261D" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
      rightSide: <Card3Design />,
    },
    {
      bgColor: '#5A4634',
      textColor: '#FAF5E6',
      badgeBg: '#FFCD06',
      badgeText: '#30261D',
      title: 'Through-the-Line & Retail',
      desc: 'Seamless execution from stadium festivals to neighborhood outlets for Diageo / Tusker and Capwell Industries with zero handoff friction.',
      badges: ['Festival & Experiential', 'On-Trade Activation', 'TDF & Yellow Craft'],
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FFCD06" strokeWidth="1.8">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" />
        </svg>
      ),
      rightSide: <Card4Design />,
    },
  ];

  if (isMobile) {
    return (
      <section style={{ width: '100%', backgroundColor: '#FAF5E6', padding: '60px 20px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '44px' }}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare} />
            <span style={styles.pillText}>Capabilities</span>
          </div>
          <h2 style={{ ...styles.mainTitle, width: '100%', fontSize: '38px', lineHeight: '42px' }}>
            Every Channel. One Coalition.
          </h2>
          <p style={{ ...styles.subTitle, width: '100%' }}>
            From problem identification to brave creative ideas and through-the-line execution across East Africa.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {cards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate?.('/work')}
              style={{
                backgroundColor: card.bgColor,
                color: card.textColor,
                borderRadius: '26px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                border: '2px solid #30261D',
                cursor: 'pointer',
              }}
            >
              <div>{card.icon}</div>
              <h3 style={{ fontFamily: "'Goudy Bookletter 1911', serif", fontSize: '30px', margin: 0, color: card.textColor }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '15px', lineHeight: '1.5', margin: 0, opacity: 0.92 }}>
                {card.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {card.badges.map((badge) => (
                  <span
                    key={badge}
                    style={{
                      backgroundColor: card.badgeBg,
                      color: card.badgeText,
                      borderRadius: '999px',
                      padding: '6px 14px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <div style={{ width: '100%', height: '300px', borderRadius: '18px', overflow: 'hidden', border: '1.5px solid #30261D' }}>
                {card.rightSide}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={targetRef} style={styles.scrollTrack}>
      <div style={styles.stickyWindow}>
        <div style={{ ...styles.container, transform: `scale(${scale})` }}>
          <div style={styles.headerFrame}>
            <div style={styles.pillRow}>
              <div style={styles.pillSquare} />
              <span style={styles.pillText}>Capabilities</span>
            </div>
            <div style={styles.titleGroup}>
              <h2 style={styles.mainTitle}>Every Channel. One Coalition.</h2>
              <p style={styles.subTitle}>
                From problem identification to brave creative ideas and through-the-line execution across East Africa.
              </p>
            </div>
          </div>

          <div style={styles.cardsContainer}>
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                onClick={() => onNavigate?.('/work')}
                style={{
                  ...styles.card,
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  border: '2px solid #30261D',
                  y: cardYs[idx],
                  zIndex: idx + 1,
                  cursor: 'pointer',
                }}
              >
                <div style={styles.cardIcon}>{card.icon}</div>
                <div style={styles.cardContent}>
                  <div style={styles.cardTextGroup}>
                    <h3 style={{ ...styles.cardTitle, color: card.textColor }}>{card.title}</h3>
                    <p style={{ ...styles.cardDesc, color: card.textColor }}>{card.desc}</p>
                  </div>
                  <div style={styles.badgesContainer}>
                    {card.badges.map((badge) => (
                      <div key={badge} style={{ ...styles.badge, backgroundColor: card.badgeBg, color: card.badgeText }}>
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={styles.cardRightSide}>{card.rightSide}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  scrollTrack: {
    width: '100%',
    height: '400vh',
    backgroundColor: '#FAF5E6',
    position: 'relative',
  },
  stickyWindow: {
    position: 'sticky',
    top: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  container: {
    width: '1600px',
    height: '946px',
    position: 'relative',
    transformOrigin: 'center center',
    flexShrink: 0,
  },
  headerFrame: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    position: 'absolute',
    width: '844px',
    height: '182px',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '48px',
  },
  pillRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '6px',
  },
  pillSquare: {
    width: '8px',
    height: '8px',
    backgroundColor: '#30261D',
    borderRadius: '2px',
  },
  pillText: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 600,
    fontSize: '14px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#866C1D',
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    width: '844px',
  },
  mainTitle: {
    fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
    fontWeight: 400,
    fontSize: '70px',
    lineHeight: '72px',
    textAlign: 'center',
    letterSpacing: '-0.02em',
    color: '#30261D',
    margin: 0,
  },
  subTitle: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '17px',
    lineHeight: '26px',
    textAlign: 'center',
    color: '#5A4634',
    margin: 0,
    width: '560px',
  },
  cardsContainer: {
    position: 'absolute',
    width: '945px',
    height: '620px',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '272px',
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '945px',
    height: '522px',
    borderRadius: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(48, 38, 29, 0.14)',
  },
  cardIcon: {
    position: 'absolute',
    left: '32px',
    top: '32px',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '24px',
    position: 'absolute',
    width: '360px',
    left: '32px',
    top: '188px',
  },
  cardTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardTitle: {
    fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
    fontWeight: 400,
    fontSize: '42px',
    lineHeight: '46px',
    margin: 0,
  },
  cardDesc: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    margin: 0,
    opacity: 0.92,
  },
  badgesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  badge: {
    padding: '7px 14px',
    borderRadius: '999px',
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 600,
    fontSize: '13px',
  },
  cardRightSide: {
    position: 'absolute',
    width: '508px',
    height: '458px',
    left: '405px',
    top: '32px',
    backgroundColor: '#FAF5E6',
    borderRadius: '22px',
    overflow: 'hidden',
    border: '1.5px solid #30261D',
  },
};

export default OurServicesGrowlio;
