#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Export the facts the backend must agree with, as JSON.

    python tools/export-backend-contract.py [--out ../GlobalGrowthB/contract]

WHY THIS EXISTS
The backend is built in a separate repository, so it cannot read the data files
this site renders from. It still has to know, exactly:

  * what every position costs — the order endpoint computes the amount itself,
    because a payment page that posts its own price gets paid ₹1
  * which divisions are planned, so it can refuse to take money for one
  * which department an enquiry routes to
  * what the refund policy actually promises, since that is a published
    commitment the server has to honour

Re-typing any of that into a second codebase is how the two drift, and the way
they drift is that a fee changes here and the backend keeps charging the old
one. So it is exported rather than copied, and exported by rendering the real
modules in a browser rather than by parsing them with a regex — these files are
JavaScript, and a regex that reads them is a bug waiting for the next comma.

Re-run it whenever a batch of vacancy notices lands, and commit the result in
the backend repo so a change is visible in its diff.
"""
import io, os, re, sys, json, time, socket, shutil, tempfile, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_OUT = os.path.join(ROOT, 'contract')

# The bands the application form offers. They live in careers.html markup
# rather than in a data file, so they are read from there.
EXPERIENCE_BANDS_FROM = os.path.join(ROOT, 'careers.html')

PROBE = r"""
<!doctype html><meta charset="utf-8"><pre id="out">pending</pre>
<script type="module">
import { DIVISION_ROLES, ALL_ROLES, OPEN_VACANCIES, VACANCY_TOTALS,
         EMPLOYMENT_TYPE, COMPENSATION_NOTE, STANDARD_DOCUMENTS,
         APPLICATION_FEE } from './assets/js/data/jobs.js';
import { REFUND_DOCUMENT } from './assets/js/data/refund.js';
import { BRAND, OFFICE, EMAILS, DIVISION_EMAILS } from './assets/js/data/site.js';
import { GATEWAY, FEE_INCLUDES_GST, SERVICE_DELIVERY } from './assets/js/data/payment.js';

const out = {
  generated: new Date().toISOString(),
  company: {
    legalName: BRAND.legalName,
    cin: BRAND.cin,
    gstin: BRAND.gstin,
    email: BRAND.primaryEmail,
    website: BRAND.websiteUrl,
    registeredOffice: OFFICE.lines,
    phone: OFFICE.phone
  },
  payment: {
    gateway: GATEWAY.name,
    currency: GATEWAY.currency,
    feeIncludesGst: FEE_INCLUDES_GST,
    feeLow: VACANCY_TOTALS.feeLow,
    feeHigh: VACANCY_TOTALS.feeHigh
  },
  totals: VACANCY_TOTALS,
  employmentType: EMPLOYMENT_TYPE,
  compensationNote: COMPENSATION_NOTE,
  standardDocuments: STANDARD_DOCUMENTS,

  // Every division, with the flag the regulatory rule turns on.
  divisions: DIVISION_ROLES.map(d => ({
    id: d.id, name: d.division, brandName: d.brandName,
    status: d.status, regulator: d.regulator || null,
    certificate: d.certificate,
    // The rule, stated as data so the backend cannot forget it.
    acceptsApplications: d.status === 'active',
    acceptsPayment: d.status === 'active'
  })),

  // Every position. `fee` here is the only fee the server may charge.
  roles: ALL_ROLES.map(r => ({
    id: r.id,
    title: r.title,
    code: r.code || null,
    divisionId: r.divisionId,
    division: r.division,
    brandName: r.brandName,
    status: r.status,
    level: r.level,
    salary: r.salary,
    vacancies: Number.isFinite(r.vacancies) ? r.vacancies : null,
    fee: Number.isFinite(r.fee) ? r.fee : null,
    feePaise: Number.isFinite(r.fee) ? r.fee * 100 : null,
    freshers: Boolean(r.freshers),
    employmentType: r.employmentType || EMPLOYMENT_TYPE,
    documents: r.documents,
    // True only when this position may be applied for AND paid for.
    chargeable: r.status === 'active' && Number.isFinite(r.fee) && r.fee > 0
                && Number.isFinite(r.vacancies) && r.vacancies > 0
  })),

  openVacancyIds: OPEN_VACANCIES.map(r => r.id),

  applicationFee: {
    heading: APPLICATION_FEE.heading,
    intro: APPLICATION_FEE.intro,
    points: APPLICATION_FEE.points.map(p => ({ title: p.title, text: p.text })),
    grievance: APPLICATION_FEE.grievance
  },

  refundPolicy: REFUND_DOCUMENT,
  serviceDelivery: SERVICE_DELIVERY,

  routing: {
    departments: DIVISION_EMAILS,
    mailboxes: EMAILS.map(e => ({ dept: e.dept, email: e.email }))
  }
};
document.getElementById('out').textContent = 'RESULT:' + JSON.stringify(out);
</script>
"""


def find_chrome():
    candidates = [
        r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
        os.path.expandvars(r'%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe'),
        '/usr/bin/google-chrome', '/usr/bin/chromium',
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ]
    for path in candidates:
        if os.path.exists(path):
            return path
    found = shutil.which('google-chrome') or shutil.which('chromium')
    if found:
        return found
    raise SystemExit('Chrome not found.')


def free_port():
    s = socket.socket()
    s.bind(('127.0.0.1', 0))
    port = s.getsockname()[1]
    s.close()
    return port


def experience_bands():
    html = io.open(EXPERIENCE_BANDS_FROM, encoding='utf-8').read()
    block = re.search(r'id="ap-experience".*?</select>', html, re.S)
    if not block:
        return []
    return [v.strip() for v in re.findall(r'<option[^>]*>([^<]+)</option>', block.group(0))
            if 'Select' not in v]


def main():
    out_dir = DEFAULT_OUT
    if '--out' in sys.argv:
        out_dir = os.path.abspath(sys.argv[sys.argv.index('--out') + 1])

    chrome = find_chrome()
    port = free_port()
    probe_path = os.path.join(ROOT, '_contract-probe.html')
    profile = tempfile.mkdtemp(prefix='ggcontract-')
    io.open(probe_path, 'w', encoding='utf-8').write(PROBE)

    server = subprocess.Popen(
        [sys.executable, '-m', 'http.server', str(port), '--bind', '127.0.0.1'],
        cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1.0)
    try:
        result = subprocess.run(
            [chrome, '--headless=new', '--disable-gpu', '--no-sandbox',
             '--virtual-time-budget=20000', '--user-data-dir=' + profile,
             '--dump-dom', 'http://127.0.0.1:%d/_contract-probe.html' % port],
            capture_output=True, text=True, encoding='utf-8',
            errors='replace', timeout=120)
        m = re.search(r'RESULT:(\{.*?\})</pre>', result.stdout or '', re.S)
        if not m:
            raise SystemExit('the probe returned nothing — a data module failed to load')
        import html as html_mod
        data = json.loads(html_mod.unescape(m.group(1)))
    finally:
        server.terminate()
        try:
            server.wait(timeout=10)
        except Exception:
            server.kill()
        shutil.rmtree(profile, ignore_errors=True)
        if os.path.exists(probe_path):
            os.remove(probe_path)

    data['experienceBands'] = experience_bands()

    if not os.path.isdir(out_dir):
        os.makedirs(out_dir)
    path = os.path.join(out_dir, 'contract.json')
    io.open(path, 'w', encoding='utf-8').write(
        json.dumps(data, indent=2, ensure_ascii=False))

    chargeable = [r for r in data['roles'] if r['chargeable']]
    planned = [d for d in data['divisions'] if d['status'] == 'planned']
    print('wrote %s' % path)
    print('  divisions   %d  (%d planned: %s)'
          % (len(data['divisions']), len(planned),
             ', '.join(d['name'] for d in planned)))
    print('  roles       %d' % len(data['roles']))
    print('  chargeable  %d  Rs %d-%d'
          % (len(chargeable), data['payment']['feeLow'], data['payment']['feeHigh']))
    print('  posts       %s' % format(data['totals']['posts'], ','))

    bad = [r for r in data['roles'] if r['status'] == 'planned' and (r['fee'] or r['vacancies'])]
    if bad:
        raise SystemExit('REFUSING: %d planned roles carry a fee or a vacancy count' % len(bad))
    print('  planned divisions carry no fee and no vacancy — contract holds')


if __name__ == '__main__':
    main()
