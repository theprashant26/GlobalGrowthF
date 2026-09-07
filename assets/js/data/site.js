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

/**
 * Registered office — confirmed by the client.
 *
 * `lines` is what gets printed. The individual components below exist for the
 * PostalAddress in the JSON-LD and for the map query, so that the structured
 * data and the visible address can never drift apart.
 */
export const OFFICE = {
  label: 'Registered Office',
  lines: [
    '2nd Floor, BMTC Complex',
    'Kengal Hanumanthaiah Road (K.H. Road)',
    'Shanti Nagar, Bengaluru',
    'Karnataka 560027, India'
  ],
  street:     '2nd Floor, BMTC Complex, Kengal Hanumanthaiah Road (K.H. Road)',
  locality:   'Shanti Nagar, Bengaluru',
  region:     'Karnataka',
  postalCode: '560027',
  country:    'IN',
  countryName: 'India',
  phone: '+91 92048 04718',
  helpline: '+91 92048 04718',
  /** Used to build the "open in maps" link — no third-party embed, no cookie. */
  mapQuery: 'BMTC Complex, Kengal Hanumanthaiah Road, Shanti Nagar, Bengaluru, Karnataka 560027',
  mapEmbed: null // an embedded iframe is a client decision: it sets a third-party cookie
};

/**
 * Group certifications and registrations, as supplied by the client.
 *
 * `ref` is the registration or certificate number. Every one is a placeholder
 * because a certification claim without a verifiable number is the kind of
 * statement a regulator reads closely — supply the numbers before launch or
 * remove the entry. Where the client supplied only an acronym, the expansion
 * is marked so it can be confirmed rather than guessed.
 *
 * FOUR ENTRIES CARRY AN UNCONFIRMED NAME, and they render in the pending state
 * because of it: FEF, NCT, AA and SSC were supplied as bare acronyms, and UGC
 * was supplied without a basis. Two of those are not merely vague:
 *
 *   SSC  reads as the Staff Selection Commission to most Indian job-seekers.
 *        That is a Government of India recruitment body. On a site whose own
 *        careers notice exists to say our vacancies are NOT government
 *        employment, an unexplained "SSC" badge argues the opposite.
 *   UGC  regulates universities and degree-awarding institutions. It does not
 *        certify private limited companies, and the same careers notice
 *        specifically disclaims "university" employment.
 *
 * Neither has been dropped — that is the client's call, not ours — but neither
 * should reach a launched site without evidence behind it. Both are listed in
 * CLIENT_CHECKLIST.md.
 */
export const CERTIFICATIONS = [
  {
    abbr: 'MCA',
    name: 'Ministry of Corporate Affairs',
    detail: 'Incorporated and registered as a private limited company under the Companies Act, 2013.',
    ref: '{{CIN_PLACEHOLDER}}'
  },
  {
    abbr: 'MSME',
    name: 'Udyam Registration',
    detail: 'Registered as a Micro, Small and Medium Enterprise with the Ministry of MSME.',
    ref: '{{UDYAM_REGISTRATION_NUMBER}}'
  },
  {
    abbr: 'Startup India',
    name: 'DPIIT Recognition',
    detail: 'Recognised under the Startup India initiative of the Department for Promotion of Industry and Internal Trade.',
    ref: '{{DPIIT_RECOGNITION_NUMBER}}'
  },
  {
    abbr: 'ISO',
    name: 'ISO Certification',
    detail: 'Certified against the applicable ISO management-system standard.',
    ref: '{{ISO_STANDARD_AND_CERTIFICATE_NUMBER}}'
  },
  {
    abbr: 'IICA',
    name: 'Indian Institute of Corporate Affairs',
    detail: 'Registered with the Indian Institute of Corporate Affairs under the Ministry of Corporate Affairs.',
    ref: '{{IICA_REGISTRATION_NUMBER}}'
  },
  {
    abbr: 'NCVET',
    name: 'National Council for Vocational Education and Training',
    detail: 'Recognised under the National Council for Vocational Education and Training, the regulator for vocational training in India.',
    ref: '{{NCVET_RECOGNITION_NUMBER}}'
  },
  {
    abbr: 'NSDC',
    name: 'National Skill Development Corporation',
    detail: 'Registered as a training partner of the National Skill Development Corporation.',
    ref: '{{NSDC_TRAINING_PARTNER_ID}}'
  },
  {
    abbr: 'NSQF',
    name: 'National Skills Qualifications Framework',
    detail: 'Training programmes aligned to the National Skills Qualifications Framework under the Ministry of Skill Development and Entrepreneurship.',
    ref: '{{NSQF_ALIGNMENT_REFERENCE}}'
  },
  {
    abbr: 'SSC',
    name: '{{SSC_FULL_FORM_TO_CONFIRM}}',
    detail: 'Supplied by the client as "SSC". This has to be resolved before publication: as a Sector Skill Council it must name WHICH council, and it must not be read as the Staff Selection Commission, which is a Government of India recruitment body this company has no relationship with.',
    ref: '{{SSC_REGISTRATION_NUMBER}}'
  },
  {
    abbr: 'UGC',
    name: '{{UGC_BASIS_TO_CONFIRM}}',
    detail: 'Supplied by the client as "UGC". The University Grants Commission recognises universities and degree-awarding institutions, not private limited companies, so the basis for this entry must be established before it is published.',
    ref: '{{UGC_REFERENCE_NUMBER}}'
  },
  {
    abbr: 'AA',
    name: '{{AA_FULL_FORM_TO_CONFIRM}}',
    detail: 'Supplied by the client as "AA". Most likely an NCVET-recognised Assessment Agency, but the issuing body must be named in full before this is published.',
    ref: '{{AA_REGISTRATION_NUMBER}}'
  },
  {
    abbr: 'FEF',
    name: '{{FEF_FULL_FORM_TO_CONFIRM}}',
    detail: 'Certification supplied by the client as "FEF". The issuing body must be named in full before this is published.',
    ref: '{{FEF_REGISTRATION_NUMBER}}'
  },
  {
    abbr: 'NCT',
    name: '{{NCT_FULL_FORM_TO_CONFIRM}}',
    detail: 'Certification supplied by the client as "NCT". The issuing body must be named in full before this is published.',
    ref: '{{NCT_REGISTRATION_NUMBER}}'
  }
];

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
 * The client's brand architecture defines 27 divisions, each trading as
 * "Global Growth <name>". A visitor can count them on /sectors, so the figure
 * is read from the data rather than hardcoded — the headline can never
 * disagree with the page beneath it.
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

/**
 * Social profiles, as confirmed by the client.
 *
 * Only accounts that actually exist are listed. An inert icon in the footer
 * looks like a broken link, and a link to an unclaimed handle is worse — so
 * LinkedIn is absent rather than pending. Add it here when the page exists and
 * it appears in the footer and in the Organization JSON-LD at the same time.
 */
export const SOCIAL = [
  { name: 'X',         href: 'https://x.com/Globalgrowth121',                   icon: 'x' },
  { name: 'YouTube',   href: 'https://www.youtube.com/@GlobalGrowthIndustries', icon: 'youtube' },
  { name: 'Instagram', href: 'https://www.instagram.com/globalgrowthindustries/', icon: 'instagram' }
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
    focus: ['Skill Development', 'Logistics', 'Driver Services', 'Electrical', 'Travel & Tourism', 'Consultancy']
  },
  {
    id: 'phase-2',
    number: '02',
    name: 'Expansion',
    window: 'Phase 2',
    summary:
      'Convert operating strength into asset-backed businesses, moving from services into manufacturing, care delivery and built infrastructure.',
    focus: ['Manufacturing', 'Healthcare', 'Hotels', 'IT & Technology', 'Construction', 'Security',
             'Teaching & Education', 'Food & Beverages', 'Retail', 'Agriculture', 'Real Estate']
  },
  {
    id: 'phase-3',
    number: '03',
    name: 'Large Group',
    window: 'Phase 3',
    summary:
      'Enter capital-intensive and licensed sectors at group scale, where credibility, balance sheet and regulatory standing are prerequisites.',
    focus: ['Aviation', 'Metro', 'Railways', 'Infrastructure', 'Energy', 'Renewable Energy',
             'Pharmacy', 'Banking', 'Finance', 'Insurance'],
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
 * Leadership. Names confirmed by the client 7 September 2026.
 *
 * NO `photo` KEY ON ANY OF THESE, DELIBERATELY.
 *
 * Six stock model portraits were wired up while the names were still
 * {{PLACEHOLDER}} tokens. That was defensible: nothing on the page claimed a
 * specific person held a specific office. It stopped being defensible the
 * moment these names went in — a stock face under "Sahil Yadav, Chairman" is
 * not a placeholder, it is a false statement about a named individual, and it
 * is the sort of thing that is screenshotted rather than corrected.
 *
 * So the portraits came off with the names going on. The cards fall back to a
 * monogram, which is exactly what that fallback exists for.
 *
 * To restore photography: put the real photographs in
 * assets/images/global/_masters/ as Leader-1.jpg … Leader-6.jpg, run
 * `python tools/build-images.py`, and add `photo: 'leader-N'` back to each
 * entry in the order below. Nothing else changes.
 *
 * The stock files are still in _masters/ and the derivatives in
 * assets/images/team/ — unreferenced, so nothing serves them, and they are
 * there only so the pipeline can be tested. Delete them once real portraits
 * land.
 *
 * Biographies are still to be supplied.
 */
export const LEADERSHIP = [
  {
    name: 'Sahil Yadav',
    role: 'Chairman',
    bio: '{{CHAIRMAN_BIO — background, sector experience and the mandate held at group level.}}'
  },
  {
    name: 'Paresh Nath Sutradhar',
    role: 'Managing Director',
    bio: '{{MD_BIO — operating background and the divisions reporting into this role.}}'
  },
  {
    name: 'Lavkush Kumar',
    role: 'Director — Operations',
    bio: '{{DIRECTOR_OPERATIONS_BIO — delivery record across mobility, logistics and facility services.}}'
  },
  {
    name: 'Sagar Singh',
    role: 'Director — Finance',
    bio: '{{DIRECTOR_FINANCE_BIO — group finance, treasury and statutory reporting.}}'
  },
  {
    name: 'Ashwini Kumar',
    role: 'Director — Legal & Compliance',
    bio: '{{DIRECTOR_COMPLIANCE_BIO — licensing across regulated sectors and group governance.}}'
  },
  {
    name: 'Riya Modak',
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
