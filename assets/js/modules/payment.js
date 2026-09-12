/**
 * GLOBAL GROWTH — APPLICATION FEE PAYMENT
 * ---------------------------------------------------------------------------
 * Drives /payment, /payment-status, /pricing and /service-delivery.
 *
 * THERE IS NO BACKEND YET, and this one cannot be faked as loosely as the form
 * stub. A Razorpay order is created with the key *secret*, which must never
 * reach a browser, so `createPaymentOrder()` is the seam: it returns the same
 * shape the real endpoint will and everything downstream of it is real.
 * BACKEND_PROMPT.md specifies what replaces it.
 *
 * THE ORDER OF THINGS ON /payment
 * What the fee is, what it does not buy, and that it is not returned if you are
 * not selected — all of it above the pay button, none of it behind a link. A
 * job-seeker paying ₹99–₹299 should not discover the terms afterwards. That is
 * also what an acquirer looks for when they open the page.
 *
 * WHAT IS NEVER DONE HERE
 * The browser is never trusted about money. The amount displayed is read from
 * the role's own notice, but the amount *charged* is whatever the server put on
 * the order — a payment page that posts its own price is a payment page that
 * gets paid ₹1. `verify()` likewise only reports what the server concluded; it
 * never decides that a payment succeeded.
 */

import { qs, qsa, escapeHtml, url } from './utils.js';
import { GATEWAY, FEE_INCLUDES_GST, PAYMENT_COPY, SERVICE_DELIVERY } from '../data/payment.js';
import { REFUND_DOCUMENT } from '../data/refund.js';
import { ALL_ROLES, OPEN_VACANCIES, isVacancy, rupees, VACANCY_TOTALS } from '../data/jobs.js';
import { BRAND } from '../data/site.js';

/* ==========================================================================
   THE SERVER SEAM
   ========================================================================== */

/**
 * Create a Razorpay order for one application.
 *
 * Replace the body with a real fetch(); the resolved shape is what the caller
 * already expects, so nothing else in this module changes.
 *
 *   POST /api/payment/order  { roleId, applicant }
 *   → { ok, orderId, amount, currency, reference }
 *
 * `amount` comes back in paise and is the server's figure, not ours.
 *
 * @returns {Promise<{ok: boolean, orderId: string, amount: number,
 *                    currency: string, reference: string}>}
 */
export const createPaymentOrder = (roleId, applicant) => {
  const role = ALL_ROLES.find(r => r.id === roleId);
  console.groupCollapsed('[Global Growth] createPaymentOrder() — STUB, no backend');
  console.table({ roleId, title: role?.title, fee: role?.fee, ...applicant });
  console.info('This will become: await fetch("/api/payment/order", { method: "POST", … })');
  console.groupEnd();

  return new Promise(resolve => setTimeout(() => resolve({
    ok: true,
    orderId: `order_STUB${Date.now().toString(36)}`,
    amount: (role?.fee || 0) * 100,
    currency: GATEWAY.currency,
    reference: `GG-${Date.now().toString(36).toUpperCase()}`
  }), 600));
};

/**
 * Confirm a completed payment with the server.
 *
 * Razorpay's handler hands the browser a signature. It means nothing until the
 * server has recomputed it with the key secret — a browser that reports its own
 * payment as verified is a browser that reports every payment as verified.
 *
 *   POST /api/payment/verify  { orderId, paymentId, signature }
 *   → { ok, status: 'success' | 'failed' | 'pending', reference }
 */
export const verifyPayment = payload => {
  console.groupCollapsed('[Global Growth] verifyPayment() — STUB, no backend');
  console.table(payload);
  console.groupEnd();
  return new Promise(resolve => setTimeout(() => resolve({
    ok: true, status: 'success', reference: payload.reference
  }), 500));
};


/* ==========================================================================
   SHARED
   ========================================================================== */

const points = list => list.map(p => `
  <div>
    <dt>${escapeHtml(p.title)}</dt>
    <dd>${escapeHtml(p.text)}</dd>
  </div>`).join('');

/** The role this payment is for, from ?role= on the URL. */
const roleFromQuery = () => {
  const id = new URLSearchParams(location.search).get('role');
  if (!id) return null;
  const role = ALL_ROLES.find(r => r.id === id);
  // A planned division has no fee and no apply route anywhere else on the
  // site; it must not acquire one by way of a hand-typed query string.
  return role && role.status !== 'planned' && isVacancy(role) ? role : null;
};


/* ==========================================================================
   /payment
   ========================================================================== */

const summaryMarkup = role => `
  <div class="gg-pay-summary">
    <h2 class="gg-h4">You are paying for</h2>
    <dl class="gg-deflist gg-mt-3">
      <dt>Position</dt><dd><strong>${escapeHtml(role.title)}</strong></dd>
      <dt>Division</dt><dd>${escapeHtml(role.brandName)}</dd>
      ${role.code ? `<dt>Job code</dt><dd><span class="gg-mono">${escapeHtml(role.code)}</span></dd>` : ''}
      <dt>Posts advertised</dt><dd>${role.vacancies}</dd>
      <dt>Salary</dt><dd>${escapeHtml(role.salary)} per month</dd>
    </dl>
    <p class="gg-pay-summary__amount">
      <span class="gg-pay-summary__label">Application fee</span>
      <span class="gg-pay-summary__figure">${rupees(role.fee)}</span>
      <span class="gg-pay-summary__note">
        One-time, per application.
        ${FEE_INCLUDES_GST ? 'Inclusive of GST.' : 'No GST is charged on this fee.'}
      </span>
    </p>
  </div>`;

const noRoleMarkup = () => `
  <div class="gg-notice">
    <h2 class="gg-notice__title">No position selected</h2>
    <p>
      This page takes payment for one specific vacancy, and it was opened without one.
      That is deliberate — a payment page that will charge you without naming what for
      is not one you should use.
    </p>
    <p class="gg-mt-2">
      Open the position you want from the catalogue and apply from there.
    </p>
    <p class="gg-mt-3">
      <a class="gg-btn gg-btn--primary" href="${url('/careers')}#positions">Browse open positions</a>
    </p>
  </div>`;

const paymentMarkup = role => {
  if (!role) return noRoleMarkup();
  return `
  <p class="gg-lead">${escapeHtml(PAYMENT_COPY.lead)}</p>

  ${summaryMarkup(role)}

  <div class="gg-notice gg-notice--fee gg-mt-6">
    <h2 class="gg-notice__title">Before you pay</h2>
    <dl class="gg-fee-points">${points(PAYMENT_COPY.beforeYouPay)}</dl>
  </div>

  <div class="gg-pay-action gg-mt-6">
    <button type="button" class="gg-btn gg-btn--primary gg-btn--lg" data-pay="start">
      Pay ${escapeHtml(rupees(role.fee))} and submit application
    </button>
    <p class="gg-small gg-muted gg-mt-2" data-pay="status" role="status" aria-live="polite">
      You will be taken to ${escapeHtml(GATEWAY.name)} to pay. Your card and bank details
      are entered there and are never seen by this website.
    </p>
  </div>

  <p class="gg-small gg-muted gg-mt-4">
    By paying you accept the
    <a href="${url('/terms')}">Terms &amp; Conditions</a>, the
    <a href="${url('/refund')}">Refund &amp; Cancellation Policy</a> and the
    <a href="${url('/privacy')}">Privacy Policy</a>. Complaints go through
    <a href="${url('/grievance')}">Grievance Redressal</a>.
  </p>`;
};

/**
 * Open the Razorpay checkout.
 *
 * The SDK is loaded on demand rather than on every page: it is a third-party
 * script, and a site that charges nobody on 18 of its 23 pages should not ship
 * a payment SDK to all of them.
 */
const loadCheckout = () => new Promise((resolve, reject) => {
  if (window.Razorpay) return resolve(window.Razorpay);
  const script = document.createElement('script');
  script.src = GATEWAY.checkoutScript;
  script.onload = () => window.Razorpay ? resolve(window.Razorpay) : reject(new Error('SDK did not initialise'));
  script.onerror = () => reject(new Error('SDK failed to load'));
  document.head.appendChild(script);
});

const goToStatus = (state, reference) => {
  const params = new URLSearchParams({ state });
  if (reference) params.set('ref', reference);
  location.href = `${url('/payment-status')}?${params}`;
};

const wirePayButton = role => {
  const button = qs('[data-pay="start"]');
  const status = qs('[data-pay="status"]');
  if (!button || !role) return;

  const say = message => { if (status) status.textContent = message; };

  button.addEventListener('click', async () => {
    button.disabled = true;
    const label = button.innerHTML;
    button.innerHTML = 'Preparing…';

    try {
      // The application reference the form produced. The order is created
      // against an application that already exists, so a payment can never end
      // up with nothing attached to it.
      const applicationRef = new URLSearchParams(location.search).get('ref');

      const [Checkout, order] = await Promise.all([
        loadCheckout(),
        createPaymentOrder(role.id, { applicationRef })
      ]);
      if (!order.ok) throw new Error('Order could not be created');

      new Checkout({
        key: GATEWAY.keyId,
        // The server's amount, never a figure this page computed.
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: BRAND.legalName,
        description: `Application fee — ${role.title}`,
        theme: { color: GATEWAY.themeColor },
        handler: async response => {
          say('Confirming your payment…');
          const result = await verifyPayment({
            orderId: order.orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            reference: order.reference
          });
          goToStatus(result.status || 'pending', result.reference);
        },
        modal: {
          ondismiss: () => goToStatus('cancelled', order.reference)
        }
      }).open();

      button.disabled = false;
      button.innerHTML = label;
    } catch (error) {
      console.error('[Global Growth] payment could not start', error);
      button.disabled = false;
      button.innerHTML = label;
      say('The payment window could not be opened. Nothing has been charged. ' +
          'Check your connection and try again, or contact hr@globalgrowthindustries.com.');
    }
  });
};


/* ==========================================================================
   /payment-status
   ========================================================================== */

const statusMarkup = () => {
  const params = new URLSearchParams(location.search);
  const key = params.get('state');
  const reference = params.get('ref');
  const state = PAYMENT_COPY.states[key] || PAYMENT_COPY.states.pending;
  const ok = key === 'success';

  return `
  <div class="gg-pay-result${ok ? ' is-success' : ''}">
    <h2 class="gg-pay-result__title">${escapeHtml(state.title)}</h2>
    <p>${escapeHtml(state.body)}</p>
    ${reference ? `
      <p class="gg-pay-result__ref">
        <span class="gg-pay-result__ref-label">Reference</span>
        <span class="gg-mono">${escapeHtml(reference)}</span>
      </p>` : ''}
    <p class="gg-mt-4">
      ${ok
        ? `<a class="gg-btn gg-btn--secondary" href="${url('/careers')}#positions">Back to positions</a>`
        : `<a class="gg-btn gg-btn--primary" href="${url('/careers')}#positions">Try again</a>
           <a class="gg-btn gg-btn--secondary" href="${url('/grievance')}">Raise a complaint</a>`}
    </p>
  </div>

  <p class="gg-small gg-muted gg-mt-6">
    Queries about a payment go to
    <a href="mailto:hr@globalgrowthindustries.com">hr@globalgrowthindustries.com</a>
    with the reference above. What is and is not returned is set out in the
    <a href="${url('/refund')}">Refund &amp; Cancellation Policy</a>.
  </p>`;
};


/* ==========================================================================
   /pricing
   ========================================================================== */

/**
 * The full fee schedule.
 *
 * Razorpay asks for a pricing page, and for this merchant it is also the most
 * useful page on the site for anyone deciding whether to apply: every fee, in
 * one table, without opening 146 notices. Built from the notices themselves, so
 * it cannot state a price the checkout would not charge.
 */
const pricingMarkup = () => {
  const byDivision = new Map();
  for (const role of OPEN_VACANCIES) {
    if (!byDivision.has(role.brandName)) byDivision.set(role.brandName, []);
    byDivision.get(role.brandName).push(role);
  }

  return `
  <p class="gg-lead">
    One charge, one application. The fee differs by position and is shown on the
    vacancy notice, on this page, and again on the payment page before you pay.
    ${FEE_INCLUDES_GST ? 'All amounts are inclusive of GST.' : 'No GST is charged on the application fee.'}
  </p>

  <div class="gg-notice gg-mt-4">
    <p>
      <strong>${VACANCY_TOTALS.notices} positions are open across
      ${VACANCY_TOTALS.divisions} divisions</strong>, with fees from
      ${escapeHtml(rupees(VACANCY_TOTALS.feeLow))} to ${escapeHtml(rupees(VACANCY_TOTALS.feeHigh))}.
      There is no charge for anything else on this website — browsing positions,
      registering interest and contacting a department are all free.
    </p>
  </div>

  ${[...byDivision.entries()].map(([division, roles]) => `
    <h2 class="gg-h4 gg-mt-6">${escapeHtml(division)}</h2>
    <div class="gg-table-wrap gg-mt-2">
      <table class="gg-table">
        <thead>
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Job code</th>
            <th scope="col">Application fee</th>
          </tr>
        </thead>
        <tbody>
          ${roles.map(r => `
            <tr>
              <th scope="row">${escapeHtml(r.title)}</th>
              <td><span class="gg-mono">${escapeHtml(r.code || '—')}</span></td>
              <td><strong>${escapeHtml(rupees(r.fee))}</strong></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`).join('')}

  <p class="gg-small gg-muted gg-mt-6">
    Fees are reviewed from time to time. The amount charged is always the amount
    shown on the payment page at the moment you pay.
  </p>`;
};


/* ==========================================================================
   /service-delivery
   ========================================================================== */

const deliveryMarkup = () => `
  <p class="gg-lead">${escapeHtml(SERVICE_DELIVERY.lead)}</p>
  <dl class="gg-fee-points gg-mt-4">${points(SERVICE_DELIVERY.points)}</dl>
  <div class="gg-reg-note gg-mt-6">
    <p>${escapeHtml(SERVICE_DELIVERY.contact)}</p>
  </div>`;


/* ==========================================================================
   BOOT
   ========================================================================== */

const mount = (name, build) => {
  const host = qs(`[data-payment="${name}"]`);
  if (host) host.innerHTML = build();
};

export const init = () => {
  const role = roleFromQuery();

  mount('checkout', () => paymentMarkup(role));
  mount('status', statusMarkup);
  mount('pricing', pricingMarkup);
  mount('delivery', deliveryMarkup);

  if (qs('[data-payment="checkout"]')) wirePayButton(role);
};
