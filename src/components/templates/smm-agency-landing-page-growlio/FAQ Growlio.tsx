import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AGENCY_FAQS, AppRoute } from '../../../data/agencyPagesData';

interface FAQProps {
  onNavigate?: (route: AppRoute) => void;
}

const FAQGrowlio: React.FC<FAQProps> = ({ onNavigate }) => {
  const [scale, setScale] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
        const availableWidth = window.innerWidth - 120;
        const newScale = Math.min(availableWidth / 1440, window.innerHeight / 766, 1.15);
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style>{`
        .faq-section-wrapper {
          width: 100%;
          height: 100vh;
          min-height: 700px;
          background: #FAF5E6;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          font-family: 'Inter Tight', sans-serif;
        }
        .faq-container {
          width: 1440px;
          height: 766px;
          position: relative;
          transform-origin: center center;
          flex-shrink: 0;
        }
        .faq-header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          position: absolute;
          width: 844px;
          height: 182px;
          left: calc(50% - 422px);
          top: 56px;
        }
        .faq-tag {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
        }
        .faq-tag-dot {
          width: 8px;
          height: 8px;
          background: #30261D;
          border-radius: 2px;
        }
        .faq-tag-text {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #866C1D;
        }
        .faq-title {
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
          font-weight: 400;
          font-size: 68px;
          line-height: 70px;
          text-align: center;
          letter-spacing: -0.02em;
          color: #30261D;
          margin: 0;
        }
        .faq-subtitle {
          font-weight: 400;
          font-size: 17px;
          line-height: 26px;
          text-align: center;
          color: #5A4634;
          max-width: 580px;
          margin: 0;
        }
        .faq-content {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          gap: 20px;
          position: absolute;
          width: 1120px;
          height: 410px;
          left: calc(50% - 560px);
          top: 280px;
        }
        .questions-card {
          width: 550px;
          background: #30261D;
          border: 2px solid #30261D;
          border-radius: 24px;
          padding: 32px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .questions-label {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FFCD06;
          margin: 0;
        }
        .questions-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 16px;
        }
        .question-item {
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
          font-weight: 400;
          font-size: 24px;
          line-height: 30px;
          color: #FAF5E6;
          margin: 0;
          cursor: pointer;
          opacity: 0.55;
          transition: opacity 0.2s, color 0.2s;
          background: none;
          border: none;
          text-align: left;
          padding: 0;
        }
        .question-item:hover { opacity: 0.85; }
        .question-item.active {
          opacity: 1;
          color: #FFCD06;
        }
        .answer-card {
          width: 550px;
          background: #FFFFFF;
          border: 2px solid #30261D;
          border-radius: 24px;
          padding: 32px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .answer-label {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #866C1D;
          margin: 0;
        }
        .answer-title {
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
          font-weight: 400;
          font-size: 26px;
          line-height: 32px;
          color: #30261D;
          margin: 14px 0 12px;
        }
        .answer-text {
          font-weight: 400;
          font-size: 16px;
          line-height: 25px;
          color: #5A4634;
          margin: 0;
        }
        .contact-cta {
          padding-top: 20px;
          border-top: 1px solid rgba(48, 38, 29, 0.14);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .contact-text {
          font-weight: 500;
          font-size: 15px;
          color: #30261D;
          margin: 0;
        }
        .contact-btn {
          display: inline-flex;
          align-items: center;
          padding: 4px;
          gap: 4px;
          border: 1.5px solid #30261D;
          border-radius: 999px;
          cursor: pointer;
          background: transparent;
        }
        .btn-text-container {
          padding: 6px 16px;
          background: #FFCD06;
          border-radius: 999px;
        }
        .btn-text {
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
          font-weight: 700;
          font-size: 16px;
          color: #30261D;
          margin: 0;
          white-space: nowrap;
        }
        .btn-arrow-container {
          width: 34px;
          height: 34px;
          background: #30261D;
          border-radius: 999px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      {isMobile ? (
        <section style={{ width: '100%', backgroundColor: '#FAF5E6', padding: '56px 20px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div className="faq-tag">
              <div className="faq-tag-dot" />
              <div className="faq-tag-text">FAQ</div>
            </div>
            <h2 className="faq-title" style={{ width: '100%', fontSize: '38px', lineHeight: '42px' }}>
              Everything You Need to Know
            </h2>
            <p className="faq-subtitle" style={{ width: '100%' }}>
              How our Nairobi hub and regional partner network work together for brands across East Africa.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="questions-card" style={{ width: '100%' }}>
              <p className="questions-label">Questions</p>
              <div className="questions-list">
                {AGENCY_FAQS.map((faq, idx) => (
                  <button
                    type="button"
                    key={faq.q}
                    className={`question-item ${activeQuestion === idx ? 'active' : ''}`}
                    onClick={() => setActiveQuestion(idx)}
                    style={{ fontSize: '19px', lineHeight: '25px' }}
                  >
                    {faq.q}
                  </button>
                ))}
              </div>
            </div>

            <div className="answer-card" style={{ width: '100%' }}>
              <div>
                <p className="answer-label">Answer</p>
                <h3 className="answer-title">{AGENCY_FAQS[activeQuestion].q}</h3>
                <p className="answer-text">{AGENCY_FAQS[activeQuestion].a}</p>
              </div>

              <div className="contact-cta" style={{ marginTop: '24px', flexWrap: 'wrap' }}>
                <p className="contact-text">Have a brief for Nairobi or East Africa?</p>
                <button type="button" onClick={() => onNavigate?.('/contact')} className="contact-btn animated-btn">
                  <div className="btn-text-container">
                    <p className="btn-text">Contact Us</p>
                  </div>
                  <div className="btn-arrow-container">
                    <svg width="9" height="12" viewBox="0 0 9 12" fill="none">
                      <path d="M1 1L7.5 6L1 11" stroke="#FFCD06" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="faq-section-wrapper">
          <div className="faq-container" style={{ transform: `scale(${scale})` }}>
            <div className="faq-header">
              <div className="faq-tag">
                <div className="faq-tag-dot" />
                <div className="faq-tag-text">FAQ</div>
              </div>
              <h2 className="faq-title">Everything You Need to Know</h2>
              <p className="faq-subtitle">
                How our Nairobi hub and coalition partners collaborate with ambitious brands across East Africa.
              </p>
            </div>

            <div className="faq-content">
              <div className="questions-card">
                <p className="questions-label">Questions</p>
                <div className="questions-list">
                  {AGENCY_FAQS.map((faq, idx) => (
                    <button
                      type="button"
                      key={faq.q}
                      className={`question-item ${activeQuestion === idx ? 'active' : ''}`}
                      onClick={() => setActiveQuestion(idx)}
                    >
                      {faq.q}
                    </button>
                  ))}
                </div>
              </div>

              <motion.div
                key={activeQuestion}
                initial={{ opacity: 0.7, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="answer-card"
              >
                <div>
                  <p className="answer-label">Answer</p>
                  <h3 className="answer-title">{AGENCY_FAQS[activeQuestion].q}</h3>
                  <p className="answer-text">{AGENCY_FAQS[activeQuestion].a}</p>
                </div>

                <div className="contact-cta">
                  <p className="contact-text">Have a brief for East Africa?</p>
                  <button type="button" onClick={() => onNavigate?.('/contact')} className="contact-btn animated-btn">
                    <div className="btn-text-container">
                      <p className="btn-text">Contact Us</p>
                    </div>
                    <div className="btn-arrow-container">
                      <svg width="9" height="12" viewBox="0 0 9 12" fill="none">
                        <path d="M1 1L7.5 6L1 11" stroke="#FFCD06" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FAQGrowlio;
