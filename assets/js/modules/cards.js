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

import { icon, escapeHtml, url, picture, resolve } from './utils.js';
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
      ${planned
        ? `<span class="gg-badge gg-badge--planned">Planned · ${escapeHtml(division.regulator || 'approval required')}</span>`
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

/**
 * The portrait grid sits three-up on desktop inside a 1200px container and the
 * media box is capped at 420px tall on a 4:5 ratio, so ~336 CSS px is the
 * widest a card ever gets. 800 covers that past 2x.
 */
const PORTRAIT_SIZES = '(min-width: 1100px) 30vw, (min-width: 640px) 46vw, 92vw';
const PORTRAIT_WIDTHS = [320, 480, 800];

/**
 * Alt text for a portrait.
 *
 * While the name is still a {{PLACEHOLDER}}, using it as the alt would put the
 * literal braces into a screen reader. It would also assert that the face
 * belongs to a person we cannot name. Saying it is a placeholder is the only
 * honest description available until the real name and photograph land
 * together.
 */
const portraitAlt = person => (
  /^\{\{/.test(person.name)
    ? `Placeholder portrait for the ${person.role} — photograph to be supplied`
    : person.name
);

/**
 * Leadership card.
 *
 * While a name is still pending the card leads with the ROLE, because the role
 * is the real information — the group does have a Chairman, we just cannot
 * name them yet. Leading with a greyed "to be announced" and demoting the role
 * to a subtitle would bury the only true fact on the card.
 *
 * The moment a real name lands in site.js the card flips back to name-first
 * with no other change.
 */
export const leaderCard = person => {
  const name = resolve(person.name);
  const bio = resolve(person.bio);
  const pending = name.pending;

  return `
  <article class="gg-leader-card${pending ? ' is-pending' : ''}">
    <div class="gg-leader-card__media${person.photo ? '' : ' is-monogram'}">
      ${person.photo
        ? picture(
            { file: person.photo, width: 800, height: 1000, alt: portraitAlt(person) },
            { sizes: PORTRAIT_SIZES, dir: 'team', widths: PORTRAIT_WIDTHS })
        : `<span class="gg-leader-card__monogram" aria-hidden="true">${escapeHtml(monogram(person.name))}</span>`}
    </div>
    <div class="gg-leader-card__body"${name.attr}>
      <h3 class="gg-leader-card__name">${escapeHtml(pending ? person.role : name.text)}</h3>
      <p class="gg-leader-card__role">${pending ? 'Appointment to be announced' : escapeHtml(person.role)}</p>
      ${!bio.pending && bio.text
        ? `<p class="gg-leader-card__bio">${escapeHtml(bio.text)}</p>`
        : ''}
    </div>
  </article>`;
};

/* ==========================================================================
   JOB CARD
   ========================================================================== */
/**
 * Position card. Takes a role from ALL_ROLES in jobs.js.
 *
 * A planned division's position carries the amber badge and no link, for the
 * same reason a planned sector card carries no CTA: a "view position" affordance
 * reads as an invitation to apply, and there is nothing to apply for until the
 * licence is in force.
 */
export const roleCard = role => {
  const planned = role.status === 'planned';

  return `
  <article class="gg-job-card${planned ? ' is-planned' : ''}"
           data-role="${role.id}" data-division="${escapeHtml(role.divisionId)}">
    <div class="gg-job-card__head">
      <h3 class="gg-job-card__title">${escapeHtml(role.title)}</h3>
      <span class="gg-job-card__dept">${escapeHtml(role.brandName)}</span>
    </div>
    <div class="gg-job-card__foot">
      <div class="gg-job-card__meta">
        <span class="gg-badge gg-badge--number">${escapeHtml(role.level)}</span>
        <span class="gg-badge gg-badge--meta">${escapeHtml(role.salary)}</span>
        ${role.experience ? `<span class="gg-badge gg-badge--meta">${escapeHtml(role.experience)}</span>` : ''}
        ${planned
          ? `<span class="gg-badge gg-badge--planned">Planned · ${escapeHtml(role.regulator || 'approval required')}</span>`
          : ''}
      </div>
      ${planned
        ? ''
        : `<a class="gg-btn gg-btn--secondary gg-btn--sm" href="${url(`/careers#${role.id}`)}">
             View position ${icon('arrow-right', 'gg-btn__icon')}
           </a>`}
    </div>
  </article>`;
};
