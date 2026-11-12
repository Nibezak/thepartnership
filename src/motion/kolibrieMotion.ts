import { DRAW_LINE_PATHS, HERO_VIDEO } from "../data/kolibrieData";

declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    SplitText?: any;
    DrawSVGPlugin?: any;
    InertiaPlugin?: any;
    Lenis?: any;
  }
}

export function initKolibrieStudio(isInitialLoad = true): () => void {
  const cleanups: Array<() => void> = [];
  const docEl = document.documentElement;
  const reducedMotionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointerMQ = window.matchMedia("(hover: hover) and (pointer: fine)");
  const touchMQ = window.matchMedia("(hover: none), (pointer: coarse)");

  let destroyed = false;
  let lenisInstance: any = null;
  docEl.removeAttribute("data-theme");

  const revealEverythingImmediately = () => {
    docEl.setAttribute("data-page-ready", "true");
    const wipe = document.querySelector<HTMLElement>(".load-wipe");
    if (wipe) wipe.setAttribute("data-transition-ready", "true");
    const main = document.querySelector<HTMLElement>("main");
    if (main) {
      main.style.visibility = "visible";
      main.style.opacity = "1";
    }
    document
      .querySelectorAll<HTMLElement>("[data-text-reveal], [data-scroll-reveal]")
      .forEach((el) => {
        el.style.visibility = "visible";
        el.style.opacity = "1";
      });
  };

  // 4-second failsafe
  const failsafeTimer = window.setTimeout(() => {
    if (!destroyed && !docEl.hasAttribute("data-page-ready")) {
      revealEverythingImmediately();
    }
  }, 4000);
  cleanups.push(() => window.clearTimeout(failsafeTimer));

  // Hero video reduced-motion handler (always active even if GSAP fails)
  const syncHeroVideo = () => {
    const video = document.querySelector<HTMLVideoElement>(".hero-video");
    if (!video) return;
    if (reducedMotionMQ.matches) {
      if (video.hasAttribute("src")) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    } else {
      if (video.getAttribute("src") !== HERO_VIDEO) {
        video.setAttribute("src", HERO_VIDEO);
        video.load();
      }
      video.play().catch(() => {});
    }
  };
  syncHeroVideo();
  reducedMotionMQ.addEventListener("change", syncHeroVideo);
  cleanups.push(() => reducedMotionMQ.removeEventListener("change", syncHeroVideo));

  // If GSAP failed to load, reveal everything immediately and keep basic anchor scrolling
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const SplitText = window.SplitText;
  const DrawSVGPlugin = window.DrawSVGPlugin;
  const InertiaPlugin = window.InertiaPlugin;
  const Lenis = window.Lenis;

  if (!gsap || !ScrollTrigger) {
    revealEverythingImmediately();
    return () => {
      destroyed = true;
      cleanups.forEach((fn) => fn());
    };
  }

  // Register plugins
  const plugins = [ScrollTrigger, SplitText, DrawSVGPlugin, InertiaPlugin].filter(Boolean);
  gsap.registerPlugin(...plugins);

  const isReduced = reducedMotionMQ.matches;

  // Smooth scroll (Lenis)
  if (!isReduced && Lenis) {
    lenisInstance = new Lenis({
      lerp: 0.165,
      wheelMultiplier: 1.25,
    });
    lenisInstance.on("scroll", ScrollTrigger.update);
    const rafTick = (time: number) => {
      lenisInstance?.raf(time * 1000);
    };
    gsap.ticker.add(rafTick);
    gsap.ticker.lagSmoothing(0);
    cleanups.push(() => {
      gsap.ticker.remove(rafTick);
      lenisInstance?.destroy();
      lenisInstance = null;
    });
  }

  // In-page # links
  const onAnchorClick = (e: Event) => {
    if (e.defaultPrevented) return;
    const anchor = (e.target as Element | null)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href) return;
    e.preventDefault();

    const target =
      href === "#" || href === "#top" ? 0 : (document.querySelector(href) as HTMLElement | null);
    if (target === null) return;

    if (lenisInstance) {
      lenisInstance.scrollTo(target, { duration: 1.4 });
    } else if (target === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  document.addEventListener("click", onAnchorClick);
  cleanups.push(() => document.removeEventListener("click", onAnchorClick));

  // Helper: fix SplitText line masks so descenders never clip
  const padSplitLines = (split: any) => {
    if (!split?.lines) return;
    split.lines.forEach((line: HTMLElement) => {
      line.style.paddingBottom = "0.06em";
      line.style.marginBottom = "-0.06em";
      const parent = line.parentElement;
      if (parent && parent !== line.closest("[data-text-reveal], [data-scroll-reveal]")) {
        parent.style.paddingBottom = "0.06em";
        parent.style.marginBottom = "-0.06em";
      }
    });
  };

  // 6.3 Text reveal on load
  const runTextReveals = (baseDelay: number) => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-text-reveal]"));
    elements.forEach((el) => {
      const mode = el.getAttribute("data-text-reveal") || "lines";
      const group = el.closest("[data-text-reveal-group]");
      let groupIndex = 0;
      if (group) {
        const siblings = Array.from(group.querySelectorAll<HTMLElement>("[data-text-reveal]"));
        groupIndex = Math.max(0, siblings.indexOf(el));
      }

      const hasFwh = el.hasAttribute("data-font-weight-hover");
      if (!SplitText) {
        el.style.visibility = "visible";
        el.dispatchEvent(new CustomEvent("reveal:done", { bubbles: true }));
        return;
      }

      const split = SplitText.create(el, {
        type: mode === "chars" ? "chars,words,lines" : "lines,words",
        linesClass: "line",
        charsClass: "char",
        mask: "lines",
        autoSplit: !hasFwh,
      });
      (el as any).__splitText = split;
      padSplitLines(split);
      el.style.visibility = "visible";

      const targets = mode === "chars" ? split.chars : split.lines;
      const stagger = mode === "chars" ? 0.07 * 0.25 : 0.07;

      gsap.from(targets, {
        yPercent: 135,
        duration: 1,
        ease: "expo.out",
        stagger,
        delay: baseDelay + groupIndex * 0.12,
        onComplete: () => {
          el.dispatchEvent(new CustomEvent("reveal:done", { bubbles: true }));
        },
      });
    });
  };

  // 6.4 Scroll reveal
  const initScrollReveals = () => {
    const groups = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal-group]"));
    const handled = new Set<HTMLElement>();

    const buildRevealForEl = (
      el: HTMLElement,
      tl: any,
      position: number | string
    ) => {
      handled.add(el);
      const mode = el.getAttribute("data-scroll-reveal") || "lines";
      const hasFwh = el.hasAttribute("data-font-weight-hover");

      if (mode === "element" || !SplitText) {
        el.style.visibility = "visible";
        tl.fromTo(
          el,
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out" },
          position
        );
        return;
      }

      const split = SplitText.create(el, {
        type: mode === "chars" ? "chars,words,lines" : "lines,words",
        linesClass: "line",
        charsClass: "char",
        mask: "lines",
        autoSplit: !hasFwh,
      });
      (el as any).__splitText = split;
      padSplitLines(split);
      el.style.visibility = "visible";

      const targets = mode === "chars" ? split.chars : split.lines;
      const stagger = mode === "chars" ? 0.07 * 0.25 : 0.07;

      tl.from(
        targets,
        {
          yPercent: 135,
          duration: 1,
          ease: "expo.out",
          stagger,
          onComplete: () => {
            el.dispatchEvent(new CustomEvent("reveal:done", { bubbles: true }));
          },
        },
        position
      );
    };

    groups.forEach((group) => {
      const items = Array.from(group.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
      if (!items.length) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
          once: true,
        },
      });
      items.forEach((el, idx) => {
        buildRevealForEl(el, tl, idx * 0.12);
      });
    });

    document.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((el) => {
      if (handled.has(el)) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
      buildRevealForEl(el, tl, 0);
    });
  };

  // 6.5 Draw underline
  const initDrawLines = () => {
    let variantIdx = Math.floor(Math.random() * DRAW_LINE_PATHS.length);
    const svgNS = "http://www.w3.org/2000/svg";

    const createStrokeSvg = () => {
      const d = DRAW_LINE_PATHS[variantIdx % DRAW_LINE_PATHS.length];
      variantIdx += 1;
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 310 40");
      svg.setAttribute("preserveAspectRatio", "none");
      svg.setAttribute("aria-hidden", "true");
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-width", "10");
      path.setAttribute("stroke-linecap", "round");
      svg.appendChild(path);
      return { svg, path };
    };

    document.querySelectorAll<HTMLElement>("[data-draw-line]").forEach((box) => {
      const mode = box.getAttribute("data-draw-line");
      if (mode === "always") {
        box.innerHTML = "";
        const { svg, path } = createStrokeSvg();
        box.appendChild(svg);
        if (isReduced || !DrawSVGPlugin) {
          gsap.set(path, { drawSVG: "100%" });
        } else {
          gsap.set(path, { drawSVG: "0%" });
          const dc = gsap.delayedCall(1.3, () => {
            gsap.to(path, { drawSVG: "100%", duration: 0.6, ease: "power2.inOut" });
          });
          cleanups.push(() => dc.kill());
        }
        return;
      }

      const trigger = box.closest("a, button") || box;
      let activeSvg: SVGSVGElement | null = null;
      let activePath: SVGPathElement | null = null;
      let isDrawing = false;
      let pendingErase = false;
      let currentTween: any = null;

      const erase = () => {
        if (!activePath || !activeSvg) return;
        const svgToRemove = activeSvg;
        const pathToErase = activePath;
        activeSvg = null;
        activePath = null;
        if (isReduced || !DrawSVGPlugin) {
          svgToRemove.remove();
          return;
        }
        currentTween = gsap.to(pathToErase, {
          drawSVG: "100% 100%",
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            svgToRemove.remove();
          },
        });
      };

      const onEnter = () => {
        if (currentTween) currentTween.kill();
        if (activeSvg) {
          activeSvg.remove();
          activeSvg = null;
          activePath = null;
        }
        box.innerHTML = "";
        const { svg, path } = createStrokeSvg();
        box.appendChild(svg);
        activeSvg = svg;
        activePath = path;
        pendingErase = false;

        if (isReduced || !DrawSVGPlugin) {
          gsap.set(path, { drawSVG: "100%" });
          isDrawing = false;
          return;
        }

        isDrawing = true;
        gsap.set(path, { drawSVG: "0%" });
        currentTween = gsap.to(path, {
          drawSVG: "100%",
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            isDrawing = false;
            if (pendingErase) {
              pendingErase = false;
              erase();
            }
          },
        });
      };

      const onLeave = () => {
        if (isDrawing) {
          pendingErase = true;
        } else {
          erase();
        }
      };

      trigger.addEventListener("mouseenter", onEnter);
      trigger.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        trigger.removeEventListener("mouseenter", onEnter);
        trigger.removeEventListener("mouseleave", onLeave);
        currentTween?.kill();
      });
    });
  };

  // 6.6 Font weight follows the cursor
  const initFontWeightHover = () => {
    if (isReduced || touchMQ.matches || !SplitText) return;

    interface CharEntry {
      char: HTMLElement;
      rest: number;
      near: number;
      radius: number;
      min: number;
      max: number;
      lastTarget: number;
      cx: number;
      cy: number;
      quickTo: (val: number) => void;
    }

    const entries: CharEntry[] = [];

    const registerHeading = (topEl: HTMLElement) => {
      let split = (topEl as any).__splitText;
      if (!split) {
        split = SplitText.create(topEl, {
          type: "chars,words",
          charsClass: "char",
          autoSplit: false,
        });
        (topEl as any).__splitText = split;
      }
      const chars: HTMLElement[] = split.chars || [];
      chars.forEach((char) => {
        const nearest = (char.closest("[data-font-weight-hover]") as HTMLElement) || topEl;
        const rest = Number(nearest.getAttribute("data-fwh-rest") ?? 700);
        const near = Number(nearest.getAttribute("data-fwh-near") ?? 200);
        const radius = Number(nearest.getAttribute("data-fwh-radius") ?? 400);

        char.style.setProperty("--wght", String(rest));
        const computed = window.getComputedStyle(char).fontVariationSettings;
        let fvs = computed && computed !== "normal" ? computed : '"wght" 700';
        if (/["']wght["']/.test(fvs)) {
          fvs = fvs.replace(/(["']wght["']\s+)[\d.]+/g, "$1var(--wght)");
        } else {
          fvs = `"wght" var(--wght), ${fvs}`;
        }
        char.style.fontVariationSettings = fvs;

        const rect = char.getBoundingClientRect();
        entries.push({
          char,
          rest,
          near,
          radius,
          min: Math.min(rest, near),
          max: Math.max(rest, near),
          lastTarget: rest,
          cx: rect.left + rect.width / 2 + window.scrollX,
          cy: rect.top + rect.height / 2 + window.scrollY,
          quickTo: gsap.quickTo(char, "--wght", { duration: 0.4, ease: "power2.out" }),
        });
      });
    };

    const topHeadings = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-font-weight-hover]:not([data-font-weight-hover] [data-font-weight-hover])"
      )
    );

    topHeadings.forEach((el) => {
      if (el.hasAttribute("data-text-reveal") && !(el as any).__splitText) {
        const onDone = () => registerHeading(el);
        el.addEventListener("reveal:done", onDone, { once: true });
        cleanups.push(() => el.removeEventListener("reveal:done", onDone));
      } else {
        registerHeading(el);
      }
    });

    const measureCenters = () => {
      const sx = window.scrollX;
      const sy = window.scrollY;
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const r = entry.char.getBoundingClientRect();
        entry.cx = r.left + r.width / 2 + sx;
        entry.cy = r.top + r.height / 2 + sy;
      }
    };

    let hasPointer = false;
    let pointerPageX = 0;
    let pointerPageY = 0;
    let lastScrollY = window.scrollY;

    const onPointerMove = (e: PointerEvent) => {
      hasPointer = true;
      pointerPageX = e.clientX + window.scrollX;
      pointerPageY = e.clientY + window.scrollY;
    };

    const onScroll = () => {
      const sy = window.scrollY;
      const dy = sy - lastScrollY;
      lastScrollY = sy;
      if (hasPointer) pointerPageY += dy;
      measureCenters();
    };

    const onResize = () => {
      measureCenters();
    };

    const onTick = () => {
      if (!hasPointer) return;
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const d = Math.hypot(pointerPageX - entry.cx, pointerPageY - entry.cy);
        const f = d >= entry.radius ? 0 : 1 - d / entry.radius;
        const raw = entry.rest + (entry.near - entry.rest) * f;
        const target = Math.min(entry.max, Math.max(entry.min, raw));
        if (Math.abs(target - entry.lastTarget) >= 1) {
          entry.lastTarget = target;
          entry.quickTo(target);
        }
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    gsap.ticker.add(onTick);

    cleanups.push(() => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(onTick);
    });
  };

  // 6.7 Hero cursor card (desktop >= 992px with fine hover pointer only)
  const initHeroCursorCard = () => {
    const hero = document.querySelector<HTMLElement>("[data-cursor-cards]");
    const card = hero?.querySelector<HTMLElement>(".hero-cursor-card");
    const media = card?.querySelector<HTMLElement>(".hero-cursor-media");
    if (!hero || !card || !media) return;

    const threshold = Number(hero.getAttribute("data-cursor-cards") || 300);
    const crops = Array.from(media.querySelectorAll<HTMLElement>(".crop"));
    if (!crops.length) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px) and (hover: hover) and (pointer: fine)", () => {
      let photoIdx = 0;
      crops.forEach((c, i) => c.classList.toggle("on", i === 0));
      gsap.set(card, { autoAlpha: 0, x: 0, y: 0, rotation: 0 });
      gsap.set(media, { scale: 1.2, xPercent: 0, yPercent: 0 });

      const xTo = gsap.quickTo(card, "x", { duration: 1, ease: "power4" });
      const yTo = gsap.quickTo(card, "y", { duration: 1, ease: "power4" });
      const rotTo = gsap.quickTo(card, "rotation", { duration: 1, ease: "power4" });
      const mediaXTo = gsap.quickTo(media, "xPercent", { duration: 0.6, ease: "power2" });
      const mediaYTo = gsap.quickTo(media, "yPercent", { duration: 0.7, ease: "power2" });

      let active = false;
      let lastX = 0;
      let lastY = 0;
      let travel = 0;
      let idleTimer: number | undefined;

      const clamp8 = (v: number) => Math.max(-8, Math.min(8, v));

      const onMouseMove = (e: MouseEvent) => {
        const overInteractive = Boolean((e.target as Element | null)?.closest("a, button"));
        if (overInteractive) {
          gsap.to(card, { autoAlpha: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
          return;
        }

        const heroRect = hero.getBoundingClientRect();
        const x = e.clientX - window.innerWidth / 2;
        const y = e.clientY - window.innerHeight / 2 - heroRect.top;

        if (!active) {
          active = true;
          lastX = x;
          lastY = y;
          travel = 0;
          gsap.set(card, { x, y, rotation: 0 });
          gsap.to(card, { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
        } else {
          gsap.to(card, { autoAlpha: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
          const dx = (x - lastX) / 2;
          const dy = (y - lastY) / 2;
          const rot = (x - lastX) / 4;

          xTo(x);
          yTo(y);
          rotTo(rot);
          mediaXTo(-clamp8(dx));
          mediaYTo(-clamp8(dy));

          travel += Math.abs(dx) + Math.abs(dy);
          if (travel > threshold) {
            travel = 0;
            crops[photoIdx].classList.remove("on");
            photoIdx = (photoIdx + 1) % crops.length;
            crops[photoIdx].classList.add("on");
          }
          lastX = x;
          lastY = y;
        }

        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          rotTo(0);
          mediaXTo(0);
          mediaYTo(0);
        }, 66);
      };

      const onMouseLeave = () => {
        active = false;
        travel = 0;
        window.clearTimeout(idleTimer);
        rotTo(0);
        mediaXTo(0);
        mediaYTo(0);
        gsap.to(card, { autoAlpha: 0, duration: 0.3, overwrite: "auto" });
      };

      hero.addEventListener("mousemove", onMouseMove);
      hero.addEventListener("mouseleave", onMouseLeave);

      return () => {
        window.clearTimeout(idleTimer);
        hero.removeEventListener("mousemove", onMouseMove);
        hero.removeEventListener("mouseleave", onMouseLeave);
      };
    });

    cleanups.push(() => mm.revert());
  };

  // 6.8 Client marquee that flips with scroll direction
  const initMarquee = () => {
    if (isReduced) return;
    const marquee = document.querySelector<HTMLElement>(".hero-marquee");
    const scrollWrap = marquee?.querySelector<HTMLElement>(".hero-marquee-scroll");
    const collections = marquee
      ? Array.from(marquee.querySelectorAll<HTMLElement>(".hero-marquee-collection"))
      : [];
    if (!marquee || !scrollWrap || !collections.length) return;

    const speed = 30;
    const direction = -1; // left
    const f = window.innerWidth <= 479 ? 0.25 : window.innerWidth <= 991 ? 0.5 : 1;
    const collectionWidth = collections[0].offsetWidth || window.innerWidth;
    const duration = speed * (collectionWidth / window.innerWidth) * f;

    gsap.set(collections, { xPercent: -100 });
    const loopTween = gsap.fromTo(
      collections,
      { xPercent: -100 },
      {
        xPercent: -200,
        duration,
        ease: "none",
        repeat: -1,
      }
    );
    loopTween.totalTime(duration * 500 + duration * 0.5);

    const stFlip = ScrollTrigger.create({
      trigger: marquee,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self: any) => {
        const scale = self.direction === 1 ? -direction : direction;
        loopTween.timeScale(scale);
      },
    });

    const stScroll = gsap.fromTo(
      scrollWrap,
      { x: "10vw" },
      {
        x: "-10vw",
        ease: "none",
        scrollTrigger: {
          trigger: marquee,
          start: "top bottom",
          end: "bottom top",
          scrub: 0,
        },
      }
    );

    cleanups.push(() => {
      loopTween.kill();
      stFlip.kill();
      stScroll.kill();
    });
  };

  // 6.9 "Latest drops" 3D stack (desktop >= 992px)
  const initFeaturedStack = () => {
    const section = document.querySelector<HTMLElement>("[data-featured-stack]");
    const pinEl = section?.querySelector<HTMLElement>(".work-pin");
    const stackRoot = section?.querySelector<HTMLElement>(".work-stack");
    const slides = section ? Array.from(section.querySelectorAll<HTMLElement>(".work-slide")) : [];
    const badge = section?.querySelector<HTMLElement>(".work-badge");
    if (!section || !pinEl || !stackRoot || !slides.length) return;

    const depth = 120;
    const offset = 40;
    const tiltX = 6;
    const tiltY = 10;
    const badgeSpin = 180;
    const count = slides.length;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      slides.forEach((slide, b) => {
        gsap.set(slide, {
          z: -b * depth,
          y: -b * offset,
          zIndex: count - b,
          autoAlpha: 1,
        });
      });

      const tl = gsap.timeline({ paused: true });
      for (let b = 0; b < count - 1; b++) {
        tl.to(
          slides[b],
          {
            y: "+=" + window.innerHeight * 0.9,
            duration: 1,
            ease: "power2.in",
          },
          b
        );
        tl.to(
          slides[b],
          {
            autoAlpha: 0,
            duration: 0.25,
            ease: "none",
          },
          b + 0.7
        );
        for (let j = b + 1; j < count; j++) {
          const C = j - (b + 1);
          tl.to(
            slides[j],
            {
              z: -C * depth,
              y: -C * offset,
              duration: 1,
              ease: "none",
            },
            b
          );
        }
      }

      if (badge) {
        tl.fromTo(
          badge,
          { rotation: 0 },
          { rotation: badgeSpin, duration: count - 1, ease: "none" },
          0
        );
      }

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + window.innerHeight * 1.2 * (count - 1),
        pin: pinEl,
        pinSpacing: true,
        scrub: 0.3,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self: any) => {
          tl.progress(self.progress);
        },
      });

      let cleanupTilt: (() => void) | undefined;
      if (!isReduced && finePointerMQ.matches) {
        const rxTo = gsap.quickTo(stackRoot, "rotationX", { duration: 0.6, ease: "power3" });
        const ryTo = gsap.quickTo(stackRoot, "rotationY", { duration: 0.6, ease: "power3" });

        const onMove = (e: MouseEvent) => {
          const r = pinEl.getBoundingClientRect();
          rxTo(-((e.clientY - r.top) / r.height - 0.5) * tiltX);
          ryTo(((e.clientX - r.left) / r.width - 0.5) * tiltY);
        };
        const onLeave = () => {
          rxTo(0);
          ryTo(0);
        };
        pinEl.addEventListener("mousemove", onMove);
        pinEl.addEventListener("mouseleave", onLeave);
        cleanupTilt = () => {
          pinEl.removeEventListener("mousemove", onMove);
          pinEl.removeEventListener("mouseleave", onLeave);
        };
      }

      return () => {
        st.kill();
        tl.kill();
        cleanupTilt?.();
      };
    });

    cleanups.push(() => mm.revert());
  };

  // 6.10 "View case ->" cursor label
  const initCursorMarquee = () => {
    if (!finePointerMQ.matches) return;
    const marqueeEl = document.querySelector<HTMLElement>(".cursor-marquee");
    if (!marqueeEl) return;

    const spans = Array.from(marqueeEl.querySelectorAll<HTMLElement>(".cursor-marquee-text"));
    const xTo = gsap.quickTo(marqueeEl, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(marqueeEl, "y", { duration: 0.4, ease: "power3" });

    let snapped = false;
    let lastX = 0;
    let lastY = 0;
    let activeTarget: HTMLElement | null = null;
    let pauseTimer: number | undefined;

    const checkTarget = (cx: number, cy: number) => {
      const hit = document.elementFromPoint(cx, cy);
      const target = (hit?.closest("[data-cursor-marquee-text]") as HTMLElement | null) || null;
      if (target === activeTarget) return;
      activeTarget = target;

      if (target) {
        window.clearTimeout(pauseTimer);
        const text = target.getAttribute("data-cursor-marquee-text") || "";
        const duration = `${Math.max(1, text.length / 5)}s`;
        spans.forEach((span) => {
          span.textContent = text;
          span.style.animationDuration = duration;
          span.style.animationPlayState = isReduced ? "paused" : "running";
        });
        marqueeEl.setAttribute("data-cursor-marquee-status", "active");
      } else {
        marqueeEl.setAttribute("data-cursor-marquee-status", "not-active");
        pauseTimer = window.setTimeout(() => {
          spans.forEach((span) => {
            span.style.animationPlayState = "paused";
          });
        }, 400);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!snapped) {
        snapped = true;
        gsap.set(marqueeEl, { x: e.clientX, y: e.clientY });
      } else {
        xTo(e.clientX);
        yTo(e.clientY);
      }
      checkTarget(e.clientX, e.clientY);
    };

    const onScroll = () => {
      if (snapped) checkTarget(lastX, lastY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    cleanups.push(() => {
      window.clearTimeout(pauseTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    });
  };

  // 6.11 Team photo parallax
  const initTeamParallax = () => {
    const teamSection = document.querySelector<HTMLElement>(".team-section");
    const items = teamSection
      ? Array.from(teamSection.querySelectorAll<HTMLElement>("[data-parallax-speed]"))
      : [];
    if (!teamSection || !items.length) return;

    const mm = gsap.matchMedia();
    const bindForFactor = (k: number) => {
      const distance = 320 * k;
      const tweens = items.map((item) => {
        const speed = Number(item.getAttribute("data-parallax-speed") || 1);
        return gsap.fromTo(
          item,
          { y: distance * speed },
          {
            y: -distance * speed,
            ease: "none",
            scrollTrigger: {
              trigger: teamSection,
              start: "clamp(top bottom)",
              end: "clamp(bottom top)",
              scrub: true,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          }
        );
      });
      return () => tweens.forEach((t) => t.kill());
    };

    mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", () =>
      bindForFactor(1)
    );
    mm.add(
      "(min-width: 480px) and (max-width: 991px) and (prefers-reduced-motion: no-preference)",
      () => bindForFactor(0.5)
    );
    mm.add("(max-width: 479px) and (prefers-reduced-motion: no-preference)", () =>
      bindForFactor(0.3)
    );

    cleanups.push(() => mm.revert());
  };

  // 6.12 Momentum hover (InertiaPlugin)
  const initMomentumHover = () => {
    if (isReduced || !finePointerMQ.matches || !InertiaPlugin) return;
    const teamSection = document.querySelector<HTMLElement>(".team-section");
    if (!teamSection) return;

    let hasPos = false;
    let curX = 0;
    let curY = 0;
    let prevX = 0;
    let prevY = 0;
    let vx = 0;
    let vy = 0;

    const onPointerMove = (e: PointerEvent) => {
      curX = e.clientX;
      curY = e.clientY;
      if (!hasPos) {
        prevX = curX;
        prevY = curY;
        hasPos = true;
      }
    };

    const onTick = () => {
      if (!hasPos) return;
      vx = curX - prevX;
      vy = curY - prevY;
      prevX = curX;
      prevY = curY;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    gsap.ticker.add(onTick);

    const targets = Array.from(teamSection.querySelectorAll<HTMLElement>("[data-momentum-hover]"));
    const clamp = (v: number, limit: number) => Math.max(-limit, Math.min(limit, v));

    targets.forEach((target) => {
      const onEnter = (e: MouseEvent) => {
        const r = target.getBoundingClientRect();
        const F = e.clientX - (r.left + r.width / 2);
        const R = e.clientY - (r.top + r.height / 2);
        const hypot = Math.hypot(F, R) || 1;
        const torque = (F * vy - R * vx) / hypot;

        gsap.to(target, {
          inertia: {
            x: { velocity: clamp(vx * 30, 1080), end: 0 },
            y: { velocity: clamp(vy * 30, 1080), end: 0 },
            rotation: { velocity: clamp(torque * 20, 60), end: 0 },
            resistance: 200,
          },
          overwrite: "auto",
        });
      };

      target.addEventListener("mouseenter", onEnter);
      cleanups.push(() => target.removeEventListener("mouseenter", onEnter));
    });

    cleanups.push(() => {
      window.removeEventListener("pointermove", onPointerMove);
      gsap.ticker.remove(onTick);
    });
  };

  // 6.13 Page theme switch
  const initThemeSwitch = () => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-page-theme]"));
    elements.forEach((el) => {
      const theme = el.getAttribute("data-page-theme") || "dark";
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        refreshPriority: -1,
        onEnter: () => docEl.setAttribute("data-theme", theme),
        onEnterBack: () => docEl.setAttribute("data-theme", theme),
        onLeave: () => docEl.removeAttribute("data-theme"),
        onLeaveBack: () => docEl.removeAttribute("data-theme"),
      });
      cleanups.push(() => {
        st.kill();
        docEl.removeAttribute("data-theme");
      });
    });
  };

  const initPageSystems = () => {
    if (destroyed) return;
    initScrollReveals();
    initDrawLines();
    initFontWeightHover();
    initHeroCursorCard();
    initMarquee();
    initFeaturedStack();
    initCursorMarquee();
    initTeamParallax();
    initMomentumHover();
    initThemeSwitch();
    ScrollTrigger.refresh();
  };

  // 6.2 Load sequence (full SVG curtain on initial load, fast reveal on route navigation)
  const wipeEl = document.querySelector<HTMLElement>(".load-wipe");
  const wipePath = wipeEl?.querySelector<SVGPathElement>("path");

  const startLoadSequence = () => {
    if (destroyed) return;
    docEl.setAttribute("data-page-ready", "true");

    if (!isInitialLoad || isReduced || !DrawSVGPlugin || !wipeEl || !wipePath) {
      revealEverythingImmediately();
      if (isInitialLoad || isReduced) {
        initPageSystems();
      } else {
        runTextReveals(0.05);
        initPageSystems();
      }
      return;
    }

    const tl = gsap.timeline();
    gsap.set("main", { autoAlpha: 0 });
    gsap.set(wipePath, { drawSVG: "0% 100%", strokeWidth: "30%" });

    tl.addLabel("reveal", 0.4);
    tl.set("main", { autoAlpha: 1 }, "reveal");
    tl.add(() => {
      runTextReveals(0.6);
      initPageSystems();
    }, "reveal");
    tl.to(
      wipePath,
      {
        drawSVG: "100% 100%",
        strokeWidth: "5%",
        duration: 1.25,
        ease: "power1.inOut",
      },
      "reveal"
    );
    tl.call(() => {
      wipeEl.setAttribute("data-transition-ready", "true");
    });

    cleanups.push(() => tl.kill());
  };

  if (!isInitialLoad) {
    window.scrollTo(0, 0);
    startLoadSequence();
  } else {
    const fontsReady = document.fonts?.ready || Promise.resolve();
    const timeoutPromise = new Promise<void>((resolve) => window.setTimeout(resolve, 1500));
    Promise.race([fontsReady, timeoutPromise]).then(() => {
      startLoadSequence();
    });
  }

  return () => {
    destroyed = true;
    docEl.removeAttribute("data-theme");
    cleanups.forEach((fn) => fn());
  };
}
