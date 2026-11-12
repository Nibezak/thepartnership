import React from 'react';
import { motion } from 'framer-motion';
import { AppRoute } from '../../../data/agencyPagesData';

interface PricingProps {
  onNavigate?: (route: AppRoute) => void;
}

const ENGAGEMENT_MODELS = [
  {
    name: 'Diagnostic Sprint',
    headline: '2–4 Weeks',
    period: '/ problem ID',
    desc: 'Rapid street truth, category audit, and positioning framework before committing production spend.',
    features: [
      'Qualitative Street Immersion',
      'Commercial Barrier Mapping',
      'Audience & Cultural Architecture',
      'Brief & Channel Roadmap',
      'Senior Leadership Debrief',
    ],
    featured: false,
  },
  {
    name: 'Integrated Coalition',
    headline: 'Full Funnel',
    period: '/ campaign or retainer',
    desc: 'End-to-end strategy, creative platform, Indahash creators, and through-the-line execution.',
    features: [
      'Core Strategy & Creative Platform',
      'ATL Film, OOH & Social Reels',
      'Indahash Creator Pod Access',
      'On-Trade & Festival Activation',
      'Live Performance Attribution',
    ],
    featured: false,
  },
  {
    name: 'Regional Alliance',
    headline: 'Multi-Market',
    period: '/ KE · UG · TZ · RW',
    desc: 'Backed by Publicis Groupe Africa, TDF Group, Yellow Agency, and P&L Consulting for enterprise scale.',
    features: [
      '4-Market East African Delivery',
      'Dedicated Coalition Studio Pod',
      'Global Publicis Data & Tooling',
      'Full BTL, Retail & Trade Rollout',
      'Board-Level Commercial Reporting',
    ],
    featured: true,
  },
];

const PricingGrowlio: React.FC<PricingProps> = ({ onNavigate }) => {
  return (
    <section className="pricing-section">
      <style>{`
        .pricing-section {
          width: 100%;
          background: #FAF5E6;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 96px 24px;
          font-family: 'Inter Tight', sans-serif;
          position: relative;
          box-sizing: border-box;
        }
        .pricing-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          margin-bottom: 56px;
        }
        .pricing-tag {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
        }
        .pricing-tag-dot {
          width: 8px;
          height: 8px;
          background: #30261D;
          border-radius: 2px;
        }
        .pricing-tag-text {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #866C1D;
        }
        .pricing-title {
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
          font-weight: 400;
          font-size: 68px;
          line-height: 70px;
          text-align: center;
          letter-spacing: -0.02em;
          color: #30261D;
          margin: 0;
        }
        .pricing-subtitle {
          font-weight: 400;
          font-size: 17px;
          line-height: 26px;
          text-align: center;
          color: #5A4634;
          max-width: 560px;
          margin: 0;
        }
        .pricing-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 920px;
        }
        .pricing-card {
          width: 100%;
          background: #FFFFFF;
          border: 1.5px solid #30261D;
          border-radius: 24px;
          display: flex;
          flex-direction: row;
          padding: 32px;
          box-sizing: border-box;
          justify-content: space-between;
          gap: 32px;
          transition: all 0.25s ease;
        }
        .pricing-card:hover, .pricing-card.enterprise {
          background: #30261D;
          border-color: #30261D;
        }
        .pricing-card:hover .plan-name,
        .pricing-card:hover .price-amount,
        .pricing-card:hover .plan-description,
        .pricing-card:hover .included-title,
        .pricing-card:hover .feature-text,
        .pricing-card.enterprise .plan-name,
        .pricing-card.enterprise .plan-description,
        .pricing-card.enterprise .included-title,
        .pricing-card.enterprise .feature-text {
          color: #FAF5E6;
        }
        .pricing-card.enterprise .price-amount,
        .pricing-card:hover .price-amount {
          color: #FFCD06;
        }
        .pricing-card:hover .price-period,
        .pricing-card.enterprise .price-period {
          color: rgba(250, 245, 230, 0.72);
        }
        .pricing-card:hover .feature-dot,
        .pricing-card.enterprise .feature-dot {
          background: #FFCD06;
        }
        .card-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1.2;
        }
        .plan-name {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #866C1D;
          margin: 0;
        }
        .price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-wrap: wrap;
        }
        .price-amount {
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
          font-weight: 400;
          font-size: 46px;
          line-height: 48px;
          color: #30261D;
          margin: 0;
        }
        .price-period {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: #866C1D;
          margin: 0;
        }
        .plan-description {
          font-size: 16px;
          line-height: 24px;
          color: #5A4634;
          margin: 0;
          max-width: 390px;
        }
        .get-started-btn {
          display: inline-flex;
          align-items: center;
          padding: 4px;
          gap: 4px;
          border: 1.5px solid #FFCD06;
          border-radius: 999px;
          width: max-content;
          cursor: pointer;
          margin-top: 12px;
          background: transparent;
        }
        .btn-text-container {
          padding: 8px 18px;
          background: #FFCD06;
          border-radius: 999px;
        }
        .btn-text {
          font-family: 'Goudy Bookletter 1911', Georgia, serif;
          font-weight: 700;
          font-size: 17px;
          color: #30261D;
          margin: 0;
        }
        .btn-arrow-container {
          width: 38px;
          height: 38px;
          background: #FFCD06;
          border-radius: 999px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .card-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 0.9;
        }
        .included-title {
          font-weight: 700;
          font-size: 16px;
          color: #30261D;
          margin: 0;
        }
        .features-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .feature-dot {
          width: 8px;
          height: 8px;
          background: #30261D;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .feature-text {
          font-size: 15px;
          color: #30261D;
          margin: 0;
        }
        @media (max-width: 1024px) {
          .pricing-section { padding: 72px 24px; }
          .pricing-title { font-size: clamp(36px, 6vw, 56px); line-height: 1.06; }
          .pricing-card { gap: 24px; }
        }
        @media (max-width: 768px) {
          .pricing-section { padding: 60px 20px; }
          .pricing-card { flex-direction: column; gap: 28px; padding: 24px; }
          .pricing-title { font-size: 38px; line-height: 42px; }
          .get-started-btn { max-width: 100%; }
          .btn-text { white-space: nowrap; font-size: 16px; }
        }
      `}</style>

      <div className="pricing-header">
        <div className="pricing-tag">
          <div className="pricing-tag-dot" />
          <div className="pricing-tag-text">Engagement Models</div>
        </div>
        <h2 className="pricing-title">Coalitions Built Around Your Brief</h2>
        <p className="pricing-subtitle">
          Whether solving a sharp commercial bottleneck or orchestrating a four-country launch, we assemble the exact coalition required.
        </p>
      </div>

      <div className="pricing-cards">
        {ENGAGEMENT_MODELS.map((model, idx) => (
          <motion.div
            key={model.name}
            className={`pricing-card ${model.featured ? 'enterprise' : ''}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
          >
            <div className="card-left">
              <h3 className="plan-name">{model.name}</h3>
              <div className="price-row">
                <p className="price-amount">{model.headline}</p>
                <p className="price-period">{model.period}</p>
              </div>
              <p className="plan-description">{model.desc}</p>
              <button
                type="button"
                onClick={() => onNavigate?.('/contact')}
                className="get-started-btn animated-btn"
              >
                <div className="btn-text-container">
                  <p className="btn-text">Scope a Brief</p>
                </div>
                <div className="btn-arrow-container">
                  <svg width="9" height="12" viewBox="0 0 9 12" fill="none">
                    <path d="M1 1L7.5 6L1 11" stroke="#30261D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="card-right">
              <h4 className="included-title">What the coalition delivers</h4>
              <div className="features-list">
                {model.features.map((feat) => (
                  <div key={feat} className="feature-item">
                    <div className="feature-dot" />
                    <p className="feature-text">{feat}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingGrowlio;
