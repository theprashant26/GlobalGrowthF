/**
 * GLOBAL GROWTH — ROADMAP PAGE
 * ---------------------------------------------------------------------------
 * Renders the three growth phases as a vertical timeline. The rail's fill is
 * scrubbed by scroll position in animations.js; this module owns the markup.
 *
 * Phase 3 is flagged as containing regulated activities, and the card says so
 * explicitly rather than listing Banking and Financial Services as though they
 * were simply scheduled work.
 */

import { qs, icon, escapeHtml } from './utils.js';
import { ROADMAP, REGULATORY } from '../data/site.js';

const itemMarkup = (phase, index) => `
  <article class="gg-tl-item" data-reveal>
    <span class="gg-tl-item__node" aria-hidden="true">${index + 1}</span>
    <div class="gg-tl-card">
      <p class="gg-tl-card__label">${escapeHtml(phase.window)}</p>
      <h2 class="gg-tl-card__title">${escapeHtml(phase.name)}</h2>
      <p class="gg-tl-card__text">${escapeHtml(phase.summary)}</p>

      <div class="gg-tl-card__focus">
        ${phase.focus.map(item =>
          `<span class="gg-phase__chip">${escapeHtml(item)}</span>`).join('')}
      </div>

      ${phase.hasRegulated ? `
        <p class="gg-form-note gg-form-note--info gg-mt-3" style="text-align:start">
          ${icon('alert-circle')}
          <span>Several activities in this phase are licensed. ${escapeHtml(REGULATORY.footnote)}</span>
        </p>` : ''}
    </div>
  </article>`;

export const init = () => {
  const mount = qs('[data-roadmap]');
  if (!mount) return;

  mount.innerHTML = `
    <div class="gg-timeline__rail" aria-hidden="true">
      <span class="gg-timeline__fill" data-timeline-fill></span>
    </div>
    ${ROADMAP.map(itemMarkup).join('')}`;
};
