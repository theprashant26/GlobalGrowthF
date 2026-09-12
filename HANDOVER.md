# Handover

Everything needed to run, change and deploy this site without asking anyone.

`README.md` explains how the site is built and why. This is the operational
document: what you have, how to work on it, what is deliberately unfinished,
and what will bite you.

---

## What this is

The corporate website for **Global Growth Industries Private Limited** — a
static site with no build step, no bundler, no framework and no dependencies to
install.

| | |
|---|---|
| Pages | 24 at the root, 12 division pages |
| JavaScript | 24 ES modules, 8 data files, ~800 KB unminified |
| CSS | 7 stylesheets, ~208 KB |
| Images | ~23 MB of masters and generated variants |
| Fonts | 2 variable fonts, self-hosted |
| Third-party runtime code | GSAP and Lenis, loaded on demand; Razorpay, loaded only on `/payment` |

**Opening a page needs a web server.** ES modules do not load over `file://`.

```sh
python -m http.server 8000
# then http://localhost:8000/
```

That is the whole development setup. There is nothing to compile.

---

## The shape of it

```
index.html, about.html, careers.html, …     one file per page
aviation/, metro/, …                        12 division pages
assets/
  css/      tokens.css first — every colour, space and radius is defined there
  js/
    main.js        the only <script> on any page; boots modules by data-page
    modules/       renderers and behaviour
    data/          the site's content, as JavaScript
  images/          _masters/ are originals, the rest is generated
tools/             python scripts, documented in tools/README.md
```

**Content lives in `assets/js/data/`, not in the HTML.** A page is a skeleton
with mount points; the module for that page fills them from a data file. To
change what the site says, change the data file.

| File | Holds |
|---|---|
| `site.js` | brand, office, contacts, leadership, certifications, CSR, milestones |
| `sectors.js` | the 15 sectors and 27 divisions |
| `divisions.js` | the per-division page content |
| `jobs.js` | the workforce structure and all 146 vacancy notices — 400 KB, the largest file |
| `nav.js` | navbar, footer and legal links |
| `refund.js` | the refund policy, rendered by both `/refund` and `/approvals` |
| `payment.js` | the fee flow, the Razorpay contract, the delivery policy |
| `approvals.js` | the internal review page |

---

## Four conventions that are load-bearing

Break these and something quietly goes wrong.

### 1. A `{{PLACEHOLDER}}` must never render as visible text

Anything the client has not supplied is a labelled token in a data file. It is
greppable, so the checklist and the page sweep can both find it. It must never
reach a reader — `{{CHAIRMAN_NAME}}` on a live page reads as a broken site.

Renderers pass values through `resolve()` in `modules/utils.js`, which returns
the text or a fallback plus a `data-pending` attribute. Prose with a token
mid-sentence goes through `markPending()` in `modules/legal.js`, which renders
it in amber as the thing that is missing.

`tools/check-pages.py` fails the build if a token reaches the DOM. It has caught
this three times.

### 2. Planned divisions carry no offer and no way to pay

Banking, Pharmacy, Finance and Insurance have `status: 'planned'` in
`jobs.js`. They hold no RBI, State Pharmacy Council, RBI/SEBI or IRDAI licence.

They must never show a vacancy, a fee, an apply route or a payment page. This is
enforced at four points, and all four should stay:

- `OPEN_VACANCIES` filters on `status === 'active'`
- the role card renders a planned badge and no apply link
- the application form's position list excludes them
- `/payment` refuses a hand-typed `?role=banking-1`

**This is the rule the site is built around.** A vacancy notice charging an
application fee for an unlicensed activity is the specific harm everything else
here is arranged to prevent.

### 3. No hex outside `tokens.css`

Every colour, space, radius, shadow and duration is a custom property. The
contrast ratios are calculated and written in the comments there. A hex literal
in a component stylesheet is a bug.

### 4. Root-relative paths go through `url()`

The site must work from a domain root *and* from a GitHub Pages subdirectory.
Every `/path` in a data file passes through `url()` in `modules/utils.js`.

**`ROOT_PAGES` in that file is an allowlist.** A page missing from it renders a
link without `.html` that 404s on every host this deploys to. Add a page there
when you add it to the root. This has caused two bugs already.

---

## The tools

Full detail in `tools/README.md`. What matters day to day:

```sh
python tools/check-pages.py            # run this before every commit
python tools/build-seo.py              # after adding a page or changing office/social data
python tools/new-page.py <slug> …      # scaffold a page with the shared boilerplate
python tools/import-vacancies.py doc.txt --json v.json   # a batch of notices arrives
python tools/merge-vacancies.py v.json --write           # splice them into jobs.js
```

`check-pages.py` renders every page in headless Chrome at 375, 768, 1024 and
1440 px and reports horizontal overflow, visible `{{tokens}}`, console errors
and empty sections. It starts and stops its own server.

**Run it before every commit that touches markup, CSS or a renderer.** The four
things it looks for have each shipped here more than once.

---

## Deployment

GitHub Pages, from `main`. Push and it deploys.

The workflow needs `id-token: write` permission — without it
`actions/deploy-pages` fails with "Failed to get ID Token".

On a domain root with URL rewriting (nginx `try_files`, Netlify, Cloudflare
Pages), set `CLEAN_URLS = true` in `modules/utils.js` and links drop the `.html`.
Leave it `false` on GitHub Pages.

---

## What is deliberately unfinished

### There is no backend

Three functions stand in for a server. Each logs its payload and returns the
shape the real endpoint will. `BACKEND_PROMPT.md` is the specification.

| Seam | File |
|---|---|
| `submitForm()` | `modules/forms.js` |
| `createPaymentOrder()` | `modules/payment.js` |
| `verifyPayment()` | `modules/payment.js` |

Everything around them is real, so replacing three function bodies with
`fetch()` calls is the whole integration.

### The compliance pages are blocked from search

`/legal`, `/privacy`, `/terms`, `/refund`, `/grievance`, `/disclaimer`,
`/corporate`, `/certificates`, `/pricing` and `/service-delivery` carry
`noindex` and are disallowed in `robots.txt`, pending review by the company's
legal adviser.

**This also blocks the payment gateway application** — those are the pages an
acquirer fetches. Removing the block is one line per page and they all wait on
the same sign-off.

`/payment` and `/payment-status` stay blocked permanently. They are steps, not
documents.

### Values the client has not supplied

`CLIENT_CHECKLIST.md` is the live list, kept current. The short version:

- **CIN and GSTIN** — block the merchant account, not only launch
- three refund periods and two grievance officers — become backend SLAs
- 12 certificate numbers, and 5 acronyms whose issuing body is unnamed
- 5 milestone years, 4 CSR figures, 6 leadership bios and portraits
- 11 division pages, for divisions that have no page yet

### Four photographs need replacing

Flagged in the checklist with the reasoning. In short: the logistics photo is
Hamburg with the terminal name legible, the railways photo carries Indian
Railways livery, the aviation frame shows United Airlines, and the security
frame shows a competitor's insignia.

The railways one matters most — the client's own careers notice says vacancies
must not be read as Indian Railways employment, and the page argues against it.

---

## Things that will bite you

**`pkill` does not work here.** Development happens on Windows. A
`pkill -f "http.server"` reports success and kills nothing; twelve orphaned
servers accumulated over several days that way. Use:

```powershell
Get-CimInstance Win32_Process -Filter "Name='python.exe'" |
  Where-Object { $_.CommandLine -match 'http.server' } | Stop-Process
```

**A `nowrap` badge holding text that grew.** Three separate 375 px overflow bugs
had the same cause: a sentence rendered inside `.gg-badge`, which is
`white-space: nowrap`, setting the card's min-content width and taking the page
with it. Sentences go in the body, not in badges.

**Grid items default to `min-width: auto`.** A wide table inside a grid cell
stretches the cell rather than scrolling inside it. Every grid holding tables
here carries `> * { min-inline-size: 0 }`.

**`jobs.js` is 400 KB.** Do not import it into a page that does not need it.
`/legal` reads the refund policy from `refund.js` for exactly this reason.

**Function declarations, not `const`, for helpers `ALL_ROLES` calls.** That
array is initialised at module top level and calls `acceptsFreshers()` and
`namesCertificate()`. A `const` arrow function would be in the temporal dead
zone and the module would throw on load.

**`build-seo.py` rewrites the JSON-LD in every page.** Do not hand-edit those
blocks. Its match is anchored to the `ld+json` opening tag — an earlier version
matched to the first `</script>` and emptied the body of seven pages.

---

## Where to start reading

1. `README.md` — the architecture and the reasoning
2. `assets/js/main.js` — how a page boots
3. `assets/js/data/site.js` — the shape of a data file
4. `assets/js/modules/careers.js` — the most complex renderer
5. `BACKEND_PROMPT.md` — what is still to build
6. `CLIENT_CHECKLIST.md` — what is still to receive
