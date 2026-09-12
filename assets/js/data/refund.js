/**
 * GLOBAL GROWTH — REFUND & CANCELLATION POLICY
 * ---------------------------------------------------------------------------
 * The document itself, and nothing else. It is read by two pages that must
 * never disagree:
 *
 *   /refund            the public policy a payment gateway and an applicant read
 *   /approvals#refund  the same text, presented for Legal & Compliance to sign
 *
 * It lives here rather than inside approvals.js because /refund must not import
 * that file: approvals.js reads jobs.js for its figures, and jobs.js is 400 KB
 * of vacancy notices that a legal page has no use for.
 *
 * PENDING VALUES
 * Six terms are still the client's to set, and they are carried as
 * {{DECISION_*}} tokens. On /approvals they render as the decisions being
 * asked for; on /refund they render as "being confirmed". Neither page ever
 * prints the raw token, and no suggested value is ever published as though it
 * had been agreed — a period this file invented, shown to an applicant as
 * policy, is a term the company would be held to.
 */

export const REFUND_DOCUMENT = {
  title: 'Refund & Cancellation Policy',
  subtitle: 'Application fee',

  opening:
    'The application fee is a non-refundable processing charge. It covers the cost of ' +
    'receiving and screening your application and is payable once per application. It is ' +
    'not a payment for a position, and paying it does not place you under consideration ' +
    'for any role other than the one you applied for.',

  /**
   * The client's position, confirmed 12 September 2026: the fee is not
   * returned on the outcome of an application.
   */
  notRefundable: {
    heading: 'The fee is not refundable if',
    items: [
      'your application is screened and you are not shortlisted;',
      'you attend, or do not attend, any stage of the recruitment process;',
      'you are not selected at any stage, for any reason;',
      'you withdraw your application after it has been submitted;',
      'the recruitment for the position is completed and you are not appointed;',
      'you are found ineligible because the information you provided does not match the documents produced at verification.'
    ]
  },

  /**
   * Payment failures, which are a different thing from an application outcome.
   *
   * These are deliberately kept when the fee became non-refundable, and are
   * not a softening of that position: a duplicate charge or a debit with no
   * application against it is money taken for nothing, not a fee earned. A
   * policy that keeps it is one Razorpay will not underwrite — duplicate and
   * failed transactions are the single largest source of chargebacks, and an
   * account running above roughly one per cent has its settlements held.
   *
   * Removing this list would make the policy cheaper on paper and considerably
   * more expensive in practice.
   */
  refundable: {
    heading: 'Payment failures are returned',
    items: [
      'you are charged more than once for the same application;',
      'payment is taken but no application is recorded against it;',
      'you are charged after the vacancy has already been withdrawn;',
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
      heading: 'Cancellation',
      body: 'An application may be cancelled by you at any time before it is screened, by writing to hr@globalgrowthindustries.com from the address you applied with. Cancellation stops the application from being considered further. It does not return the fee, because the application has already been received and processed — cancel before paying if you do not wish to proceed.'
    },
    {
      heading: 'If you are not satisfied',
      body: 'If you are not satisfied with a refund decision, write to {{DECISION_GRIEVANCE_OFFICER}} at {{DECISION_GRIEVANCE_EMAIL}}. We respond within {{DECISION_STATUTORY_RESPONSE_PERIOD}}.'
    }
  ],

  /**
   * Shown to applicants alongside the policy. Fee fraud against job-seekers is
   * common enough that the warning belongs next to the payment terms, not
   * buried in a disclaimer.
   */
  warning:
    'The fee is payable only through the payment page linked from a vacancy notice on this ' +
    'website. No employee, agent or representative of Global Growth Industries is authorised ' +
    'to collect an application fee in cash, by bank transfer, or through any other channel. ' +
    'If anyone asks you to, do not pay — report it using the grievance route below.'
};
