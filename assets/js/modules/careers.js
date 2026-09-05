/**
 * GLOBAL GROWTH — CAREERS PAGE
 * ---------------------------------------------------------------------------
 * Renders the benefits grid, the hiring process, and the filterable list of
 * openings from jobs.js. Also populates the role dropdown on the application
 * form so a candidate cannot apply for a job that is not open.
 *
 * Filtering hides cards with the `hidden` attribute rather than a class, so a
 * filtered-out role leaves the tab order and the accessibility tree.
 */

import { qs, qsa, icon, escapeHtml } from './utils.js';
import { JOBS, DEPARTMENTS, LOCATIONS, JOB_TYPES, BENEFITS, HIRING_PROCESS } from '../data/jobs.js';
import { jobCard } from './cards.js';

/* ==========================================================================
   MARKUP
   ========================================================================== */
const benefitMarkup = benefit => `
  <article class="gg-value" data-reveal>
    <span class="gg-value__icon">${icon(benefit.icon)}</span>
    <h3 class="gg-value__title">${escapeHtml(benefit.title)}</h3>
    <p class="gg-value__text">${escapeHtml(benefit.text)}</p>
  </article>`;

const stepMarkup = step => `
  <article class="gg-step" data-reveal>
    <h3 class="gg-step__title">${escapeHtml(step.title)}</h3>
    <p class="gg-step__text">${escapeHtml(step.text)}</p>
  </article>`;

/** A full role, expandable in place — no second page for eight openings. */
const roleMarkup = job => `
  <article class="gg-job-card" id="${job.id}" data-job="${job.id}"
           data-department="${escapeHtml(job.department)}"
           data-location="${escapeHtml(job.location)}"
           data-type="${escapeHtml(job.type)}">
    <div class="gg-job-card__head">
      <h3 class="gg-job-card__title">${escapeHtml(job.title)}</h3>
      <span class="gg-job-card__dept">${escapeHtml(job.department)}</span>
    </div>
    <p class="gg-job-card__summary">${escapeHtml(job.summary)}</p>
    <div class="gg-job-card__foot">
      <div class="gg-job-card__meta">
        <span class="gg-badge gg-badge--meta">${icon('map-pin', 'gg-icon gg-icon--sm')}${escapeHtml(job.location)}</span>
        <span class="gg-badge gg-badge--meta">${icon('clock', 'gg-icon gg-icon--sm')}${escapeHtml(job.type)}</span>
        <span class="gg-badge gg-badge--meta">${escapeHtml(job.experience)}</span>
        ${job.divisionSlug
          ? `<a class="gg-badge gg-badge--active" href="/${job.divisionSlug}/">${escapeHtml(job.division)} division</a>`
          : `<span class="gg-badge gg-badge--meta">${escapeHtml(job.division)}</span>`}
      </div>
    </div>

    <details class="gg-job-details">
      <summary class="gg-job-details__toggle">
        <span>Full role description</span>
        ${icon('chevron-down', 'gg-icon gg-icon--sm')}
      </summary>
      <div class="gg-job-details__body">
        <h4 class="gg-h4">What you would own</h4>
        <ul class="gg-bullets">
          ${job.responsibilities.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
        <h4 class="gg-h4 gg-mt-3">What we are looking for</h4>
        <ul class="gg-bullets">
          ${job.requirements.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
        <a class="gg-btn gg-btn--primary gg-btn--sm gg-mt-3" href="#apply" data-apply-for="${escapeHtml(job.title)}">
          Apply for this role ${icon('arrow-right', 'gg-btn__icon')}
        </a>
      </div>
    </details>
  </article>`;

const selectMarkup = (id, label, options) => `
  <label class="gg-label gg-xs" for="${id}">${escapeHtml(label)}</label>
  <select class="gg-select" id="${id}" data-job-filter="${id.replace('filter-', '')}">
    <option value="all">All</option>
    ${options.map(option =>
      `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join('')}
  </select>`;

/* ==========================================================================
   BOOT
   ========================================================================== */
export const init = () => {
  const benefits = qs('[data-careers="benefits"]');
  if (benefits) benefits.innerHTML = BENEFITS.map(benefitMarkup).join('');

  const process = qs('[data-careers="process"]');
  if (process) process.innerHTML = HIRING_PROCESS.map(stepMarkup).join('');

  const list = qs('[data-careers="jobs"]');
  const filters = qs('[data-careers="filters"]');
  const roleSelect = qs('[data-role-select]');

  // The application form can only offer roles that are actually open.
  if (roleSelect) {
    roleSelect.innerHTML =
      '<option value="">Select a role…</option>' +
      JOBS.map(job => `<option value="${escapeHtml(job.title)}">${escapeHtml(job.title)}</option>`).join('') +
      '<option value="Speculative application">Speculative — none of the above</option>';
  }

  if (!list) return;
  list.innerHTML = JOBS.map(roleMarkup).join('');

  const count = qs('[data-careers="count"]');
  const empty = qs('[data-careers="empty"]');

  if (filters) {
    filters.innerHTML = `
      <div>${selectMarkup('filter-department', 'Department', DEPARTMENTS)}</div>
      <div>${selectMarkup('filter-location', 'Location', LOCATIONS)}</div>
      <div>${selectMarkup('filter-type', 'Type', JOB_TYPES)}</div>`;
  }

  const apply = () => {
    const chosen = {};
    qsa('[data-job-filter]', filters || document).forEach(select => {
      chosen[select.dataset.jobFilter] = select.value;
    });

    let shown = 0;
    qsa('.gg-job-card', list).forEach(card => {
      const visible =
        (chosen.department === 'all' || !chosen.department || card.dataset.department === chosen.department) &&
        (chosen.location === 'all'   || !chosen.location   || card.dataset.location === chosen.location) &&
        (chosen.type === 'all'       || !chosen.type       || card.dataset.type === chosen.type);
      card.hidden = !visible;
      if (visible) shown += 1;
    });

    if (count) {
      count.textContent = shown === JOBS.length
        ? `${JOBS.length} open roles`
        : `${shown} of ${JOBS.length} roles`;
    }
    if (empty) empty.hidden = shown > 0;
  };

  filters?.addEventListener('change', apply);
  apply();

  // "Apply for this role" pre-fills the form's role field and moves focus
  // there, so the candidate does not have to find it again in the dropdown.
  list.addEventListener('click', event => {
    const trigger = event.target.closest('[data-apply-for]');
    if (!trigger || !roleSelect) return;
    roleSelect.value = trigger.dataset.applyFor;
    // Let the hash navigation land first, then take focus.
    setTimeout(() => roleSelect.focus(), 300);
  });
};
