import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { RubiksProcessCube3D } from '../../three/RubiksProcessCube3D';

const PROCESS_STEPS = [
  {
    name: 'Problem ID',
    title: 'Diagnose Before Creating',
    desc: 'We identify the single commercial and cultural barrier holding your brand back across East Africa before touching creative executions.',
    tags: ['Street Immersion', 'Category Semiotics', 'Audience Truth'],
    kpi: '4 EA Markets',
  },
  {
    name: 'Coalition',
    title: 'Assemble The Right Minds',
    desc: 'Instead of forcing every challenge through one department, we unite Publicis Groupe Africa scale, Indahash creators, TDF, Yellow, and P&L Consulting.',
    tags: ['Publicis Alliance', 'Indahash Creators', 'TDF & Yellow'],
    kpi: 'Zero Silos',
  },
  {
    name: 'Creative Idea',
    title: 'Heart, Mind & Instinct',
    desc: 'Brave cultural ideas built to travel—turning Spotify street sound, Airtel velocity, and KCB ambition into work people actively share.',
    tags: ['Brand Platforms', 'Short-Form Reels', 'Anthem Film'],
    kpi: '100M+ Views',
  },
  {
    name: 'Multiply TTL',
    title: 'Through-the-Line Scale',
    desc: 'One unbroken thread from broadcast and OOH down to neighborhood bars, retail trade, and live creator feeds across Kenya, Uganda, Tanzania & Rwanda.',
    tags: ['ATL & Digital', 'On-Trade Activation', 'Trade ROI'],
    kpi: '250+ Venues',
  },
];

const METRICS = [
  { value: '100M+', label: 'Social & Reel Views' },
  { value: '+42%', label: 'Airtel Brand Recall' },
  { value: '5x', label: 'KCB Lead Velocity' },
  { value: '250+', label: 'Tusker Venues' },
  { value: '100+', label: 'Years Leadership' },
  { value: '4', label: 'East African Markets' },
];

const OurProcessGrowlio: React.FC = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollProg, setScrollProg] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isCompact = viewportWidth <= 1024;
  const isMobile = viewportWidth <= 640;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProg(latest);
    if (latest < 0.25) setActiveStepIndex(0);
    else if (latest < 0.5) setActiveStepIndex(1);
    else if (latest < 0.75) setActiveStepIndex(2);
    else setActiveStepIndex(3);
  });

  const handleCubeAdvance = () => {
    setActiveStepIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
  };

  const renderMetrics = () => (
    <>
      {METRICS.map((metric, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: '6px',
          }}
        >
          <span
            style={{
              fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
              fontWeight: 700,
              fontSize: isMobile ? '36px' : '50px',
              lineHeight: 1,
              color: '#FFCD06',
            }}
          >
            {metric.value}
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: isMobile ? '12px' : '13px',
              lineHeight: '22px',
              textTransform: 'uppercase',
              color: '#FAF5E6',
              whiteSpace: 'nowrap',
              marginBottom: '4px',
            }}
          >
            / {metric.label}
          </span>
        </div>
      ))}
    </>
  );

  const activeStep = PROCESS_STEPS[activeStepIndex];

  if (isCompact) {
    return (
      <section
        style={{
          width: '100%',
          backgroundColor: '#30261D',
          padding: isMobile ? '52px 16px 40px' : '64px 28px 48px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <style>{`@keyframes processMarqueeSquare { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>

        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#FFCD06', borderRadius: '2px' }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: '12px', letterSpacing: '0.09em', textTransform: 'uppercase', color: '#FFCD06' }}>
              Our Process
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
              fontWeight: 400,
              fontSize: isMobile ? '36px' : '48px',
              lineHeight: 1.04,
              color: '#FAF5E6',
              margin: 0,
            }}
          >
            From Insight to Influence
          </h2>

          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '15px', lineHeight: 1.5, color: 'rgba(250, 245, 230, 0.84)', margin: 0 }}>
            Four kinetic stages turning East African commercial tensions into multiplied consumer demand.
          </p>

          {/* Compact Rounded Stage Pills */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px', marginTop: '4px' }}>
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.name}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '999px',
                    border: `1.5px solid ${isActive ? '#FFCD06' : 'rgba(255, 205, 6, 0.35)'}`,
                    backgroundColor: isActive ? '#FFCD06' : 'rgba(35, 27, 20, 0.55)',
                    color: isActive ? '#30261D' : '#FAF5E6',
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: isMobile ? '13px' : '14px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    transition: 'all 0.2s ease',
                  }}
                >
                  0{idx + 1} · {step.name}
                </button>
              );
            })}
          </div>

          {/* Interactive 3D Rubik's Cube — Zero Border, Zero Status/Instruction Overlay */}
          <div
            style={{
              width: '100%',
              height: isMobile ? '310px' : '390px',
              margin: '4px 0',
              position: 'relative',
            }}
          >
            <RubiksProcessCube3D
              activeStep={activeStepIndex}
              scrollProgress={activeStepIndex / 3}
              onStepAdvance={handleCubeAdvance}
            />
          </div>

          {/* Active Stage Narrative Card */}
          <motion.div
            key={activeStepIndex}
            initial={{ opacity: 0.4, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              padding: isMobile ? '20px' : '26px',
              backgroundColor: '#231B14',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ color: '#FFCD06', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: '12px' }}>
                0{activeStepIndex + 1} · {activeStep.name}
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'rgba(250,245,230,0.75)' }}>
                {activeStep.kpi}
              </span>
            </div>
            <h3 style={{ fontFamily: "'Goudy Bookletter 1911', serif", fontSize: isMobile ? '28px' : '34px', lineHeight: 1.08, color: '#FFCD06', margin: 0 }}>
              {activeStep.title}
            </h3>
            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '15px', lineHeight: 1.55, margin: 0, color: '#FAF5E6' }}>
              {activeStep.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
              {activeStep.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: '1px solid rgba(255, 205, 6, 0.5)',
                    color: '#FFCD06',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px',
                    padding: '4px 10px',
                    borderRadius: '999px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ width: '100%', overflow: 'hidden', borderTop: '1px solid rgba(255,205,6,0.28)', paddingTop: '20px', marginTop: '32px' }}>
          <div style={{ display: 'flex', width: 'max-content', animation: 'processMarqueeSquare 28s linear infinite' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '36px', paddingRight: '36px', flexShrink: 0 }}>
              {renderMetrics()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '36px', paddingRight: '36px', flexShrink: 0 }}>
              {renderMetrics()}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={targetRef}
      style={{
        width: '100%',
        backgroundColor: '#231B14',
        position: 'relative',
        height: '320vh',
      }}
    >
      <style>{`@keyframes processMarqueeSquare { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>

      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#231B14',
        }}
      >
        {/* Top Espresso Curved Stage */}
        <div
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#30261D',
            borderRadius: '0 0 48px 48px',
            borderBottom: '2px solid #FFCD06',
            padding: '84px 40px 36px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '28px',
          }}
        >
          {/* Section Title */}
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#FFCD06', borderRadius: '2px' }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: '13px', letterSpacing: '0.09em', textTransform: 'uppercase', color: '#FFCD06' }}>
                Our Process
              </span>
            </div>
            <h2 style={{ fontFamily: "'Goudy Bookletter 1911', Georgia, serif", fontWeight: 400, fontSize: 'clamp(2.8rem, 4.4vw, 4.4rem)', lineHeight: 1.02, letterSpacing: '-0.02em', color: '#FAF5E6', margin: 0 }}>
              From Insight to Influence
            </h2>
            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '17px', lineHeight: 1.5, color: 'rgba(250, 245, 230, 0.84)', margin: 0, maxWidth: '580px' }}>
              Four kinetic stages transforming East African commercial tensions into multiplied consumer demand.
            </p>
          </div>

          {/* Fluid 3-Column Responsive Grid: Stages | Borderless 3D Rubik's Cube | Active Narrative */}
          <div
            style={{
              width: '100%',
              maxWidth: '1360px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 240px) minmax(0, 1fr) minmax(0, 380px)',
              gap: '28px',
              alignItems: 'center',
            }}
          >
            {/* Left Stage Track */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ width: '8px', height: '276px', backgroundColor: 'rgba(255, 205, 6, 0.22)', borderRadius: '999px', position: 'relative', flexShrink: 0 }}>
                <div
                  style={{
                    position: 'absolute',
                    width: '8px',
                    height: '62px',
                    left: 0,
                    top: `${activeStepIndex * 71}px`,
                    backgroundColor: '#FFCD06',
                    borderRadius: '999px',
                    transition: 'top 0.3s ease',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {PROCESS_STEPS.map((step, index) => {
                  const isActive = index === activeStepIndex;
                  return (
                    <button
                      type="button"
                      key={step.name}
                      onClick={() => setActiveStepIndex(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        textAlign: 'left',
                        fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                        fontSize: '25px',
                        lineHeight: '28px',
                        height: '51px',
                        color: isActive ? '#FFCD06' : 'rgba(250, 245, 230, 0.45)',
                        cursor: 'pointer',
                        transition: 'color 0.25s ease',
                      }}
                    >
                      <span style={{ display: 'block', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', marginBottom: '2px' }}>
                        STAGE 0{index + 1}
                      </span>
                      {step.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center: Pure Floating Interactive 3D Rubik's Cube — Zero Border, Zero Text Overlays */}
            <div
              style={{
                width: '100%',
                height: 'clamp(360px, 44vh, 490px)',
                position: 'relative',
              }}
            >
              <RubiksProcessCube3D
                activeStep={activeStepIndex}
                scrollProgress={scrollProg}
                onStepAdvance={handleCubeAdvance}
              />
            </div>

            {/* Right: Rounded Step Narrative */}
            <motion.div
              key={activeStepIndex}
              initial={{ opacity: 0.4, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '28px',
                border: '1.5px solid rgba(255, 205, 6, 0.38)',
                borderRadius: '26px',
                backgroundColor: '#231B14',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '12px',
                  color: '#FFCD06',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Stage 0{activeStepIndex + 1} · {activeStep.name}
              </div>
              <h3
                style={{
                  fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
                  fontWeight: 400,
                  fontSize: '36px',
                  lineHeight: 1.08,
                  color: '#FFCD06',
                  margin: 0,
                }}
              >
                {activeStep.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: '15px',
                  lineHeight: 1.55,
                  color: '#FAF5E6',
                  margin: 0,
                }}
              >
                {activeStep.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                {activeStep.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      border: '1px solid rgba(255, 205, 6, 0.55)',
                      color: '#FFCD06',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '11px',
                      padding: '5px 11px',
                      borderRadius: '999px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Metrics Marquee */}
        <div
          style={{
            width: '100%',
            height: '82px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', width: 'max-content', animation: 'processMarqueeSquare 28s linear infinite' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '44px', paddingRight: '44px', flexShrink: 0 }}>
              {renderMetrics()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '44px', paddingRight: '44px', flexShrink: 0 }}>
              {renderMetrics()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcessGrowlio;
