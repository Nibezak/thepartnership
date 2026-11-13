import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, useMotionValue, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    const rounded = useMotionValue(0);

    useEffect(() => {
      const unsub = count.on('change', (v) => rounded.set(Math.round(v)));
      count.set(0);
      const timeout = setTimeout(() => {
        animate(count, value, { duration: 0.85, ease: 'easeOut' });
      }, 60 + index * 75);
      return () => {
        clearTimeout(timeout);
        count.stop();
        unsub();
      };
    }, [value, index, studyIndex, count, rounded]);

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
  description: string;
  metrics: string[];
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
      'Turning East Africa’s breakout sound into daily cultural habit across Kenya, Uganda, and Tanzania with Indahash creator coalitions.',
    metrics: ['100M+ - Reel Views', '3x - Creator Lift', '4 - EA Markets'],
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
      'A unified regional system connecting Airtel data speed and mobile money with everyday ambition—backed by Publicis Groupe Africa.',
    metrics: ['+42% - Brand Recall', '12+ - Touchpoints', '360° - TTL Reach'],
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
      'Translating retail banking, MSME lending, and digital finance into relatable stories rooted in everyday street ambition.',
    metrics: ['8M+ - Regional Reach', '64% - Completion', '5x - Digital Leads'],
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
      'Through-the-line creative platforms linking broadcast anthems, stadium energy, and live on-trade activation across East Africa.',
    metrics: ['250+ - Activated Venues', '91% - Brief Alignment', '100+ - Yrs Craft'],
  },
  {
    name: 'Isuzu',
    client: 'Isuzu',
    brand: 'isuzu',
    tag: 'Mobility',
    metric: '+185% Lift',
    accentHex: '#FFCD06',
    headline: 'Built for East African Terrain',
    photo: '/assets/partnership/_Leadership_New_mid.jpg',
    description: '',
    metrics: ['+185% - Engagement', '4 - EA Markets', '360° - TTL'],
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

  const activeData = CASE_STUDIES_DATA[activeStudyIndex];
  const stepPrev = () =>
    setActiveStudyIndex((i) => (i - 1 + CASE_STUDIES_DATA.length) % CASE_STUDIES_DATA.length);
  const stepNext = () =>
    setActiveStudyIndex((i) => (i + 1) % CASE_STUDIES_DATA.length);

  return (
    <section
      id="work-showcase"
      ref={sectionRef}
      style={{
        width: '100%',
        backgroundColor: '#FAF5E6',
        borderTop: '2px solid #30261D',
        borderBottom: '2px solid #30261D',
        padding: isMobile ? '56px 16px' : '88px 36px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes scrollMarqueeSquare { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Clean Editorial Header + Rounded Pill Client Switcher */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            marginBottom: '26px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: isCompact ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isCompact ? 'flex-start' : 'flex-end',
              gap: '16px',
            }}
          >
            <h2
              style={{
                fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                fontWeight: 400,
                fontSize: isMobile ? '42px' : 'clamp(52px, 5.2vw, 74px)',
                lineHeight: 0.96,
                letterSpacing: '-0.025em',
                color: '#30261D',
                margin: 0,
              }}
            >
              Real Work. Real Coalition.
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {CASE_STUDIES_DATA.map((item, idx) => {
                const isActive = idx === activeStudyIndex;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActiveStudyIndex(idx)}
                    style={{
                      padding: isMobile ? '8px 14px' : '10px 18px',
                      borderRadius: '999px',
                      border: '1.5px solid #30261D',
                      backgroundColor: isActive ? '#30261D' : '#F2E7CA',
                      color: isActive ? '#FFCD06' : '#30261D',
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 700,
                      fontSize: isMobile ? '13px' : '14px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Re-Imagined Gallery Showcase: Warm Matte 3D Coverflow Stage + Clean Editorial Card */}
        <div
          style={{
            border: '2px solid #30261D',
            borderRadius: '30px',
            overflow: 'hidden',
            backgroundColor: '#EFE3C6',
            display: 'grid',
            gridTemplateColumns: isCompact ? '1fr' : '1.28fr 0.72fr',
          }}
        >
          {/* Left: Warm Matte 3D Photo Folio & Vinyl Coverflow */}
          <div
            style={{
              height: isMobile ? '370px' : isCompact ? '450px' : '540px',
              position: 'relative',
              backgroundColor: '#EFE3C6',
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

            {/* Tactile Round Prev/Next Stepper Buttons */}
            <div
              style={{
                position: 'absolute',
                right: '18px',
                bottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 10,
              }}
            >
              <button
                type="button"
                onClick={stepPrev}
                aria-label="Previous client work"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '999px',
                  border: '1.5px solid #30261D',
                  backgroundColor: '#FAF5E6',
                  color: '#30261D',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={stepNext}
                aria-label="Next client work"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '999px',
                  border: '1.5px solid #30261D',
                  backgroundColor: '#FFCD06',
                  color: '#30261D',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right: Focused Editorial Dossier (No Redundant Photo) */}
          <motion.div
            key={activeData.name}
            initial={{ opacity: 0.45, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26 }}
            style={{
              backgroundColor: '#FAF5E6',
              color: '#30261D',
              padding: isMobile ? '24px 20px' : '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <BrandLogoMark brand={activeData.brand} theme="light" />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: '#FFCD06',
                    border: '1px solid #30261D',
                    color: '#30261D',
                    padding: '5px 12px',
                    borderRadius: '999px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {activeData.tag}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                  fontSize: isMobile ? '30px' : '38px',
                  lineHeight: 1.08,
                  color: '#30261D',
                  margin: 0,
                }}
              >
                {activeData.headline}
              </h3>

              {activeData.description && (
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: '16px',
                    lineHeight: 1.55,
                    color: '#5A4634',
                    margin: 0,
                  }}
                >
                  {activeData.description}
                </p>
              )}

              {/* Rounded Metric Ledger */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: viewportWidth <= 520 ? '1fr' : 'repeat(3, 1fr)',
                  gap: '10px',
                }}
              >
                {activeData.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px 12px',
                      border: '1.5px solid #30261D',
                      borderRadius: '16px',
                      backgroundColor: '#F2E7CA',
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '14px', borderTop: '1.5px solid rgba(48,38,29,0.2)' }}>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px',
                    color: '#866C1D',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  0{activeStudyIndex + 1} / 0{CASE_STUDIES_DATA.length}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('/work')}
                  style={{
                    backgroundColor: '#30261D',
                    color: '#FFCD06',
                    border: '1.5px solid #30261D',
                    borderRadius: '999px',
                    padding: '11px 22px',
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Watch Campaign Films →
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Rounded Client Logos Marquee Strip */}
        <div
          style={{
            marginTop: '22px',
            border: '2px solid #30261D',
            backgroundColor: '#FFFFFF',
            height: '72px',
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
