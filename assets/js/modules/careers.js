/**
 * GLOBAL GROWTH — CAREERS PAGE
 * ---------------------------------------------------------------------------
 * Renders the group's published workforce structure: the grade ladder, the
 * position catalogue for all 27 divisions, the corporate head-office
 * departments, the qualification and document requirements, the fifteen-step
 * recruitment process, and the client-approved careers disclaimer.
 *
 * WHAT THIS PAGE CLAIMS
 * It publishes the *structure*, not a list of live vacancies. Every heading,
 * count and CTA is written to say so, because a candidate who reads "role"
 * as "opening" and pays somebody for an interview is the exact harm the
 * client's disclaimer exists to prevent.
 *
 * REGULATORY CONTRACT
 * Banking, Pharmacy, Finance and Insurance are planned divisions. Their role
 * cards carry the planned badge, state that no recruitment is open, and offer
 * no apply route. They are also excluded from the application form's role
 * list, so the form cannot be used to apply for one.
 *
 * Filtering hides cards with the `hidden` attribute rather than a class, so a
 * filtered-out role leaves the tab order and the accessibility tree.
 */

import { qs, qsa, icon, escapeHtml, resolve } from './utils.js';
import {
  ALL_ROLES, DIVISION_FILTERS, GRADE_FILTERS, GRADE_MATRIX, GRADE_LABELS,
  CORPORATE_LEVELS, SALARY_BANDS, CORPORATE_DEPARTMENTS, QUALIFICATION_MATRIX,
  STANDARD_DOCUMENTS, HR_DOCUMENTS, RECRUITMENT_PROCESS, PROBATION,
  PROMOTION_PATH, EMPLOYEE_CODE, CAREERS_DISCLAIMER, BENEFITS, ROLE_COUNTS,
  APPLICATION_FEE, VACANCY_TOTALS, isVacancy, rupees,
  EMPLOYMENT_TYPE, COMPENSATION_NOTE
} from '../data/jobs.js';

/* ==========================================================================
   SMALL SHARED PIECES
   ========================================================================== */
const chips = items => `
  <div class="gg-chips">
    ${items.map(item => `<span class="gg-chip">${escapeHtml(item)}</span>`).join('')}
  </div>`;

const tableMarkup = (headings, rows) => `
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

/* ==========================================================================
   BENEFITS AND GRADES
   ========================================================================== */
const benefitMarkup = benefit => `
  <article class="gg-value" data-reveal>
    <span class="gg-value__icon">${icon(benefit.icon)}</span>
    <h3 class="gg-value__title">${escapeHtml(benefit.title)}</h3>
    <p class="gg-value__text">${escapeHtml(benefit.text)}</p>
  </article>`;

const levelMarkup = tier => `
  <article class="gg-feature" data-reveal>
    <span class="gg-badge gg-badge--number">${escapeHtml(tier.level)}</span>
    <h3 class="gg-feature__title gg-mt-2">${escapeHtml(tier.name)}</h3>
    <ul class="gg-bullets">
      ${tier.roles.map(role => `<li>${escapeHtml(role)}</li>`).join('')}
    </ul>
  </article>`;

/* ==========================================================================
   ROLE CARD
   ========================================================================== */
const roleMarkup = role => {
  const planned = role.status === 'planned';
  const open = !planned && isVacancy(role);

  return `
  <article class="gg-job-card${planned ? ' is-planned' : ''}${open ? ' is-open' : ''}" id="${role.id}"
           data-role="${role.id}"
           data-division="${escapeHtml(role.divisionId)}"
           data-grade="${escapeHtml(role.level)}"
           data-open="${open ? 'yes' : 'no'}">
    <div class="gg-job-card__head">
      <h3 class="gg-job-card__title">${escapeHtml(role.title)}</h3>
      <span class="gg-job-card__dept">${escapeHtml(role.brandName)}</span>
    </div>

    <p class="gg-job-card__pay">
      <strong>${escapeHtml(role.salary)}</strong> per month
      ${role.salaryNote ? `<span class="gg-job-card__note">${escapeHtml(role.salaryNote)}</span>` : ''}
    </p>
    ${open ? `<p class="gg-job-card__caveat">${escapeHtml(COMPENSATION_NOTE)}</p>` : ''}

    <div class="gg-job-card__meta">
      ${open
        ? `<span class="gg-badge gg-badge--active"><span class="gg-badge__dot"></span>${role.vacancies} posts open</span>
           <span class="gg-badge gg-badge--meta">${escapeHtml(role.employmentType || EMPLOYMENT_TYPE)}</span>`
        : ''}
      <span class="gg-badge gg-badge--number">${escapeHtml(role.level)}</span>
      <span class="gg-badge gg-badge--meta">${escapeHtml(GRADE_LABELS[role.level] || 'Grade')}</span>
      ${role.code ? `<span class="gg-badge gg-badge--meta">${escapeHtml(role.code)}</span>` : ''}
      ${planned
        ? `<span class="gg-badge gg-badge--planned">Planned · ${escapeHtml(role.regulator || 'approval required')}</span>`
        : ''}
    </div>

    ${role.summary
      ? `<p class="gg-job-card__summary">${escapeHtml(role.summary)}</p>`
      : ''}

    ${open && Number.isFinite(role.fee)
      // Shown on the card, not buried in the expander. A candidate must see the
      // cost before deciding to open anything, not after entering their details.
      ? `<p class="gg-job-card__fee">
           <span class="gg-job-card__fee-amount">${rupees(role.fee)}</span>
           <span>application fee — a processing charge, not a payment for a position.
             <a href="#fee">What this covers</a>
           </span>
         </p>`
      : ''}

    ${planned
      ? `<p class="gg-job-card__summary">
           No recruitment is open for this division. The structure is published for transparency;
           positions will exist only once the required authorisation is in force.
         </p>`
      : ''}

    <details class="gg-job-details">
      <summary class="gg-job-details__toggle">
        <span>Position details</span>
        ${icon('chevron-down', 'gg-icon gg-icon--sm')}
      </summary>
      <div class="gg-job-details__body">
        ${role.qualification
          ? `<h4 class="gg-h4">Qualification</h4><p class="gg-small">${escapeHtml(role.qualification)}</p>`
          : ''}

        ${role.experience
          // A full sentence, so it belongs here rather than in a badge — the
          // badge component is white-space: nowrap and a sentence inside one
          // sets the card's min-content width and blows out the page.
          ? `<h4 class="gg-h4 gg-mt-3">Experience</h4><p class="gg-small">${escapeHtml(role.experience)}</p>`
          : ''}

        ${role.duties?.length
          ? `<h4 class="gg-h4 gg-mt-3">Responsibilities</h4>
             <ul class="gg-bullets">${role.duties.map(d => `<li>${escapeHtml(d)}</li>`).join('')}</ul>`
          : ''}

        <h4 class="gg-h4 gg-mt-3">Documents required at verification</h4>
        ${chips(role.documents)}

        ${planned
          ? `<p class="gg-help gg-mt-3">
               Applications for this division are not being accepted.
             </p>`
          : `<a class="gg-btn gg-btn--primary gg-btn--sm gg-mt-3" href="#apply"
                data-apply-for="${escapeHtml(role.title)} — ${escapeHtml(role.brandName)}">
               Register interest in this position ${icon('arrow-right', 'gg-btn__icon')}
             </a>`}
      </div>
    </details>
  </article>`;
};

const selectMarkup = (id, label, options) => `
  <label class="gg-label gg-xs" for="${id}">${escapeHtml(label)}</label>
  <select class="gg-select" id="${id}" data-role-filter="${id.replace('filter-', '')}">
    <option value="all">All</option>
    ${options.map(option =>
      `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join('')}
  </select>`;

/* ==========================================================================
   HEAD OFFICE, PROCESS AND POLICY
   ========================================================================== */
const departmentMarkup = department => `
  <article class="gg-dept" data-reveal>
    <span class="gg-feature__icon">${icon(department.icon)}</span>
    <h3 class="gg-dept__title">${escapeHtml(department.name)}</h3>
    ${chips(department.roles)}
  </article>`;

const stepMarkup = step => `
  <article class="gg-step" data-reveal>
    <h3 class="gg-step__title">${escapeHtml(step.step)}</h3>
    <p class="gg-step__text">${escapeHtml(step.text)}</p>
  </article>`;

const pathMarkup = () => `
  <ol class="gg-path">
    ${PROMOTION_PATH.map(step => `<li class="gg-path__step">${escapeHtml(step)}</li>`).join('')}
  </ol>`;

const codeMarkup = () => `
  <p class="gg-small"><strong>Pattern:</strong> <code>${escapeHtml(EMPLOYEE_CODE.pattern)}</code></p>
  ${tableMarkup(['Example code', 'Division and function'],
    EMPLOYEE_CODE.examples.map(e => [e.code, e.meaning]))}`;

/**
 * The application-fee disclosure.
 *
 * Deliberately rendered as a notice rather than a marketing block, and placed
 * on the page before the application form rather than after it. A candidate
 * should be able to read the whole fee position without having started an
 * application. The refund line runs through resolve(), so while the policy is
 * unwritten the page says a policy is pending rather than implying there is
 * none.
 */
const feeMarkup = () => `
  <div class="gg-notice gg-notice--fee" data-reveal>
    <h2 class="gg-notice__title" id="fee-title">${escapeHtml(APPLICATION_FEE.heading)}</h2>
    <p>${escapeHtml(APPLICATION_FEE.intro)}</p>
    <p class="gg-notice__range">
      Current fees range from <strong>${rupees(VACANCY_TOTALS.feeLow)}</strong>
      to <strong>${rupees(VACANCY_TOTALS.feeHigh)}</strong>, depending on the post.
    </p>

    <dl class="gg-fee-points">
      ${APPLICATION_FEE.points.map(point => {
        const text = resolve(point.text, 'A refund policy is being finalised and will be published here before applications open.');
        return `
        <div${text.attr}>
          <dt>${escapeHtml(point.title)}</dt>
          <dd>${escapeHtml(text.text)}</dd>
        </div>`;
      }).join('')}
    </dl>

    <dl class="gg-notice__contact">
      <div>
        <dt>${escapeHtml(APPLICATION_FEE.grievance.label)}</dt>
        <dd><a href="mailto:${escapeHtml(APPLICATION_FEE.grievance.email)}">${escapeHtml(APPLICATION_FEE.grievance.email)}</a></dd>
      </div>
      <div>
        <dt>Helpline</dt>
        <dd><a href="tel:${escapeHtml(APPLICATION_FEE.grievance.phone.replace(/\s+/g, ''))}">${escapeHtml(APPLICATION_FEE.grievance.phone)}</a></dd>
      </div>
    </dl>
  </div>`;

const disclaimerMarkup = () => `
  <div class="gg-notice" data-reveal>
    <h2 class="gg-notice__title" id="disclaimer-title">${escapeHtml(CAREERS_DISCLAIMER.title)}</h2>
    ${CAREERS_DISCLAIMER.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
    <dl class="gg-notice__contact">
      <div>
        <dt>${escapeHtml(CAREERS_DISCLAIMER.contact.emailLabel)}</dt>
        <dd><a href="mailto:${escapeHtml(CAREERS_DISCLAIMER.contact.email)}">${escapeHtml(CAREERS_DISCLAIMER.contact.email)}</a></dd>
      </div>
      <div>
        <dt>${escapeHtml(CAREERS_DISCLAIMER.contact.helplineLabel)}</dt>
        <dd><a href="tel:${escapeHtml(CAREERS_DISCLAIMER.contact.helpline.replace(/\s+/g, ''))}">${escapeHtml(CAREERS_DISCLAIMER.contact.helpline)}</a></dd>
      </div>
    </dl>
  </div>`;

/* ==========================================================================
   BOOT
   ========================================================================== */
export const init = () => {
  const mount = (key, html) => {
    const el = qs(`[data-careers="${key}"]`);
    if (el) el.innerHTML = html;
    return el;
  };

  mount('benefits', BENEFITS.map(benefitMarkup).join(''));
  mount('levels',   CORPORATE_LEVELS.map(levelMarkup).join(''));

  mount('grades', tableMarkup(
    ['Grade', 'Designation', 'Indicative monthly range'],
    GRADE_MATRIX.map(row => [row.level, row.designation, row.range])
  ));

  mount('bands', tableMarkup(
    ['Band', 'Indicative monthly range'],
    SALARY_BANDS.map(row => [row.band, row.range])
  ));

  mount('departments', CORPORATE_DEPARTMENTS.map(departmentMarkup).join(''));

  mount('qualifications', tableMarkup(
    ['Position level', 'Minimum qualification'],
    QUALIFICATION_MATRIX.map(row => [row.level, row.qualification])
  ));

  mount('documents', chips(STANDARD_DOCUMENTS));
  mount('hrdocs',    chips(HR_DOCUMENTS));
  mount('process',   RECRUITMENT_PROCESS.map(stepMarkup).join(''));

  mount('probation', tableMarkup(
    ['Position level', 'Probation period'],
    PROBATION.periods.map(row => [row.role, row.period])
  ));

  mount('promotion',  pathMarkup());
  mount('codes',      codeMarkup());
  mount('fee',        feeMarkup());
  mount('disclaimer', disclaimerMarkup());

  // Counts are read from the data so a heading can never disagree with the
  // list beneath it.
  const summary = qs('[data-careers="summary"]');
  if (summary) {
    summary.textContent = VACANCY_TOTALS.notices
      ? `${VACANCY_TOTALS.posts.toLocaleString('en-IN')} posts open across ` +
        `${VACANCY_TOTALS.notices} notices · ${ROLE_COUNTS.roles} positions in the structure · ` +
        `${ROLE_COUNTS.plannedDivisions} divisions planned pending approval`
      : `${ROLE_COUNTS.roles} positions · ${ROLE_COUNTS.divisions} divisions · ` +
        `${ROLE_COUNTS.grades} grades · ${ROLE_COUNTS.plannedDivisions} divisions planned pending approval`;
  }

  /* ---- Role catalogue --------------------------------------------------- */
  const list = qs('[data-careers="roles"]');
  const filters = qs('[data-careers="filters"]');
  const roleSelect = qs('[data-role-select]');

  // The form can only offer positions in divisions that are actually
  // operating. A planned division has no vacancies to apply for.
  if (roleSelect) {
    roleSelect.innerHTML =
      '<option value="">Select a position…</option>' +
      ALL_ROLES
        .filter(role => role.status === 'active')
        .map(role => {
          const label = `${role.title} — ${role.division}`;
          return `<option value="${escapeHtml(label)}">${escapeHtml(label)}</option>`;
        }).join('') +
      '<option value="Speculative application">Speculative — none of the above</option>';
  }

  if (!list) return;
  list.innerHTML = ALL_ROLES.map(roleMarkup).join('');

  const count = qs('[data-careers="count"]');
  const empty = qs('[data-careers="empty"]');

  if (filters) {
    filters.innerHTML = `
      <div>${selectMarkup('filter-division', 'Division',
        DIVISION_FILTERS.map(d => ({
          value: d.id,
          label: d.status === 'planned' ? `${d.label} (planned)` : d.label
        })))}</div>
      <div>${selectMarkup('filter-grade', 'Grade',
        GRADE_FILTERS.map(level => ({
          value: level,
          label: `${level} — ${GRADE_LABELS[level] || 'Grade'}`
        })))}</div>`;
  }

  const apply = () => {
    const chosen = {};
    qsa('[data-role-filter]', filters || document).forEach(select => {
      chosen[select.dataset.roleFilter] = select.value;
    });

    let shown = 0;
    qsa('.gg-job-card', list).forEach(card => {
      const visible =
        (chosen.division === 'all' || !chosen.division || card.dataset.division === chosen.division) &&
        (chosen.grade === 'all'    || !chosen.grade    || card.dataset.grade === chosen.grade);
      card.hidden = !visible;
      if (visible) shown += 1;
    });

    if (count) {
      count.textContent = shown === ALL_ROLES.length
        ? `${ALL_ROLES.length} positions across the group`
        : `${shown} of ${ALL_ROLES.length} positions`;
    }
    if (empty) empty.hidden = shown > 0;
  };

  filters?.addEventListener('change', apply);
  apply();

  // "Register interest" pre-fills the form's position field and moves focus
  // there, so the candidate does not have to find it again in the dropdown.
  list.addEventListener('click', event => {
    const trigger = event.target.closest('[data-apply-for]');
    if (!trigger || !roleSelect) return;
    const wanted = trigger.dataset.applyFor.split(' — ')[0];
    const match = [...roleSelect.options].find(option => option.value.startsWith(`${wanted} —`));
    roleSelect.value = match ? match.value : 'Speculative application';
    // Let the hash navigation land first, then take focus.
    setTimeout(() => roleSelect.focus(), 300);
  });
};
