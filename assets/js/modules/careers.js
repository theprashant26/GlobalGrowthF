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

import { qs, qsa, icon, escapeHtml, resolve, url } from './utils.js';
import {
  ALL_ROLES, DIVISION_FILTERS, GRADE_FILTERS, GRADE_MATRIX, GRADE_LABELS,
  CORPORATE_LEVELS, SALARY_BANDS, CORPORATE_DEPARTMENTS, QUALIFICATION_MATRIX,
  STANDARD_DOCUMENTS, HR_DOCUMENTS, RECRUITMENT_PROCESS, PROBATION,
  PROMOTION_PATH, EMPLOYEE_CODE, CAREERS_DISCLAIMER, BENEFITS, ROLE_COUNTS,
  APPLICATION_FEE, VACANCY_TOTALS, isVacancy, rupees,
  EMPLOYMENT_TYPE, COMPENSATION_NOTE, DIVISION_ROLES
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
           data-entry="${role.freshers ? 'fresher' : 'experienced'}"
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
      ${role.freshers
        // The single most useful thing on the card for a first-time applicant,
        // so it is a badge rather than a sentence three clicks down.
        ? `<span class="gg-badge gg-badge--fresher">Freshers may apply</span>`
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

/**
 * Point the application form at the fee payment, but only when the chosen
 * position actually charges one.
 *
 * `data-form-next` is what forms.js reads after a successful submit. It is set
 * here rather than written into the markup because only this module knows
 * which positions carry a fee: a speculative application and a position
 * published as structure both charge nothing, and sending either to a payment
 * page would ask for money against no vacancy.
 *
 * The submit button says what happens next for the same reason — "Submit
 * application" on a button that opens a payment window is a dark pattern,
 * however briefly it lasts.
 */
const wireFeeHandoff = select => {
  const form = select.form;
  if (!form) return;
  const button = qs('[type="submit"]', form);
  const defaultLabel = button?.innerHTML;
  const note = qs('[data-fee-note]', form);

  const update = () => {
    const role = ALL_ROLES.find(r => r.id === select.value);
    const chargeable = role && role.status === 'active' && isVacancy(role);

    if (chargeable) {
      form.dataset.formNext = '/payment';
      if (button) button.innerHTML = `Continue to payment — ${rupees(role.fee)}`;
      if (note) {
        note.hidden = false;
        note.textContent =
          `This position carries a ${rupees(role.fee)} application fee. Your application ` +
          'is recorded first, then you are taken to the payment page. Nothing is charged ' +
          'until you confirm it there.';
      }
    } else {
      delete form.dataset.formNext;
      if (button && defaultLabel) button.innerHTML = defaultLabel;
      if (note) { note.hidden = true; note.textContent = ''; }
    }
  };

  select.addEventListener('change', update);
  update();
};

/**
 * The catalogue, grouped by division.
 *
 * A flat list of every position ran to roughly 63,000 pixels and 6,000 DOM
 * elements — forty screen-heights of scrolling, and past the point where
 * Lighthouse starts calling the DOM excessive. With the full 27 divisions it
 * would have been three times that.
 *
 * So each division is a <details> that starts closed. The summary carries
 * everything needed to decide whether to open it: how many positions, how many
 * posts are actually open, and the fee range. <details> rather than a scripted
 * accordion because it is keyboard-operable, announced correctly, and still
 * works if this module never runs.
 */
const groupMarkup = division => {
  const roles = ALL_ROLES.filter(r => r.divisionId === division.id);
  if (!roles.length) return '';

  const planned = division.status === 'planned';
  const open = roles.filter(r => isVacancy(r) && !planned);
  const posts = open.reduce((n, r) => n + r.vacancies, 0);
  const fees = open.map(r => r.fee).filter(Number.isFinite);

  return `
  <details class="gg-div-group${planned ? ' is-planned' : ''}"
           id="division-${escapeHtml(division.id)}"
           data-division-group="${escapeHtml(division.id)}">
    <summary class="gg-div-group__head">
      <span class="gg-div-group__icon">${icon('chevron-down', 'gg-icon gg-icon--sm')}</span>
      <span class="gg-div-group__name">${escapeHtml(division.brandName)}</span>
      <span class="gg-div-group__meta">
        ${roles.length} ${roles.length === 1 ? 'position' : 'positions'}
        ${open.length
          ? `<span class="gg-div-group__open">${posts.toLocaleString('en-IN')} posts open</span>`
          : ''}
        ${fees.length
          ? `<span class="gg-div-group__fee">${
              Math.min(...fees) === Math.max(...fees)
                ? rupees(fees[0])
                : `${rupees(Math.min(...fees))}–${rupees(Math.max(...fees))}`
            }</span>`
          : ''}
        ${planned
          ? `<span class="gg-badge gg-badge--planned">Planned · ${escapeHtml(division.regulator || 'approval required')}</span>`
          : ''}
      </span>
      <span class="gg-div-group__matches" data-group-matches hidden></span>
    </summary>
    <div class="gg-div-group__body" data-group-body></div>
  </details>`;
};

const groupedMarkup = () => DIVISION_ROLES.map(groupMarkup).join('');

/**
 * Fill a division's body the first time it is opened.
 *
 * <details> keeps its children in the DOM whether open or closed, so rendering
 * all 1,100+ cards up front costs ~6,700 elements on a page where every other
 * page is ~1,200 — past the point Lighthouse calls the DOM excessive, and all
 * of it invisible. Bodies are populated on demand instead.
 *
 * Filtering counts matches from the data rather than from the DOM precisely so
 * that an unopened division can still be filtered correctly.
 */
const fillGroup = group => {
  const body = qs('[data-group-body]', group);
  if (!body || body.dataset.filled) return;
  const id = group.dataset.divisionGroup;
  body.innerHTML = ALL_ROLES.filter(r => r.divisionId === id).map(roleMarkup).join('');
  body.dataset.filled = 'yes';
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
          <dd>
            ${escapeHtml(text.text)}
            ${point.link && !text.pending
              ? ` <a href="${escapeHtml(url(point.link.href))}">${escapeHtml(point.link.label)}</a>.`
              : ''}
          </dd>
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
    // The value is the role id, not the label. The fee and the vacancy live on
    // the role, and the payment step has to find them from whatever the form
    // submits — matching a position back from "Ticketing Executive — Aviation"
    // would break the first time two divisions name a role the same way.
    roleSelect.innerHTML =
      '<option value="">Select a position…</option>' +
      ALL_ROLES
        .filter(role => role.status === 'active')
        .map(role => `<option value="${escapeHtml(role.id)}">${
          escapeHtml(`${role.title} — ${role.division}`)}${
          isVacancy(role) ? ` (${rupees(role.fee)} fee)` : ''}</option>`).join('') +
      '<option value="speculative">Speculative — none of the above</option>';

    wireFeeHandoff(roleSelect);
  }

  if (!list) return;
  list.innerHTML = groupedMarkup();

  const count = qs('[data-careers="count"]');
  const empty = qs('[data-careers="empty"]');
  const groups = qsa('[data-division-group]', list);

  /* --- Expand and collapse ------------------------------------------------
     A control rather than a link, because it changes state on this page. */
  const toggleAll = qs('[data-careers="toggle-all"]');
  const syncToggle = () => {
    if (!toggleAll) return;
    const openCount = groups.filter(g => g.open && !g.hidden).length;
    const all = openCount === groups.filter(g => !g.hidden).length && openCount > 0;
    toggleAll.textContent = all ? 'Collapse all divisions' : 'Expand all divisions';
    toggleAll.setAttribute('aria-expanded', String(all));
  };
  toggleAll?.addEventListener('click', () => {
    const shouldOpen = toggleAll.getAttribute('aria-expanded') !== 'true';
    groups.forEach(g => {
      if (g.hidden) return;
      if (shouldOpen) fillGroup(g);
      g.open = shouldOpen;
    });
    if (shouldOpen) applyFilterTo(qsa('.gg-job-card', list));
    syncToggle();
  });

  // Capture phase: `toggle` does not bubble, so the listener has to see it on
  // the way down. Fill before the browser paints the opened section.
  list.addEventListener('toggle', event => {
    const group = event.target.closest?.('[data-division-group]');
    if (group?.open) {
      fillGroup(group);
      applyFilterTo(qsa('.gg-job-card', group));
    }
    syncToggle();
  }, true);

  /* --- Deep links ---------------------------------------------------------
     A link to #aviation-3 must open the division that holds it, or it lands on
     a collapsed section and looks broken. Runs on load and on every hashchange.
     Sector-scoped ids (#division-aviation) open that division whole. */
  const openFromHash = () => {
    const id = location.hash.slice(1);
    if (!id) return;
    // The target may be a role inside a group, or the group itself. A role's
    // id belongs to a card that does not exist until its group is filled, so
    // resolve the division from the id rather than from the DOM.
    const divisionId = id.startsWith('division-')
      ? id.slice('division-'.length)
      : ALL_ROLES.find(r => r.id === id)?.divisionId;
    const group = divisionId && list.querySelector(`[data-division-group="${CSS.escape(divisionId)}"]`);
    if (!group) return;

    fillGroup(group);
    group.open = true;
    applyFilterTo(qsa('.gg-job-card', group));
    syncToggle();

    const target = list.querySelector(`#${CSS.escape(id)}`);
    if (!target) return;
    // The section was closed when the browser tried to scroll, so do it again
    // now that the target has a position.
    requestAnimationFrame(() => target.scrollIntoView({ block: 'center' }));
  };
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

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
        })))}</div>
      <div>${selectMarkup('filter-entry', 'Experience', [
        { value: 'fresher',     label: 'Open to freshers' },
        { value: 'experienced', label: 'Experience required' }
      ])}</div>`;
  }

  /** The current filter state, read from the selects. */
  const chosenNow = () => {
    const chosen = {};
    qsa('[data-role-filter]', filters || document).forEach(select => {
      chosen[select.dataset.roleFilter] = select.value;
    });
    return chosen;
  };

  const matchesFilter = (role, chosen) =>
    (chosen.division === 'all' || !chosen.division || role.divisionId === chosen.division) &&
    (chosen.grade === 'all'    || !chosen.grade    || role.level === chosen.grade) &&
    (chosen.entry === 'all'    || !chosen.entry    ||
      (chosen.entry === 'fresher' ? role.freshers : !role.freshers));

  /** Hide or show cards that are already in the DOM. */
  function applyFilterTo(cards) {
    const chosen = chosenNow();
    cards.forEach(card => {
      card.hidden = !matchesFilter({
        divisionId: card.dataset.division,
        level: card.dataset.grade,
        freshers: card.dataset.entry === 'fresher'
      }, chosen);
    });
  }

  const apply = () => {
    const chosen = chosenNow();
    const filtering = Object.values(chosen).some(v => v && v !== 'all');

    // Counted from the data, not the DOM — a division that has never been
    // opened has no cards to count, and it still has to filter correctly.
    const shown = ALL_ROLES.filter(r => matchesFilter(r, chosen)).length;

    groups.forEach(group => {
      const id = group.dataset.divisionGroup;
      const matches = ALL_ROLES.filter(r => r.divisionId === id && matchesFilter(r, chosen)).length;
      group.hidden = matches === 0;

      // A filter that appears to return nothing is worse than no filter, so a
      // division with matches opens itself and renders them.
      if (filtering && matches > 0) {
        fillGroup(group);
        group.open = true;
      }
      applyFilterTo(qsa('.gg-job-card', group));

      const tally = qs('[data-group-matches]', group);
      if (tally) {
        tally.textContent = filtering ? `${matches} matching` : '';
        tally.hidden = !filtering;
      }
    });

    if (count) {
      count.textContent = shown === ALL_ROLES.length
        ? `${ALL_ROLES.length} positions across ${groups.length} divisions`
        : `${shown} of ${ALL_ROLES.length} positions`;
    }
    if (empty) empty.hidden = shown > 0;
    syncToggle();
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
