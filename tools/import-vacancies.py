#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Parse the client's vacancy-notice document into the shape jobs.js expects.

    python tools/import-vacancies.py <doc.txt> [--json out.json]

Feed it the plain-text export of the Google Doc:

    curl -sL "https://docs.google.com/document/d/<ID>/export?format=txt" -o doc.txt

WHY A TOOL AND NOT A ONE-OFF
Batches keep arriving, and every post carries a vacancy count and an
application fee. Those are money and they are promises to real people, so
re-typing them is the wrong risk to take. Parse, read the report, then splice.

WHAT IT WILL NOT DO
It withholds notices for the four planned divisions — Banking, Pharmacy,
Finance and Insurance. Those hold no licence (RBI, State Pharmacy Council,
RBI/SEBI, IRDAI), and a vacancy notice with an application fee attached to an
unlicensed business is exactly what the regulatory rule on this site exists to
prevent. The client's own document marks these four with an asterisk. They are
counted in the report and excluded from the JSON.

WHAT THE DOCUMENT ACTUALLY LOOKS LIKE
Two layouts appear, sometimes within one division:

    Total Vacancies: 190 Posts          |   Qualification
    Application Fee: ₹185/-             |   Graduate / Postgraduate in ...
                                        |   Experience
                                        |   7–12 years of relevant ...

and field lines carry assorted leading bullets ("*", "·", "-"), while list
items are variously "*", "·", "1." or bare. So fields are read by a small state
machine rather than one regex per field — a label ends the previous field and
opens the next, whether or not it has a colon and a value on the same line.
"""
import io, os, re, sys, json, collections, unicodedata

# Division section heading -> the division id in assets/js/data/jobs.js.
# Longest first at match time, so "RENEWABLE ENERGY" beats "ENERGY".
DIVISIONS = {
    'AVIATION': 'aviation',
    'METRO': 'metro',
    'HOTELS': 'hotels',
    'HOSPITALITY': 'hotels',
    'HEALTHCARE': 'healthcare',
    'TRAVEL & TOURISM': 'travel-tourism',
    'RAILWAYS': 'railways',
    'LOGISTICS': 'logistics',
    'ELECTRICAL': 'electrical',
    'SECURITY': 'security',
    'MANUFACTURING': 'manufacturing',
    'SKILL DEVELOPMENT': 'skill-development',
    'DRIVER SERVICES': 'driver',
    'TRANSPORT OPERATIONS': 'driver',
    'BANKING': 'banking',
    'TEACHING & EDUCATION': 'teaching-education',
    'PHARMACY': 'pharmacy',
    'IT & TECHNOLOGY': 'it-technology',
    'CONSTRUCTION': 'construction',
    'INFRASTRUCTURE': 'infrastructure',
    'RENEWABLE ENERGY': 'renewable-energy',
    'ENERGY': 'energy',
    'AGRICULTURE': 'agriculture',
    'FOOD & BEVERAGES': 'food-beverages',
    'RETAIL': 'retail',
    'REAL ESTATE': 'real-estate',
    'FINANCE': 'finance',
    'INSURANCE': 'insurance',
    'CONSULTANCY': 'consultancy',
}

# No licence on file. See the module docstring.
PLANNED = {'banking', 'pharmacy', 'finance', 'insurance'}

# Single-value fields. Order matters only for readability.
FIELDS = [
    'Department', 'Job Code', 'Position', 'Employment Type', 'Total Vacancies',
    'Application Fee', 'Salary', 'Qualification', 'Educational Qualification',
    'Experience', 'Registration', 'Age Limit', 'Job Description',
]
# Fields whose value is a list of items.
LISTS = ['Required Documents', 'Key Responsibilities', 'Responsibilities']
# Labels that only introduce a group and carry no value of their own. Anything
# they introduce is dropped: "Key Skills" ends the responsibilities list, and
# "Company" is the same line on all 146 notices.
IGNORED = ['Eligibility', 'Other Requirements', 'Key Skills', 'Skills',
           'Company', 'Note']

ALL_LABELS = FIELDS + LISTS + IGNORED
LABEL_RE = re.compile(
    r'^(%s)\s*:?\s*(.*)$' % '|'.join(re.escape(l) for l in
                                     sorted(ALL_LABELS, key=len, reverse=True)),
    re.I)

# Leading bullet glyphs and list numbering the export sprinkles about.
BULLET_RE = re.compile(r'^[\s·•●*\-–—]+')
NUMBER_RE = re.compile(r'^\d+[.)]\s+')
# "12. 🏭 GLOBAL GROWTH MANUFACTURING" — tested against the line before list
# numbering is stripped, or the leading "12." would be gone by then. The client
# stars the four unlicensed divisions ("15. 🏦 GLOBAL GROWTH BANKING*").
SECTION_RE = re.compile(r'^\s*\d+[.)]\s*\W*\s*GLOBAL GROWTH\s+([A-Z&.\s]+?)\s*\*?\s*$')
WS_RE = re.compile(r'\s+')

# Lines that separate one notice from the next but title nothing. The later
# divisions head each notice with the company name and a "<X> Department" line
# before the actual position, and the export draws a rule between notices.
RULE_RE = re.compile(r'^[_\-–—=\s]{3,}$')
DEPT_LINE_RE = re.compile(r'^[\w &/\'’-]{0,40}\bDepartments?\b$', re.I)
COMPANY_RE = re.compile(r'^GLOBAL GROWTH INDUSTRIES\b', re.I)


def is_break(line):
    """A line that ends the notice above it without naming the one below."""
    return bool(RULE_RE.match(line) or COMPANY_RE.match(line)
                or DEPT_LINE_RE.match(line))


def is_title(line):
    """A plausible position heading, as opposed to a sentence in a list.

    Two of the three layouts head a notice in ALL CAPS, the third in Title
    Case, so case cannot be the test on its own — what rules a line out is
    reading like prose (it ends in a full stop) or being one of the boilerplate
    lines above. Only consulted between notices, where prose is not expected.
    """
    return (len(line) < 90 and not line.endswith(('.', ':', '!', '?'))
            and re.search(r'[A-Za-z]', line) and not is_break(line))


def ends_notice(line):
    """Whether this line means the notice above it is over.

    Deliberately stricter than `is_title`: this is consulted *inside* an open
    notice, where a false positive would truncate the responsibilities. Only a
    rule, the boilerplate header lines, or an unmistakable ALL-CAPS heading
    qualify.
    """
    return is_break(line) or (line == line.upper() and re.search(r'[A-Z]', line)
                              and len(line) < 90 and not line.endswith('.'))


def tidy(text):
    """Collapse whitespace and drop the emphasis the export leaves behind."""
    return WS_RE.sub(' ', (text or '').replace('*', '')).strip()


def strip_bullet(line):
    return NUMBER_RE.sub('', BULLET_RE.sub('', line)).strip()


def division_of(heading):
    up = tidy(heading).upper()
    for name in sorted(DIVISIONS, key=len, reverse=True):
        if name in up:
            return DIVISIONS[name]
    return None


def number(text):
    """First integer in the text, commas allowed. ₹1,50,000+ -> 150000."""
    m = re.search(r'(\d[\d,]*)', text or '')
    return int(m.group(1).replace(',', '')) if m else None


def sentence(text):
    text = tidy(text)
    return text if not text or text.endswith(('.', '!', '?', ':')) else text + '.'


def parse(text):
    # The export opens with a BOM and uses NBSP freely.
    text = text.lstrip('﻿').replace(' ', ' ')
    lines = text.split('\n')

    # Walk once. A "Job Code" line opens a post; the title is the most recent
    # heading-ish line above it that is not itself a labelled field.
    roles, current, division = [], None, None
    # Candidate heading lines seen since the last notice closed. The position
    # is the last of them — in the three-line layout the company name and the
    # "<X> Department" line come first and are filtered by `is_title`.
    candidates, pending_dept = [], None

    def close():
        if current and current.get('code'):
            roles.append(current)

    for raw in lines:
        line = raw.rstrip()
        if not line.strip():
            continue

        sec = SECTION_RE.match(tidy(line))
        if sec:
            close()
            current = None
            division = division_of(sec.group(1)) or division
            candidates = []
            continue

        bare = strip_bullet(line)
        if not bare:
            continue

        m = LABEL_RE.match(bare)
        label = m.group(1).title() if m else None

        if label == 'Job Code':
            close()
            current = {'_division': division,
                       'title': candidates[-1] if candidates else None,
                       'department': pending_dept,
                       'code': tidy(m.group(2)), '_field': None, '_list': None}
            candidates, pending_dept = [], None
            continue

        if current is None:
            # Between notices: collect heading candidates, and remember the
            # Department line — in the earlier notices it sits above the Job
            # Code that opens the block, and those predate the numbered
            # sections that supply the division everywhere else.
            if label == 'Department':
                pending_dept = tidy(m.group(2))
            elif not m and is_title(bare):
                candidates.append(tidy(bare))
            continue

        if m:
            value = tidy(m.group(2))
            current['_list'] = None
            current['_field'] = None
            if label in ('Required Documents', 'Key Responsibilities',
                         'Responsibilities'):
                key = 'documents' if label == 'Required Documents' else 'duties'
                current['_list'] = key
                current.setdefault(key, [])
            elif label in [f.title() for f in IGNORED]:
                pass
            else:
                key = label.lower().replace(' ', '_')
                if value:
                    current[key] = value
                else:
                    current['_field'] = key   # value is on the lines beneath
            continue

        # Not a label: either the continuation of a field, a list item, or the
        # start of the next notice. That check comes first even mid-list —
        # responsibilities run to the end of a notice, so without it the next
        # notice's heading is swallowed as a duty and that notice is left
        # untitled and dropped.
        if ends_notice(bare):
            close()
            current = None
            candidates = [tidy(bare)] if is_title(bare) else []
            continue

        if current.get('_list'):
            current[current['_list']].append(sentence(bare))
        elif current.get('_field'):
            key = current['_field']
            current[key] = tidy((current.get(key, '') + ' ' + bare))

    close()

    out = []
    for r in roles:
        dept = r.get('department', '')
        did = division_of(dept) or r.get('_division')
        title = tidy(r.get('position') or r.get('title') or '')
        if not (did and title):
            continue
        docs = [d for d in r.get('documents', [])
                if d.rstrip('.') not in
                ('10th Marksheet', '12th Marksheet', 'Aadhaar Card', 'PAN Card',
                 '10th Marksheet / Certificate', '12th Marksheet / Certificate')]
        out.append({
            'division': did,
            'title': title,
            'code': r.get('code', ''),
            'employmentType': r.get('employment_type', 'Full-Time'),
            'vacancies': number(r.get('total_vacancies', '')),
            'fee': number(r.get('application_fee', '')),
            'salary': tidy(r.get('salary', '')),
            'qualification': sentence(r.get('qualification')
                                      or r.get('educational_qualification', '')),
            'experience': sentence(r.get('experience', '')),
            'registration': sentence(r.get('registration', '')),
            'summary': sentence(r.get('job_description', '')),
            'duties': r.get('duties', []),
            'extraDocuments': [d.rstrip('.') for d in docs],
        })
    return out


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    roles = parse(io.open(sys.argv[1], encoding='utf-8').read())

    by = collections.OrderedDict()
    for r in roles:
        by.setdefault(r['division'], []).append(r)

    print('%-20s %5s %8s %12s %10s  %s'
          % ('DIVISION', 'ROLES', 'POSTS', 'FEE', 'COMPLETE', ''))
    print('-' * 74)
    kept = held = 0
    gaps = []
    for did, rs in by.items():
        posts = sum(r['vacancies'] or 0 for r in rs)
        fees = [r['fee'] for r in rs if r['fee']]
        full = [r for r in rs if r['vacancies'] and r['fee'] and r['salary']
                and r['qualification'] and r['duties']]
        planned = did in PLANNED
        print('%-20s %5d %8s %12s %6d/%-3d  %s'
              % (did, len(rs), format(posts, ','),
                 ('Rs %d-%d' % (min(fees), max(fees))) if fees else '-',
                 len(full), len(rs), 'WITHHELD (no licence)' if planned else ''))
        if planned:
            held += len(rs)
        else:
            kept += len(rs)
            for r in rs:
                missing = [k for k in ('vacancies', 'fee', 'salary',
                                       'qualification', 'experience', 'duties')
                           if not r[k]]
                if missing:
                    gaps.append((did, r['title'], missing))

    print()
    print('parsed    %d posts across %d divisions' % (len(roles), len(by)))
    print('usable    %d' % kept)
    print('withheld  %d  (%s)' % (held, ', '.join(sorted(PLANNED))))
    print('vacancies %s posts, fees Rs %d-%d'
          % (format(sum(r['vacancies'] or 0 for r in roles
                        if r['division'] not in PLANNED), ','),
             min(r['fee'] for r in roles if r['fee']),
             max(r['fee'] for r in roles if r['fee'])))

    if gaps:
        print('\nincomplete (%d):' % len(gaps))
        for did, title, missing in gaps:
            print('  %-18s %-38s missing %s' % (did, title[:38], ', '.join(missing)))

    if '--json' in sys.argv:
        out = sys.argv[sys.argv.index('--json') + 1]
        usable = [r for r in roles if r['division'] not in PLANNED]
        io.open(out, 'w', encoding='utf-8').write(
            json.dumps(usable, indent=2, ensure_ascii=False))
        print('\nwrote %d posts to %s' % (len(usable), out))


if __name__ == '__main__':
    main()
