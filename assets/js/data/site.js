import { COUNTS } from './sectors.js';

/**
 * GLOBAL GROWTH — SITE CONSTANTS
 * ---------------------------------------------------------------------------
 * Brand identity, taglines, contact directory and shared copy.
 * Every page and module reads these values from here. Nothing in this file
 * may be duplicated as a literal inside an HTML page.
 */

export const BRAND = {
  legalName:   'Global Growth Industries Private Limited',
  legalNameUC: 'GLOBAL GROWTH INDUSTRIES PRIVATE LIMITED',
  masterBrand: 'Global Growth',
  groupName:   'Global Growth Group',
  shortName:   'Global Growth',

  tagline:      'One Group. Multiple Industries. Global Growth.',
  logoTagline:  'Growing Today • Leading Tomorrow',

  website:      'www.globalgrowthindustries.com',
  websiteUrl:   'https://www.globalgrowthindustries.com',
  primaryEmail: 'info@globalgrowthindustries.com',

  /** Statutory identifiers — supplied by the client before launch. */
  cin: '{{CIN_PLACEHOLDER}}',
  gstin: '{{GSTIN_PLACEHOLDER}}',
  incorporationYear: '{{INCORPORATION_YEAR_PLACEHOLDER}}',

  /**
   * The client's supplied artwork, prepared for the site. All four are derived
   * from global-growth-logo.png:
   *   lockup / mark            for light backgrounds
   *   lockupWhite / markWhite  navy ink remapped to white for dark surfaces,
   *                            greens kept because they read on navy already
   * The supplied file is a square stacked lockup on opaque white; the white
   * has been knocked out to transparency and the artwork cropped to content.
   */
  logo: {
    lockup:      '/assets/images/logo/global-growth-logo.png',
    lockupWhite: '/assets/images/logo/global-growth-logo-white.png',
    mark:        '/assets/images/logo/global-growth-mark.png',
    markWhite:   '/assets/images/logo/global-growth-mark-white.png',
    width: 480, height: 358,
    markWidth: 160, markHeight: 160
  }
};

/** Registered office — awaiting confirmed address from the client. */
export const OFFICE = {
  label: 'Registered Office',
  lines: [
    '{{REGISTERED_OFFICE_LINE_1}}',
    '{{REGISTERED_OFFICE_LINE_2}}',
    '{{REGISTERED_OFFICE_CITY_STATE_PIN}}',
    'India'
  ],
  phone: '+91 92048 04718',
  mapEmbed: null // set once the confirmed address is available
};

/**
 * Corporate email directory — rendered as the table on /contact and used to
 * populate the enquiry-routing dropdown on the contact form.
 */
export const EMAILS = [
  { dept: 'Official / primary',  email: 'info@globalgrowthindustries.com',     note: 'Our primary published address for formal correspondence.' },
  { dept: 'General enquiries',   email: 'contact@globalgrowthindustries.com',  note: 'First point of contact for anything not covered below.' },
  { dept: 'Administration',      email: 'admin@globalgrowthindustries.com',    note: 'Office administration, vendor onboarding and facilities.' },
  { dept: 'Human Resources',     email: 'hr@globalgrowthindustries.com',       note: 'Employee relations, policy and workforce matters.' },
  { dept: 'Recruitment',         email: 'careers@globalgrowthindustries.com',  note: 'Applications, openings and campus hiring.' },
  { dept: 'Business enquiries',  email: 'business@globalgrowthindustries.com', note: 'Commercial proposals, tenders and new business.' },
  { dept: 'Legal',               email: 'legal@globalgrowthindustries.com',    note: 'Contracts, compliance and statutory notices.' },
  { dept: 'Finance & accounts',  email: 'finance@globalgrowthindustries.com',  note: 'Invoicing, payments and accounts reconciliation.' },
  { dept: 'Customer support',    email: 'support@globalgrowthindustries.com',  note: 'Service issues and post-engagement support.' }
];

/** Division mailbox map — consumed by the contact strip on each division page. */
export const DIVISION_EMAILS = {
  'aviation':          'aviation@globalgrowthindustries.com',
  'metro':             'metro@globalgrowthindustries.com',
  'hotels':            'hotels@globalgrowthindustries.com',
  'healthcare':        'healthcare@globalgrowthindustries.com',
  'travel-tourism':    'travel@globalgrowthindustries.com',
  'railways':          'railways@globalgrowthindustries.com',
  'logistics':         'logistics@globalgrowthindustries.com',
  'electrical':        'electrical@globalgrowthindustries.com',
  'security':          'security@globalgrowthindustries.com',
  'manufacturing':     'manufacturing@globalgrowthindustries.com',
  'skill-development': 'skilldevelopment@globalgrowthindustries.com',
  'driver':            'driver@globalgrowthindustries.com'
};

/**
 * Headline group figures. Structural counts derived from the sector
 * architecture, so the headline can never contradict the sector pages.
 * Anything financial or headcount-related stays a placeholder until the
 * client confirms it.
 *
 * NOTE ON THE DIVISION COUNT
 * The client brief proposed the phrase "60+ business divisions". The sector
 * architecture as supplied actually contains 93, and a visitor can count them
 * on /sectors — so the figure is read from the data rather than hardcoded.
 * To publish the conservative phrasing instead, replace COUNTS.divisions with
 * 60 and set suffix to '+'. That is the only change required.
 */
export const GROUP_STATS = [
  { value: COUNTS.sectors,   suffix: '',  label: 'Sectors of operation',   detail: 'Defined sectors spanning mobility, industry and services.' },
  { value: COUNTS.divisions, suffix: '',  label: 'Business divisions',     detail: 'Individual divisions mapped across the group structure.' },
  { value: 3,                suffix: '',  label: 'Phase growth roadmap',   detail: 'A staged build-out from foundation to full group scale.' },
  { value: 1,                suffix: '',  label: 'Unified group standard', detail: 'One governance, compliance and delivery standard across every division.' }
];

/** Statutory language reused wherever a planned entity is displayed. */
export const REGULATORY = {
  badge: 'Planned — subject to regulatory approval',
  short: 'Planned',
  footnote:
    'Certain activities shown above are planned lines of business and are not currently operational. ' +
    'These require prior authorisation from the relevant statutory authority — including the Reserve Bank of India, ' +
    'IRDAI, SEBI, the State Pharmacy Council and the DGCA, as applicable. Global Growth Industries Private Limited ' +
    'does not solicit, offer or carry on any such activity until the applicable licence or registration is in force.'
};

export const SOCIAL = [
  { name: 'LinkedIn', href: '{{LINKEDIN_URL_PLACEHOLDER}}', icon: 'linkedin' },
  { name: 'X',        href: '{{X_URL_PLACEHOLDER}}',        icon: 'x' },
  { name: 'YouTube',  href: '{{YOUTUBE_URL_PLACEHOLDER}}',  icon: 'youtube' }
];

/** Growth roadmap — drives /roadmap and the homepage teaser. */
export const ROADMAP = [
  {
    id: 'phase-1',
    number: '01',
    name: 'Foundation',
    window: 'Phase 1',
    summary:
      'Establish the operating core — service businesses that generate cash, build the workforce and prove our delivery discipline.',
    focus: ['Skill Development', 'Logistics', 'Travel & Tourism', 'Electrical & Engineering', 'Consultancy & Services']
  },
  {
    id: 'phase-2',
    number: '02',
    name: 'Expansion',
    window: 'Phase 2',
    summary:
      'Convert operating strength into asset-backed businesses, moving from services into manufacturing, care delivery and built infrastructure.',
    focus: ['Manufacturing', 'Healthcare', 'Hotels', 'Technology', 'Infrastructure', 'Security', 'Education']
  },
  {
    id: 'phase-3',
    number: '03',
    name: 'Large Group',
    window: 'Phase 3',
    summary:
      'Enter capital-intensive and licensed sectors at group scale, where credibility, balance sheet and regulatory standing are prerequisites.',
    focus: ['Aviation', 'Rail & Metro Projects', 'Energy', 'Large Infrastructure', 'Pharma', 'Financial Services', 'Banking'],
    hasRegulated: true
  }
];

/* ===========================================================================
   ABOUT-PAGE CONTENT
   Vision, mission, values, leadership and milestones.
   =========================================================================== */

export const VISION = {
  title: 'Vision',
  statement:
    'To be the Indian group that other operators are measured against — not the largest, but the one whose word on a delivery date, a safety standard or a licence is taken as settled.',
  detail:
    'Scale follows credibility in this country, not the other way round. We are building a group that earns the right to enter each new sector before it enters it.'
};

export const MISSION = {
  title: 'Mission',
  statement:
    'To build and operate businesses across fifteen sectors that reinforce one another, employ and train Indians at scale, and are governed to one standard regardless of which division carries the work.',
  detail:
    'That means owning the difficult parts — the handovers, the supervision, the compliance — rather than subcontracting them and hoping the reporting holds.'
};

export const VALUES = [
  {
    icon: 'check-circle',
    title: 'Say the true thing early',
    text:
      'A slipping date told late has already cost the client their options. We report problems while they are still problems, not after they become outcomes.'
  },
  {
    icon: 'security',
    title: 'Licence before offer',
    text:
      'We do not market a regulated activity ahead of its authorisation. This costs us enquiries today and is not negotiable.'
  },
  {
    icon: 'education',
    title: 'Train, then deploy',
    text:
      'Nobody reaches a client site on our behalf untrained. Our skilling division exists so that the standard is set before the first shift, not after the first incident.'
  },
  {
    icon: 'consulting',
    title: 'Own the whole chain',
    text:
      'Where we can hold every link ourselves we do, because accountability that can be passed sideways is not accountability.'
  },
  {
    icon: 'realestate',
    title: 'Build to hold',
    text:
      'Assets are developed against demand we can see and kept on the balance sheet. We are operators, not traders.'
  },
  {
    icon: 'mobility',
    title: 'Go where the work is',
    text:
      'Supervision happens on site. A national business run entirely from a head office is a reporting exercise, not an operation.'
  }
];

/**
 * Leadership. Every profile is a placeholder pending client copy — names,
 * biographies and portraits are all to be supplied. The cards render a
 * monogram rather than a broken image until then.
 */
export const LEADERSHIP = [
  {
    name: '{{CHAIRMAN_NAME}}',
    role: 'Chairman',
    bio: '{{CHAIRMAN_BIO — background, sector experience and the mandate held at group level.}}'
  },
  {
    name: '{{MD_NAME}}',
    role: 'Managing Director',
    bio: '{{MD_BIO — operating background and the divisions reporting into this role.}}'
  },
  {
    name: '{{DIRECTOR_OPERATIONS_NAME}}',
    role: 'Director — Operations',
    bio: '{{DIRECTOR_OPERATIONS_BIO — delivery record across mobility, logistics and facility services.}}'
  },
  {
    name: '{{DIRECTOR_FINANCE_NAME}}',
    role: 'Director — Finance',
    bio: '{{DIRECTOR_FINANCE_BIO — group finance, treasury and statutory reporting.}}'
  },
  {
    name: '{{DIRECTOR_COMPLIANCE_NAME}}',
    role: 'Director — Legal & Compliance',
    bio: '{{DIRECTOR_COMPLIANCE_BIO — licensing across regulated sectors and group governance.}}'
  },
  {
    name: '{{DIRECTOR_HR_NAME}}',
    role: 'Director — Human Resources',
    bio: '{{DIRECTOR_HR_BIO — workforce strategy, skilling pipeline and industrial relations.}}'
  }
];

/**
 * Milestones. The narrative is real; the dates are placeholders because we
 * cannot verify them. Replace each {{...}} with the confirmed year before
 * launch — do not publish an invented date.
 */
export const MILESTONES = [
  {
    year: '{{MILESTONE_INCORPORATION_YEAR}}',
    title: 'Incorporation',
    text:
      'Global Growth Industries Private Limited is incorporated, with a group structure defined from the outset around fifteen sectors rather than a single trading business.'
  },
  {
    year: '{{MILESTONE_FIRST_OPERATIONS_YEAR}}',
    title: 'First operating divisions',
    text:
      'Skill development, logistics and electrical services begin trading — the Phase 1 businesses chosen because they generate cash and build the workforce the later phases depend on.'
  },
  {
    year: '{{MILESTONE_WORKFORCE_YEAR}}',
    title: 'Skilling pipeline established',
    text:
      'Training is formalised as an operating business held to placement outcomes, and becomes the recruitment pipeline for the group\u2019s own security, driver and technical roles.'
  },
  {
    year: '{{MILESTONE_EXPANSION_YEAR}}',
    title: 'Phase 2 build-out begins',
    text:
      'The group moves from services into asset-backed businesses — manufacturing, healthcare delivery, hospitality and built infrastructure.'
  },
  {
    year: '{{MILESTONE_CURRENT_YEAR}}',
    title: 'Fifteen sectors mapped',
    text:
      'The full group architecture is published, including the licensed activities that remain planned pending statutory approval.'
  }
];

/** Governance commitments listed on the about page. */
export const GOVERNANCE = [
  'One compliance framework applied across every division, regardless of sector.',
  'No public claim about a regulated activity without the corresponding licence in force.',
  'Statutory filings and licence status tracked centrally, not left to each business.',
  'Written service standards for any division that deploys people to a client site.'
];

/* ===========================================================================
   CSR & SUSTAINABILITY
   =========================================================================== */

export const CSR_INTRO = {
  statement:
    'Our CSR is the group doing more of what it already does, for people who cannot pay for it.',
  detail:
    'We are not a foundation and we do not pretend to be. What we have is a skilling division, a healthcare division, a logistics network and a workforce spread across the country. Directed deliberately, those are worth more than a cheque — and they are harder to walk away from when a quarter goes badly.'
};

export const CSR_AREAS = [
  {
    icon: 'education',
    title: 'Skilling for employment',
    text:
      'Free vocational and driver-training places for candidates who cannot fund a course, run through our existing centres to the same standard as our paid programmes.',
    measure: 'Reported as places filled and candidates placed at six months — not as candidates enrolled.'
  },
  {
    icon: 'healthcare',
    title: 'Health access',
    text:
      'Diagnostic camps and basic health screening in the communities around our sites and training centres, staffed from our healthcare division.',
    measure: 'Reported as people screened and referrals actually completed.'
  },
  {
    icon: 'security',
    title: 'Site and road safety',
    text:
      'Road-safety training for commercial drivers beyond our own workforce, and safety education in communities near our operating sites.',
    measure: 'Reported as drivers trained and incidents recorded across our own fleet.'
  },
  {
    icon: 'energy',
    title: 'Environmental practice',
    text:
      'Solar generation at our own facilities, route optimisation to cut fleet emissions, and correct disposal of the waste our operations produce.',
    measure: 'Reported as generation installed, fuel per consignment and waste handled through authorised processors.'
  },
  {
    icon: 'agriculture',
    title: 'Rural livelihoods',
    text:
      'Cold storage and market access for smallholder producers near our food and agri facilities, reducing the loss between field and market.',
    measure: 'Reported as producers connected and volume handled.'
  },
  {
    icon: 'consulting',
    title: 'Local employment',
    text:
      'Recruiting from the communities around our sites wherever the role allows, and training locally rather than importing a workforce.',
    measure: 'Reported as the proportion of site staff hired from within the district.'
  }
];

export const CSR_PRINCIPLES = [
  {
    title: 'Capability, not cheques',
    text: 'We contribute what we are actually good at. A donation is easy to make and easy to stop; a training centre with our people in it is neither.'
  },
  {
    title: 'Numbers that can embarrass us',
    text: 'We report outcomes — placed, screened, connected — rather than inputs. Inputs always look good, which is why they get published.'
  },
  {
    title: 'Near our operations',
    text: 'Work is concentrated around our own sites and centres, so it is close enough to supervise and to be held accountable for.'
  },
  {
    title: 'Statutory obligations are a floor',
    text: 'Where Section 135 applies to the group, it is a minimum and a compliance matter — not the definition of the programme.'
  }
];

/**
 * CSR reporting figures. Deliberately left as placeholders: publishing an
 * unverified social-impact number is worse than publishing none.
 */
export const CSR_STATS = [
  { value: '{{CSR_TRAINED_PLACEHOLDER}}',   label: 'Candidates trained free of cost' },
  { value: '{{CSR_PLACED_PLACEHOLDER}}',    label: 'Placed within six months' },
  { value: '{{CSR_SCREENED_PLACEHOLDER}}',  label: 'People screened at health camps' },
  { value: '{{CSR_SOLAR_PLACEHOLDER}}',     label: 'Solar capacity at own facilities' }
];

/* ===========================================================================
   OFFICE PHOTOGRAPHY
   Client-supplied workspace photographs. Sources live in
   assets/images/offices/ as 1.jpeg … 5.jpeg (masters, not served); the
   office-N-{width}.{webp,jpg} variants beside them are what the site loads.

   `alt` describes what is actually in each frame. It is not the caption —
   a screen-reader user gets the description, everyone gets the caption.
   =========================================================================== */
export const OFFICES = [
  {
    file: 'office-1',
    width: 800, height: 600,
    alt: 'Open-plan workspace with rows of desks and task chairs, a glazed partition, and a wall graphic reading "Together we can do anything".',
    caption: 'The floor where most of the group actually works'
  },
  {
    file: 'office-2',
    width: 800, height: 600,
    alt: 'A large open office floor with banks of partitioned workstations under an exposed services ceiling.',
    caption: 'Operations and support teams share one floor'
  },
  {
    file: 'office-3',
    width: 800, height: 600,
    alt: 'Rows of workstations along a glazed wall, with monitors and task chairs at each position.',
    caption: 'Built for teams that sit together, not in silos'
  },
  {
    file: 'office-4',
    width: 800, height: 600,
    alt: 'Workspace with low-partition desks, planting between bays and a glass-walled meeting room behind.',
    caption: 'Meeting rooms open onto the floor, not away from it'
  },
  {
    file: 'office-5',
    width: 800, height: 1067,
    alt: 'A workstation bay with desks, storage and a window running the length of the wall.',
    caption: 'Daylight on every desk we can manage it on'
  }
];

/** The photo used as the standing "our workplace" image on other pages. */
export const OFFICE_HERO = OFFICES[3];
