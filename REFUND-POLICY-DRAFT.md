# Application fee — refund policy

**Status: DRAFT. Not published on the website.**
**For review and approval by Ashwini Kumar, Director — Legal & Compliance.**

The live site currently says *"A refund policy is being finalised and will be
published here before applications open."* It will keep saying that until this
document comes back approved, because publishing unreviewed refund terms on a
page that takes money is worse than publishing none.

This is a starting draft written by the build team, not legal advice. Every
line marked **DECISION** needs a real answer before it can go live.

---

## Why this matters more than it looks

A ₹99–₹299 charge is small enough that nobody sues over one. That is exactly
what makes the policy important: disputes at this value do not go to court,
they go to the **payment gateway as chargebacks** and to **consumer forums as
complaints**.

- Chargebacks above roughly 1% of transactions put a merchant account at risk
  of being frozen, with settlements held for up to 180 days.
- A published, specific refund policy is the single most effective defence
  against a chargeback, because the acquirer will ask for it first.
- "Non-refundable", with nothing else said, tends to be read against the
  company when a payment demonstrably failed to buy what it described.

So a clear policy protects Global Growth at least as much as the applicant.

---

## Draft text

> ### Refund policy — application fee
>
> The application fee is a processing charge. It covers the cost of receiving
> and screening your application and is payable once per application.
>
> **The fee is not refundable if:**
>
> - your application is screened and you are not shortlisted;
> - you attend or do not attend any stage of the recruitment process;
> - you are not selected at any stage, for any reason;
> - you withdraw your application after it has been submitted;
> - you are found ineligible because the information you provided does not match
>   the documents produced at verification.
>
> **The fee is refundable in full if:**
>
> - you are charged more than once for the same application;
> - payment is taken but no application is recorded against it;
> - Global Growth Industries withdraws or cancels the vacancy before applications
>   are screened;
> - the post is not filled because the vacancy is withdrawn by the Company;
> - the payment was made without your authorisation and this is established.
>
> **How to request a refund.** Write to
> [hr@globalgrowthindustries.com](mailto:hr@globalgrowthindustries.com) with your
> application reference and payment reference. Requests are acknowledged within
> **{{DECISION: acknowledgement period — 2 working days?}}** and decided within
> **{{DECISION: decision period — 7 working days?}}**.
>
> **How refunds are paid.** Approved refunds are returned to the original
> payment method within **{{DECISION: refund settlement period — 7–10 working
> days?}}** of approval. We do not refund by any other route, and we will never
> ask for your bank details, card number, OTP or UPI PIN to process a refund.
>
> **Grievance.** If you are not satisfied with a refund decision, write to
> **{{DECISION: name and designation of the grievance officer}}** at
> **{{DECISION: grievance email}}**. We respond within
> **{{DECISION: statutory response period — confirm against the Consumer
> Protection (E-Commerce) Rules and the DPDP Act}}**.

---

## Decisions needed

| # | Decision | Why it cannot be left blank |
|---|---|---|
| 1 | Acknowledgement period | Consumer forums look for a stated turnaround |
| 2 | Decision period | Same |
| 3 | Refund settlement period | Gateways require this to defend a chargeback |
| 4 | Grievance officer — name and designation | A named person is required, not an inbox |
| 5 | Grievance email | Should differ from the applications inbox |
| 6 | Statutory response period | Must match what the applicable rules require |

---

## Four questions the draft does not answer

These are genuine gaps, and a lawyer should close them rather than the build
team guessing.

**1. Is the fee subject to GST?** If it is a service fee, GST may apply and the
receipt must show it broken out. A receipt that does not show tax correctly is
its own exposure. This changes both the displayed amount and the receipt.

**2. What happens if a candidate pays for a post that is later found to be
mis-advertised?** For example a qualification stated as 10+2 that is corrected
to Graduate after applications open. The draft above does not cover it and it
is the most likely real dispute.

**3. Can one fee cover more than one application?** Twenty-two notices are live
and more are coming. A candidate eligible for four posts currently pays four
times. That is defensible, but it must be *stated*, or it reads as a charge per
attempt rather than per application.

**4. Does the placement agency licence impose its own refund terms?** Some state
licensing conditions prescribe what may be charged to a job-seeker and on what
terms it must be returned. Those conditions override anything drafted here.
This should be checked against the actual licence before anything is published.

---

## Once approved

Replace the placeholder in `assets/js/data/jobs.js` →
`APPLICATION_FEE.points` → the `Refunds` entry. It renders through `resolve()`,
so the page switches from "being finalised" to the real policy on its own with
no other change.

If the policy is longer than a paragraph — and it probably should be — tell us
and we will give it its own section on `/careers` rather than a card.
