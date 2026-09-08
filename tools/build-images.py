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

# Sector images were supplied straight into their served folder, so they get
# their own source/masters pair rather than sharing the one above.
SECTOR_SRC = os.path.join(ROOT, "assets/images/sectors")
SECTOR_MASTERS = os.path.join(SECTOR_SRC, "_masters")

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

# Sector imagery, keyed by the sector id in assets/js/data/sectors.js. Supplied
# at 1920x1080, which is the spec we asked for and covers every place these
# render: 381 CSS px in the homepage grid, 864 CSS px on /sectors.
SECTORS = {
    'Agriculture-&-Agri-Services.jpg.jpeg':          'agriculture',
    'Aviation.jpg.jpeg':                             'aviation',
    'Consultancy-&-Professional-Services.jpg.jpeg':  'consultancy',
    'Education-&-Skill-Development.jpg.jpeg':        'education-skill-development',
    'Energy-&-Renewables.jpg.jpeg':                  'energy',
    'Financial-Services.jpg.jpeg':                   'financial-services',
    'Healthcare-&-Pharma.jpg.jpeg':                  'healthcare-pharma',
    'Hospitality-&-Tourism.jpg.jpeg':                'hospitality-tourism',
    'Infrastructure-&-Construction.jpg.jpeg':        'infrastructure-construction',
    'Logistics-&-Supply-Chain.jpg.jpeg':             'logistics-supply-chain',
    'Manufacturing-&-Engineering.jpg.jpeg':          'manufacturing-engineering',
    'Retail.jpg.jpeg':                               'retail',
    'Security-&-Facility-Services.jpg.jpeg':         'security-facility-services',
    'Technology-&-Digital.jpg.jpeg':                 'technology-digital',
    'transport-&-mobility.jpg.jpeg':                 'transport-mobility',
}
SECTOR_WIDTHS = [480, 900, 1400]

# Framing normalisation, measured off the masters against decile guides.
#   zoom  >1 crops in, to match head size across the set
#   cx/cy the point that stays centred, as a fraction of the frame
#
# Five of the six are shot centred and head-and-shoulders. Leader-1 is the
# outlier: waist-up, subject a third of the way in from the left, and a head
# noticeably smaller than the rest. Left alone it is the one card that does not
# belong. Nothing else needs more than a nudge.
PORTRAIT_CROPS = {
    'leader-1': {'zoom': 1.30, 'cx': 0.38, 'cy': 0.34},
    'leader-2': {'zoom': 1.00, 'cx': 0.50, 'cy': 0.50},
    'leader-3': {'zoom': 1.00, 'cx': 0.52, 'cy': 0.50},
    'leader-4': {'zoom': 1.06, 'cx': 0.48, 'cy': 0.46},
    'leader-5': {'zoom': 1.00, 'cx': 0.50, 'cy': 0.50},
    'leader-6': {'zoom': 1.08, 'cx': 0.50, 'cy': 0.44},
}

# A shared grade, applied only to the portraits.
#
# The six masters were shot in six different rooms: white brick, teal seamless,
# autumn park, grey wall, blue-grey seamless, city street. Side by side in one
# grid they read as six stock photographs rather than one leadership team, and
# no amount of cropping fixes that — it is a colour problem, not a framing one.
#
# So: pull the saturation back, lift contrast slightly, and lay a few per cent
# of the brand navy over everything. That is enough for six backgrounds to
# share a cast without touching skin tones in any way a reader would notice.
#
# It is applied at build time, not in CSS, so the served file is the graded one
# and there is no filter cost on every paint. Masters are untouched; delete
# this block and re-run to get the originals back.
PORTRAIT_GRADE = {'saturation': 0.86, 'contrast': 1.05, 'tint': (4, 24, 47), 'tint_amount': 0.07}


def grade_portrait(im):
    from PIL import ImageEnhance, Image as _Image
    im = ImageEnhance.Color(im).enhance(PORTRAIT_GRADE['saturation'])
    im = ImageEnhance.Contrast(im).enhance(PORTRAIT_GRADE['contrast'])
    wash = _Image.new('RGB', im.size, PORTRAIT_GRADE['tint'])
    return _Image.blend(im, wash, PORTRAIT_GRADE['tint_amount'])


def frame(im, crop):
    """Crop to a focal point at a given zoom, staying inside the frame."""
    if crop['zoom'] <= 1.0 and crop['cx'] == 0.5 and crop['cy'] == 0.5:
        return im
    w, h = im.size
    nw, nh = w / crop['zoom'], h / crop['zoom']
    left = min(max(w * crop['cx'] - nw / 2, 0), w - nw)
    top = min(max(h * crop['cy'] - nh / 2, 0), h - nh)
    return im.crop((round(left), round(top), round(left + nw), round(top + nh)))
OG = 'Open-Graph.jpg'


def find(name):
    """Masters may already have been moved by an earlier run."""
    for folder in (SRC, MASTERS):
        path = os.path.join(folder, name)
        if os.path.exists(path):
            return path
    raise SystemExit("missing master: " + name)


def find_sector(name):
    for folder in (SECTOR_SRC, SECTOR_MASTERS):
        path = os.path.join(folder, name)
        if os.path.exists(path):
            return path
    raise SystemExit("missing sector master: " + name)


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


def variants(master, out_dir, stem, widths, ratio, prepare=None):
    im = Image.open(master).convert('RGB')
    if prepare:
        im = prepare(im)
    im = crop_to(im, ratio)
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
    prepare = lambda im, s=stem: grade_portrait(frame(im, PORTRAIT_CROPS[s]))
    files, size = variants(find(name), os.path.join(ROOT, 'assets/images/team'),
                           stem, PORTRAIT_WIDTHS, 4 / 5, prepare=prepare)
    kb = sum(os.path.getsize(f) for f in files) / 1024
    total += kb
    print('  %-18s from %-24s %dx%d  %d files  %.0f KB' % (stem, name, size[0], size[1], len(files), kb))

print('SECTOR IMAGERY  16:9')
for name, sector_id in SECTORS.items():
    files, size = variants(find_sector(name), SECTOR_SRC, sector_id, SECTOR_WIDTHS, 16 / 9)
    kb = sum(os.path.getsize(f) for f in files) / 1024
    total += kb
    print('  %-30s %dx%d  %d files  %.0f KB' % (sector_id, size[0], size[1], len(files), kb))

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

# The sector folder holds both masters and derivatives, so only the supplied
# originals move — anything this script just wrote stays where it is.
os.makedirs(SECTOR_MASTERS, exist_ok=True)
sector_moved = 0
for name in list(SECTORS):
    path = os.path.join(SECTOR_SRC, name)
    if os.path.isfile(path):
        shutil.move(path, os.path.join(SECTOR_MASTERS, name))
        sector_moved += 1
print('masters parked in sectors/_masters:', sector_moved)
print('served derivatives total: %.0f KB' % total)
