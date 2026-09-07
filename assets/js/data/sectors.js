/**
 * GLOBAL GROWTH — GROUP ARCHITECTURE
 * ---------------------------------------------------------------------------
 * The single source of truth for the group structure.
 *
 *   GLOBAL GROWTH GROUP
 *     └── GLOBAL GROWTH INDUSTRIES PRIVATE LIMITED
 *           └── 15 sectors
 *                 └── 27 branded divisions ("Global Growth Aviation", …)
 *
 * The 27 divisions are the client's brand architecture and are the operative
 * list — each trades under its own "Global Growth …" name. The 15 sectors are
 * the grouping used for navigation and for the /sectors page; every division
 * belongs to exactly one.
 *
 * This file drives the homepage grid, /sectors, the navbar mega-menu, the
 * org tree on /about, the division marquee and every division page. Never
 * hardcode a division name into an HTML file — add it here.
 *
 * STATUS FLAGS
 *   'active'  — operational or actively being established.
 *   'planned' — a regulated line of business requiring statutory
 *               authorisation (RBI / IRDAI / SEBI / State Pharmacy Council)
 *               and NOT currently operational.
 *
 * Anything 'planned' renders with the approval badge, de-emphasised, and with
 * no call to action. The templates enforce that from the flag.
 *
 * `name`      short form, used in lists and chips        → "Aviation"
 * `brandName` the trading name, used as a page title     → "Global Growth Aviation"
 * `page`      set only where a dedicated page exists
 */

const GG = name => `Global Growth ${name}`;

export const SECTORS = [
  {
    number: '01',
    id: 'transport-mobility',
    name: 'Transport & Mobility',
    status: 'active',
    icon: 'mobility',
    summary:
      'Moving people across urban and intercity networks — metro and rail operations, and the driver workforce behind them.',
    intro:
      'Mobility is where the group began and where its operating discipline is most visible. We build capability across the ' +
      'movement chain — station and rolling-stock support at one end, driver supply and vehicle upkeep at the other — so that ' +
      'a single group can be accountable for a transport operation rather than one slice of it.',
    divisions: [
      { name: 'Metro',            brandName: GG('Metro'),            slug: 'metro',    status: 'active', page: '/metro/' },
      { name: 'Railways',         brandName: GG('Railways'),         slug: 'railways', status: 'active', page: '/railways/' },
      { name: 'Driver Services',  brandName: GG('Driver Services'),  slug: 'driver',   status: 'active', page: '/driver/' }
    ]
  },

  {
    number: '02',
    id: 'aviation',
    name: 'Aviation',
    status: 'active',
    icon: 'aviation',
    summary:
      'Airport-side services, aviation training and air cargo capability, built to the standard the regulator inspects against.',
    intro:
      'Aviation rewards operators who treat compliance as the product. Our approach is to build the trained manpower, the ground ' +
      'capability and the cargo infrastructure first, and to enter each licensed activity only once the corresponding approval ' +
      'is in hand. Nothing here is offered ahead of its authorisation.',
    divisions: [
      { name: 'Aviation', brandName: GG('Aviation'), slug: 'aviation', status: 'active', page: '/aviation/' }
    ]
  },

  {
    number: '03',
    id: 'infrastructure-construction',
    name: 'Infrastructure & Construction',
    status: 'active',
    icon: 'infrastructure',
    summary:
      'Roads, bridges, civil works, urban development and the property estates that follow them.',
    intro:
      'Infrastructure is a test of execution, not intent. We keep civil engineering, project management and construction under ' +
      'one roof so that design decisions and site realities meet early, schedules are owned by the people who set them, and the ' +
      'client has one accountable party from mobilisation to handover.',
    divisions: [
      { name: 'Construction',   brandName: GG('Construction'),   slug: 'construction',   status: 'active' },
      { name: 'Infrastructure', brandName: GG('Infrastructure'), slug: 'infrastructure', status: 'active' },
      { name: 'Real Estate',    brandName: GG('Real Estate'),    slug: 'real-estate',    status: 'active' }
    ]
  },

  {
    number: '04',
    id: 'healthcare-pharma',
    name: 'Healthcare & Pharma',
    status: 'active',
    icon: 'healthcare',
    summary:
      'Care delivery, diagnostics and medical equipment, with pharmacy planned under statutory licence.',
    intro:
      'Healthcare is a long-horizon commitment. We are building it from the delivery side outward — clinical services, ' +
      'diagnostics and equipment supply — because those are the capabilities that make a hospital work. Pharmacy sits behind ' +
      'State Pharmacy Council registration and drug licensing, and is shown here as planned for exactly that reason.',
    divisions: [
      { name: 'Healthcare', brandName: GG('Healthcare'), slug: 'healthcare', status: 'active', page: '/healthcare/' },
      { name: 'Pharmacy',   brandName: GG('Pharmacy'),   slug: 'pharmacy',   status: 'planned', regulator: 'State Pharmacy Council' }
    ]
  },

  {
    number: '05',
    id: 'education-skill-development',
    name: 'Education & Skill Development',
    status: 'active',
    icon: 'education',
    summary:
      'Vocational, technical and academic training that supplies skilled people to our own divisions and to the wider market.',
    intro:
      'Every other division in this group depends on trained people, which is why skilling is not a side activity for us. We run ' +
      'training as an operating business in its own right and hold it to the same standard as any commercial division: ' +
      'measurable outcomes, real placement, no inflated certification.',
    divisions: [
      { name: 'Skill Development',    brandName: GG('Skill Development'),    slug: 'skill-development', status: 'active', page: '/skill-development/' },
      { name: 'Teaching & Education', brandName: GG('Teaching & Education'), slug: 'teaching-education', status: 'active' }
    ]
  },

  {
    number: '06',
    id: 'hospitality-tourism',
    name: 'Hospitality & Tourism',
    status: 'active',
    icon: 'hospitality',
    summary:
      'Hotels, managed travel and food-and-beverage operations serving business and leisure demand.',
    intro:
      'India travels more every year, and the gap is rarely in demand — it is in consistency. Our hospitality divisions are built ' +
      'around a single service standard that holds whether the guest is booking a corporate stay, a managed tour or a table, so ' +
      'the group name means the same thing at every touchpoint.',
    divisions: [
      { name: 'Hotels',            brandName: GG('Hotels'),            slug: 'hotels',          status: 'active', page: '/hotels/' },
      { name: 'Travel & Tourism',  brandName: GG('Travel & Tourism'),  slug: 'travel-tourism',  status: 'active', page: '/travel-tourism/' },
      { name: 'Food & Beverages',  brandName: GG('Food & Beverages'),  slug: 'food-beverages',  status: 'active' }
    ]
  },

  {
    number: '07',
    id: 'logistics-supply-chain',
    name: 'Logistics & Supply Chain',
    status: 'active',
    icon: 'logistics',
    summary:
      'Warehousing, cargo movement, cold chain and fleet management operated as one connected supply chain.',
    intro:
      'Supply chains fail at the joins — between the warehouse and the truck, the truck and the last mile, the cold room and the ' +
      'counter. Because we operate each of those links ourselves, we can be measured on the handover rather than pointing at a ' +
      'subcontractor. That is the whole argument for an integrated logistics group.',
    divisions: [
      { name: 'Logistics', brandName: GG('Logistics'), slug: 'logistics', status: 'active', page: '/logistics/' }
    ]
  },

  {
    number: '08',
    id: 'manufacturing-engineering',
    name: 'Manufacturing & Engineering',
    status: 'active',
    icon: 'manufacturing',
    summary:
      'Industrial products, fabrication, precision components and electrical engineering built to specification.',
    intro:
      'Manufacturing anchors the group. It converts our engineering capability into physical output, gives our infrastructure and ' +
      'mobility divisions a dependable domestic supply line, and holds us to the most unforgiving standard in the business — a ' +
      'part either meets the drawing or it does not.',
    divisions: [
      { name: 'Manufacturing', brandName: GG('Manufacturing'), slug: 'manufacturing', status: 'active', page: '/manufacturing/' },
      { name: 'Electrical',    brandName: GG('Electrical'),    slug: 'electrical',    status: 'active', page: '/electrical/' }
    ]
  },

  {
    number: '09',
    id: 'energy',
    name: 'Energy & Renewables',
    status: 'active',
    icon: 'energy',
    summary:
      'Power solutions, solar generation and renewable infrastructure for industrial and commercial users.',
    intro:
      'Energy is where our electrical contracting experience becomes an asset business. Solar, storage and charging ' +
      'infrastructure need the same competencies we already run — design, installation, commissioning and long-term ' +
      'maintenance — applied to assets we hold for decades rather than hand over in a month.',
    divisions: [
      { name: 'Energy',           brandName: GG('Energy'),           slug: 'energy',           status: 'active' },
      { name: 'Renewable Energy', brandName: GG('Renewable Energy'), slug: 'renewable-energy', status: 'active' }
    ]
  },

  {
    number: '10',
    id: 'technology-digital',
    name: 'Technology & Digital',
    status: 'active',
    icon: 'technology',
    summary:
      'Software, IT services, data and cybersecurity capability that runs the group and is offered to external clients.',
    intro:
      'Our technology division earns its keep internally first. The systems that schedule our fleets, track our warehouses and ' +
      'manage our training records are built and maintained in-house — which means what we offer to clients has already ' +
      'survived contact with a real operation.',
    divisions: [
      { name: 'IT & Technology', brandName: GG('IT & Technology'), slug: 'it-technology', status: 'active' }
    ]
  },

  {
    number: '11',
    id: 'financial-services',
    name: 'Financial Services',
    status: 'planned',
    regulator: 'RBI / SEBI / IRDAI',
    icon: 'finance',
    summary:
      'A planned sector. Every line of business here requires prior statutory authorisation and none is currently operational.',
    intro:
      'Financial services form part of the group’s long-term roadmap and are shown here for transparency about our direction, ' +
      'not as an offer. Banking, lending and insurance are licensed activities under the Reserve Bank of India, SEBI and IRDAI ' +
      'respectively. Global Growth Industries Private Limited does not solicit, offer, accept deposits from, or transact with ' +
      'the public in any of these areas, and will not do so unless and until the applicable licence is granted.',
    divisions: [
      { name: 'Banking',   brandName: GG('Banking'),   slug: 'banking',   status: 'planned', regulator: 'RBI' },
      { name: 'Finance',   brandName: GG('Finance'),   slug: 'finance',   status: 'planned', regulator: 'RBI / SEBI' },
      { name: 'Insurance', brandName: GG('Insurance'), slug: 'insurance', status: 'planned', regulator: 'IRDAI' }
    ]
  },

  {
    number: '12',
    id: 'security-facility-services',
    name: 'Security & Facility Services',
    status: 'active',
    icon: 'security',
    summary:
      'Trained security personnel, facility management and manpower services for industrial, commercial and residential sites.',
    intro:
      'Security and facility work is a people business, and people businesses are won on selection, training and supervision. ' +
      'We recruit through our own skilling division, train to a documented standard, and supervise on site rather than from a ' +
      'head office — which is what separates a managed service from a headcount supply.',
    divisions: [
      { name: 'Security', brandName: GG('Security'), slug: 'security', status: 'active', page: '/security/' }
    ]
  },

  {
    number: '13',
    id: 'agriculture',
    name: 'Agriculture & Agri Services',
    status: 'active',
    icon: 'agriculture',
    summary:
      'Agri sourcing, farm advisory and produce handling linking growers to organised markets.',
    intro:
      'The loss in Indian agriculture happens between the field and the market. Our agriculture division attacks that gap with ' +
      'field advisory, aggregation and the cold chain our own logistics business already operates — infrastructure a standalone ' +
      'agri venture would struggle to justify.',
    divisions: [
      { name: 'Agriculture', brandName: GG('Agriculture'), slug: 'agriculture', status: 'active' }
    ]
  },

  {
    number: '14',
    id: 'retail',
    name: 'Retail',
    status: 'active',
    icon: 'realestate',
    summary:
      'Store operations, merchandising and inventory management across retail formats.',
    intro:
      'Retail is where a group meets the public directly, and where service standards are audited by every customer who walks ' +
      'in. We run it on the same operating discipline as the rest of the group: documented standards, trained staff and stock ' +
      'accuracy that is reported rather than assumed.',
    divisions: [
      { name: 'Retail', brandName: GG('Retail'), slug: 'retail', status: 'active' }
    ]
  },

  {
    number: '15',
    id: 'consultancy',
    name: 'Consultancy & Professional Services',
    status: 'active',
    icon: 'consulting',
    summary:
      'Advisory and business services drawn from operating experience across fourteen other sectors.',
    intro:
      'Our advisory practice exists because clients kept asking how we run the rest of the group. We consult on the things we ' +
      'actually do — setting up operations, building compliance frameworks, structuring workforce and supply chains — and we ' +
      'decline the engagements where we would only be repeating a textbook.',
    divisions: [
      { name: 'Consultancy', brandName: GG('Consultancy'), slug: 'consultancy', status: 'active' }
    ]
  }
];

/* ===========================================================================
   DERIVED HELPERS
   Everything below is computed from SECTORS. Do not maintain parallel lists.
   =========================================================================== */

/** All 27 divisions, flattened, each carrying a back-reference to its sector. */
export const ALL_DIVISIONS = SECTORS.flatMap(sector =>
  sector.divisions.map(division => ({
    ...division,
    sectorId:     sector.id,
    sectorName:   sector.name,
    sectorNumber: sector.number,
    sectorIcon:   sector.icon
  }))
);

/** Divisions with a dedicated page. Drives the nav and the marquee. */
export const DIVISION_PAGES = ALL_DIVISIONS.filter(d => Boolean(d.page));

export const COUNTS = {
  sectors:        SECTORS.length,
  activeSectors:  SECTORS.filter(s => s.status === 'active').length,
  plannedSectors: SECTORS.filter(s => s.status === 'planned').length,
  divisions:      ALL_DIVISIONS.length,
  activeDivisions:  ALL_DIVISIONS.filter(d => d.status === 'active').length,
  plannedDivisions: ALL_DIVISIONS.filter(d => d.status === 'planned').length,
  divisionPages:  DIVISION_PAGES.length
};

export const getSector = id => SECTORS.find(s => s.id === id) || null;

export const getDivision = slug => ALL_DIVISIONS.find(d => d.slug === slug) || null;

/** Sibling divisions within the same sector — powers "related divisions". */
export const getRelatedDivisions = slug => {
  const division = getDivision(slug);
  if (!division) return [];
  return ALL_DIVISIONS.filter(d => d.sectorId === division.sectorId && d.slug !== slug);
};

/** True when an entity must render the regulatory badge and suppress CTAs. */
export const isPlanned = entity => entity?.status === 'planned';
