/**
 * GLOBAL GROWTH — ITEMS AWAITING CLIENT APPROVAL
 * ---------------------------------------------------------------------------
 * Content for /approvals — a review page, not part of the public site. It is
 * noindex, nofollow, absent from the navigation and the sitemap, and blocked in
 * robots.txt. It exists so that things needing a signature can be sent as a
 * designed page rather than as a raw file.
 *
 * THIS IS THE SINGLE SOURCE for the refund-policy draft. REFUND-POLICY-DRAFT.md
 * points here rather than repeating it — two copies of a legal draft is exactly
 * how the wrong version gets approved.
 *
 * Anything in `{{...}}` renders through resolve(), so an unanswered decision
 * shows as a decision rather than as a token.
 *
 * Figures about the notices are read from jobs.js rather than written here.
 * This page is sent to the client to be signed against, so a number that has
 * gone stale since the last batch landed is worse than no number at all.
 */

import { VACANCY_TOTALS, DIVISION_ROLES, OPEN_VACANCIES } from './jobs.js';

const count = n => Number(n).toLocaleString('en-IN');
const crore = paise => (paise / 1e7).toFixed(1).replace(/\.0$/, '');

/**
 * What the published notices would collect, at one application per post.
 *
 * Summed from each notice's own fee rather than from an average, and stated
 * per applicant so the reader can scale it themselves — the point of putting
 * it on this page is that nobody signing it should have to work it out.
 */
const FEE_PER_APPLICANT = OPEN_VACANCIES.reduce((n, r) => n + r.vacancies * r.fee, 0);

/** Notices held back because their division has no licence. */
const WITHHELD = DIVISION_ROLES
  .filter(d => d.status === 'planned')
  .reduce((n, d) => n + d.roles.length, 0);

const WITHHELD_DIVISIONS = DIVISION_ROLES
  .filter(d => d.status === 'planned')
  .map(d => d.division);

export const APPROVALS_INTRO = {
  eyebrow: 'For approval',
  title: 'Two things need a signature before applications can open',
  lead:
    'Everything else on this site is built and reviewable. These two items cannot be ' +
    'written by the build team: one is a contractual term, the other sets what is charged ' +
    'to members of the public. Both need a decision from Global Growth.',
  items: [
    { n: '01', label: 'Refund policy', who: 'Director — Legal & Compliance', status: 'Draft ready for review' },
    { n: '02', label: 'Vacancy notices', who: 'HR and Legal & Compliance',
      status: `All ${VACANCY_TOTALS.notices} received — scale needs confirming` }
  ]
};

/* ===========================================================================
   01. REFUND POLICY
   =========================================================================== */

export const REFUND_POLICY = {
  status: 'Draft — not published. The live site says a policy is being finalised.',

  why: {
    title: 'Why this matters more than it looks',
    body: [
      'A ₹99–₹299 charge is small enough that nobody sues over one. That is exactly what makes the policy important: disputes at this value do not reach a court, they reach the payment gateway as chargebacks and consumer forums as complaints.',
      'Chargebacks above roughly one per cent of transactions put a merchant account at risk of being frozen, with settlements held for up to 180 days. A published, specific refund policy is the single most effective defence, because the acquirer asks for it first.',
      '“Non-refundable” with nothing else said tends to be read against the company when a payment demonstrably failed to buy what it described. A clear policy protects Global Growth at least as much as it protects the applicant.'
    ]
  },

  /** The draft itself, presented as the document it would become. */
  draft: {
    title: 'Refund policy — application fee',
    opening:
      'The application fee is a processing charge. It covers the cost of receiving and ' +
      'screening your application and is payable once per application.',
    notRefundable: {
      heading: 'The fee is not refundable if',
      items: [
        'your application is screened and you are not shortlisted;',
        'you attend, or do not attend, any stage of the recruitment process;',
        'you are not selected at any stage, for any reason;',
        'you withdraw your application after it has been submitted;',
        'you are found ineligible because the information you provided does not match the documents produced at verification.'
      ]
    },
    refundable: {
      heading: 'The fee is refundable in full if',
      items: [
        'you are charged more than once for the same application;',
        'payment is taken but no application is recorded against it;',
        'Global Growth Industries withdraws or cancels the vacancy before applications are screened;',
        'the post is not filled because the vacancy is withdrawn by the Company;',
        'the payment was made without your authorisation and this is established.'
      ]
    },
    procedure: [
      {
        heading: 'How to request a refund',
        body: 'Write to hr@globalgrowthindustries.com with your application reference and payment reference. Requests are acknowledged within {{DECISION_ACKNOWLEDGEMENT_PERIOD}} and decided within {{DECISION_DECISION_PERIOD}}.'
      },
      {
        heading: 'How refunds are paid',
        body: 'Approved refunds are returned to the original payment method within {{DECISION_SETTLEMENT_PERIOD}} of approval. We do not refund by any other route, and we will never ask for your bank details, card number, OTP or UPI PIN to process a refund.'
      },
      {
        heading: 'Grievance',
        body: 'If you are not satisfied with a refund decision, write to {{DECISION_GRIEVANCE_OFFICER}} at {{DECISION_GRIEVANCE_EMAIL}}. We respond within {{DECISION_STATUTORY_RESPONSE_PERIOD}}.'
      }
    ]
  },

  decisions: [
    ['Acknowledgement period', 'Suggested: 2 working days', 'Consumer forums look for a stated turnaround'],
    ['Decision period', 'Suggested: 7 working days', 'Same'],
    ['Refund settlement period', 'Suggested: 7–10 working days', 'Gateways require this to defend a chargeback'],
    ['Grievance officer — name and designation', '—', 'A named person is required, not an inbox'],
    ['Grievance email', '—', 'Should differ from the applications inbox'],
    ['Statutory response period', '—', 'Must match what the applicable rules require']
  ],

  /** Genuine gaps a lawyer should close rather than the build team guessing. */
  questions: [
    {
      title: 'Is the fee subject to GST?',
      body: 'If it is a service fee, GST may apply and the receipt must show it broken out. A receipt that does not show tax correctly is its own exposure. This changes both the displayed amount and the receipt.'
    },
    {
      title: 'What if a post is mis-advertised and then corrected?',
      body: 'For example a qualification stated as 10+2 and corrected to Graduate after applications open. The draft does not cover it, and it is the most likely real dispute.'
    },
    {
      title: 'Can one fee cover more than one application?',
      body: `${VACANCY_TOTALS.notices} notices are live across ${VACANCY_TOTALS.divisions} divisions. A candidate eligible for four posts currently pays four times. That is defensible, but it must be stated, or it reads as a charge per attempt rather than per application.`
    },
    {
      title: 'Does the placement agency licence impose its own refund terms?',
      body: 'Some state licensing conditions prescribe what may be charged to a job-seeker and on what terms it must be returned. Those conditions override anything drafted here, and should be checked against the actual licence before publication.'
    }
  ],

  onceApproved:
    'Replace the placeholder in assets/js/data/jobs.js → APPLICATION_FEE → the Refunds entry. ' +
    'It renders through resolve(), so the page switches from “being finalised” to the real ' +
    'policy on its own with no other change. If the policy runs longer than a paragraph — and ' +
    'it probably should — it gets its own section on /careers rather than a card.'
};

/* ===========================================================================
   02. VACANCY NOTICES
   =========================================================================== */

export const VACANCY_REQUEST = {
  cannot: {
    title: 'Two fields the build team cannot fill in',
    body:
      'Every notice sent has now been published, so nothing below is still being asked for. ' +
      'It stays here as the specification for the next batch, and because these two fields ' +
      'are the ones the build team can never supply — they are not copy, they are the ' +
      'commercial terms of a transaction with the public.',
    fields: [
      {
        field: 'Vacancies',
        why: 'This number tells a real person that a job exists. Advertising 200 posts where there are 20 is not a content decision.'
      },
      {
        field: 'Application fee',
        why: `This is money taken from job-seekers. Across ${count(VACANCY_TOTALS.posts)} posts at the rates already set, the difference between a guessed number and the real one runs into crores — collected from people who cannot easily spare ₹250.`
      }
    ]
  },

  needs: [
    ['Job code', 'GGIPL-AVI-TKT-003', 'GGIPL – division – function – serial'],
    ['Vacancies', '240', 'Posts actually being recruited'],
    ['Application fee', '₹296', 'Per application'],
    ['Qualification', '12th pass / Intermediate or Graduate…', 'Full sentence'],
    ['Experience', '0–3 years in airline ticketing…', 'Full sentence; say if freshers may apply'],
    ['Job description', 'One paragraph', 'What the role is responsible for'],
    ['Key responsibilities', '8–14 bullets', 'Published in full, unedited']
  ],

  notes: [
    'Salary, grade and required documents are already built and only need changing if they have moved. Aviation’s salaries rose sharply between the September structure and these notices — say if the same applies elsewhere.',
    'Send the next batch as a shared document rather than as a message. A message hits the 50,000-character limit, which is what truncated an earlier one part-way through Healthcare’s third role; the document holding these notices ran to roughly 390,000 characters and came through intact.',
    `${WITHHELD_DIVISIONS.join(', ')} were sent and have deliberately not been published. Between them the document carries ${WITHHELD} notices with fees attached. They are planned divisions awaiting regulatory approval, and a vacancy notice charging an application fee for an unlicensed activity is the one thing this site is built not to do. They will go live on the day the licences are produced, and not before.`
  ],

  scale: {
    title: 'The one decision left, now that the full figure is known',
    body: [
      `All ${VACANCY_TOTALS.notices} notices are published: ${count(VACANCY_TOTALS.posts)} posts across ${VACANCY_TOTALS.divisions} divisions, each carrying a fee of ₹99 to ₹299. This is no longer an estimate — it is what the site now advertises.`,
      `At one application per post the fees come to about ₹${crore(FEE_PER_APPLICANT)} crore; at ten per post, which is modest for advertised vacancies, about ₹${crore(FEE_PER_APPLICANT * 10)} crore. This is the order of number the placement licence and the legal sign-off need to have been given against. If they were given in September, they were given against 4,140 posts — one-tenth of what is now published — and they should be looked at again before applications open.`,
      'If some of these are indicative headcount plans rather than posts being recruited now, they should not be published as vacancies with fees attached. The site already distinguishes the two: a post with a count and a fee shows as an open notice, everything else shows as position structure. It needs only a decision about which is which — and removing a count and a fee is a one-line change per post.',
      `The figure to check each division against is on /careers: every division heading carries its own post count and fee range, so a wrong number can be spotted without opening anything.`
    ]
  }
};
