/**
 * GLOBAL GROWTH — PRELOADER
 * ---------------------------------------------------------------------------
 * The logo mark draws in, a counter runs 0 to 100, then the overlay wipes
 * upward to reveal the hero. Hard-capped at 1.8s.
 *
 * Deliberate constraints:
 *   - Shown once per session. A repeat visit within the session skips it.
 *   - Skipped entirely under prefers-reduced-motion.
 *   - Removed on a timeout even if something upstream hangs, so a failed
 *     asset can never leave a visitor staring at a full-screen overlay.
 *
 * Mount point:  <div class="gg-preloader" data-preloader> … </div>
 */

import { qs, prefersReducedMotion, session } from './utils.js';

const SESSION_KEY = 'gg-preloader-seen';
const MAX_DURATION = 1800;
const WIPE_DURATION = 600;

/** Removes the overlay and restores scrolling. Safe to call more than once. */
const dismiss = (node, immediate = false) => {
  if (!node || node.dataset.dismissed === 'true') return;
  node.dataset.dismissed = 'true';
  node.classList.add('is-done');
  document.documentElement.classList.remove('is-preloading');

  if (immediate) { node.remove(); return; }

  node.animate(
    [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }],
    { duration: WIPE_DURATION, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' }
  ).finished.then(() => node.remove()).catch(() => node.remove());
};

export const init = () => {
  const node = qs('[data-preloader]');
  if (!node) return;

  // Reduced motion, or already seen this session — never show it at all.
  if (prefersReducedMotion() || session.get(SESSION_KEY) === '1') {
    dismiss(node, true);
    return;
  }
  session.set(SESSION_KEY, '1');

  document.documentElement.classList.add('is-preloading');

  const fill    = qs('.gg-preloader__fill', node);
  const counter = qs('.gg-preloader__count', node);
  const strokes = Array.from(node.querySelectorAll('.gg-preloader__mark [data-draw]'));

  // Draw the mark by running each bar up from its own baseline.
  strokes.forEach((stroke, index) => {
    stroke.animate(
      [{ transform: 'scaleY(0)', opacity: 0 }, { transform: 'scaleY(1)', opacity: 1 }],
      { duration: 520, delay: index * 90, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' }
    );
  });

  // Counter and bar share one clock so they can never disagree.
  const started = performance.now();
  let frame = null;

  const tick = now => {
    const progress = Math.min((now - started) / (MAX_DURATION - WIPE_DURATION), 1);
    // Ease-out so the count decelerates into 100 rather than stopping dead.
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * 100);

    if (counter) counter.textContent = String(value).padStart(3, '0');
    if (fill) fill.style.inlineSize = `${eased * 100}%`;

    if (progress < 1) {
      frame = requestAnimationFrame(tick);
    } else {
      dismiss(node);
    }
  };
  frame = requestAnimationFrame(tick);

  // Backstop: whatever happens above, the overlay goes away.
  setTimeout(() => {
    cancelAnimationFrame(frame);
    dismiss(node);
  }, MAX_DURATION);
};
