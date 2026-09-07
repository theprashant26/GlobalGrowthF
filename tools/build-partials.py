"""Regenerate partials/header.html and partials/footer.html.

The partials are a readable snapshot of the DOM that navbar.js and footer.js
produce. They are documentation and the migration target for the backend
phase — never loaded at runtime — so they are rebuilt from a real render
rather than hand-edited.

Input is a headless-Chrome dump of the homepage, served from the domain root
so the paths in the snapshot read the way a server include would emit them.
"""
import io, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# The DOM dump to read. Produce it first, with the site served over HTTP
# (ES modules will not load over file://):
#
#   python -m http.server 8765
#   chrome --headless=new --virtual-time-budget=8000 \
#          --dump-dom http://localhost:8765/index.html > index-dom.html
#   python tools/build-partials.py index-dom.html
DOM = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "index-dom.html")

src = io.open(DOM, encoding="utf-8").read()


def extract(tag, attr):
    """Pull one balanced element out of the dump by its opening attribute."""
    i = src.index(attr)
    start = src.rindex("<" + tag, 0, i)
    depth = 0
    pos = start
    open_re = re.compile(r"<%s\b" % tag)
    close_re = re.compile(r"</%s>" % tag)
    while True:
        o = open_re.search(src, pos + 1)
        c = close_re.search(src, pos + 1)
        if c is None:
            raise SystemExit("unbalanced <%s>" % tag)
        if o and o.start() < c.start():
            depth += 1
            pos = o.start()
        else:
            if depth == 0:
                return src[start:c.end()]
            depth -= 1
            pos = c.start()


def indent(fragment):
    """Re-indent a single-line DOM dump into something a person can read."""
    out = []
    level = 0
    # Split so every tag and every run of text is its own token.
    for token in re.split(r"(<[^>]+>)", fragment):
        if not token.strip():
            continue
        if token.startswith("</"):
            level = max(0, level - 1)
            out.append("  " * level + token)
        elif token.startswith("<"):
            out.append("  " * level + token)
            selfclosing = token.endswith("/>") or re.match(
                r"<(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)\b", token)
            if not selfclosing:
                level += 1
        else:
            out.append("  " * level + token.strip())
    return "\n".join(out)


HEADER_NOTE = """<!--
  GLOBAL GROWTH — SITE HEADER (navbar + mobile drawer)
  ===========================================================================
  GENERATED REFERENCE — do not edit by hand, and do not load this file at
  runtime. It is a snapshot of the DOM produced by
  assets/js/modules/navbar.js.

  Paths here are shown as the browser resolved them for a page served at the
  domain root. The modules themselves emit every path through url() in
  utils.js, so the same code also works from a subdirectory.

  Regenerate after changing the module. See partials/README.md.
-->
"""

FOOTER_NOTE = HEADER_NOTE.replace(
    "SITE HEADER (navbar + mobile drawer)", "SITE FOOTER").replace(
    "assets/js/modules/navbar.js", "assets/js/modules/footer.js")

header = extract("header", 'class="gg-nav')
footer = extract("footer", 'class="gg-footer')

io.open(ROOT + "/partials/header.html", "w", encoding="utf-8", newline="\n").write(
    HEADER_NOTE + indent(header) + "\n")
io.open(ROOT + "/partials/footer.html", "w", encoding="utf-8", newline="\n").write(
    FOOTER_NOTE + indent(footer) + "\n")

print("header lines:", indent(header).count("\n") + 1)
print("footer lines:", indent(footer).count("\n") + 1)
