/**
 * GLOBAL GROWTH — CAREER OPENINGS
 * ---------------------------------------------------------------------------
 * Drives the filterable openings list on /careers and the job card component.
 *
 * Every posting here is a role the group structure genuinely implies. Locations
 * and compensation are left as placeholders until the client confirms them —
 * we do not publish a location we cannot staff.
 *
 * When the backend arrives this file becomes a read from GET /api/jobs.
 */

export const DEPARTMENTS = [
  'Operations',
  'Engineering',
  'Human Resources',
  'Finance',
  'Business Development',
  'Compliance',
  'Technology'
];

export const LOCATIONS = [
  '{{LOCATION_HQ_PLACEHOLDER}}',
  'Pan-India',
  'Remote'
];

export const JOB_TYPES = ['Full-time', 'Contract', 'Internship'];

export const JOBS = [
  {
    id: 'gg-ops-001',
    title: 'Head of Logistics Operations',
    department: 'Operations',
    division: 'Logistics',
    divisionSlug: 'logistics',
    location: '{{LOCATION_HQ_PLACEHOLDER}}',
    type: 'Full-time',
    experience: '10–15 years',
    posted: '2026-08-18',
    summary:
      'Own end-to-end warehousing, fleet and cold-chain operations, and build the operating discipline that lets the group be measured on the handover between links rather than on any single one.',
    responsibilities: [
      'Set network design across warehousing, line haul and last mile.',
      'Build the KPI framework for on-time delivery, damage and cost per consignment.',
      'Lead vendor selection and hold contracted service levels to account.',
      'Grow a supervisory layer capable of running sites without head-office intervention.'
    ],
    requirements: [
      'Ten or more years in 3PL, e-commerce or industrial logistics, with at least three leading a multi-site operation.',
      'Demonstrated ownership of a P&L or a large cost centre.',
      'Working knowledge of cold-chain compliance and transport documentation.'
    ]
  },
  {
    id: 'gg-eng-002',
    title: 'Senior Electrical Design Engineer',
    department: 'Engineering',
    division: 'Electrical',
    divisionSlug: 'electrical',
    location: '{{LOCATION_HQ_PLACEHOLDER}}',
    type: 'Full-time',
    experience: '6–10 years',
    posted: '2026-08-22',
    summary:
      'Design LT and HT distribution systems for industrial and commercial projects, and carry the design through commissioning rather than handing it over at the drawing stage.',
    responsibilities: [
      'Prepare load calculations, single-line diagrams and cable schedules.',
      'Specify switchgear, transformers and protection systems to IS and IEC standards.',
      'Coordinate with civil and mechanical teams to resolve interfaces before they reach site.',
      'Support testing and commissioning, and close out as-built documentation.'
    ],
    requirements: [
      'B.E. or B.Tech in Electrical Engineering.',
      'Six or more years in electrical design for industrial or infrastructure projects.',
      'Fluency in AutoCAD and a recognised load-analysis package.'
    ]
  },
  {
    id: 'gg-hr-003',
    title: 'Manager — Talent Acquisition',
    department: 'Human Resources',
    division: 'Group',
    location: '{{LOCATION_HQ_PLACEHOLDER}}',
    type: 'Full-time',
    experience: '5–8 years',
    posted: '2026-08-25',
    summary:
      'Build the hiring engine for a group entering fifteen sectors at once, including the volume skilled-trades pipeline that our operating divisions depend on.',
    responsibilities: [
      'Own requisition-to-offer for corporate and site roles across divisions.',
      'Establish a skilled-trades pipeline in partnership with our skill-development division.',
      'Put structured interviewing and scorecards in place, and hold managers to them.',
      'Report time-to-fill, offer acceptance and first-year retention to the leadership team.'
    ],
    requirements: [
      'Five or more years in talent acquisition, including both white-collar and volume hiring.',
      'Experience standing up a hiring process rather than administering an existing one.',
      'Comfortable working across multiple businesses with competing priorities.'
    ]
  },
  {
    id: 'gg-ops-004',
    title: 'Training Manager — Skill Development',
    department: 'Operations',
    division: 'Skill Development',
    divisionSlug: 'skill-development',
    location: 'Pan-India',
    type: 'Full-time',
    experience: '6–10 years',
    posted: '2026-08-28',
    summary:
      'Run vocational and technical training as an operating business held to placement outcomes — not certification volume.',
    responsibilities: [
      'Design curricula for technical, vocational and driver-training programmes.',
      'Recruit, certify and supervise the trainer pool.',
      'Own placement outcomes and publish them honestly, including the misses.',
      'Maintain alignment with NSQF levels and applicable sector skill council standards.'
    ],
    requirements: [
      'Six or more years in vocational training delivery or training operations.',
      'Track record of measurable placement outcomes, with evidence.',
      'Familiarity with NSQF and sector skill council assessment frameworks.'
    ]
  },
  {
    id: 'gg-cmp-005',
    title: 'Assistant Manager — Regulatory Compliance',
    department: 'Compliance',
    division: 'Group',
    location: '{{LOCATION_HQ_PLACEHOLDER}}',
    type: 'Full-time',
    experience: '4–7 years',
    posted: '2026-08-30',
    summary:
      'Keep a multi-sector group on the right side of its licensing obligations, and maintain the discipline that stops a planned line of business from being marketed before it is authorised.',
    responsibilities: [
      'Track licence and registration status across every operating division.',
      'Own the approval workflow for public claims about regulated activities.',
      'Maintain the statutory calendar and drive filings to completion.',
      'Brief business heads on what they may and may not represent to the market.'
    ],
    requirements: [
      'Four or more years in regulatory or corporate compliance, ideally across more than one sector.',
      'Working knowledge of Companies Act filings and sector licensing regimes.',
      'The judgement and the spine to say no to a business head.'
    ]
  },
  {
    id: 'gg-tech-006',
    title: 'Full-Stack Developer',
    department: 'Technology',
    division: 'Technology',
    location: 'Remote',
    type: 'Full-time',
    experience: '3–6 years',
    posted: '2026-09-01',
    summary:
      'Build the internal systems that schedule our fleets, track our warehouses and manage training records — software that has to survive contact with a real operation.',
    responsibilities: [
      'Ship features across the stack, from data model to interface.',
      'Work directly with operations teams rather than through a specification document.',
      'Own reliability for the services you build, including what happens at 2am.',
      'Keep the codebase something the next developer can read.'
    ],
    requirements: [
      'Three or more years building and running production web applications.',
      'Strong JavaScript, plus a server-side language and a relational database.',
      'Experience with systems used by non-technical staff in the field.'
    ]
  },
  {
    id: 'gg-bd-007',
    title: 'Business Development Manager — Infrastructure',
    department: 'Business Development',
    division: 'Infrastructure',
    location: 'Pan-India',
    type: 'Full-time',
    experience: '7–12 years',
    posted: '2026-09-02',
    summary:
      'Win civil and infrastructure work through the tender process, and qualify out of the pursuits we should not be chasing.',
    responsibilities: [
      'Track government and private tenders relevant to our capability.',
      'Lead bid qualification, pricing input and submission.',
      'Build relationships with consultants, PMCs and client engineering teams.',
      'Maintain a pipeline forecast the leadership team can plan against.'
    ],
    requirements: [
      'Seven or more years in infrastructure or construction business development.',
      'Direct experience with public procurement and e-tendering platforms.',
      'A record of bids won, and a clear view of why the others were lost.'
    ]
  },
  {
    id: 'gg-fin-008',
    title: 'Deputy Manager — Finance & Accounts',
    department: 'Finance',
    division: 'Group',
    location: '{{LOCATION_HQ_PLACEHOLDER}}',
    type: 'Full-time',
    experience: '4–8 years',
    posted: '2026-09-03',
    summary:
      'Consolidate the books across a multi-division group and produce management reporting that business heads actually use.',
    responsibilities: [
      'Own monthly close and consolidation across divisions.',
      'Prepare management reporting with division-level margin visibility.',
      'Manage GST, TDS and statutory filings alongside the compliance team.',
      'Support audit and coordinate with statutory auditors.'
    ],
    requirements: [
      'CA, CMA or an MBA in Finance.',
      'Four or more years in accounts, ideally in a multi-entity group.',
      'Strong Indian GAAP and GST working knowledge.'
    ]
  },
  {
    id: 'gg-ops-009',
    title: 'Security Operations Supervisor',
    department: 'Operations',
    division: 'Security',
    divisionSlug: 'security',
    location: 'Pan-India',
    type: 'Full-time',
    experience: '5–9 years',
    posted: '2026-09-04',
    summary:
      'Supervise deployed security personnel on site rather than from a head office — the difference between a managed service and a headcount supply.',
    responsibilities: [
      'Manage deployment, rostering and relief across client sites.',
      'Conduct site inspections and close out findings.',
      'Run post-specific briefing and refresher training.',
      'Serve as the client escalation point for service issues.'
    ],
    requirements: [
      'Five or more years in security operations or facility management.',
      'PSARA-regime familiarity and current statutory awareness.',
      'Willingness to travel to sites regularly; this is not a desk role.'
    ]
  }
];

/* ===========================================================================
   DERIVED HELPERS
   =========================================================================== */

export const getJob = id => JOBS.find(job => job.id === id) || null;

export const filterJobs = ({ department = 'all', location = 'all', type = 'all' } = {}) =>
  JOBS.filter(job =>
    (department === 'all' || job.department === department) &&
    (location === 'all'   || job.location === location) &&
    (type === 'all'       || job.type === type)
  );

export const JOB_COUNTS = {
  total: JOBS.length,
  byDepartment: DEPARTMENTS.reduce((acc, dept) => {
    acc[dept] = JOBS.filter(job => job.department === dept).length;
    return acc;
  }, {})
};

/* ===========================================================================
   CAREERS PAGE CONTENT
   =========================================================================== */

export const BENEFITS = [
  {
    icon: 'consulting',
    title: 'Scope before seniority',
    text: 'The structures are not fixed yet. Take a problem seriously and you will end up owning it, regardless of how long you have been here.'
  },
  {
    icon: 'education',
    title: 'Training that is funded',
    text: 'We run a skilling division. Certification and technical training for our own people are paid for, not reimbursed grudgingly.'
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
    text: 'Fifteen sectors under one employer. An internal move is a transfer conversation, not a resignation.'
  },
  {
    icon: 'check-circle',
    title: 'A decision you can reach',
    text: 'The leadership team is small and accessible. You will not wait a quarter for an answer that takes ten minutes.'
  }
];

/** What actually happens after you apply. Published because most employers do not. */
export const HIRING_PROCESS = [
  { title: 'Application', text: 'We read every application. You get a response either way, within ten working days.' },
  { title: 'Conversation', text: 'A first call with the hiring manager — not a screening call with someone reading a checklist.' },
  { title: 'Practical assessment', text: 'A task or site visit relevant to the actual job. We do not use puzzles.' },
  { title: 'Offer and reference', text: 'A written offer with the full compensation structure, then references. No verbal-only offers.' }
];
