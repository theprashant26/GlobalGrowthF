#!/usr/bin/env python
"""
Inject JSON-LD structured data into every page, and generate sitemap.xml.

Everything is derived from the project's own data files so the markup cannot
drift from the site. Re-run after adding a page or changing sector data.

The PostalAddress, telephone and sameAs are real: the registered office and
the three social profiles are confirmed. Keep them in step with OFFICE and
SOCIAL in assets/js/data/site.js — those are what the rendered pages use, and
structured data that disagrees with the visible page is worse than none.

Deliberate omissions:
  * No aggregateRating, foundingDate or numberOfEmployees — unverifiable.
  * No legalName identifier — the CIN is still a placeholder.
Each is listed in CLIENT_CHECKLIST.md so the client can supply real values.
"""
import re, os, json, datetime

import os
# The project root is the folder above this one, so the script runs from
# anywhere without being edited.
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://www.globalgrowthindustries.com"

# --- read the data files ----------------------------------------------------
sectors_src = open(os.path.join(ROOT, 'assets/js/data/sectors.js'), encoding='utf-8').read()
DIVISIONS = re.findall(
    r"name: '([^']+)',\s*brandName: [^,]+,\s*slug: '([^']+)',"
    r"\s*status: 'active',\s*page: '(/[^']+)'", sectors_src)

# Page → (path, title-ish crumb label). Division pages appended below.
PAGES = [
    ('index.html',    '/',         'Home'),
    ('about.html',    '/about',    'About the Group'),
    ('sectors.html',  '/sectors',  'Our Sectors'),
    ('roadmap.html',  '/roadmap',  'Growth Roadmap'),
    ('careers.html',  '/careers',  'Careers'),
    ('contact.html',  '/contact',  'Contact'),
    ('csr.html',      '/csr',      'CSR & Sustainability'),
    ('legal.html',    '/legal',    'Legal & Compliance'),
    # One page per compliance notice: a payment gateway's onboarding form asks
    # for a URL per policy, and a fragment of a shared page is not one.
    ('privacy.html',      '/privacy',      'Privacy Policy'),
    ('terms.html',        '/terms',        'Terms & Conditions'),
    ('refund.html',       '/refund',       'Refund & Cancellation Policy'),
    ('grievance.html',    '/grievance',    'Grievance Redressal'),
    ('disclaimer.html',   '/disclaimer',   'Disclaimer'),
    ('corporate.html',    '/corporate',    'Corporate Information'),
    ('certificates.html', '/certificates', 'Certificates & Registrations'),
    # The payment flow. /payment and /payment-status are steps rather than
    # documents, but they still need a canonical and a breadcrumb.
    ('pricing.html',          '/pricing',          'Pricing'),
    ('service-delivery.html', '/service-delivery', 'Service Delivery Policy'),
    ('payment.html',          '/payment',          'Application Fee Payment'),
    ('payment-status.html',   '/payment-status',   'Payment Status'),
]
for name, slug, page in DIVISIONS:
    PAGES.append((page.strip('/') + '/index.html', page.rstrip('/'), name))

ORG_ID = SITE + '/#organisation'

ORGANISATION = {
    "@type": "Organization",
    "@id": ORG_ID,
    "name": "Global Growth Industries Private Limited",
    "alternateName": "Global Growth",
    "url": SITE + "/",
    "logo": {
        "@type": "ImageObject",
        "url": SITE + "/assets/images/logo/global-growth-logo.png",
        "width": 480, "height": 358
    },
    "image": SITE + "/assets/images/og/og-default.jpg",
    "slogan": "One Group. Multiple Industries. Global Growth.",
    "description": ("A multi-sector Indian group operating across fifteen sectors including "
                    "mobility, aviation, infrastructure, healthcare, skilling, hospitality, "
                    "logistics, manufacturing, energy, technology, security, agriculture, "
                    "real estate and consulting."),
    "email": "info@globalgrowthindustries.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "2nd Floor, BMTC Complex, Kengal Hanumanthaiah Road (K.H. Road)",
        "addressLocality": "Shanti Nagar, Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560027",
        "addressCountry": "IN",
    },
    "telephone": "+91-92048-04718",
    "sameAs": [
        "https://www.linkedin.com/company/global-growth-industries-consulting/",
        "https://x.com/Globalgrowth121",
        "https://www.youtube.com/@GlobalGrowthIndustries",
        "https://www.instagram.com/globalgrowthindustries/",
    ],
    "contactPoint": [
        {"@type": "ContactPoint", "contactType": "customer support",
         "email": "contact@globalgrowthindustries.com", "areaServed": "IN",
         "availableLanguage": ["en", "hi"]},
        {"@type": "ContactPoint", "contactType": "sales",
         "email": "business@globalgrowthindustries.com", "areaServed": "IN"},
        {"@type": "ContactPoint", "contactType": "human resources",
         "email": "careers@globalgrowthindustries.com", "areaServed": "IN"},
    ],
}

WEBSITE = {
    "@type": "WebSite",
    "@id": SITE + "/#website",
    "url": SITE + "/",
    "name": "Global Growth Industries",
    "publisher": {"@id": ORG_ID},
    "inLanguage": "en-IN",
}


def breadcrumbs(path, label):
    """Home > [Our Sectors >] Page. Division pages sit under Our Sectors."""
    items = [("Home", SITE + "/")]
    if path.strip('/') and path not in ('/about', '/sectors', '/roadmap', '/careers',
                                        '/contact', '/csr', '/legal'):
        items.append(("Our Sectors", SITE + "/sectors"))
    if path != '/':
        items.append((label, SITE + path))
    return {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": n, "item": u}
            for i, (n, u) in enumerate(items)
        ],
    }


BEGIN = '<!-- JSON-LD: generated by scripts, derived from the site data. Do not hand-edit. -->'
# The marker, and the JSON-LD script after it if one is already there.
#
# The script part must be optional and must be anchored to the ld+json opening
# tag. Matching ".*?</script>" instead finds the first closing script tag after
# the marker — which on a page that carries the marker but no JSON-LD yet is
# the module tag at the foot of the document, so the whole body between them is
# replaced. That silently emptied seven newly scaffolded pages.
BLOCK = re.compile(
    re.escape(BEGIN) + r'(?:\s*<script type="application/ld\+json">.*?</script>)?',
    re.S)

written = []
for filename, path, label in PAGES:
    full = os.path.join(ROOT, filename)
    if not os.path.exists(full):
        print('  SKIP (missing):', filename)
        continue

    graph = [ORGANISATION, WEBSITE] if path == '/' else [
        {"@type": "Organization", "@id": ORG_ID,
         "name": ORGANISATION["name"], "url": SITE + "/"}
    ]
    graph.append(breadcrumbs(path, label))

    payload = {"@context": "https://schema.org", "@graph": graph}
    script = (BEGIN + '\n<script type="application/ld+json">\n'
              + json.dumps(payload, indent=2, ensure_ascii=False) + '\n</script>')

    html = open(full, encoding='utf-8').read()
    if BLOCK.search(html):
        html = BLOCK.sub(lambda _: script, html, count=1)
    else:
        html = html.replace('</head>', script + '\n</head>', 1)
    open(full, 'w', encoding='utf-8').write(html)
    written.append(filename)

print('JSON-LD written to %d pages' % len(written))

# --- sitemap ----------------------------------------------------------------
today = datetime.date.today().isoformat()
PRIORITY = {'/': '1.0', '/sectors': '0.9', '/about': '0.8', '/contact': '0.8',
            '/careers': '0.8', '/roadmap': '0.7', '/csr': '0.6', '/legal': '0.3'}

# Pages that are steps rather than documents. A sitemap says "index this", so
# listing a page that robots.txt blocks is a contradiction Search Console
# reports. /payment means nothing without a query string naming a position, and
# /payment-status is one candidate's receipt.
NOT_IN_SITEMAP = {'/payment', '/payment-status'}

urls = []
for filename, path, label in PAGES:
    if path in NOT_IN_SITEMAP:
        continue
    if not os.path.exists(os.path.join(ROOT, filename)):
        continue
    loc = SITE + ('/' if path == '/' else path)
    priority = PRIORITY.get(path, '0.7')
    urls.append(
        '  <url>\n'
        '    <loc>%s</loc>\n'
        '    <lastmod>%s</lastmod>\n'
        '    <changefreq>monthly</changefreq>\n'
        '    <priority>%s</priority>\n'
        '  </url>' % (loc, today, priority))

sitemap = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n'
           + '\n'.join(urls) + '\n</urlset>\n').replace(
               'http://www.sitemap.org', 'http://www.sitemaps.org')
open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8').write(sitemap)
print('sitemap.xml: %d URLs' % len(urls))
