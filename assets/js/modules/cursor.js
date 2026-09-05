/**
 * GLOBAL GROWTH — CUSTOM CURSOR
 * ---------------------------------------------------------------------------
 * A small dot that tracks the pointer exactly, and a ring that lags behind it.
 * The ring scales up over interactive elements and switches to the light green
 * over dark sections so it stays visible against navy.
 *
 * Gated to devices with a fine pointer and no reduced-motion preference. On a
 * touch device this module never creates any DOM at all — it does not merely
 * hide itself.
 *
 * Mount point:  <div data-cursor></div>  (or any element carrying the flag)
 */

import { qs, hasFinePointer, onMotionPreferenceChange } from './utils.js';

/** How much of the remaining distance the ring closes each frame. */
const RING_LERP = 0.16;

/** Elements the ring should react to. */
const INTERACTIVE = 'a, button, input, textarea, select, summary, [role="button"], [data-cursor-hover]';

export const init = () => {
  if (!hasFinePointer()) return;

  const dot = document.createElement('div');
  dot.className = 'gg-cursor';
  const ring = document.createElement('div');
  ring.className = 'gg-cursor__ring';
  dot.setAttribute('aria-hidden', 'true');
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(dot, ring);

  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let ringX = pointerX;
  let ringY = pointerY;
  let visible = false;
  let frame = null;

  const render = () => {
    ringX += (pointerX - ringX) * RING_LERP;
    ringY += (pointerY - ringY) * RING_LERP;
    dot.style.transform  = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    frame = requestAnimationFrame(render);
  };

  const onMove = event => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!visible) {
      visible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  };

  // The ring takes the light ramp over dark sections so it never disappears
  // into the navy. Read from the element under the pointer, not from scroll
  // position, so it works for any layout.
  const onOver = event => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    ring.classList.toggle('is-active', Boolean(target.closest(INTERACTIVE)));
    ring.classList.toggle('is-on-dark', Boolean(target.closest('.gg-dark, .gg-nav.is-solid, .gg-footer')));
  };

  const hide = () => {
    visible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  };

  const teardown = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerover', onOver);
    document.removeEventListener('pointerleave', hide);
    window.removeEventListener('blur', hide);
    dot.remove();
    ring.remove();
  };

  dot.style.opacity = '0';
  ring.style.opacity = '0';

  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerover', onOver, { passive: true });
  document.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
  frame = requestAnimationFrame(render);

  // If the visitor turns on reduced motion mid-session, remove the cursor
  // rather than leaving a decorative element they asked not to see.
  onMotionPreferenceChange(reduced => { if (reduced) teardown(); });
};
