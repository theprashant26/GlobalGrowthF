/**
 * GLOBAL GROWTH — PHOTOGRAPHY
 * ---------------------------------------------------------------------------
 * Fills two things from the client's workspace photographs:
 *
 *   [data-photo="N"]   a .gg-visual panel, replacing the placeholder graphic
 *   [data-gallery]     the workspace gallery on /about
 *
 * Pages stay declarative — they say which frame they want, not where it lives
 * or how it is encoded. Sizes and formats are decided in one place so adding a
 * width later does not mean editing every page.
 */

import { qs, qsa, picture, escapeHtml } from './utils.js';
import { OFFICES } from '../data/site.js';

/** Panels sit in a half-width column on desktop, full width on mobile. */
const PANEL_SIZES = '(min-width: 992px) 46vw, 92vw';
const GALLERY_SIZES = '(min-width: 1100px) 25vw, (min-width: 700px) 46vw, 92vw';

export const init = () => {
  // --- Visual panels -------------------------------------------------------
  qsa('[data-photo]').forEach(panel => {
    const index = Number(panel.dataset.photo);
    const image = OFFICES[index];
    if (!image) return;

    panel.classList.add('gg-visual--photo');
    // The mesh and grid placeholders are no longer wanted behind a photograph.
    qs('.gg-visual__mesh', panel)?.remove();
    qs('.gg-visual__note', panel)?.remove();
    panel.insertAdjacentHTML('afterbegin', picture(image, { sizes: PANEL_SIZES }));
  });

  // --- Gallery -------------------------------------------------------------
  const gallery = qs('[data-gallery]');
  if (!gallery) return;

  gallery.innerHTML = OFFICES.map(image => `
    <figure class="gg-shot">
      ${picture(image, { sizes: GALLERY_SIZES })}
      <figcaption class="gg-shot__caption">${escapeHtml(image.caption)}</figcaption>
    </figure>`).join('');
};
