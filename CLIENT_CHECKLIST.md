# What we still need from the client

Everything below is a labelled placeholder in the build. The site works and can
be reviewed today — these are the values that must be real before launch.

Each item lists **where it lives**, so supplying it is a one-line edit.

---

## 1. Company and statutory details — BLOCKS LAUNCH

| Item | Currently | Where |
|---|---|---|
| CIN | `{{CIN_PLACEHOLDER}}` | `assets/js/data/site.js` → `BRAND.cin` |
| GSTIN | `{{GSTIN_PLACEHOLDER}}` | `BRAND.gstin` |
| Year of incorporation | `{{INCORPORATION_YEAR_PLACEHOLDER}}` | `BRAND.incorporationYear` |
| Registered office — line 1 | `{{REGISTERED_OFFICE_LINE_1}}` | `OFFICE.lines` |
| Registered office — line 2 | `{{REGISTERED_OFFICE_LINE_2}}` | `OFFICE.lines` |
| City, state, PIN | `{{REGISTERED_OFFICE_CITY_STATE_PIN}}` | `OFFICE.lines` |
| HQ city name | `{{LOCATION_HQ_PLACEHOLDER}}` | `assets/js/data/jobs.js` → `LOCATIONS` (shown against 6 job listings) |

The CIN appears in the footer of **every page**. The address appears on
`/contact` and in the footer.

**Done:** phone `+91 92048 04718`, all 9 department mailboxes, the logo.

---

## 2. Legal review — BLOCKS LAUNCH

`/legal` carries the privacy policy, terms and disclaimer. It is `noindex`
until reviewed. **8 clauses** need a lawyer, marked `{{LEGAL_REVIEW}}`:

- Data retention period for enquiries
- Grievance Officer under the DPDP Act 2023 — name, designation, address
- Statutory response period for data requests
- List of data processors (once the backend and mail host are chosen)
- Governing-law jurisdiction
- Confirmation that the "no third-party analytics" statement stays true
- Last-reviewed date

Once signed off, remove `Disallow: /legal` from `robots.txt` and delete the
review notice at the top of the page.

---

## 3. Leadership — 6 people

Names, roles and a short biography each. Currently `{{CHAIRMAN_NAME}}`,
`{{MD_NAME}}`, `{{DIRECTOR_OPERATIONS_NAME}}`, `{{DIRECTOR_FINANCE_NAME}}`,
`{{DIRECTOR_COMPLIANCE_NAME}}`, `{{DIRECTOR_HR_NAME}}` in
`assets/js/data/site.js` → `LEADERSHIP`.

Shown on `/about`. Until portraits arrive the cards show initials rather than a
broken image, so this section is safe to publish with names only.

---

## 4. Milestone years — 5 dates

`assets/js/data/site.js` → `MILESTONES`. The narrative is written; only the
years are placeholders. **We deliberately did not invent dates.**

Incorporation · first operating divisions · skilling pipeline established ·
Phase 2 build-out began · fifteen sectors mapped.

---

## 5. CSR figures — 4 numbers

`assets/js/data/site.js` → `CSR_STATS`. Shown on `/csr` as "awaiting
verification" rather than as invented numbers.

Candidates trained free of cost · placed within six months · people screened at
health camps · solar capacity installed.

---

## 6. Social profiles — 3 URLs

`assets/js/data/site.js` → `SOCIAL`. LinkedIn, X, YouTube. The footer icons
currently render inert rather than linking to `#`. Supply only the ones that
exist — delete the rest of the array.

---

## 7. Map embed

Once the registered office is confirmed, `/contact` shows a real map instead of
the placeholder panel. Set `OFFICE.mapEmbed` in `site.js`.

---

# Images needed

**Supplied and in use:** the logo (`global-growth-logo.png`) and 5 office
photographs, now live on `/about` (workspace gallery), the homepage and
`/careers`.

| # | What | Where it goes | Priority |
|---|---|---|---|
| 1 | **Leadership portraits — 6** | `/about` leadership grid | High — the only section showing placeholder people |
| 2 | **Division photography — 12** | The overview panel on each division page (`/aviation/`, `/logistics/` …) | High — these are the pages that sell the work |
| 3 | **Open Graph share image — 1** | Link previews on WhatsApp, LinkedIn, X | Medium — currently no image is shown when the site is shared |
| 4 | **Sector imagery — up to 15** | `/sectors` and the homepage grid | Low — the cards use brand icons and look complete without it |

### Specifications

- **Portraits:** 4:5 portrait, min 800×1000, plain or office background, consistent framing across all six.
- **Division photos:** 5:4 landscape, min 1600×1280. Real sites, vehicles, plant or teams at work — one per division. Stock photography will look like stock photography.
- **OG image:** exactly 1200×630, logo plus the tagline on the brand navy. **We can produce this** from the assets we already have — just say the word.
- **Everything:** original camera files, not screenshots or WhatsApp-compressed copies. We handle resizing, WebP conversion and optimisation.

### A note on the logo

The supplied file is a square stacked lockup on a white background. It works
everywhere on the site now, but **a horizontal version would be better in the
site header** — a stacked logo shrunk to navbar height makes the wordmark
unreadable. The header currently pairs your mark with the name typeset to
match. If a horizontal lockup exists, send it and we will use it directly.
