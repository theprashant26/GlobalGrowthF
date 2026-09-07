/**
 * GLOBAL GROWTH — CSR PAGE
 * ---------------------------------------------------------------------------
 * Renders the focus areas, the operating principles and the reporting figures.
 *
 * Every figure is a placeholder. Publishing an unverified social-impact number
 * is worse than publishing none, so the page shows the metric it intends to
 * report against rather than inventing a value for it.
 */

import { qs, icon, escapeHtml, resolve } from './utils.js';
import { CSR_AREAS, CSR_PRINCIPLES, CSR_STATS, CSR_INTRO } from '../data/site.js';

const areaMarkup = area => `
  <article class="gg-cap" data-reveal>
    <span class="gg-value__icon">${icon(area.icon)}</span>
    <h3 class="gg-cap__title">${escapeHtml(area.title)}</h3>
    <p class="gg-cap__text">${escapeHtml(area.text)}</p>
    <p class="gg-csr-measure">
      ${icon('check-circle', 'gg-icon gg-icon--sm')}
      <span>${escapeHtml(area.measure)}</span>
    </p>
  </article>`;

const principleMarkup = principle => `
  <article class="gg-vm__card" data-reveal>
    <h3 class="gg-vm__statement">${escapeHtml(principle.title)}</h3>
    <p class="gg-vm__detail">${escapeHtml(principle.text)}</p>
  </article>`;

/**
 * A metric with no verified value yet. Deliberately NOT the stat card: that
 * component sets its figure at 64px display size, which is meaningless when
 * there is no figure — and wide enough to break the layout.
 *
 * What matters here is the metric we have committed to reporting, so the label
 * leads and the absence is stated plainly. The token itself stays on the
 * element rather than in the copy: a visitor should read "we have not verified
 * this yet", not "{{CSR_TRAINED_PLACEHOLDER}}".
 */
const statMarkup = stat => {
  const value = resolve(stat.value);
  return `
  <div class="gg-metric" data-reveal${value.attr}>
    <span class="gg-badge gg-badge--planned">Awaiting verification</span>
    <span class="gg-metric__label">${escapeHtml(stat.label)}</span>
    <span class="gg-metric__token">${value.pending
      ? 'Figure to be published once independently verified'
      : escapeHtml(value.text)}</span>
  </div>`;
};

export const init = () => {
  const intro = qs('[data-csr="intro"]');
  if (intro) {
    intro.innerHTML = `
      <p class="gg-vm__statement">${escapeHtml(CSR_INTRO.statement)}</p>
      <p class="gg-lead gg-mt-3">${escapeHtml(CSR_INTRO.detail)}</p>`;
  }

  const areas = qs('[data-csr="areas"]');
  if (areas) areas.innerHTML = CSR_AREAS.map(areaMarkup).join('');

  const principles = qs('[data-csr="principles"]');
  if (principles) principles.innerHTML = CSR_PRINCIPLES.map(principleMarkup).join('');

  const stats = qs('[data-csr="stats"]');
  if (stats) stats.innerHTML = CSR_STATS.map(statMarkup).join('');
};
