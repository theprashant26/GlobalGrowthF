/**
 * GLOBAL GROWTH — DIVISION PAGE
 * ---------------------------------------------------------------------------
 * Hydrates any of the twelve division pages from its slug. Each page is an
 * identical shell carrying one attribute:
 *
 *   <body class="page-division" data-page="division" data-division="aviation">
 *
 * Everything else — name, parent sector, breadcrumb, page copy, sibling
 * divisions and the division mailbox — is looked up here. Adding a thirteenth
 * division page means adding a folder with the same shell, an entry in
 * sectors.js and one in divisions.js. No markup is written twice.
 *
 * ACCENT TINT
 * Pages are differentiated by their sector icon and a single accent taken from
 * the existing brand ramp, assigned by parent sector so divisions in the same
 * sector match. The accent appears only as a hairline, an icon colour and a
 * border — never as a fill. No division has a colour scheme of its own.
 */

import { qs, qsa, icon, escapeHtml, url, picture } from './utils.js';
import { getDivision, getRelatedDivisions, getSector, SECTORS,
         DIVISION_PAGES } from '../data/sectors.js';
import { getDivisionDetail, getDivisionPhoto } from '../data/divisions.js';
import { DIVISION_EMAILS, BRAND } from '../data/site.js';
import { divisionCard } from './cards.js';

/**
 * Ramp stops available as an accent, chosen by sector rather than division.
 *
 * Only these three qualify. The accent is used on light sections (capability
 * numbers, service ticks, hover borders) AND on dark ones (the hero mark, the
 * step numbers, the contact strip's edge), so it has to clear 3:1 — the WCAG
 * bar for non-text UI — against BOTH --gg-white and --gg-navy-900:
 *
 *   blue-500   3.42 on navy   5.22 on white
 *   teal-500   5.07 on navy   3.52 on white
 *   green-500  5.93 on navy   3.01 on white
 *
 * navy-500 (1.90 on navy) and green-400 (2.22 on white) each disappear in one
 * of the two contexts, so neither can be an accent.
 */
const ACCENTS = ['--gg-blue-500', '--gg-teal-500', '--gg-green-500'];

const accentFor = sectorId => {
  const index = SECTORS.findIndex(sector => sector.id === sectorId);
  return ACCENTS[(index < 0 ? 0 : index) % ACCENTS.length];
};

/* ==========================================================================
   SECTION RENDERERS
   ========================================================================== */
const heroMarkup = (division, sector, detail, email) => `
  <div class="gg-mesh gg-page-hero__mesh" aria-hidden="true">
    <span class="gg-mesh__blob gg-mesh__blob--1"></span>
    <span class="gg-mesh__blob gg-mesh__blob--3"></span>
    <span class="gg-mesh__blob gg-mesh__blob--4"></span>
  </div>
  <div class="gg-container">
    <div class="gg-page-hero__inner">
      <nav class="gg-crumbs" aria-label="Breadcrumb">
        <a href="${url('/')}">Home</a>
        ${icon('chevron-right')}
        <a href="${url('/sectors')}">Our Sectors</a>
        ${icon('chevron-right')}
        ${/* Several divisions share their sector's name (Aviation in Aviation).
              Repeating it would read as a mistake, so the crumb is dropped. */
          division.name === sector.name ? '' : `
        <a href="${url(`/sectors#${sector.id}`)}">${escapeHtml(sector.name)}</a>
        ${icon('chevron-right')}`}
        <span aria-current="page">${escapeHtml(division.name)}</span>
      </nav>

      <span class="gg-div-hero__mark">${icon(sector.icon)}</span>

      <p class="gg-eyebrow">${escapeHtml(sector.name)} · Sector ${escapeHtml(sector.number)}</p>
      <h1 class="gg-h1 gg-page-hero__title">${escapeHtml(division.name)}</h1>
      <p class="gg-lead gg-page-hero__lead">${escapeHtml(detail.tagline)}</p>

      <dl class="gg-div-hero__meta">
        <div>
          <dt>Status</dt>
          <dd>Operational</dd>
        </div>
        <div>
          <dt>Parent sector</dt>
          <dd>${escapeHtml(sector.name)}</dd>
        </div>
        <div>
          <dt>Division contact</dt>
          <dd><a href="mailto:${email}">${email}</a></dd>
        </div>
      </dl>
    </div>
  </div>`;

/**
 * The overview panel.
 *
 * With a photograph it becomes the .gg-visual--photo treatment: the picture
 * fills the 5:4 box, a scrim carries the caption, and the mesh blobs are
 * dropped because they would only sit behind an opaque image and cost a paint.
 * Without one it falls back to the branded gradient panel, so a division added
 * before its photography still renders finished rather than broken.
 *
 * The panel sits ~46vw on desktop and full-bleed on mobile, and it is the
 * largest element above the fold on these pages — so it loads eagerly with a
 * high fetch priority. Everything else on the page stays lazy.
 */
const PANEL_SIZES = '(min-width: 992px) 46vw, 92vw';
const PANEL_WIDTHS = [480, 900, 1400];

const overviewMarkup = (division, sector, detail) => {
  const photo = getDivisionPhoto(division.slug);

  const visual = photo
    ? `
      <div class="gg-visual gg-visual--photo">
        ${picture(photo, {
          sizes: PANEL_SIZES, dir: 'divisions', widths: PANEL_WIDTHS, eager: true
        })}
        <span class="gg-visual__grid" aria-hidden="true"></span>
        <div class="gg-visual__content">
          <img class="gg-visual__mark" src="${url(BRAND.logo.markWhite)}" alt=""
               width="64" height="64" loading="lazy">
          <div>
            <p class="gg-visual__caption">${escapeHtml(photo.caption)}</p>
          </div>
        </div>
      </div>`
    : `
      <div class="gg-visual">
        <div class="gg-mesh gg-visual__mesh" aria-hidden="true">
          <span class="gg-mesh__blob gg-mesh__blob--1"></span>
          <span class="gg-mesh__blob gg-mesh__blob--3"></span>
        </div>
        <span class="gg-visual__grid" aria-hidden="true"></span>
        <div class="gg-visual__content">
          <img class="gg-visual__mark" src="${url(BRAND.logo.markWhite)}" alt=""
               width="64" height="64" loading="lazy">
          <div>
            <p class="gg-visual__caption">${escapeHtml(division.name)}</p>
          </div>
        </div>
      </div>`;

  return `
  <div class="gg-split gg-split--reverse">
    <div class="gg-split__media" data-reveal>${visual}</div>

    <div class="gg-split__body" data-reveal>
      <p class="gg-eyebrow">Overview</p>
      <h2 class="gg-shead__title">What this division does</h2>
      ${detail.overview.map((para, i) =>
        `<p class="${i === 0 ? 'gg-lead' : 'gg-mt-3'}">${escapeHtml(para)}</p>`).join('')}
      <a class="gg-btn gg-btn--secondary gg-mt-4" href="${url(`/sectors#${sector.id}`)}">
        See all of ${escapeHtml(sector.name)}
        ${icon('arrow-right', 'gg-btn__icon')}
      </a>
    </div>
  </div>`;
};

const capabilitiesMarkup = detail => detail.capabilities.map((cap, index) => `
  <article class="gg-cap" data-reveal>
    <span class="gg-cap__num">${String(index + 1).padStart(2, '0')}</span>
    <h3 class="gg-cap__title">${escapeHtml(cap.title)}</h3>
    <p class="gg-cap__text">${escapeHtml(cap.text)}</p>
  </article>`).join('');

const servicesMarkup = detail => detail.services.map(service => `
  <div class="gg-service">
    ${icon('check', 'gg-icon gg-icon--sm')}
    <span>${escapeHtml(service)}</span>
  </div>`).join('');

const whyMarkup = detail => detail.why.map(item => `
  <article class="gg-value" data-reveal>
    <h3 class="gg-value__title">${escapeHtml(item.title)}</h3>
    <p class="gg-value__text">${escapeHtml(item.text)}</p>
  </article>`).join('');

const processMarkup = detail => detail.process.map(step => `
  <article class="gg-step" data-reveal>
    <h3 class="gg-step__title">${escapeHtml(step.title)}</h3>
    <p class="gg-step__text">${escapeHtml(step.text)}</p>
  </article>`).join('');

const contactMarkup = (division, email) => `
  <div class="gg-div-contact" data-reveal>
    <div>
      <h2 class="gg-div-contact__title">Talk to ${escapeHtml(division.name)} directly</h2>
      <p class="gg-div-contact__text">
        This division has its own mailbox. Write to it and the enquiry reaches the team that
        would do the work, without being routed through a general enquiries desk first.
      </p>
    </div>
    <div class="gg-div-contact__actions">
      <a class="gg-div-contact__mail" href="mailto:${email}">
        ${icon('mail')}
        <span>${email}</span>
      </a>
      <a class="gg-btn gg-btn--primary gg-btn--block" href="${url('/contact')}">
        Send a detailed enquiry
        ${icon('arrow-right', 'gg-btn__icon')}
      </a>
    </div>
  </div>`;

/* ==========================================================================
   BOOT
   ========================================================================== */
export const init = () => {
  const root = document.body;
  const slug = root.dataset.division;
  if (!slug) return;

  // division-template.html is a reference copy, not a live page. It keeps the
  // literal placeholder so the generator can find it, so exit quietly rather
  // than warning about data that was never meant to exist.
  if (slug === 'DIVISION_SLUG') return;

  const division = getDivision(slug);
  const detail = getDivisionDetail(slug);

  if (!division || !detail) {
    console.warn(`[Global Growth] no division data for "${slug}"`);
    return;
  }

  const sector = getSector(division.sectorId);
  const email = DIVISION_EMAILS[slug];

  // A division page must never render for a planned entity — a page implies a
  // service to enquire about, which is what the regulatory rule forbids.
  if (division.status === 'planned') {
    console.warn(`[Global Growth] "${slug}" is planned and must not have a page`);
    return;
  }

  root.style.setProperty('--gg-accent', `var(${accentFor(sector.id)})`);

  // Title and description are set here rather than duplicated across twelve
  // near-identical HTML files.
  document.title = `${division.name} — ${sector.name} — Global Growth Industries`;
  qs('meta[name="description"]')?.setAttribute('content', detail.tagline);
  qs('link[rel="canonical"]')?.setAttribute('href', `${BRAND.websiteUrl}${division.page}`);
  qs('meta[property="og:title"]')?.setAttribute('content', `${division.name} — Global Growth Industries`);
  qs('meta[property="og:description"]')?.setAttribute('content', detail.tagline);
  qs('meta[property="og:url"]')?.setAttribute('content', `${BRAND.websiteUrl}${division.page}`);

  const mount = (name, html) => {
    const node = qs(`[data-div="${name}"]`);
    if (node) node.innerHTML = html;
  };

  mount('hero',         heroMarkup(division, sector, detail, email));
  mount('overview',     overviewMarkup(division, sector, detail));
  mount('capabilities', capabilitiesMarkup(detail));
  mount('services',     servicesMarkup(detail));
  mount('why',          whyMarkup(detail));
  mount('process',      processMarkup(detail));
  mount('contact',      contactMarkup(division, email));

  // Related divisions — siblings in the same sector. Planned siblings are
  // included so the reader sees the full sector, but the card template
  // renders them unlinked and badged.
  //
  // Seven of the fifteen sectors hold a single division, so on those pages
  // there are no siblings at all. Rather than leave a heading standing over an
  // empty rail, the section widens to other divisions across the group and
  // says so in the heading — the cards then carry their own sector label,
  // because it is no longer implied by the heading.
  const siblings = getRelatedDivisions(slug);
  const hasSiblings = siblings.length > 0;

  const related = hasSiblings
    ? siblings
    : DIVISION_PAGES.filter(division => division.slug !== slug);

  mount('related', related.slice(0, 8)
    .map(entry => divisionCard(entry, { showSector: !hasSiblings })).join(''));

  const relatedHead = qs('[data-div="related-title"]');
  if (relatedHead) {
    relatedHead.textContent = hasSiblings
      ? `Other divisions in ${sector.name}`
      : 'Other divisions across the group';
  }

  const relatedLead = qs('[data-div="related-lead"]');
  if (relatedLead && !hasSiblings) {
    relatedLead.textContent =
      'This division is the whole of its sector. These are the other divisions with a ' +
      'page of their own — where a requirement crosses more than one, it still runs under ' +
      'a single agreement.';
  }

  qsa('[data-div-name]').forEach(node => { node.textContent = division.name; });
};
