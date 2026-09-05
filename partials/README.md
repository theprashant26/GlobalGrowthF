# Partials

Reference markup for the shared site chrome.

These files are **not loaded at runtime**. In this static build the header and
footer are rendered by `assets/js/modules/navbar.js` and
`assets/js/modules/footer.js` from `nav.js`, `sectors.js` and `site.js`, so
twenty pages can never drift out of step with the group structure.

They exist for two reasons:

1. **A readable reference.** The rendered DOM is documented here in plain HTML
   so a developer can see the intended structure without reading a template
   literal.
2. **The migration target.** When the backend lands, these become the server
   include or template partial, and the two JS modules are reduced to
   behaviour only (scroll state, mega-menu, drawer). `BACKEND_PROMPT.md`
   specifies that change.

**If you change the rendered markup in the JS modules, update these files in
the same commit.** They are the contract the backend phase will build against.
