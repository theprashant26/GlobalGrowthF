/**
 * GLOBAL GROWTH — DIVISION PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Long-form page copy for the twelve divisions that have a dedicated page,
 * keyed by the same slug used in sectors.js.
 *
 * WHY THIS IS A SEPARATE FILE
 * sectors.js is the group's structural spine — 15 sectors, 93 divisions, slugs
 * and regulatory status — and is read by the navbar, the grids, the org tree
 * and the sectors page. Page prose has a different lifecycle and a different
 * author, and folding it in would roughly triple that file. divisionPage.js
 * joins the two by slug at render time, so a division page still gets its
 * name, parent sector, status and siblings from sectors.js exactly as before.
 *
 * Every division here is operational. Planned entities do not get a page —
 * a page implies a service to enquire about, which is precisely what the
 * regulatory rule forbids.
 *
 * Shape:
 *   tagline      one line under the H1
 *   overview     two paragraphs of narrative
 *   capabilities six cards — what the division can do
 *   services     the concrete service list
 *   why          four differentiators specific to this division
 *   process      four steps describing how an engagement runs
 */

export const DIVISION_DETAIL = {

  /* ======================================================================
     AVIATION
     ====================================================================== */
  'aviation': {
    tagline: 'Airport-side capability, aviation training and air cargo, built to the standard the regulator inspects against.',
    overview: [
      'Aviation is the least forgiving sector we operate in. An airside pass, a dangerous-goods certificate or a ramp safety record is either current and correct or it is a finding — there is no partial credit. We treat that as an advantage, because it rewards operators willing to build the compliance function before the commercial one.',
      'Our aviation division supplies trained manpower, cargo handling capability and technical support to airport and airline operators. Where an activity requires a DGCA authorisation we hold the training and readiness in place and enter only once the approval is granted — which is why ground handling appears on this site as planned rather than offered.'
    ],
    capabilities: [
      { title: 'Airside manpower', text: 'Screened, badged and trained personnel for ramp, terminal and cargo roles, supervised by our own team on site.' },
      { title: 'Cargo handling', text: 'Acceptance, build-up, break-down and documentation for air freight, including temperature-sensitive consignments.' },
      { title: 'Aviation training', text: 'Ground-role training programmes aligned to operator and regulator syllabi, delivered through our skilling division.' },
      { title: 'Technical support', text: 'Aircraft cleaning, cabin readiness and turnaround support scheduled against the operator turn plan.' },
      { title: 'Compliance management', text: 'Badge validity, certification renewal and audit readiness tracked centrally rather than left to each station.' },
      { title: 'Station set-up', text: 'Standing up a new station: recruitment, training, equipment, documentation and the local supervisory layer.' }
    ],
    services: [
      'Ramp and terminal manpower supply',
      'Air cargo acceptance and documentation',
      'Cargo build-up and break-down',
      'Cabin cleaning and turnaround readiness',
      'Aviation ground-role training',
      'Dangerous goods handling support',
      'Station mobilisation and staffing',
      'Airside compliance and audit support'
    ],
    why: [
      { title: 'Compliance is the product', text: 'In aviation the operator is buying your audit record as much as your labour. Ours is maintained centrally, not reconstructed before an inspection.' },
      { title: 'We train our own', text: 'Ground staff come through our skilling division, so the standard is set before the first shift rather than corrected after the first finding.' },
      { title: 'Supervision on the ramp', text: 'Our supervisors are on the apron, not in a regional office. Turnaround problems get solved in the turn, not in the report.' },
      { title: 'We do not overreach', text: 'Where we lack an authorisation we say so plainly. You will not find us quoting for work we are not licensed to perform.' }
    ],
    process: [
      { title: 'Scope and station survey', text: 'We walk the station, read the turn plan and agree headcount, shift pattern and the service levels we will be measured on.' },
      { title: 'Recruit and certify', text: 'Personnel are recruited, background-verified, trained to the required syllabus and badged before deployment — never after.' },
      { title: 'Mobilise with supervision', text: 'Deployment comes with a named supervisor on site and an escalation route that reaches a decision-maker the same shift.' },
      { title: 'Audit and report', text: 'Certification validity, incident logs and service-level performance are reported monthly, including the misses.' }
    ]
  },

  /* ======================================================================
     METRO
     ====================================================================== */
  'metro': {
    tagline: 'Station operations, maintenance support and manpower for urban metro systems.',
    overview: [
      'Metro systems are judged on headway, cleanliness and the feeling of safety on a platform at eleven at night. None of those are engineering problems — they are staffing and supervision problems, which is where an operator like us earns its place.',
      'Our metro division supplies station operations, housekeeping, security and maintenance support to urban rail systems. The work is shift-based, publicly visible and audited continuously, so we build it around trained people, named supervisors and reporting the client can act on.'
    ],
    capabilities: [
      { title: 'Station operations', text: 'Customer assistance, gate and ticketing support, crowd management and platform supervision across the service day.' },
      { title: 'Housekeeping', text: 'Station, concourse and rolling-stock cleaning on cycles that match footfall rather than a fixed clock.' },
      { title: 'Security personnel', text: 'Trained and licensed guards for stations, depots and interchange points, deployed under our own supervision.' },
      { title: 'Maintenance support', text: 'Technician support for station systems — lifts, escalators, gates and lighting — with defined response times.' },
      { title: 'Depot services', text: 'Depot cleaning, material handling and support staffing outside revenue hours.' },
      { title: 'Manpower at scale', text: 'Recruiting and holding a rostered workforce across a whole line, including relief cover for absence and leave.' }
    ],
    services: [
      'Station operations and passenger assistance',
      'Platform and concourse supervision',
      'Station and rolling-stock housekeeping',
      'Licensed security deployment',
      'Lift and escalator attendant services',
      'Depot support and material handling',
      'Rostering, relief and absence cover',
      'Incident reporting and escalation'
    ],
    why: [
      { title: 'Rostering is the hard part', text: 'Anyone can quote a headcount. Holding it across every shift, every day, including festival weeks, is the actual service — and it is what we are set up for.' },
      { title: 'Publicly visible standards', text: 'Metro work is inspected by the travelling public continuously. We staff and supervise it accordingly.' },
      { title: 'One group, several functions', text: 'Operations, housekeeping, security and maintenance from one accountable party rather than four contracts that blame each other.' },
      { title: 'Trained before deployment', text: 'Customer-facing staff are trained on conduct and incident handling before they meet a passenger.' }
    ],
    process: [
      { title: 'Line and station survey', text: 'We assess footfall patterns, shift requirements and the service levels in the contract before proposing a structure.' },
      { title: 'Recruit and train', text: 'Staff are recruited locally where possible, verified, and trained on conduct, safety and incident escalation.' },
      { title: 'Deploy with supervision', text: 'Every station group gets a named supervisor and a documented escalation path.' },
      { title: 'Measure and adjust', text: 'Attendance, cleanliness audits and incident logs are reported to the client and used to adjust deployment.' }
    ]
  },

  /* ======================================================================
     HOTELS
     ====================================================================== */
  'hotels': {
    tagline: 'Hotel and resort operations built on one service standard, whatever the property.',
    overview: [
      'Indian hospitality rarely fails on ambition. It fails on consistency — the property that is excellent on Tuesday and indifferent on Sunday, because the standard lived in one manager rather than in a system.',
      'Our hotels division operates and supports properties against a documented service standard: how a room is turned, how long a guest waits, what happens when something goes wrong. It is less romantic than a design brief and it is the thing guests actually notice.'
    ],
    capabilities: [
      { title: 'Property operations', text: 'Front office, housekeeping and food-and-beverage service run to a written standard rather than a house style.' },
      { title: 'Housekeeping systems', text: 'Room-turn procedures, linen management and inspection routines with a documented pass rate.' },
      { title: 'Food and beverage', text: 'Restaurant, banquet and in-room dining operations, including kitchen hygiene and supplier standards.' },
      { title: 'Guest experience', text: 'Complaint handling and recovery procedures that resolve at the property rather than escalating to a review site.' },
      { title: 'Staffing and training', text: 'Recruitment and service training through our skilling division, which reduces the turnover that erodes standards.' },
      { title: 'Pre-opening support', text: 'Standing up a new property: manning plan, procedures, supplier onboarding and staff training before the first guest.' }
    ],
    services: [
      'Hotel and resort operations management',
      'Housekeeping and laundry operations',
      'Front office and reservations support',
      'Restaurant and banquet operations',
      'Kitchen hygiene and food safety compliance',
      'Hospitality staff recruitment and training',
      'Pre-opening mobilisation',
      'Guest experience and complaint recovery'
    ],
    why: [
      { title: 'The standard is written down', text: 'A service standard that exists only in a manager’s head leaves with that manager. Ours is documented, trained and audited.' },
      { title: 'We fix turnover first', text: 'Most hospitality quality problems are staffing problems. We recruit and train through our own division and manage retention deliberately.' },
      { title: 'Audited, not assumed', text: 'Room inspections and hygiene checks are logged with a pass rate the owner can see, not asserted at a monthly meeting.' },
      { title: 'Group support behind the property', text: 'Procurement, facility maintenance and security come from within the group rather than from four separate vendors.' }
    ],
    process: [
      { title: 'Property assessment', text: 'We review the property, current standards, staffing and cost base, and set out honestly what is achievable and in what order.' },
      { title: 'Standards and manning', text: 'Written procedures and a manning plan are agreed, with the service levels the property will be held to.' },
      { title: 'Train and transition', text: 'Staff are trained on the new procedures before handover, so the standard starts on day one rather than settling in over months.' },
      { title: 'Audit and report', text: 'Inspection results, guest feedback and cost performance are reported to the owner on a fixed cycle.' }
    ]
  },

  /* ======================================================================
     HEALTHCARE
     ====================================================================== */
  'healthcare': {
    tagline: 'Care delivery, diagnostics support and medical equipment for hospitals and health facilities.',
    overview: [
      'Healthcare is the sector where our operating discipline matters most and is least visible to the public. A hospital runs on the things nobody thanks you for — sterile supply arriving on time, equipment serviced before it fails, support staff trained on infection control.',
      'Our healthcare division supplies those functions to hospitals and health facilities, alongside diagnostics support and medical equipment. Pharmacy and pharmaceutical activity sit behind State Pharmacy Council and drug licensing, and are shown across this site as planned for exactly that reason.'
    ],
    capabilities: [
      { title: 'Hospital support services', text: 'Housekeeping, patient transport, sterile supply logistics and waste handling trained to infection-control standards.' },
      { title: 'Diagnostics support', text: 'Sample logistics, cold-chain transport and laboratory support services with documented chain of custody.' },
      { title: 'Medical equipment', text: 'Supply, installation and preventive maintenance of medical equipment with defined uptime commitments.' },
      { title: 'Facility management', text: 'Engineering, HVAC and utilities support for clinical environments where downtime is a clinical risk.' },
      { title: 'Trained healthcare staff', text: 'Support and paramedical staffing recruited and trained through our skilling division.' },
      { title: 'Biomedical waste handling', text: 'Segregation, storage and handover of biomedical waste to authorised processors, with the records to prove it.' }
    ],
    services: [
      'Hospital housekeeping and infection control support',
      'Patient transport and portering',
      'Sterile supply and linen logistics',
      'Diagnostic sample collection and cold-chain transport',
      'Medical equipment supply and installation',
      'Preventive and breakdown maintenance',
      'Biomedical waste handling and documentation',
      'Healthcare support staff recruitment and training'
    ],
    why: [
      { title: 'Infection control is trained, not assumed', text: 'Support staff in a clinical environment need specific training. Ours get it before deployment, and it is refreshed on a schedule.' },
      { title: 'Documentation that survives audit', text: 'Waste handover, cold-chain temperature logs and equipment service records are maintained to withstand inspection.' },
      { title: 'Uptime commitments in writing', text: 'Equipment maintenance carries a defined response and uptime figure, because a failed autoclave is a clinical problem, not a facilities one.' },
      { title: 'We stay inside our licence', text: 'We supply and support. We do not dispense or manufacture, and we do not imply otherwise anywhere on this site.' }
    ],
    process: [
      { title: 'Facility assessment', text: 'We walk the facility with the clinical and administrative teams and agree scope, risk points and service levels.' },
      { title: 'Train to the environment', text: 'Staff are trained on infection control, patient interaction and the specific protocols of that facility.' },
      { title: 'Deploy and document', text: 'Deployment comes with a supervisor, a documented protocol set and the record-keeping the facility will be audited on.' },
      { title: 'Review with the clinical team', text: 'Performance is reviewed with clinical leadership, not only with procurement.' }
    ]
  },

  /* ======================================================================
     TRAVEL & TOURISM
     ====================================================================== */
  'travel-tourism': {
    tagline: 'Corporate travel, managed tours and destination services across India.',
    overview: [
      'Travel is a promise made in advance and kept under conditions nobody controls. Flights move, roads close, weather turns. What separates operators is not whether things go wrong but how quickly a traveller reaches someone who can actually fix it.',
      'Our travel and tourism division handles corporate travel, managed group tours and destination services, with the fleet and driver capability to deliver the ground portion ourselves rather than brokering it.'
    ],
    capabilities: [
      { title: 'Corporate travel', text: 'Booking, itinerary management and policy compliance for business travel, with a named coordinator per account.' },
      { title: 'Group tours', text: 'Planned and escorted group travel including transport, accommodation and on-ground coordination.' },
      { title: 'Ground transport', text: 'Vehicles and trained drivers from our own fleet and driver divisions, not subcontracted at the last minute.' },
      { title: 'Destination services', text: 'Local coordination, permits and arrangements at destination, handled by people who are actually there.' },
      { title: 'MICE and events', text: 'Travel and logistics for conferences, offsites and incentive travel, coordinated with our event capability.' },
      { title: '24-hour support', text: 'A support route that reaches a person able to rebook, not a queue that reopens on Monday.' }
    ],
    services: [
      'Corporate travel booking and management',
      'Domestic group tour operations',
      'Airport transfers and ground transport',
      'Hotel and accommodation booking',
      'Conference and offsite travel logistics',
      'Destination coordination and permits',
      'Travel policy compliance reporting',
      'Round-the-clock traveller support'
    ],
    why: [
      { title: 'We own the ground portion', text: 'Vehicles and drivers come from our own divisions, so a delayed flight is a rescheduling problem rather than a renegotiation with a vendor.' },
      { title: 'Support that can act', text: 'Out-of-hours contact reaches someone authorised to rebook and spend, which is the only kind of support that matters at 2am.' },
      { title: 'Policy without friction', text: 'Corporate travel policy is enforced at booking, so finance is not reconciling exceptions after the fact.' },
      { title: 'Honest about capacity', text: 'In peak season we tell you what we can hold rather than accepting the booking and sorting it out later.' }
    ],
    process: [
      { title: 'Understand the pattern', text: 'We map how your people actually travel — routes, frequency, approval chain — before proposing a structure.' },
      { title: 'Set policy and access', text: 'Travel policy, approval routing and a named coordinator are agreed and configured.' },
      { title: 'Book and deliver', text: 'Bookings run through the coordinator, with our own vehicles and drivers on the ground portion.' },
      { title: 'Report and refine', text: 'Spend, compliance and exception reporting go to finance monthly, with recommendations rather than raw data.' }
    ]
  },

  /* ======================================================================
     RAILWAYS
     ====================================================================== */
  'railways': {
    tagline: 'Rolling-stock support, station services and railway infrastructure work.',
    overview: [
      'Railway work sits inside a safety regime that predates every one of us and does not bend. Possession windows are fixed, competence requirements are documented, and an operator who is casual about either does not get a second contract.',
      'Our railways division provides rolling-stock support, station services and infrastructure work within that regime — planned to the possession, staffed with certified people and documented to survive scrutiny.'
    ],
    capabilities: [
      { title: 'Rolling-stock services', text: 'Cleaning, servicing support and turnaround preparation for coaching stock, planned against the rake link.' },
      { title: 'Station services', text: 'Housekeeping, passenger assistance and facility upkeep across station buildings and platforms.' },
      { title: 'Track-side works', text: 'Civil and support works executed within possession windows, with the planning discipline that requires.' },
      { title: 'Electrical and signalling support', text: 'Support to electrical and signalling teams, working to the competence requirements of the discipline.' },
      { title: 'Depot operations', text: 'Depot cleaning, material movement and support staffing outside traffic hours.' },
      { title: 'Safety documentation', text: 'Competence records, safety briefings and work-permit documentation maintained as a live record.' }
    ],
    services: [
      'Coaching stock cleaning and servicing',
      'Station housekeeping and upkeep',
      'Passenger assistance services',
      'Track-side civil works within possession',
      'Depot support and material handling',
      'Electrical and signalling support labour',
      'Safety briefing and competence records',
      'Manpower supply to railway contractors'
    ],
    why: [
      { title: 'We plan to the possession', text: 'A possession window is fixed. We resource and sequence to finish inside it rather than requesting an extension.' },
      { title: 'Competence on file', text: 'Every person deployed has current, documented competence for the work. That record is maintained centrally.' },
      { title: 'Safety culture, not safety paperwork', text: 'Briefings happen at the worksite before the shift, not as a form signed in an office.' },
      { title: 'Group depth behind the contract', text: 'Manpower, electrical and civil capability come from within the group, so scaling up does not mean scrambling for subcontractors.' }
    ],
    process: [
      { title: 'Scope and possession planning', text: 'We plan the work against the available window, with a resource profile that finishes inside it.' },
      { title: 'Certify the workforce', text: 'Personnel are verified, briefed and confirmed competent for the specific task before mobilisation.' },
      { title: 'Execute under supervision', text: 'Work runs with a supervisor accountable for safety and progress, reporting at agreed intervals.' },
      { title: 'Hand back and document', text: 'The site is handed back clean, with the completion and safety documentation the client needs for their own record.' }
    ]
  },

  /* ======================================================================
     LOGISTICS
     ====================================================================== */
  'logistics': {
    tagline: 'Warehousing, transport, cold chain and last mile operated as one connected chain.',
    overview: [
      'Supply chains do not fail in the middle of a link. They fail at the joins — between the warehouse and the truck, the truck and the last mile, the cold room and the counter. That is where visibility drops and where accountability usually gets handed to somebody else.',
      'Because we operate each of those links ourselves, we can be measured on the handover. That is the entire argument for an integrated logistics business, and it is what our clients actually buy.'
    ],
    capabilities: [
      { title: 'Warehousing', text: 'Storage, inventory management and order fulfilment with stock accuracy reported rather than assumed.' },
      { title: 'Transport and line haul', text: 'Full and part load movement across routes, with our own fleet and drivers on the critical legs.' },
      { title: 'Cold chain', text: 'Temperature-controlled storage and transport with continuous logging and a documented excursion procedure.' },
      { title: 'Last mile', text: 'Final delivery with proof of delivery, exception handling and a route back to a person when something goes wrong.' },
      { title: 'Fleet management', text: 'Maintenance, compliance and utilisation management for owned and client fleets.' },
      { title: 'Supply chain design', text: 'Network design, warehouse siting and route planning based on your actual demand, not a template.' }
    ],
    services: [
      'Warehousing and inventory management',
      'Order fulfilment and dispatch',
      'Full and part truckload transport',
      'Cold-chain storage and transport',
      'Last-mile delivery',
      'Reverse logistics and returns',
      'Fleet maintenance and compliance',
      'Network and route design'
    ],
    why: [
      { title: 'One party across the whole chain', text: 'No subcontractor to point at. When a consignment moves from our warehouse to our truck to our last mile, the handover is ours to answer for.' },
      { title: 'Cold chain that is actually logged', text: 'Temperature is recorded continuously and excursions are reported, not discovered by the consignee.' },
      { title: 'Measured on the joins', text: 'Our KPIs cover handover accuracy and dwell time, not just on-time delivery of the easy legs.' },
      { title: 'Drivers we trained', text: 'Drivers come through our own driver division, so conduct and vehicle handling are set before they carry your goods.' }
    ],
    process: [
      { title: 'Map the current chain', text: 'We walk your existing flow end to end and identify where cost and failure actually sit — usually not where expected.' },
      { title: 'Design and cost', text: 'Network, storage and route design are proposed with a cost per consignment you can compare against today.' },
      { title: 'Transition in stages', text: 'Migration runs lane by lane so a problem in transition never takes the whole chain down.' },
      { title: 'Operate and report', text: 'Monthly reporting on cost, service level, damage and dwell — including the metrics that make us look bad.' }
    ]
  },

  /* ======================================================================
     ELECTRICAL
     ====================================================================== */
  'electrical': {
    tagline: 'LT and HT electrical design, installation, testing and maintenance for industrial and commercial projects.',
    overview: [
      'Electrical work is judged twice: once at commissioning, when everything is new and supervised, and again three years later when a breaker trips at a shift change. The second test is the real one, and it is decided by decisions made during design.',
      'Our electrical division carries a project from load calculation through installation to commissioning and then maintains it — which means the people who specified the system are the ones who have to live with it.'
    ],
    capabilities: [
      { title: 'Electrical design', text: 'Load calculations, single-line diagrams, cable sizing and protection coordination to IS and IEC standards.' },
      { title: 'LT and HT installation', text: 'Panel, transformer, switchgear and cabling installation for industrial and commercial projects.' },
      { title: 'Testing and commissioning', text: 'Pre-commissioning checks, protection testing and energisation with documented results.' },
      { title: 'Preventive maintenance', text: 'Scheduled inspection, thermography and testing that finds the fault before the shutdown does.' },
      { title: 'Solar and EV infrastructure', text: 'Rooftop solar and EV charging installation, tied into existing distribution correctly rather than bolted on.' },
      { title: 'Energy efficiency', text: 'Load studies and power-factor improvement with a measured saving rather than a projected one.' }
    ],
    services: [
      'Electrical system design and drawings',
      'LT and HT panel installation',
      'Transformer and switchgear installation',
      'Cable laying and termination',
      'Earthing and lightning protection',
      'Testing, commissioning and energisation',
      'Preventive and breakdown maintenance',
      'Solar and EV charging installation'
    ],
    why: [
      { title: 'Designers who commission', text: 'The team that produced the drawings is present at commissioning. Design decisions get tested against reality by the people who made them.' },
      { title: 'Documented test results', text: 'Commissioning comes with actual test values, not a signed checklist. You get an as-built record you can maintain against.' },
      { title: 'Maintenance from day one', text: 'We would rather hold the maintenance contract, because it is the honest test of whether the installation was done properly.' },
      { title: 'Coordination before site', text: 'Interfaces with civil and mechanical are resolved on paper, which is far cheaper than resolving them in a shaft.' }
    ],
    process: [
      { title: 'Load study and design', text: 'We establish the actual load profile and design to it, including the headroom the client will need in three years.' },
      { title: 'Approve and procure', text: 'Drawings and equipment specifications are approved before procurement, so substitutions do not appear on site.' },
      { title: 'Install and test', text: 'Installation runs to a method statement, with staged testing rather than one commissioning event at the end.' },
      { title: 'Hand over and maintain', text: 'Handover includes as-built drawings and test records, and a maintenance schedule that starts immediately.' }
    ]
  },

  /* ======================================================================
     SECURITY
     ====================================================================== */
  'security': {
    tagline: 'Trained and licensed security personnel, supervised on site rather than from a head office.',
    overview: [
      'Security is bought as a headcount and judged as a service. The gap between those two is selection, training and supervision — and it is the reason two contracts at the same rate can produce completely different outcomes.',
      'We recruit through our own skilling division, train to a documented standard, and supervise on site. That last point is the one most providers quietly skip, and it is where the service is actually won or lost.'
    ],
    capabilities: [
      { title: 'Manned guarding', text: 'Licensed security personnel for industrial, commercial and residential sites, deployed on documented post orders.' },
      { title: 'Access control', text: 'Gate management, visitor handling and material movement control with records that reconcile.' },
      { title: 'Supervision and audit', text: 'Field supervisors conducting site checks on a schedule, with findings logged and closed out.' },
      { title: 'Electronic security support', text: 'CCTV and alarm monitoring support integrated with the manned deployment rather than run separately.' },
      { title: 'Emergency response', text: 'Documented response procedures for fire, medical and security incidents, briefed and rehearsed at post level.' },
      { title: 'Facility integration', text: 'Where a site also needs housekeeping or maintenance, those come from within the group under one accountability.' }
    ],
    services: [
      'Manned guarding — industrial and commercial',
      'Residential and gated community security',
      'Gate and access control management',
      'Visitor and material movement control',
      'CCTV and alarm monitoring support',
      'Emergency response procedures',
      'Field supervision and site audits',
      'Event and temporary deployment'
    ],
    why: [
      { title: 'Supervised on site', text: 'A supervisor who visits is not supervision. Ours conduct scheduled site checks, and the findings are logged and closed.' },
      { title: 'Selection before training', text: 'Most guarding failures are selection failures. Background verification and screening happen before anyone reaches training.' },
      { title: 'Post orders in writing', text: 'Every post has documented orders, so a relief guard performs the same job as the regular one.' },
      { title: 'Statutory compliance held centrally', text: 'Licensing, wage compliance and statutory records are managed at group level, which is where a client’s liability actually sits.' }
    ],
    process: [
      { title: 'Site risk survey', text: 'We survey the site, identify the actual risk points and propose a deployment against them rather than a standard headcount.' },
      { title: 'Recruit and verify', text: 'Personnel are background-verified and screened, then trained on the specific post orders for your site.' },
      { title: 'Deploy and supervise', text: 'Deployment includes a named field supervisor, a check schedule and a documented escalation route.' },
      { title: 'Audit and improve', text: 'Site audits, incident reports and attendance are reported monthly, with corrective actions tracked to closure.' }
    ]
  },

  /* ======================================================================
     MANUFACTURING
     ====================================================================== */
  'manufacturing': {
    tagline: 'Industrial products, fabrication and precision components made to specification.',
    overview: [
      'Manufacturing is the least negotiable business in the group. A part either meets the drawing or it does not, and no amount of relationship management changes a measurement.',
      'Our manufacturing division produces industrial products, fabricated assemblies and components to customer specification, with in-process inspection and documented material traceability. It also gives our infrastructure and mobility divisions a dependable domestic supply line.'
    ],
    capabilities: [
      { title: 'Fabrication', text: 'Structural and sheet-metal fabrication, welding and assembly to drawing, with welder qualification on file.' },
      { title: 'Precision machining', text: 'Component machining to specified tolerances with in-process inspection rather than final-stage sorting.' },
      { title: 'Electrical assemblies', text: 'Panel building and electrical assembly work, tested before dispatch.' },
      { title: 'Quality assurance', text: 'Documented inspection at defined stages, with material test certificates and traceability maintained.' },
      { title: 'Industrial products', text: 'Manufacture of standard and made-to-order industrial products for group and external customers.' },
      { title: 'Prototype and pilot', text: 'First-article production and pilot runs before committing a customer to volume tooling.' }
    ],
    services: [
      'Structural and sheet-metal fabrication',
      'Welding and assembly to drawing',
      'Precision component machining',
      'Electrical panel building',
      'Surface treatment and finishing',
      'First-article and pilot production',
      'In-process and final inspection',
      'Material traceability documentation'
    ],
    why: [
      { title: 'Inspection during, not after', text: 'Checking at the end sorts good from bad. Checking in process stops bad from being made, which is what protects your schedule.' },
      { title: 'Traceability as standard', text: 'Material certificates and batch traceability are maintained by default, not produced on request after a failure.' },
      { title: 'We say no to a drawing we cannot hold', text: 'If a tolerance is beyond our process we tell you at quotation, not at first delivery.' },
      { title: 'A captive customer keeps us honest', text: 'Our own infrastructure and mobility divisions buy from this plant. Internal customers complain faster than external ones.' }
    ],
    process: [
      { title: 'Drawing review', text: 'We review the drawing and flag anything our process cannot hold before quoting — including tolerances that will cost you unnecessarily.' },
      { title: 'First article', text: 'A first article is produced and dimensionally verified against the drawing before any volume is committed.' },
      { title: 'Production with in-process checks', text: 'Production runs with inspection at defined stages and documented results against each batch.' },
      { title: 'Dispatch with documentation', text: 'Delivery includes inspection records and material certificates, so your incoming inspection has something to check against.' }
    ]
  },

  /* ======================================================================
     SKILL DEVELOPMENT
     ====================================================================== */
  'skill-development': {
    tagline: 'Vocational, technical and driver training held to placement outcomes, not certification volume.',
    overview: [
      'India does not have a training shortage. It has a shortage of training that leads to a job. Certificates are issued in enormous numbers every year, and employers still cannot fill positions — because the certificate and the competence came apart somewhere.',
      'We run skilling as an operating business measured on placement, and we are our own largest customer. Our security, driver, logistics and hospitality divisions hire from these programmes, which means a weak programme shows up as an operational problem within weeks.'
    ],
    capabilities: [
      { title: 'Vocational training', text: 'Trade programmes aligned to NSQF levels and sector skill council standards, assessed independently.' },
      { title: 'Technical training', text: 'Electrical, mechanical and maintenance training built around the tasks an employer will actually set.' },
      { title: 'Driver training', text: 'Commercial driver training covering vehicle handling, road safety, documentation and conduct.' },
      { title: 'Service-sector training', text: 'Hospitality, retail and customer-facing training including conduct and complaint handling.' },
      { title: 'Digital skills', text: 'Foundational digital and workplace-software training for roles that now assume it.' },
      { title: 'Corporate training', text: 'Bespoke programmes for employers who need a specific competence and a measurable pass standard.' }
    ],
    services: [
      'NSQF-aligned vocational programmes',
      'Technical and maintenance trade training',
      'Commercial driver training and licensing support',
      'Hospitality and service training',
      'Security personnel training',
      'Digital and workplace skills',
      'Corporate and bespoke programmes',
      'Assessment, certification and placement support'
    ],
    why: [
      { title: 'Measured on placement', text: 'We publish placement outcomes rather than enrolment numbers, and we report the programmes that underperform.' },
      { title: 'We hire our own trainees', text: 'The group employs graduates of these programmes. A weak programme becomes our operational problem, which is the strongest quality incentive there is.' },
      { title: 'Trainers who did the job', text: 'Trainers are recruited from the trade, not only from teaching, and are certified against the standard they teach.' },
      { title: 'Assessment we do not control', text: 'Certification assessment is independent. A training body that marks its own work is not offering a credential.' }
    ],
    process: [
      { title: 'Define the competence', text: 'We start from what the employer needs a person to be able to do, then design the programme backwards from it.' },
      { title: 'Select candidates honestly', text: 'Candidates are assessed for aptitude and told plainly whether the programme suits them, rather than enrolled to fill a batch.' },
      { title: 'Train and assess', text: 'Training runs practically, with independent assessment against the published standard.' },
      { title: 'Place and follow up', text: 'Placement support is provided and outcomes are tracked at three and six months, including those who did not stay.' }
    ]
  },

  /* ======================================================================
     DRIVER SERVICES
     ====================================================================== */
  'driver': {
    tagline: 'Trained, verified commercial and corporate drivers, supplied with supervision behind them.',
    overview: [
      'A driver is the person your organisation trusts with a vehicle, a consignment and often a passenger, usually without supervision. Most driver supply treats that as a staffing transaction. It is a risk decision.',
      'Our driver division recruits through our own skilling programmes, verifies background and licence, trains on conduct and safety, and supervises after deployment. The result is a driver you can place with a client, a family or a load without wondering.'
    ],
    capabilities: [
      { title: 'Commercial drivers', text: 'Licensed drivers for goods vehicles, trained on load handling, documentation and route discipline.' },
      { title: 'Corporate drivers', text: 'Drivers for executive and staff transport, trained on conduct, discretion and punctuality.' },
      { title: 'Verification and licensing', text: 'Background verification, licence validation and medical fitness confirmed before deployment.' },
      { title: 'Safety training', text: 'Defensive driving, fatigue management and incident procedure, refreshed on a schedule rather than once at induction.' },
      { title: 'Replacement and relief', text: 'Cover for absence and leave so a client is never left without a driver at short notice.' },
      { title: 'Fleet-linked supply', text: 'Where the client needs vehicles as well, these come from our fleet division under one agreement.' }
    ],
    services: [
      'Commercial goods vehicle drivers',
      'Corporate and executive drivers',
      'Staff transport drivers',
      'Long-haul and intercity drivers',
      'Temporary and relief cover',
      'Background verification and licence checks',
      'Defensive driving and safety training',
      'Driver performance monitoring'
    ],
    why: [
      { title: 'Verified before deployment', text: 'Licence validity, background and medical fitness are confirmed before a driver reaches you — not after an incident raises the question.' },
      { title: 'Trained in our own programmes', text: 'Drivers come through our skilling division, so conduct and safety standards are set by us rather than inherited.' },
      { title: 'Relief is part of the service', text: 'Absence cover is built into the arrangement. A driver falling ill is our problem to solve, not yours.' },
      { title: 'Supervised after placement', text: 'Performance and conduct are monitored after deployment, with a route for the client to raise an issue and see it addressed.' }
    ],
    process: [
      { title: 'Understand the requirement', text: 'Vehicle type, route pattern, hours and the conduct standard expected — a family car and a container tractor are different hires.' },
      { title: 'Verify and match', text: 'Candidates are verified and matched to the requirement, with the client meeting the driver before confirmation where they wish.' },
      { title: 'Train and deploy', text: 'Deployment follows safety and conduct training specific to the role and the vehicle class.' },
      { title: 'Monitor and support', text: 'Performance is reviewed, relief is arranged for absence, and issues are addressed through a named contact.' }
    ]
  }
};

/** Look up page content for a division slug. */
export const getDivisionDetail = slug => DIVISION_DETAIL[slug] || null;
