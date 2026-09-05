/**
 * GLOBAL GROWTH — MOTION
 * ---------------------------------------------------------------------------
 * The complete motion layer: Lenis smooth scroll synced into the GSAP ticker,
 * the shared scroll reveal, the hero line reveal and ascent draw, the scrubbed
 * roadmap timeline, marquee scroll-velocity coupling, parallax, magnetic
 * buttons, the page-transition wipe, the scroll progress bar and back-to-top.
 *
 * LAYERED, NOT DEPENDENT
 * GSAP and Lenis are loaded on demand and treated as an enhancement. If either
 * fails to load — an offline cache miss, a blocked request, a corporate proxy —
 * the page still works:
 *
 *   reveal    GSAP ScrollTrigger.batch  ->  IntersectionObserver  ->  watchdog
 *   timeline  ScrollTrigger scrub       ->  scroll listener       ->  full rail
 *   scroll    Lenis                     ->  native scrolling
 *
 * Nothing here is allowed to leave content invisible. That rule outranks every
 * animation in this file.
 *
 * REDUCED MOTION
 * Under prefers-reduced-motion nothing below runs at all: no Lenis, no GSAP,
 * no observers. Reveals are made visible by CSS, the timeline rail is drawn
 * complete, and the cursor, preloader and marquee are removed elsewhere.
 */

import { qs, qsa, rafThrottle, prefersReducedMotion, loadScript, url } from './utils.js';

const GSAP_FILES = [
  '/assets/vendor/gsap/gsap.min.js',
  '/assets/vendor/gsap/ScrollTrigger.min.js',
  '/assets/vendor/gsap/ScrollToPlugin.min.js'
];
const LENIS_FILE = '/assets/vendor/lenis/lenis.min.js';

/* ==========================================================================
   LIBRARY LOADING
   ========================================================================== */
let gsapReady = null;

/** Resolves with the gsap object, or null if it could not be loaded. */
const ensureGsap = () => {
  if (gsapReady) return gsapReady;

  gsapReady = (async () => {
    if (window.gsap?.registerPlugin && window.ScrollTrigger) return window.gsap;
    // Sequential, not parallel: the plugins attach to the core.
    for (const file of GSAP_FILES) await loadScript(url(file));
    if (!window.gsap) throw new Error('gsap global missing after load');
    window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollToPlugin);
    return window.gsap;
  })().catch(error => {
    console.warn('[Global Growth] GSAP unavailable, using fallbacks:', error.message);
    return null;
  });

  return gsapReady;
};

/* ==========================================================================
   1. LENIS SMOOTH SCROLL
   Synced into the GSAP ticker so ScrollTrigger and Lenis share one clock —
   running them on separate loops is what produces jitter.
   ========================================================================== */
const initLenis = async gsap => {
  if (!gsap) return null;

  try {
    await loadScript(url(LENIS_FILE));
  } catch (error) {
    console.warn('[Global Growth] Lenis unavailable, native scrolling retained.');
    return null;
  }

  const Lenis = window.Lenis?.default || window.Lenis;
  if (typeof Lenis !== 'function') return null;

  const lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    smoothWheel: true,
    // Touch devices already have momentum scrolling; layering ours on top
    // makes the page feel laggy rather than smooth.
    smoothTouch: false
  });

  lenis.on('scroll', () => window.ScrollTrigger?.update());
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Hash links must go through Lenis or they fight it.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const target = qs(id);
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { offset: -100 });
  });

  return lenis;
};

/* ==========================================================================
   2. SCROLL REVEAL
   ========================================================================== */
const revealWithGsap = (gsap, targets) => {
  // Hand the properties over to GSAP; the CSS transition would otherwise ease
  // against it. Set only now that GSAP is confirmed loaded.
  document.documentElement.classList.add('gsap-reveal');
  gsap.set(targets, { opacity: 0, y: 40 });

  window.ScrollTrigger.batch(targets, {
    start: 'top 82%',
    once: true,
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      overwrite: true,
      // The class keeps the CSS and JS views of "revealed" in agreement, so
      // the watchdog below can tell whether anything is actually working.
      onStart: () => batch.forEach(node => node.classList.add('is-revealed'))
    })
  });
};

const revealWithObserver = targets => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      .forEach((entry, index) => {
        entry.target.style.transitionDelay = `${Math.min(index, 8) * 80}ms`;
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      });
  }, { rootMargin: '0px 0px -18% 0px', threshold: 0 });

  targets.forEach(node => observer.observe(node));
  return observer;
};

const initReveal = gsap => {
  const targets = qsa('[data-reveal]');
  if (targets.length === 0) return;

  const revealAll = () => targets.forEach(node => {
    node.classList.add('is-revealed');
    node.style.opacity = '';
    node.style.transform = '';
  });

  if (gsap) revealWithGsap(gsap, targets);
  else if ('IntersectionObserver' in window) revealWithObserver(targets);
  else { revealAll(); return; }

  /* ------------------------------------------------------------------------
     WATCHDOG — fail open, never blank.
     Reveal styles hide [data-reveal] as soon as JS boots, on the promise that
     something above will bring them back. If nothing does — a suspended
     rendering pipeline, an odd embedding, a browser quirk — the page would be
     left permanently blank, which is far worse than losing an animation.
     ------------------------------------------------------------------------ */
  let settled = false;
  const check = () => {
    if (settled) return;
    if (targets.some(node => node.classList.contains('is-revealed'))) { settled = true; return; }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const anyInView = targets.some(node => {
      const rect = node.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < viewportHeight;
    });
    if (!anyInView) return; // simply sitting at the top of the page

    settled = true;
    console.warn('[Global Growth] reveal did not fire; showing all content.');
    revealAll();
  };

  setTimeout(check, 2500);
  window.addEventListener('scroll', () => { if (!settled) setTimeout(check, 900); }, { passive: true });
};

/* ==========================================================================
   3. HERO — line reveal and the ascent draw
   ========================================================================== */
const initHero = async gsap => {
  const title = qs('[data-hero-title]');
  if (!gsap && !title) return;

  const timeline = gsap ? gsap.timeline({ defaults: { ease: 'power3.out' } }) : null;

  if (title && gsap) {
    // Wait for fonts so the masks are sized against the real face — but never
    // block on a promise that may not settle.
    try {
      await Promise.race([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]);
    } catch { /* not fatal */ }

    // Lines are authored in the markup rather than split from layout, so the
    // gradient span inside the headline survives and the break points are a
    // design decision. splitTextIntoLines() stays available in utils.js for
    // copy where the breaks genuinely should follow the measured layout.
    const lines = qsa('.gg-line', title);
    if (lines.length) {
      gsap.set(lines, { yPercent: 115 });
      timeline.to(lines, { yPercent: 0, duration: 1, stagger: 0.09 }, 0.1);
    }
  }

  if (gsap) {
    const after = qsa('.gg-hero__lead, .gg-hero__actions, .gg-hero__proof');
    if (after.length) {
      gsap.set(after, { opacity: 0, y: 24 });
      timeline.to(after, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0.55);
    }

    // Bars rise from the baseline, then the trend line draws over them.
    const bars = qsa('.gg-ascent__bar');
    if (bars.length) {
      gsap.set(bars, { scaleY: 0 });
      timeline.to(bars, { scaleY: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out' }, 0.35);
    }

    const path = qs('.gg-ascent__path');
    if (path && typeof path.getTotalLength === 'function') {
      // Measure the real path length instead of the CSS placeholder value, so
      // the dash never over- or under-shoots.
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      timeline.to(path, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0.8);
      const head = qs('.gg-ascent__head');
      if (head) {
        gsap.set(head, { opacity: 0, scale: 0.6, transformOrigin: 'center' });
        timeline.to(head, { opacity: 1, scale: 1, duration: 0.4 }, 1.8);
      }
    }
  }
};

/* ==========================================================================
   4. ROADMAP TIMELINE
   ========================================================================== */
const initTimeline = gsap => {
  const timeline = qs('[data-roadmap]');
  const fill = qs('[data-timeline-fill]', timeline || document);
  if (!timeline || !fill) return;

  if (gsap) {
    gsap.fromTo(fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: 0.4
        }
      });

    // Nodes pop on every screen size.
    qsa('.gg-tl-item', timeline).forEach(item => {
      const node = qs('.gg-tl-item__node', item);
      if (!node) return;
      gsap.fromTo(node, { scale: 0 },
        { scale: 1, duration: 0.5, ease: 'back.out(2)',
          scrollTrigger: { trigger: item, start: 'top 78%', once: true } });
    });

    /* Cards slide in from alternating sides — but only where the timeline is
       actually two-sided. Below 900px it collapses to one full-width column,
       so a 40px horizontal offset has nothing to slide from and simply pushes
       the card past the right edge of a 375px viewport. matchMedia also tears
       the tween down and rebuilds it across the breakpoint on resize. */
    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      qsa('.gg-tl-item', timeline).forEach((item, index) => {
        const card = qs('.gg-tl-card', item);
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 78%', once: true } });
      });
    });

    mm.add('(max-width: 899px)', () => {
      qsa('.gg-tl-card', timeline).forEach(card => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 82%', once: true } });
      });
    });
    return;
  }

  // Fallback: scrub the rail from scroll position directly.
  const update = () => {
    const rect = timeline.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const progress = rect.height > 0 ? (viewportHeight * 0.5 - rect.top) / rect.height : 1;
    fill.style.transform = `scaleY(${Math.min(Math.max(progress, 0), 1)})`;
  };
  update();
  window.addEventListener('scroll', rafThrottle(update), { passive: true });
  window.addEventListener('resize', rafThrottle(update), { passive: true });
};

/* ==========================================================================
   5. MARQUEE — scroll velocity coupling
   The track runs on a CSS animation. Rather than restarting it (which jumps),
   we take the running Animation object and nudge its playbackRate, then ease
   it back to 1. Smooth, and it costs nothing when the page is still.
   ========================================================================== */
const initMarqueeVelocity = () => {
  const track = qs('[data-marquee] .gg-marquee__track');
  if (!track || typeof track.getAnimations !== 'function') return;

  const animation = track.getAnimations()[0];
  if (!animation) return;

  let lastY = window.scrollY;
  let rate = 1;
  let frame = null;

  const settle = () => {
    rate += (1 - rate) * 0.06;
    animation.playbackRate = rate;
    if (Math.abs(rate - 1) > 0.01) frame = requestAnimationFrame(settle);
    else { animation.playbackRate = 1; frame = null; }
  };

  window.addEventListener('scroll', () => {
    const delta = Math.abs(window.scrollY - lastY);
    lastY = window.scrollY;
    // Capped so a fast flick speeds it up noticeably without becoming a blur.
    rate = Math.min(1 + delta / 60, 3.5);
    animation.playbackRate = rate;
    if (!frame) frame = requestAnimationFrame(settle);
  }, { passive: true });
};

/* ==========================================================================
   6. PARALLAX
   ========================================================================== */
const initParallax = gsap => {
  const layers = qsa('[data-parallax]');
  if (layers.length === 0 || !gsap) return;

  layers.forEach(layer => {
    const distance = Number(layer.dataset.parallax) || 80;
    gsap.fromTo(layer,
      { yPercent: -distance / 10 },
      {
        yPercent: distance / 10,
        ease: 'none',
        scrollTrigger: {
          trigger: layer.closest('section') || layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
  });
};

/* ==========================================================================
   7. MAGNETIC BUTTONS
   Desktop pointer only. The button leans about 8px toward the cursor and
   springs back on leave.
   ========================================================================== */
const initMagnetic = gsap => {
  if (!gsap || !window.matchMedia('(pointer: fine)').matches) return;

  qsa('[data-magnetic]').forEach(button => {
    const strength = Number(button.dataset.magnetic) || 8;
    const quickX = gsap.quickTo(button, 'x', { duration: 0.4, ease: 'power3.out' });
    const quickY = gsap.quickTo(button, 'y', { duration: 0.4, ease: 'power3.out' });

    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      quickX(relX * strength * 2);
      quickY(relY * strength * 2);
    });

    button.addEventListener('pointerleave', () => { quickX(0); quickY(0); });
  });
};

/* ==========================================================================
   8. PAGE TRANSITION
   A gradient panel wipes across before an internal navigation. Capped well
   under 500ms, and it never blocks: if navigation somehow does not happen the
   panel clears itself.
   ========================================================================== */
const WIPE_MS = 420;

const initPageTransition = () => {
  const panel = document.createElement('div');
  panel.className = 'gg-wipe';
  panel.setAttribute('aria-hidden', 'true');
  document.body.append(panel);

  /** True only for a same-origin navigation we should animate. */
  const shouldIntercept = (event, link) => {
    if (event.defaultPrevented || event.button !== 0) return false;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download')) return false;

    const href = link.getAttribute('href') || '';
    if (!href || href.startsWith('#')) return false;
    if (/^(mailto|tel|sms|javascript):/i.test(href)) return false;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    // A link to the current page with only a hash difference is in-page.
    if (url.pathname === window.location.pathname && url.hash) return false;
    return true;
  };

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || !shouldIntercept(event, link)) return;

    event.preventDefault();
    panel.classList.add('is-active');

    let navigated = false;
    const go = () => {
      if (navigated) return;
      navigated = true;
      window.location.href = link.href;
    };
    setTimeout(go, WIPE_MS);
    // Backstop: never trap the visitor behind a panel that did not navigate.
    setTimeout(() => panel.classList.remove('is-active'), WIPE_MS + 2500);
  });

  // Returning via the back button restores the page from cache with the panel
  // still up, so clear it on show.
  window.addEventListener('pageshow', () => panel.classList.remove('is-active'));
};

/* ==========================================================================
   9. SCROLL PROGRESS BAR + BACK TO TOP
   ========================================================================== */
const initProgressBar = () => {
  const fill = qs('[data-progress-bar] .gg-progress__fill');
  if (!fill) return;

  const update = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const progress = scrollable > 0 ? doc.scrollTop / scrollable : 0;
    fill.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  };

  update();
  window.addEventListener('scroll', rafThrottle(update), { passive: true });
  window.addEventListener('resize', rafThrottle(update), { passive: true });
};

const initBackToTop = lenis => {
  const button = qs('[data-to-top]');
  if (!button) return;

  const update = () => button.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);

  button.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });

  update();
  window.addEventListener('scroll', rafThrottle(update), { passive: true });
};

/* ==========================================================================
   BOOT
   ========================================================================== */
export const init = async () => {
  // These two are pure scroll maths and are wanted in every mode.
  initProgressBar();

  if (prefersReducedMotion()) {
    // Nothing else runs. CSS has already forced reveals visible and drawn the
    // timeline rail complete; loading an animation library would be waste.
    initBackToTop(null);
    initTimeline(null);
    return;
  }

  const gsap = await ensureGsap();
  const lenis = await initLenis(gsap);

  initBackToTop(lenis);
  initReveal(gsap);
  initTimeline(gsap);
  initParallax(gsap);
  initMagnetic(gsap);
  initMarqueeVelocity();
  initPageTransition();
  await initHero(gsap);

  // Layout shifts as fonts land and lazy images resolve; without this the
  // trigger positions are computed against a page that no longer exists.
  if (window.ScrollTrigger) {
    const refresh = () => window.ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener('load', refresh, { once: true });
    setTimeout(refresh, 1200);
  }
};
