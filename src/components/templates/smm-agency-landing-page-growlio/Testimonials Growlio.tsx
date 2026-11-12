import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import spotifyPhoto from '../../../assets/images/campaign_spotify_culture_1794516064451.jpg';
import airtelPhoto from '../../../assets/images/campaign_airtel_mobile_1794516064598.jpg';
import kcbPhoto from '../../../assets/images/campaign_kcb_tusker_1794516063709.jpg';
import teamPhoto from '../../../assets/images/partnership_nairobi_team_1794516081711.jpg';
import { CoinBrandFace } from '../../BrandLogos';

interface CoinItem {
  id: string;
  kind: 'logo' | 'photo';
  brand?: 'airtel' | 'spotify' | 'kcb' | 'tusker' | 'publicis' | 'isuzu';
  subtitle?: string;
  bg?: string;
  text: string;
  fontSize: string;
}

const COINS: CoinItem[] = [
  {
    id: '61',
    kind: 'logo',
    brand: 'airtel',
    subtitle: '+42% Recall · 4 Markets',
    text: '“Airtel Africa scaled +42% recall across Kenya, Uganda, Tanzania & Rwanda.”',
    fontSize: '21px',
  },
  {
    id: '62',
    kind: 'logo',
    brand: 'spotify',
    subtitle: '100M+ Reel Views',
    text: '“Spotify EA street sound & Indahash creator drop drove 3x engagement lift.”',
    fontSize: '22px',
  },
  {
    id: '63',
    kind: 'logo',
    brand: 'kcb',
    subtitle: '5x Digital Leads',
    text: '“KCB MSME & retail banking storytelling accelerated 5x in Kenya.”',
    fontSize: '17px',
  },
  {
    id: '64',
    kind: 'photo',
    bg: teamPhoto,
    text: '“Problem ID starts on the street in Nairobi, never guesswork.”',
    fontSize: '15px',
  },
  {
    id: '65',
    kind: 'logo',
    brand: 'tusker',
    subtitle: '250+ Venues',
    text: '“Diageo & Tusker activated 250+ venues seamlessly through the line.”',
    fontSize: '15px',
  },
  {
    id: '66',
    kind: 'photo',
    bg: spotifyPhoto,
    text: '“Indahash + strategy operating inside one agile Nairobi pod.”',
    fontSize: '15px',
  },
  {
    id: '70',
    kind: 'logo',
    brand: 'publicis',
    subtitle: 'Global Alliance',
    text: '“Publicis Groupe firepower paired with Nairobi cultural instinct.”',
    fontSize: '13px',
  },
  {
    id: '67',
    kind: 'photo',
    bg: airtelPhoto,
    text: '“We over Me changes how East African campaigns compound.”',
    fontSize: '15px',
  },
  {
    id: '68',
    kind: 'logo',
    brand: 'isuzu',
    subtitle: 'Regional Mobility',
    text: '“Isuzu & Capwell built enduring commercial equity across the region.”',
    fontSize: '14px',
  },
  {
    id: '69',
    kind: 'photo',
    bg: kcbPhoto,
    text: '“Heart, mind & instinct.”',
    fontSize: '12px',
  },
];

const TestimonialsGrowlio = () => {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
        const availableWidth = window.innerWidth - 120;
        let newScale = availableWidth / 1440;
        const availableHeight = window.innerHeight;
        const heightScale = availableHeight / 874;
        newScale = Math.min(newScale, heightScale, 1.15);
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dropBounceVariants = {
    hidden: { y: -600, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring' as const,
        bounce: 0.35,
        duration: 1.4,
      },
    }),
  };

  return (
    <>
      <style>{`
        .testimonials-section-wrapper {
          width: 100%;
          height: 100vh;
          background: #FAF5E6;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          font-family: 'Inter Tight', sans-serif;
        }
        .testimonials-container {
          width: 1440px;
          height: 874px;
          position: relative;
          transform-origin: center center;
          flex-shrink: 0;
        }
        .testimonials-header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          position: absolute;
          width: 844px;
          height: 182px;
          left: calc(50% - 422px);
          top: 68px;
        }
        .testimonials-tag {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
        }
        .testimonials-tag-dot {
          width: 8px;
          height: 8px;
          background: #30261D;
        }
        .testimonials-tag-text {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #866C1D;
        }
        .testimonials-title-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 14px;
          width: 100%;
        }
        .testimonials-title {
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
          font-weight: 400;
          font-size: 68px;
          line-height: 70px;
          text-align: center;
          letter-spacing: -0.02em;
          color: #30261D;
          margin: 0;
          width: 680px;
        }
        .testimonials-subtitle {
          font-weight: 400;
          font-size: 17px;
          line-height: 26px;
          text-align: center;
          color: #5A4634;
          max-width: 580px;
          margin: 0;
        }
        .avatar-wrapper {
          position: absolute;
          perspective: 1000px;
        }
        .flip-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
          transform-style: preserve-3d;
          border-radius: 50%;
          border: 2.5px solid #30261D;
          box-sizing: border-box;
          box-shadow: 0 14px 28px rgba(48, 38, 29, 0.16);
        }
        .flip-front, .flip-back {
          width: 100%;
          height: 100%;
          position: absolute;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 50%;
          overflow: hidden;
        }
        .flip-front {
          background-size: cover;
          background-position: center;
        }
        .flip-back {
          background-color: #30261D;
          color: #FFCD06;
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          text-align: center;
          box-sizing: border-box;
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
        }
        .avatar-61 { width: 330px; height: 330px; left: 388px; top: 392px; }
        .avatar-62 { width: 356px; height: 356px; left: 1068px; top: 416px; }
        .avatar-63 { width: 238px; height: 238px; left: 718px; top: 548px; }
        .avatar-64 { width: 186px; height: 186px; left: 892px; top: 412px; }
        .avatar-65 { width: 188px; height: 188px; left: 708px; top: 340px; }
        .avatar-66 { width: 188px; height: 188px; left: 6px; top: 320px; }
        .avatar-70 { width: 146px; height: 146px; left: 8px; top: 524px; }
        .avatar-67 { width: 188px; height: 188px; left: 192px; top: 400px; }
        .avatar-68 { width: 162px; height: 162px; left: 244px; top: 604px; }
        .avatar-69 { width: 106px; height: 106px; left: 148px; top: 576px; }
      `}</style>

      {isMobile ? (
        <section style={{ width: '100%', backgroundColor: '#FAF5E6', padding: '56px 20px', boxSizing: 'border-box', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            <div className="testimonials-tag">
              <div className="testimonials-tag-dot" />
              <div className="testimonials-tag-text">Coalition Proof</div>
            </div>
            <h2 className="testimonials-title" style={{ width: '100%', fontSize: '38px', lineHeight: '42px' }}>
              Trusted Across East Africa
            </h2>
            <p className="testimonials-subtitle" style={{ width: '100%' }}>
              Tap any coin to reveal outcomes across Airtel Africa, Spotify, KCB Group, and Diageo.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '100%' }}>
            {COINS.slice(0, 6).map((av) => (
              <div key={av.id} style={{ width: '100%', aspectRatio: '1/1', perspective: '1000px' }}>
                <motion.div className="flip-inner" whileHover={{ rotateY: 180 }} whileTap={{ rotateY: 180 }}>
                  <div
                    className="flip-front"
                    style={av.kind === 'photo' && av.bg ? { backgroundImage: `url('${av.bg}')` } : undefined}
                  >
                    {av.kind === 'logo' && av.brand && (
                      <CoinBrandFace brand={av.brand} subtitle={av.subtitle || ''} />
                    )}
                  </div>
                  <div className="flip-back" style={{ fontSize: '14px' }}>
                    <p style={{ margin: 0 }}>{av.text}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="testimonials-section-wrapper">
          <div className="testimonials-container" style={{ transform: `scale(${scale})` }}>
            <div className="testimonials-header">
              <div className="testimonials-tag">
                <div className="testimonials-tag-dot" />
                <div className="testimonials-tag-text">Coalition Proof</div>
              </div>
              <div className="testimonials-title-container">
                <h2 className="testimonials-title">Trusted Across East Africa</h2>
                <p className="testimonials-subtitle">
                  Hover any brand coin or campaign portrait to inspect outcomes delivered across Airtel Africa, Spotify, KCB Group, and Diageo.
                </p>
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            >
              {COINS.map((av, index) => (
                <motion.div
                  key={av.id}
                  custom={index}
                  variants={dropBounceVariants}
                  className={`avatar-wrapper avatar-${av.id}`}
                  style={{ pointerEvents: 'auto' }}
                >
                  <motion.div className="flip-inner" whileHover={{ rotateY: 180 }}>
                    <div
                      className="flip-front"
                      style={av.kind === 'photo' && av.bg ? { backgroundImage: `url('${av.bg}')` } : undefined}
                    >
                      {av.kind === 'logo' && av.brand && (
                        <CoinBrandFace brand={av.brand} subtitle={av.subtitle || ''} />
                      )}
                    </div>
                    <div className="flip-back" style={{ fontSize: av.fontSize }}>
                      <p style={{ margin: 0 }}>{av.text}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default TestimonialsGrowlio;
