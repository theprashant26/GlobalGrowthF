/**
 * GLOBAL GROWTH — UTILITIES
 * ---------------------------------------------------------------------------
 * Small, dependency-free helpers shared by every module.
 */

/* --------------------------------------------------------------------------
   SITE BASE PATH
   The site must work from a domain root (www.globalgrowthindustries.com/) AND
   from a subdirectory (a GitHub Pages project site at /GlobalGrowthF/). A
   root-relative "/assets/..." breaks in the second case, so every path in the
   data files is written root-relative and passed through url() here.

   BASE is derived from where this module was actually loaded from, so it is
   correct wherever the site is deployed and needs no configuration.
   utils.js lives at <base>assets/js/modules/utils.js — three levels down.
   -------------------------------------------------------------------------- */
export const BASE = new URL('../../../', import.meta.url).pathname;

/**
 * Set to true only when the host serves /about from about.html (nginx
 * try_files, Netlify, Cloudflare Pages). Static hosts that do not — GitHub
 * Pages project sites among them — need the extension, which is the default.
 */
const CLEAN_URLS = false;

/**
 * Pages that exist as <name>.html at the site root.
 *
 * A page missing from this set keeps its extensionless href and 404s on a host
 * that does not rewrite — which is every host this site is deployed to. Add a
 * page here when you add it to the root, or its footer link is dead.
 */
const ROOT_PAGES = new Set(['about', 'sectors', 'roadmap', 'careers', 'contact',
                            'csr', 'legal', 'styleguide', '404',
                            // the compliance notices, one page each
                            'privacy', 'terms', 'refund', 'grievance',
                            'disclaimer', 'corporate', 'certificates']);

/**
 * Resolve a site-absolute path ("/about", "/assets/x.css", "/aviation/") to
 * one that works from wherever the page currently is.
 * Anything already absolute, or a mailto/tel/hash, is returned untouched.
 */
export const url = path => {
  if (!path) return path;
  if (/^([a-z]+:|\/\/|#)/i.test(path)) return path;   // absolute, protocol, or hash
  if (!path.startsWith('/')) return path;               // already relative

  let rest = path.slice(1);
  if (rest === '') return BASE;

  // Split any #hash or ?query off before deciding about the extension.
  const marker = rest.search(/[#?]/);
  const tail = marker === -1 ? '' : rest.slice(marker);
  let name = marker === -1 ? rest : rest.slice(0, marker);

  if (!CLEAN_URLS && ROOT_PAGES.has(name)) name += '.html';

  return BASE + name + tail;
};

/* --------------------------------------------------------------------------
   DOM
   -------------------------------------------------------------------------- */
export const qs  = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export const onReady = fn => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
};

/** Build an element in one call. Children may be nodes or strings. */
export const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'class')   { node.className = value; continue; }
    if (key === 'text')    { node.textContent = value; continue; }
    if (key === 'html')    { node.innerHTML = value; continue; }
    if (key === 'dataset') { Object.assign(node.dataset, value); continue; }
    if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
      continue;
    }
    node.setAttribute(key, value === true ? '' : value);
  }
  for (const child of [].concat(children)) {
    if (child === null || child === undefined) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
};

/**
 * Markup for one sprite icon.
 * The sprite is injected inline by injectSprite() below, so the reference is
 * a bare fragment — never a path to the .svg file, which Safari would ignore.
 * @param {string} name  symbol name without the "i-" prefix
 */
export const icon = (name, className = 'gg-icon') =>
  `<svg class="${className}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;

/**
 * Fetch the icon sprite once and inline it at the top of <body>.
 * Safari will not resolve an external file reference from <use>, so linking
 * directly to sprite.svg#id silently renders nothing in that browser.
 * Resolves even on failure — icons are decorative and must never block boot.
 */
let spritePromise = null;
export const injectSprite = (src = '/assets/icons/sprite.svg') => {
  if (spritePromise) return spritePromise;
  src = url(src);
  spritePromise = fetch(src)
    .then(response => (response.ok ? response.text() : Promise.reject(response.status)))
    .then(markup => {
      const holder = document.createElement('div');
      holder.style.display = 'none';
      holder.setAttribute('aria-hidden', 'true');
      holder.innerHTML = markup;
      document.body.prepend(holder);
    })
    .catch(error => console.warn('[Global Growth] icon sprite did not load:', error));
  return spritePromise;
};

/**
 * Load a classic (non-module) script once and resolve when it has run.
 *
 * GSAP and Lenis ship as UMD bundles that publish globals rather than ES
 * exports, so they cannot simply be imported. Injecting them here keeps the
 * "exactly one script tag per page" rule intact — the page still loads only
 * main.js, and anything else arrives on demand.
 *
 * Rejects rather than hanging if the file is missing, so callers can fall
 * back rather than wait forever.
 */
const scriptPromises = new Map();
export const loadScript = src => {
  if (scriptPromises.has(src)) return scriptPromises.get(src);

  const promise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) { resolve(); return; }

    const script = document.createElement('script');
    script.src = src;
    script.async = false; // preserve execution order between dependent files
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error(`failed to load ${src}`)), { once: true });
    document.head.append(script);
  });

  scriptPromises.set(src, promise);
  return promise;
};

/**
 * A responsive <picture> for one of the site's photograph sets.
 *
 * Every set is built by the image script into the same shape —
 *   <dir>/<file>-<width>.webp  and  <file>-<width>.jpg
 * — so this helper only needs to know the folder and which widths exist. That
 * keeps the widths a property of the image set rather than of every call site:
 * adding a width later is one edit here plus a rebuild, not a hunt through
 * the modules.
 *
 * `width`/`height` are always emitted so the browser reserves the right box
 * before the file arrives. Without them every photograph on the page causes a
 * layout shift, which is the single easiest way to lose a Lighthouse CLS score.
 */
export const picture = (image, {
  sizes = '100vw',
  className = '',
  eager = false,
  dir = 'offices',
  widths = [480, 800]
} = {}) => {
  const base = url(`/assets/images/${dir}/${image.file}`);
  const srcset = ext => widths.map(w => `${base}-${w}.${ext} ${w}w`).join(', ');
  const fallback = `${base}-${widths[widths.length - 1]}.jpg`;

  return `
  <picture>
    <source type="image/webp" sizes="${sizes}" srcset="${srcset('webp')}">
    <source type="image/jpeg" sizes="${sizes}" srcset="${srcset('jpg')}">
    <img class="${className}" src="${fallback}"
         alt="${escapeHtml(image.alt)}"
         width="${image.width}" height="${image.height}"
         loading="${eager ? 'eager' : 'lazy'}"
         decoding="async"${eager ? ' fetchpriority="high"' : ''}>
  </picture>`;
};

/** Escape a string for safe interpolation into an HTML template. */
export const escapeHtml = str => String(str)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

/* --------------------------------------------------------------------------
   PENDING VALUES
   The data files carry {{LABELLED_PLACEHOLDER}} tokens for anything the client
   has not supplied yet. That is deliberate: a labelled gap is honest, and it is
   greppable, so CLIENT_CHECKLIST.md and the QA probe can both find it.

   What is NOT acceptable is printing the token at a visitor. "{{CHAIRMAN_NAME}}"
   on a live page reads as a broken site, not as a pending value.

   So every renderer that touches client data runs it through resolve() and
   decides what the gap should look like in its own context. The token is kept
   on the element in a data-pending attribute — invisible to a reader, still
   there for us.
   -------------------------------------------------------------------------- */

/** True when a value is still an unfilled {{PLACEHOLDER}} token. */
export const isPending = value =>
  typeof value === 'string' && /^\s*\{\{[\s\S]*\}\}\s*$/.test(value);

/**
 * Resolve a possibly-pending value.
 * @returns {{pending: boolean, text: string, attr: string}}
 *   `text` is the value, or the supplied fallback when it is still a token.
 *   `attr` is a ready-to-interpolate data-pending attribute, or ''.
 */
export const resolve = (value, fallback = '') => isPending(value)
  ? { pending: true, text: fallback, attr: ` data-pending="${escapeHtml(value.trim())}"` }
  : { pending: false, text: value ?? '', attr: '' };



/* --------------------------------------------------------------------------
   MOTION PREFERENCES
   The single authority on whether motion is allowed. Every module must ask
   this rather than reading the media query itself, so a future override
   (a user toggle, say) only has to change here.
   -------------------------------------------------------------------------- */
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export const prefersReducedMotion = () => motionQuery.matches;

/** Notify subscribers when the OS-level preference changes mid-session. */
export const onMotionPreferenceChange = handler => {
  const listener = event => handler(event.matches);
  if (motionQuery.addEventListener) motionQuery.addEventListener('change', listener);
  else motionQuery.addListener(listener); // Safari < 14
  return () => {
    if (motionQuery.removeEventListener) motionQuery.removeEventListener('change', listener);
    else motionQuery.removeListener(listener);
  };
};

/** True only on a device with a precise pointer — gates cursor and magnetics. */
export const hasFinePointer = () =>
  window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion();

/* --------------------------------------------------------------------------
   TIMING
   -------------------------------------------------------------------------- */
export const debounce = (fn, wait = 160) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

export const throttle = (fn, limit = 100) => {
  let waiting = false;
  let trailing = null;
  return (...args) => {
    if (waiting) { trailing = args; return; }
    fn(...args);
    waiting = true;
    setTimeout(() => {
      waiting = false;
      if (trailing) { fn(...trailing); trailing = null; }
    }, limit);
  };
};

/** requestAnimationFrame-based rate limiter for scroll and pointer handlers. */
export const rafThrottle = fn => {
  let frame = null;
  return (...args) => {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = null; fn(...args); });
  };
};

/* --------------------------------------------------------------------------
   TEXT SPLITTING
   A local implementation so the build never depends on GSAP's SplitText
   plugin loading. Each line is wrapped in an overflow-hidden mask, which is
   what produces the classic line reveal.
   -------------------------------------------------------------------------- */

/**
 * Split an element's text into per-character spans.
 * Whitespace is preserved and marked so it can be excluded from staggers.
 * @returns {HTMLElement[]} the character spans, in document order.
 */
export const splitTextIntoChars = element => {
  if (!element || element.dataset.split === 'chars') {
    return qsa('.gg-char', element);
  }
  const source = element.textContent;
  element.dataset.splitOriginal = source;
  const fragment = document.createDocumentFragment();
  const chars = [];

  for (const character of source) {
    const isSpace = character.trim() === '';
    const span = el('span', {
      class: isSpace ? 'gg-char gg-char--space' : 'gg-char',
      'aria-hidden': 'true'
    }, isSpace ? ' ' : character);
    span.style.display = 'inline-block';
    if (!isSpace) chars.push(span);
    fragment.append(span);
  }

  // Keep the original text available to assistive technology.
  element.textContent = '';
  element.append(el('span', { class: 'gg-sr-only' }, source), fragment);
  element.dataset.split = 'chars';
  return chars;
};

/**
 * Split an element's text into word-preserving lines, each wrapped in an
 * overflow-hidden mask so it can be revealed from below.
 *
 * Lines are measured from real layout, so this must run after fonts load —
 * call it from the document.fonts.ready handler, and re-run on resize.
 * @returns {HTMLElement[]} the inner line spans (the elements to animate).
 */
export const splitTextIntoLines = element => {
  if (!element) return [];

  // Restore any previous split so this is safe to re-run on resize.
  if (element.dataset.splitOriginal !== undefined) {
    element.textContent = element.dataset.splitOriginal;
  } else {
    element.dataset.splitOriginal = element.textContent;
  }

  const words = element.textContent.trim().split(/\s+/);
  element.textContent = '';

  // Lay every word out individually so we can read its vertical offset.
  const wordSpans = words.map(word => {
    const span = el('span', { class: 'gg-word' }, word);
    span.style.display = 'inline-block';
    element.append(span, document.createTextNode(' '));
    return span;
  });

  // Group words by their offsetTop — words sharing a top are one visual line.
  const lines = [];
  let currentTop = null;
  for (const span of wordSpans) {
    const top = span.offsetTop;
    if (currentTop === null || Math.abs(top - currentTop) > 1) {
      currentTop = top;
      lines.push([]);
    }
    lines[lines.length - 1].push(span.textContent);
  }

  element.textContent = '';
  const inner = lines.map(words => {
    const mask = el('div', { class: 'gg-line-mask' });
    const line = el('span', { class: 'gg-line' }, words.join(' '));
    mask.append(line);
    element.append(mask);
    return line;
  });

  element.dataset.split = 'lines';
  return inner;
};

/** Undo a split, restoring the original text node. */
export const restoreSplit = element => {
  if (!element || element.dataset.splitOriginal === undefined) return;
  element.textContent = element.dataset.splitOriginal;
  delete element.dataset.split;
};

/* --------------------------------------------------------------------------
   MISC
   -------------------------------------------------------------------------- */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const slugify = str => String(str)
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

/** Read a design token off :root — used by the styleguide and by JS-driven colour. */
export const token = name =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** sessionStorage that never throws (private mode, blocked storage). */
export const session = {
  get(key) { try { return window.sessionStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { window.sessionStorage.setItem(key, value); } catch { /* ignore */ } }
};
