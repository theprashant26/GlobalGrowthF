#!/usr/bin/env python
"""
Turn the client's supplied masters into the responsive variants the site loads.

  assets/images/global/*.jpg   (masters, supplied)
    -> assets/images/divisions/<slug>-<w>.{webp,jpg}   12 division panels, 5:4
    -> assets/images/team/leader-<n>-<w>.{webp,jpg}     6 portraits, 4:5
    -> assets/images/og/og-default.jpg                  1 share image, 1200x630

WHY THESE WIDTHS
  Division panel  .gg-visual is aspect-ratio 5/4 inside .gg-split__media, which
                  is ~46vw on desktop. 700 CSS px at 2x DPR is the realistic
                  ceiling, so 1400 is the largest useful variant; the master is
                  1600 and is never served.
  Portrait        .gg-leader-card__media is aspect-ratio 4/5 capped at 420px
                  tall, so ~336 CSS px wide. 800 covers it beyond 2x.
  Share image     Facebook, LinkedIn, WhatsApp and X all want 1200x630 JPEG.
                  No WebP: several scrapers still will not read it.

Masters are moved to global/_masters/ so it is obvious they are sources and not
something a page should ever reference — the same convention as offices/.
"""
from PIL import Image
import os, shutil

import os
# The project root is the folder above this one, so the script runs from
# anywhere without being edited.
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets/images/global")
MASTERS = os.path.join(SRC, "_masters")

DIVISION_WIDTHS = [480, 900, 1400]
PORTRAIT_WIDTHS = [320, 480, 800]

# Supplied filename -> the division slug the site knows it by.
DIVISIONS = {
    'Aviation.jpg':          'aviation',
    'D-Metro.jpg':           'metro',
    'Railways.jpg':          'railways',
    'Driver-Services.jpg':   'driver',
    'Logistics.jpg':         'logistics',
    'Hotel.jpg':             'hotels',
    'Travel-&-Tourism.jpg':  'travel-tourism',
    'healthcare.jpg':        'healthcare',
    'Skill-Development.jpg': 'skill-development',
    'Electrical.jpg':        'electrical',
    'Manfuctrubng.jpg':      'manufacturing',
    'Security.jpg':          'security',
}
PORTRAITS = {'Leader-%d.jpg' % n: 'leader-%d' % n for n in range(1, 7)}
OG = 'Open-Graph.jpg'


def find(name):
    """Masters may already have been moved by an earlier run."""
    for folder in (SRC, MASTERS):
        path = os.path.join(folder, name)
        if os.path.exists(path):
            return path
    raise SystemExit("missing master: " + name)


def crop_to(im, ratio):
    """Centre-crop to an exact ratio so every panel of a kind matches."""
    w, h = im.size
    if abs(w / h - ratio) < 0.005:
        return im
    if w / h > ratio:                      # too wide: trim the sides
        new_w = round(h * ratio)
        left = (w - new_w) // 2
        return im.crop((left, 0, left + new_w, h))
    new_h = round(w / ratio)               # too tall: trim top and bottom
    top = (h - new_h) // 2
    return im.crop((0, top, w, top + new_h))


def variants(master, out_dir, stem, widths, ratio):
    im = crop_to(Image.open(master).convert('RGB'), ratio)
    os.makedirs(out_dir, exist_ok=True)
    written = []
    for w in widths:
        h = round(w / ratio)
        resized = im.resize((w, h), Image.LANCZOS)
        jpg = os.path.join(out_dir, '%s-%d.jpg' % (stem, w))
        webp = os.path.join(out_dir, '%s-%d.webp' % (stem, w))
        resized.save(jpg, 'JPEG', quality=82, optimize=True, progressive=True)
        resized.save(webp, 'WEBP', quality=78, method=6)
        written += [jpg, webp]
    return written, im.size


total = 0
print('DIVISION PANELS  5:4')
for name, slug in DIVISIONS.items():
    files, size = variants(find(name), os.path.join(ROOT, 'assets/images/divisions'),
                           slug, DIVISION_WIDTHS, 5 / 4)
    kb = sum(os.path.getsize(f) for f in files) / 1024
    total += kb
    print('  %-18s from %-24s %dx%d  %d files  %.0f KB' % (slug, name, size[0], size[1], len(files), kb))

print('PORTRAITS  4:5')
for name, stem in PORTRAITS.items():
    files, size = variants(find(name), os.path.join(ROOT, 'assets/images/team'),
                           stem, PORTRAIT_WIDTHS, 4 / 5)
    kb = sum(os.path.getsize(f) for f in files) / 1024
    total += kb
    print('  %-18s from %-24s %dx%d  %d files  %.0f KB' % (stem, name, size[0], size[1], len(files), kb))

print('SHARE IMAGE  1200x630')
og_dir = os.path.join(ROOT, 'assets/images/og')
os.makedirs(og_dir, exist_ok=True)
og_out = os.path.join(og_dir, 'og-default.jpg')
crop_to(Image.open(find(OG)).convert('RGB'), 1200 / 630) \
    .resize((1200, 630), Image.LANCZOS) \
    .save(og_out, 'JPEG', quality=86, optimize=True, progressive=True)
kb = os.path.getsize(og_out) / 1024
total += kb
print('  og-default.jpg  %.0f KB' % kb)

# --- park the masters -------------------------------------------------------
os.makedirs(MASTERS, exist_ok=True)
moved = 0
for name in os.listdir(SRC):
    path = os.path.join(SRC, name)
    if os.path.isfile(path):
        shutil.move(path, os.path.join(MASTERS, name))
        moved += 1
print('\nmasters parked in global/_masters:', moved)
print('served derivatives total: %.0f KB' % total)
