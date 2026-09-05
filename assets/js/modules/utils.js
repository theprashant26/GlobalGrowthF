/**
 * GLOBAL GROWTH — UTILITIES
 * ---------------------------------------------------------------------------
 * Small, dependency-free helpers shared by every module.
 */

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
 * A responsive <picture> for one of the site's photographs.
 * WebP first with a JPEG fallback, two widths, explicit dimensions so the
 * layout never shifts as the image lands.
 *
 * @param {{file:string,width:number,height:number,alt:string}} image
 * @param {{sizes?:string, className?:string, eager?:boolean}} options
 */
export const picture = (image, { sizes = '100vw', className = '', eager = false } = {}) => {
  const base = `/assets/images/offices/${image.file}`;
  return `
  <picture>
    <source type="image/webp" sizes="${sizes}"
            srcset="${base}-480.webp 480w, ${base}-800.webp 800w">
    <source type="image/jpeg" sizes="${sizes}"
            srcset="${base}-480.jpg 480w, ${base}-800.jpg 800w">
    <img class="${className}" src="${base}-800.jpg"
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
