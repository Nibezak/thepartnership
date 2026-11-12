import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AGENCY_CONTACT } from '../../../data/kolibrieData';
import { AppRoute } from '../../../data/agencyPagesData';
import { PartnershipLionCrest } from './Header Growlio';

interface FooterProps {
  onNavigate?: (route: AppRoute) => void;
}

const FLOATING_BADGES = [
  { label: 'ATL', left: '87px', top: '197px' },
  { label: 'BTL', left: '369px', top: '104px' },
  { label: 'IDEA', left: '219px', top: '456px' },
  { label: 'KE·UG', left: '14px', top: '614px' },
  { label: 'TZ·RW', left: '1056px', top: '259px' },
  { label: 'TTL', left: '1325px', top: '129px' },
];

const FooterGrowlio: React.FC<FooterProps> = ({ onNavigate }) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);

      if (!mobile) {
        const availableWidth = window.innerWidth - 120;
        setScale(Math.min(availableWidth / 1440, 1.15));
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculatePupilOffset = (eyeCenterX: number, eyeCenterY: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const absEyeX = rect.left + eyeCenterX * scale;
    const absEyeY = rect.top + eyeCenterY * scale;

    const dx = (mousePos.x - absEyeX) / scale;
    const dy = (mousePos.y - absEyeY) / scale;
    const angle = Math.atan2(dy, dx);

    const Rx = (263.87 - 98.62) / 2;
    const Ry = (438 - 98.62) / 2;
    const maxDist = (Rx * Ry) / Math.sqrt(Math.pow(Ry * Math.cos(angle), 2) + Math.pow(Rx * Math.sin(angle), 2));
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.3, maxDist);

    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
    };
  };

  const leftPupilOffset = calculatePupilOffset(557, 1020);
  const rightPupilOffset = calculatePupilOffset(883, 1020);

  const navLinks: { label: string; route: AppRoute }[] = [
    { label: 'Home', route: '/' },
    { label: 'About Us', route: '/about' },
    { label: 'Our Work', route: '/work' },
    { label: 'Clients', route: '/clients' },
    { label: 'Contact Us', route: '/contact' },
  ];

  const capabilityLinks = [
    'Problem Identification',
    'Integrated ATL',
    'Indahash Creators',
    'Through-the-Line',
  ];

  return (
    <footer id="footer-contact">
      <style>{`
        .footer-section-wrapper {
          width: 100%;
          background: #231B14;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
          font-family: 'Inter Tight', sans-serif;
          position: relative;
        }
        .footer-container {
          width: 1440px;
          height: 1793px;
          position: absolute;
          top: 0;
          transform-origin: top center;
          flex-shrink: 0;
        }
        .footer-ellipse {
          position: absolute;
          width: 1989px;
          height: 1989px;
          left: calc(50% - 994.5px);
          top: 601px;
          background: #30261D;
          border: 3px solid #FFCD06;
          border-radius: 50%;
        }
        .footer-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 36px;
          position: absolute;
          width: 760px;
          left: calc(50% - 380px);
          top: 120px;
        }
        .footer-title {
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
          font-weight: 400;
          font-size: 148px;
          line-height: 132px;
          text-align: center;
          letter-spacing: -0.02em;
          color: #FFCD06;
          margin: 0;
        }
        .get-started-btn {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          padding: 6px;
          gap: 6px;
          border: 1.5px solid #FFCD06;
          border-radius: 999px;
          cursor: pointer;
          background: transparent;
        }
        .btn-text-container {
          padding: 10px 28px;
          background: #FFCD06;
          border-radius: 999px;
        }
        .btn-text {
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
          font-weight: 700;
          font-size: 24px;
          color: #30261D;
          margin: 0;
        }
        .btn-arrow-container {
          width: 54px;
          height: 54px;
          background: #FFCD06;
          border-radius: 999px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .eyes-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 62px;
          position: absolute;
          width: 590px;
          height: 438px;
          left: calc(50% - 295px);
          top: 785px;
        }
        .eye {
          width: 263.87px;
          height: 438px;
          background: #FAF5E6;
          border: 3px solid #FFCD06;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
        }
        .pupil {
          position: absolute;
          width: 98.62px;
          height: 98.62px;
          background: #30261D;
          border: 4px solid #FFCD06;
          border-radius: 50%;
          left: calc(50% - 49.31px);
          top: calc(50% - 49.31px);
          transition: transform 0.1s ease-out;
        }
        .floating-chip {
          position: absolute;
          padding: 10px 18px;
          border-radius: 999px;
          background: #30261D;
          border: 1.5px solid #FFCD06;
          color: #FFCD06;
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 13px;
        }
        .footer-links-row {
          position: absolute;
          width: 100%;
          height: 220px;
          left: 0;
          top: 1465px;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          position: absolute;
        }
        .col-title {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #FFCD06;
          margin: 0;
        }
        .col-links {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .link-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          text-decoration: none;
        }
        .link-dot {
          width: 7px;
          height: 7px;
          background: #FFCD06;
          border-radius: 2px;
        }
        .link-text {
          font-weight: 500;
          font-size: 16px;
          color: #FAF5E6;
          margin: 0;
        }
        .company-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 240px;
        }
        .company-text {
          font-weight: 400;
          font-size: 15px;
          line-height: 22px;
          color: #FAF5E6;
          margin: 0;
          opacity: 0.9;
        }
        .copyright {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 1736px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: rgba(250, 245, 230, 0.72);
          margin: 0;
          white-space: nowrap;
        }
        .logo-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 14px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 1495px;
        }
        .logo-text {
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
          font-weight: 400;
          font-size: 54px;
          color: #FFCD06;
          margin: 0;
        }
      `}</style>

      {isMobile ? (
        <div style={{ width: '100%', backgroundColor: '#231B14', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '56px' }}>
          <h2 style={{ fontSize: '48px', lineHeight: '52px', textAlign: 'center', color: '#FFCD06', margin: '0 20px 32px', fontFamily: "'Goudy Bookletter 1911', serif" }}>
            Don’t Hesitate to Reach Out
          </h2>

          <button type="button" onClick={() => onNavigate?.('/contact')} className="get-started-btn animated-btn" style={{ marginBottom: '48px' }}>
            <div className="btn-text-container">
              <p className="btn-text" style={{ fontSize: '18px' }}>Start a Brief</p>
            </div>
            <div className="btn-arrow-container" style={{ width: '44px', height: '44px' }}>
              <svg width="12" height="16" viewBox="0 0 14 19" fill="none">
                <path d="M1.5 1.5L11.8 9.75L1.5 18" stroke="#30261D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          <div style={{ width: '100%', backgroundColor: '#30261D', borderTop: '2px solid #FFCD06', padding: '48px 20px', display: 'flex', flexDirection: 'column', gap: '36px', alignItems: 'center', borderRadius: '36px 36px 0 0', boxSizing: 'border-box' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', width: '100%', maxWidth: '420px' }}>
              <div>
                <h4 className="col-title">Navigation</h4>
                <div className="col-links" style={{ marginTop: '12px' }}>
                  {navLinks.map((item) => (
                    <button type="button" key={item.route} onClick={() => onNavigate?.(item.route)} className="link-item">
                      <div className="link-dot" />
                      <p className="link-text" style={{ fontSize: '14px' }}>{item.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="col-title">Capabilities</h4>
                <div className="col-links" style={{ marginTop: '12px' }}>
                  {capabilityLinks.map((item) => (
                    <button type="button" key={item} onClick={() => onNavigate?.('/work')} className="link-item">
                      <div className="link-dot" />
                      <p className="link-text" style={{ fontSize: '14px' }}>{item}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="col-title">Connect</h4>
                <div className="col-links" style={{ marginTop: '12px' }}>
                  {AGENCY_CONTACT.socials.map((soc) => (
                    <a key={soc.label} href={soc.href} target="_blank" rel="noopener noreferrer" className="link-item">
                      <div className="link-dot" />
                      <p className="link-text" style={{ fontSize: '14px' }}>{soc.label}</p>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="col-title">Nairobi HQ</h4>
                <div className="company-info" style={{ width: '100%', marginTop: '12px' }}>
                  <p className="company-text" style={{ fontSize: '13px' }}>{AGENCY_CONTACT.address}</p>
                  <p className="company-text" style={{ fontSize: '13px', color: '#FFCD06' }}>{AGENCY_CONTACT.email}</p>
                  <p className="company-text" style={{ fontSize: '13px' }}>{AGENCY_CONTACT.phone}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <PartnershipLionCrest size={34} color="#FFCD06" />
              <h2 className="logo-text" style={{ fontSize: '34px' }}>the Partnership</h2>
            </div>

            <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', color: 'rgba(250,245,230,0.7)', textAlign: 'center', margin: 0 }}>
              © 2026 The Partnership Africa · Powered by Publicis
            </p>
          </div>
        </div>
      ) : (
        <div className="footer-section-wrapper" style={{ height: 1793 * scale }}>
          <div className="footer-container" ref={containerRef} style={{ transform: `scale(${scale})` }}>
            <motion.div
              className="footer-ellipse"
              initial={{ y: 400, opacity: 0.5 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />

            {FLOATING_BADGES.map((chip) => (
              <div key={chip.label} className="floating-chip" style={{ left: chip.left, top: chip.top }}>
                {chip.label}
              </div>
            ))}

            <div className="footer-header">
              <h2 className="footer-title">Don’t Hesitate to Reach Out</h2>
              <button type="button" onClick={() => onNavigate?.('/contact')} className="get-started-btn animated-btn">
                <div className="btn-text-container">
                  <p className="btn-text">Start a Brief</p>
                </div>
                <div className="btn-arrow-container">
                  <svg width="14" height="19" viewBox="0 0 14 19" fill="none">
                    <path d="M1.5 1.5L11.8 9.75L1.5 18" stroke="#30261D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="eyes-container">
              <div className="eye">
                <div className="pupil" style={{ transform: `translate(${leftPupilOffset.x}px, ${leftPupilOffset.y}px)` }} />
              </div>
              <div className="eye">
                <div className="pupil" style={{ transform: `translate(${rightPupilOffset.x}px, ${rightPupilOffset.y}px)` }} />
              </div>
            </div>

            <div className="footer-links-row">
              <div className="footer-col" style={{ left: '20px' }}>
                <h4 className="col-title">Navigation</h4>
                <div className="col-links">
                  {navLinks.map((item) => (
                    <button type="button" key={item.route} onClick={() => onNavigate?.(item.route)} className="link-item">
                      <div className="link-dot" />
                      <p className="link-text">{item.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="footer-col" style={{ left: '200px' }}>
                <h4 className="col-title">Nairobi Studio HQ</h4>
                <div className="company-info">
                  <p className="company-text">{AGENCY_CONTACT.address}</p>
                  <a href={`mailto:${AGENCY_CONTACT.email}`} style={{ color: '#FFCD06', textDecoration: 'none', fontWeight: 600 }}>
                    {AGENCY_CONTACT.email}
                  </a>
                  <a href="tel:+254746444333" style={{ color: '#FAF5E6', textDecoration: 'none', fontSize: '15px' }}>
                    {AGENCY_CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="footer-col" style={{ left: '1010px' }}>
                <h4 className="col-title">Connect</h4>
                <div className="col-links">
                  {AGENCY_CONTACT.socials.map((soc) => (
                    <a key={soc.label} href={soc.href} target="_blank" rel="noopener noreferrer" className="link-item">
                      <div className="link-dot" />
                      <p className="link-text">{soc.label}</p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="footer-col" style={{ left: '1210px' }}>
                <h4 className="col-title">Capabilities</h4>
                <div className="col-links">
                  {capabilityLinks.map((item) => (
                    <button type="button" key={item} onClick={() => onNavigate?.('/work')} className="link-item">
                      <div className="link-dot" />
                      <p className="link-text">{item}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="logo-container">
              <PartnershipLionCrest size={48} color="#FFCD06" />
              <h2 className="logo-text">the Partnership</h2>
            </div>

            <p className="copyright">© 2026 The Partnership Africa · Powered by Publicis · Kenya · Uganda · Tanzania · Rwanda</p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default FooterGrowlio;
