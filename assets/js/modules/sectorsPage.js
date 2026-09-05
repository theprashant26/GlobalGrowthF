/**
 * GLOBAL GROWTH — SECTORS PAGE
 * ---------------------------------------------------------------------------
 * Renders the full sector architecture: a sticky index down the left and one
 * detail block per sector, each listing every division beneath it.
 *
 * The sticky index highlights whichever sector is currently in view. That is
 * driven by scroll position rather than IntersectionObserver so that it keeps
 * working if the observer is unavailable — the same fail-open reasoning as the
 * reveal watchdog in animations.js.
 *
 * REGULATORY CONTRACT
 * A planned division renders in the amber treatment with its regulator named
 * and carries no link, because a link implies a service to enquire about.
 */

import { qs, qsa, icon, escapeHtml, rafThrottle } from './utils.js';
import { SECTORS, COUNTS, ALL_DIVISIONS } from '../data/sectors.js';
import { REGULATORY } from '../data/site.js';

/* ==========================================================================
   MARKUP
   ========================================================================== */
const navMarkup = () => `
  <p class="gg-sector-nav__title">All ${COUNTS.sectors} sectors</p>
  <div class="gg-sector-nav__list">
    ${SECTORS.map(sector => `
      <a class="gg-sector-nav__link" href="#${sector.id}" data-nav-for="${sector.id}">
        <span class="gg-sector-nav__num">${escapeHtml(sector.number)}</span>
        <span>${escapeHtml(sector.name)}</span>
      </a>`).join('')}
  </div>`;

const divisionMarkup = division => {
  const planned = division.status === 'planned';
  const linked = Boolean(division.page) && !planned;

  return `
  <div class="gg-division-item${planned ? ' is-planned' : ''}">
    ${icon(planned ? 'alert-circle' : 'check', 'gg-icon gg-icon--sm')}
    <span class="gg-division-item__name">
      ${linked
        ? `<a class="gg-division-item__link" href="${division.page}">${escapeHtml(division.name)}</a>`
        : escapeHtml(division.name)}
    </span>
    <span class="gg-division-item__tail">
      ${planned
        ? `<span class="gg-badge gg-badge--planned">Planned · ${escapeHtml(division.regulator || 'regulatory approval required')}</span>`
        : linked
          ? `<span class="gg-division-item__page">View division ${icon('arrow-right', 'gg-icon gg-icon--sm')}</span>`
          : ''}
    </span>
  </div>`;
};

const detailMarkup = sector => {
  const planned = sector.status === 'planned';
  const plannedCount = sector.divisions.filter(d => d.status === 'planned').length;

  return `
  <section class="gg-sector-detail${planned ? ' is-planned' : ''}" id="${sector.id}"
           aria-labelledby="${sector.id}-title" data-sector-section="${sector.id}">
    <div class="gg-sector-detail__head">
      <span class="gg-sector-detail__icon">${icon(sector.icon)}</span>
      <div>
        <p class="gg-sector-detail__num">Sector ${escapeHtml(sector.number)}</p>
        <h2 class="gg-sector-detail__title" id="${sector.id}-title">${escapeHtml(sector.name)}</h2>
      </div>
      ${planned
        ? `<span class="gg-badge gg-badge--planned">${escapeHtml(REGULATORY.badge)}</span>`
        : `<span class="gg-badge gg-badge--active"><span class="gg-badge__dot"></span>Operational</span>`}
    </div>

    <p class="gg-lead gg-sector-detail__intro">${escapeHtml(sector.intro)}</p>

    <h3 class="gg-h4">
      ${sector.divisions.length} ${sector.divisions.length === 1 ? 'division' : 'divisions'}
      ${plannedCount > 0
        ? `<span class="gg-xs gg-muted" style="font-weight:400"> · ${plannedCount} planned</span>`
        : ''}
    </h3>

    <div class="gg-division-list">
      ${sector.divisions.map(divisionMarkup).join('')}
    </div>
  </section>`;
};

/* ==========================================================================
   STICKY INDEX HIGHLIGHTING
   ========================================================================== */
const wireScrollSpy = (navMount, sections) => {
  const links = new Map(
    qsa('[data-nav-for]', navMount).map(link => [link.dataset.navFor, link])
  );
  let currentId = null;

  const update = () => {
    // The sector whose block covers the reading line — a third of the way
    // down the viewport — is the one the reader is actually looking at.
    const line = window.innerHeight * 0.33;
    let found = null;

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= line && rect.bottom > line) { found = section.id; break; }
      // Past the reading line but nothing has covered it yet: hold the last
      // section that started above the line.
      if (rect.top <= line) found = section.id;
    }
    // Before the first block scrolls up, highlight nothing rather than lying.
    if (found === currentId) return;

    currentId = found;
    links.forEach((link, id) => {
      const active = id === found;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  update();
  window.addEventListener('scroll', rafThrottle(update), { passive: true });
  window.addEventListener('resize', rafThrottle(update), { passive: true });
};

/* ==========================================================================
   BOOT
   ========================================================================== */
export const init = () => {
  const navMount = qs('[data-sectors-nav]');
  const listMount = qs('[data-sectors-list]');
  if (!listMount) return;

  listMount.innerHTML = SECTORS.map(detailMarkup).join('');

  const summary = qs('[data-sectors-summary]');
  if (summary) {
    const plannedDivisions = ALL_DIVISIONS.filter(d => d.status === 'planned');
    summary.textContent =
      `${COUNTS.sectors} sectors · ${COUNTS.divisions} divisions · ` +
      `${plannedDivisions.length} planned pending regulatory approval`;
  }

  // The regulatory footnote names every planned entity, so the list can never
  // drift from the data.
  const regList = qs('[data-planned-list]');
  if (regList) {
    regList.innerHTML = ALL_DIVISIONS
      .filter(division => division.status === 'planned')
      .map(division => `
        <span class="gg-badge gg-badge--planned">
          ${escapeHtml(division.name)} · ${escapeHtml(division.regulator || 'approval required')}
        </span>`).join('');
  }

  if (navMount) {
    navMount.innerHTML = navMarkup();
    wireScrollSpy(navMount, qsa('[data-sector-section]', listMount));
  }
};
