# Refund policy — moved

This draft is now a designed page, so it can be sent for signature rather than
read as a file:

**`/approvals.html#refund`**

On the review build: <https://theprashant26.github.io/GlobalGrowthF/approvals.html#refund>

The content lives in `assets/js/data/approvals.js` → `REFUND_POLICY`, which is
the single source. It was moved out of this file rather than copied, because two
versions of a legal draft is how the wrong one gets approved.

Once the policy comes back signed off, it goes into
`assets/js/data/jobs.js` → `APPLICATION_FEE` → the `Refunds` entry. That renders
through `resolve()`, so `/careers` switches from "being finalised" to the real
policy on its own.
