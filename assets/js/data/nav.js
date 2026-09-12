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
 * One page each, not sections of a shared one. A payment gateway's onboarding
 * form asks for a URL per policy and a fragment of a combined page does not
 * satisfy it, so each notice has its own address; /legal is the index that
 * links them and is where anyone arriving at the old anchors still lands.
 *
 * The labels are the ones an acquirer checks for by name — which is also why
 * "Terms of Use" became "Terms & Conditions". No account is opened without a
 * reachable refund policy, a grievance route and the statutory identifiers.
 *
 * These still need legal review before launch; every term requiring it renders
 * as a marked gap rather than as a token or an invented value.
 */
export const LEGAL_LINKS = [
  { label: 'Privacy Policy',        href: '/privacy' },
  { label: 'Terms & Conditions',    href: '/terms' },
  { label: 'Refund & Cancellation', href: '/refund' },
  { label: 'Grievance Redressal',   href: '/grievance' },
  { label: 'Disclaimer',            href: '/disclaimer' },
  { label: 'Corporate Information', href: '/corporate' },
  { label: 'Certificates & Registrations', href: '/certificates' },
  // Razorpay asks for a pricing page and a delivery policy by name at
  // onboarding. Both are real pages here rather than boxes ticked: the pricing
  // table is every fee the checkout can charge, built from the notices
  // themselves, and the delivery policy says what the fee actually buys.
  { label: 'Pricing',                 href: '/pricing' },
  { label: 'Service Delivery',        href: '/service-delivery' }
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
  '/csr':      'CSR & Sustainability',
  '/legal':    'Legal & Compliance',
  ...Object.fromEntries(LEGAL_LINKS.map(link => [link.href, link.label]))
};
