import React, { useEffect, useRef } from "react";

const ASSETS = {
  dunes:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0e201fcd-ffc0-46a0-bd06-faa07bf0e84b.webp",
  foundry:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e80ba08d-d7b6-4b27-b0cd-8d0ad09c788c.webp",
  mineral:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2bebad68-8177-446a-9550-d64074166364.webp",
  mesa:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b0d7c1-3eb7-44bd-9b19-57b975fb250f.webp",
  fire:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/156ff74d-ee37-4443-8f3a-11ae2095ed4c.webp",
  saltflat:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7b6ad638-89ec-4dec-be74-d36fbff3ea53.webp",
};

interface ScannerCardMeta {
  id: string;
  original: number;
  distilled: number;
  url: string;
  html: string;
}

const SCANNER_CARDS: ScannerCardMeta[] = [
  {
    id: "home",
    original: 70411,
    distilled: 6140,
    url: "thepartnershipafrica.com/",
    html: `<h1>The Partnership — Influence</h1>
<p>
  Africa’s leading consumer influence
  specialists. Powered by Publicis
  across East Africa.
</p>
<h2>Client roster</h2>
<ul>
  <li>Spotify, Airtel Africa, KCB</li>
  <li>Diageo / Tusker, Isuzu, Capwell</li>
  <li>Hub: Westlands, Nairobi</li>
  <li>Model: Coalition multiplier</li>
</ul>
<h2>Pillars</h2>
<ul>
  <li>Problem identification</li>
  <li>Strategy &amp; creative idea</li>
  <li>Through-the-line execution</li>
</ul>
<a href="/work">Our work</a>`,
  },
  {
    id: "price",
    original: 41208,
    distilled: 4960,
    url: "thepartnershipafrica.com/spotify",
    html: `<h1>Case study: Spotify EA</h1>
<p>
  Turning East African street sound
  and Gen-Z creator culture into
  daily listening habits.
</p>
<h2>Coalition stack</h2>
<ul>
  <li>Strategy: Youth &amp; matatu culture</li>
  <li>Creators: Indahash East Africa</li>
  <li>Execution: Reels &amp; pop-ups</li>
</ul>
<h2>Outcomes</h2>
<ul>
  <li>Reach: 14M+ social impressions</li>
  <li>Engagement: 3x creator lift</li>
  <li>Markets: KE, UG, TZ</li>
  <li>Contact: +254 746 444 333</li>
</ul>`,
  },
  {
    id: "case",
    original: 98432,
    distilled: 6300,
    url: "thepartnershipafrica.com/cases/airtel",
    html: `<h1>Case study: Airtel Africa</h1>
<p>
  How multi-market coalition scaled
  integrated brand storytelling across
  East Africa.
</p>
<h2>The challenge</h2>
<p>
  Connecting data velocity and Airtel
  Money trust across four distinct
  regional mobile audiences.
</p>
<h2>The coalition</h2>
<ul>
  <li>4 connected regional markets</li>
  <li>360° through-the-line rollout</li>
  <li>1 unified Publicis alliance</li>
</ul>
<p>
  “Coalition is the ‘X’ factor.”
  — The Partnership Africa
</p>`,
  },
  {
    id: "vision",
    original: 55870,
    distilled: 8215,
    url: "thepartnershipafrica.com/about",
    html: `<article>
<h1>Communication is not solo</h1>
<p>
  In an industry plagued with who
  did what, we believe in we.
</p>
<p>
  True partnerships link client,
  agency, and execution specialists
  into one shared engine.
</p>
<h2>Principles</h2>
<ol>
  <li>Unlock the coalition spirit</li>
  <li>Multiply talent &amp; tech</li>
  <li>Lead with heart &amp; instinct</li>
</ol>
</article>`,
  },
  {
    id: "alloy",
    original: 63904,
    distilled: 5512,
    url: "thepartnershipafrica.com/clients",
    html: `<h1>Consumer Influence Engine</h1>
<p>Powered by Publicis.</p>
<h2>Leadership</h2>
<ul>
  <li>CEO: Sandeep Madan</li>
  <li>COO: Sally Sawe</li>
  <li>CCO: Deepesh Jha</li>
  <li>Reach: 2 continents</li>
</ul>
<h2>Selected clients</h2>
<ul>
  <li>Spotify, Airtel Africa, KCB, Tusker</li>
</ul>
<a href="mailto:info@thepartnership.agency">
  info@thepartnership.agency
</a>`,
  },
  {
    id: "journal",
    original: 47316,
    distilled: 7602,
    url: "thepartnershipafrica.com/work",
    html: `<h1>KCB &amp; Tusker Playbooks</h1>
<p>Westlands Square, Woodvale Ave.</p>
<article>
  <h2>KCB: MSME &amp; mobile ambition</h2>
  <time>Kenya · East Africa</time>
</article>
<article>
  <h2>Diageo / Tusker on-trade</h2>
  <time>250+ regional venues</time>
</article>
<article>
  <h2>Isuzu &amp; Capwell velocity</h2>
  <time>Through-the-line</time>
</article>`,
  },
];

const PALETTE = [
  "#30261D",
  "#866C1D",
  "#B5840E",
  "#D89B1C",
  "#FFC600",
  "#FFCD06",
  "#FFE66D",
];

function hash32(a: number, b: number, c: number): number {
  let h =
    (Math.imul(a, 374761393) +
      Math.imul(b, 668265263) +
      Math.imul(c, 2147483647)) |
    0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const CardBrandMark: React.FC = () => (
  <span className="k-brand">
    <svg viewBox="0 0 54 42" fill="none" aria-hidden="true">
      <polygon
        points="4,38 20,8 36,38"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <polygon
        points="18,38 34,8 50,38"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
    </svg>
    <span>Partnership</span>
  </span>
);

interface CoalitionScannerProps {
  onNavigateWork?: () => void;
}

export const CoalitionScannerSection: React.FC<CoalitionScannerProps> = ({
  onNavigateWork,
}) => {
  const beltRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const codeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const belt = beltRef.current;
    const canvas = canvasRef.current;
    if (!belt || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReduced = reducedMQ.matches;
    const onReducedChange = () => {
      isReduced = reducedMQ.matches;
    };
    reducedMQ.addEventListener("change", onReducedChange);

    let W = window.innerWidth;
    let cw = 0;
    let ch = 0;
    let gap = 0;
    let Lx = W / 2;
    let beltW = belt.clientWidth;
    let beltH = belt.clientHeight;
    let dpr = Math.min(2, window.devicePixelRatio || 1);

    const measure = () => {
      W = window.innerWidth;
      Lx = W / 2;
      const firstCard = cardRefs.current[0];
      if (firstCard) {
        const r = firstCard.getBoundingClientRect();
        cw = r.width;
        ch = r.height;
      }
      const isMob = W <= 767;
      gap = W * (isMob ? 0.07 : 0.0475);
      beltW = belt.clientWidth;
      beltH = belt.clientHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.floor(beltW * dpr));
      canvas.height = Math.max(1, Math.floor(beltH * dpr));
    };

    measure();
    let off = W / 2 - 0.62 * cw;
    let vel = isReduced ? 0 : -0.075 * W;
    let hover = 0;
    let hoverTarget = 0;
    let dragging = false;
    let lastClientX = 0;
    let lastMoveTime = 0;
    let lastCrossingIdx = -1;
    let shownReduction = 0;

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
    }
    const sparks: Spark[] = [];

    const onResize = () => {
      measure();
    };
    window.addEventListener("resize", onResize);

    const onPointerEnter = () => {
      hoverTarget = 1;
    };
    const onPointerLeave = () => {
      hoverTarget = 0;
    };
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      belt.classList.add("dragging");
      belt.setPointerCapture(e.pointerId);
      lastClientX = e.clientX;
      lastMoveTime = performance.now();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastClientX;
      const dtMs = Math.max(8, now - lastMoveTime);
      off += dx;
      const instVel = (dx / dtMs) * 1000;
      vel = instVel * 0.8 + vel * 0.2;
      lastClientX = e.clientX;
      lastMoveTime = now;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      belt.classList.remove("dragging");
      try {
        belt.releasePointerCapture(e.pointerId);
      } catch {
        // ignore if already released
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        vel += -e.deltaX * 6;
      }
    };

    belt.addEventListener("pointerenter", onPointerEnter);
    belt.addEventListener("pointerleave", onPointerLeave);
    belt.addEventListener("pointerdown", onPointerDown);
    belt.addEventListener("pointermove", onPointerMove);
    belt.addEventListener("pointerup", onPointerUp);
    belt.addEventListener("pointercancel", onPointerUp);
    belt.addEventListener("wheel", onWheel, { passive: true });

    let rafId = 0;
    let lastTime = performance.now();
    const startTime = lastTime;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      const t = (now - startTime) / 1000;
      lastTime = now;

      if (!cw) measure();

      const auto = isReduced ? 0 : -0.075 * W;
      hover += (hoverTarget - hover) * Math.min(1, dt * 4);
      const targetSpeed = auto * (1 - 0.65 * hover);

      if (!dragging) {
        vel += (targetSpeed - vel) * (1 - Math.exp(-2.2 * dt));
        off += vel * dt;
      }

      const span = cw + gap;
      const period = span * SCANNER_CARDS.length;
      const cardTop = 70;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, beltW, beltH);

      let crossingIdx = -1;
      let crossingCut = 0;

      for (let i = 0; i < SCANNER_CARDS.length; i++) {
        const raw = off + i * span + span;
        const x = (((raw % period) + period) % period) - span;
        const cut = Math.max(0, Math.min(cw, Lx - x));

        const cardEl = cardRefs.current[i];
        const codeEl = codeRefs.current[i];

        if (cardEl) {
          cardEl.style.transform = `translate3d(${x}px, 0, 0)`;
          if (cut > 0) {
            cardEl.style.clipPath = `inset(0 0 0 ${cut}px)`;
            const mask = `linear-gradient(90deg, transparent ${cut}px, #000 ${cut + 26}px)`;
            cardEl.style.maskImage = mask;
            (cardEl.style as any).webkitMaskImage = mask;
          } else {
            cardEl.style.clipPath = "none";
            cardEl.style.maskImage = "none";
            (cardEl.style as any).webkitMaskImage = "none";
          }
        }

        if (codeEl) {
          codeEl.style.transform = `translate3d(${x}px, 0, 0)`;
          codeEl.style.clipPath = `inset(0 ${cw - cut}px 0 0)`;
          codeEl.style.visibility = cut === 0 ? "hidden" : "visible";
        }

        if (cut > 0 && cut < cw) {
          crossingIdx = i;
          crossingCut = cut;
        }

        // Draw particle dissolve if card is crossing and right edge is past line
        if (cut > 0 && x + cw > Lx && cw > 0 && ch > 0) {
          // 1. Haze (Sun Gold & Antique Bronze)
          const hazeW = Math.min(150, x + cw - Lx);
          if (hazeW > 0) {
            const haze = ctx.createLinearGradient(Lx, 0, Lx + 150, 0);
            haze.addColorStop(0, "rgba(255, 198, 0, 0.44)");
            haze.addColorStop(0.55, "rgba(216, 155, 28, 0.16)");
            haze.addColorStop(1, "rgba(255, 205, 6, 0)");
            ctx.fillStyle = haze;
            ctx.fillRect(Lx, cardTop, hazeW, ch);
          }

          // 2. Dithered card-local particles
          const R = 0.3 * cw;
          const startGx = Math.floor(cut / 3);
          const endGx = Math.ceil((cut + R) / 3);
          const totalRows = Math.ceil(ch / 3);
          const timeBucket = Math.floor(t * 9) + 97;

          for (let gx = startGx; gx <= endGx; gx++) {
            const sx = x + gx * 3;
            const d = sx - Lx;
            if (d < 0 || d >= R) continue;
            const p = Math.pow(1 - d / R, 1.7);

            for (let row = -5; row <= totalRows + 5; row++) {
              if (!isReduced && hash32(gx, row, timeBucket) < 0.22) continue;

              const inside = row >= 0 && row < totalRows;
              if (inside) {
                if (hash32(gx, row, i) >= p * 0.92) continue;
              } else {
                const distOut = row < 0 ? -row : row - totalRows + 1;
                const fade = Math.max(0, 1 - distOut / 5);
                if (hash32(gx, row, i) >= p * 0.16 * fade) continue;
              }

              const h2 = hash32(row, gx, i + 31);
              const colIdx =
                d <= 10
                  ? 4 + Math.min(2, Math.floor(h2 * 3))
                  : Math.min(6, Math.floor(h2 * h2 * 7));
              const size = 1.1 + h2 * 1.7;
              const jx = isReduced ? 0 : (hash32(gx + 11, row, i) - 0.5) * 1.6;
              const jy = isReduced ? 0 : (hash32(gx, row + 17, i) - 0.5) * 1.6;

              ctx.fillStyle = PALETTE[colIdx];
              ctx.fillRect(sx + jx, cardTop + row * 3 + jy, size, size);
            }
          }
        }
      }

      // 3. Free sparks
      if (!isReduced && crossingIdx !== -1) {
        for (let s = 0; s < 3; s++) {
          if (Math.random() < 0.7) {
            sparks.push({
              x: Lx + Math.random() * 30,
              y: cardTop - 10 + Math.random() * (ch + 20),
              vx: -30 + Math.random() * 70 + vel * 0.6,
              vy: (Math.random() - 0.5) * 50,
              size: 0.8 + Math.random() * 1.8,
              color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
              life: 0.3 + Math.random() * 0.8,
            });
          }
        }
      }

      for (let k = sparks.length - 1; k >= 0; k--) {
        const sp = sparks[k];
        sp.x += sp.vx * dt;
        sp.y += sp.vy * dt;
        sp.life -= dt;
        if (sp.life <= 0) {
          sparks.splice(k, 1);
          continue;
        }
        ctx.globalAlpha = Math.min(1, sp.life * 2.2);
        ctx.fillStyle = sp.color;
        ctx.fillRect(sp.x, sp.y, sp.size, sp.size);
      }
      ctx.globalAlpha = 1;

      // Update floating counter pill
      if (crossingIdx !== -1 && numRef.current && pctRef.current) {
        const meta = SCANNER_CARDS[crossingIdx];
        const saved = meta.original - meta.distilled;
        const target = Math.round(saved * (crossingCut / cw));

        if (crossingIdx !== lastCrossingIdx) {
          lastCrossingIdx = crossingIdx;
          shownReduction = target;
          const pct = Math.round((saved / meta.original) * 100);
          pctRef.current.textContent = `${pct}% less`;
        } else {
          shownReduction += (target - shownReduction) * Math.min(1, dt * 14);
        }

        numRef.current.textContent = `−${Math.round(shownReduction).toLocaleString("en-US")}`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      reducedMQ.removeEventListener("change", onReducedChange);
      window.removeEventListener("resize", onResize);
      belt.removeEventListener("pointerenter", onPointerEnter);
      belt.removeEventListener("pointerleave", onPointerLeave);
      belt.removeEventListener("pointerdown", onPointerDown);
      belt.removeEventListener("pointermove", onPointerMove);
      belt.removeEventListener("pointerup", onPointerUp);
      belt.removeEventListener("pointercancel", onPointerUp);
      belt.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section
      id="engine"
      className="scanner-section"
      aria-label="Distilled brief and readability engine"
    >
      <div className="scanner-hero">
        <div>
          <p className="scanner-eyebrow">COALITION ENGINE · AI READABILITY</p>
          <h2 className="scanner-h2">
            Built for people.
            <br />
            <em>Multiplied everywhere.</em>
          </h2>
        </div>

        <div>
          <p className="scanner-copy">
            The Partnership turns sprawling brand ecosystems into crisp,
            token&#8209;light creative briefs and execution playbooks—serving
            people unforgettable stories while keeping every channel razor
            sharp.
          </p>
          <a
            href="/work"
            className="scanner-cta"
            onClick={(e) => {
              if (onNavigateWork) {
                e.preventDefault();
                onNavigateWork();
              }
            }}
          >
            Explore client case studies
          </a>
        </div>
      </div>

      {/* Counter badge */}
      <div className="scanner-badge" aria-live="off">
        <span className="scanner-badge-label">Token reduction</span>
        <div className="scanner-badge-pill">
          <span className="scanner-badge-num" ref={numRef}>
            −7,713
          </span>
          <span className="scanner-badge-pct" ref={pctRef}>
            91% less
          </span>
        </div>
      </div>

      {/* Glowing vertical scanner line */}
      <div className="scanner-beam" aria-hidden="true">
        <i />
        <b />
      </div>

      {/* Conveyor belt */}
      <div className="scanner-belt" ref={beltRef}>
        <div className="scanner-codes" aria-hidden="true">
          {SCANNER_CARDS.map((card, i) => {
            const metaText = `<!-- distilled: ${card.distilled.toLocaleString(
              "en-US"
            )} tokens -->\n<!-- original: ${card.original.toLocaleString(
              "en-US"
            )} tokens -->\n<!-- ${card.url} -->`;
            return (
              <div
                key={`code-${card.id}`}
                className="scanner-code-block"
                ref={(el) => {
                  codeRefs.current[i] = el;
                }}
              >
                <div className="scanner-code-html">{card.html}</div>
                <div className="scanner-code-meta">{metaText}</div>
              </div>
            );
          })}
        </div>

        <div className="scanner-cards" aria-hidden="true">
          {/* Card 1: Home */}
          <div
            className="scanner-card"
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
          >
            <div
              className="k-bg"
              style={{ backgroundImage: `url(${ASSETS.dunes})` }}
            />
            <div className="k-home-veil" />
            <div className="k-nav">
              <CardBrandMark />
              <div className="k-menu">
                <span>WORK</span>
                <span>IMPACT</span>
                <span>ABOUT</span>
              </div>
            </div>
            <div className="k-home-stats">
              <div className="k-home-stat">
                <div className="k-home-num">100+</div>
                <div className="k-home-lbl">years leadership</div>
              </div>
              <div className="k-home-stat">
                <div className="k-home-num">4x</div>
                <div className="k-home-lbl">regional reach</div>
              </div>
            </div>
            <div className="k-home-tagline">
              Africa’s leading consumer influence specialists.
            </div>
          </div>

          {/* Card 2: Spotify Coalition */}
          <div
            className="scanner-card k-price"
            ref={(el) => {
              cardRefs.current[1] = el;
            }}
          >
            <div className="k-nav">
              <CardBrandMark />
              <div className="k-menu">
                <span>WORK</span>
                <span className="k-menu-pill">SPOTIFY EA</span>
                <span>CLIENTS</span>
              </div>
            </div>
            <div className="k-price-hero">
              14<sup>M+</sup>
            </div>
            <div className="k-price-sub">SPOTIFY · INDAHASH CREATOR COALITION</div>
            <div className="k-price-plans">
              <div className="k-price-row">
                <span>Strategy</span>
                <span>Youth Sound Culture</span>
              </div>
              <div className="k-price-row">
                <span>Creators</span>
                <span>3x Engagement Lift</span>
              </div>
              <div className="k-price-row">
                <span>Execution</span>
                <span>Reels &amp; Pop-Ups</span>
              </div>
            </div>
            <div className="k-price-btn">Through-the-line</div>
          </div>

          {/* Card 3: Case Study */}
          <div
            className="scanner-card"
            ref={(el) => {
              cardRefs.current[2] = el;
            }}
          >
            <div
              className="k-bg k-case-bg"
              style={{ backgroundImage: `url(${ASSETS.mineral})` }}
            />
            <div className="k-case-veil" />
            <div className="k-nav">
              <CardBrandMark />
              <div className="k-menu">
                <span>WORK</span>
                <span>IMPACT</span>
                <span>ABOUT</span>
              </div>
            </div>
            <div className="k-case-kicker">CASE STUDY · AIRTEL AFRICA</div>
            <div className="k-case-title">
              How coalition storytelling unified mobile influence across four
              East African markets
            </div>
            <div className="k-case-stats">
              <div className="k-case-stat">
                <div className="k-case-num">4</div>
                <div className="k-case-lbl">connected markets</div>
              </div>
              <div className="k-case-stat">
                <div className="k-case-num">360°</div>
                <div className="k-case-lbl">through-the-line</div>
              </div>
              <div className="k-case-stat">
                <div className="k-case-num">1</div>
                <div className="k-case-lbl">Publicis alliance</div>
              </div>
            </div>
          </div>

          {/* Card 4: Vision */}
          <div
            className="scanner-card k-vision"
            ref={(el) => {
              cardRefs.current[3] = el;
            }}
          >
            <div className="k-nav">
              <CardBrandMark />
              <div className="k-menu">
                <span>WORK</span>
                <span className="k-menu-pill">VISION</span>
                <span>ABOUT</span>
              </div>
            </div>
            <div className="k-vision-tiles">
              <div
                className="k-vision-tile"
                style={{ backgroundImage: `url(${ASSETS.foundry})` }}
              />
              <div
                className="k-vision-tile"
                style={{ backgroundImage: `url(${ASSETS.mesa})` }}
              />
              <div className="k-vision-quote">
                The Partnership vision:{" "}
                <em>communication is not a solo journey.</em>
              </div>
            </div>
            <div className="k-vision-foot">
              <div>
                In an industry plagued with who did what,
                <br />
                we believe in we.
              </div>
              <div>Manifesto · Nairobi</div>
            </div>
          </div>

          {/* Card 5: Influence Engine */}
          <div
            className="scanner-card k-alloy"
            ref={(el) => {
              cardRefs.current[4] = el;
            }}
          >
            <div
              className="k-bg k-alloy-bg"
              style={{ backgroundImage: `url(${ASSETS.fire})` }}
            />
            <div className="k-alloy-veil" />
            <div className="k-nav">
              <CardBrandMark />
              <div className="k-menu">
                <span>WORK</span>
                <span>IMPACT</span>
                <span>ABOUT</span>
              </div>
            </div>
            <div className="k-alloy-title">
              The coalition
              <em>multiplier.</em>
            </div>
            <div className="k-alloy-specs">
              <div className="k-alloy-row">
                <span>Alliance</span>
                <span>Publicis Groupe</span>
              </div>
              <div className="k-alloy-row">
                <span>Creators</span>
                <span>Indahash Global</span>
              </div>
              <div className="k-alloy-row">
                <span>Studio</span>
                <span>Westlands, KE ↗</span>
              </div>
            </div>
          </div>

          {/* Card 6: Field Notes */}
          <div
            className="scanner-card k-journal"
            ref={(el) => {
              cardRefs.current[5] = el;
            }}
          >
            <div className="k-nav">
              <CardBrandMark />
              <div className="k-menu">
                <span>WORK</span>
                <span className="k-menu-pill">NOTES</span>
                <span>ABOUT</span>
              </div>
            </div>
            <div className="k-journal-title">
              Client playbooks
              <em>across East Africa</em>
            </div>
            <div className="k-journal-posts">
              <div>
                <div
                  className="k-journal-thumb"
                  style={{ backgroundImage: `url(${ASSETS.saltflat})` }}
                />
                <div className="k-journal-kicker">KCB GROUP</div>
                <div className="k-journal-hed">
                  MSME enterprise &amp; digital banking momentum
                </div>
              </div>
              <div>
                <div
                  className="k-journal-thumb"
                  style={{ backgroundImage: `url(${ASSETS.mesa})` }}
                />
                <div className="k-journal-kicker">DIAGEO · TUSKER</div>
                <div className="k-journal-hed">
                  250+ regional venues activated through the line
                </div>
              </div>
              <div>
                <div
                  className="k-journal-thumb"
                  style={{ backgroundImage: `url(${ASSETS.dunes})` }}
                />
                <div className="k-journal-kicker">ISUZU &amp; CAPWELL</div>
                <div className="k-journal-hed">
                  Mobility &amp; retail velocity from Nairobi out
                </div>
              </div>
            </div>
          </div>
        </div>

        <canvas className="scanner-fx" ref={canvasRef} />
      </div>
    </section>
  );
};
