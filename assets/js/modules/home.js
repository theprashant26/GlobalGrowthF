/**
 * GLOBAL GROWTH — HOMEPAGE
 * ---------------------------------------------------------------------------
 * Hydrates the parts of the homepage that are derived from data: the trust
 * strip, the hero proof row, the stats band, the roadmap teaser and the
 * careers teaser.
 *
 * Prose stays in index.html as static markup so it is crawlable and paints
 * without JavaScript. Only figures and lists that must never contradict
 * sectors.js / site.js / jobs.js are rendered here.
 */

import { qs, icon, escapeHtml } from './utils.js';
import { COUNTS } from '../data/sectors.js';
import { GROUP_STATS, ROADMAP } from '../data/site.js';
import { JOBS } from '../data/jobs.js';
import { statCard } from './cards.js';

/* ==========================================================================
   TRUST STRIP
   ========================================================================== */
const trustMarkup = () => `
  <span class="gg-trust__item">
    <span class="gg-trust__value" data-counter="${COUNTS.sectors}">${COUNTS.sectors}</span> Sectors
  </span>
  <span class="gg-trust__sep" aria-hidden="true">·</span>
  <span class="gg-trust__item">
    <span class="gg-trust__value" data-counter="${COUNTS.divisions}">${COUNTS.divisions}</span> Business Divisions
  </span>
  <span class="gg-trust__sep" aria-hidden="true">·</span>
  <span class="gg-trust__item"><span class="gg-trust__value">One</span> Group</span>
  <span class="gg-trust__mark" aria-hidden="true">
    <span></span><span></span><span></span><span></span>
  </span>`;

/* ==========================================================================
   HERO PROOF ROW
   ========================================================================== */
const proofMarkup = () => [
  { value: COUNTS.sectors,       label: 'Sectors' },
  { value: COUNTS.divisions,     label: 'Divisions' },
  { value: COUNTS.divisionPages, label: 'Division pages live' }
].map(item => `
  <span class="gg-hero__proof-item">
    <span class="gg-hero__proof-value" data-counter="${item.value}">${item.value}</span>
    <span class="gg-hero__proof-label">${escapeHtml(item.label)}</span>
  </span>`).join('');

/* ==========================================================================
   ROADMAP TEASER
   ========================================================================== */
const phaseMarkup = phase => `
  <article class="gg-phase" data-reveal>
    <span class="gg-phase__num">${escapeHtml(phase.number)}</span>
    <h3 class="gg-phase__name">${escapeHtml(phase.name)}</h3>
    <p class="gg-phase__text">${escapeHtml(phase.summary)}</p>
    <div class="gg-phase__focus">
      ${phase.focus.slice(0, 4).map(item =>
        `<span class="gg-phase__chip">${escapeHtml(item)}</span>`).join('')}
      ${phase.focus.length > 4
        ? `<span class="gg-phase__chip">+${phase.focus.length - 4} more</span>`
        : ''}
    </div>
  </article>`;

/* ==========================================================================
   CAREERS TEASER
   The three most recently posted roles, newest first.
   ========================================================================== */
const careersMarkup = () => [...JOBS]
  .sort((a, b) => new Date(b.posted) - new Date(a.posted))
  .slice(0, 3)
  .map(job => `
    <div class="gg-careers-row">
      <span class="gg-careers-row__title">
        <a class="gg-careers-row__link" href="/careers#${job.id}">${escapeHtml(job.title)}</a>
      </span>
      <span class="gg-careers-row__meta">
        ${escapeHtml(job.department)} · ${escapeHtml(job.location)} · ${escapeHtml(job.type)}
      </span>
      <span class="gg-careers-row__arrow">${icon('arrow-right')}</span>
    </div>`).join('');

/* ==========================================================================
   BOOT
   ========================================================================== */
export const init = () => {
  const mounts = {
    trust:   qs('[data-home="trust"]'),
    proof:   qs('[data-home="proof"]'),
    stats:   qs('[data-home="stats"]'),
    phases:  qs('[data-home="phases"]'),
    careers: qs('[data-home="careers"]')
  };

  if (mounts.trust)   mounts.trust.innerHTML   = trustMarkup();
  if (mounts.proof)   mounts.proof.innerHTML   = proofMarkup();
  if (mounts.stats)   mounts.stats.innerHTML   = GROUP_STATS.map(stat =>
                                                   `<div data-reveal>${statCard(stat)}</div>`).join('');
  if (mounts.phases)  mounts.phases.innerHTML  = ROADMAP.map(phaseMarkup).join('');
  if (mounts.careers) mounts.careers.innerHTML = careersMarkup();
};
