/**
 * GLOBAL GROWTH — NAVBAR
 * ---------------------------------------------------------------------------
 * Renders and wires the site header:
 *   - sticky bar, transparent over a dark hero, solid past 80px
 *   - desktop mega-menu for Our Sectors (all 15) and Divisions (all 12)
 *   - full-screen mobile drawer with a staggered link reveal and focus trap
 *
 * Markup is rendered from nav.js and sectors.js rather than authored in each
 * page, so twenty pages can never drift out of step with the group structure.
 * The canonical markup this produces is mirrored in partials/header.html.
 *
 * Mount point:  <header class="gg-nav" data-navbar></header>
 */

import { qs, qsa, el, icon, escapeHtml, rafThrottle, prefersReducedMotion } from './utils.js';
import { PRIMARY_NAV, NAV_CTA } from '../data/nav.js';
import { SECTORS, DIVISION_PAGES, COUNTS } from '../data/sectors.js';
import { BRAND, REGULATORY } from '../data/site.js';

const SOLID_AT = 80;

/* ==========================================================================
   MARKUP
   ========================================================================== */

/** Normalises "/about", "/about/", "/about.html" to one comparable form. */
const normalisePath = path =>
  path.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/+$/, '') || '/';

const isCurrent = href => normalisePath(href) === normalisePath(window.location.pathname);

const sectorsPanel = () => `
  <div class="gg-mega" role="group" aria-label="Our sectors">
    <div class="gg-mega__head">
      <h3>Our Sectors</h3>
      <p>${COUNTS.sectors} sectors · ${COUNTS.divisions} divisions</p>
    </div>
    <div class="gg-mega__grid">
      ${SECTORS.map(sector => `
        <a class="gg-mega__link${sector.status === 'planned' ? ' is-planned' : ''}"
           href="/sectors#${sector.id}">
          <span class="gg-mega__icon">${icon(sector.icon)}</span>
          <span class="gg-mega__text">
            <span class="gg-mega__name">${escapeHtml(sector.name)}</span>
            <span class="gg-mega__meta">${
              sector.status === 'planned'
                ? escapeHtml(REGULATORY.short) + ' · regulatory approval required'
                : sector.divisions.length + ' divisions'
            }</span>
          </span>
        </a>`).join('')}
    </div>
    <div class="gg-mega__foot">
      <p class="gg-mega__note">${escapeHtml(REGULATORY.footnote)}</p>
      <a class="gg-btn gg-btn--primary gg-btn--sm" href="/sectors">
        View all sectors ${icon('arrow-right', 'gg-btn__icon')}
      </a>
    </div>
  </div>`;

const divisionsPanel = () => `
  <div class="gg-mega" role="group" aria-label="Our divisions">
    <div class="gg-mega__head">
      <h3>Divisions</h3>
      <p>${DIVISION_PAGES.length} divisions with dedicated pages</p>
    </div>
    <div class="gg-mega__grid">
      ${DIVISION_PAGES.map(division => `
        <a class="gg-mega__link" href="${division.page}">
          <span class="gg-mega__icon">${icon('arrow-up-right')}</span>
          <span class="gg-mega__text">
            <span class="gg-mega__name">${escapeHtml(division.name)}</span>
            <span class="gg-mega__meta">${escapeHtml(division.sectorName)}</span>
          </span>
        </a>`).join('')}
    </div>
    <div class="gg-mega__foot">
      <p class="gg-mega__note">
        Every division operates to one group standard for governance, compliance and delivery.
      </p>
      <a class="gg-btn gg-btn--primary gg-btn--sm" href="/sectors">
        Explore the group ${icon('arrow-right', 'gg-btn__icon')}
      </a>
    </div>
  </div>`;

const megaPanel = kind => (kind === 'sectors' ? sectorsPanel() : divisionsPanel());

const navMarkup = () => `
  <div class="gg-nav__inner">
    <!-- The supplied artwork is a square stacked lockup. At navbar height its
         wordmark is illegible, so the header pairs the mark with the name set
         in the brand face — the standard responsive-logo treatment. The full
         lockup is used in the footer and drawer where there is vertical room. -->
    <a class="gg-nav__brand" href="/" aria-label="${escapeHtml(BRAND.legalName)} — home">
      <img src="${BRAND.logo.markWhite}" alt="" width="160" height="160">
      <span class="gg-nav__wordmark" aria-hidden="true">
        <span class="gg-nav__wordmark-name">Global<em>Growth</em></span>
        <span class="gg-nav__wordmark-sub">Industries Pvt. Ltd.</span>
      </span>
    </a>

    <ul class="gg-nav__links">
      ${PRIMARY_NAV.map(item => `
        <li class="gg-nav__item"${item.mega ? ' data-mega' : ''}>
          <a class="gg-nav__link" href="${item.href}"${isCurrent(item.href) ? ' aria-current="page"' : ''}${
            item.mega ? ' aria-expanded="false" aria-haspopup="true"' : ''
          }>
            ${escapeHtml(item.label)}${item.mega ? icon('chevron-down') : ''}
          </a>
          ${item.mega ? megaPanel(item.mega) : ''}
        </li>`).join('')}
    </ul>

    <div class="gg-nav__actions">
      <a class="gg-btn gg-btn--primary gg-btn--sm" href="${NAV_CTA.href}">
        ${escapeHtml(NAV_CTA.label)} ${icon('arrow-right', 'gg-btn__icon')}
      </a>
    </div>

    <button class="gg-nav__toggle" type="button"
            aria-label="Open navigation menu" aria-expanded="false" aria-controls="gg-drawer">
      ${icon('menu')}
    </button>
  </div>`;

const drawerMarkup = () => {
  let index = 0;
  const link = (label, href, current) => {
    const html = `
      <a class="gg-drawer__link" href="${href}" style="--i:${index}"${current ? ' aria-current="page"' : ''}>
        ${escapeHtml(label)} ${icon('arrow-up-right')}
      </a>`;
    index += 1;
    return html;
  };

  const sectorsGroup = `
    <div style="--i:${index++}">
      <button class="gg-drawer__link" type="button" aria-expanded="false" aria-controls="gg-drawer-sectors">
        Our Sectors ${icon('chevron-down')}
      </button>
      <div class="gg-drawer__sub" id="gg-drawer-sectors" hidden>
        ${SECTORS.map(sector => `
          <a class="gg-drawer__sublink${sector.status === 'planned' ? ' is-planned' : ''}"
             href="/sectors#${sector.id}">
            ${icon('chevron-right', 'gg-icon gg-icon--sm')} ${escapeHtml(sector.name)}
          </a>`).join('')}
      </div>
    </div>`;

  const divisionsGroup = `
    <div style="--i:${index++}">
      <button class="gg-drawer__link" type="button" aria-expanded="false" aria-controls="gg-drawer-divisions">
        Divisions ${icon('chevron-down')}
      </button>
      <div class="gg-drawer__sub" id="gg-drawer-divisions" hidden>
        ${DIVISION_PAGES.map(division => `
          <a class="gg-drawer__sublink" href="${division.page}">
            ${icon('chevron-right', 'gg-icon gg-icon--sm')} ${escapeHtml(division.name)}
          </a>`).join('')}
      </div>
    </div>`;

  const simple = PRIMARY_NAV.filter(item => !item.mega);
  const before = simple.slice(0, 2);   // Home, About
  const after  = simple.slice(2);      // Roadmap, CSR, Careers

  return `
    <div class="gg-drawer__head">
      <a class="gg-nav__brand" href="/" aria-label="${escapeHtml(BRAND.legalName)} — home">
        <img src="${BRAND.logo.markWhite}" alt="" width="160" height="160">
        <span class="gg-nav__wordmark" aria-hidden="true">
          <span class="gg-nav__wordmark-name">Global<em>Growth</em></span>
          <span class="gg-nav__wordmark-sub">Industries Pvt. Ltd.</span>
        </span>
      </a>
      <button class="gg-nav__toggle" type="button" data-drawer-close aria-label="Close navigation menu">
        ${icon('close')}
      </button>
    </div>
    <div class="gg-drawer__body">
      ${before.map(item => link(item.label, item.href, isCurrent(item.href))).join('')}
      ${sectorsGroup}
      ${divisionsGroup}
      ${after.map(item => link(item.label, item.href, isCurrent(item.href))).join('')}
      <div class="gg-drawer__foot" style="--i:${index}">
        <a class="gg-btn gg-btn--primary gg-btn--lg gg-btn--block" href="${NAV_CTA.href}">
          ${escapeHtml(NAV_CTA.label)} ${icon('arrow-right', 'gg-btn__icon')}
        </a>
        <a class="gg-btn gg-btn--secondary gg-btn--block" href="mailto:${BRAND.primaryEmail}">
          ${icon('mail')} ${BRAND.primaryEmail}
        </a>
      </div>
    </div>`;
};

/* ==========================================================================
   BEHAVIOUR
   ========================================================================== */

/** Sticky state. Solidifies past 80px unless the page opted into always-solid. */
const wireScrollState = nav => {
  if (nav.classList.contains('gg-nav--solid')) return;
  const update = () => nav.classList.toggle('is-solid', window.scrollY > SOLID_AT);
  update();
  window.addEventListener('scroll', rafThrottle(update), { passive: true });
};

/**
 * Mega menus. Pointer opens on hover with a small close delay so the diagonal
 * travel to the panel does not dismiss it; click and keyboard both toggle, so
 * the menu is reachable without a pointer.
 */
const wireMegaMenus = nav => {
  const items = qsa('[data-mega]', nav);
  let closeTimer = null;

  const close = item => {
    item.classList.remove('is-open');
    qs('.gg-nav__link', item)?.setAttribute('aria-expanded', 'false');
  };
  const closeAll = () => items.forEach(close);

  const open = item => {
    clearTimeout(closeTimer);
    items.forEach(other => { if (other !== item) close(other); });
    item.classList.add('is-open');
    qs('.gg-nav__link', item)?.setAttribute('aria-expanded', 'true');
  };

  items.forEach(item => {
    const trigger = qs('.gg-nav__link', item);

    item.addEventListener('pointerenter', () => {
      if (window.matchMedia('(pointer: fine)').matches) open(item);
    });
    item.addEventListener('pointerleave', () => {
      if (!window.matchMedia('(pointer: fine)').matches) return;
      closeTimer = setTimeout(() => close(item), 160);
    });

    trigger.addEventListener('click', event => {
      // The trigger is still a real link to the section page. Intercept only
      // where the panel is the more useful response — a fine pointer already
      // opened it on hover, so this is the touch and keyboard path.
      if (window.matchMedia('(pointer: fine)').matches) return;
      event.preventDefault();
      item.classList.contains('is-open') ? close(item) : open(item);
    });

    // Closing when focus leaves the item keeps keyboard traversal sane.
    item.addEventListener('focusout', event => {
      if (!item.contains(event.relatedTarget)) close(item);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openItem = items.find(item => item.classList.contains('is-open'));
    if (!openItem) return;
    close(openItem);
    qs('.gg-nav__link', openItem)?.focus();
  });

  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) closeAll();
  });
};

/** Mobile drawer with a focus trap and a staggered reveal. */
const wireDrawer = (nav, drawer) => {
  const toggle = qs('.gg-nav__toggle', nav);
  const closeBtn = qs('[data-drawer-close]', drawer);
  let lastFocused = null;

  const focusables = () =>
    qsa('a[href], button:not([disabled])', drawer)
      .filter(node => node.offsetParent !== null);

  const open = () => {
    lastFocused = document.activeElement;
    drawer.classList.add('is-open');
    document.body.classList.add('is-drawer-open');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.removeAttribute('aria-hidden');
    // Focus the close control, not the first link — the first thing a user
    // needs from an opened menu is a way out of it.
    (closeBtn || focusables()[0])?.focus();
  };

  const close = () => {
    drawer.classList.remove('is-open');
    document.body.classList.remove('is-drawer-open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    lastFocused?.focus();
  };

  toggle.addEventListener('click', () =>
    drawer.classList.contains('is-open') ? close() : open());
  closeBtn?.addEventListener('click', close);

  // Any navigation closes the drawer, including same-page hash links.
  drawer.addEventListener('click', event => {
    if (event.target.closest('a[href]')) close();
  });

  // Collapsible sector / division groups
  qsa('button[aria-controls^="gg-drawer-"]', drawer).forEach(button => {
    const panel = qs(`#${button.getAttribute('aria-controls')}`, drawer);
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });

  document.addEventListener('keydown', event => {
    if (!drawer.classList.contains('is-open')) return;

    if (event.key === 'Escape') { close(); return; }
    if (event.key !== 'Tab') return;

    const nodes = focusables();
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // Leaving the mobile breakpoint with the drawer open would strand the
  // scroll lock, so close it on the breakpoint change.
  window.matchMedia('(min-width: 1100px)').addEventListener('change', event => {
    if (event.matches && drawer.classList.contains('is-open')) close();
  });
};

/* ==========================================================================
   BOOT
   ========================================================================== */
export const init = () => {
  const nav = qs('[data-navbar]');
  if (!nav) return;

  nav.innerHTML = navMarkup();

  const drawer = el('div', {
    class: 'gg-drawer',
    id: 'gg-drawer',
    'aria-hidden': 'true',
    'aria-label': 'Site navigation'
  });
  drawer.innerHTML = drawerMarkup();
  nav.after(drawer);

  if (prefersReducedMotion()) drawer.classList.add('is-static');

  wireScrollState(nav);
  wireMegaMenus(nav);
  wireDrawer(nav, drawer);
};
