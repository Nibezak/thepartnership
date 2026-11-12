import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import spotifyPhoto from '../../../assets/images/campaign_spotify_culture_1794516064451.jpg';
import { AppRoute } from '../../../data/agencyPagesData';

interface WhyProps {
  onNavigate?: (route: AppRoute) => void;
}

const WhyChooseUsGrowlio: React.FC<WhyProps> = ({ onNavigate }) => {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setScale(1);
      } else {
        const screenWidth = window.innerWidth;
        const baseWidth = 1600;
        let newScale = screenWidth / baseWidth;
        if (newScale > 1.15) newScale = 1.15;
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const approachItems = [
    {
      text: 'Problem Identification First',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#30261D" strokeWidth="1.8">
          <path d="M9 18h6M10 21h4M12 2v2M4.22 4.22l1.42 1.42M1 12h2M21 12h2M18.36 5.64l1.42-1.42M12 6a5 5 0 0 0-4.54 7.07A5.4 5.4 0 0 1 9 16h6a5.4 5.4 0 0 1 1.54-2.93A5 5 0 0 0 12 6z" />
        </svg>
      ),
    },
    {
      text: 'Publicis Groupe Africa Scale',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#30261D" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
        </svg>
      ),
    },
    {
      text: 'Indahash Creator Coalition',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#30261D" strokeWidth="1.8">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      ),
    },
    {
      text: 'TDF · Yellow · P&L Alliance',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#30261D" strokeWidth="1.8">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      text: 'Heart, Mind & Instinct',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#30261D" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
  ];

  if (isMobile) {
    return (
      <section style={{ width: '100%', backgroundColor: '#FAF5E6', padding: '48px 20px 64px', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '22px', overflow: 'hidden', border: '2px solid #30261D', marginBottom: '32px' }}>
          <video
            src="/assets/partnership/_Leadership_New.mp4"
            poster={spotifyPhoto}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare} />
            <span style={styles.pillText}>Why Choose Us</span>
          </div>
          <h2 style={{ ...styles.mainTitle, width: '100%', fontSize: '38px', lineHeight: '42px' }}>
            100+ Years Across Two Continents
          </h2>
          <p style={{ ...styles.subTitle, width: '100%' }}>
            Led by Sandeep Madan, Sally Sawe, and Deepesh Jha—uniting East African cultural instinct with global network firepower.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare} />
            <span style={styles.pillText}>The Coalition Advantage</span>
          </div>
          {approachItems.map((item, idx) => (
            <div key={idx} style={styles.approachItem}>
              <div style={styles.approachIconBox}>{item.icon}</div>
              <span style={styles.approachItemText}>{item.text}</span>
            </div>
          ))}
        </div>

        <p style={{ ...styles.subTitle, width: '100%', marginBottom: '28px' }}>
          Instead of forcing every problem through one silo, we assemble specialists across client, agency, and technology platforms to multiply outcomes.
        </p>

        <button
          type="button"
          onClick={() => onNavigate?.('/clients')}
          className="animated-btn"
          style={{ ...styles.ctaWrapper, position: 'relative', left: 'auto', top: 'auto', width: 'auto' }}
        >
          <div style={styles.ctaIconBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFCD06" strokeWidth="2.2">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
            </svg>
          </div>
          <div style={{ ...styles.ctaTextBox, width: 'auto', padding: '0 22px' }}>
            <span style={styles.ctaText}>See Coalition Ecosystem</span>
          </div>
        </button>
      </section>
    );
  }

  return (
    <section style={styles.fullWidthWrapper}>
      <div
        style={{
          ...styles.container,
          transform: `scale(${scale})`,
          marginBottom: `${-1248 * (1 - scale)}px`,
        }}
      >
        <div style={styles.topImage}>
          <video
            src="/assets/partnership/_Leadership_New.mp4"
            poster={spotifyPhoto}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        <div style={styles.leftColumn}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare} />
            <span style={styles.pillText}>Why The Partnership</span>
          </div>

          <div style={styles.titleGroup}>
            <h2 style={styles.mainTitle}>100+ Years Across Two Continents</h2>
            <p style={styles.subTitle}>
              Led by Sandeep Madan, Sally Sawe, and Deepesh Jha—combining East African cultural fluency with Publicis Groupe Africa scale.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/clients')}
          className="animated-btn"
          style={{ ...styles.ctaWrapper, background: 'transparent' }}
        >
          <div style={styles.ctaIconBox}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCD06" strokeWidth="2.2">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
            </svg>
          </div>
          <div style={styles.ctaTextBox}>
            <span style={styles.ctaText}>See Coalition Roster</span>
          </div>
        </button>

        <div style={styles.rightColumn}>
          <div style={styles.pillRow}>
            <div style={styles.pillSquare} />
            <span style={styles.pillText}>Coalition Pillars</span>
          </div>

          <div style={styles.approachList}>
            {approachItems.map((item, index) => (
              <motion.div
                key={index}
                style={styles.approachItem}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div style={styles.approachIconBox}>{item.icon}</div>
                <span style={styles.approachItemText}>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <p style={styles.bottomRightText}>
          Every brand challenge deserves a custom mix of talent, technology, and platforms—multiplying resources rather than splitting credit.
        </p>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  fullWidthWrapper: {
    width: '100%',
    backgroundColor: '#FAF5E6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  container: {
    width: '1600px',
    height: '1248px',
    position: 'relative',
    transformOrigin: 'top center',
    flexShrink: 0,
  },
  topImage: {
    position: 'absolute',
    width: '1540px',
    height: '680px',
    left: '30px',
    top: '16px',
    overflow: 'hidden',
    borderRadius: '36px',
    border: '2px solid #30261D',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '18px',
    position: 'absolute',
    width: '680px',
    left: '80px',
    top: '755px',
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
    gap: '14px',
    width: '680px',
  },
  mainTitle: {
    fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
    fontWeight: 400,
    fontSize: '68px',
    lineHeight: '70px',
    letterSpacing: '-0.02em',
    color: '#30261D',
    margin: 0,
  },
  subTitle: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '17px',
    lineHeight: '26px',
    color: '#5A4634',
    margin: 0,
    width: '580px',
  },
  ctaWrapper: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4px',
    gap: '4px',
    position: 'absolute',
    height: '58px',
    left: '80px',
    top: '1088px',
    border: '1.5px solid #30261D',
    borderRadius: '999px',
    cursor: 'pointer',
  },
  ctaIconBox: {
    width: '48px',
    height: '48px',
    backgroundColor: '#30261D',
    borderRadius: '999px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  ctaTextBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    height: '48px',
    backgroundColor: '#30261D',
    borderRadius: '999px',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: "'Goudy Bookletter 1911', Georgia, serif",
    fontWeight: 700,
    fontSize: '18px',
    color: '#FAF5E6',
    whiteSpace: 'nowrap',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '18px',
    position: 'absolute',
    width: '380px',
    left: '1060px',
    top: '755px',
  },
  approachList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    width: '380px',
  },
  approachItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minHeight: '32px',
  },
  approachIconBox: {
    width: '32px',
    height: '32px',
    backgroundColor: '#FFCD06',
    border: '1px solid #30261D',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  approachItemText: {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 600,
    fontSize: '19px',
    color: '#30261D',
  },
  bottomRightText: {
    position: 'absolute',
    width: '440px',
    left: '1060px',
    top: '1060px',
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
    color: '#5A4634',
    margin: 0,
  },
};

export default WhyChooseUsGrowlio;
