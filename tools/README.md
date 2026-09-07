# tools

Three build scripts. **None of them runs at page load** — the site is static
HTML, CSS and ES modules with no build step, and stays that way. These exist so
that the three things a human would otherwise hand-maintain are generated from
the project's own data instead.

Each is plain Python 3 and finds the project root from its own location, so run
them from anywhere. Only `build-images.py` has a dependency: Pillow
(`pip install Pillow`).

| Script | Generates | Run it when |
|---|---|---|
| `build-images.py` | Responsive WebP + JPEG variants in `assets/images/{divisions,team,og}/` | A photograph is added or replaced |
| `build-seo.py` | The JSON-LD block in all 20 pages, plus `sitemap.xml` | A page is added, or `sectors.js` / the office / social data changes |
| `build-partials.py` | `partials/header.html` and `partials/footer.html` | `navbar.js` or `footer.js` changes |

---

## build-images.py

Reads the client's masters from `assets/images/global/_masters/` and writes
three widths in two formats for each. Filenames map to division slugs inside
the script — if a division is renamed, that map is the one place to change.

Masters are moved into `_masters/` on first run and are never referenced by a
page. Re-running is safe.

After adding a photograph, add its `alt` and `caption` to the matching data
file (`DIVISION_PHOTOS` in `assets/js/data/divisions.js`, or `OFFICES` /
`LEADERSHIP` in `assets/js/data/site.js`). No page is edited.

## build-seo.py

Rewrites the `<script type="application/ld+json">` block in every page and
regenerates `sitemap.xml`. Division pages are discovered by reading
`sectors.js`, so adding a division with a `page` value puts it in the sitemap
automatically.

Anything unverified stays out of the structured data on purpose. The
deliberate omissions are listed at the top of the script and mirrored in
`CLIENT_CHECKLIST.md`.

## build-partials.py

The partials are a readable snapshot of the DOM that `navbar.js` and
`footer.js` produce. They are documentation and the migration target for the
backend phase — never loaded at runtime.

It needs a rendered DOM, which it cannot produce itself. Serve the site over
HTTP first: ES modules will not load over `file://`.

```sh
python -m http.server 8765
chrome --headless=new --virtual-time-budget=8000 \
       --dump-dom http://localhost:8765/index.html > index-dom.html
python tools/build-partials.py index-dom.html
rm index-dom.html
```
