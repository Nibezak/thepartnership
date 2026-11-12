import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, animate } from 'framer-motion';
import spotifyPhoto from '../../../assets/images/campaign_spotify_culture_1794516064451.jpg';
import airtelPhoto from '../../../assets/images/campaign_airtel_mobile_1794516064598.jpg';
import kcbPhoto from '../../../assets/images/campaign_kcb_tusker_1794516063709.jpg';
import teamPhoto from '../../../assets/images/partnership_nairobi_team_1794516081711.jpg';
import { AppRoute } from '../../../data/agencyPagesData';
import { CoalitionStage3D, MonolithCampaignItem } from '../../three/CoalitionStage3D';
import { BrandKey, BrandLogoMark } from '../../BrandLogos';

interface CaseStudiesProps {
  onNavigate?: (route: AppRoute) => void;
}

const AnimatedMetric = ({ metric, index, studyIndex }: { metric: string; index: number; studyIndex: number }) => {
  const match = metric.match(/^([^\d]*)(\d+)(.*)$/);

  if (match) {
    const prefix = match[1];
    const value = parseInt(match[2], 10);
    const suffix = match[3];
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
      count.set(0);
      const timeout = setTimeout(() => {
        animate(count, value, { duration: 0.9, ease: 'easeOut' });
      }, 60 + index * 80);
      return () => {
        clearTimeout(timeout);
        count.stop();
      };
    }, [value, index, studyIndex, count]);

    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
    );
  }

  return <span>{metric}</span>;
};

interface StudyRecord extends MonolithCampaignItem {
  name: string;
  brand: BrandKey;
  photo: string;
  description: string;
  metrics: string[];
  partners: string[];
}

const CASE_STUDIES_DATA: StudyRecord[] = [
  {
    name: 'Spotify · EA',
    client: 'Spotify',
    brand: 'spotify',
    tag: 'Audio & Youth',
    metric: '100M+ Views',
    accentHex: '#1DB954',
    headline: 'Street Sound & Creator Culture',
    photo: spotifyPhoto,
    description:
      'Translating East Africa’s breakout street sound into daily cultural habit across Kenya, Uganda, and Tanzania through Indahash creator coalitions and live campus activations.',
    metrics: ['100M+ - Reel Views', '3x - Creator Lift', '4 - EA Markets'],
    partners: ['Publicis Groupe', 'Indahash', 'Yellow Agency'],
  },
  {
    name: 'Airtel Africa',
    client: 'Airtel Africa',
    brand: 'airtel',
    tag: 'Telecom 360°',
    metric: '+42% Recall',
    accentHex: '#FFCD06',
    headline: 'A Reason to Imagine Across 4 Markets',
    photo: airtelPhoto,
    description:
      'A unified regional brand system connecting Airtel data speed and mobile money with everyday ambition across East Africa—backed by Publicis Groupe Africa scale.',
    metrics: ['+42% - Brand Recall', '12+ - Touchpoints', '360° - TTL Reach'],
    partners: ['Publicis Groupe', 'TDF Group', 'P&L Consulting'],
  },
  {
    name: 'KCB Group',
    client: 'KCB Group',
    brand: 'kcb',
    tag: 'Finance & MSME',
    metric: '5x Lead Lift',
    accentHex: '#FFCD06',
    headline: 'Human-First Financial Storytelling',
    photo: teamPhoto,
    description:
      'Turning retail banking, MSME lending, and digital finance into relatable stories rooted in street truth, driving human warmth alongside institutional trust.',
    metrics: ['8M+ - Regional Reach', '64% - Completion Rate', '5x - Digital Leads'],
    partners: ['Publicis Groupe', 'P&L Consulting'],
  },
  {
    name: 'Diageo · Tusker',
    client: 'Tusker',
    brand: 'tusker',
    tag: 'Cultural Pride',
    metric: '250+ Venues',
    accentHex: '#FFCD06',
    headline: 'From Stadium Anthems to On-Trade',
    photo: kcbPhoto,
    description:
      'Through-the-line creative platforms linking broadcast anthems, stadium sports energy, festival experiences, and on-trade activation across East Africa.',
    metrics: ['250+ - Activated Venues', '91% - Brief Alignment', '100+ - Yrs Craft'],
    partners: ['Publicis Groupe', 'Yellow Agency', 'TDF Group'],
  },
  {
    name: 'Isuzu',
    client: 'Isuzu',
    brand: 'isuzu',
    tag: 'Mobility',
    metric: '+185% Lift',
    accentHex: '#FFCD06',
    headline: 'Built for East African Terrain',
    photo: spotifyPhoto,
    description: '',
    metrics: ['+185% - Engagement', '4 - EA Markets', '360° - TTL'],
    partners: [],
  },
];

const MARQUEE_CLIENTS: BrandKey[] = [
  'spotify',
  'airtel',
  'kcb',
  'tusker',
  'isuzu',
  'capwell',
  'publicis',
  'indahash',
];

const CaseStudiesGrowlio: React.FC<CaseStudiesProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStudyIndex, setActiveStudyIndex] = useState(0);
  const [scrollProg, setScrollProg] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const isMobile = viewportWidth <= 768;
  const isCompact = viewportWidth <= 1024;

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setScrollProg(v);
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const activeData = CASE_STUDIES_DATA[activeStudyIndex];

  return (
    <section
      id="work-showcase"
      ref={sectionRef}
      style={{
        width: '100%',
        backgroundColor: '#FAF5E6',
        borderTop: '2px solid #30261D',
        borderBottom: '2px solid #30261D',
        padding: isMobile ? '64px 20px' : '96px 40px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes scrollMarqueeSquare { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        {/* Header Band */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            gap: '24px',
            borderBottom: '2px solid #30261D',
            paddingBottom: '32px',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                fontWeight: 400,
                fontSize: isMobile ? '44px' : '74px',
                lineHeight: 0.96,
                letterSpacing: '-0.025em',
                color: '#30261D',
                margin: 0,
              }}
            >
              Real Work. Real Coalition.
            </h2>
          </div>

          <p
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: '16px',
              lineHeight: 1.5,
              color: '#5A4634',
              maxWidth: '360px',
              margin: 0,
            }}
          >
            Select a client below or click any 3D monolith.
          </p>
        </div>

        {/* Rounded Unified Stage + Tabs Shell */}
        <motion.div
          style={{
            y: isCompact ? 0 : parallaxY,
            border: '2px solid #30261D',
            borderRadius: '26px',
            overflow: 'hidden',
            marginTop: '24px',
            backgroundColor: '#231B14',
          }}
        >
          {/* Client Selector Tabs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: viewportWidth <= 640 ? 'repeat(2, 1fr)' : isCompact ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
              borderBottom: '2px solid #30261D',
              backgroundColor: '#F2E7CA',
            }}
          >
            {CASE_STUDIES_DATA.map((item, idx) => {
              const isActive = idx === activeStudyIndex;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveStudyIndex(idx)}
                  style={{
                    padding: isMobile ? '14px 12px' : '18px 16px',
                    border: 'none',
                    borderRight: idx < CASE_STUDIES_DATA.length - 1 ? '1.5px solid rgba(48,38,29,0.22)' : 'none',
                    borderBottom: isCompact ? '1.5px solid rgba(48,38,29,0.22)' : 'none',
                    backgroundColor: isActive ? '#30261D' : 'transparent',
                    color: isActive ? '#FFCD06' : '#30261D',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '11px',
                      opacity: isActive ? 0.9 : 0.65,
                    }}
                  >
                    0{idx + 1} · {item.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                      fontSize: isMobile ? '18px' : '21px',
                      fontWeight: 700,
                    }}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main 3D Stage + Editorial Dossier Split */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isCompact ? '1fr' : '1.15fr 0.85fr',
              backgroundColor: '#231B14',
            }}
          >
          {/* Left: Real-Time Three.js 3D Monolith Carousel */}
          <div
            style={{
              height: isMobile ? '360px' : isCompact ? '440px' : '560px',
              position: 'relative',
              backgroundColor: '#231B14',
              borderRight: isCompact ? 'none' : '2px solid #30261D',
              borderBottom: isCompact ? '2px solid #30261D' : 'none',
            }}
          >
            <CoalitionStage3D
              items={CASE_STUDIES_DATA}
              activeIndex={activeStudyIndex}
              onSelect={setActiveStudyIndex}
              scrollProgress={scrollProg}
            />
            <div
              style={{
                position: 'absolute',
                left: '18px',
                bottom: '16px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                color: 'rgba(255, 205, 6, 0.88)',
                pointerEvents: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Interactive 3D Stage · Click Any Monolith or Move Pointer
            </div>
          </div>

          {/* Right: Rounded Active Case Dossier */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              color: '#30261D',
              padding: isMobile ? '24px' : '38px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '22px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <BrandLogoMark brand={activeData.brand} theme="light" />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: '#FFCD06',
                    color: '#30261D',
                    padding: '5px 12px',
                    borderRadius: '999px',
                  }}
                >
                  {activeData.tag}
                </span>
              </div>

              {/* Rounded Frame Preview */}
              <div style={{ width: '100%', height: isMobile ? '190px' : '220px', border: '1.5px solid #30261D', overflow: 'hidden', borderRadius: '18px' }}>
                <img
                  src={activeData.photo}
                  alt={activeData.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '16px' }}
                />
              </div>

              <h3
                style={{
                  fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                  fontSize: isMobile ? '26px' : '32px',
                  lineHeight: 1.12,
                  color: '#30261D',
                  margin: 0,
                }}
              >
                {activeData.headline}
              </h3>

              {/* Rounded Metric Ledger */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: viewportWidth <= 520 ? '1fr' : 'repeat(3, 1fr)',
                  border: '1.5px solid #30261D',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  backgroundColor: '#FAF5E6',
                }}
              >
                {activeData.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 10px',
                      borderRight: viewportWidth > 520 && idx < 2 ? '1px solid rgba(48,38,29,0.22)' : 'none',
                      borderBottom: viewportWidth <= 520 && idx < 2 ? '1px solid rgba(48,38,29,0.22)' : 'none',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#30261D',
                    }}
                  >
                    <AnimatedMetric metric={metric} index={idx} studyIndex={activeStudyIndex} />
                  </div>
                ))}
              </div>
            </div>

            {onNavigate && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid rgba(48,38,29,0.2)' }}>
                <button
                  type="button"
                  onClick={() => onNavigate('/work')}
                  style={{
                    backgroundColor: '#30261D',
                    color: '#FFCD06',
                    border: '1.5px solid #30261D',
                    borderRadius: '999px',
                    padding: '10px 20px',
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  View Case Study →
                </button>
              </div>
            )}
          </div>
          </div>
        </motion.div>

        {/* Rounded Client Logos Marquee Strip */}
        <div
          style={{
            marginTop: '24px',
            border: '2px solid #30261D',
            backgroundColor: '#FFFFFF',
            height: '74px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '20px',
          }}
        >
          <div style={{ display: 'flex', width: 'max-content', animation: 'scrollMarqueeSquare 28s linear infinite' }}>
            {[0, 1].map((dup) => (
              <div
                key={dup}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '48px',
                  paddingRight: '48px',
                }}
              >
                {MARQUEE_CLIENTS.map((b) => (
                  <BrandLogoMark key={`${dup}-${b}`} brand={b} theme="light" compact />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesGrowlio;
