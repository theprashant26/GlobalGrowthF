/**
 * GLOBAL GROWTH — DIVISION MARQUEE
 * ---------------------------------------------------------------------------
 * An infinite horizontal scroll of the twelve divisions that have a page.
 *
 * The track is rendered once and then duplicated, so the CSS animation can
 * translate it by exactly -50% and loop with no visible seam. Duration is
 * derived from the measured track width, which keeps the scroll speed
 * constant regardless of how many divisions exist or how wide the viewport is.
 *
 * Phase 6 links the speed to scroll velocity. This module owns the base loop.
 *
 * Mount point:  <div class="gg-marquee" data-marquee><div class="gg-marquee__track"></div></div>
 */

import { qs, qsa, icon, escapeHtml, prefersReducedMotion, debounce, url } from './utils.js';
import { DIVISION_PAGES } from '../data/sectors.js';

/** Pixels per second. Slow and confident — this is not a ticker tape. */
const SPEED = 70;

const itemMarkup = division => `
  <a class="gg-marquee__item" href="${url(division.page)}">
    ${icon('arrow-up-right')}${escapeHtml(division.name)}
  </a>`;

export const init = () => {
  const root = qs('[data-marquee]');
  if (!root) return;

  const track = qs('.gg-marquee__track', root);
  if (!track) return;

  const items = DIVISION_PAGES.map(itemMarkup).join('');

  // Reduced motion: render one static, wrapping set. No loop, no duplicates —
  // a duplicated list read twice by a screen reader is worse than no marquee.
  if (prefersReducedMotion()) {
    track.innerHTML = items;
    track.style.animation = 'none';
    track.style.inlineSize = 'auto';
    track.style.flexWrap = 'wrap';
    track.style.justifyContent = 'center';
    return;
  }

  // The duplicate is decorative only: hidden from assistive technology and
  // removed from the tab order, so the twelve links are announced once.
  track.innerHTML = items;
  const clone = track.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  qsa('a', clone).forEach(link => link.setAttribute('tabindex', '-1'));
  while (clone.firstChild) track.append(clone.firstChild);

  const setDuration = () => {
    // Half the track is one full set; that is the distance of one loop.
    const distance = track.scrollWidth / 2;
    if (distance > 0) root.style.setProperty('--gg-marquee-dur', `${distance / SPEED}s`);
  };

  setDuration();
  window.addEventListener('resize', debounce(setDuration, 200), { passive: true });

  // Fonts land after first paint and change the measured width, so re-measure.
  if (document.fonts?.ready) document.fonts.ready.then(setDuration).catch(() => {});
};
