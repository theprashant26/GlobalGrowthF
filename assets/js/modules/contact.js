/**
 * GLOBAL GROWTH — CONTACT PAGE
 * ---------------------------------------------------------------------------
 * Renders the department email directory, the routing dropdown on the enquiry
 * form, the division mailbox list and the registered-office block.
 *
 * The routing dropdown and the directory table are built from the same EMAILS
 * array, so a department can never appear in one and not the other.
 */

import { qs, icon, escapeHtml } from './utils.js';
import { EMAILS, DIVISION_EMAILS, OFFICE, BRAND } from '../data/site.js';
import { DIVISION_PAGES } from '../data/sectors.js';

/* ==========================================================================
   DIRECTORY TABLE
   ========================================================================== */
const directoryMarkup = () => `
  <table class="gg-table">
    <caption class="gg-sr-only">Department email directory for Global Growth Industries</caption>
    <thead>
      <tr>
        <th scope="col">Department</th>
        <th scope="col">Email</th>
        <th scope="col">What it is for</th>
      </tr>
    </thead>
    <tbody>
      ${EMAILS.map(entry => `
        <tr>
          <th scope="row">${escapeHtml(entry.dept)}</th>
          <td><a href="mailto:${entry.email}">${entry.email}</a></td>
          <td class="gg-table__note">${escapeHtml(entry.note)}</td>
        </tr>`).join('')}
    </tbody>
  </table>`;

/* ==========================================================================
   DIVISION MAILBOXES
   ========================================================================== */
const divisionMailMarkup = () => DIVISION_PAGES.map(division => {
  const email = DIVISION_EMAILS[division.slug];
  return `
    <a class="gg-maillink" href="mailto:${email}">
      ${icon('mail', 'gg-icon gg-icon--sm')}
      <span>
        <strong>${escapeHtml(division.name)}</strong>
        <span class="gg-maillink__addr">${email}</span>
      </span>
    </a>`;
}).join('');

/* ==========================================================================
   OFFICE
   ========================================================================== */
const officeMarkup = () => `
  <div class="gg-office">
    <h3 class="gg-h4">${escapeHtml(OFFICE.label)}</h3>
    <address class="gg-office__address">
      <strong>${escapeHtml(BRAND.legalNameUC)}</strong><br>
      ${OFFICE.lines.map(escapeHtml).join('<br>')}
    </address>
    <dl class="gg-office__meta">
      <div>
        <dt>Telephone</dt>
        <dd>${escapeHtml(OFFICE.phone)}</dd>
      </div>
      <div>
        <dt>Primary email</dt>
        <dd><a href="mailto:${BRAND.primaryEmail}">${BRAND.primaryEmail}</a></dd>
      </div>
      <div>
        <dt>CIN</dt>
        <dd>${escapeHtml(BRAND.cin)}</dd>
      </div>
    </dl>
  </div>`;

/**
 * Map placeholder. A real embed is withheld deliberately — an iframe pointing
 * at an unconfirmed address would publish a location we cannot stand behind,
 * and Google's embed also sets third-party cookies we have not disclosed.
 * Swap this block for the iframe once OFFICE.mapEmbed is set.
 */
const mapMarkup = () => `
  <div class="gg-map-placeholder">
    <div class="gg-mesh gg-visual__mesh" aria-hidden="true">
      <span class="gg-mesh__blob gg-mesh__blob--1"></span>
      <span class="gg-mesh__blob gg-mesh__blob--3"></span>
    </div>
    <span class="gg-visual__grid" aria-hidden="true"></span>
    <div class="gg-map-placeholder__body">
      ${icon('map-pin', 'gg-icon gg-icon--xl')}
      <p class="gg-map-placeholder__title">Map pending confirmed address</p>
      <p class="gg-map-placeholder__note">
        {{MAP_EMBED_PLACEHOLDER}} — the embed goes in once the registered office
        is confirmed. We would rather show nothing than pin the wrong building.
      </p>
    </div>
  </div>`;

/* ==========================================================================
   BOOT
   ========================================================================== */
export const init = () => {
  const directory = qs('[data-contact="directory"]');
  if (directory) directory.innerHTML = directoryMarkup();

  const divisions = qs('[data-contact="divisions"]');
  if (divisions) divisions.innerHTML = divisionMailMarkup();

  const office = qs('[data-contact="office"]');
  if (office) office.innerHTML = officeMarkup();

  const map = qs('[data-contact="map"]');
  if (map) map.innerHTML = mapMarkup();

  // Routing dropdown — same source as the table above it.
  const routing = qs('[data-contact-routing]');
  if (routing) {
    routing.innerHTML =
      '<option value="">Select a department…</option>' +
      EMAILS.map(entry =>
        `<option value="${escapeHtml(entry.dept)}" data-email="${entry.email}">${escapeHtml(entry.dept)}</option>`
      ).join('');

    // Show the reader exactly which mailbox their message will reach.
    const target = qs('[data-routing-target]');
    const update = () => {
      const option = routing.selectedOptions[0];
      const email = option?.dataset.email;
      if (!target) return;
      target.hidden = !email;
      if (email) {
        target.innerHTML =
          `<svg class="gg-icon gg-icon--sm" aria-hidden="true" focusable="false"><use href="#i-mail"></use></svg>` +
          `<span>This enquiry goes to <strong>${escapeHtml(email)}</strong></span>`;
      }
    };
    routing.addEventListener('change', update);
    update();
  }
};
