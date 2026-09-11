#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Render the site in headless Chrome and report what a visitor would actually see.

    python tools/check-pages.py                 # every page, every width
    python tools/check-pages.py careers.html    # one page

The site has no build step and no test runner: the pages are ES modules that
assemble themselves in the browser, so the only honest check is to load them.
Four faults have each shipped here more than once, and this looks for all of
them:

  * a `{{PLACEHOLDER}}` rendering as visible text instead of resolving
  * horizontal overflow at phone width, usually a `white-space: nowrap` badge
    holding text that grew
  * a section left empty because a module threw while mounting
  * a page that renders almost nothing at all

HOW IT MEASURES
Chrome's `--dump-dom` prints the DOM but will not evaluate an expression, so
each page is loaded inside an iframe of the exact viewport width by a harness
page written next to it. The probe runs in that frame — where `scrollWidth`
means what it means for a real visitor — and writes its findings back into the
harness DOM, which `--dump-dom` then returns. The harness file is removed
afterwards, and so is the server: an earlier round of this work left twelve
orphaned `http.server` processes running for days on Windows, because the
`pkill` that was supposed to stop them silently matched nothing.
"""
import io, os, re, sys, json, time, socket, subprocess, tempfile, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HARNESS = os.path.join(ROOT, '_check-harness.html')
WIDTHS = [375, 768, 1024, 1440]

CHROMES = [
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
    os.path.expandvars(r'%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe'),
    '/usr/bin/google-chrome', '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
]

HARNESS_HTML = r"""<!doctype html>
<meta charset="utf-8">
<title>check</title>
<style>html,body{margin:0}iframe{border:0;display:block}</style>
<pre id="out">pending</pre>
<script>
const q = new URLSearchParams(location.search);
const width = Number(q.get('w') || 1440);
const frame = document.createElement('iframe');
frame.width = width;
frame.height = 2400;
frame.src = q.get('page');
document.body.appendChild(frame);

const report = data => { document.getElementById('out').textContent =
  'RESULT:' + JSON.stringify(data); };

const errors = [];
window.addEventListener('error', e => errors.push(String(e.message)));

frame.addEventListener('load', () => {
  // Modules mount on DOMContentLoaded and some render lazily on a later tick.
  setTimeout(() => {
    try {
      const d = frame.contentDocument, w = frame.contentWindow;
      const de = d.documentElement;
      w.addEventListener('error', e => errors.push(String(e.message)));
      const overflow = Math.max(0, de.scrollWidth - de.clientWidth);
      const wide = [];
      if (overflow > 1) {
        for (const el of d.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (!r.width || r.right <= de.clientWidth + 1) continue;
          let scrollable = false;
          for (let p = el.parentElement; p && p !== d.body; p = p.parentElement) {
            const o = w.getComputedStyle(p).overflowX;
            if (o === 'auto' || o === 'scroll') { scrollable = true; break; }
          }
          if (!scrollable) wide.push(
            el.tagName.toLowerCase() +
            (el.className ? '.' + String(el.className).trim().split(/\s+/)[0] : '') +
            ' right=' + Math.round(r.right) +
            ' "' + (el.textContent || '').trim().slice(0, 40) + '"');
        }
      }
      const text = d.body ? d.body.innerText : '';
      report({
        overflow,
        wide: wide.slice(0, 5),
        tokens: [...new Set(text.match(/\{\{[^}]{0,80}\}\}/g) || [])],
        chars: text.trim().length,
        cards: d.querySelectorAll('.gg-job-card').length,
        groups: d.querySelectorAll('.gg-div-group, details').length,
        errors: errors.slice(0, 3)
      });
    } catch (err) {
      report({ fatal: String(err) });
    }
  }, 1200);
});
setTimeout(() => { if (document.getElementById('out').textContent === 'pending')
  report({ fatal: 'timed out waiting for the page to load' }); }, 12000);
</script>
"""


def find_chrome():
    for path in CHROMES:
        if os.path.exists(path):
            return path
    found = shutil.which('google-chrome') or shutil.which('chromium')
    if found:
        return found
    raise SystemExit('Chrome not found — add its path to CHROMES in this file.')


def free_port():
    s = socket.socket()
    s.bind(('127.0.0.1', 0))
    port = s.getsockname()[1]
    s.close()
    return port


def target_pages():
    named = [a for a in sys.argv[1:] if not a.startswith('-')]
    if named:
        return named
    return sorted(f for f in os.listdir(ROOT)
                  if f.endswith('.html') and not f.startswith('_'))


def probe(chrome, port, page, width, profile):
    url = ('http://127.0.0.1:%d/_check-harness.html?page=%s&w=%d'
           % (port, page, width))
    try:
        out = subprocess.run(
            [chrome, '--headless=new', '--disable-gpu', '--no-sandbox',
             '--hide-scrollbars', '--virtual-time-budget=15000',
             '--user-data-dir=' + profile, '--window-size=%d,2400' % (width + 40),
             '--dump-dom', url],
            capture_output=True, text=True, encoding='utf-8',
            errors='replace', timeout=90)
    except subprocess.TimeoutExpired:
        return {'fatal': 'chrome timed out'}
    m = re.search(r'RESULT:(\{.*?\})</pre>', out.stdout or '', re.S)
    if not m:
        return {'fatal': 'no result (page may have failed to load)'}
    try:
        return json.loads(m.group(1))
    except ValueError as err:
        return {'fatal': 'unreadable result: %s' % err}


def main():
    chrome = find_chrome()
    port = free_port()
    profile = tempfile.mkdtemp(prefix='ggcheck-')
    io.open(HARNESS, 'w', encoding='utf-8').write(HARNESS_HTML)
    server = subprocess.Popen(
        [sys.executable, '-m', 'http.server', str(port), '--bind', '127.0.0.1'],
        cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1.0)

    pages = target_pages()
    flagged = 0
    try:
        print('checking %d page(s) at %s px\n'
              % (len(pages), ', '.join(map(str, WIDTHS))))
        for page in pages:
            notes, stats = [], {}
            for width in WIDTHS:
                r = probe(chrome, port, page, width, profile)
                stats[width] = r
                if r.get('fatal'):
                    notes.append('%dpx %s' % (width, r['fatal']))
                    continue
                if r.get('overflow', 0) > 1:
                    notes.append('%dpx overflows by %dpx: %s'
                                 % (width, r['overflow'],
                                    '; '.join(r.get('wide') or ['(no element found)'])))
                for token in r.get('tokens') or []:
                    notes.append('%dpx visible token %s' % (width, token))
                for err in r.get('errors') or []:
                    notes.append('%dpx console: %s' % (width, err[:120]))
                if r.get('chars', 0) < 400:
                    notes.append('%dpx rendered only %d chars of text'
                                 % (width, r.get('chars', 0)))
            wide = stats.get(WIDTHS[-1], {})
            summary = ('%d cards' % wide['cards']) if wide.get('cards') else ''
            flagged += bool(notes)
            print('%-26s %-5s %s' % (page, 'FAIL' if notes else 'ok', summary))
            for n in notes[:8]:
                print('    %s' % n)
    finally:
        server.terminate()
        try:
            server.wait(timeout=10)
        except Exception:
            server.kill()
        shutil.rmtree(profile, ignore_errors=True)
        if os.path.exists(HARNESS):
            os.remove(HARNESS)

    print('\n%d of %d page(s) with findings' % (flagged, len(pages)))
    sys.exit(1 if flagged else 0)


if __name__ == '__main__':
    main()
