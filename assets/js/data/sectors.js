/**
 * GLOBAL GROWTH — SECTOR ARCHITECTURE
 * ---------------------------------------------------------------------------
 * The single source of truth for the group structure: 15 sectors and every
 * division beneath them.
 *
 * This file drives the homepage sector grid, the /sectors page, the navbar
 * mega-menu, the division marquee and all 12 division pages. Sector and
 * division content must NEVER be hardcoded into an HTML file — add it here
 * and let the templates render it.
 *
 * STATUS FLAGS
 *   'active'  — operational or actively being established.
 *   'planned' — a regulated line of business that requires statutory
 *               authorisation (RBI / IRDAI / SEBI / State Pharmacy Council /
 *               DGCA) and is NOT currently operational.
 *
 * Anything marked 'planned' must render with the regulatory badge, in a
 * de-emphasised state, and must never carry a services CTA. The templates
 * enforce this from the flag — do not special-case it in markup.
 */

export const SECTORS = [
  {
    number: '01',
    id: 'transport-mobility',
    name: 'Transport & Mobility',
    status: 'active',
    icon: 'mobility',
    image: '/assets/images/sectors/transport-mobility.webp',
    imageFallback: '/assets/images/sectors/transport-mobility.jpg',
    summary:
      'Moving people and goods across urban and intercity networks, from metro and rail systems to fleet and driver operations.',
    intro:
      'Mobility is where the group began and where its operating discipline is most visible. We build capability across the full ' +
      'movement chain — rolling stock support and metro systems at one end, driver supply and vehicle upkeep at the other — so ' +
      'that a single group can be accountable for a transport network rather than one slice of it.',
    divisions: [
      { name: 'Metro',               slug: 'metro',               status: 'active', page: '/metro/' },
      { name: 'Railways',            slug: 'railways',            status: 'active', page: '/railways/' },
      { name: 'Bus Services',        slug: 'bus-services',        status: 'active' },
      { name: 'Electric Mobility',   slug: 'electric-mobility',   status: 'active' },
      { name: 'Driver Services',     slug: 'driver',              status: 'active', page: '/driver/' },
      { name: 'Vehicle Services',    slug: 'vehicle-services',    status: 'active' },
      { name: 'Transport Solutions', slug: 'transport-solutions', status: 'active' }
    ]
  },

  {
    number: '02',
    id: 'aviation',
    name: 'Aviation',
    status: 'active',
    icon: 'aviation',
    image: '/assets/images/sectors/aviation.webp',
    imageFallback: '/assets/images/sectors/aviation.jpg',
    summary:
      'Airport-side services, aviation training and air cargo capability, built to the certification standards the sector demands.',
    intro:
      'Aviation rewards operators who treat compliance as the product. Our approach is to build the trained manpower, the ground ' +
      'capability and the cargo infrastructure first, and to enter each licensed activity only once the corresponding approval is ' +
      'in hand. Nothing here is offered ahead of its authorisation.',
    divisions: [
      { name: 'Aviation',          slug: 'aviation',          status: 'active', page: '/aviation/' },
      { name: 'Airport Services',  slug: 'airport-services',  status: 'active' },
      { name: 'Ground Handling',   slug: 'ground-handling',   status: 'planned', regulator: 'DGCA' },
      { name: 'Aviation Training', slug: 'aviation-training', status: 'active' },
      { name: 'Cargo Aviation',    slug: 'cargo-aviation',    status: 'active' },
      { name: 'Aircraft Services', slug: 'aircraft-services', status: 'active' }
    ]
  },

  {
    number: '03',
    id: 'infrastructure-construction',
    name: 'Infrastructure & Construction',
    status: 'active',
    icon: 'infrastructure',
    image: '/assets/images/sectors/infrastructure-construction.webp',
    imageFallback: '/assets/images/sectors/infrastructure-construction.jpg',
    summary:
      'Roads, bridges, civil works and urban development delivered with in-house engineering and project management.',
    intro:
      'Infrastructure is a test of execution, not intent. We keep civil engineering, project management and construction under ' +
      'one roof so that design decisions and site realities meet early, schedules are owned by the people who set them, and the ' +
      'client has one accountable party from mobilisation to handover.',
    divisions: [
      { name: 'Infrastructure',     slug: 'infrastructure',     status: 'active' },
      { name: 'Construction',       slug: 'construction',       status: 'active' },
      { name: 'Roads & Highways',   slug: 'roads-highways',     status: 'active' },
      { name: 'Bridges',            slug: 'bridges',            status: 'active' },
      { name: 'Civil Engineering',  slug: 'civil-engineering',  status: 'active' },
      { name: 'Urban Development',  slug: 'urban-development',  status: 'active' },
      { name: 'Project Management', slug: 'project-management', status: 'active' }
    ]
  },

  {
    number: '04',
    id: 'healthcare-pharma',
    name: 'Healthcare & Pharma',
    status: 'active',
    icon: 'healthcare',
    image: '/assets/images/sectors/healthcare-pharma.webp',
    imageFallback: '/assets/images/sectors/healthcare-pharma.jpg',
    summary:
      'Care delivery, diagnostics and medical equipment, with pharmacy and pharmaceutical lines planned under statutory licence.',
    intro:
      'Healthcare is a long-horizon commitment. We are building it from the delivery side outward — clinical services, diagnostics ' +
      'and equipment supply — because those are the capabilities that make a hospital work. Pharmacy and pharmaceutical activity ' +
      'sit behind State Pharmacy Council and drug licensing, and are shown here as planned for exactly that reason.',
    divisions: [
      { name: 'Healthcare',        slug: 'healthcare',        status: 'active', page: '/healthcare/' },
      { name: 'Hospitals',         slug: 'hospitals',         status: 'active' },
      { name: 'Diagnostics',       slug: 'diagnostics',       status: 'active' },
      { name: 'Pharmacy',          slug: 'pharmacy',          status: 'planned', regulator: 'State Pharmacy Council' },
      { name: 'Medical Equipment', slug: 'medical-equipment', status: 'active' },
      { name: 'Health Services',   slug: 'health-services',   status: 'active' },
      { name: 'Pharma',            slug: 'pharma',            status: 'planned', regulator: 'CDSCO / State Drug Authority' }
    ]
  },

  {
    number: '05',
    id: 'education-skill-development',
    name: 'Education & Skill Development',
    status: 'active',
    icon: 'education',
    image: '/assets/images/sectors/education-skill-development.webp',
    imageFallback: '/assets/images/sectors/education-skill-development.jpg',
    summary:
      'Vocational, technical and digital training that supplies skilled people to our own divisions and to the wider market.',
    intro:
      'Every other sector in this group depends on trained people, which is why skilling is not a side activity for us. We run ' +
      'training as an operating business in its own right — technical, vocational and digital — and hold it to the same standard ' +
      'as any commercial division: measurable outcomes, real placement, no inflated certification.',
    divisions: [
      { name: 'Teaching & Education', slug: 'teaching-education', status: 'active' },
      { name: 'Skill Development',    slug: 'skill-development',  status: 'active', page: '/skill-development/' },
      { name: 'Driver Training',      slug: 'driver-training',    status: 'active' },
      { name: 'Technical Training',   slug: 'technical-training', status: 'active' },
      { name: 'Vocational Training',  slug: 'vocational-training',status: 'active' },
      { name: 'Digital Education',    slug: 'digital-education',  status: 'active' },
      { name: 'Institute',            slug: 'institute',          status: 'active' },
      { name: 'Learning',             slug: 'learning',           status: 'active' }
    ]
  },

  {
    number: '06',
    id: 'hospitality-tourism',
    name: 'Hospitality & Tourism',
    status: 'active',
    icon: 'hospitality',
    image: '/assets/images/sectors/hospitality-tourism.webp',
    imageFallback: '/assets/images/sectors/hospitality-tourism.jpg',
    summary:
      'Hotels, resorts and travel operations serving business and leisure demand across Indian destinations.',
    intro:
      'India travels more every year, and the gap is rarely in demand — it is in consistency. Our hospitality and tourism ' +
      'divisions are built around a single service standard that holds whether the guest is booking a corporate stay, a managed ' +
      'tour or an event, so the group name means the same thing at every touchpoint.',
    divisions: [
      { name: 'Hotels',              slug: 'hotels',              status: 'active', page: '/hotels/' },
      { name: 'Resorts',             slug: 'resorts',             status: 'active' },
      { name: 'Travel & Tourism',    slug: 'travel-tourism',      status: 'active', page: '/travel-tourism/' },
      { name: 'Tours',               slug: 'tours',               status: 'active' },
      { name: 'Hospitality',         slug: 'hospitality',         status: 'active' },
      { name: 'Restaurant Services', slug: 'restaurant-services', status: 'active' },
      { name: 'Event Management',    slug: 'event-management',    status: 'active' }
    ]
  },

  {
    number: '07',
    id: 'logistics-supply-chain',
    name: 'Logistics & Supply Chain',
    status: 'active',
    icon: 'logistics',
    image: '/assets/images/sectors/logistics-supply-chain.webp',
    imageFallback: '/assets/images/sectors/logistics-supply-chain.jpg',
    summary:
      'Warehousing, cargo movement, cold chain and fleet management operated as one connected supply chain.',
    intro:
      'Supply chains fail at the joins — between the warehouse and the truck, the truck and the last mile, the cold room and the ' +
      'counter. Because we operate each of those links ourselves, we can be measured on the handover rather than pointing at a ' +
      'subcontractor. That is the whole argument for an integrated logistics group.',
    divisions: [
      { name: 'Logistics',        slug: 'logistics',        status: 'active', page: '/logistics/' },
      { name: 'Warehousing',      slug: 'warehousing',      status: 'active' },
      { name: 'Supply Chain',     slug: 'supply-chain',     status: 'active' },
      { name: 'Cargo',            slug: 'cargo',            status: 'active' },
      { name: 'Courier',          slug: 'courier',          status: 'active' },
      { name: 'Fleet Management', slug: 'fleet-management', status: 'active' },
      { name: 'Cold Chain',       slug: 'cold-chain',       status: 'active' }
    ]
  },

  {
    number: '08',
    id: 'manufacturing-engineering',
    name: 'Manufacturing & Engineering',
    status: 'active',
    icon: 'manufacturing',
    image: '/assets/images/sectors/manufacturing-engineering.webp',
    imageFallback: '/assets/images/sectors/manufacturing-engineering.jpg',
    summary:
      'Industrial products, electrical and electronic assemblies, machinery and automotive components built to specification.',
    intro:
      'Manufacturing anchors the group. It converts our engineering capability into physical output, gives our infrastructure and ' +
      'mobility divisions a dependable domestic supply line, and holds us to the most unforgiving standard in the business — a ' +
      'part either meets the drawing or it does not.',
    divisions: [
      { name: 'Manufacturing',          slug: 'manufacturing',          status: 'active', page: '/manufacturing/' },
      { name: 'Engineering',            slug: 'engineering',            status: 'active' },
      { name: 'Electrical',             slug: 'electrical',             status: 'active', page: '/electrical/' },
      { name: 'Electronics',            slug: 'electronics',            status: 'active' },
      { name: 'Machinery',              slug: 'machinery',              status: 'active' },
      { name: 'Automotive Components',  slug: 'automotive-components',  status: 'active' },
      { name: 'Industrial Products',    slug: 'industrial-products',    status: 'active' }
    ]
  },

  {
    number: '09',
    id: 'energy-electrical',
    name: 'Energy & Electrical',
    status: 'active',
    icon: 'energy',
    image: '/assets/images/sectors/energy-electrical.webp',
    imageFallback: '/assets/images/sectors/energy-electrical.jpg',
    summary:
      'Solar and renewable generation, power solutions and EV charging infrastructure for industrial and commercial users.',
    intro:
      'Energy is where our electrical contracting experience becomes an asset business. Solar, storage and charging infrastructure ' +
      'need the same competencies we already run — design, installation, commissioning and long-term maintenance — applied to ' +
      'assets we hold for decades rather than hand over in a month.',
    divisions: [
      { name: 'Energy',               slug: 'energy',               status: 'active' },
      { name: 'Solar',                slug: 'solar',                status: 'active' },
      { name: 'Renewable Energy',     slug: 'renewable-energy',     status: 'active' },
      { name: 'Electrical Solutions', slug: 'electrical-solutions', status: 'active' },
      { name: 'Power Solutions',      slug: 'power-solutions',      status: 'active' },
      { name: 'EV Charging',          slug: 'ev-charging',          status: 'active' }
    ]
  },

  {
    number: '10',
    id: 'technology-digital',
    name: 'Technology & Digital',
    status: 'active',
    icon: 'technology',
    image: '/assets/images/sectors/technology-digital.webp',
    imageFallback: '/assets/images/sectors/technology-digital.jpg',
    summary:
      'Software, IT services, data and cybersecurity capability that runs the group and is offered to external clients.',
    intro:
      'Our technology division earns its keep internally first. The systems that schedule our fleets, track our warehouses and ' +
      'manage our training records are built and maintained in-house — which means what we offer to clients has already survived ' +
      'contact with a real operation.',
    divisions: [
      { name: 'Technology',        slug: 'technology',        status: 'active' },
      { name: 'Software',          slug: 'software',          status: 'active' },
      { name: 'IT Services',       slug: 'it-services',       status: 'active' },
      { name: 'AI Solutions',      slug: 'ai-solutions',      status: 'active' },
      { name: 'Cybersecurity',     slug: 'cybersecurity',     status: 'active' },
      { name: 'Digital Solutions', slug: 'digital-solutions', status: 'active' },
      { name: 'Data Services',     slug: 'data-services',     status: 'active' }
    ]
  },

  {
    number: '11',
    id: 'financial-services',
    name: 'Financial Services',
    status: 'planned',
    regulator: 'RBI / SEBI / IRDAI',
    icon: 'finance',
    image: '/assets/images/sectors/financial-services.webp',
    imageFallback: '/assets/images/sectors/financial-services.jpg',
    summary:
      'A planned sector. Every line of business here requires prior statutory authorisation and none is currently operational.',
    intro:
      'Financial services form part of the group’s long-term roadmap and are shown here for transparency about our direction, ' +
      'not as an offer. Banking, lending, payments, investment and insurance are licensed activities under the Reserve Bank of ' +
      'India, SEBI and IRDAI respectively. Global Growth Industries Private Limited does not solicit, accept deposits from, or ' +
      'transact with the public in any of these areas, and will not do so unless and until the applicable licence is granted.',
    divisions: [
      { name: 'Finance',    slug: 'finance',    status: 'planned', regulator: 'RBI' },
      { name: 'Payments',   slug: 'payments',   status: 'planned', regulator: 'RBI' },
      { name: 'Investment', slug: 'investment', status: 'planned', regulator: 'SEBI' },
      { name: 'Insurance',  slug: 'insurance',  status: 'planned', regulator: 'IRDAI' },
      { name: 'Banking',    slug: 'banking',    status: 'planned', regulator: 'RBI' }
    ]
  },

  {
    number: '12',
    id: 'security-facility-services',
    name: 'Security & Facility Services',
    status: 'active',
    icon: 'security',
    image: '/assets/images/sectors/security-facility-services.webp',
    imageFallback: '/assets/images/sectors/security-facility-services.jpg',
    summary:
      'Trained security personnel, facility management and manpower services for industrial, commercial and residential sites.',
    intro:
      'Security and facility work is a people business, and people businesses are won on selection, training and supervision. ' +
      'We recruit through our own skilling division, train to a documented standard, and supervise on site rather than from a ' +
      'head office — which is what separates a managed service from a headcount supply.',
    divisions: [
      { name: 'Security',            slug: 'security',            status: 'active', page: '/security/' },
      { name: 'Facility Management', slug: 'facility-management', status: 'active' },
      { name: 'Manpower Services',   slug: 'manpower-services',   status: 'active' },
      { name: 'Housekeeping',        slug: 'housekeeping',        status: 'active' },
      { name: 'Maintenance',         slug: 'maintenance',         status: 'active' }
    ]
  },

  {
    number: '13',
    id: 'agriculture-food',
    name: 'Agriculture & Food',
    status: 'active',
    icon: 'agriculture',
    image: '/assets/images/sectors/agriculture-food.webp',
    imageFallback: '/assets/images/sectors/agriculture-food.jpg',
    summary:
      'Agri sourcing, food processing, dairy and cold storage linking producers to organised markets.',
    intro:
      'The loss in Indian agriculture happens between the field and the market. Our agri and food divisions attack that gap with ' +
      'processing capacity and cold storage backed by the group’s own cold chain and logistics — infrastructure a standalone ' +
      'food business would struggle to justify, and which we already operate.',
    divisions: [
      { name: 'Agriculture',      slug: 'agriculture',      status: 'active' },
      { name: 'Agro',             slug: 'agro',             status: 'active' },
      { name: 'Food Processing',  slug: 'food-processing',  status: 'active' },
      { name: 'Dairy',            slug: 'dairy',            status: 'active' },
      { name: 'Cold Storage',     slug: 'cold-storage',     status: 'active' },
      { name: 'Food & Beverages', slug: 'food-beverages',   status: 'active' }
    ]
  },

  {
    number: '14',
    id: 'real-estate',
    name: 'Real Estate',
    status: 'active',
    icon: 'realestate',
    image: '/assets/images/sectors/real-estate.webp',
    imageFallback: '/assets/images/sectors/real-estate.jpg',
    summary:
      'Commercial property, industrial parks and warehousing estates developed and held for the long term.',
    intro:
      'We approach real estate as an industrial landlord rather than a trader. Warehousing estates and industrial parks are ' +
      'developed against demand we can see inside our own logistics and manufacturing divisions, and held on the balance sheet ' +
      'because the value is in occupancy over years, not in the exit.',
    divisions: [
      { name: 'Real Estate',           slug: 'real-estate',           status: 'active' },
      { name: 'Property Development',  slug: 'property-development',  status: 'active' },
      { name: 'Commercial Properties', slug: 'commercial-properties', status: 'active' },
      { name: 'Warehousing Parks',     slug: 'warehousing-parks',     status: 'active' },
      { name: 'Industrial Parks',      slug: 'industrial-parks',      status: 'active' }
    ]
  },

  {
    number: '15',
    id: 'consulting-professional-services',
    name: 'Consulting & Professional Services',
    status: 'active',
    icon: 'consulting',
    image: '/assets/images/sectors/consulting-professional-services.webp',
    imageFallback: '/assets/images/sectors/consulting-professional-services.jpg',
    summary:
      'Advisory and business services drawn from operating experience across fourteen other sectors.',
    intro:
      'Our advisory practice exists because clients kept asking how we run the rest of the group. We consult on the things we ' +
      'actually do — setting up operations, building compliance frameworks, structuring workforce and supply chains — and we ' +
      'decline the engagements where we would only be repeating a textbook.',
    divisions: [
      { name: 'Consultancy',       slug: 'consultancy',       status: 'active' },
      { name: 'Advisory',          slug: 'advisory',          status: 'active' },
      { name: 'Business Services', slug: 'business-services', status: 'active' }
    ]
  }
];

/* ===========================================================================
   DERIVED HELPERS
   Everything below is computed from SECTORS. Do not maintain parallel lists.
   =========================================================================== */

/** All divisions, flattened, each carrying a back-reference to its sector. */
export const ALL_DIVISIONS = SECTORS.flatMap(sector =>
  sector.divisions.map(division => ({
    ...division,
    sectorId:     sector.id,
    sectorName:   sector.name,
    sectorNumber: sector.number,
    sectorIcon:   sector.icon
  }))
);

/** The 12 divisions that have a dedicated page. Drives the nav and marquee. */
export const DIVISION_PAGES = ALL_DIVISIONS.filter(d => Boolean(d.page));

/** Totals used by the trust strip and stats band. */
export const COUNTS = {
  sectors:        SECTORS.length,
  activeSectors:  SECTORS.filter(s => s.status === 'active').length,
  plannedSectors: SECTORS.filter(s => s.status === 'planned').length,
  divisions:      ALL_DIVISIONS.length,
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
