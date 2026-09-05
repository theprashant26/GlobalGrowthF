/**
 * GLOBAL GROWTH — CARD TEMPLATES
 * ---------------------------------------------------------------------------
 * One definition per card, shared by every consumer: the styleguide, the
 * homepage sector grid, the sectors page, division pages and careers.
 *
 * Each function returns an HTML string. Callers are responsible for inserting
 * it; every value that comes from data is escaped here.
 *
 * REGULATORY CONTRACT
 * A sector or division with status 'planned' renders with the approval badge,
 * carries .is-planned, and has no call to action. That behaviour lives in
 * these templates — not in the pages — so no page can accidentally omit it.
 */

import { icon, escapeHtml, url } from './utils.js';
import { REGULATORY } from '../data/site.js';

/** The status badge for any entity carrying a status flag. */
export const statusBadge = entity =>
  entity.status === 'planned'
    ? `<span class="gg-badge gg-badge--planned">${escapeHtml(REGULATORY.badge)}</span>`
    : `<span class="gg-badge gg-badge--active"><span class="gg-badge__dot"></span>Active</span>`;

/* ==========================================================================
   SECTOR CARD
   ========================================================================== */
export const sectorCard = (sector, { chips = 3 } = {}) => {
  const planned = sector.status === 'planned';
  const shown = sector.divisions.slice(0, chips);
  const remaining = sector.divisions.length - shown.length;

  return `
  <article class="gg-sector-card${planned ? ' is-planned' : ''}" data-sector="${sector.id}" data-status="${sector.status}">
    <div class="gg-sector-card__top">
      <span class="gg-sector-card__icon">${icon(sector.icon)}</span>
      <span class="gg-sector-card__num" aria-hidden="true">${escapeHtml(sector.number)}</span>
    </div>

    <h3 class="gg-sector-card__title">
      ${planned
        ? escapeHtml(sector.name)
        : `<a class="gg-sector-card__link" href="${url(`/sectors#${sector.id}`)}">${escapeHtml(sector.name)}</a>`}
    </h3>
    <p class="gg-sector-card__text">${escapeHtml(sector.summary)}</p>

    <div class="gg-sector-card__divs">
      ${shown.map(division =>
        `<span class="gg-sector-card__chip">${escapeHtml(division.name)}</span>`).join('')}
      ${remaining > 0 ? `<span class="gg-sector-card__chip">+${remaining} more</span>` : ''}
    </div>

    <div class="gg-sector-card__foot">
      ${planned
        ? `<span class="gg-badge gg-badge--planned">${escapeHtml(REGULATORY.badge)}</span>`
        : `<span class="gg-badge gg-badge--number">Sector ${escapeHtml(sector.number)}</span>
           <span class="gg-sector-card__cta">Explore ${icon('arrow-right')}</span>`}
    </div>
  </article>`;
};

/* ==========================================================================
   DIVISION CARD
   ========================================================================== */
export const divisionCard = (division, { showSector = true } = {}) => {
  const planned = division.status === 'planned';
  const hasPage = Boolean(division.page) && !planned;

  return `
  <article class="gg-div-card${planned ? ' is-planned' : ''}">
    <span class="gg-div-card__icon">${icon(division.icon || division.sectorIcon || 'arrow-up-right', 'gg-icon')}</span>
    <div class="gg-div-card__body">
      <h3 class="gg-div-card__name">
        ${hasPage
          ? `<a class="gg-div-card__link" href="${url(division.page)}">${escapeHtml(division.name)}</a>`
          : escapeHtml(division.name)}
      </h3>
      ${showSector && division.sectorName
        ? `<p class="gg-div-card__sector">${escapeHtml(division.sectorName)}</p>`
        : ''}
    </div>
    ${hasPage ? `<span class="gg-div-card__arrow">${icon('arrow-right')}</span>` : ''}
  </article>`;
};

/* ==========================================================================
   STAT CARD
   The value is rendered inside a [data-counter] span so counters.js can tick
   it up on entry. Without JS it shows the final figure, which is correct.
   ========================================================================== */
export const statCard = stat => `
  <div class="gg-stat-card">
    <span class="gg-stat-card__value gg-grad-text">
      <span data-counter="${stat.value}">${stat.value}</span>${escapeHtml(stat.suffix || '')}
    </span>
    <span class="gg-stat-card__label">${escapeHtml(stat.label)}</span>
    ${stat.detail ? `<span class="gg-stat-card__detail">${escapeHtml(stat.detail)}</span>` : ''}
  </div>`;

/* ==========================================================================
   LEADERSHIP CARD
   Falls back to a monogram while portraits are still placeholders, rather
   than shipping a broken image or a grey box.
   ========================================================================== */
const monogram = name => name
  .replace(/\{\{|\}\}/g, '')
  .split(/[\s_]+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(word => word[0])
  .join('')
  .toUpperCase() || '—';

export const leaderCard = person => `
  <article class="gg-leader-card">
    <div class="gg-leader-card__media">
      ${person.photo
        ? `<img src="${url(person.photo)}" alt="${escapeHtml(person.name)}" width="480" height="600" loading="lazy">`
        : `<span class="gg-leader-card__monogram" aria-hidden="true">${escapeHtml(monogram(person.name))}</span>`}
    </div>
    <div class="gg-leader-card__body">
      <h3 class="gg-leader-card__name">${escapeHtml(person.name)}</h3>
      <p class="gg-leader-card__role">${escapeHtml(person.role)}</p>
      ${person.bio ? `<p class="gg-leader-card__bio">${escapeHtml(person.bio)}</p>` : ''}
    </div>
  </article>`;

/* ==========================================================================
   JOB CARD
   ========================================================================== */
export const jobCard = job => `
  <article class="gg-job-card" data-job="${job.id}" data-department="${escapeHtml(job.department)}">
    <div class="gg-job-card__head">
      <h3 class="gg-job-card__title">${escapeHtml(job.title)}</h3>
      <span class="gg-job-card__dept">${escapeHtml(job.department)}</span>
    </div>
    <p class="gg-job-card__summary">${escapeHtml(job.summary)}</p>
    <div class="gg-job-card__foot">
      <div class="gg-job-card__meta">
        <span class="gg-badge gg-badge--meta">${icon('map-pin', 'gg-icon gg-icon--sm')}${escapeHtml(job.location)}</span>
        <span class="gg-badge gg-badge--meta">${icon('clock', 'gg-icon gg-icon--sm')}${escapeHtml(job.type)}</span>
        <span class="gg-badge gg-badge--meta">${escapeHtml(job.experience)}</span>
      </div>
      <a class="gg-btn gg-btn--secondary gg-btn--sm" href="${url(`/careers#${job.id}`)}">
        View role ${icon('arrow-right', 'gg-btn__icon')}
      </a>
    </div>
  </article>`;
