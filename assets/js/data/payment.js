/**
 * GLOBAL GROWTH — APPLICATION FEE PAYMENT
 * ---------------------------------------------------------------------------
 * The payment step, its copy, and the contract the backend has to satisfy.
 *
 * WHAT IS AND IS NOT BUILT
 * The pages, the order summary, the states and the error handling are real.
 * The call that creates an order is a stub, exactly like submitForm() in
 * modules/forms.js, because a Razorpay order can only be created server-side —
 * the key secret must never reach the browser. `createPaymentOrder()` in
 * modules/payment.js is the seam; BACKEND_PROMPT.md specifies what replaces it.
 *
 * WHY A SEPARATE PAGE AND NOT A BUTTON ON THE FORM
 * The candidate has to see what they are paying for, what it does not buy, and
 * what happens if it fails — before the amount leaves their account, not after.
 * A fee charged to a job-seeker in a modal over a form they have already filled
 * in is how this goes wrong.
 */

/**
 * Gateway. Razorpay, chosen by the client on 12 September 2026.
 *
 * `keyId` is the publishable key and belongs in the page; the key *secret*
 * never does. If a secret ever appears in this file it has been leaked and
 * must be rotated in the Razorpay dashboard, not merely deleted from here.
 */
export const GATEWAY = {
  name: 'Razorpay',
  keyId: '{{RAZORPAY_KEY_ID — publishable key from the Razorpay dashboard}}',
  checkoutScript: 'https://checkout.razorpay.com/v1/checkout.js',
  currency: 'INR',
  /** Shown on the Razorpay checkout overlay. */
  themeColor: '#04182F'
};

/**
 * GST. The client confirmed on 12 September 2026 that the application fee is
 * not treated as a taxable supply, so the amount shown is the amount charged
 * and the receipt carries no tax component.
 *
 * If that changes, it changes in two places at once — the displayed amount and
 * the receipt — because a receipt that does not break out tax correctly is its
 * own exposure. This flag is what both read.
 */
export const FEE_INCLUDES_GST = false;

export const PAYMENT_COPY = {
  title: 'Application fee',
  lead:
    'This is a one-time processing charge for the position named below. Please read ' +
    'what it covers before paying — it is not a payment for a job, and it does not ' +
    'improve your chances of being selected.',

  /** Shown beside the amount, immediately above the pay button. */
  beforeYouPay: [
    {
      title: 'What you are paying for',
      text: 'Receiving and screening this application against the eligibility stated in the vacancy notice, and tracking it through the recruitment stages.'
    },
    {
      title: 'What it does not buy',
      text: 'It does not buy a position, an interview, a shortlisting or any assurance of employment. Selection is decided only by the published recruitment process.'
    },
    {
      title: 'It is charged once per application',
      text: 'If you apply for four positions you pay four times, because each is screened separately. One payment covers one application.'
    },
    {
      title: 'It is not refundable if you are not selected',
      text: 'Not being shortlisted, not being selected, or withdrawing after applying does not return the fee. Payment failures are a separate matter and are refunded — see the Refund & Cancellation Policy.'
    },
    {
      title: 'Pay only on this page',
      text: 'No employee, agent or representative of Global Growth Industries is authorised to collect an application fee in cash, by bank transfer, or through any other channel. If anyone asks you to, do not pay — report it through the grievance route.'
    }
  ],

  /** The states the result page can be in. */
  states: {
    success: {
      title: 'Payment received',
      body:
        'Your application has been recorded and the fee is paid. Keep the reference below — ' +
        'it is your proof of payment and the reference any query about this application ' +
        'will be tracked against. A receipt has been sent to the email address you registered.'
    },
    failed: {
      title: 'Payment did not go through',
      body:
        'No application has been recorded and, if anything was debited, it is returned ' +
        'automatically by your bank or card issuer — usually within a few working days. ' +
        'You can try again below. If an amount has left your account and does not return, ' +
        'quote the reference below through the grievance route and it will be refunded.'
    },
    cancelled: {
      title: 'Payment cancelled',
      body:
        'You closed the payment window before it completed. Nothing has been charged and ' +
        'no application has been recorded. Your details are still here — you can pay and ' +
        'submit whenever you are ready.'
    },
    pending: {
      title: 'Payment is still being confirmed',
      body:
        'Your bank has not yet confirmed this payment. This resolves on its own, usually ' +
        'within a few minutes. Do not pay again — if it fails, nothing is charged, and if ' +
        'it succeeds you will receive the receipt by email.'
    }
  }
};

/**
 * SERVICE DELIVERY POLICY
 *
 * Razorpay requires a delivery policy at onboarding, written for goods that
 * arrive by courier. Nothing is shipped here, so this states what the fee
 * actually buys and when it is delivered. Saying "not applicable" is how an
 * application gets sent back.
 */
export const SERVICE_DELIVERY = {
  title: 'Service Delivery Policy',
  lead:
    'Nothing is shipped. The application fee buys the processing of one job ' +
    'application, and this states what is delivered and when.',
  points: [
    {
      title: 'Delivered immediately',
      text: 'Your application is recorded against the position the moment payment succeeds, and an application reference and a payment receipt are sent to the registered email address within a few minutes.'
    },
    {
      title: 'Screening',
      text: 'Applications are screened against the eligibility stated in the vacancy notice. You are told the outcome of screening whether or not you are taken forward.'
    },
    {
      title: 'If you are taken forward',
      text: 'You are contacted about the next stage of the recruitment process described on the careers page, using the contact details you registered.'
    },
    {
      title: 'What is not delivered',
      text: 'A position, an interview, a shortlisting, training, certification or placement. The fee covers the handling of an application and nothing beyond it.'
    },
    {
      title: 'Nothing is posted',
      text: 'There is no physical delivery, no courier and no shipping charge. Every communication is by email to the address you register, so please check it is correct before paying.'
    }
  ],
  contact:
    'If you have paid and received nothing within three working days, raise it through ' +
    'the grievance route with your payment reference and it will be traced.'
};
