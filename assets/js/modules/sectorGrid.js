/**
 * GLOBAL GROWTH — SECTOR GRID
 * ---------------------------------------------------------------------------
 * Renders all 15 sectors from sectors.js using the shared card template, and
 * wires the All / Operational / Planned filter.
 *
 * Filtering hides cards with the `hidden` attribute rather than a class, so a
 * filtered-out card leaves the tab order and the accessibility tree instead of
 * merely disappearing visually.
 *
 * Mount point:
 *   <div data-sector-grid>
 *     <div data-sector-filter></div>
 *     <div class="gg-sector-grid" data-sector-cards></div>
 *   </div>
 */

import { qs, qsa, icon, escapeHtml } from './utils.js';
import { SECTORS, COUNTS } from '../data/sectors.js';
import { sectorCard } from './cards.js';

const FILTERS = [
  { id: 'all',     label: 'All sectors',  match: () => true },
  { id: 'active',  label: 'Operational',  match: sector => sector.status === 'active' },
  { id: 'planned', label: 'Planned',      match: sector => sector.status === 'planned' }
];

const countFor = filter => SECTORS.filter(filter.match).length;

const filterMarkup = () => FILTERS.map((filter, index) => `
  <button class="gg-filter__btn" type="button"
          data-filter="${filter.id}"
          aria-pressed="${index === 0 ? 'true' : 'false'}">
    ${escapeHtml(filter.label)}
    <span class="gg-filter__count">${countFor(filter)}</span>
  </button>`).join('');

export const init = () => {
  const root = qs('[data-sector-grid]');
  if (!root) return;

  const cardsMount = qs('[data-sector-cards]', root);
  const filterMount = qs('[data-sector-filter]', root);
  if (!cardsMount) return;

  // --- Render cards -------------------------------------------------------
  cardsMount.innerHTML = SECTORS.map(sector => sectorCard(sector)).join('');

  // Each card reveals on scroll; animations.js picks these up.
  qsa('.gg-sector-card', cardsMount).forEach(card => card.setAttribute('data-reveal', ''));

  // Announces the result of a filter change to screen readers.
  const status = document.createElement('p');
  status.className = 'gg-sr-only';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  cardsMount.before(status);

  if (!filterMount) return;

  // --- Render and wire the filter ----------------------------------------
  filterMount.innerHTML = filterMarkup();

  const apply = id => {
    const filter = FILTERS.find(f => f.id === id) || FILTERS[0];
    let shown = 0;

    qsa('.gg-sector-card', cardsMount).forEach(card => {
      const sector = SECTORS.find(s => s.id === card.dataset.sector);
      const visible = Boolean(sector) && filter.match(sector);
      card.hidden = !visible;
      if (visible) shown += 1;
    });

    qsa('[data-filter]', filterMount).forEach(button =>
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter.id)));

    status.textContent =
      `Showing ${shown} of ${COUNTS.sectors} sectors — ${filter.label.toLowerCase()}.`;
  };

  filterMount.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (button) apply(button.dataset.filter);
  });
};
