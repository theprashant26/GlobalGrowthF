# What we still need from the client

Everything below is a labelled placeholder in the build. The site works and can
be reviewed today — these are the values that must be real before launch.

Each item lists **where it lives**, so supplying it is a one-line edit.

Last updated after the brand-architecture and HR-structure update: 27 divisions,
the confirmed Bengaluru registered office, certifications, and the full position,
grade and recruitment structure are now in.

---

## 1. Company and statutory details — BLOCKS LAUNCH

| Item | Currently | Where |
|---|---|---|
| CIN | `{{CIN_PLACEHOLDER}}` | `assets/js/data/site.js` → `BRAND.cin` |
| GSTIN | `{{GSTIN_PLACEHOLDER}}` | `BRAND.gstin` |
| Year of incorporation | `{{INCORPORATION_YEAR_PLACEHOLDER}}` | `BRAND.incorporationYear` |

The CIN appears in the footer of **every page** and on `/contact`.

**Done:** registered office (2nd Floor, BMTC Complex, K.H. Road, Shanti Nagar,
Bengaluru 560027), phone `+91 92048 04718`, all 9 department mailboxes, the logo.

---

## 2. Certification references — BLOCKS the credentials section

`/about` now carries a **Certifications & Registrations** section. Each card
names the issuing body and shows the number it can be checked against.

**To be clear: this is not about fees or any payment.** We have the list of
bodies you sent and it is already on the site. What is missing is the
*registration or certificate number* printed on each certificate — the
identifier a visitor or a client's compliance team would use to verify it.
Those numbers are placeholders in `assets/js/data/site.js` → `CERTIFICATIONS`.

| Certification | Reference needed |
|---|---|
| MCA | The CIN (same value as above) |
| MSME | `{{UDYAM_REGISTRATION_NUMBER}}` |
| Startup India | `{{DPIIT_RECOGNITION_NUMBER}}` |
| ISO | `{{ISO_STANDARD_AND_CERTIFICATE_NUMBER}}` — **and which standard**: 9001, 14001, 45001? |
| IICA | `{{IICA_REGISTRATION_NUMBER}}` |
| FEF | `{{FEF_FULL_FORM_TO_CONFIRM}}` + `{{FEF_REGISTRATION_NUMBER}}` |
| NCT | `{{NCT_FULL_FORM_TO_CONFIRM}}` + `{{NCT_REGISTRATION_NUMBER}}` |

**Two of these need the issuing body named in full.** "FEF" and "NCT" were
supplied as acronyms only. We have not guessed at expansions — publishing the
wrong issuing body is worse than publishing none. If either is not actually held
in the company's name, tell us and we will remove the card.

---

## 3. Division training certificates — 24 acronyms

Each division's positions list a training certificate alongside the four
standard documents (10th, 12th, Aadhaar, PAN): AATC for Aviation, MIRTC for
Metro, HITC for Hotels, and so on — 24 distinct codes in
`assets/js/data/jobs.js` → `DIVISION_ROLES[].certificate`.

They are shown as the codes you supplied. Before launch we need, for each:

- the **full name** of the certificate, and
- **who issues it** — Global Growth itself, or an external body.

If they are our own internal training certificates, that should be said on the
page, because a candidate reading "AATC Certificate" as a government
qualification is exactly the misreading the careers notice exists to prevent.

---

## 4. Legal review — BLOCKS LAUNCH

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

**Also worth a lawyer's eye:** the careers notice on `/careers` is published
exactly as supplied. It is the strongest protection on the site against the
"government job" misreading, so we have not altered a word of it — but it should
be reviewed alongside the rest.

---

## 5. Leadership — 6 people

Names, roles and a short biography each. Currently `{{CHAIRMAN_NAME}}`,
`{{MD_NAME}}`, `{{DIRECTOR_OPERATIONS_NAME}}`, `{{DIRECTOR_FINANCE_NAME}}`,
`{{DIRECTOR_COMPLIANCE_NAME}}`, `{{DIRECTOR_HR_NAME}}` in
`assets/js/data/site.js` → `LEADERSHIP`.

Shown on `/about`. Until portraits arrive the cards show initials rather than a
broken image, so this section is safe to publish with names only.

---

## 6. Milestone years — 5 dates

`assets/js/data/site.js` → `MILESTONES`. The narrative is written; only the
years are placeholders. **We deliberately did not invent dates.**

Incorporation · first operating divisions · skilling pipeline established ·
Phase 2 build-out began · fifteen sectors mapped.

---

## 7. CSR figures — 4 numbers

`assets/js/data/site.js` → `CSR_STATS`. Shown on `/csr` as "awaiting
verification" rather than as invented numbers.

Candidates trained free of cost · placed within six months · people screened at
health camps · solar capacity installed.

---

## 8. Social profiles — LinkedIn only

**Done:** X, YouTube and Instagram are live in the footer and in the
Organization structured data.

Still missing: **LinkedIn**. It is the one a corporate visitor looks for first,
and it is absent rather than shown as a dead icon. Send the page URL and it goes
into `assets/js/data/site.js` → `SOCIAL`; the footer and the JSON-LD pick it up
from there together.

---

## 9. Detail pages for 15 divisions

12 of the 27 divisions have a full page (`/aviation/`, `/metro/`, `/hotels/`,
`/healthcare/`, `/travel-tourism/`, `/railways/`, `/logistics/`, `/electrical/`,
`/security/`, `/manufacturing/`, `/skill-development/`, `/driver/`).

The other 15 appear on `/sectors`, in the org tree on `/about`, in the navigation
and in the position catalogue, but have no page of their own:

Construction · Infrastructure · Real Estate · Teaching & Education ·
Food & Beverages · Energy · Renewable Energy · IT & Technology · Agriculture ·
Retail · Consultancy · and the four planned divisions (Banking, Pharmacy,
Finance, Insurance), which should not get pages until they are licensed.

Building the remaining 11 operating pages needs one short brief per division:
what it actually does, the six capabilities, the eight services, and why a
client would choose it. **Say the word and we will draft them for your review**
rather than waiting for copy.

---

## 10. Map embed — optional

`/contact` names the building and links out to a map search. We did **not**
embed a Google Maps iframe: it sets third-party cookies on every visitor of a
page that carries no cookie notice. If you want the embed anyway, set
`OFFICE.mapEmbed` in `site.js` and we will add the cookie disclosure with it.

---

# Images

**All 19 supplied images are processed and live.** They came in at exactly the
specifications requested, which made this quick:

| Set | Supplied | Where it is now |
|---|---|---|
| Division photography | 12 at 1600×1280 | The overview panel on all 12 division pages |
| Leadership portraits | 6 at 800×1000 | The leadership grid on `/about` |
| Share image | 1 at 1200×630 | Link previews on WhatsApp, LinkedIn, X, Facebook |

Each one was rebuilt into WebP and JPEG at three widths, so a phone downloads a
480px file and a desktop a 1400px one. Masters are parked in
`assets/images/global/_masters/` and are never served.

---

## THREE THINGS TO LOOK AT BEFORE LAUNCH

### 1. The leadership portraits are stock models

The six portraits are stock photographs of models, not the actual directors.

Right now that is survivable, because the names beside them are still
`{{CHAIRMAN_NAME}}` and the rest — nothing on the page claims that a particular
person holds a particular office. The alt text says "Placeholder portrait" for
the same reason.

**The moment the real names go in, this stops being a placeholder and becomes a
false statement about a named individual.** So when you send the names, send
either the real photographs with them, or the instruction to take the stock ones
down — the cards fall back to a lettered monogram automatically and still look
finished.

### 2. The logistics photograph is Hamburg

`Logistics.jpg` shows a container terminal with the signage
**CONTAINER TERMINAL ALTENWERDER** legible across the cranes. That is the port
of Hamburg. It is on `/logistics/` now, but a visitor who reads the sign is
being shown a German port on the page describing our Indian logistics
operation.

Recommend replacing it with an unbranded port or warehouse frame.

### 3. The railways photograph carries Indian Railways livery

`Railways.jpg` is a locomotive in Indian Railways colours at an Indian Railways
platform.

This one matters more than it looks. The careers notice on this site exists
partly to say, in your own approved words, that our vacancies
*"should not be interpreted as Government of India, Indian Railways, Metro
Corporation, airline, bank, university or other government employment."*
Putting an Indian Railways locomotive at the top of our Railways division page
argues against that notice.

The caption and alt text describe what we do rather than claiming the train is
ours, which is the most the page can do. **Recommend replacing it** with rolling
stock that carries no operator branding, or with a station-operations frame.

---

## Still wanted

| # | What | Where it goes | Priority |
|---|---|---|---|
| 1 | **Real leadership portraits — 6** | `/about` leadership grid | High — see the note above |
| 2 | **Replacements for the logistics and railways frames** | `/logistics/`, `/railways/` | High — see the notes above |
| 3 | **Certification marks — up to 7** | `/about` credentials cards | Medium — the cards read well as text, but the official marks carry more weight |
| 4 | **Photography for the other 15 divisions** | Only needed once those divisions get pages of their own | Low — tracked in section 9 |
| 5 | **Sector imagery — up to 15** | `/sectors` and the homepage grid | Low — see the note below |

### Sector imagery — sizes, if you decide to commission it

**1920 × 1080 px, 16:9 landscape, one per sector, 15 in total.** Minimum
1600 × 900. We generate the 480 / 900 / 1400 / 1920 variants from that.

That figure is measured, not guessed. The largest a sector image can render is
864 CSS px wide on `/sectors`, and 381 CSS px on the homepage grid — 1920
covers the larger of those on a 2× retina screen with headroom if the layout
changes. Expect roughly 40–70 KB per image once converted to WebP.

16:9 because it crops cleanly to 3:2 or 5:4 if the card design moves; a squarer
master does not crop back the other way.

**Our honest advice: skip this one.** The sector cards use the brand icon set
and a gradient sweep, and they look deliberate. Fifteen pieces of generic stock
photography would make that grid look cheaper, not richer — and it is fifteen
more chances to repeat the Hamburg problem. If you do commission it, shoot it,
do not licence it.

### Specifications, if you are commissioning more

- **Division photos:** 5:4 landscape, min 1600×1280. Real sites, vehicles, plant or teams at work. No third-party operator branding in frame.
- **Portraits:** 4:5 portrait, min 800×1000, plain or office background, consistent framing across all six.
- **Certification marks:** the official logo files (SVG or PNG with transparency) from each issuing body. Only send marks the company is licensed to display.
- **Everything:** original camera files, not screenshots or WhatsApp-compressed copies. We handle resizing, WebP conversion and optimisation.

### A note on the logo

The supplied file is a square stacked lockup on a white background. It works
everywhere on the site now, but **a horizontal version would be better in the
site header** — a stacked logo shrunk to navbar height makes the wordmark
unreadable. The header currently pairs your mark with the name typeset to
match. If a horizontal lockup exists, send it and we will use it directly.
