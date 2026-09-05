/**
 * GLOBAL GROWTH — ABOUT PAGE
 * ---------------------------------------------------------------------------
 * Renders vision and mission, the values grid, the interactive group org tree,
 * the leadership grid and the milestone timeline.
 *
 * The org tree is built on <details>/<summary>, so expanding a sector works
 * with the keyboard, is announced correctly, and still works with JavaScript
 * disabled once the markup exists.
 */

import { qs, qsa, icon, escapeHtml, url } from './utils.js';
import { SECTORS, COUNTS } from '../data/sectors.js';
import { BRAND, VISION, MISSION, VALUES, LEADERSHIP, MILESTONES, GOVERNANCE } from '../data/site.js';
import { leaderCard } from './cards.js';

/* ==========================================================================
   VISION & MISSION
   ========================================================================== */
const vmCard = entry => `
  <article class="gg-vm__card" data-reveal>
    <p class="gg-vm__label">${escapeHtml(entry.title)}</p>
    <p class="gg-vm__statement">${escapeHtml(entry.statement)}</p>
    <p class="gg-vm__detail">${escapeHtml(entry.detail)}</p>
  </article>`;

/* ==========================================================================
   VALUES
   ========================================================================== */
const valueCard = value => `
  <article class="gg-value" data-reveal>
    <span class="gg-value__icon">${icon(value.icon)}</span>
    <h3 class="gg-value__title">${escapeHtml(value.title)}</h3>
    <p class="gg-value__text">${escapeHtml(value.text)}</p>
  </article>`;

/* ==========================================================================
   ORG TREE
   ========================================================================== */
const treeDivision = division => {
  const planned = division.status === 'planned';
  const linked = Boolean(division.page) && !planned;

  return `
  <div class="gg-node__item${planned ? ' is-planned' : ''}">
    ${icon(planned ? 'alert-circle' : 'chevron-right', 'gg-icon gg-icon--sm')}
    ${linked
      ? `<a href="${url(division.page)}">${escapeHtml(division.name)}</a>`
      : escapeHtml(division.name)}
    ${planned
      ? `<span class="gg-badge gg-badge--planned">${escapeHtml(division.regulator || 'Planned')}</span>`
      : ''}
  </div>`;
};

const treeNode = sector => `
  <details class="gg-node${sector.status === 'planned' ? ' is-planned' : ''}">
    <summary class="gg-node__head">
      <span class="gg-node__icon">${icon(sector.icon, 'gg-icon gg-icon--sm')}</span>
      <span class="gg-node__name">${escapeHtml(sector.name)}</span>
      <span class="gg-node__count">${sector.divisions.length}</span>
      <span class="gg-node__chev">${icon('chevron-down', 'gg-icon gg-icon--sm')}</span>
    </summary>
    <div class="gg-node__body">
      <div class="gg-node__list">
        ${sector.divisions.map(treeDivision).join('')}
      </div>
    </div>
  </details>`;

const treeMarkup = () => `
  <div class="gg-tree__root" data-reveal>
    <strong>${escapeHtml(BRAND.groupName)}</strong>
    <span>${COUNTS.sectors} sectors · ${COUNTS.divisions} divisions</span>
  </div>
  <div class="gg-tree__stem" aria-hidden="true"></div>
  <div class="gg-tree__grid">
    ${SECTORS.map(treeNode).join('')}
  </div>`;

/* ==========================================================================
   MILESTONES
   ========================================================================== */
const milestoneMarkup = milestone => `
  <article class="gg-milestone" data-reveal>
    <p class="gg-milestone__year">${escapeHtml(milestone.year)}</p>
    <h3 class="gg-milestone__title">${escapeHtml(milestone.title)}</h3>
    <p class="gg-milestone__text">${escapeHtml(milestone.text)}</p>
  </article>`;

/* ==========================================================================
   BOOT
   ========================================================================== */
export const init = () => {
  const mounts = {
    vm:         qs('[data-about="vision-mission"]'),
    values:     qs('[data-about="values"]'),
    tree:       qs('[data-about="tree"]'),
    leadership: qs('[data-about="leadership"]'),
    milestones: qs('[data-about="milestones"]'),
    governance: qs('[data-about="governance"]')
  };

  if (mounts.vm) mounts.vm.innerHTML = vmCard(VISION) + vmCard(MISSION);
  if (mounts.values) mounts.values.innerHTML = VALUES.map(valueCard).join('');
  if (mounts.tree) mounts.tree.innerHTML = treeMarkup();

  if (mounts.leadership) {
    mounts.leadership.innerHTML = LEADERSHIP
      .map(person => `<div data-reveal>${leaderCard(person)}</div>`).join('');
  }

  if (mounts.milestones) mounts.milestones.innerHTML = MILESTONES.map(milestoneMarkup).join('');

  if (mounts.governance) {
    mounts.governance.innerHTML = GOVERNANCE.map(item => `
      <li class="gg-node__item">
        ${icon('check', 'gg-icon gg-icon--sm')}
        <span>${escapeHtml(item)}</span>
      </li>`).join('');
  }

  // Expand the first sector so the tree reads as interactive on arrival
  // rather than as a flat list of closed rows.
  qs('.gg-node', document)?.setAttribute('open', '');
};
