#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Splice parsed vacancy notices into assets/js/data/jobs.js.

    python tools/import-vacancies.py doc.txt --json v.json
    python tools/merge-vacancies.py v.json            # report only
    python tools/merge-vacancies.py v.json --write    # rewrite jobs.js

WHAT IT PRESERVES
`level` and role order come from jobs.js, not from the notice. Role ids are
built positionally (`${division.id}-${index+1}`), so reordering a division
would silently repoint every existing deep link into the careers page. A
notice that matches an existing role enriches it in place; a genuinely new one
is appended. Roles the client's batch does not mention are left untouched.

WHAT IT REFUSES
Nothing lands in a division whose `status` is 'planned'. The importer already
withholds those, and this is the second lock on the same door: if a planned
division ever appears in the JSON, this stops rather than writes.
"""
import io, os, re, sys, json, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JOBS = os.path.join(ROOT, 'assets', 'js', 'data', 'jobs.js')

# The template already prints "per month" after the salary, and the four
# standard documents are added to every role by jobs.js itself.
PER_MONTH_RE = re.compile(r'\s*(?:per|/)\s*month\b', re.I)
RANGE_RE = re.compile(r'^(₹[\d,]+\+?(?:\s*[–—-]\s*₹[\d,]+\+?)?)\s*(.*)$')
PAREN_RE = re.compile(r'\s*\([^)]*\)')


def norm(title):
    """Compare titles ignoring case, punctuation and parenthetical expansions."""
    return re.sub(r'[^a-z0-9]', '', PAREN_RE.sub('', title or '').lower())


def js(value, indent):
    """Render a Python value as the JavaScript this file already uses."""
    pad = ' ' * indent
    if isinstance(value, bool):
        return 'true' if value else 'false'
    if isinstance(value, int):
        return str(value)
    if isinstance(value, list):
        if not value:
            return '[]'
        items = (',\n').join('%s  %s' % (pad, js(v, indent + 2)) for v in value)
        return '[\n%s\n%s]' % (items, pad)
    text = str(value).replace('\\', '\\\\').replace("'", "\\'")
    return "'%s'" % text


def split_salary(raw):
    """'₹18,000–₹35,000 per month + Incentives' -> range, note."""
    text = PER_MONTH_RE.sub(' ', raw or '').strip()
    m = RANGE_RE.match(text)
    if not m:
        return text, ''
    band = re.sub(r'\s*[–—-]\s*', '–', m.group(1))
    note = m.group(2).strip(' +').strip()
    return band, note


def divisions(src):
    """id -> (status, roles-array body, span of that body)."""
    found = collections.OrderedDict()
    for m in re.finditer(r"^    id: '([a-z-]+)',$", src, re.M):
        did = m.group(1)
        head = src[m.start():m.start() + 900]
        sm = re.search(r"status: '(\w+)'", head)
        try:
            i = src.index('roles: [', m.start()) + len('roles: [')
        except ValueError:
            continue
        depth, j = 1, i
        while depth:
            if src[j] == '[':
                depth += 1
            elif src[j] == ']':
                depth -= 1
            j += 1
        found[did] = (sm.group(1) if sm else 'active', src[i:j - 1], (i, j - 1))
    return found


def existing_roles(body):
    """Split a roles array into its top-level entries, preserving text."""
    out, depth, start = [], 0, None
    for k, ch in enumerate(body):
        if ch == '{':
            if depth == 0:
                start = k
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                out.append(body[start:k + 1])
    return out


def render(role, level, cert):
    """One role object, in the shape and indentation jobs.js already uses."""
    band, note = split_salary(role['salary'])
    # jobs.js appends the division certificate to every role's document list;
    # keep the client's own wording when their list already names it, rather
    # than printing the certificate twice.
    extras = [d for d in role.get('extraDocuments', []) if d]
    fields = [('title', role['title']), ('code', role['code']), ('level', level),
              ('salary', band)]
    if note:
        fields.append(('salaryNote', note))
    fields += [('vacancies', role['vacancies']), ('fee', role['fee'])]
    for key in ('qualification', 'experience', 'registration', 'summary'):
        if role.get(key):
            fields.append((key, role[key]))
    if extras:
        fields.append(('extraDocuments', extras))
    fields.append(('duties', role.get('duties', [])))

    lines = ['      {']
    lines += ['        %s: %s,' % (k, js(v, 8)) for k, v in fields]
    lines[-1] = lines[-1][:-1]
    lines.append('      }')
    return '\n'.join(lines)


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    incoming = json.load(io.open(sys.argv[1], encoding='utf-8'))
    src = io.open(JOBS, encoding='utf-8').read()
    blocks = divisions(src)

    by = collections.OrderedDict()
    for r in incoming:
        by.setdefault(r['division'], []).append(r)

    planned = [d for d in by if blocks.get(d, ('active',))[0] == 'planned']
    if planned:
        raise SystemExit('refusing to write: %s marked planned in jobs.js'
                         % ', '.join(planned))

    edits, report = [], []
    for did, roles in by.items():
        if did not in blocks:
            report.append((did, 0, 0, len(roles), 'NOT IN jobs.js — skipped'))
            continue
        status, body, (i, j) = blocks[did]
        entries = existing_roles(body)
        cert = re.search(r"certificate: '(\w+)'", src[:i][-900:])
        cert = cert.group(1) if cert else ''

        index = {}
        for pos, entry in enumerate(entries):
            tm = re.search(r"title: '((?:[^'\\]|\\.)*)'", entry)
            if tm:
                index[norm(tm.group(1).replace("\\'", "'"))] = pos

        enriched, added = 0, 0
        for role in roles:
            key = norm(role['title'])
            pos = index.get(key)
            if pos is None:  # 'Trainer' vs the existing 'Trainer / Faculty'
                hits = [p for k, p in index.items() if k.startswith(key) and key]
                pos = hits[0] if len(hits) == 1 else None
            if pos is None:
                entries.append(render(role, level_for(role), cert))
                added += 1
                continue
            lm = re.search(r"level: '(L\d+)'", entries[pos])
            tm = re.search(r"title: '((?:[^'\\]|\\.)*)'", entries[pos])
            keep = dict(role)
            keep['title'] = tm.group(1).replace("\\'", "'") if tm else role['title']
            entries[pos] = render(keep, lm.group(1) if lm else level_for(role), cert)
            enriched += 1

        edits.append((i, j, '\n' + ',\n'.join(entries) + '\n    '))
        report.append((did, len(entries), enriched, added, ''))

    print('%-20s %6s %9s %6s  %s' % ('DIVISION', 'ROLES', 'ENRICHED', 'NEW', ''))
    print('-' * 60)
    for did, total, enriched, added, note in report:
        print('%-20s %6d %9d %6d  %s' % (did, total, enriched, added, note))
    print('\n%d divisions, %d notices' % (len(report), len(incoming)))

    if '--write' not in sys.argv:
        print('\n(report only — pass --write to update jobs.js)')
        return

    for i, j, text in sorted(edits, reverse=True):
        src = src[:i] + text + src[j:]
    io.open(JOBS, 'w', encoding='utf-8', newline='\n').write(src)
    print('\nwrote %s' % os.path.relpath(JOBS, ROOT))


# Levels only matter for roles jobs.js has never seen; everything else keeps
# the level already assigned. Ordered most specific first.
LEVEL_RULES = [
    (r'\b(director|head|chief|cto|ceo)\b', 'L3'),
    (r'\bgeneral manager\b', 'L4'),
    (r'\bsenior manager\b', 'L5'),
    (r'\bmanager\b', 'L6'),
    (r'\b(senior|lead|architect)\b', 'L7'),
    (r'\b(engineer|officer|analyst|developer|consultant|counsellor|trainer|faculty|teacher|nurse|pharmacist)\b', 'L8'),
    (r'\b(supervisor|coordinator|administrator)\b', 'L9'),
    (r'\b(executive|assistant|associate|cashier)\b', 'L10'),
    (r'\b(technician|operator|driver|guard|helper|attendant|worker)\b', 'L11'),
]


def level_for(role):
    title = (role.get('title') or '').lower()
    for pattern, level in LEVEL_RULES:
        if re.search(pattern, title):
            return level
    return 'L9'


if __name__ == '__main__':
    main()
