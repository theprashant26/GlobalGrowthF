/**
 * GLOBAL GROWTH — NAVIGATION STRUCTURE
 * ---------------------------------------------------------------------------
 * Drives the navbar, the mega-menu, the mobile drawer and the footer.
 * Links are defined once here; no page hardcodes its own nav markup.
 *
 * Sector links in the mega-menu are NOT listed here — the menu is built from
 * sectors.js so it can never fall out of step with the group structure.
 */

/** Primary navigation. `mega: 'sectors'` renders the 15-sector panel. */
export const PRIMARY_NAV = [
  { label: 'Home',        href: '/' },
  { label: 'About',       href: '/about' },
  { label: 'Our Sectors', href: '/sectors', mega: 'sectors' },
  { label: 'Divisions',   href: '/sectors#divisions', mega: 'divisions' },
  { label: 'Roadmap',     href: '/roadmap' },
  { label: 'CSR',         href: '/csr' },
  { label: 'Careers',     href: '/careers' }
];

/** The navbar's terminal call to action. */
export const NAV_CTA = { label: 'Contact Us', href: '/contact' };

/** Footer column 2 — group pages. */
export const FOOTER_LINKS = [
  { label: 'About the Group',  href: '/about' },
  { label: 'Our Sectors',      href: '/sectors' },
  { label: 'Growth Roadmap',   href: '/roadmap' },
  { label: 'CSR & Sustainability', href: '/csr' },
  { label: 'Careers',          href: '/careers' },
  { label: 'Contact',          href: '/contact' }
];

/**
 * Footer bottom bar. All three are sections of a single /legal page rather
 * than three near-empty pages — and they point at real anchors, so the footer
 * carries no dead links. The page itself still needs legal review before
 * launch; every clause requiring it is marked in the markup.
 */
export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/legal#privacy' },
  { label: 'Terms of Use',   href: '/legal#terms' },
  { label: 'Disclaimer',     href: '/legal#disclaimer' }
];

/**
 * Breadcrumb label lookup for pages that are not division pages.
 * Division breadcrumbs are derived from sectors.js instead.
 */
export const PAGE_TITLES = {
  '/':         'Home',
  '/about':    'About the Group',
  '/sectors':  'Our Sectors',
  '/roadmap':  'Growth Roadmap',
  '/careers':  'Careers',
  '/contact':  'Contact',
  '/csr':      'CSR & Sustainability'
};
