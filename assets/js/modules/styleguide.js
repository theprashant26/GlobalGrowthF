/**
 * GLOBAL GROWTH — STYLEGUIDE RENDERER
 * ---------------------------------------------------------------------------
 * Development reference only. Never linked from site navigation.
 *
 * Renders the design system from the live values in tokens.css rather than
 * from a hand-maintained copy, so the page can never drift from the system.
 * It also computes WCAG contrast ratios and validates the sector dataset,
 * which turns the styleguide into a lightweight regression check.
 */

import { el, qs, token } from './utils.js';
import { SECTORS, ALL_DIVISIONS, DIVISION_PAGES, COUNTS } from '../data/sectors.js';
import { BRAND, EMAILS, DIVISION_EMAILS, ROADMAP, REGULATORY, GROUP_STATS } from '../data/site.js';
import { ALL_ROLES } from '../data/jobs.js';
import { sectorCard, divisionCard, statCard, leaderCard, roleCard } from './cards.js';

/* ==========================================================================
   COLOUR MATHS — WCAG 2.1 relative luminance and contrast ratio
   ========================================================================== */
const hexToRgb = hex => {
  const value = hex.replace('#', '').trim();
  const full = value.length === 3 ? value.split('').map(c => c + c).join('') : value;
  return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16));
};

const relativeLuminance = hex => {
  const [r, g, b] = hexToRgb(hex).map(channel => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (foreground, background) => {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [light, dark] = a > b ? [a, b] : [b, a];
  return (light + 0.05) / (dark + 0.05);
};

/** Best of white / ink as a legible label colour on the given background. */
const readableOn = background =>
  contrastRatio(token('--gg-white'), background) >= contrastRatio(token('--gg-ink'), background)
    ? token('--gg-white')
    : token('--gg-ink');

const ratioBadge = ratio => {
  const value = ratio.toFixed(2);
  const grade = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Large' : 'Fail';
  const state = ratio >= 4.5 ? 'pass' : ratio >= 3 ? 'warn' : 'fail';
  return el('span', { class: `sg-ratio sg-ratio--${state}` }, `${value}:1 · ${grade}`);
};

/**
 * Tokens approved to carry TEXT on a light background. Everything else is a
 * surface, a fill or an on-dark colour, so its ratio against white is
 * reference information rather than a pass/fail result — the styleguide says
 * so explicitly instead of showing an alarming "Fail" against a background
 * colour that is never used as text.
 */
const TEXT_ON_LIGHT = new Set([
  '--gg-navy-900', '--gg-navy-800', '--gg-navy-700', '--gg-navy-600', '--gg-navy-500',
  '--gg-blue-500', '--gg-teal-700', '--gg-green-700',
  '--gg-grey-500', '--gg-grey-700', '--gg-ink',
  '--gg-info', '--gg-planned', '--gg-danger'
]);

/* ==========================================================================
   TOKEN GROUPS
   ========================================================================== */
const COLOUR_GROUPS = [
  {
    title: 'Brand navy',
    note: 'The dominant colour. Roughly 60% of the visual field across the site.',
    tokens: ['--gg-navy-900', '--gg-navy-800', '--gg-navy-700', '--gg-navy-600', '--gg-navy-500']
  },
  {
    title: 'The ascent ramp',
    note: 'The logo arrow, unrolled. Every gradient in the site follows this order. These stops are for fills, arrows, icons and decorative surfaces.',
    tokens: ['--gg-blue-500', '--gg-teal-500', '--gg-green-500', '--gg-green-400', '--gg-green-300']
  },
  {
    title: 'Text-safe ramp',
    note: 'The same hues darkened to clear 4.5:1. On a light background, any green or teal that carries TEXT uses these. On dark, the -300/-400/-500 stops already pass and are used as-is.',
    tokens: ['--gg-teal-700', '--gg-green-700']
  },
  {
    title: 'Neutrals',
    note: 'Surfaces, rules and text on light backgrounds.',
    tokens: ['--gg-white', '--gg-off', '--gg-line', '--gg-grey-500', '--gg-grey-700', '--gg-ink']
  },
  {
    title: 'Semantic',
    note: 'Derived from the brand ramp. No new hues are introduced for state.',
    tokens: ['--gg-success', '--gg-info', '--gg-planned', '--gg-danger']
  }
];

const TYPE_STEPS = [
  { name: 'Hero',    cls: 'gg-hero-title', varName: '--fs-hero', sample: 'Global Growth' },
  { name: 'H1',      cls: 'gg-h1',   varName: '--fs-h1',   sample: 'One Group. Multiple Industries.' },
  { name: 'H2',      cls: 'gg-h2',   varName: '--fs-h2',   sample: 'Built across fifteen sectors' },
  { name: 'H3',      cls: 'gg-h3',   varName: '--fs-h3',   sample: 'Integrated capability, end to end' },
  { name: 'H4',      cls: 'gg-h4',   varName: '--fs-h4',   sample: 'Execution discipline' },
  { name: 'Lead',    cls: 'gg-lead', varName: '--fs-lead', sample: 'A multi-sector Indian group building operating businesses for the long term.' },
  { name: 'Body',    cls: '',        varName: '--fs-body', sample: 'Body copy runs at sixteen pixels with a 1.65 line height, tuned for sustained reading on both light and dark surfaces.' },
  { name: 'Small',   cls: 'gg-small',varName: '--fs-sm',   sample: 'Supporting detail, table cells and form help text.' },
  { name: 'Caption', cls: 'gg-xs',   varName: '--fs-xs',   sample: 'Legal notes, badges and metadata.' }
];

const SPACING = ['--sp-1','--sp-2','--sp-3','--sp-4','--sp-5','--sp-6','--sp-7','--sp-8','--sp-9','--sp-10','--sp-12','--sp-14','--sp-16'];
const RADII   = ['--gg-r-sm','--gg-r-md','--gg-r-lg','--gg-r-xl','--gg-r-pill'];
const SHADOWS = ['--gg-shadow-sm','--gg-shadow-md','--gg-shadow-lg','--gg-shadow-glow'];

/* ==========================================================================
   RENDERERS
   ========================================================================== */
const renderColours = mount => {
  COLOUR_GROUPS.forEach(group => {
    mount.append(
      el('div', { class: 'sg-group-head' }, [
        el('h3', {}, group.title),
        el('p', { class: 'gg-muted gg-small' }, group.note)
      ])
    );

    const grid = el('div', { class: 'sg-swatches' });
    group.tokens.forEach(name => {
      const value = token(name);
      const label = readableOn(value);
      const onWhite = contrastRatio(value, token('--gg-white'));

      grid.append(el('figure', { class: 'sg-swatch' }, [
        el('div', {
          class: 'sg-swatch__chip',
          style: `background:${value};color:${label};border-color:${token('--gg-line')}`
        }, el('span', { class: 'sg-swatch__hex' }, value.toUpperCase())),
        el('figcaption', {}, TEXT_ON_LIGHT.has(name)
          ? [
              el('code', {}, name),
              el('span', { class: 'sg-swatch__meta gg-xs gg-muted' }, 'as text on white:'),
              ratioBadge(onWhite)
            ]
          : [
              el('code', {}, name),
              el('span', { class: 'sg-swatch__meta gg-xs gg-muted' }, `${onWhite.toFixed(2)}:1 on white`),
              el('span', { class: 'sg-ratio sg-ratio--na' }, 'Surface / on-dark only')
            ])
      ]));
    });
    mount.append(grid);
  });

  // Gradients
  mount.append(el('div', { class: 'sg-group-head' }, [
    el('h3', {}, 'Signature gradients'),
    el('p', { class: 'gg-muted gg-small' },
      'Permitted surfaces only: hero mesh, eyebrow rule, primary CTA, sector-card hover, stat counters, scroll progress.')
  ]));

  const gradients = el('div', { class: 'sg-gradients' });
  [
    ['--gg-grad-brand',  'Brand — navy to green, the full ascent. Decorative surfaces.'],
    ['--gg-grad-accent', 'Accent — teal to green, for rules and thin fills.'],
    ['--gg-grad-dark',   'Dark — section backgrounds.'],
    ['--gg-grad-cta',    'CTA — the brand ramp with a darkened tail so white label text clears 4.5:1 at every stop.'],
    ['--gg-grad-accent-deep', 'Accent deep — text-bearing variant of the accent ramp.']
  ].forEach(([name, note]) => {
    const band = el('div', { class: 'sg-gradient__band', style: `background:${token(name)}` });
    // Text-bearing ramps are demonstrated carrying the text they exist for.
    if (name === '--gg-grad-cta' || name === '--gg-grad-accent-deep') {
      band.classList.add('sg-gradient__band--text');
      band.append(el('span', {}, 'White label text on every stop'));
    }
    gradients.append(el('figure', { class: 'sg-gradient' }, [
      band,
      el('figcaption', {}, [el('code', {}, name), el('span', { class: 'gg-xs gg-muted' }, note)])
    ]));
  });
  mount.append(gradients);
};

const renderType = mount => {
  TYPE_STEPS.forEach(step => {
    const sample = el('p', { class: step.cls }, step.sample);
    const row = el('div', { class: 'sg-type-row' }, [
      el('div', { class: 'sg-type-meta' }, [
        el('strong', {}, step.name),
        el('code', {}, step.varName),
        el('span', { class: 'sg-computed gg-xs gg-muted' }, '')
      ]),
      el('div', { class: 'sg-type-sample' }, sample)
    ]);
    mount.append(row);
    // Report the computed pixel size at the current viewport.
    requestAnimationFrame(() => {
      const px = getComputedStyle(sample).fontSize;
      qs('.sg-computed', row).textContent = `renders at ${px} · resize to see it flex`;
    });
  });
};

const renderScale = (mount, names, kind) => {
  names.forEach(name => {
    const value = token(name);
    const demo = kind === 'radius'
      ? el('div', { class: 'sg-radius-demo', style: `border-radius:${value}` })
      : el('div', { class: 'sg-space-demo', style: `inline-size:${value}` });
    mount.append(el('div', { class: 'sg-scale-row' }, [
      el('code', {}, name),
      el('span', { class: 'sg-scale-value gg-xs gg-muted' }, value),
      demo
    ]));
  });
};

const renderShadows = mount => {
  SHADOWS.forEach(name => {
    mount.append(el('figure', { class: 'sg-shadow' }, [
      el('div', { class: 'sg-shadow__box', style: `box-shadow:${token(name)}` }),
      el('figcaption', {}, el('code', {}, name))
    ]));
  });
};

/* --------------------------------------------------------------------------
   DATA AUDIT
   Validates sectors.js: unique slugs, valid status values, every division
   page accounted for, every page slug backed by a mailbox.
   -------------------------------------------------------------------------- */
const renderDataAudit = mount => {
  const problems = [];
  const seen = new Map();

  ALL_DIVISIONS.forEach(division => {
    if (!['active', 'planned'].includes(division.status)) {
      problems.push(`${division.name}: invalid status "${division.status}"`);
    }
    if (division.status === 'planned' && !division.regulator) {
      problems.push(`${division.name}: planned entity is missing a regulator`);
    }
    if (seen.has(division.slug)) {
      problems.push(`Duplicate slug "${division.slug}" (${seen.get(division.slug)} and ${division.name})`);
    }
    seen.set(division.slug, division.name);
  });

  if (DIVISION_PAGES.length !== 12) {
    problems.push(`Expected 12 division pages, found ${DIVISION_PAGES.length}`);
  }
  DIVISION_PAGES.forEach(division => {
    if (!DIVISION_EMAILS[division.slug]) {
      problems.push(`Division page "${division.slug}" has no mailbox in DIVISION_EMAILS`);
    }
  });
  Object.keys(DIVISION_EMAILS).forEach(slug => {
    if (!DIVISION_PAGES.some(d => d.slug === slug)) {
      problems.push(`Mailbox "${slug}" has no matching division page`);
    }
  });

  const plannedDivisions = ALL_DIVISIONS.filter(d => d.status === 'planned');

  mount.append(
    el('div', { class: 'sg-stats' }, [
      ['Sectors', COUNTS.sectors],
      ['Divisions', COUNTS.divisions],
      ['Division pages', COUNTS.divisionPages],
      ['Planned entities', plannedDivisions.length],
      ['Corporate mailboxes', EMAILS.length],
      ['Roadmap phases', ROADMAP.length]
    ].map(([label, value]) =>
      el('div', { class: 'sg-stat' }, [
        el('span', { class: 'sg-stat__value gg-grad-text' }, String(value)),
        el('span', { class: 'sg-stat__label gg-xs' }, label)
      ])
    ))
  );

  mount.append(el('h3', { class: 'gg-mt-6 gg-mb-2' }, 'Regulated entities flagged as planned'));
  mount.append(el('div', { class: 'sg-planned-list' },
    plannedDivisions.map(division =>
      el('div', { class: 'sg-planned-item' }, [
        el('strong', {}, division.name),
        el('span', { class: 'gg-xs gg-muted' }, `${division.sectorName} · ${division.regulator || '—'}`),
        el('span', { class: 'gg-badge gg-badge--planned' }, REGULATORY.badge)
      ])
    )
  ));

  mount.append(el('h3', { class: 'gg-mt-6 gg-mb-2' }, 'Integrity check'));
  mount.append(
    problems.length === 0
      ? el('p', { class: 'sg-audit sg-audit--pass' },
          `All checks passed. ${COUNTS.sectors} sectors, ${COUNTS.divisions} divisions, ${COUNTS.divisionPages} pages, slugs unique.`)
      : el('ul', { class: 'sg-audit sg-audit--fail' },
          problems.map(problem => el('li', {}, problem)))
  );
};

const renderSectorList = mount => {
  SECTORS.forEach(sector => {
    mount.append(el('div', { class: `sg-sector${sector.status === 'planned' ? ' is-planned' : ''}` }, [
      el('div', { class: 'sg-sector__head' }, [
        el('span', { class: 'gg-badge gg-badge--number' }, sector.number),
        // h3, not h4: each sector is a direct child of the section's h2.
        el('h3', {}, sector.name),
        el('span', {
          class: `gg-badge gg-badge--${sector.status === 'planned' ? 'planned' : 'active'}`
        }, [
          sector.status === 'planned' ? null : el('span', { class: 'gg-badge__dot' }),
          sector.status === 'planned' ? REGULATORY.badge : 'Active'
        ])
      ]),
      el('p', { class: 'gg-small gg-muted' }, sector.summary),
      el('div', { class: 'sg-sector__divisions' },
        sector.divisions.map(division =>
          el('span', {
            class: `sg-chip${division.status === 'planned' ? ' sg-chip--planned' : ''}${division.page ? ' sg-chip--page' : ''}`,
            title: division.page ? `Has a dedicated page: ${division.page}` : division.name
          }, division.name)
        )
      )
    ]));
  });
};

/* --------------------------------------------------------------------------
   CARDS
   Rendered from the real templates in cards.js and the real data, so what
   the styleguide shows is exactly what the pages will show.
   -------------------------------------------------------------------------- */

/** Leadership profiles are placeholders until the client supplies them. */
const PLACEHOLDER_LEADERS = [
  { name: '{{CHAIRMAN_NAME}}',        role: 'Chairman',                bio: 'Profile to be supplied by the client.' },
  { name: '{{MD_NAME}}',              role: 'Managing Director',       bio: 'Profile to be supplied by the client.' },
  { name: '{{DIRECTOR_OPS_NAME}}',    role: 'Director — Operations',   bio: 'Profile to be supplied by the client.' },
  { name: '{{DIRECTOR_FIN_NAME}}',    role: 'Director — Finance',      bio: 'Profile to be supplied by the client.' }
];

const renderCards = mount => {
  const active  = SECTORS.find(s => s.status === 'active');
  const planned = SECTORS.find(s => s.status === 'planned');

  const block = (title, note, html, gridClass = '') => {
    mount.append(el('div', { class: 'sg-group-head' }, [
      el('h3', {}, title),
      el('p', { class: 'gg-muted gg-small' }, note)
    ]));
    const wrap = el('div', { class: gridClass });
    wrap.innerHTML = html;
    mount.append(wrap);
  };

  block(
    'Sector card',
    'The signature component. Hover the operational card: the brand gradient sweeps in from bottom-left, the sector number scales, the arrow travels. The planned card does none of that and shows no call to action.',
    sectorCard(active) + sectorCard(planned),
    'sg-grid sg-grid--3'
  );

  block(
    'Division card',
    'Used in related-division rails and the sectors page. Twelve divisions have a dedicated page; the rest are listed without a link.',
    DIVISION_PAGES.slice(0, 4).map(divisionCard).join(''),
    'sg-grid sg-grid--2'
  );

  block(
    'Stat card',
    'The figure sits in a [data-counter] span so it can tick up on entry. Without JavaScript it simply shows the final number.',
    GROUP_STATS.map(statCard).join(''),
    'sg-grid sg-grid--4'
  );

  // Stats read better on the dark band they will actually live on
  const darkStrip = el('div', { class: 'sg-demo sg-demo--dark gg-dark' });
  const darkGrid = el('div', { class: 'sg-grid sg-grid--4 gg-full' });
  darkGrid.innerHTML = GROUP_STATS.map(statCard).join('');
  darkStrip.append(el('span', { class: 'sg-demo__label' }, 'Stat card on the dark band'), darkGrid);
  mount.append(darkStrip);

  block(
    'Leadership card',
    'Portraits are pending, so the card falls back to a monogram rather than a broken image or an empty grey box.',
    PLACEHOLDER_LEADERS.map(leaderCard).join(''),
    'sg-grid sg-grid--4'
  );

  block(
    'Position card',
    'Drives the filterable position catalogue on /careers. The third example is a planned ' +
    'division: no link, amber badge, and the primary button suppressed by .is-planned.',
    [ALL_ROLES[0], ALL_ROLES[8], ALL_ROLES.find(r => r.status === 'planned')]
      .filter(Boolean).map(roleCard).join(''),
    'sg-stack-cards'
  );
};

/* ==========================================================================
   BOOT
   ========================================================================== */
export const init = () => {
  const brandLine = qs('[data-sg="brand-line"]');
  if (brandLine) brandLine.textContent = `${BRAND.legalName} — ${BRAND.tagline}`;

  const mounts = {
    colours:  qs('[data-sg="colours"]'),
    type:     qs('[data-sg="type"]'),
    spacing:  qs('[data-sg="spacing"]'),
    radii:    qs('[data-sg="radii"]'),
    shadows:  qs('[data-sg="shadows"]'),
    cards:    qs('[data-sg="cards"]'),
    data:     qs('[data-sg="data"]'),
    sectors:  qs('[data-sg="sectors"]')
  };

  if (mounts.colours) renderColours(mounts.colours);
  if (mounts.type)    renderType(mounts.type);
  if (mounts.spacing) renderScale(mounts.spacing, SPACING, 'space');
  if (mounts.radii)   renderScale(mounts.radii, RADII, 'radius');
  if (mounts.shadows) renderShadows(mounts.shadows);
  if (mounts.cards)   renderCards(mounts.cards);
  if (mounts.data)    renderDataAudit(mounts.data);
  if (mounts.sectors) renderSectorList(mounts.sectors);

  wireFormDemo();
};

/* --------------------------------------------------------------------------
   FORM DEMO
   The styleguide shows real controls, so the file input must actually report
   the chosen file and the validation states must be reachable.
   -------------------------------------------------------------------------- */
const wireFormDemo = () => {
  const fileWrap = qs('[data-sg-file]');
  if (fileWrap) {
    const input = qs('input[type="file"]', fileWrap);
    const name = qs('.gg-file__name', fileWrap);
    input?.addEventListener('change', () => {
      const chosen = input.files?.[0];
      fileWrap.classList.toggle('has-file', Boolean(chosen));
      if (name) name.textContent = chosen ? chosen.name : 'Choose a file or drag it here';
    });
  }

  qs('[data-sg-validate]')?.addEventListener('click', () => {
    qs('[data-sg-field-error]')?.classList.toggle('is-error');
    qs('[data-sg-field-success]')?.classList.toggle('is-success');
  });
};
