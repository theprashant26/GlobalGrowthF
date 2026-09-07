/**
 * GLOBAL GROWTH — FOOTER
 * ---------------------------------------------------------------------------
 * Renders the four-column site footer from nav.js, sectors.js and site.js.
 *
 * Kept separate from navbar.js because the two are independent concerns and a
 * page may legitimately want one without the other (the styleguide does).
 * The canonical markup this produces is mirrored in partials/footer.html.
 *
 * Mount point:  <footer class="gg-footer" data-footer></footer>
 */

import { qs, icon, escapeHtml, url } from './utils.js';
import { FOOTER_LINKS, LEGAL_LINKS } from '../data/nav.js';
import { DIVISION_PAGES } from '../data/sectors.js';
import { BRAND, OFFICE, EMAILS, SOCIAL, REGULATORY, CERTIFICATIONS } from '../data/site.js';

/**
 * The certification strip prints only the acronyms; every registration number
 * lives on /about, one click away, and the link goes straight there. If any of
 * these cannot be evidenced, remove it from CERTIFICATIONS in site.js and it
 * disappears from both places at once — never edit this list here.
 */

/** The four addresses worth surfacing in the footer; the rest live on /contact. */
const FOOTER_EMAIL_KEYS = [
  'info@globalgrowthindustries.com',
  'business@globalgrowthindustries.com',
  'careers@globalgrowthindustries.com'
];

const footerEmails = () =>
  FOOTER_EMAIL_KEYS
    .map(address => EMAILS.find(entry => entry.email === address))
    .filter(Boolean);

/** A placeholder social link is rendered inert rather than pointing at "#". */
const socialLink = item => {
  const unresolved = item.href.startsWith('{{');
  const attrs = unresolved
    ? 'aria-disabled="true" title="Profile link pending"'
    : `href="${item.href}" target="_blank" rel="noopener noreferrer"`;
  return `<a ${attrs} aria-label="${escapeHtml(BRAND.masterBrand)} on ${escapeHtml(item.name)}">
      ${icon(item.icon, 'gg-icon gg-icon--solid')}
    </a>`;
};

const markup = () => `
  <div class="gg-container">
    <div class="gg-footer__grid">

      <div>
        <img class="gg-footer__logo" src="${url(BRAND.logo.lockupWhite)}"
             alt="${escapeHtml(BRAND.legalName)}" width="480" height="358" loading="lazy">
        <p class="gg-footer__tagline">${escapeHtml(BRAND.tagline)}</p>
        <p class="gg-footer__tagline gg-mt-2" style="opacity:.72">
          ${escapeHtml(BRAND.logoTagline)}
        </p>
        <div class="gg-footer__social">
          ${SOCIAL.map(socialLink).join('')}
        </div>
      </div>

      <nav aria-label="Group pages">
        <h2 class="gg-footer__title">The Group</h2>
        <ul class="gg-footer__list">
          ${FOOTER_LINKS.map(link => `
            <li><a href="${url(link.href)}">${escapeHtml(link.label)}</a></li>`).join('')}
        </ul>
      </nav>

      <nav aria-label="Our divisions">
        <h2 class="gg-footer__title">Divisions</h2>
        <ul class="gg-footer__list gg-footer__list--split">
          ${DIVISION_PAGES.map(division => `
            <li><a href="${url(division.page)}">${escapeHtml(division.name)}</a></li>`).join('')}
        </ul>
      </nav>

      <div>
        <h2 class="gg-footer__title">Contact</h2>
        <div class="gg-footer__contact">
          ${footerEmails().map(entry => `
            <div class="gg-footer__contact-row">
              ${icon('mail', 'gg-icon gg-icon--sm')}
              <span>
                <a href="mailto:${entry.email}">${entry.email}</a><br>
                <span class="gg-xs" style="opacity:.7">${escapeHtml(entry.dept)}</span>
              </span>
            </div>`).join('')}

          <div class="gg-footer__contact-row">
            ${icon('phone', 'gg-icon gg-icon--sm')}
            <span>
              <a href="tel:${OFFICE.phone.replace(/\s+/g, '')}">${escapeHtml(OFFICE.phone)}</a><br>
              <span class="gg-xs" style="opacity:.7">Telephone</span>
            </span>
          </div>

          <div class="gg-footer__contact-row">
            ${icon('map-pin', 'gg-icon gg-icon--sm')}
            <address class="gg-small">
              <strong style="display:block;color:var(--gg-white);font-weight:600">${escapeHtml(OFFICE.label)}</strong>
              ${OFFICE.lines.map(escapeHtml).join('<br>')}
            </address>
          </div>
        </div>
        <a class="gg-btn gg-btn--secondary gg-btn--sm gg-mt-3" href="${url('/contact')}">
          All department emails ${icon('arrow-right', 'gg-btn__icon')}
        </a>
      </div>

    </div>

    <p class="gg-footer__note">
      <strong style="color:var(--gg-on-dark)">Regulatory notice.</strong>
      ${escapeHtml(REGULATORY.footnote)}
    </p>

    <p class="gg-footer__certs">
      <span>Registered &amp; certified with</span>
      ${CERTIFICATIONS.map(c => `<span>${escapeHtml(c.abbr)}</span>`).join('')}
      <a href="${url('/about#certifications')}">See the references</a>
    </p>

    <div class="gg-footer__bar">
      <span>&copy; ${new Date().getFullYear()} ${escapeHtml(BRAND.legalNameUC)}. All rights reserved.</span>
      <span>CIN: ${escapeHtml(BRAND.cin)}</span>
      <nav class="gg-footer__legal" aria-label="Legal">
        ${LEGAL_LINKS.map(link => `<a href="${url(link.href)}">${escapeHtml(link.label)}</a>`).join('')}
      </nav>
    </div>
  </div>`;

export const init = () => {
  const mount = qs('[data-footer]');
  if (!mount) return;
  // The footer is a dark surface, so it opts into the on-dark component
  // context. Without this a .gg-btn--secondary inside it renders its light
  // styles — navy on navy — and effectively disappears. Set here rather than
  // in every page's markup so it can never be forgotten.
  mount.classList.add('gg-dark');
  mount.innerHTML = markup();
};
