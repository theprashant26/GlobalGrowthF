/**
 * GLOBAL GROWTH — THE COMPLIANCE PAGES
 * ---------------------------------------------------------------------------
 * Drives the notices that live at their own addresses:
 *
 *   /legal         an index of all seven
 *   /refund        the refund & cancellation policy, from refund.js
 *   /grievance     the grievance routes
 *   /corporate     the statutory identifiers, from site.js
 *   /certificates  the registrations, from site.js
 *
 * and marks the pending terms on the three that are prose — /privacy, /terms
 * and /disclaimer. Those keep their text as markup: a lawyer edits them
 * directly, and putting them behind a renderer would make them harder to
 * review, not easier.
 *
 * WHY ONE PAGE PER NOTICE
 * A payment gateway's onboarding form asks for one URL per policy, and a
 * fragment of a shared page is not one. They were sections of /legal until
 * that was established; /legal is now the index that links them.
 *
 * WHAT WAS MISSING BEFORE ANY OF THIS
 * No refund policy anywhere public, no grievance route, no statutory
 * identifiers. The refund draft existed but lived only on the internal review
 * page, the grievance contact only inside a careers data file, and the CIN and
 * GSTIN only in a data file no page printed.
 *
 * PENDING VALUES
 * Several terms here are still the client's to set. This module never prints a
 * raw {{TOKEN}} and never invents a value to fill one — it renders the gap as
 * a marked, readable phrase and keeps the token in `data-pending` for us. A
 * period invented here and shown to an applicant as policy is a term the
 * company would be held to.
 */

import { qs, escapeHtml, url } from './utils.js';
import { BRAND, OFFICE, CERTIFICATIONS } from '../data/site.js';
import { REFUND_DOCUMENT } from '../data/refund.js';
import { LEGAL_LINKS } from '../data/nav.js';

/* ==========================================================================
   PENDING TEXT
   ========================================================================== */

/**
 * Replace every {{TOKEN}} inside a run of prose with a readable marker.
 *
 * Unlike resolve(), which handles a value that is *entirely* a token, these
 * sit mid-sentence: "decided within {{DECISION_DECISION_PERIOD}}". Blanking
 * them would leave a sentence that reads as finished but says nothing, which
 * is worse than an honest gap — so the gap is shown as one.
 *
 * The token's own label becomes the visible text where it carries one:
 * {{LEGAL_REVIEW — jurisdiction}} reads "jurisdiction", so the sentence still
 * tells you what is missing.
 */
export const markPending = text => escapeHtml(text).replace(
  /\{\{\s*([A-Z_]+)\s*(?:[—–-]\s*([^}]*))?\}\}/g,
  (_, name, label) => {
    const words = (label || name.replace(/^(DECISION|LEGAL_REVIEW)_?/, ''))
      .replace(/_/g, ' ').trim().toLowerCase();
    return `<span class="gg-pending" data-pending="${escapeHtml(name)}"
      title="Awaiting confirmation from Legal &amp; Compliance"
      >${escapeHtml(words || 'to be confirmed')}</span>`;
  });

/** True when a value from the data files is still an unfilled token. */
const pending = value => typeof value === 'string' && /\{\{[\s\S]*\}\}/.test(value);

/**
 * A statutory identifier, or an honest note that it is not published yet.
 * Printed in a <dd> either way, so the list never has a hole in it.
 */
const identifier = (value, missing) => pending(value)
  ? `<span class="gg-pending" data-pending="${escapeHtml(value)}">${escapeHtml(missing)}</span>`
  : `<span class="gg-mono">${escapeHtml(value)}</span>`;


/* ==========================================================================
   REFUND & CANCELLATION
   ========================================================================== */

const listBlock = block => `
  <h3 class="gg-h4 gg-mt-4">${escapeHtml(block.heading)}</h3>
  <ul class="gg-bullets">
    ${block.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
  </ul>`;

const refundMarkup = () => {
  const d = REFUND_DOCUMENT;
  return `
    <p class="gg-lead">${escapeHtml(d.opening)}</p>
    ${listBlock(d.notRefundable)}
    ${listBlock(d.refundable)}
    ${d.procedure.map(p => `
      <h3 class="gg-h4 gg-mt-4">${escapeHtml(p.heading)}</h3>
      <p>${markPending(p.body)}</p>`).join('')}
    <div class="gg-reg-note gg-mt-6">
      <h3 class="gg-h4">Pay only through this website</h3>
      <p>${escapeHtml(d.warning)}</p>
    </div>`;
};


/* ==========================================================================
   GRIEVANCE REDRESSAL
   ========================================================================== */

/**
 * Two routes, deliberately separated. A fee dispute and a data-protection
 * complaint go to different people under different statutes, and a single
 * "contact us" line serving both is what makes a grievance route unusable.
 */
const GRIEVANCE_ROUTES = [
  {
    title: 'Applications, fees and refunds',
    body: 'Questions or complaints about an application, an application fee or a refund.',
    officer: '{{DECISION_GRIEVANCE_OFFICER — name and designation}}',
    email: 'hr@globalgrowthindustries.com',
    phone: OFFICE.helpline,
    within: '{{DECISION_STATUTORY_RESPONSE_PERIOD — response time}}'
  },
  {
    title: 'Personal data — Digital Personal Data Protection Act, 2023',
    body: 'To ask what we hold about you, to have it corrected or erased, or to complain about how it has been handled.',
    officer: '{{LEGAL_REVIEW — Grievance Officer name and designation}}',
    email: 'legal@globalgrowthindustries.com',
    phone: null,
    within: '{{LEGAL_REVIEW — statutory response period}}'
  }
];

const grievanceMarkup = () => `
  <p class="gg-lead">
    If something has gone wrong, these are the routes for raising it and the people
    responsible for answering. Every complaint is acknowledged in writing.
  </p>
  <div class="gg-grievance">
    ${GRIEVANCE_ROUTES.map(r => `
      <div class="gg-grievance__route">
        <h3 class="gg-h4">${escapeHtml(r.title)}</h3>
        <p class="gg-small">${escapeHtml(r.body)}</p>
        <dl class="gg-deflist gg-mt-3">
          <dt>Officer</dt><dd>${markPending(r.officer)}</dd>
          <dt>Email</dt><dd><a href="mailto:${escapeHtml(r.email)}">${escapeHtml(r.email)}</a></dd>
          ${r.phone ? `<dt>Telephone</dt><dd><a href="tel:${escapeHtml(r.phone.replace(/\s/g, ''))}">${escapeHtml(r.phone)}</a></dd>` : ''}
          <dt>We respond within</dt><dd>${markPending(r.within)}</dd>
        </dl>
      </div>`).join('')}
  </div>
  <p class="gg-small gg-muted gg-mt-4">
    Write to the ${escapeHtml(OFFICE.label.toLowerCase())} below if you would rather write on paper.
    Please include enough detail to identify the application or the enquiry concerned.
  </p>`;


/* ==========================================================================
   CORPORATE INFORMATION
   ========================================================================== */

/**
 * Registrations whose issuing authority is actually established.
 *
 * Five of the thirteen reached the build as bare initials with no issuing body
 * named — SSC, UGC, AA, FEF and NCT. Those are not listed here. A missing
 * certificate number can be shown as "in progress" honestly, because the
 * registration is still a known thing; a missing *name* cannot, because there
 * is then no claim left to qualify.
 *
 * Two of the five are worse than merely unnamed. "UGC" reads as the University
 * Grants Commission, which recognises degree-awarding institutions rather than
 * private limited companies. "SSC" reads to most Indian job-seekers as the
 * Staff Selection Commission, a Government of India recruitment body — which
 * is the precise misreading the careers disclaimer exists to prevent, on a site
 * that charges job-seekers an application fee. Publishing either on a page a
 * payment gateway reads would assert something that may not be true.
 *
 * All five stay in site.js with their caveats, and appear the moment the
 * issuing authority is named.
 */
const namedCertifications = () => CERTIFICATIONS.filter(c => !pending(c.name));
const unnamedCertifications = () => CERTIFICATIONS.filter(c => pending(c.name));

const corporateMarkup = () => `
  <p class="gg-lead">
    The registered particulars of the company operating this website.
  </p>
  <dl class="gg-deflist gg-deflist--wide">
    <dt>Registered name</dt>
    <dd>${escapeHtml(BRAND.legalName)}</dd>

    <dt>Entity type</dt>
    <dd>Private company limited by shares, incorporated under the Companies Act, 2013</dd>

    <dt>Corporate Identity Number (CIN)</dt>
    <dd>${identifier(BRAND.cin, 'Published once issued by the Ministry of Corporate Affairs')}</dd>

    <dt>GSTIN</dt>
    <dd>${identifier(BRAND.gstin, 'Published once GST registration is complete')}</dd>

    <dt>Year of incorporation</dt>
    <dd>${identifier(BRAND.incorporationYear, 'To be confirmed')}</dd>

    <dt>${escapeHtml(OFFICE.label)}</dt>
    <dd>${OFFICE.lines.map(escapeHtml).join('<br>')}</dd>

    <dt>Telephone</dt>
    <dd><a href="tel:${escapeHtml(OFFICE.phone.replace(/\s/g, ''))}">${escapeHtml(OFFICE.phone)}</a></dd>

    <dt>Email</dt>
    <dd><a href="mailto:${escapeHtml(BRAND.primaryEmail)}">${escapeHtml(BRAND.primaryEmail)}</a></dd>

    <dt>Website</dt>
    <dd><a href="${escapeHtml(BRAND.websiteUrl)}">${escapeHtml(BRAND.website)}</a></dd>
  </dl>

  <p class="gg-mt-6">
    The group's registrations and certifications, each with the reference against which
    it can be checked, are listed at
    <a href="certificates.html">Certificates &amp; Registrations</a>.
  </p>`;


/* ==========================================================================
   CERTIFICATES & REGISTRATIONS
   ========================================================================== */

const certificatesMarkup = () => `
  <p class="gg-lead">
    Each entry names the issuing authority and the reference the registration can be
    checked against. A certification nobody can verify is a logo, not a credential.
  </p>
  <p class="gg-small gg-muted gg-mt-3">
    References are published as each certificate is issued. Where one is not yet shown,
    the registration is in progress and the entry says so rather than displaying a number
    that cannot be checked.
  </p>
  <div class="gg-table-wrap gg-mt-4">
    <table class="gg-table">
      <thead>
        <tr>
          <th scope="col">Authority</th>
          <th scope="col">Registration</th>
          <th scope="col">Reference</th>
        </tr>
      </thead>
      <tbody>
        ${namedCertifications().map(c => `
          <tr>
            <td>${escapeHtml(c.abbr)}</td>
            <td>${escapeHtml(c.name)}<br><span class="gg-small gg-muted">${escapeHtml(c.detail)}</span></td>
            <td>${identifier(c.ref, 'In progress')}</td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div>
  ${unnamedCertifications().length ? `
    <p class="gg-small gg-muted gg-mt-4">
      A further ${unnamedCertifications().length} registration${unnamedCertifications().length === 1 ? ' is' : 's are'}
      not listed. For ${unnamedCertifications().length === 1 ? 'it' : 'those'} the issuing authority itself is
      still being confirmed, and naming a registration whose authority is unsettled would
      state something the company cannot yet stand behind.
      ${unnamedCertifications().length === 1 ? 'It' : 'They'} will appear here once established.
    </p>` : ''}
  <p class="gg-small gg-muted gg-mt-4">
    Company registration details are at
    <a href="corporate.html">Corporate Information</a>.
  </p>`;


/* ==========================================================================
   INDEX  (/legal)
   ========================================================================== */

/**
 * One card per notice, built from the same list the footer renders.
 *
 * Deriving it from LEGAL_LINKS rather than writing it out again means a notice
 * cannot be added to the footer and missed here, or renamed in one place only.
 */
const SUMMARIES = {
  '#privacy':     'What this site collects, why it is held, and for how long.',
  '#terms':       'The terms on which you may use this website.',
  '#refund':      'When an application fee is returned and when it is not.',
  '#grievance':   'How to raise a complaint, and who answers it.',
  '#disclaimer':  'What is operational, and what is planned and awaiting approval.',
  '#corporate':   'Registered name, statutory identifiers and registered office.',
  '#certificates':'Registrations held, each with its verifiable reference.'
};

const summaryFor = href => {
  const key = Object.keys(SUMMARIES).find(k => href.includes(k.slice(1)));
  return key ? SUMMARIES[key] : '';
};

// href goes through url(): LEGAL_LINKS holds site-absolute paths, and the host
// serves /privacy.html rather than /privacy. Writing the raw href here renders
// a link that 404s on every deployment — which is what it did.
const indexMarkup = () => LEGAL_LINKS.map(link => `
  <a class="gg-legal-card" href="${escapeHtml(url(link.href))}">
    <span class="gg-legal-card__title">${escapeHtml(link.label)}</span>
    <span class="gg-legal-card__text">${escapeHtml(summaryFor(link.href))}</span>
  </a>`).join('');


/* ==========================================================================
   BOOT
   ========================================================================== */

const mount = (name, build) => {
  const host = qs(`[data-legal="${name}"]`);
  if (host) host.innerHTML = build();
};

export const init = () => {
  // Only one of these is present on any given page; the rest are no-ops. The
  // markup is built lazily so a page never pays to render four notices it does
  // not show.
  mount('index', indexMarkup);
  mount('refund', refundMarkup);
  mount('grievance', grievanceMarkup);
  mount('corporate', corporateMarkup);
  mount('certificates', certificatesMarkup);

  markProseTokens();
};

/**
 * Rewrite the {{LEGAL_REVIEW}} markers written directly into the prose notices,
 * where no renderer would otherwise reach them.
 *
 * Text nodes only. Reading a paragraph's textContent and writing back innerHTML
 * would be shorter, and would silently delete every link inside it — the
 * privacy notice's mailto: addresses among them — as well as re-parsing the
 * page's own text as markup. Walking the text nodes touches the tokens and
 * nothing else, and leaves them greppable in the source, which is how the
 * outstanding clauses are tracked.
 */
const markProseTokens = () => {
  const scope = qs('[data-legal-prose]');
  if (!scope) return;

  const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
    acceptNode: node => node.nodeValue.includes('{{')
      ? NodeFilter.FILTER_ACCEPT
      : NodeFilter.FILTER_REJECT
  });

  const targets = [];
  while (walker.nextNode()) targets.push(walker.currentNode);

  for (const node of targets) {
    // A <code>{{LEGAL_REVIEW}}</code> in the review banner is explaining the
    // convention to the reader. That one is meant to be read as a token.
    if (node.parentElement.closest('code')) continue;
    const html = markPending(node.nodeValue);
    const fragment = document.createRange().createContextualFragment(html);
    node.parentNode.replaceChild(fragment, node);
  }
};
