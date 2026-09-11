/**
 * GLOBAL GROWTH — APPROVALS PAGE
 * ---------------------------------------------------------------------------
 * Renders /approvals: the refund-policy draft and the outstanding vacancy
 * notices, presented as a document to be signed off rather than as a file.
 *
 * The vacancy tables are derived from DIVISION_ROLES at render time, so the
 * list of outstanding posts cannot drift from the build. A role gains a
 * `vacancies` value and it disappears from this page on the next load — there
 * is nothing to remember to update.
 *
 * Planned divisions are excluded here as everywhere else: they must not carry
 * a vacancy or a fee until the relevant licence is in force.
 */

import { qs, escapeHtml, resolve } from './utils.js';
import { APPROVALS_INTRO, REFUND_POLICY, VACANCY_REQUEST } from '../data/approvals.js';
import { DIVISION_ROLES, VACANCY_TOTALS, isVacancy, rupees } from '../data/jobs.js';

/* ==========================================================================
   SHARED
   ========================================================================== */
const table = (headings, rows) => `
  <div class="gg-table-wrap">
    <table class="gg-table">
      <thead><tr>${headings.map(h => `<th scope="col">${escapeHtml(h)}</th>`).join('')}</tr></thead>
      <tbody>
        ${rows.map(row => `
          <tr>
            <th scope="row">${escapeHtml(row[0])}</th>
            ${row.slice(1).map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}
          </tr>`).join('')}
      </tbody>
    </table>
  </div>`;

const paras = list => list.map(p => `<p>${escapeHtml(p)}</p>`).join('');

/* ==========================================================================
   INTRO
   ========================================================================== */
const introMarkup = () => `
  <div class="gg-approve-items">
    ${APPROVALS_INTRO.items.map(item => `
      <article class="gg-approve-item">
        <span class="gg-approve-item__num">${escapeHtml(item.n)}</span>
        <h3 class="gg-approve-item__label">${escapeHtml(item.label)}</h3>
        <p class="gg-approve-item__who">${escapeHtml(item.who)}</p>
        <span class="gg-badge gg-badge--planned">${escapeHtml(item.status)}</span>
      </article>`).join('')}
  </div>`;

/* ==========================================================================
   01. REFUND POLICY
   ========================================================================== */

/** The draft, set as the document it would become rather than as page copy. */
const draftMarkup = () => {
  const d = REFUND_POLICY.draft;

  const list = (block) => `
    <h4 class="gg-doc__h">${escapeHtml(block.heading)}:</h4>
    <ul class="gg-bullets">${block.items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;

  return `
  <div class="gg-doc">
    <p class="gg-doc__label">Proposed wording</p>
    <h3 class="gg-doc__title">${escapeHtml(d.title)}</h3>
    <p>${escapeHtml(d.opening)}</p>
    ${list(d.notRefundable)}
    ${list(d.refundable)}
    ${d.procedure.map(p => `
      <h4 class="gg-doc__h">${escapeHtml(p.heading)}</h4>
      <p>${markDecisions(p.body)}</p>`).join('')}
  </div>`;
};

/**
 * Highlight the {{DECISION_*}} tokens inside the draft rather than letting
 * resolve() blank them. On this page the unanswered decision IS the content —
 * it is what the reader is being asked to fill in.
 */
const markDecisions = text => escapeHtml(text).replace(
  /\{\{DECISION_([A-Z_]+)\}\}/g,
  (_, name) => `<mark class="gg-decision">${escapeHtml(name.toLowerCase().replace(/_/g, ' '))}</mark>`
);

const refundMarkup = () => `
  <p class="gg-approve-status">${escapeHtml(REFUND_POLICY.status)}</p>

  <div class="gg-split gg-mt-6">
    <div class="gg-split__body">
      <h3 class="gg-h3">${escapeHtml(REFUND_POLICY.why.title)}</h3>
      ${paras(REFUND_POLICY.why.body)}
    </div>
    <div class="gg-split__body">
      ${draftMarkup()}
    </div>
  </div>

  <h3 class="gg-h3 gg-mt-8">Decisions needed</h3>
  <p class="gg-small gg-muted gg-mt-1">
    Six values. Suggestions are the build team’s, not advice — each needs a real answer.
  </p>
  <div class="gg-mt-3">
    ${table(['Decision', 'Suggested', 'Why it cannot be left blank'], REFUND_POLICY.decisions)}
  </div>

  <h3 class="gg-h3 gg-mt-8">Four questions the draft does not answer</h3>
  <p class="gg-small gg-muted gg-mt-1">
    Genuine gaps. A lawyer should close these rather than the build team guessing.
  </p>
  <div class="gg-fee-points gg-mt-3">
    ${REFUND_POLICY.questions.map(q => `
      <div>
        <dt>${escapeHtml(q.title)}</dt>
        <dd>${escapeHtml(q.body)}</dd>
      </div>`).join('')}
  </div>

  <div class="gg-notice gg-mt-6">
    <h3 class="gg-h4">Once approved</h3>
    <p>${escapeHtml(REFUND_POLICY.onceApproved)}</p>
  </div>`;

/* ==========================================================================
   02. VACANCY NOTICES
   ========================================================================== */

/** Divisions with at least one role that has no vacancy notice yet. */
const outstanding = () => DIVISION_ROLES
  .filter(d => d.status !== 'planned')
  .map(d => ({
    division: d.division,
    certificate: d.certificate,
    roles: d.roles.filter(r => !isVacancy(r)).map(r => r.title)
  }))
  .filter(d => d.roles.length > 0);

const vacancyMarkup = () => {
  const groups = outstanding();
  const posts = groups.reduce((n, g) => n + g.roles.length, 0);
  const v = VACANCY_REQUEST;

  return `
  <p class="gg-approve-status">
    ${posts} posts across ${groups.length} divisions still need a notice.
    ${VACANCY_TOTALS.notices} notices covering ${VACANCY_TOTALS.posts.toLocaleString('en-IN')} posts are already live,
    with fees from ${rupees(VACANCY_TOTALS.feeLow)} to ${rupees(VACANCY_TOTALS.feeHigh)}.
  </p>

  <div class="gg-notice gg-notice--fee gg-mt-6">
    <h3 class="gg-notice__title">${escapeHtml(v.cannot.title)}</h3>
    <p>${escapeHtml(v.cannot.body)}</p>
    <dl class="gg-fee-points">
      ${v.cannot.fields.map(f => `
        <div>
          <dt>${escapeHtml(f.field)}</dt>
          <dd>${escapeHtml(f.why)}</dd>
        </div>`).join('')}
    </dl>
  </div>

  <h3 class="gg-h3 gg-mt-8">What each post needs</h3>
  <div class="gg-mt-3">
    ${table(['Field', 'Example', 'Notes'], v.needs)}
  </div>
  <ul class="gg-bullets gg-mt-3">
    ${v.notes.map(n => `<li>${escapeHtml(n)}</li>`).join('')}
  </ul>

  <div class="gg-notice gg-mt-6">
    <h3 class="gg-h4">${escapeHtml(v.scale.title)}</h3>
    ${paras(v.scale.body)}
  </div>

  <h3 class="gg-h3 gg-mt-8">The outstanding posts</h3>
  <p class="gg-small gg-muted gg-mt-1">
    Generated from the build, so this list cannot drift. A post gains a vacancy
    count and it leaves this page on the next load.
  </p>

  <div class="gg-approve-groups gg-mt-4">
    ${groups.map(g => `
      <section class="gg-approve-group">
        <h4 class="gg-approve-group__title">
          ${escapeHtml(g.division)}
          <span class="gg-badge gg-badge--meta">${escapeHtml(g.certificate)}</span>
          <span class="gg-approve-group__count">${g.roles.length} posts</span>
        </h4>
        ${table(['Post', 'Job code', 'Vacancies', 'Fee (₹)'],
          g.roles.map(r => [r, '', '', '']))}
      </section>`).join('')}
  </div>`;
};

/* ==========================================================================
   BOOT
   ========================================================================== */
export const init = () => {
  const mount = (key, html) => {
    const el = qs(`[data-approve="${key}"]`);
    if (el) el.innerHTML = html;
  };

  const lead = qs('[data-approve="lead"]');
  if (lead) lead.textContent = APPROVALS_INTRO.lead;

  mount('items',    introMarkup());
  mount('refund',   refundMarkup());
  mount('vacancy',  vacancyMarkup());
};
