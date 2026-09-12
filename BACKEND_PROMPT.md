# Backend specification

What the server has to do for this site, and what it must not do.

The frontend is finished and deployed. It has exactly **three** places where it
reaches for a server, and each is a single function with a documented shape:

| Seam | File | Becomes |
|---|---|---|
| `submitForm(name, payload)` | `assets/js/modules/forms.js` | `POST /api/forms/:name` |
| `createPaymentOrder(roleId, applicant)` | `assets/js/modules/payment.js` | `POST /api/payment/order` |
| `verifyPayment(payload)` | `assets/js/modules/payment.js` | `POST /api/payment/verify` |

Replace those three function bodies with `fetch()` calls and the site is live.
Everything around them — validation, pending states, error messaging, focus
management, the result pages — is already built and exercised.

---

## The thing to understand before writing any code

This site takes **₹99–₹299 from people looking for work**. 146 vacancy notices
are published covering 40,653 posts. At one application per post that is about
₹0.72 crore; at ten, about ₹7.2 crore.

That single fact sets the priorities:

1. **Never take money without recording an application against it.** This is the
   one failure the published refund policy promises to refund, and it is the
   one that generates chargebacks. Order creation must be atomic with
   application creation.
2. **Never take money for an unlicensed division.** Banking, Pharmacy, Finance
   and Insurance are `status: 'planned'`. The frontend already refuses them at
   three separate points. The server must refuse them too — a client-side check
   is a courtesy, not a control.
3. **Never trust the browser about an amount.** The fee is read from the
   server's own copy of the notice. A payment page that posts its own price is
   a payment page that gets paid ₹1.

---

## 1. Forms

Two forms, both already validated client-side. Re-validate everything
server-side anyway.

```
POST /api/forms/contact
POST /api/forms/careers
```

**Request** — `multipart/form-data` for careers (it carries a CV),
`application/json` for contact.

| Field | Form | Notes |
|---|---|---|
| `name` | both | 2–100 chars |
| `email` | both | RFC-valid, deliverable domain |
| `phone` | both | Indian mobile or landline |
| `message` | both | 20–5000 chars |
| `org` | contact | optional |
| `department` | contact | must match a key in `DIVISION_EMAILS` (`site.js`) |
| `role` | careers | **a role id** (`aviation-1`), or `speculative` |
| `experience` | careers | one of the published bands |
| `cv` | careers | pdf/doc/docx, ≤ 5 MB |
| `consent` | careers | must be `true` — store the timestamp and the wording version |

**Response**

```json
{ "ok": true, "reference": "GG-XXXXXXXX" }
```

The reference is shown to the user and is what every later query is tracked
against. Make it short, unambiguous when read aloud over a phone, and unique.
Avoid characters that transcribe badly: `0/O`, `1/I/l`.

**The CV upload is the highest-risk endpoint on the site.** Enforce the type by
magic bytes and not by the filename or the client-supplied MIME type, cap the
size before reading the body into memory, store outside the web root with a
generated name, and never serve it back from a user-supplied path.

---

## 2. Payment

Gateway is **Razorpay**, chosen by the client on 12 September 2026.
**The application fee is not treated as a taxable supply** — no GST component,
and the receipt shows a single amount. `FEE_INCLUDES_GST` in
`assets/js/data/payment.js` is the flag both the display and the receipt read if
that ever changes.

### The sequence

The frontend already enforces this order, and the server must depend on it:

```
1. Candidate submits the application form          POST /api/forms/careers
2. Application is stored, reference returned        → GG-XXXXXXXX
3. Browser is redirected to /payment?role=…&ref=…
4. Candidate reads the terms, presses pay          POST /api/payment/order
5. Razorpay checkout opens (client-side)
6. Candidate pays
7. Handler confirms with the server                POST /api/payment/verify
8. Browser lands on /payment-status?state=…&ref=…
9. Webhook arrives, independently                  POST /api/payment/webhook
```

**Application first, payment second.** Do not invert this for convenience.

### `POST /api/payment/order`

```json
{ "roleId": "aviation-1", "applicantRef": "GG-XXXXXXXX" }
```

Reject, with no order created, when any of these hold:

- the role id does not exist
- the role's division has `status: 'planned'` — **this is the regulatory rule**
- the role has no `vacancies` or no `fee` (it is published as structure only)
- the application reference does not exist, or is already paid
- the vacancy has been withdrawn or filled since the application

**Amount comes from the server's own copy of the notice**, in paise.
`assets/js/data/jobs.js` is the current source; the backend should import or
mirror it, never accept a figure from the request.

```json
{ "ok": true, "orderId": "order_…", "amount": 25100,
  "currency": "INR", "reference": "GG-XXXXXXXX" }
```

### `POST /api/payment/verify`

```json
{ "orderId": "order_…", "paymentId": "pay_…",
  "signature": "…", "reference": "GG-XXXXXXXX" }
```

Recompute the HMAC-SHA256 signature with the key secret and compare it in
constant time. **A browser saying a payment succeeded is not evidence that one
did.** Return only what the server concluded:

```json
{ "ok": true, "status": "success" | "failed" | "pending", "reference": "GG-…" }
```

### `POST /api/payment/webhook`

The authoritative record. The browser may be closed, the network may drop, the
candidate may be on a train — the webhook is what actually settles state.

- Verify the webhook signature against the webhook secret, which is **not** the
  API key secret.
- Be idempotent. Razorpay retries; the same event will arrive more than once,
  and paying twice or emailing twice is worse than handling it once.
- Handle at minimum `payment.captured`, `payment.failed`, `order.paid`,
  `refund.processed`.
- Reconcile daily against Razorpay's settlement report. Webhooks are missed.

### Refunds

The published policy is at `/refund`, rendered from
`assets/js/data/refund.js` — **that file is the specification, not this one.**

The client's position, confirmed 12 September 2026: the fee is **not** refunded
on the outcome of an application. Not shortlisted, not selected, withdrawn,
ineligible at verification — none of these return the fee.

**Payment failures are different and are returned**, because that money bought
nothing:

- charged more than once for the same application
- payment taken but no application recorded against it
- charged after the vacancy was already withdrawn
- payment made without authorisation, once established

Build the duplicate-charge case out of existence rather than refunding it:
constrain one successful payment per application reference at the database
level, not in application code.

Three periods on that page are still `{{DECISION_…}}` placeholders. **When the
client fills them in they become SLAs the backend has to meet**, so wire the
acknowledgement and decision clocks now and make the durations configuration.

---

## 3. Receipts and email

On a captured payment, send the candidate:

- the application reference and the payment reference
- the position, division and job code
- the amount, with no tax line (see the GST note above)
- the date and the payment method
- a link to `/refund` and to `/grievance`

On a screening outcome, tell the candidate either way. The service delivery
policy at `/service-delivery` promises this in writing.

Route contact enquiries by `department` using `DIVISION_EMAILS` in
`assets/js/data/site.js`. Send applications to the HR address. Use a
transactional provider with SPF, DKIM and DMARC aligned — a receipt for money
taken must not land in spam.

---

## 4. Data protection

The site holds names, phone numbers, emails, CVs and payment references for
people applying for jobs. The Digital Personal Data Protection Act, 2023
applies, and `/privacy` already makes specific promises:

- **Retention.** Applications are held six months from submission unless erased
  sooner. Implement the expiry as a job, not as a promise.
- **Erasure and access.** A candidate may ask what is held, ask for correction,
  or ask for deletion. Build the routes; they are published commitments.
- **Consent.** Stored with its timestamp and the version of the wording agreed
  to. If the wording changes, the old consent does not cover the new terms.
- **Grievance Officer.** Named at `/grievance`; currently pending from the
  client. The statutory response clock starts at receipt, not at triage.
- **Breach notification.** Have the procedure written before you need it.

Never log a full payment payload, a CV, or a raw request body containing either.

---

## 5. Non-negotiables

1. **The planned-division rule.** Banking, Pharmacy, Finance, Insurance:
   no vacancy, no fee, no order, no application. Enforced in the database, not
   only in a handler. This is the rule the whole site is built around.
2. **Amounts are server-side.** Always.
3. **The key secret never reaches the browser.** Only `keyId` belongs in the
   page — and the placeholder for it in `assets/js/data/payment.js` is the
   publishable key. If a secret ever lands there, rotate it in the dashboard;
   deleting it from the file is not enough, it is in git.
4. **Idempotency everywhere money moves.**
5. **Rate-limit the forms and the order endpoint.** Both are unauthenticated and
   both cost money to process.
6. **No amount is ever displayed that the checkout would not charge.** `/pricing`
   is generated from the same notices the order endpoint reads.

---

## 6. What the frontend will need changed

Almost nothing. In full:

- three function bodies (the table at the top)
- `GATEWAY.keyId` in `assets/js/data/payment.js` — currently a placeholder
- `CLEAN_URLS` in `assets/js/modules/utils.js` → `true`, **only** if the host
  serves `/about` from `about.html`. Leave it alone on GitHub Pages.

Do not restructure the data files to suit the backend. They are the published
content of the site, several of them are legal texts, and `/careers`,
`/pricing`, `/refund` and `/approvals` all render from them. If the backend
needs a different shape, transform it at the boundary.

---

## 7. Before any of this goes live

From `CLIENT_CHECKLIST.md`, blocking the payment gateway specifically:

- **CIN and GSTIN** — Razorpay matches both against the company's PAN and bank
  account at onboarding.
- **Legal sign-off** on the notices, which releases the `noindex` and the
  `robots.txt` block. Right now `/refund`, `/grievance` and `/corporate` are
  deliberately uncrawlable, which works against the merchant application.
- **Confirmation of the fee scale.** The licence and sign-off were given in
  September against 4,140 posts. 40,653 are now published.
