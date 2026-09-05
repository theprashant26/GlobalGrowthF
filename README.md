# Global Growth Industries — Corporate Website (Frontend)

Static frontend for **Global Growth Industries Private Limited**.
Plain HTML5, CSS3 and vanilla ES modules. No build step, no framework, no bundler.

---

## Running the site

The project uses **root-relative asset paths** (`/assets/...`) so that pages one
folder deep (`/aviation/index.html`) resolve exactly like pages at the root.
That means `file://` will not work — you must serve over HTTP.

**Option A — VS Code Live Server** (recommended)
Install the *Live Server* extension, then right-click `index.html` → *Open with Live Server*.

**Option B — Python** (any 3.x)

```bash
cd GlobalGrowthF
python -m http.server 5500
```

Then open <http://127.0.0.1:5500/>.

> Opening a file directly by double-clicking it will produce a page with no CSS,
> no fonts and no JavaScript. This is expected. Use a server.

---

## Project structure

The root holds **HTML pages only**. Everything else lives under `assets/`.
There is no `css/`, `js/`, `img/`, `lib/` or `vendor/` folder at the root.

```
GlobalGrowthF/
├── index.html … csr.html          Top-level pages
├── styleguide.html                Design-system reference (not in site nav)
├── aviation/index.html … etc.     12 division pages, one folder each
│
├── assets/
│   ├── css/       tokens, base, bootstrap-overrides, components,
│   │              sections, animations, pages
│   ├── js/
│   │   ├── main.js                Single entry point
│   │   ├── data/                  sectors.js, site.js, nav.js, jobs.js
│   │   └── modules/               One module per feature
│   │       utils, cards, navbar, footer, preloader,
│   │       cursor, animations, styleguide
│   ├── vendor/    Self-hosted third-party libraries (pinned, never edited)
│   ├── fonts/     Self-hosted Inter + Inter Tight (woff2)
│   ├── images/    logo, hero, sectors, divisions, team, og
│   ├── icons/     sprite.svg, favicon set
│   └── docs/      Brand reference and client brief
│
├── partials/      Reference markup for header/footer
├── sitemap.xml
├── robots.txt
└── README.md
```

### Deployment paths — works at root AND in a subdirectory

The site runs both from a domain root (`www.globalgrowthindustries.com/`) and
from a subdirectory (a GitHub Pages **project** site at
`username.github.io/GlobalGrowthF/`). Those need different paths, so:

* **HTML** uses page-relative paths — `assets/…` at the root, `../assets/…` on
  division pages. Never `/assets/…`, which only resolves at a domain root.
* **CSS** references assets relative to the stylesheet — `url('../fonts/…')`.
* **JS** resolves everything through `url()` in `utils.js`, which prefixes a
  `BASE` derived from `import.meta.url`. Data files keep writing site-absolute
  paths (`/about`, `/aviation/`, `/assets/…`) and `url()` maps them. **Any new
  href or asset path emitted from JS must go through `url()`.**

`CLEAN_URLS` in `utils.js` is the one switch: `false` (default) links to
`about.html`, which works on every static host. Set it to `true` once the host
serves `/about` from `about.html` — nginx `try_files`, Netlify, Cloudflare
Pages — and links become extensionless again.

`.nojekyll` is present so GitHub Pages serves the files as-is.

### Path discipline (source convention)

* Every asset reference is **root-relative**: `/assets/css/tokens.css`.
* Never `../assets/`, never bare `assets/`. A relative path breaks on division pages.
* Every page loads its CSS in this **fixed order** — overrides must come after
  Bootstrap or they lose the cascade:

  ```
  tokens.css → vendor/bootstrap.min.css → bootstrap-overrides.css →
  base.css → components.css → sections.css → animations.css → pages.css
  ```

* Every page loads **exactly one** script tag:

  ```html
  <script type="module" src="/assets/js/main.js"></script>
  ```

  Everything else is imported from there. No inline `<script>` logic in any HTML file.

---

## Where things live

| I want to change… | Edit this |
|---|---|
| A colour, size, shadow, radius or easing | `assets/css/tokens.css` — **the only file allowed to contain a hex value** |
| Sectors, divisions, slugs, regulatory status | `assets/js/data/sectors.js` |
| Brand name, taglines, email directory, roadmap | `assets/js/data/site.js` |
| Buttons, badges, cards, nav, footer, forms | `assets/css/components.css` |
| Hero, stats band, sector grid, timeline, CTA band | `assets/css/sections.css` |
| One page only | `assets/css/pages.css`, scoped to its `body` class |
| Motion | `assets/js/modules/animations.js` (GSAP) and `assets/css/animations.css` (keyframes + reduced-motion) |
| The form submit stub | `assets/js/modules/forms.js` → `submitForm()` |
| Header / nav links / mega-menu | `assets/js/data/nav.js` + `assets/js/modules/navbar.js` |
| Footer columns | `assets/js/modules/footer.js` |
| Any card's markup | `assets/js/modules/cards.js` — one template per card, shared by every page |
| Job openings | `assets/js/data/jobs.js` |
| Icons | `assets/icons/sprite.svg` |
| Homepage figures, phases, careers rows | `assets/js/modules/home.js` |
| About: vision, values, org tree, milestones | `assets/js/modules/about.js` + `site.js` |
| Sectors page: sticky index + detail blocks | `assets/js/modules/sectorsPage.js` |
| Roadmap phases | `assets/js/modules/roadmap.js` + `ROADMAP` in `site.js` |
| Division page copy | `assets/js/data/divisions.js`, keyed by slug |
| Division page layout | `division-template.html` + `assets/js/modules/divisionPage.js` |
| Careers copy, benefits, hiring process | `assets/js/data/jobs.js` |
| CSR focus areas, principles, metrics | `CSR_*` in `assets/js/data/site.js` |
| Form validation rules | `assets/js/modules/forms.js` → `RULES` |
| **The form submit stub** | `assets/js/modules/forms.js` → `submitForm()` |
| Sector grid + status filter | `assets/js/modules/sectorGrid.js` |
| Counter behaviour | `assets/js/modules/counters.js` |
| Division marquee | `assets/js/modules/marquee.js` |

### Adding a sector or division

Add the entry to the array in `assets/js/data/sectors.js`. Nothing else needs to
change — the homepage grid, the `/sectors` page, the navbar mega-menu, the
marquee and the division pages all read from that file. Never hardcode sector
content into an HTML page.

```js
{
  name: 'New Division',
  slug: 'new-division',
  status: 'active',        // or 'planned' for a regulated line of business
  page: '/new-division/'   // only if it gets a dedicated page
}
```

To verify the data after editing, open `/styleguide.html` and read the
**Data audit** section — it validates unique slugs, legal status values, a
regulator on every planned entity, and a mailbox for every division page.

### Adding a division page

The twelve division pages are generated from `division-template.html` and
differ by exactly one attribute — `data-division="<slug>"` on `<body>`.
Everything else is rendered by `divisionPage.js`, which joins `sectors.js`
(structure) with `divisions.js` (page copy).

1. Add the division to `sectors.js` with a `page` value.
2. Add its content to `divisions.js` under the same slug.
3. Add its mailbox to `DIVISION_EMAILS` in `site.js`.
4. Copy `division-template.html` to `/<slug>/index.html` and set the slug.

The styleguide's data audit fails loudly if any step is missed. A **planned**
entity never gets a page — a page implies a service to enquire about, and
`divisionPage.js` refuses to render one.

### Long strings and layout overflow

Two separate mechanisms cause a long unbreakable string (a `{{PLACEHOLDER}}`,
an email address, a URL) to break the layout, and they need different fixes:

* **Text overflowing its box** — handled site-wide by `overflow-wrap:
  break-word` on `body`.
* **A grid or flex item refusing to shrink** — `break-word` does *not* help
  here, because it changes where text wraps but not the min-content width used
  to size the track. That needs `min-inline-size: 0` on the item (see
  `.gg-split > *`) or `overflow-wrap: anywhere` on the offending text.

Buttons are `white-space: nowrap` by design but carry `max-inline-size: 100%`
and wrap below 480px, so a long label cannot push past the viewport.

### Regulated entities

Any entry with `status: 'planned'` renders with the badge
*"Planned — subject to regulatory approval"*, is visually de-emphasised, and has
**every call to action suppressed** by the `.is-planned` rule in
`components.css`. This is a compliance control, not styling — do not override it
or add a CTA to a planned entity.

The eight currently flagged entities are Ground Handling (DGCA), Pharmacy and
Pharma (State Pharmacy Council / CDSCO), and Finance, Payments, Investment,
Insurance and Banking (RBI / SEBI / IRDAI).

---

## Design system

Open `/styleguide.html`. It renders the entire system — colour with live WCAG
contrast ratios, the fluid type scale, spacing, radii, elevation, every button
and badge state, and an audit of the sector data. Values are read from
`tokens.css` at runtime, so the page cannot drift from the system.

### Colour rule

Navy dominates. Green is an accent only. Two ramps exist:

* **`--gg-*-500` and lighter** — fills, arrows, icons, decorative surfaces, and
  all text on dark backgrounds.
* **`--gg-teal-700` / `--gg-green-700`** — the same hues darkened to clear the
  4.5:1 AA threshold. Use these for any green or teal that carries **text on a
  light background**.

Likewise `--gg-grad-brand` / `--gg-grad-accent` are decorative, while
`--gg-grad-cta` / `--gg-grad-accent-deep` are their text-bearing equivalents,
used wherever white label text sits on the gradient.

---

## Site chrome

The header and footer are **rendered by JavaScript** from `nav.js`,
`sectors.js` and `site.js` rather than authored into each page, so twenty
pages cannot drift out of step with the group structure. A page opts in with
two empty elements:

```html
<header class="gg-nav" data-navbar></header>
...
<footer class="gg-footer" data-footer></footer>
```

`partials/header.html` and `partials/footer.html` hold a generated snapshot of
the resulting DOM. They are a readable reference and the migration target for
the backend phase — not loaded at runtime. Regenerate them after changing
either module.

Other chrome, each activated by a data attribute so a page pays only for what
it uses:

| Element | Attribute |
|---|---|
| Scroll progress bar | `data-progress-bar` on `.gg-progress` |
| Preloader | `data-preloader` on `.gg-preloader` |
| Custom cursor | `data-cursor` on `<body>` |
| Back to top | `data-to-top` on the button |
| Scroll reveal | `data-reveal` on any element |

### Icons

One SVG sprite at `assets/icons/sprite.svg` — interface, contact, social and
one icon per sector. `main.js` **fetches it and injects it inline** before any
module renders, because Safari will not resolve an external file reference
from `<use>`. Reference an icon by fragment only:

```html
<svg class="gg-icon" aria-hidden="true"><use href="#i-arrow-right"></use></svg>
```

Never `href="/assets/icons/sprite.svg#i-arrow-right"` — that renders nothing in
Safari. In JS, use the `icon()` helper from `utils.js`.

## The on-dark component context

Components carry their on-dark styles under a `.gg-dark` ancestor. **Any dark
surface must carry that class**, or its buttons, form notes and inputs render
their light styles — navy text on navy — and effectively disappear.

This has caught us out four times (footer, styleguide demos, hero, roadmap
card), so the rule is worth stating plainly:

* `.gg-footer` adds it in `footer.js`, so pages cannot forget.
* Every other dark section adds it in markup: `class="gg-hero gg-dark"`,
  `class="gg-section gg-dark"`, and so on.
* A section's own background rule must sit **later in the cascade** than
  `.gg-dark` (i.e. in `components.css` or `sections.css`, both of which load
  after `base.css`) so it keeps its own background while inheriting the dark
  component context.

Phase 7 should consider making this automatic rather than opt-in.

## The motion layer

`assets/js/modules/animations.js` owns all of it: Lenis smooth scroll synced
into the GSAP ticker, the shared scroll reveal, the hero line reveal and ascent
draw, the scrubbed roadmap timeline, marquee scroll-velocity coupling,
parallax, magnetic buttons, the page-transition wipe, the progress bar and
back-to-top.

**GSAP and Lenis are loaded on demand and treated as an enhancement, never a
dependency.** They are UMD bundles, so `loadScript()` in `utils.js` injects
them — the page itself still loads only `main.js`. Every behaviour degrades:

| Behaviour | Best | Then | Last resort |
|---|---|---|---|
| Reveal | `ScrollTrigger.batch` | `IntersectionObserver` | watchdog shows everything |
| Timeline rail | `ScrollTrigger` scrub | scroll listener | CSS draws it complete |
| Scrolling | Lenis | native | native |

Under `prefers-reduced-motion` **neither library is downloaded at all** — the
whole layer short-circuits, CSS makes reveals visible, and the cursor,
preloader, marquee and wipe panel are removed rather than merely stilled.

Two rules worth preserving when editing this file:

* When GSAP drives the reveal it adds `html.gsap-reveal`, which switches the
  CSS transition off. Both animating `opacity`/`transform` at once reads as a
  laggy double ease.
* Any tween with a horizontal offset must be scoped with `gsap.matchMedia()`.
  The roadmap cards slide in from alternating sides only above 900px; below
  that the timeline is one full-width column and a 40px offset just pushes the
  card off a 375px screen.

## Content that must never go invisible

Three mechanisms hide content on the promise that JavaScript will bring it
back. Each one fails open, and that property must be preserved when editing:

* **`[data-reveal]`** is hidden only under `.js-ready`. If JS never boots the
  CSS shows it; under reduced motion it is forced visible; and if the
  IntersectionObserver never delivers, a watchdog in `animations.js`
  disconnects the observer and reveals everything. A blank page is a far worse
  failure than a lost animation.
* **`[data-counter]`** keeps its real figure in the DOM. `counters.js` zeroes
  it only at the moment it starts animating, and a backstop timer writes the
  final value if the frame loop stalls.
* **The ascent path** in the hero is fully drawn by default and only dashed
  out under `.js-ready`.

## Verifying in a headless browser

Chrome's `--headless=new` with `--virtual-time-budget` **suspends the
rendering pipeline**: `requestAnimationFrame` never ticks and
`IntersectionObserver` never fires, even on a minimal test page. Scroll-driven
behaviour therefore cannot be verified that way, and reveals will appear stuck
at `opacity: 0`.

Two workarounds are used in this project:

* Add `--force-prefers-reduced-motion` to capture real layout — reveals resolve
  through CSS instead of the observer.
* Chrome also clamps its window to roughly 500px wide, so mobile screenshots
  must be taken through an iframe sized to the target width, not by passing a
  narrow `--window-size`.

## Production requirements

Two things must be true of the server, or the site ships far heavier than it
needs to:

1. **Enable gzip or brotli on CSS, JS, SVG, HTML and the sitemap.** Everything
   served is text and compresses ~75%. Uncompressed the asset payload is
   **783 KB**; compressed it is **198 KB**. This is the single largest
   performance factor in the whole build.
2. **Serve extensionless URLs.** Pages link to `/about`, `/sectors`,
   `/aviation/` and so on. Division pages already resolve as folders; the
   top-level pages need `about.html` served at `/about` (nginx
   `try_files $uri $uri.html $uri/ =404`, or the host's "clean URLs" setting).

Cache headers: `assets/vendor/`, `assets/fonts/` and `assets/icons/` are
immutable and can take a long max-age. `assets/css/` and `assets/js/` change
between releases and need revalidation or a cache-busting query.

### A note on Bootstrap

The build uses **no Bootstrap classes at all** — the design system is entirely
`gg-*`. Bootstrap is still loaded because it is part of the specified stack and
its Reboot layer provides baseline normalisation (notably `label` spacing) that
our own reset does not fully replicate; removing it shifts form spacing across
every page. Its real cost is **30 KB gzipped**, and `bootstrap.bundle.min.js`
is vendored but referenced by nothing.

To drop it, remove this one line from each page and re-check form spacing:

```html
<link rel="stylesheet" href="/assets/vendor/bootstrap/bootstrap.min.css">
```

## SEO and structured data

* Every page has a unique `<title>`, meta description, canonical, Open Graph
  and Twitter card.
* **JSON-LD is generated, not hand-written.** `Organization` + `WebSite` on the
  homepage, `Organization` + `BreadcrumbList` on every other page, derived from
  `sectors.js` so it cannot drift. Regenerate with the SEO script after adding
  a page; the block is marked in each file and is replaced wholesale.
* `sitemap.xml` lists all 20 public pages. `robots.txt` excludes
  `/styleguide.html`, `/division-template.html` and `/legal` (the last until
  legal review is done — remove that line afterwards).
* Favicon set, `apple-touch-icon`, maskable Android icons and
  `site.webmanifest` are all in `assets/icons/favicon/`.

Deliberately **omitted** from structured data, because publishing a placeholder
is worse than publishing nothing: `PostalAddress` (street/city/postcode),
`sameAs` (social profiles), `foundingDate`, `numberOfEmployees`. Add them once
the client confirms the values.

## Third-party libraries

All self-hosted in `assets/vendor/` — no runtime requests leave the origin.

| Library | Version | Files |
|---|---|---|
| Bootstrap | 5.3.3 | `bootstrap.min.css`, `bootstrap.bundle.min.js` |
| GSAP | 3.13.0 | `gsap.min.js`, `ScrollTrigger.min.js`, `ScrollToPlugin.min.js` |
| Lenis | 1.1.20 | `lenis.min.js` |

Fonts are the Google **variable** builds of Inter and Inter Tight, latin and
latin-ext subsets, four files totalling ~268 KB. A single file per family covers
every weight from 100–900, declared with `font-display: swap` in `base.css`.

No jQuery. No AOS. No CDN calls.

Text splitting uses a local `splitTextIntoChars()` / `splitTextIntoLines()` in
`assets/js/modules/utils.js` rather than GSAP's SplitText plugin, so the build
never depends on a plugin that might not load.

---

## Accessibility

* Semantic HTML, real `<button>` and `<a>` elements, `aria-label` on icon buttons.
* Skip-to-content link is the first focusable element on every page.
* Visible focus ring via `:focus-visible`, with a dark-background variant.
* Body text meets 4.5:1; see the colour rule above.
* `prefers-reduced-motion: reduce` disables Lenis, all GSAP motion, the custom
  cursor, the marquee and the preloader, and forces every revealed element
  visible. The contract lives at the end of `assets/css/animations.css`.
* If JavaScript never runs, `html:not(.js-ready)` keeps all `[data-reveal]`
  content visible — nothing is left hidden by an animation that never fired.

---

## Forms

Two live forms: the enquiry form on `/contact` and the application form on
`/careers`. Both are fully validated client-side — required fields, email and
phone format, a minimum message length, and resume type (pdf/doc/docx) and
size (5 MB) — with errors announced through `aria-invalid` and
`aria-describedby`, and focus moved to the first invalid field.

**There is no backend.** Every form resolves through `submitForm()` in
`assets/js/modules/forms.js`, which logs its payload and returns a fake
reference after a short delay so the pending and success states are real and
get exercised. Replacing that one function body with a `fetch()` is the only
change the backend needs to make in this module. `BACKEND_PROMPT.md` (produced
in the final phase) specifies the server work.

## Legal pages

`/legal` carries the privacy policy, terms of use and disclaimer as three
anchored sections, and the footer links point at those anchors. **It must be
reviewed by the company's legal adviser before launch** — every clause needing
input is marked `{{LEGAL_REVIEW}}` in the markup, and the page carries a
visible notice saying so. The page is `noindex` until that review happens.
