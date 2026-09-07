/**
 * GLOBAL GROWTH — WORKFORCE & CAREERS STRUCTURE
 * ---------------------------------------------------------------------------
 * The client-supplied department, position, grade and recruitment structure
 * for the group. This drives the whole of /careers.
 *
 * WHAT THIS FILE IS — AND IS NOT
 * This is the group's *position structure*: the roles each division is built
 * around, their grade, the indicative monthly range and what a candidate would
 * need to hold. It is NOT a list of live vacancies. A vacancy exists only when
 * HR issues a vacancy notice against a role, and the site says so plainly —
 * see CAREERS_DISCLAIMER, which is reproduced verbatim from the client's
 * approved wording and must not be paraphrased.
 *
 * All salary figures are the client's indicative monthly ranges. Nothing here
 * is invented; where the client supplied only an acronym (the division
 * training certificates) it is carried as the acronym rather than expanded
 * into a guess.
 *
 * REGULATORY CONTRACT
 * Banking, Pharmacy, Finance and Insurance are planned divisions pending
 * statutory authorisation. Their structures are published for transparency and
 * are flagged `status: 'planned'`; the careers page renders them without an
 * apply route and states that no recruitment is open for them. Do not remove
 * that flag to "tidy up" the filters.
 *
 * When the backend arrives this file splits: the structure stays static, and
 * live vacancies become a read from GET /api/vacancies.
 */

/* ===========================================================================
   GRADE STRUCTURE
   =========================================================================== */

/**
 * The group's twelve-level grade ladder and its indicative monthly range.
 * A role's `salary` is always the bare range; anything conditional on top of it
 * (incentives, for instance) is a separate `salaryNote`, so neither has to be
 * rendered inside a fixed-width pill.
 * Every role below carries one of these levels, so a candidate can read a
 * position against the ladder rather than against a job title alone.
 */
export const GRADE_MATRIX = [
  { level: 'L1',  designation: 'Chairman / Director',            range: 'Board-approved' },
  { level: 'L2',  designation: 'Group CEO',                      range: '₹1,00,000–₹3,00,000+' },
  { level: 'L2',  designation: 'CXO',                            range: '₹80,000–₹2,50,000+' },
  { level: 'L3',  designation: 'Business Head',                  range: '₹60,000–₹1,50,000+' },
  { level: 'L4',  designation: 'General Manager',                range: '₹50,000–₹1,00,000' },
  { level: 'L5',  designation: 'Senior Manager',                 range: '₹40,000–₹80,000' },
  { level: 'L6',  designation: 'Manager',                        range: '₹30,000–₹65,000' },
  { level: 'L7',  designation: 'Assistant Manager',              range: '₹25,000–₹50,000' },
  { level: 'L8',  designation: 'Executive / Officer',            range: '₹18,000–₹40,000' },
  { level: 'L9',  designation: 'Supervisor',                     range: '₹18,000–₹35,000' },
  { level: 'L10', designation: 'Associate / Assistant',          range: '₹15,000–₹28,000' },
  { level: 'L11', designation: 'Technician / Skilled Worker',    range: '₹16,000–₹32,000' },
  { level: 'L12', designation: 'Support Staff',                  range: '₹15,000–₹25,000' }
];

/** Short label for a grade code — used on role cards. */
export const GRADE_LABELS = GRADE_MATRIX.reduce((acc, row) => {
  if (!acc[row.level]) acc[row.level] = row.designation;
  return acc;
}, {});

/** The three tiers the ladder is organised into. */
export const CORPORATE_LEVELS = [
  {
    level: 'L1',
    name: 'Board & Ownership',
    roles: ['Chairman', 'Managing Director', 'Whole-Time Director', 'Non-Executive Director, where applicable']
  },
  {
    level: 'L2',
    name: 'Group Executive Management',
    roles: [
      'Group Chief Executive Officer',
      'Chief Operating Officer',
      'Chief Financial Officer',
      'Chief Human Resources Officer',
      'Chief Technology Officer',
      'Chief Legal & Compliance Officer',
      'Chief Marketing Officer',
      'Chief Business Officer'
    ]
  },
  {
    level: 'L3–L12',
    name: 'Business Division',
    roles: [
      'Business Head / Executive Director',
      'General Manager',
      'Senior Manager',
      'Manager',
      'Assistant Manager',
      'Executive / Officer',
      'Supervisor / Technician',
      'Associate / Assistant / Worker'
    ]
  }
];

/** The banded view of the same ladder, as the client expressed it. */
export const SALARY_BANDS = [
  { band: 'Fresher',           range: '₹15,000–₹30,000' },
  { band: 'Executive',         range: '₹18,000–₹40,000' },
  { band: 'Supervisor',        range: '₹22,000–₹40,000' },
  { band: 'Assistant Manager', range: '₹25,000–₹50,000' },
  { band: 'Manager',           range: '₹35,000–₹80,000' },
  { band: 'Senior Manager',    range: '₹50,000–₹1,00,000' },
  { band: 'Department Head',   range: '₹60,000–₹1,50,000+' },
  { band: 'Director / CXO',    range: '₹1,00,000–₹3,00,000+' }
];

/* ===========================================================================
   DOCUMENTS
   =========================================================================== */

/** Required from every candidate, at every grade, without exception. */
export const STANDARD_DOCUMENTS = [
  '10th Marksheet',
  '12th Marksheet',
  'Aadhaar Card',
  'PAN Card'
];

/* ===========================================================================
   DIVISION POSITION STRUCTURE
   27 divisions. `certificate` is the division training certificate the client
   requires alongside the four standard documents.
   =========================================================================== */

export const DIVISION_ROLES = [
  {
    id: 'aviation',
    division: 'Aviation',
    brandName: 'Global Growth Aviation',
    slug: 'aviation',
    status: 'active',
    certificate: 'AATC',
    roles: [
      {
        title: 'Aviation Business Head',
        code: 'GGIPL-AVI-BH-001',
        level: 'L3',
        salary: '₹60,000–₹1,50,000+',
        qualification: 'Graduate; aviation or travel management preferred',
        experience: '7–12 years',
        duties: [
          'Overall planning for the aviation division.',
          'Coordination with airport, airline and travel partners.',
          'Ownership of revenue and operational targets.',
          'Team management across airport-side functions.',
          'Compliance and service quality.'
        ]
      },
      {
        title: 'Airport Operations Manager',
        code: 'GGIPL-AVI-OPS-002',
        level: 'L6',
        salary: '₹40,000–₹90,000',
        qualification: 'Graduate or Diploma',
        experience: '3–7 years',
        duties: [
          'Ground operations coordination.',
          'Passenger-service management.',
          'Staff scheduling.',
          'Operational reporting.',
          'Incident escalation.'
        ]
      },
      { title: 'Airline Ticketing Manager', level: 'L6', salary: '₹30,000–₹70,000' },
      {
        title: 'Ticketing Executive',
        code: 'GGIPL-AVI-TKT-003',
        level: 'L8',
        salary: '₹18,000–₹30,000',
        qualification: '12th or Graduate',
        experience: '0–3 years',
        duties: [
          'Booking assistance.',
          'Ticket modification and cancellation support.',
          'Customer communication.',
          'Travel documentation support.'
        ]
      },
      { title: 'Ground Support Executive',   level: 'L8',  salary: '₹18,000–₹30,000' },
      { title: 'Customer Service Executive', level: 'L8',  salary: '₹18,000–₹30,000' },
      { title: 'Aviation Coordinator',       level: 'L9',  salary: '₹20,000–₹35,000' },
      { title: 'Baggage & Ramp Coordinator', level: 'L9',  salary: '₹18,000–₹35,000' }
    ]
  },

  {
    id: 'metro',
    division: 'Metro',
    brandName: 'Global Growth Metro',
    slug: 'metro',
    status: 'active',
    certificate: 'MIRTC',
    roles: [
      {
        title: 'Metro Business Head',
        level: 'L3',
        salary: '₹60,000–₹1,50,000+',
        qualification: 'Graduate, Engineering or Management',
        experience: '7+ years'
      },
      { title: 'Station Operations Manager',            level: 'L6',  salary: '₹35,000–₹70,000', qualification: 'Graduate or Diploma' },
      { title: 'Station Controller / Operations Executive', level: 'L9', salary: '₹20,000–₹40,000', qualification: '12th or Graduate as per role' },
      { title: 'Customer Service Executive',            level: 'L8',  salary: '₹18,000–₹30,000' },
      { title: 'Station Assistant',                     level: 'L10', salary: '₹24,000–₹38,000' },
      { title: 'Security Supervisor',                   level: 'L9',  salary: '₹20,000–₹35,000' },
      { title: 'Maintenance Technician',                level: 'L11', salary: '₹18,000–₹35,000', qualification: 'ITI or Diploma' }
    ]
  },

  {
    id: 'hotels',
    division: 'Hotels',
    brandName: 'Global Growth Hotels',
    slug: 'hotels',
    status: 'active',
    certificate: 'HITC',
    roles: [
      {
        title: 'Hotel General Manager',
        level: 'L4',
        salary: '₹60,000–₹1,50,000+',
        qualification: 'Hotel Management or Graduate',
        experience: '7–12 years'
      },
      { title: 'Operations Manager',        level: 'L6',  salary: '₹35,000–₹75,000' },
      { title: 'Front Office Manager',      level: 'L6',  salary: '₹30,000–₹60,000' },
      { title: 'Front Office Executive',    level: 'L8',  salary: '₹18,000–₹30,000', qualification: '12th or Graduate' },
      { title: 'Housekeeping Supervisor',   level: 'L9',  salary: '₹20,000–₹35,000' },
      { title: 'Chef / Cook',               level: 'L11', salary: '₹18,000–₹50,000' },
      { title: 'Guest Relations Executive', level: 'L8',  salary: '₹18,000–₹35,000' }
    ]
  },

  {
    id: 'healthcare',
    division: 'Healthcare',
    brandName: 'Global Growth Healthcare',
    slug: 'healthcare',
    status: 'active',
    certificate: 'MITC',
    roles: [
      { title: 'Healthcare Business Head',            level: 'L3',  salary: '₹60,000–₹1,50,000+' },
      { title: 'Hospital / Healthcare Administrator', level: 'L5',  salary: '₹35,000–₹80,000', qualification: 'Healthcare or Hospital Administration, or Graduate' },
      { title: 'Healthcare Operations Manager',       level: 'L6',  salary: '₹35,000–₹75,000' },
      { title: 'Staff Nurse',                         level: 'L8',  salary: '₹20,000–₹40,000', qualification: 'Applicable nursing qualification and registration' },
      { title: 'Medical Assistant',                   level: 'L10', salary: '₹18,000–₹30,000' },
      { title: 'Lab Technician',                      level: 'L11', salary: '₹18,000–₹35,000', qualification: 'Relevant recognised qualification' },
      { title: 'Healthcare Coordinator',              level: 'L9',  salary: '₹20,000–₹35,000' }
    ]
  },

  {
    id: 'travel-tourism',
    division: 'Travel & Tourism',
    brandName: 'Global Growth Travel & Tourism',
    slug: 'travel-tourism',
    status: 'active',
    certificate: 'TTMC',
    roles: [
      { title: 'Travel Business Head',       level: 'L3', salary: '₹50,000–₹1,20,000+' },
      { title: 'Travel Operations Manager',  level: 'L6', salary: '₹30,000–₹70,000' },
      { title: 'Travel Consultant',          level: 'L8', salary: '₹18,000–₹35,000' },
      { title: 'Tour Coordinator',           level: 'L9', salary: '₹18,000–₹32,000' },
      { title: 'Travel Executive',           level: 'L8', salary: '₹18,000–₹30,000' },
      { title: 'Tour Guide Coordinator',     level: 'L9', salary: '₹18,000–₹35,000' },
      { title: 'Customer Support Executive', level: 'L8', salary: '₹16,000–₹28,000' }
    ]
  },

  {
    id: 'railways',
    division: 'Railways',
    brandName: 'Global Growth Railways',
    slug: 'railways',
    status: 'active',
    certificate: 'RIATC',
    roles: [
      { title: 'Rail Business Head',            level: 'L3',  salary: '₹60,000–₹1,50,000+' },
      { title: 'Rail Operations Manager',       level: 'L6',  salary: '₹40,000–₹80,000' },
      { title: 'Station Operations Executive',  level: 'L8',  salary: '₹20,000–₹40,000' },
      { title: 'Ticketing Executive',           level: 'L8',  salary: '₹18,000–₹30,000' },
      { title: 'Rail Logistics Coordinator',    level: 'L9',  salary: '₹22,000–₹40,000' },
      { title: 'Maintenance Technician',        level: 'L11', salary: '₹18,000–₹35,000' }
    ]
  },

  {
    id: 'logistics',
    division: 'Logistics',
    brandName: 'Global Growth Logistics',
    slug: 'logistics',
    status: 'active',
    certificate: 'LITC',
    roles: [
      { title: 'Logistics Head',       level: 'L3',  salary: '₹60,000–₹1,50,000+' },
      { title: 'Supply Chain Manager', level: 'L5',  salary: '₹45,000–₹1,00,000' },
      { title: 'Warehouse Manager',    level: 'L6',  salary: '₹30,000–₹60,000' },
      { title: 'Logistics Coordinator',level: 'L9',  salary: '₹20,000–₹35,000' },
      { title: 'Inventory Executive',  level: 'L8',  salary: '₹18,000–₹30,000' },
      { title: 'Delivery Supervisor',  level: 'L9',  salary: '₹20,000–₹35,000' },
      { title: 'Warehouse Associate',  level: 'L10', salary: '₹15,000–₹25,000' }
    ]
  },

  {
    id: 'electrical',
    division: 'Electrical',
    brandName: 'Global Growth Electrical',
    slug: 'electrical',
    status: 'active',
    certificate: 'EITC',
    roles: [
      { title: 'Electrical Division Head',  level: 'L3',  salary: '₹60,000–₹1,50,000+' },
      { title: 'Electrical Project Manager',level: 'L5',  salary: '₹40,000–₹90,000' },
      { title: 'Electrical Engineer',       level: 'L8',  salary: '₹25,000–₹60,000' },
      { title: 'Site Engineer',             level: 'L8',  salary: '₹22,000–₹45,000' },
      { title: 'Electrical Technician',     level: 'L11', salary: '₹18,000–₹32,000' },
      { title: 'Electrician',               level: 'L11', salary: '₹18,000–₹30,000' }
    ]
  },

  {
    id: 'security',
    division: 'Security',
    brandName: 'Global Growth Security',
    slug: 'security',
    status: 'active',
    certificate: 'SITC',
    roles: [
      { title: 'Security Business Head',      level: 'L3',  salary: '₹50,000–₹1,20,000+' },
      { title: 'Security Operations Manager', level: 'L6',  salary: '₹35,000–₹70,000' },
      { title: 'Security Officer',            level: 'L8',  salary: '₹25,000–₹45,000' },
      { title: 'Security Supervisor',         level: 'L9',  salary: '₹20,000–₹35,000' },
      { title: 'Security Guard',              level: 'L10', salary: '₹15,000–₹25,000' },
      { title: 'Control Room Operator',       level: 'L11', salary: '₹16,000–₹28,000' }
    ]
  },

  {
    id: 'manufacturing',
    division: 'Manufacturing',
    brandName: 'Global Growth Manufacturing',
    slug: 'manufacturing',
    status: 'active',
    certificate: 'MITC',
    roles: [
      { title: 'Plant Head',             level: 'L3',  salary: '₹70,000–₹1,50,000+' },
      { title: 'Production Manager',     level: 'L5',  salary: '₹40,000–₹90,000' },
      { title: 'Quality Manager',        level: 'L5',  salary: '₹35,000–₹75,000' },
      { title: 'Production Engineer',    level: 'L8',  salary: '₹25,000–₹50,000' },
      { title: 'Production Supervisor',  level: 'L9',  salary: '₹22,000–₹35,000' },
      { title: 'Machine Operator',       level: 'L11', salary: '₹16,000–₹28,000' },
      { title: 'Maintenance Technician', level: 'L11', salary: '₹18,000–₹32,000' }
    ]
  },

  {
    id: 'skill-development',
    division: 'Skill Development',
    brandName: 'Global Growth Skill Development',
    slug: 'skill-development',
    status: 'active',
    certificate: 'PSDC',
    roles: [
      { title: 'Skill Development Director', level: 'L3', salary: '₹50,000–₹1,20,000+' },
      { title: 'Training Manager',           level: 'L6', salary: '₹30,000–₹70,000' },
      { title: 'Centre Manager',             level: 'L7', salary: '₹25,000–₹50,000' },
      { title: 'Senior Trainer',             level: 'L8', salary: '₹25,000–₹45,000' },
      { title: 'Trainer / Faculty',          level: 'L8', salary: '₹18,000–₹35,000' },
      { title: 'Student Counsellor',         level: 'L8', salary: '₹18,000–₹35,000' },
      { title: 'Placement Coordinator',      level: 'L9', salary: '₹20,000–₹35,000' },
      { title: 'Admission Executive',        level: 'L8', salary: '₹15,000–₹28,000' }
    ]
  },

  {
    id: 'driver',
    division: 'Driver Services',
    brandName: 'Global Growth Driver Services',
    slug: 'driver',
    status: 'active',
    certificate: 'DITC',
    roles: [
      { title: 'Transport Operations Head', level: 'L3',  salary: '₹50,000–₹1,00,000' },
      { title: 'Fleet Manager',             level: 'L6',  salary: '₹30,000–₹60,000' },
      { title: 'Transport Supervisor',      level: 'L9',  salary: '₹22,000–₹35,000' },
      { title: 'Fleet Coordinator',         level: 'L9',  salary: '₹18,000–₹30,000' },
      { title: 'Driver Trainer',            level: 'L8',  salary: '₹20,000–₹35,000' },
      { title: 'Commercial Driver',         level: 'L11', salary: '₹18,000–₹30,000', qualification: 'Applicable commercial driving licence and required experience' }
    ]
  },

  {
    id: 'banking',
    division: 'Banking',
    brandName: 'Global Growth Banking',
    status: 'planned',
    regulator: 'RBI',
    certificate: 'BITC',
    roles: [
      { title: 'Banking Division Head',     level: 'L3', salary: '₹60,000–₹1,50,000+' },
      { title: 'Branch Operations Manager', level: 'L6', salary: '₹35,000–₹70,000' },
      { title: 'Relationship Manager',      level: 'L6', salary: '₹25,000–₹50,000' },
      { title: 'Banking Executive',         level: 'L8', salary: '₹18,000–₹30,000' },
      { title: 'KYC Executive',             level: 'L8', salary: '₹18,000–₹30,000' }
    ]
  },

  {
    id: 'teaching-education',
    division: 'Teaching & Education',
    brandName: 'Global Growth Teaching & Education',
    status: 'active',
    certificate: 'TITC',
    roles: [
      { title: 'Education Director',    level: 'L3', salary: '₹50,000–₹1,20,000+' },
      { title: 'Academic Head',         level: 'L4', salary: '₹35,000–₹80,000' },
      { title: 'Centre Head',           level: 'L5', salary: '₹30,000–₹60,000' },
      { title: 'Subject Teacher',       level: 'L8', salary: '₹20,000–₹45,000', qualification: 'The qualification prescribed for the specific teaching role' },
      { title: 'Vocational Instructor', level: 'L8', salary: '₹18,000–₹40,000' },
      { title: 'Academic Counsellor',   level: 'L8', salary: '₹18,000–₹35,000' }
    ]
  },

  {
    id: 'pharmacy',
    division: 'Pharmacy',
    brandName: 'Global Growth Pharmacy',
    status: 'planned',
    regulator: 'State Pharmacy Council',
    certificate: 'PITC',
    roles: [
      { title: 'Pharmacy Business Head',       level: 'L3',  salary: '₹40,000–₹1,00,000+' },
      { title: 'Pharmacy Manager',             level: 'L7',  salary: '₹25,000–₹50,000' },
      { title: 'Registered Pharmacist',        level: 'L8',  salary: '₹20,000–₹40,000', qualification: 'Applicable recognised qualification and State Pharmacy Council registration' },
      { title: 'Pharmacy Assistant',           level: 'L10', salary: '₹15,000–₹25,000' },
      { title: 'Medicine Inventory Executive', level: 'L8',  salary: '₹18,000–₹30,000' }
    ]
  },

  {
    id: 'it-technology',
    division: 'IT & Technology',
    brandName: 'Global Growth IT & Technology',
    status: 'active',
    certificate: 'ITITC',
    roles: [
      { title: 'Chief Technology Officer', level: 'L2', salary: '₹80,000–₹2,50,000+' },
      { title: 'IT Manager',               level: 'L5', salary: '₹50,000–₹1,00,000' },
      { title: 'Software Developer',       level: 'L8', salary: '₹30,000–₹80,000' },
      { title: 'Web Developer',            level: 'L8', salary: '₹20,000–₹50,000' },
      { title: 'Data Analyst',             level: 'L8', salary: '₹25,000–₹60,000' },
      { title: 'Network Administrator',    level: 'L8', salary: '₹25,000–₹55,000' },
      { title: 'IT Support Executive',     level: 'L8', salary: '₹18,000–₹35,000' }
    ]
  },

  {
    id: 'construction',
    division: 'Construction',
    brandName: 'Global Growth Construction',
    status: 'active',
    certificate: 'CITC',
    roles: [
      { title: 'Construction Director', level: 'L3', salary: '₹70,000–₹1,50,000+' },
      { title: 'Project Manager',       level: 'L5', salary: '₹50,000–₹1,00,000' },
      { title: 'Civil Engineer',        level: 'L8', salary: '₹25,000–₹60,000' },
      { title: 'Site Engineer',         level: 'L8', salary: '₹22,000–₹45,000' },
      { title: 'Quantity Surveyor',     level: 'L8', salary: '₹25,000–₹55,000' },
      { title: 'Safety Officer',        level: 'L8', salary: '₹25,000–₹50,000' },
      { title: 'Site Supervisor',       level: 'L9', salary: '₹20,000–₹35,000' }
    ]
  },

  {
    id: 'infrastructure',
    division: 'Infrastructure',
    brandName: 'Global Growth Infrastructure',
    status: 'active',
    certificate: 'MIRTC',
    roles: [
      { title: 'Infrastructure Director',      level: 'L3', salary: '₹70,000–₹1,50,000+' },
      { title: 'Project Director',             level: 'L4', salary: '₹60,000–₹1,50,000' },
      { title: 'Project Manager',              level: 'L5', salary: '₹45,000–₹1,00,000' },
      { title: 'Planning Engineer',            level: 'L8', salary: '₹30,000–₹60,000' },
      { title: 'Civil / Structural Engineer',  level: 'L8', salary: '₹25,000–₹60,000' },
      { title: 'Site Supervisor',              level: 'L9', salary: '₹20,000–₹35,000' }
    ]
  },

  {
    id: 'energy',
    division: 'Energy',
    brandName: 'Global Growth Energy',
    status: 'active',
    certificate: 'EETC',
    roles: [
      { title: 'Energy Business Head',   level: 'L3',  salary: '₹70,000–₹1,50,000+' },
      { title: 'Energy Project Manager', level: 'L5',  salary: '₹45,000–₹1,00,000' },
      { title: 'Energy Engineer',        level: 'L8',  salary: '₹30,000–₹65,000' },
      { title: 'Operations Engineer',    level: 'L8',  salary: '₹25,000–₹50,000' },
      { title: 'Safety Officer',         level: 'L8',  salary: '₹25,000–₹50,000' },
      { title: 'Technician',             level: 'L11', salary: '₹18,000–₹35,000' }
    ]
  },

  {
    id: 'renewable-energy',
    division: 'Renewable Energy',
    brandName: 'Global Growth Renewable Energy',
    status: 'active',
    certificate: 'SITC',
    roles: [
      { title: 'Renewable Energy Head',  level: 'L3',  salary: '₹60,000–₹1,50,000+' },
      { title: 'Solar Project Manager',  level: 'L5',  salary: '₹40,000–₹80,000' },
      { title: 'Solar Engineer',         level: 'L8',  salary: '₹25,000–₹55,000' },
      { title: 'Site Engineer',          level: 'L8',  salary: '₹22,000–₹45,000' },
      { title: 'O&M Engineer',           level: 'L8',  salary: '₹25,000–₹50,000' },
      { title: 'Solar Technician',       level: 'L11', salary: '₹18,000–₹32,000' }
    ]
  },

  {
    id: 'agriculture',
    division: 'Agriculture',
    brandName: 'Global Growth Agriculture',
    status: 'active',
    certificate: 'AITC',
    roles: [
      { title: 'Agriculture Business Head', level: 'L3', salary: '₹50,000–₹1,20,000+' },
      { title: 'Agriculture Manager',       level: 'L6', salary: '₹30,000–₹60,000' },
      { title: 'Agronomist',                level: 'L8', salary: '₹25,000–₹50,000' },
      { title: 'Agriculture Officer',       level: 'L8', salary: '₹22,000–₹40,000' },
      { title: 'Farm Supervisor',           level: 'L9', salary: '₹18,000–₹30,000' },
      { title: 'Field Executive',           level: 'L8', salary: '₹16,000–₹28,000' }
    ]
  },

  {
    id: 'food-beverages',
    division: 'Food & Beverages',
    brandName: 'Global Growth Food & Beverages',
    status: 'active',
    certificate: 'FITC',
    roles: [
      { title: 'F&B Director',            level: 'L3',  salary: '₹50,000–₹1,20,000+' },
      { title: 'Restaurant Manager',      level: 'L6',  salary: '₹30,000–₹60,000' },
      { title: 'Food Production Manager', level: 'L6',  salary: '₹30,000–₹60,000' },
      { title: 'Food Safety Executive',   level: 'L8',  salary: '₹25,000–₹45,000' },
      { title: 'Service Executive',       level: 'L8',  salary: '₹16,000–₹28,000' },
      { title: 'Chef',                    level: 'L11', salary: '₹20,000–₹50,000' }
    ]
  },

  {
    id: 'retail',
    division: 'Retail',
    brandName: 'Global Growth Retail',
    status: 'active',
    certificate: 'RITC',
    roles: [
      { title: 'Retail Business Head',      level: 'L3',  salary: '₹50,000–₹1,20,000+' },
      { title: 'Store Manager',             level: 'L7',  salary: '₹25,000–₹50,000' },
      { title: 'Assistant Store Manager',   level: 'L7',  salary: '₹20,000–₹35,000' },
      { title: 'Sales Executive',           level: 'L8',  salary: '₹15,000–₹28,000' },
      { title: 'Inventory Executive',       level: 'L8',  salary: '₹18,000–₹30,000' },
      { title: 'Cashier',                   level: 'L10', salary: '₹15,000–₹25,000' }
    ]
  },

  {
    id: 'real-estate',
    division: 'Real Estate',
    brandName: 'Global Growth Real Estate',
    status: 'active',
    certificate: 'SCITC',
    roles: [
      { title: 'Real Estate Director', level: 'L3', salary: '₹60,000–₹1,50,000+' },
      { title: 'Project Manager',      level: 'L5', salary: '₹40,000–₹80,000' },
      { title: 'Property Manager',     level: 'L6', salary: '₹30,000–₹60,000' },
      { title: 'Sales Manager',        level: 'L6', salary: '₹30,000–₹70,000', salaryNote: 'plus incentives' },
      { title: 'Sales Executive',      level: 'L8', salary: '₹18,000–₹35,000', salaryNote: 'plus incentives' },
      { title: 'CRM Executive',        level: 'L8', salary: '₹18,000–₹30,000' }
    ]
  },

  {
    id: 'finance',
    division: 'Finance',
    brandName: 'Global Growth Finance',
    status: 'planned',
    regulator: 'RBI / SEBI',
    certificate: 'FAITC',
    roles: [
      { title: 'Chief Financial Officer',  level: 'L2', salary: '₹80,000–₹2,50,000+' },
      { title: 'Finance Manager',          level: 'L5', salary: '₹40,000–₹90,000' },
      { title: 'Financial Analyst',        level: 'L8', salary: '₹30,000–₹70,000' },
      { title: 'Internal Audit Executive', level: 'L8', salary: '₹25,000–₹50,000' },
      { title: 'Accountant',               level: 'L8', salary: '₹20,000–₹40,000' },
      { title: 'Accounts Executive',       level: 'L8', salary: '₹18,000–₹30,000' }
    ]
  },

  {
    id: 'insurance',
    division: 'Insurance',
    brandName: 'Global Growth Insurance',
    status: 'planned',
    regulator: 'IRDAI',
    certificate: 'IHITC',
    roles: [
      { title: 'Insurance Business Head',      level: 'L3', salary: '₹60,000–₹1,50,000+' },
      { title: 'Insurance Operations Manager', level: 'L6', salary: '₹35,000–₹70,000' },
      { title: 'Relationship Manager',         level: 'L6', salary: '₹25,000–₹50,000' },
      { title: 'Underwriting Executive',       level: 'L8', salary: '₹25,000–₹50,000' },
      { title: 'Claims Executive',             level: 'L8', salary: '₹20,000–₹35,000' },
      { title: 'Insurance Advisor',            level: 'L8', salary: '₹18,000–₹35,000', salaryNote: 'plus applicable incentives' }
    ]
  },

  {
    id: 'consultancy',
    division: 'Consultancy',
    brandName: 'Global Growth Consultancy',
    status: 'active',
    certificate: 'BCITC',
    roles: [
      { title: 'Consultancy Director',           level: 'L3', salary: '₹60,000–₹1,50,000+' },
      { title: 'Management Consultant',          level: 'L5', salary: '₹40,000–₹1,00,000' },
      { title: 'Business Consultant',            level: 'L6', salary: '₹35,000–₹80,000' },
      { title: 'HR Consultant',                  level: 'L8', salary: '₹25,000–₹60,000' },
      { title: 'Career Consultant',              level: 'L8', salary: '₹20,000–₹45,000' },
      { title: 'Business Development Executive', level: 'L8', salary: '₹18,000–₹35,000', salaryNote: 'plus incentives' }
    ]
  }
];

/* ===========================================================================
   CORPORATE HEAD OFFICE
   Functions that serve every division rather than sitting inside one.
   =========================================================================== */

export const CORPORATE_DEPARTMENTS = [
  {
    name: 'Human Resources',
    icon: 'education',
    roles: ['CHRO', 'HR Head', 'HR Manager', 'HR Executive', 'Recruiter', 'Payroll Executive', 'Training & Development Executive']
  },
  {
    name: 'Finance & Accounts',
    icon: 'finance',
    roles: ['CFO', 'Finance Manager', 'Accounts Manager', 'Accountant', 'Accounts Executive']
  },
  {
    name: 'Legal & Compliance',
    icon: 'security',
    roles: ['Chief Legal Officer', 'Legal Manager', 'Compliance Officer', 'Contract Executive']
  },
  {
    name: 'IT & Technology',
    icon: 'technology',
    roles: ['CTO', 'IT Manager', 'System Administrator', 'Software Developer', 'IT Support']
  },
  {
    name: 'Marketing',
    icon: 'consulting',
    roles: ['CMO', 'Marketing Manager', 'Digital Marketing Executive', 'Graphic Designer', 'Content Executive']
  },
  {
    name: 'Business Development & Sales',
    icon: 'mobility',
    roles: ['CBO', 'Sales Head', 'Business Development Manager', 'Sales Manager', 'Business Development Executive', 'Sales Executive']
  },
  {
    name: 'Operations',
    icon: 'logistics',
    roles: ['COO', 'Operations Manager']
  },
  {
    name: 'Administration',
    icon: 'infrastructure',
    roles: ['Admin Head', 'Admin Manager', 'Office Executive', 'Receptionist']
  },
  {
    name: 'Quality',
    icon: 'check-circle',
    roles: ['Quality Head', 'QA / QC Executive']
  },
  {
    name: 'Procurement',
    icon: 'manufacturing',
    roles: ['Procurement Manager', 'Purchase Executive']
  },
  {
    name: 'Customer Support',
    icon: 'healthcare',
    roles: ['Customer Care Manager', 'Customer Care Executive']
  },
  {
    name: 'Security',
    icon: 'security',
    roles: ['Security Head', 'Security Officer']
  },
  {
    name: 'Training',
    icon: 'education',
    roles: ['Training Head', 'Trainer']
  },
  {
    name: 'PR & Communications',
    icon: 'consulting',
    roles: ['PR Manager', 'Communication Executive']
  }
];

/* ===========================================================================
   QUALIFICATION, PROCESS AND POLICY
   =========================================================================== */

export const QUALIFICATION_MATRIX = [
  { level: 'Director / CXO', qualification: 'Graduate, with substantial senior experience' },
  { level: 'Business Head',  qualification: 'Graduate, MBA or a technical qualification, with relevant experience' },
  { level: 'Manager',        qualification: 'Graduate or Diploma, with relevant experience' },
  { level: 'Assistant Manager', qualification: 'Graduate or Diploma' },
  { level: 'Executive',      qualification: '12th or Graduate, depending on the role' },
  { level: 'Supervisor',     qualification: '10th or 12th, with relevant experience' },
  { level: 'Technician',     qualification: 'ITI, Diploma or a relevant technical qualification' },
  { level: 'Skilled Worker', qualification: 'A relevant skill or trade qualification' },
  { level: 'Driver',         qualification: 'The applicable driving licence and required experience' },
  { level: 'Pharmacist',     qualification: 'The applicable recognised qualification and registration' },
  { level: 'Nurse',          qualification: 'The applicable recognised qualification and registration' },
  { level: 'Engineer',       qualification: 'A relevant engineering qualification' },
  { level: 'Teacher',        qualification: 'The qualification prescribed for the specific teaching role' }
];

/**
 * The recruitment process as it actually runs, end to end. Published in full
 * because a candidate who knows the fifteen steps cannot be strung along by
 * anyone claiming to shortcut them.
 */
export const RECRUITMENT_PROCESS = [
  { step: 'Manpower requirement',        text: 'The division raises a requirement against an approved position.' },
  { step: 'Job description approval',    text: 'The description, grade and range are approved before anything is advertised.' },
  { step: 'Vacancy code creation',       text: 'A vacancy code is issued. No code, no vacancy — this is how a genuine opening is verified.' },
  { step: 'Advertisement and sourcing',  text: 'The role is published on official channels only.' },
  { step: 'Application screening',       text: 'Applications are screened against the stated qualification and experience.' },
  { step: 'HR interview',                text: 'A first interview with Human Resources.' },
  { step: 'Technical or department interview', text: 'An interview with the hiring department on the substance of the role.' },
  { step: 'Document verification',       text: 'Original documents are verified against the requirement for the position.' },
  { step: 'Reference and background verification', text: 'Carried out where applicable to the role.' },
  { step: 'Final selection',             text: 'The selection decision is recorded and approved.' },
  { step: 'Offer letter',                text: 'A written offer stating the position, grade, location and compensation.' },
  { step: 'Appointment letter',          text: 'Formal appointment on acceptance of the offer.' },
  { step: 'Joining and induction',       text: 'Onboarding into the division and the group standard.' },
  { step: 'Probation',                   text: 'A defined probation period against the terms of appointment.' },
  { step: 'Confirmation',                text: 'Confirmation in the role following review.' }
];

export const PROBATION = {
  note: 'Probation runs against the terms set out in the appointment letter. On confirmation, a performance review determines eligibility for increment and promotion.',
  periods: [
    { role: 'Executive / Associate', period: '3–6 months' },
    { role: 'Supervisor',            period: '3–6 months' },
    { role: 'Manager',               period: '3–6 months' },
    { role: 'Senior Manager',        period: '3–6 months' },
    { role: 'Department Head',       period: '6 months, or as per the terms of appointment' }
  ]
};

/** The career path the grade ladder is designed to support. */
export const PROMOTION_PATH = [
  'Trainee',
  'Executive',
  'Senior Executive',
  'Assistant Manager',
  'Manager',
  'Senior Manager',
  'General Manager',
  'Business Head',
  'Director / Executive Director'
];

/**
 * Employee and designation codes. The pattern is
 *   GGIPL — division code — function code — serial
 * and it is worth publishing: an offer that does not carry one is not ours.
 */
export const EMPLOYEE_CODE = {
  pattern: 'GGIPL-<DIVISION>-<FUNCTION>-<SERIAL>',
  examples: [
    { code: 'GGIPL-HR-EXE-001',  meaning: 'Human Resources · Executive' },
    { code: 'GGIPL-AVI-TKT-001', meaning: 'Aviation · Ticketing' },
    { code: 'GGIPL-MET-OPS-001', meaning: 'Metro · Operations' },
    { code: 'GGIPL-HOT-FOE-001', meaning: 'Hotels · Front Office Executive' },
    { code: 'GGIPL-HLT-NUR-001', meaning: 'Healthcare · Nursing' },
    { code: 'GGIPL-TRV-EXE-001', meaning: 'Travel · Executive' },
    { code: 'GGIPL-LOG-EXE-001', meaning: 'Logistics · Executive' },
    { code: 'GGIPL-SEC-SUP-001', meaning: 'Security · Supervisor' },
    { code: 'GGIPL-IT-DEV-001',  meaning: 'IT · Developer' },
    { code: 'GGIPL-SD-TRN-001',  meaning: 'Skill Development · Trainer' }
  ]
};

/** The documents that make up an employment file, from application to exit. */
export const HR_DOCUMENTS = [
  'Employee Application Form',
  'Resume / CV',
  'Interview Evaluation Form',
  'Selection Approval Form',
  'Offer Letter',
  'Appointment Letter',
  'Employment Agreement, where applicable',
  'Employee Joining Form',
  'ID Card',
  'Employee Code',
  'NDA / Confidentiality Agreement, where applicable',
  'Salary Structure',
  'Attendance Policy',
  'Leave Policy',
  'Code of Conduct',
  'Anti-Harassment / Workplace Policy',
  'Grievance Policy',
  'Performance Appraisal Form',
  'Promotion Letter',
  'Salary Revision Letter',
  'Transfer Letter',
  'Warning / Disciplinary Letter',
  'Resignation Form',
  'Full & Final Settlement',
  'Experience Certificate',
  'Relieving Letter'
];

/**
 * CAREERS DISCLAIMER — client-approved wording.
 * ---------------------------------------------------------------------------
 * This is a legal notice. Reproduce it as written. Do not shorten it, split it
 * across pages, place it below the fold of the careers page, or "improve" the
 * phrasing. If it needs to change, it changes in the client's copy first.
 */
export const CAREERS_DISCLAIMER = {
  title: 'Careers at Global Growth Industries Private Limited',
  paragraphs: [
    'Global Growth Industries Private Limited (GGIPL) may publish employment opportunities across its business divisions from time to time.',
    'Available positions, qualifications, experience requirements, salary/CTC, location and employment terms will be specified in the relevant vacancy notice.',
    'Publication of a job role on this website does not guarantee selection or employment. Employment is subject to the Company’s recruitment process, verification requirements, applicable eligibility criteria and execution of the applicable employment documentation.',
    'Unless specifically stated and legally supported, GGIPL vacancies are private-sector employment opportunities and should not be interpreted as Government of India, Indian Railways, Metro Corporation, airline, bank, university or other government employment.',
    'GGIPL does not guarantee employment, government appointment, permanent placement or any particular salary merely on the basis of registration, application, training or participation in a programme.',
    'Candidates should rely only on official GGIPL communication channels for recruitment-related information.'
  ],
  contact: {
    emailLabel: 'Official HR Email',
    email: 'hr@globalgrowthindustries.com',
    helplineLabel: 'Helpline',
    helpline: '+91 92048 04718'
  }
};

/* ===========================================================================
   WHY WORK HERE
   =========================================================================== */

export const BENEFITS = [
  {
    icon: 'consulting',
    title: 'A published grade ladder',
    text: 'Twelve grades, each with a stated range. You can see where a role sits and what the step above it pays before you apply.'
  },
  {
    icon: 'education',
    title: 'Training that is funded',
    text: 'We run a skill development division. Certification and technical training for our own people are paid for, not reimbursed grudgingly.'
  },
  {
    icon: 'security',
    title: 'Statutory compliance, properly',
    text: 'PF, ESI, gratuity and leave handled correctly and on time. This should not be a benefit, and in this market it is.'
  },
  {
    icon: 'healthcare',
    title: 'Medical cover',
    text: 'Group medical cover for employees and immediate family, with our healthcare division able to help when it is needed.'
  },
  {
    icon: 'mobility',
    title: 'Move between divisions',
    text: 'Twenty-seven divisions under one employer. An internal move is a transfer conversation, not a resignation.'
  },
  {
    icon: 'check-circle',
    title: 'A process you can hold us to',
    text: 'Fifteen steps, published in full, ending in a written appointment letter and an employee code. Nothing verbal, nothing informal.'
  }
];

/* ===========================================================================
   DERIVED HELPERS
   Everything below is computed. Do not maintain a parallel list.
   =========================================================================== */

/** Every role in the group, flattened, carrying its division context. */
export const ALL_ROLES = DIVISION_ROLES.flatMap(division =>
  division.roles.map((role, index) => ({
    ...role,
    id: `${division.id}-${index + 1}`,
    divisionId:    division.id,
    division:      division.division,
    brandName:     division.brandName,
    divisionSlug:  division.slug || null,
    status:        division.status,
    regulator:     division.regulator || null,
    certificate:   division.certificate,
    documents:     [...STANDARD_DOCUMENTS, `${division.certificate} Certificate`]
  }))
);

/** Filter options for the careers page. */
export const DIVISION_FILTERS = DIVISION_ROLES.map(d => ({
  id: d.id, label: d.division, status: d.status
}));

export const GRADE_FILTERS = [...new Set(ALL_ROLES.map(r => r.level))]
  .sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));

export const ROLE_COUNTS = {
  divisions:        DIVISION_ROLES.length,
  activeDivisions:  DIVISION_ROLES.filter(d => d.status === 'active').length,
  plannedDivisions: DIVISION_ROLES.filter(d => d.status === 'planned').length,
  roles:            ALL_ROLES.length,
  activeRoles:      ALL_ROLES.filter(r => r.status === 'active').length,
  departments:      CORPORATE_DEPARTMENTS.length,
  corporateRoles:   CORPORATE_DEPARTMENTS.reduce((n, d) => n + d.roles.length, 0),
  grades:           new Set(GRADE_MATRIX.map(row => row.level)).size,
  processSteps:     RECRUITMENT_PROCESS.length
};

export const getDivisionRoles = id => DIVISION_ROLES.find(d => d.id === id) || null;

export const getRole = id => ALL_ROLES.find(role => role.id === id) || null;

export const filterRoles = ({ division = 'all', grade = 'all' } = {}) =>
  ALL_ROLES.filter(role =>
    (division === 'all' || role.divisionId === division) &&
    (grade === 'all'    || role.level === grade)
  );
