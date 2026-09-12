/**
 * GLOBAL GROWTH — APPLICATION ENTRY POINT
 * ---------------------------------------------------------------------------
 * The only script tag on any page. Everything else is imported from here.
 *
 *   <script type="module" src="/assets/js/main.js"></script>
 *
 * Modules load lazily and only when the page contains the markup they drive,
 * so a light page never pays for the homepage's code. Each boot is guarded —
 * one failing module must not take the rest of the page down with it.
 *
 * BOOT ORDER MATTERS, in three stages:
 *   1. Preloader   — an overlay that must lift as early as possible.
 *   2. Renderers   — navbar, footer, page controllers, sector grid. These
 *                    create markup out of data.
 *   3. Scanners    — counters, marquee, forms, animations, cursor. These read
 *                    the DOM, so they must not run until stage 2 has written
 *                    it. Their guards are evaluated after the await for the
 *                    same reason.
 */

import { onReady, prefersReducedMotion, injectSprite, qs } from './modules/utils.js';

/** The application-fee flow, which shares one module. See modules/payment.js. */
const PAYMENT_PAGES = new Set([
  'payment', 'payment-status', 'pricing', 'service-delivery'
]);

/** The compliance notices, which share one module. See modules/legal.js. */
const LEGAL_PAGES = new Set([
  'legal', 'privacy', 'terms', 'refund', 'grievance', 'disclaimer',
  'corporate', 'certificates'
]);

/** Marks the document as JS-capable. Reveal styles key off this class, so
 *  setting it early (not on DOMContentLoaded) avoids a flash of visible
 *  content before the reveal animations take over. */
const markReady = () => {
  const root = document.documentElement;
  root.classList.add('js-ready');
  root.classList.toggle('reduced-motion', prefersReducedMotion());
};

/**
 * Load a module and run its boot function, swallowing failures.
 * @param {string} name label used in the console warning
 * @param {() => Promise<any>} loader dynamic import
 * @param {boolean} when skip entirely when false
 * @returns {Promise<void>} resolves once init has completed
 */
const boot = async (name, loader, when = true) => {
  if (!when) return;
  try {
    const module = await loader();
    if (typeof module.init === 'function') await module.init();
  } catch (error) {
    // error, not warn: the default console filter hides warnings, and a module
    // that did not start leaves a visibly incomplete page. The most common
    // cause by far is a browser holding a cached copy of a module whose
    // exports have since changed — a hard reload clears it.
    console.error(`[Global Growth] "${name}" did not start. ` +
      'If this followed a code change, hard-reload to clear the module cache.', error);
  }
};

markReady();

onReady(async () => {
  const page = document.body.dataset.page || '';

  // ---- 1. Preloader --------------------------------------------------------
  // Runs before anything else so the overlay is never held up by rendering.
  boot('preloader', () => import('./modules/preloader.js'), Boolean(qs('[data-preloader]')));

  // The icon sprite is inlined before anything renders, so no module has to
  // draw an icon that would resolve to nothing. Failure here is non-fatal.
  await injectSprite();

  // ---- 2. Renderers --------------------------------------------------------
  await Promise.all([
    boot('navbar',       () => import('./modules/navbar.js'),       Boolean(qs('[data-navbar]'))),
    boot('footer',       () => import('./modules/footer.js'),       Boolean(qs('[data-footer]'))),
    boot('home',         () => import('./modules/home.js'),         page === 'home'),
    boot('about',        () => import('./modules/about.js'),        page === 'about'),
    boot('sectorsPage',  () => import('./modules/sectorsPage.js'),  page === 'sectors'),
    boot('roadmap',      () => import('./modules/roadmap.js'),      page === 'roadmap'),
    boot('careers',      () => import('./modules/careers.js'),      page === 'careers'),
    boot('contact',      () => import('./modules/contact.js'),      page === 'contact'),
    boot('csr',          () => import('./modules/csr.js'),          page === 'csr'),
    boot('styleguide',   () => import('./modules/styleguide.js'),   page === 'styleguide'),
    boot('approvals',    () => import('./modules/approvals.js'),    page === 'approvals'),
    boot('legal',        () => import('./modules/legal.js'),        LEGAL_PAGES.has(page)),
    boot('payment',      () => import('./modules/payment.js'),      PAYMENT_PAGES.has(page)),
    boot('photos',       () => import('./modules/photos.js'),       Boolean(qs('[data-photo], [data-gallery]'))),
    boot('sectorGrid',   () => import('./modules/sectorGrid.js'),   Boolean(qs('[data-sector-grid]'))),
    boot('divisionPage', () => import('./modules/divisionPage.js'), Boolean(qs('[data-division]')))
  ]);

  // ---- 3. Scanners ---------------------------------------------------------
  // Guards below are evaluated now, after stage 2 has written the DOM.
  boot('cursor',   () => import('./modules/cursor.js'),   Boolean(qs('[data-cursor]')));
  boot('counters', () => import('./modules/counters.js'), Boolean(qs('[data-counter]')));
  boot('marquee',  () => import('./modules/marquee.js'),  Boolean(qs('[data-marquee]')));
  boot('forms',    () => import('./modules/forms.js'),    Boolean(qs('[data-form]')));

  // Animations last: they act on markup every other module has produced.
  boot('animations', () => import('./modules/animations.js'),
    Boolean(qs('[data-reveal], [data-parallax], [data-progress-bar], [data-to-top], [data-roadmap]')));
});
