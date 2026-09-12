# What we still need from the client

Everything below is a labelled placeholder in the build. The site works and can
be reviewed today — these are the values that must be real before launch.

Each item lists **where it lives**, so supplying it is a one-line edit.

Last updated 12 September 2026, after the vacancy notices and the compliance
pages. 146 notices covering 40,653 posts are live across 23 divisions, and the
seven compliance pages a payment gateway requires are built.

**The four items that block the payment gateway are 1, 2, 4 and the CIN/GSTIN
in 1.** Everything else blocks launch or improves the site, but does not stop
the merchant application.

---

## 1. Company and statutory details — BLOCKS LAUNCH

| Item | Currently | Where |
|---|---|---|
| CIN | `{{CIN_PLACEHOLDER}}` | `assets/js/data/site.js` → `BRAND.cin` |
| GSTIN | `{{GSTIN_PLACEHOLDER}}` | `BRAND.gstin` |
| Year of incorporation | `{{INCORPORATION_YEAR_PLACEHOLDER}}` | `BRAND.incorporationYear` |

The CIN appears in the footer of **every page**, on `/contact`, and on
`/corporate` — the page a payment gateway reads.

**This blocks the merchant account, not only launch.** An acquirer matches the
CIN and GSTIN against the company's PAN and bank account at onboarding. Until
both are real, `/corporate` says "published once issued", which is honest but
is not what the gateway is looking for.

**Done:** registered office (2nd Floor, BMTC Complex, K.H. Road, Shanti Nagar,
Bengaluru 560027), phone `+91 92048 04718`, all 9 department mailboxes, the logo.

---

## 2. Certification references — BLOCKS the credentials section

`/about` carries a **Certifications & Registrations** section with all 13
bodies, and the acronyms also run as a strip above the footer on every page.
Each card names the issuing body and shows the number it can be checked
against.

**To be clear: this is not about fees or any payment.** We have the list of
bodies you sent and it is all on the site. What is missing is the *registration
or certificate number* printed on each certificate — the identifier a visitor
or a client's compliance team would use to verify it. Those numbers are
placeholders in `assets/js/data/site.js` → `CERTIFICATIONS`.

| Certification | Reference needed |
|---|---|
| MCA | The CIN (same value as section 1) |
| MSME | `{{UDYAM_REGISTRATION_NUMBER}}` |
| Startup India | `{{DPIIT_RECOGNITION_NUMBER}}` |
| ISO | `{{ISO_STANDARD_AND_CERTIFICATE_NUMBER}}` — **and which standard**: 9001, 14001, 45001? |
| IICA | `{{IICA_REGISTRATION_NUMBER}}` |
| NCVET | `{{NCVET_RECOGNITION_NUMBER}}` |
| NSDC | `{{NSDC_TRAINING_PARTNER_ID}}` |
| NSQF | `{{NSQF_ALIGNMENT_REFERENCE}}` |
| FEF | full form + `{{FEF_REGISTRATION_NUMBER}}` |
| NCT | full form + `{{NCT_REGISTRATION_NUMBER}}` |
| AA | full form + `{{AA_REGISTRATION_NUMBER}}` |
| SSC | **see below** |
| UGC | **see below** |

*(You listed ISO twice — it is one entry.)*

### Two of these need more than a number

They are on the site now, in the "to be confirmed" state, because dropping your
content is not our call. But neither should reach a launched site without
evidence behind it, and both cut against the careers notice you approved.

**SSC.** To most Indian job-seekers "SSC" means the **Staff Selection
Commission** — the Government of India recruitment body. Your own careers
notice exists to say GGIPL vacancies *"should not be interpreted as Government
of India … employment"*. An unexplained SSC badge in the footer of every page
argues the exact opposite of that notice. If you mean a **Sector Skill
Council**, the card must name which one — "Logistics Sector Skill Council", say
— not the bare acronym.

**UGC.** The University Grants Commission recognises universities and
degree-awarding institutions. It does not certify private limited companies.
The same careers notice specifically disclaims *"university"* employment. If
there is a real basis for this — an affiliation held by a partner institution,
for instance — tell us what it is and we will word it accurately. If not, our
recommendation is to remove it.

**AA and FEF and NCT** are simply unexplained acronyms. Tell us the issuing
body in full for each, or we remove the card.

---|---|
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

The compliance notices are one page each — `/privacy`, `/terms`, `/refund`,
`/grievance`, `/disclaimer`, `/corporate` and `/certificates`, indexed at
`/legal`. All are `noindex` until reviewed. Nothing outstanding renders as a
raw token: each gap shows in amber as the thing that is missing.

**Data protection and general terms** — a lawyer's call:

- Data retention period for enquiries
- Grievance Officer under the DPDP Act 2023 — name, designation, address
- Statutory response period for data requests
- List of data processors (once the backend and mail host are chosen)
- Governing-law jurisdiction
- Confirmation that the "no third-party analytics" statement stays true
- Last-reviewed date

**Refund terms** — set these in `assets/js/data/refund.js` and both `/refund`
and `/approvals` update together:

- Acknowledgement period for a refund request
- Decision period
- Refund settlement period
- Grievance officer for fee disputes — name and designation
- Grievance email — should differ from the applications inbox

Once signed off, remove the `Disallow:` lines for these pages from
`robots.txt`, remove the `noindex` from each page, and delete the review
notices.

**This blocks the payment gateway, not just launch.** No acquirer opens a
merchant account without a reachable refund policy, a named grievance route and
the company's statutory identifiers, and right now `robots.txt` deliberately
hides all three.

**Also worth a lawyer's eye:** the careers notice on `/careers` is published
exactly as supplied. It is the strongest protection on the site against the
"government job" misreading, so we have not altered a word of it — but it should
be reviewed alongside the rest.

---

## 5. Leadership — names DONE, portraits and bios outstanding

**Received 7 September 2026 and live on `/about`:**

| Role | Name |
|---|---|
| Chairman | Sahil Yadav |
| Managing Director | Paresh Nath |
| Director — Operations | Lavkush Kumar |
| Director — Finance | Sagar Singh |
| Director — Legal & Compliance | Ashwini Kumar |
| Director — Human Resources | Riya Modak |

**Settled 11 September 2026:** the Managing Director is published as
**Paresh Nath** — two words, no surname — at the client's instruction.

### The stock portraits have been removed

This was flagged when they went in, and the names triggered it. A stock model
beside `{{CHAIRMAN_NAME}}` is a placeholder. The same stock model beside
**Sahil Yadav, Chairman** is a false statement about a named individual — the
sort of thing that gets screenshotted rather than corrected.

The cards now show a branded monogram panel instead. It is a deliberate
treatment, not a gap, and the section reads as finished.

**To put real photographs back:** send six files, 4:5 portrait, minimum
800 x 1000, consistent framing. We drop them into
`assets/images/global/_masters/`, run one script, and the photographs return
with the same framing and grade already built for the placeholders. One line
per person in `site.js`; nothing else changes.

### Biographies

Still `{{..._BIO}}` placeholders and **not rendering** — a card with a name and
a role is complete without one. Two or three sentences each when you have them:
background, what they run here, and what they were doing before.

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

## 8. Social profiles — DONE

All four are live in the footer and in the Organization structured data:
LinkedIn, X, YouTube and Instagram.

LinkedIn was supplied on 11 September 2026 and is at
`linkedin.com/company/global-growth-industries-consulting`. Nothing outstanding.

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

## 11. The application fees — CONFIRM BEFORE APPLICATIONS OPEN

Not a missing value. A confirmation, and it is the most consequential item on
this page.

**146 vacancy notices are live: 40,653 posts across 23 divisions, each carrying
a fee of ₹99 to ₹299.** Summed from each notice's own fee, that is about
**₹0.7 crore at one application per post, and about ₹7 crore at ten** — which
is modest for advertised vacancies.

The placement licence and the legal sign-off were given in September, when
4,140 posts were published. What is live now is ten times that. **Please
confirm both were given against a figure of this order**, and not against the
four divisions published then.

If some of these are indicative headcount plans rather than posts being
recruited now, they should not carry fees. The site already separates the two:
a post with a count and a fee shows as an open notice, everything else shows as
position structure. Removing a count and a fee is a one-line change per post.

Every division heading on `/careers` carries its own post count and fee range,
so a wrong number can be spotted without opening anything.

### 22 notices are deliberately not published

Banking, Pharmacy, Finance and Insurance were sent with fees attached and are
held back. They are planned divisions awaiting RBI, State Pharmacy Council,
RBI/SEBI and IRDAI authorisation, and a vacancy notice charging an application
fee for an unlicensed activity is the one thing this site is built not to do.
Your own document marks these four with an asterisk.

**They go live the day the licences are produced.** Send a copy of each and the
notices publish with no other change.

### A copy of the placement agency licence

For the file, and because two of the refund questions on `/approvals` cannot be
answered without it: some state licensing conditions prescribe what may be
charged to a job-seeker and on what terms it must be returned, and those
conditions override anything drafted here.

---

## THREE THINGS TO LOOK AT BEFORE LAUNCH

### 1. The leadership cards have no photographs — resolved, but worth knowing

The six stock portraits were removed when the real names arrived, which is the
right outcome: a stock model beside **Sahil Yadav, Chairman** is a false
statement about a named individual in a way that the same model beside a
placeholder was not.

The cards now show a lettered monogram and read as finished. Nothing is broken
and nothing is misleading.

**Real photographs are still wanted, and are a straight improvement rather than
a fix.** Six files, 4:5 portrait, 1600×2000 or larger. They go in
`assets/images/global/_masters/`, one script runs, and the cards switch from
monogram to photograph with no other change.

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
| 5 | **Replacements for the aviation and security sector frames** | Homepage grid and `/sectors` | High — see the note below |

### Sector imagery — supplied and live

**All 15 received at 1920x1080, exactly to spec.** They now run in two places:

- a 16:9 banner at the head of each card in the homepage sector grid, with the
  sector number over the image and the brand icon breaking its bottom edge
- a wide 21:9 banner at the head of each block on `/sectors`

Each was rebuilt into WebP and JPEG at 480 / 900 / 1400. The homepage carries
462 KB of photography fully scrolled, `/sectors` 844 KB — both comfortably
inside the 2.5 MB page budget.

**The Financial Services frame renders in greyscale.** That sector is planned,
not licensed. A full-colour photograph of someone being advised implies an
operating service however carefully the words around it are chosen, so the
image is desaturated alongside the approval badge.

### TWO SECTOR FRAMES SHOW ANOTHER COMPANY'S BRANDING

Same problem as the Hamburg port and the Indian Railways locomotive, and it
lands harder here because of the conversation we have just had about naming
airlines.

**Aviation.** The aircraft on the apron carry **United Airlines** livery, clearly
legible at the size we serve. That is a named third-party airline on the page
describing our aviation division — the exact implication of a commercial
relationship we agreed the site must not make.

**Security & Facility Services.** The guards' uniforms carry **another security
company's insignia** on the cap badges and shoulder patches. Those are a
competitor's staff, presented as ours.

Both need replacing with unbranded frames before launch. Everything else in the
set is clean.

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
