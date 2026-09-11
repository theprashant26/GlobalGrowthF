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

/**
 * Footer column 2 — group pages.
 *
 * "Our Services" is the sectors page under the name a payment gateway's
 * onboarding checklist asks for. The navbar keeps "Our Sectors", which is the
 * client's own language for it; this is the same page reachable by the name a
 * reviewer will look for, not a second copy of it.
 */
export const FOOTER_LINKS = [
  { label: 'About the Group',  href: '/about' },
  { label: 'Our Services',     href: '/sectors' },
  { label: 'Growth Roadmap',   href: '/roadmap' },
  { label: 'CSR & Sustainability', href: '/csr' },
  { label: 'Careers',          href: '/careers' },
  { label: 'Contact',          href: '/contact' }
];

/**
 * Footer bottom bar — the compliance notices.
 *
 * All six are sections of a single /legal page rather than six near-empty
 * pages, and they point at real anchors, so the footer carries no dead links.
 *
 * The list is what a payment gateway checks for by name at onboarding: no
 * account is opened without a reachable refund policy, a grievance route and
 * the company's statutory identifiers. Renaming "Terms of Use" to "Terms &
 * Conditions" is for the same reason — it is the phrase on the checklist.
 *
 * The page still needs legal review before launch; every clause requiring it
 * is marked in the markup and renders as a marked gap rather than a token.
 */
export const LEGAL_LINKS = [
  { label: 'Privacy Policy',        href: '/legal#privacy' },
  { label: 'Terms & Conditions',    href: '/legal#terms' },
  { label: 'Refund & Cancellation', href: '/legal#refund' },
  { label: 'Grievance Redressal',   href: '/legal#grievance' },
  { label: 'Disclaimer',            href: '/legal#disclaimer' },
  { label: 'Corporate Information', href: '/legal#corporate' }
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
