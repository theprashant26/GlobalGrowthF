/**
 * GLOBAL GROWTH — COUNTERS
 * ---------------------------------------------------------------------------
 * Ticks a number up from zero when it scrolls into view.
 *
 * Markup:  <span data-counter="93">93</span>
 *
 * The element's text is already the final figure, so a visitor with no
 * JavaScript, or with reduced motion on, sees the correct number immediately.
 * This module only animates the way it arrives — it never supplies the value.
 */

import { qsa, prefersReducedMotion } from './utils.js';

const DURATION = 1600;

/** Decelerating ease so the count settles into its final value. */
const easeOut = t => 1 - Math.pow(1 - t, 3);

const run = element => {
  const target = Number(element.dataset.counter);
  if (!Number.isFinite(target)) return;

  const decimals = (element.dataset.counter.split('.')[1] || '').length;
  const final = target.toFixed(decimals);

  // Reserve the final width so the surrounding layout cannot shift while the
  // digits change. Measured before zeroing, while the real value is present.
  element.style.display = 'inline-block';
  element.style.minInlineSize = `${element.offsetWidth}px`;

  // Backstop: if requestAnimationFrame never runs to completion — a
  // background tab, a throttled frame loop, a headless renderer — the figure
  // must still end up correct. A stuck zero is far worse than no animation.
  const settle = setTimeout(() => { element.textContent = final; }, DURATION + 400);

  const started = performance.now();
  element.textContent = (0).toFixed(decimals);

  const tick = now => {
    const progress = Math.min((now - started) / DURATION, 1);
    if (progress < 1) {
      element.textContent = (target * easeOut(progress)).toFixed(decimals);
      requestAnimationFrame(tick);
    } else {
      element.textContent = final;
      clearTimeout(settle);
    }
  };

  requestAnimationFrame(tick);
};

export const init = () => {
  const counters = qsa('[data-counter]');
  if (counters.length === 0) return;

  // Reduced motion, or no observer: the figure is already correct in the DOM.
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

  // The real figure stays in the DOM until run() is actually about to
  // animate it. Zeroing everything up front would strand any counter whose
  // observer never fires at "0".
  counters.forEach(counter => observer.observe(counter));
};
