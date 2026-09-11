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
        vacancies: 150,
        fee: 251,
        qualification: 'Intermediate (10+2) or equivalent. Aviation, travel and tourism, airport management, business management or a related qualification preferred.',
        experience: '7–12 years in aviation, airport operations, airline services, travel management or business development.',
        summary: 'Leads the overall business activities of the Aviation Division — business planning, operational coordination, revenue growth, team leadership, partner management and service-quality standards.',
        duties: [
          'Lead the overall planning and strategic development of the Aviation Division.',
          'Coordinate with airports, airlines, travel partners and service providers.',
          'Develop and monitor revenue, business-development and operational targets.',
          'Manage, guide and evaluate departmental teams and senior operational staff.',
          'Monitor business performance and prepare management reports and reviews.',
          'Develop strategies for business growth, customer acquisition and service expansion.',
          'Ensure coordination between aviation, travel, operations, finance and HR.',
          'Monitor service quality, customer satisfaction and operational efficiency.',
          'Ensure adherence to applicable aviation, airport, safety and security requirements.',
          'Identify operational and business risks and coordinate corrective actions.',
          'Represent the division in meetings with business partners and management.',
          'Support senior management in developing new aviation and travel-service opportunities.'
        ]
      },
      {
        title: 'Airport Operations Manager',
        code: 'GGIPL-AVI-OPS-002',
        level: 'L6',
        salary: '₹60,000–₹90,000',
        vacancies: 200,
        fee: 210,
        qualification: 'Intermediate (10+2) or equivalent from a recognised board or institution.',
        experience: '3–7 years in airport operations, aviation, passenger services or ground handling.',
        summary: 'Coordinates and supervises day-to-day ground and airport operations, passenger services, staff scheduling and operational reporting.',
        duties: [
          'Coordinate and supervise day-to-day ground and airport operations.',
          'Manage passenger-service activities to ensure efficient service delivery.',
          'Prepare staff duty rosters, shift schedules and workforce allocation.',
          'Monitor operations and prepare daily, weekly and monthly reports.',
          'Coordinate with relevant departments and operational teams.',
          'Identify operational issues and ensure timely escalation and resolution.',
          'Monitor compliance with airport safety, security and service procedures.',
          'Maintain proper operational records and documentation.',
          'Support management in improving operational efficiency and passenger experience.',
          'Handle operational coordination during delays, disruptions, emergencies and other service-related situations.'
        ]
      },
      {
        title: 'Ticketing Executive',
        code: 'GGIPL-AVI-TKT-003',
        level: 'L8',
        salary: '₹40,000–₹70,000',
        vacancies: 240,
        fee: 296,
        qualification: '12th pass / Intermediate or Graduate from a recognised board or institution.',
        experience: '0–3 years in airline ticketing, travel services, customer service or reservations. Freshers may apply.',
        summary: 'Assists customers with ticket reservations, modifications, cancellations and travel documentation, maintaining professional service standards.',
        duties: [
          'Assist customers with flight ticket booking and reservation services.',
          'Support ticket modification, rescheduling and cancellation requests.',
          'Handle customer queries through appropriate communication channels.',
          'Provide accurate information on fares, schedules and booking procedures.',
          'Assist customers with travel documentation requirements.',
          'Verify passenger and booking information before completing transactions.',
          'Maintain accurate booking records and customer information.',
          'Coordinate with relevant teams or service providers to resolve booking-related issues.',
          'Handle customer concerns professionally and escalate complex cases when required.',
          'Follow applicable company policies, ticketing procedures, data-protection requirements and service standards.'
        ]
      },
      {
        title: 'Ground Support Executive',
        code: 'GGIPL-AVI-GSE-004',
        level: 'L8',
        salary: '₹39,000–₹60,000',
        vacancies: 250,
        fee: 298,
        qualification: '12th pass / Intermediate or Graduate from a recognised board or institution.',
        experience: '0–3 years in airport ground operations, passenger services or customer support. Freshers may apply.',
        summary: 'Supports day-to-day airport ground operations, assists passengers and coordinates with operational teams.',
        duties: [
          'Assist with passenger handling and ground-service activities.',
          'Support passengers with check-in, boarding, baggage-related and general airport-service queries, as applicable to the assigned role.',
          'Coordinate with relevant airport, airline, ground-handling and service teams.',
          'Provide professional customer communication and passenger assistance.',
          'Assist in managing operational requirements during flight arrivals, departures, delays and service disruptions.',
          'Maintain accurate operational records and documentation.',
          'Support the verification and processing of passenger and travel-related documents, where applicable.',
          'Escalate operational incidents, passenger concerns and service issues to the appropriate supervisor.',
          'Follow applicable airport safety, security, operational and service procedures.',
          'Maintain professional conduct and contribute to a positive passenger experience.'
        ]
      },
      {
        title: 'Customer Service Executive',
        code: 'GGIPL-AVI-CSE-005',
        level: 'L8',
        salary: '₹35,000–₹50,000',
        vacancies: 260,
        fee: 239,
        qualification: '12th pass / Intermediate or Graduate from a recognised board or institution.',
        experience: '0–3 years in customer service, aviation, travel and tourism or hospitality. Freshers may apply.',
        summary: 'Provides professional assistance to customers and passengers, resolves service queries and coordinates with relevant departments.',
        duties: [
          'Handle customer and passenger queries through appropriate channels.',
          'Provide accurate information on services, bookings, schedules and procedures.',
          'Assist with booking modifications, cancellations and service requests.',
          'Resolve customer complaints and service issues professionally and escalate complex matters to the appropriate supervisor.',
          'Maintain accurate customer records, service requests and communication logs.',
          'Coordinate with aviation, ticketing, ground operations and other relevant departments.',
          'Support passengers during service disruptions, delays or other operational situations, as assigned.',
          'Assist customers with travel-related documentation and service information.',
          'Maintain professional communication and contribute to a positive customer experience.',
          'Follow applicable company policies, operational procedures, customer-service standards and data-protection requirements.'
        ]
      },
      {
        title: 'Passenger Service Associate',
        code: 'GGIPL-AVI-PSA-006',
        level: 'L10',
        salary: '₹40,000–₹50,000',
        vacancies: 270,
        fee: 249,
        qualification: '12th pass / Intermediate or Graduate from a recognised board or institution.',
        experience: '0–3 years in passenger services, airport operations, travel and tourism or hospitality. Freshers may apply.',
        summary: 'Assists passengers throughout their airport journey, supports passenger-processing activities and coordinates with airport and operational teams.',
        duties: [
          'Assist passengers with check-in, boarding, arrival and departure requirements.',
          'Respond professionally to passenger service queries.',
          'Support verification and processing of passenger and travel documents.',
          'Assist with baggage-related queries and coordination.',
          'Coordinate with airport, airline, ground-handling and security teams.',
          'Provide assistance during delays, cancellations and special service situations.',
          'Maintain accurate passenger-service records and operational documentation.',
          'Escalate passenger complaints, operational incidents and service issues to the appropriate supervisor.',
          'Maintain professional standards of communication, appearance, conduct and customer service.',
          'Follow applicable airport safety, security, operational and service procedures.'
        ]
      },
      {
        title: 'Aviation Coordinator',
        code: 'GGIPL-AVI-COO-007',
        level: 'L9',
        salary: '₹28,000–₹35,000',
        vacancies: 210,
        fee: 199,
        qualification: '12th pass / Intermediate or Graduate from a recognised board or institution.',
        experience: '0–3 years in aviation, airport operations, travel and tourism, customer service or administration. Freshers may apply.',
        summary: 'Coordinates day-to-day aviation activities, maintains communication between operational teams and supports administrative processes.',
        duties: [
          'Coordinate daily aviation and airport-related activities as assigned.',
          'Maintain communication between operations, ticketing, passenger services and management.',
          'Assist in coordinating schedules, staff assignments and operational updates.',
          'Support customers with general aviation and travel-service information.',
          'Maintain and update operational records, reports, schedules and documentation.',
          'Coordinate with relevant internal teams and authorised external service providers.',
          'Monitor assigned operational activities and report delays, issues or incidents to the appropriate supervisor.',
          'Assist in handling flight-related operational updates and service coordination, where applicable.',
          'Support management in preparing routine operational reports and performance updates.',
          'Ensure assigned activities are carried out according to applicable company procedures, safety requirements and service standards.'
        ]
      }
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
        code: 'GGIPL-MET-BH-001',
        level: 'L3',
        salary: '₹80,000–₹1,50,000+',
        vacancies: 150,
        fee: 129,
        qualification: 'Graduate, engineering or management qualification from a recognised university or institution.',
        experience: '7+ years in metro rail, railway, urban transport, infrastructure, operations or project management.',
        summary: 'Leads the business and operational activities of the Metro Division — strategic planning, stakeholder management, performance targets and compliant service delivery.',
        duties: [
          'Lead strategic planning and business development for the Metro Division.',
          'Develop and monitor business, operational and performance targets.',
          'Coordinate with metro rail organisations, contractors, vendors and partners.',
          'Provide leadership to departmental and operational teams.',
          'Monitor operational performance, productivity and service quality.',
          'Identify new business opportunities, projects and partnerships.',
          'Prepare and review management reports and performance dashboards.',
          'Ensure coordination between metro operations, HR, finance and training.',
          'Monitor compliance with applicable safety, security, operational and contractual requirements.',
          'Identify operational risks and coordinate appropriate corrective and preventive actions.',
          'Lead meetings with internal teams and authorised external stakeholders.',
          'Support senior management in achieving the organisation’s long-term Metro business objectives.'
        ]
      },
      {
        title: 'Station Operations Manager',
        code: 'GGIPL-MET-SOM-002',
        level: 'L6',
        salary: '₹45,000–₹70,000',
        vacancies: 290,
        fee: 299,
        qualification: 'Intermediate (10+2) or equivalent from a recognised board or institution.',
        experience: 'Experience in metro rail, railway, station operations, passenger services or transport operations preferred.',
        summary: 'Coordinates and supervises day-to-day station activities, passenger services, staff deployment and safety procedures.',
        duties: [
          'Supervise daily station operations and passenger-service activities.',
          'Monitor station staff deployment, duty rosters and shifts.',
          'Ensure smooth management of passenger movement and station facilities.',
          'Coordinate with security, ticketing, customer service and maintenance teams.',
          'Report operational issues, incidents and service disruptions promptly.',
          'Manage station operations during peak hours, delays and emergencies.',
          'Maintain and review station operational records and documentation.',
          'Support safety, security and emergency-response procedures.',
          'Handle passenger-service issues and escalate serious complaints or incidents to the appropriate authority.',
          'Conduct regular coordination with supervisors and management regarding station performance.',
          'Support staff training, operational briefings and performance monitoring.',
          'Ensure professional service standards and proper conduct across station operations.'
        ]
      },
      {
        title: 'Station Controller / Operations Executive',
        code: 'GGIPL-MET-SCO-003',
        level: 'L9',
        salary: '₹41,000–₹60,000',
        vacancies: 280,
        fee: 295,
        qualification: '12th pass / Intermediate or Graduate, depending on the assigned role.',
        experience: 'Experience in metro rail, railway, station operations or transport operations preferred. Freshers may be considered for entry-level roles.',
        summary: 'Supports and monitors day-to-day station operations, coordinates with operational teams and assists with passenger movement and service management.',
        duties: [
          'Monitor and support day-to-day station operations.',
          'Coordinate with station staff, security, ticketing and maintenance teams.',
          'Assist in maintaining smooth passenger movement and station services.',
          'Communicate operational updates to the concerned supervisor.',
          'Support management of disruptions, delays and crowd-management situations.',
          'Maintain accurate station logs, operational records and reports.',
          'Assist with implementation of applicable safety, security, emergency-response and operational procedures.',
          'Respond professionally to passenger queries and coordinate escalation of service-related issues.',
          'Support staff coordination, shift activities, operational briefings and routine station requirements.',
          'Report unusual incidents, equipment or service issues, or safety concerns promptly to the appropriate authority.',
          'Coordinate with relevant teams during emergency or abnormal operational situations.',
          'Maintain professional conduct and contribute to efficient and passenger-friendly station operations.'
        ]
      },
      {
        title: 'Customer Service Executive',
        code: 'GGIPL-MET-CSE-004',
        level: 'L8',
        salary: '₹38,000–₹50,000',
        vacancies: 180,
        fee: 293,
        qualification: '12th pass / Intermediate or Graduate from a recognised board or institution.',
        experience: 'Experience in customer service, metro or rail passenger services, transport operations or hospitality preferred. Freshers may be considered.',
        summary: 'Assists passengers and customers, handles service queries, provides accurate information and coordinates with station teams.',
        duties: [
          'Handle passenger and customer queries professionally.',
          'Provide information on station services, ticketing, routes and facilities.',
          'Assist passengers with ticketing and service-related requirements.',
          'Handle complaints and escalate complex issues to the supervisor.',
          'Coordinate with station operations, security, ticketing and maintenance.',
          'Assist passengers during service disruptions, delays, crowd-management situations and other operational conditions.',
          'Maintain accurate customer-service records, reports and documentation.',
          'Support smooth passenger movement and contribute to a positive station experience.',
          'Communicate operational updates and passenger-related issues to the concerned team.',
          'Follow applicable metro safety, security, operational and customer-service procedures.',
          'Maintain professional conduct, communication and service standards at all times.'
        ]
      },
      {
        title: 'Station Assistant',
        code: 'GGIPL-MET-SA-005',
        level: 'L10',
        salary: '₹36,000–₹45,000',
        vacancies: 170,
        fee: 290,
        qualification: '12th pass / Intermediate or equivalent from a recognised board or institution.',
        experience: 'Experience in metro or railway station operations, passenger services or customer service preferred. Freshers may be considered.',
        summary: 'Supports day-to-day station activities, assists passengers and helps maintain smooth, safe and efficient station operations.',
        duties: [
          'Assist passengers with station-related information and general queries.',
          'Support passenger movement and station-service activities.',
          'Direct passengers to the appropriate service counter or facility.',
          'Coordinate with station operations, security and maintenance teams.',
          'Assist passengers during peak hours, delays and service disruptions.',
          'Support orderly movement and basic crowd-management activities.',
          'Report operational issues, passenger concerns and safety-related observations to the concerned supervisor.',
          'Maintain basic station records, logs and assigned documentation.',
          'Assist in maintaining cleanliness, service standards and proper use of station facilities by coordinating with the relevant teams.',
          'Follow applicable metro safety, security, emergency-response and operational procedures.',
          'Maintain professional communication and courteous behaviour with passengers and colleagues.'
        ]
      },
      {
        title: 'Maintenance Technician',
        code: 'GGIPL-MET-MT-006',
        level: 'L11',
        salary: '₹32,000–₹40,000',
        vacancies: 160,
        fee: 250,
        qualification: 'ITI or Diploma in electrical, electronics, mechanical, fitter, HVAC, instrumentation or another relevant technical trade.',
        experience: 'Experience in metro rail, railway, industrial maintenance or electrical and mechanical systems preferred.',
        extraDocuments: ['ITI / Diploma Certificate'],
        summary: 'Supports inspection, preventive maintenance, troubleshooting and repair of assigned metro station, equipment and technical systems.',
        duties: [
          'Carry out preventive and corrective maintenance of assigned equipment.',
          'Inspect equipment and identify faults, defects and abnormal conditions.',
          'Perform basic troubleshooting, repair, replacement and adjustment.',
          'Support maintenance of electrical, mechanical, HVAC or station equipment.',
          'Maintain accurate maintenance logs, checklists and service records.',
          'Coordinate with supervisors and maintenance teams for major technical issues.',
          'Respond to equipment breakdowns and support timely fault rectification.',
          'Follow approved maintenance schedules and technical procedures.',
          'Use tools, testing equipment and personal protective equipment appropriately.',
          'Follow applicable safety, electrical, technical, emergency and workplace procedures.',
          'Report major equipment faults and safety concerns immediately to the appropriate supervisor.',
          'Maintain proper housekeeping and safe working conditions within assigned maintenance areas.'
        ]
      }
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
        code: 'GGIPL-HOT-GM-001',
        level: 'L4',
        salary: '₹60,000–₹1,50,000+',
        vacancies: 100,
        fee: 99,
        qualification: 'Degree or diploma in hotel management, hospitality, tourism or business management, or a Graduate qualification.',
        experience: '7–12 years in hotel operations, hospitality or resort management. Managerial experience preferred.',
        extraDocuments: ['Hotel Management / Hospitality qualification certificate'],
        summary: 'Responsible for the overall management and performance of the hotel — operations, guest experience, staff leadership, financial performance and compliance.',
        duties: [
          'Lead and supervise overall hotel operations across departments.',
          'Manage front office, housekeeping, food and beverage, and administration.',
          'Develop and monitor operational, revenue and occupancy targets.',
          'Ensure high standards of guest satisfaction and service quality.',
          'Recruit, train, supervise and motivate staff and departmental managers.',
          'Monitor budgets, operating costs and revenue performance.',
          'Develop strategies to improve occupancy, revenue and customer retention.',
          'Coordinate with vendors, suppliers, travel agencies and partners.',
          'Handle guest complaints and ensure timely resolution of service issues.',
          'Ensure compliance with applicable hotel, safety, hygiene, fire-safety, security and labour requirements.',
          'Prepare and review operational and management reports.',
          'Conduct regular departmental meetings and performance reviews.',
          'Identify operational risks and implement appropriate corrective measures.',
          'Represent the hotel in meetings with management, clients, partners and other authorised stakeholders.'
        ]
      },
      {
        title: 'Operations Manager',
        code: 'GGIPL-HOT-OM-002',
        level: 'L6',
        salary: '₹35,000–₹75,000',
        vacancies: 110,
        fee: 199,
        qualification: 'Graduate in hotel management, hospitality, business administration or tourism management.',
        experience: 'Experience in hotel operations, hospitality, administration or customer service preferred.',
        extraDocuments: ['Hotel Management / Hospitality qualification certificate'],
        summary: 'Coordinates and supervises day-to-day hotel operations, ensuring efficient departmental performance and consistent service standards.',
        duties: [
          'Supervise and coordinate daily hotel operations.',
          'Coordinate with front office, housekeeping, food and beverage, and security.',
          'Monitor departmental performance, staff deployment and schedules.',
          'Ensure consistent guest-service and hospitality standards.',
          'Handle customer concerns and coordinate timely resolution.',
          'Coordinate with maintenance on repairs and service requirements.',
          'Maintain operational records, reports and checklists.',
          'Support management in monitoring revenue, operating costs, productivity and performance targets.',
          'Coordinate with vendors, suppliers, service providers and other authorised stakeholders.',
          'Assist in staff training, operational briefings and performance monitoring.',
          'Support hotel operations during peak periods, special events, emergencies and service disruptions.',
          'Ensure adherence to applicable safety, hygiene, security, fire-safety and hospitality procedures.',
          'Prepare routine operational updates and reports for senior management.',
          'Identify operational challenges and recommend appropriate corrective actions.'
        ]
      },
      {
        title: 'Front Office Manager',
        code: 'GGIPL-HOT-FOM-003',
        level: 'L6',
        salary: '₹30,000–₹60,000',
        vacancies: 120,
        fee: 121,
        qualification: 'Graduate or diploma in hotel management, hospitality or tourism management.',
        experience: 'Experience in front office operations, hotel management or guest relations preferred.',
        extraDocuments: ['Hotel Management / Hospitality qualification certificate'],
        summary: 'Supervises front-office operations, manages guest services and coordinates reservations and check-in and check-out activities.',
        duties: [
          'Supervise and coordinate daily front office operations.',
          'Manage guest check-in, check-out, reservations and room allocation.',
          'Supervise front office executives, receptionists and guest relations staff.',
          'Ensure accurate maintenance of guest records and booking information.',
          'Handle guest queries, complaints and special requests professionally.',
          'Coordinate with housekeeping, food and beverage, and maintenance.',
          'Monitor staff schedules, duty rosters, attendance and departmental performance.',
          'Ensure proper communication of guest requirements and operational updates between departments.',
          'Monitor service quality and maintain high standards of guest satisfaction and hospitality.',
          'Assist with billing, payment coordination and other front-office procedures as applicable.',
          'Prepare routine front-office reports and operational updates for management.',
          'Support staff training, operational briefings and performance monitoring.',
          'Handle front-office operations during peak periods, special events, emergencies and service disruptions.',
          'Ensure compliance with applicable hotel policies, safety, security and guest-service procedures.'
        ]
      },
      {
        title: 'Front Office Executive',
        code: 'GGIPL-HOT-FOE-004',
        level: 'L8',
        salary: '₹18,000–₹30,000',
        vacancies: 130,
        fee: 125,
        qualification: '12th pass / Intermediate or Graduate from a recognised board or institution.',
        experience: '0–3 years in hotel front office, hospitality, guest relations or reception. Freshers may be considered.',
        summary: 'Handles reception and guest-service activities, assists with check-in and check-out, and maintains front-office records.',
        duties: [
          'Welcome and assist guests in a professional and courteous manner.',
          'Handle guest check-in and check-out procedures.',
          'Assist with reservations, room allocation and guest requests.',
          'Provide accurate information about hotel facilities and services.',
          'Handle guest queries, complaints and service requests professionally.',
          'Coordinate with housekeeping, food and beverage, and maintenance.',
          'Maintain accurate guest records, reservation details and front-office documentation.',
          'Assist with billing, payment coordination and related front-office procedures as applicable.',
          'Maintain proper communication during guest arrivals, departures, special requests and service issues.',
          'Support the Front Office Manager in daily operational activities.',
          'Prepare routine reports and maintain assigned registers and logs.',
          'Follow applicable hotel safety, security and guest-service procedures.',
          'Maintain professional appearance, communication and hospitality standards.'
        ]
      },
      {
        title: 'Housekeeping Supervisor',
        code: 'GGIPL-HOT-HKS-005',
        level: 'L9',
        salary: '₹20,000–₹35,000',
        vacancies: 170,
        fee: 188,
        qualification: '12th / Intermediate or equivalent. Diploma or certificate in hotel management, hospitality or housekeeping preferred.',
        experience: '2–5 years in hotel housekeeping, hospitality or facility management. Supervisory experience preferred.',
        summary: 'Supervises daily housekeeping operations and staff, and monitors cleanliness and hygiene standards across the hotel.',
        duties: [
          'Supervise daily housekeeping operations and housekeeping staff.',
          'Allocate duties, shifts, rooms and work areas to team members.',
          'Monitor cleanliness of guest rooms, public areas and facilities.',
          'Inspect rooms to ensure required cleanliness and hygiene standards.',
          'Coordinate with front office on room status and priority rooms.',
          'Coordinate with maintenance on repairs and equipment issues.',
          'Handle guest housekeeping requests and complaints professionally.',
          'Monitor supplies, linen, cleaning materials and inventory.',
          'Maintain housekeeping records, checklists, inspection reports and daily operational reports.',
          'Train and brief housekeeping staff on service standards, hygiene, safety and workplace procedures.',
          'Ensure proper use of cleaning equipment, chemicals and personal protective equipment.',
          'Report operational issues, damages, shortages or incidents to the concerned manager.',
          'Maintain professional conduct and ensure high standards of guest service.'
        ]
      },
      {
        title: 'Chef / Cook',
        code: 'GGIPL-HOT-CC-006',
        level: 'L11',
        salary: '₹18,000–₹50,000',
        vacancies: 170,
        fee: 180,
        qualification: '10th / 12th or equivalent. Certificate or diploma in culinary arts, food production or hotel management preferred.',
        experience: '1–5 years in hotel kitchens, restaurants, catering or food production. Freshers with culinary training may be considered.',
        summary: 'Prepares food to approved recipes, menus and quality standards, and maintains kitchen hygiene and food-safety practices.',
        duties: [
          'Prepare food according to approved recipes, menus and quality standards.',
          'Handle daily kitchen preparation, cooking, plating and presentation.',
          'Maintain proper taste, quality, hygiene and portion standards.',
          'Ensure proper storage and handling of food ingredients.',
          'Monitor freshness and quality of raw materials.',
          'Coordinate with kitchen staff and other hotel departments.',
          'Maintain cleanliness and hygiene of the kitchen and cooking equipment.',
          'Follow applicable food safety, hygiene and workplace safety procedures.',
          'Minimise food wastage and support effective inventory usage.',
          'Assist in menu preparation and special food requirements as assigned.',
          'Maintain kitchen records and report shortages or operational issues to the concerned supervisor.',
          'Support smooth kitchen operations during regular and peak service hours.'
        ]
      },
      {
        title: 'Guest Relations Executive',
        code: 'GGIPL-HOT-GRE-007',
        level: 'L8',
        salary: '₹18,000–₹35,000',
        vacancies: 170,
        fee: 180,
        qualification: '12th / Intermediate or Graduate. Diploma or certificate in hotel management, hospitality or tourism preferred.',
        experience: '0–3 years in hotel guest relations, hospitality, customer service or front office. Freshers may be considered.',
        summary: 'Provides professional assistance to guests throughout their stay, handles enquiries and feedback, and supports a positive guest experience.',
        duties: [
          'Welcome guests and provide courteous assistance throughout their stay.',
          'Handle guest enquiries, requests, feedback and service-related concerns.',
          'Maintain strong guest relationships and support a positive guest experience.',
          'Assist guests with hotel facilities, services, amenities and general information.',
          'Coordinate with front office, housekeeping, food and beverage, and maintenance.',
          'Follow up on guest requests to ensure timely resolution.',
          'Handle complaints professionally and escalate complex issues.',
          'Maintain accurate guest records, feedback, requests and service-related reports.',
          'Support VIP guest arrangements and special guest requirements as assigned.',
          'Assist during check-in, check-out, special events and peak operational periods.',
          'Collect guest feedback and communicate service improvement suggestions to management.',
          'Maintain professional appearance, communication, confidentiality and hospitality standards.'
        ]
      }
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
{
        title: 'Healthcare Business Head',
        code: 'GGIPL-HC-BH-001',
        level: 'L3',
        salary: '₹60,000–₹1,50,000+',
        vacancies: 180,
        fee: 190,
        qualification: 'Graduate or postgraduate in healthcare management, hospital administration, business administration, life sciences or public health.',
        experience: '7–12 years in healthcare management, hospital operations or healthcare business development.',
        summary: 'Leads the business and operational activities of the Healthcare Division — strategy, growth plans, partnerships and service quality.',
        duties: [
          'Lead and manage the business and operational activities of the division.',
          'Develop and implement healthcare business strategies and growth plans.',
          'Identify new business opportunities, partnerships and service areas.',
          'Monitor business performance, revenue targets and service quality.',
          'Build and maintain professional relationships with healthcare organisations, service providers, vendors and partners.',
          'Lead, supervise and develop healthcare teams and departmental managers.',
          'Establish performance targets and monitor achievement across relevant functions.',
          'Coordinate with internal departments to ensure smooth delivery of healthcare-related services.',
          'Monitor customer and patient service standards and address escalated service issues.',
          'Ensure applicable legal, regulatory, safety, quality, privacy and organisational requirements are followed.',
          'Review operational reports, financial information, performance data and business KPIs.',
          'Support budgeting, cost management, resource planning and business forecasting.',
          'Conduct management reviews and provide strategic recommendations for business improvement.',
          'Identify operational risks and implement appropriate mitigation and improvement measures.',
          'Represent the Healthcare division in meetings with management, business partners and relevant stakeholders.'
        ]
      },
{
        title: 'Healthcare Operations Manager',
        code: 'GGIPL-HC-OM-002',
        level: 'L6',
        salary: '₹35,000–₹75,000',
        vacancies: 180,
        fee: 290,
        qualification: 'Graduate in healthcare management, hospital administration, business administration, life sciences or public health.',
        experience: '3–7 years in healthcare operations, hospital administration or facility management.',
        summary: 'Manages day-to-day healthcare operational activities, departmental coordination and service quality.',
        duties: [
          'Manage and supervise day-to-day healthcare operational activities.',
          'Coordinate with healthcare, administration and support teams.',
          'Monitor operational efficiency, service quality and departmental performance.',
          'Prepare staff schedules, duty assignments and operational work plans.',
          'Monitor patient and customer service standards and resolve concerns.',
          'Handle escalated complaints and coordinate timely resolution.',
          'Maintain operational records, reports, documentation and performance data.',
          'Monitor resources, equipment, supplies and operational requirements.',
          'Coordinate with vendors, service providers and external stakeholders where required.',
          'Support budgeting, cost control, resource planning and operational improvement.',
          'Ensure applicable healthcare, safety, hygiene, privacy and organisational procedures are followed.',
          'Identify operational risks and report incidents or issues to senior management.',
          'Conduct team briefings, support staff training and monitor employee performance.',
          'Prepare regular operational reports and provide recommendations for improvement.'
        ]
      },
      {
        title: 'Hospital / Healthcare Administrator',
        code: 'GGIPL-HC-HA-003',
        level: 'L5',
        salary: '₹35,000–₹80,000',
        vacancies: 180,
        fee: 200,
        qualification: 'Graduate in Healthcare Management, Hospital Administration, Healthcare Administration, Business Administration, Life Sciences, or a related field. Relevant professional qualification will be preferred.',
        experience: '3–7 years of relevant experience in hospital administration, healthcare operations, healthcare services, facility administration, or a related field.',
        extraDocuments: [
          'Relevant Healthcare / HIMTC Certificate'
        ],
        duties: [
          'Manage and coordinate day-to-day administrative activities of the hospital/healthcare facility.',
          'Coordinate with medical, nursing, administrative, support, and service departments.',
          'Monitor operational efficiency and ensure smooth delivery of healthcare services.',
          'Manage staff coordination, duty schedules, administrative assignments, and departmental requirements.',
          'Monitor patient/customer service standards and address administrative concerns.',
          'Handle escalated complaints and coordinate timely resolution.',
          'Maintain administrative records, reports, documentation, and operational data.',
          'Coordinate with vendors, service providers, and external stakeholders as required.',
          'Monitor facility, equipment, supplies, and other administrative resources.',
          'Support budgeting, cost control, procurement, and resource planning activities.',
          'Ensure applicable healthcare, safety, hygiene, privacy, and organizational procedures are followed.',
          'Assist management in implementing policies, procedures, and operational improvements.',
          'Monitor departmental performance and prepare regular reports for senior management.',
          'Identify operational issues and recommend appropriate corrective actions.',
          'Support staff training, team meetings, audits, inspections, and quality-improvement activities.'
        ]
      },
      {
        title: 'Staff Nurse',
        code: 'GGIPL-HC-SN-004',
        level: 'L8',
        salary: '₹25,000–₹40,000',
        vacancies: 180,
        fee: 200,
        qualification: 'Applicable nursing qualification such as B.Sc. Nursing / GNM / ANM, as permitted for the specific position and applicable regulations.',
        experience: '0–5 years of relevant nursing experience. Freshers with the required nursing qualification and valid registration may be considered for suitable positions.',
        registration: 'Valid registration with the applicable State Nursing Council / competent nursing regulatory authority is required, wherever applicable.',
        extraDocuments: [
          'Nursing Qualification Certificate / Diploma',
          'Valid Nursing Registration Certificate / Registration Number',
          'Relevant Healthcare / HIMTC Certificate'
        ],
        duties: [
          'Provide nursing care to patients according to applicable clinical procedures and instructions.',
          'Monitor and record patients’ vital signs and health-related observations.',
          'Administer medicines and treatments only as authorized and within the nurse’s scope of practice.',
          'Assist doctors and other healthcare professionals during examinations, procedures, and patient care.',
          'Maintain accurate nursing notes, patient records, and required documentation.',
          'Observe patients for changes in condition and promptly report concerns to the appropriate medical professional.',
          'Support admission, transfer, discharge, and routine patient-care procedures.',
          'Maintain infection-prevention, hygiene, and patient-safety standards.',
          'Provide appropriate patient and attendant guidance within the nurse’s professional scope.',
          'Handle nursing equipment and supplies responsibly.',
          'Follow emergency procedures and support emergency patient care as trained.',
          'Maintain patient confidentiality and professional standards.',
          'Coordinate with nursing, medical, laboratory, pharmacy, and other healthcare teams as required.',
          'Participate in shift handovers, staff briefings, training, and quality-improvement activities.',
          'Follow applicable healthcare laws, professional standards, institutional policies, and safety procedures.'
        ]
      },
{ title: 'Medical Assistant',                   level: 'L10', salary: '₹18,000–₹30,000' },
      {
        title: 'Lab Technician',
        code: 'GGIPL-HC-LT-005',
        level: 'L11',
        salary: '₹22,000–₹35,000',
        vacancies: 180,
        fee: 200,
        qualification: 'Relevant recognised qualification in Medical Laboratory Technology / Medical Laboratory Science or an equivalent qualification, as applicable to the position and applicable regulations.',
        experience: '0–5 years of relevant experience in a diagnostic laboratory, hospital, clinic, pathology laboratory, or healthcare facility. Freshers with the required qualification may be considered for suitable positions.',
        extraDocuments: [
          'Relevant recognised Lab Technician / Medical Laboratory Technology Qualification',
          'Applicable Registration / Licence, where required by regulations',
          'Relevant Healthcare / HIMTC Certificate'
        ],
        duties: [
          'Collect, receive, label, and process patient specimens according to applicable laboratory procedures.',
          'Perform assigned laboratory tests using appropriate methods and equipment.',
          'Handle blood, urine, and other clinical specimens safely and professionally.',
          'Operate and maintain laboratory instruments and equipment as per procedures.',
          'Follow quality-control and quality-assurance procedures.',
          'Maintain accurate test records, laboratory registers, and reports.',
          'Ensure proper storage, handling, and disposal of specimens and laboratory materials.',
          'Follow infection-control, biosafety, hygiene, and workplace safety procedures.',
          'Identify and report equipment problems, specimen issues, or abnormal operational conditions to the appropriate supervisor.',
          'Coordinate with doctors, nurses, laboratory staff, and other healthcare professionals as required.',
          'Maintain confidentiality of patient information and laboratory records.',
          'Monitor laboratory supplies, reagents, consumables, and inventory requirements.',
          'Assist with calibration, maintenance, and routine checks of laboratory equipment as assigned.',
          'Follow applicable healthcare regulations, professional standards, and institutional policies.'
        ]
      },
      {
        title: 'Healthcare Coordinator',
        code: 'GGIPL-HC-HC-006',
        level: 'L9',
        salary: '₹20,000–₹35,000',
        vacancies: 180,
        fee: 200,
        qualification: '12th / Graduate or equivalent. A qualification or certificate in Healthcare Management, Hospital Administration, Medical Administration, Patient Care, or a related field will be preferred.',
        experience: '0–3 years of relevant experience in healthcare coordination, hospital administration, patient services, medical support services, or a related field. Freshers may also be considered.',
        extraDocuments: [
          'Relevant Healthcare / Healthcare Industry Management Training Certificate'
        ],
        duties: [
          'Coordinate day-to-day healthcare and administrative activities.',
          'Assist patients/customers with appointments, services, departments, and general information.',
          'Coordinate with doctors, nurses, laboratory, pharmacy, administration, and support teams as required.',
          'Maintain patient/customer-related records, schedules, requests, and service information.',
          'Assist with appointment scheduling and coordination of healthcare services.',
          'Follow up on patient/customer requests and ensure timely communication.',
          'Support smooth coordination between different departments.',
          'Handle routine enquiries and escalate complex issues to the appropriate supervisor.',
          'Maintain daily activity reports, registers, and operational documentation.',
          'Assist with healthcare service coordination, meetings, staff communication, and departmental activities.',
          'Monitor pending requests and coordinate their resolution.',
          'Maintain confidentiality of patient/customer information.',
          'Follow applicable healthcare, safety, hygiene, privacy, and organizational procedures.',
          'Support management and departmental teams in improving service coordination and operational efficiency.'
        ]
      }
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
      {
        title: 'Travel Business Head',
        code: 'GGIPL-TT-BH-001',
        level: 'L3',
        salary: '₹70,000–₹1,20,000+',
        vacancies: 170,
        fee: 180,
        qualification: 'Graduate / Postgraduate in Travel & Tourism, Hospitality, Business Administration, Travel Management, or a related field. Relevant professional certification will be preferred.',
        experience: '7–12 years of relevant experience in travel and tourism, ticketing, travel operations, hospitality, business development, or a related field.',
        extraDocuments: [
          'Relevant Travel & Tourism Industry Training Certificate'
        ],
        duties: [
          'Lead and manage the overall business activities of the Travel & Tourism division.',
          'Develop and implement travel business strategies, growth plans, and revenue objectives.',
          'Identify new travel, tourism, ticketing, hotel, and business partnership opportunities.',
          'Manage relationships with travel partners, hotels, transport providers, service providers, and other stakeholders.',
          'Monitor sales, revenue, customer acquisition, business performance, and operational targets.',
          'Lead and supervise travel operations, sales, ticketing, customer service, and support teams.',
          'Develop strategies to improve customer experience, service quality, and business growth.',
          'Coordinate travel packages, ticketing services, hotel arrangements, and other travel-related services as applicable.',
          'Monitor market trends, competitor activities, and emerging business opportunities.',
          'Support budgeting, cost control, forecasting, and resource planning.',
          'Ensure applicable travel industry, consumer protection, data privacy, and organizational procedures are followed.',
          'Review business reports, KPIs, sales performance, and operational data.',
          'Resolve escalated customer and business-partner issues.',
          'Conduct regular team reviews, meetings, and performance assessments.',
          'Identify business risks and implement appropriate improvement strategies.',
          'Represent the Travel & Tourism division in meetings with management and business partners.'
        ]
      },
      {
        title: 'Travel Operations Manager',
        code: 'GGIPL-TT-TOM-002',
        level: 'L6',
        salary: '₹45,000–₹70,000',
        vacancies: 190,
        fee: 170,
        qualification: 'Graduate in Travel & Tourism, Travel Management, Hospitality Management, Business Administration, or a related field. Relevant professional certification will be preferred.',
        experience: '3–7 years of relevant experience in travel operations, tour operations, ticketing, reservations, hospitality, or a related field.',
        extraDocuments: [
          'Relevant Travel & Tourism Industry Training Certificate'
        ],
        duties: [
          'Manage and supervise daily travel operations and service activities.',
          'Coordinate ticketing, reservations, hotel bookings, transportation, tour arrangements, and other travel services as applicable.',
          'Supervise travel operations, customer service, ticketing, and support teams.',
          'Coordinate with airlines, railway/metro services, hotels, transport providers, tour operators, and other business partners as applicable.',
          'Monitor booking schedules, customer requests, travel itineraries, and operational requirements.',
          'Handle customer complaints, service issues, cancellations, modifications, and escalations professionally.',
          'Ensure timely coordination and delivery of travel-related services.',
          'Maintain accurate booking records, customer information, invoices, reports, and operational documentation.',
          'Monitor operational performance, service quality, productivity, and customer satisfaction.',
          'Support sales and business development teams with operational planning and service information.',
          'Monitor vendor/service-provider performance and coordinate issue resolution.',
          'Assist with cost control, resource planning, and operational efficiency.',
          'Ensure applicable travel-industry, consumer-protection, data-privacy, and organizational procedures are followed.',
          'Prepare daily/weekly/monthly operational reports for management.',
          'Train and guide team members on travel procedures, customer service, documentation, and operational standards.'
        ]
      },
      {
        title: 'Travel Consultant',
        code: 'GGIPL-TT-TC-003',
        level: 'L8',
        salary: '₹31,000–₹40,000',
        vacancies: 120,
        fee: 150,
        qualification: '12th / Intermediate or Graduate. Diploma/Certificate in Travel & Tourism, Travel Management, Hospitality, Ticketing, or a related field will be preferred.',
        experience: '0–3 years of relevant experience in travel consultancy, ticketing, reservations, tourism, customer service, or a related field. Freshers with relevant training may also be considered.',
        extraDocuments: [
          'Relevant Travel & Tourism Industry Training Certificate'
        ],
        duties: [
          'Assist customers in planning and arranging travel according to their requirements.',
          'Provide information about travel options, routes, schedules, fares, hotels, and travel packages.',
          'Handle ticketing, reservations, modifications, cancellations, and related customer requests as applicable.',
          'Prepare travel itineraries and communicate booking details clearly to customers.',
          'Coordinate with airlines, rail/metro services, hotels, transport providers, and tour operators as required.',
          'Understand customer requirements and recommend suitable travel solutions.',
          'Handle customer enquiries, complaints, and service-related issues professionally.',
          'Maintain accurate customer, booking, payment, and travel records.',
          'Follow up on pending bookings, confirmations, changes, and customer requests.',
          'Assist with travel documentation and provide general guidance on applicable requirements.',
          'Support sales and business development activities for travel products and services.',
          'Maintain updated knowledge of travel services, destinations, schedules, and applicable company procedures.',
          'Ensure customer information and booking details are handled confidentially.',
          'Prepare daily activity reports and maintain required operational documentation.'
        ]
      },
      {
        title: 'Tour Coordinator',
        code: 'GGIPL-TT-TC-004',
        level: 'L9',
        salary: '₹36,000–₹45,000',
        vacancies: 170,
        fee: 190,
        qualification: '12th / Intermediate or Graduate. Diploma/Certificate in Travel & Tourism, Tour Operations, Hospitality, Travel Management, or a related field will be preferred.',
        experience: '1–4 years of relevant experience in tour coordination, travel operations, tourism, hospitality, customer service, or a related field. Freshers with relevant training may also be considered.',
        extraDocuments: [
          'Relevant Travel & Tourism Industry Training Certificate'
        ],
        duties: [
          'Coordinate day-to-day tour and travel arrangements.',
          'Prepare and manage tour itineraries, schedules, bookings, and travel plans.',
          'Coordinate with hotels, transport providers, airlines, railway services, tour operators, and other service providers as applicable.',
          'Communicate tour schedules, booking details, meeting points, and service information to customers.',
          'Monitor reservations, confirmations, transportation, accommodation, and other tour requirements.',
          'Handle customer enquiries, requests, complaints, and service-related issues.',
          'Coordinate changes, cancellations, delays, and other travel disruptions.',
          'Ensure tour-related services are delivered according to approved schedules and service standards.',
          'Maintain accurate customer, booking, itinerary, and operational records.',
          'Follow up with vendors and service providers regarding pending confirmations and requirements.',
          'Assist customers during tours by providing appropriate coordination and support.',
          'Maintain communication with internal teams and external partners throughout tour operations.',
          'Prepare daily/weekly tour reports and update management on operational status.',
          'Ensure customer information and booking details are handled confidentially.',
          'Support improvement of customer experience and overall tour service quality.'
        ]
      },
      {
        title: 'Travel Executive',
        code: 'GGIPL-TT-TE-005',
        level: 'L8',
        salary: '₹34,000–₹42,000',
        vacancies: 170,
        fee: 110,
        qualification: '12th / Intermediate or Graduate. Diploma/Certificate in Travel & Tourism, Travel Management, Hospitality, Ticketing, or a related field will be preferred.',
        experience: '0–3 years of relevant experience in travel operations, ticketing, reservations, tourism, customer service, or a related field. Freshers with relevant training may also be considered.',
        extraDocuments: [
          'Relevant Travel & Tourism Industry Training Certificate'
        ],
        duties: [
          'Handle day-to-day travel-related customer and operational activities.',
          'Assist customers with ticketing, reservations, travel plans, and itinerary requirements.',
          'Coordinate flight, railway/metro, hotel, transportation, and tour-related services as applicable.',
          'Prepare and maintain travel itineraries, booking details, schedules, and customer records.',
          'Coordinate with airlines, railway services, hotels, transport providers, and other travel partners.',
          'Handle booking confirmations, modifications, cancellations, and customer requests.',
          'Provide accurate information regarding travel schedules, fares, services, and applicable procedures.',
          'Resolve routine customer queries and escalate complex issues to the concerned supervisor.',
          'Follow up on pending bookings, confirmations, payments, and service requirements.',
          'Maintain accurate documentation and operational reports.',
          'Support travel sales, customer relationship management, and business development activities.',
          'Monitor changes in schedules, bookings, and travel arrangements and communicate updates promptly.',
          'Ensure customer information and booking details are handled confidentially.',
          'Follow applicable company policies, travel-industry procedures, and customer-service standards.'
        ]
      },
{ title: 'Tour Guide Coordinator',     level: 'L9', salary: '₹18,000–₹35,000' },
      {
        title: 'Customer Support Executive',
        code: 'GGIPL-TT-CSE-006',
        level: 'L8',
        salary: '₹32,000–₹40,000',
        vacancies: 170,
        fee: 140,
        qualification: '12th / Intermediate or Graduate. Diploma/Certificate in Travel & Tourism, Customer Service, Hospitality, Travel Management, or a related field will be preferred.',
        experience: '0–3 years of relevant experience in customer support, travel services, hospitality, ticketing, reservations, or a related field. Freshers may also be considered.',
        extraDocuments: [
          'Relevant Travel & Tourism Industry Training Certificate'
        ],
        duties: [
          'Handle customer enquiries through phone, email, chat, or other approved communication channels.',
          'Provide accurate information regarding travel services, bookings, tickets, hotels, tours, and related services.',
          'Assist customers with booking-related queries, modifications, cancellations, and rescheduling requests.',
          'Coordinate with ticketing, travel operations, hotel, transport, and tour teams to resolve customer issues.',
          'Handle customer complaints professionally and ensure timely resolution or escalation.',
          'Maintain accurate customer interactions, service requests, booking information, and support records.',
          'Follow up on pending customer requests and provide timely updates.',
          'Assist customers during travel disruptions, delays, cancellations, or other service-related situations.',
          'Maintain professional communication and a positive customer-service approach.',
          'Collect customer feedback and communicate recurring issues to the concerned team.',
          'Protect customer information and maintain appropriate confidentiality.',
          'Prepare daily support reports and maintain required documentation.',
          'Follow company policies, service standards, and applicable travel-industry procedures.'
        ]
      }
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
      {
        title: 'Rail Business Head',
        code: 'GGIPL-RW-BH-001',
        level: 'L3',
        salary: '₹90,000–₹1,50,000+',
        vacancies: 190,
        fee: 185,
        qualification: 'Graduate / Postgraduate in Railway Management, Transportation Management, Business Administration, Engineering, Logistics, or a related field. Relevant professional qualification will be preferred.',
        experience: '7–12 years of relevant experience in railway operations, transportation, rail infrastructure, logistics, business development, or a related field.',
        extraDocuments: [
          'Relevant Railway / Rail Industrial Association Training Certificate'
        ],
        duties: [
          'Lead and manage the overall business activities of the Railways division.',
          'Develop and implement strategic business plans, growth strategies, and operational objectives.',
          'Identify new business opportunities in railway operations, transportation, infrastructure, logistics, and related services.',
          'Coordinate with railway organizations, contractors, vendors, service providers, and business partners as applicable.',
          'Monitor business performance, revenue targets, operational efficiency, and key performance indicators.',
          'Lead and supervise departmental managers and operational teams.',
          'Develop strategies to improve service quality, productivity, operational performance, and business growth.',
          'Oversee major rail-related projects, contracts, service requirements, and operational activities as applicable.',
          'Support budgeting, cost control, resource planning, forecasting, and business development.',
          'Review operational and financial reports and provide strategic recommendations to senior management.',
          'Ensure applicable railway safety, regulatory, contractual, operational, and organizational requirements are followed.',
          'Identify operational and business risks and develop appropriate mitigation strategies.',
          'Build and maintain strong relationships with key stakeholders and business partners.',
          'Conduct management reviews, team meetings, and performance assessments.',
          'Represent the Railways division in meetings with management, clients, contractors, and relevant stakeholders.'
        ]
      },
      {
        title: 'Rail Operations Manager',
        code: 'GGIPL-RW-ROM-002',
        level: 'L6',
        salary: '₹45,000–₹80,000',
        vacancies: 370,
        fee: 280,
        qualification: 'Graduate / Diploma in Railway Management, Transportation Management, Railway Operations, Logistics, Engineering, or a related field. Relevant professional qualification will be preferred.',
        experience: '3–7 years of relevant experience in railway operations, transportation, logistics, station operations, rail infrastructure, or a related field.',
        extraDocuments: [
          'Relevant Railway / RIATC Certificate'
        ],
        duties: [
          'Manage and supervise day-to-day railway and transportation operations.',
          'Coordinate operational activities with station, train, maintenance, security, passenger service, and support teams as applicable.',
          'Monitor operational schedules, staff deployment, service requirements, and daily activities.',
          'Ensure smooth coordination between different operational departments.',
          'Monitor passenger/service operations and address operational issues.',
          'Handle delays, disruptions, incidents, and operational escalations in coordination with the concerned teams.',
          'Maintain operational records, logs, reports, and required documentation.',
          'Monitor staff performance, attendance, duty schedules, and operational productivity.',
          'Coordinate with contractors, vendors, service providers, and other stakeholders as required.',
          'Support implementation of applicable railway safety, security, emergency, and operational procedures.',
          'Identify operational risks and report incidents or issues to senior management.',
          'Assist with resource planning, cost control, and operational efficiency initiatives.',
          'Conduct team briefings and support staff training and performance improvement.',
          'Review operational KPIs and prepare regular reports for management.',
          'Recommend improvements to enhance safety, efficiency, service quality, and customer experience.'
        ]
      },
      {
        title: 'Station Operations Executive',
        code: 'GGIPL-RW-SOE-003',
        level: 'L8',
        salary: '₹38,000–₹60,000',
        vacancies: 270,
        fee: 210,
        qualification: '12th / Intermediate or Graduate. Diploma/Certificate in Railway Operations, Transportation Management, Logistics, Station Operations, or a related field will be preferred.',
        experience: '0–3 years of relevant experience in railway operations, station operations, passenger services, transportation, logistics, or a related field. Freshers with relevant training may also be considered.',
        extraDocuments: [
          'Relevant Railway / RIATC Certificate'
        ],
        duties: [
          'Assist in the smooth execution of day-to-day station operations.',
          'Coordinate with passenger service, ticketing, security, maintenance, and other station teams.',
          'Assist passengers with general information regarding platforms, routes, schedules, facilities, and station services.',
          'Monitor passenger movement and support crowd-management activities during peak periods.',
          'Coordinate operational responses during delays, disruptions, emergencies, or other incidents.',
          'Maintain station operational logs, records, reports, and required documentation.',
          'Monitor assigned station areas and report safety, maintenance, cleanliness, or operational issues.',
          'Coordinate with supervisors and relevant departments for timely resolution of operational concerns.',
          'Support implementation of applicable safety, security, emergency, and operational procedures.',
          'Assist with staff coordination, shift activities, briefings, and daily operational requirements.',
          'Handle routine passenger queries and escalate complaints or complex issues to the concerned supervisor.',
          'Monitor service standards and support a positive passenger experience.',
          'Prepare daily activity reports and communicate important operational updates to management.',
          'Maintain professional conduct and confidentiality while performing assigned duties.'
        ]
      },
      {
        title: 'Ticketing Executive',
        code: 'GGIPL-RW-TE-004',
        level: 'L8',
        salary: '₹36,000–₹50,000',
        vacancies: 490,
        fee: 299,
        qualification: '12th / Intermediate or Graduate. Diploma/Certificate in Railway Operations, Ticketing, Travel & Tourism, Transportation Management, or a related field will be preferred.',
        experience: '0–3 years of relevant experience in railway ticketing, reservation, travel services, customer service, or a related field. Freshers with relevant training may also be considered.',
        extraDocuments: [
          'Relevant Railway / RIATC Certificate'
        ],
        duties: [
          'Handle passenger ticketing and reservation-related activities as applicable.',
          'Assist passengers with ticket bookings, cancellations, modifications, rescheduling, and related requests.',
          'Provide accurate information regarding routes, schedules, fares, platforms, and applicable ticketing procedures.',
          'Verify booking details and maintain accurate passenger and transaction records.',
          'Coordinate with station operations, customer service, and other relevant teams.',
          'Handle passenger enquiries and resolve routine ticketing-related concerns professionally.',
          'Assist passengers during booking issues, schedule changes, delays, or service disruptions.',
          'Maintain daily ticketing records, reports, and required documentation.',
          'Follow applicable ticketing procedures, customer-service standards, and organizational policies.',
          'Ensure passenger information and transaction details are handled appropriately and confidentially.',
          'Report technical, operational, or payment-related issues to the concerned supervisor.',
          'Support smooth ticketing operations during peak hours and high passenger volumes.',
          'Maintain professional communication and courteous behaviour with passengers.'
        ]
      },
      {
        title: 'Rail Logistics Coordinator',
        code: 'GGIPL-RW-RLC-005',
        level: 'L9',
        salary: '₹31,000–₹40,000',
        vacancies: 170,
        fee: 120,
        qualification: '12th / Intermediate or Graduate. Diploma/Certificate in Logistics, Supply Chain Management, Railway Operations, Transportation Management, or a related field will be preferred.',
        experience: '0–3 years of relevant experience in railway logistics, transportation, supply chain, warehouse operations, freight coordination, or a related field. Freshers with relevant training may also be considered.',
        extraDocuments: [
          'Relevant Railway / RIATC Certificate'
        ],
        duties: [
          'Coordinate day-to-day rail logistics and transportation activities.',
          'Coordinate movement of goods, materials, consignments, and related logistics requirements as applicable.',
          'Liaise with railway operations, warehouses, transporters, vendors, and logistics partners.',
          'Monitor shipment schedules, loading/unloading activities, dispatches, and delivery status.',
          'Maintain accurate consignment, shipment, inventory, and logistics records.',
          'Track delays, operational issues, damaged consignments, or other logistics-related concerns.',
          'Coordinate with relevant teams to resolve transportation and delivery issues.',
          'Prepare daily logistics reports, status updates, and operational documentation.',
          'Assist with route planning, scheduling, resource allocation, and logistics coordination.',
          'Monitor vendor and transporter performance and communicate service issues to supervisors.',
          'Ensure proper handling and documentation of goods and materials.',
          'Support compliance with applicable safety, security, transportation, and organizational procedures.',
          'Maintain professional communication with internal teams, customers, vendors, and service providers.',
          'Assist management in improving logistics efficiency, service quality, and cost effectiveness.'
        ]
      },
      {
        title: 'Maintenance Technician',
        code: 'GGIPL-RW-MT-006',
        level: 'L11',
        salary: '₹29,000–₹35,000',
        vacancies: 170,
        fee: 100,
        qualification: 'ITI / Diploma in Electrical, Electronics, Mechanical, Fitter, Instrumentation, HVAC, or a relevant technical trade. Relevant railway/maintenance training will be preferred.',
        experience: '0–3 years of relevant experience in railway maintenance, electrical/mechanical maintenance, equipment maintenance, or a related field. Freshers with relevant technical training may also be considered.',
        extraDocuments: [
          '12th Marksheet, where applicable',
          'Relevant Railway / RIATC Certificate'
        ],
        duties: [
          'Perform preventive and corrective maintenance of assigned equipment and systems.',
          'Inspect electrical, mechanical, electronic, HVAC, or other technical equipment according to the assigned trade.',
          'Identify faults, breakdowns, and technical issues and support timely troubleshooting.',
          'Carry out repair, servicing, testing, and replacement of defective components as authorized.',
          'Maintain maintenance records, inspection reports, and equipment service logs.',
          'Coordinate with Operations, Station, Electrical, Engineering, and other concerned teams.',
          'Respond to equipment breakdowns and maintenance requirements within assigned responsibilities.',
          'Follow applicable safety procedures, PPE requirements, and workplace maintenance standards.',
          'Report major faults, recurring issues, equipment damage, and maintenance risks to the supervisor.',
          'Support regular inspection and upkeep of railway/station-related technical assets.',
          'Maintain tools, spare parts, and assigned maintenance materials properly.',
          'Perform duties according to company procedures and applicable railway/technical requirements.'
        ]
      }
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
      {
        title: 'Logistics Head',
        code: 'GGIPL-LOG-LH-001',
        level: 'L3',
        salary: '₹70,000–₹1,50,000+',
        vacancies: 208,
        fee: 180,
        qualification: 'Graduate / Postgraduate in Logistics & Supply Chain Management, Transportation Management, Business Administration, Operations Management, or a related field. Relevant professional qualification or certification in logistics is preferred.',
        experience: '7–12 years of relevant experience in Logistics, Supply Chain, Transportation, Warehouse Operations, Distribution, Freight Management, or a related field. Leadership experience is preferred.',
        extraDocuments: [
          'Relevant Logistics / Logistics Industry Transportation Certificate'
        ],
        duties: [
          'Lead and manage the overall logistics and supply chain operations of the department.',
          'Develop logistics strategies to improve operational efficiency, service quality, and cost effectiveness.',
          'Manage transportation, warehousing, distribution, shipment, and delivery operations.',
          'Coordinate with transporters, vendors, warehouses, suppliers, customers, and internal departments.',
          'Monitor shipment schedules, route planning, dispatch, delivery, and logistics performance.',
          'Manage logistics budgets, operating costs, resources, and productivity targets.',
          'Monitor vendor performance and negotiate service requirements where authorized.',
          'Ensure proper logistics documentation, records, MIS reports, and operational tracking.',
          'Identify delays, damages, shortages, and operational risks and ensure timely resolution.',
          'Establish and monitor logistics KPIs, performance standards, and improvement plans.',
          'Ensure compliance with applicable safety, transportation, documentation, and company procedures.',
          'Lead and develop logistics teams through training, supervision, and performance management.',
          'Coordinate with management on business expansion, logistics planning, and operational requirements.',
          'Prepare regular management reports on logistics performance, costs, productivity, and operational issues.',
          'Identify opportunities for process improvement, technology adoption, and cost optimization.'
        ]
      },
      {
        title: 'Supply Chain Manager',
        code: 'GGIPL-LOG-SCM-002',
        level: 'L5',
        salary: '₹45,000–₹1,00,000',
        vacancies: 170,
        fee: 190,
        qualification: 'Graduate / Postgraduate in Supply Chain Management, Logistics, Operations Management, Business Administration, Transportation Management, or a related field. Relevant professional certification is preferred.',
        experience: '3–7 years of relevant experience in Supply Chain, Logistics, Procurement, Warehouse, Transportation, Distribution, or related operations.',
        extraDocuments: [
          'Relevant Logistics / LITC Certificate'
        ],
        duties: [
          'Manage day-to-day supply chain operations from procurement through delivery.',
          'Coordinate procurement, inventory, warehousing, transportation, and distribution activities.',
          'Monitor material and product movement to ensure timely availability and delivery.',
          'Coordinate with suppliers, vendors, transporters, warehouses, and internal departments.',
          'Monitor inventory levels and support effective stock planning and replenishment.',
          'Track purchase orders, shipments, dispatches, deliveries, and supply schedules.',
          'Identify supply chain delays, shortages, damages, and operational issues and coordinate resolutions.',
          'Monitor logistics and supply chain costs and identify opportunities for cost optimization.',
          'Maintain accurate supply chain records, documentation, and MIS reports.',
          'Evaluate supplier and logistics partner performance and escalate service issues.',
          'Support demand planning, route planning, resource allocation, and operational forecasting.',
          'Ensure compliance with applicable company procedures, safety requirements, and documentation standards.',
          'Develop process improvements to increase efficiency, reduce delays, and improve service quality.',
          'Prepare regular performance reports and supply chain KPIs for management review.',
          'Coordinate with the Logistics Head and management on strategic supply chain requirements.'
        ]
      },
      {
        title: 'Warehouse Manager',
        code: 'GGIPL-LOG-WM-003',
        level: 'L6',
        salary: '₹35,000–₹60,000',
        vacancies: 470,
        fee: 189,
        qualification: 'Graduate / Diploma in Logistics, Supply Chain Management, Warehouse Management, Operations Management, Business Administration, or a related field. Relevant logistics or warehouse certification is preferred.',
        experience: '3–7 years of relevant experience in Warehouse Operations, Logistics, Inventory Management, Supply Chain, Distribution, or a related field. Supervisory experience is preferred.',
        extraDocuments: [
          'Relevant Logistics / LITC Certificate'
        ],
        duties: [
          'Manage day-to-day warehouse operations and ensure smooth workflow.',
          'Supervise receiving, storage, picking, packing, dispatch, and material movement activities.',
          'Maintain accurate inventory records and monitor stock levels.',
          'Coordinate with Logistics, Supply Chain, Procurement, Transport, and other departments.',
          'Ensure proper receiving, inspection, labeling, storage, and dispatch of goods/materials.',
          'Monitor stock discrepancies, shortages, damages, and misplaced inventory and coordinate corrective action.',
          'Plan warehouse space utilization and maintain organized storage systems.',
          'Supervise warehouse staff, allocate duties, and monitor daily performance.',
          'Maintain warehouse documentation, stock registers, dispatch records, and MIS reports.',
          'Coordinate loading and unloading activities while following applicable safety procedures.',
          'Monitor warehouse equipment, tools, and material-handling requirements.',
          'Support stock audits, physical verification, reconciliation, and inventory control.',
          'Ensure cleanliness, security, safety, and proper handling of materials within the warehouse.',
          'Monitor warehouse operating costs and identify opportunities for efficiency improvement.',
          'Prepare regular warehouse performance reports and escalate operational issues to management.'
        ]
      },
      {
        title: 'Logistics Coordinator',
        code: 'GGIPL-LOG-LC-004',
        level: 'L9',
        salary: '₹29,000–₹35,000',
        vacancies: 170,
        fee: 140,
        qualification: '12th / Intermediate or Graduate in Logistics, Supply Chain Management, Transportation Management, Business Administration, Operations Management, or a related field. Relevant logistics certification is preferred.',
        experience: '0–3 years of relevant experience in Logistics, Transportation, Warehouse, Supply Chain, Shipment Coordination, or related operations. Freshers with relevant training may also be considered.',
        extraDocuments: [
          'Relevant Logistics / LITC Certificate'
        ],
        duties: [
          'Coordinate day-to-day logistics and transportation activities.',
          'Monitor shipment, dispatch, loading, unloading, and delivery schedules.',
          'Coordinate with transporters, warehouses, suppliers, vendors, and internal departments.',
          'Track consignments and provide timely status updates.',
          'Maintain logistics records, shipment documents, delivery records, and MIS reports.',
          'Assist in route planning, scheduling, and allocation of logistics resources.',
          'Identify and report delays, damages, shortages, and delivery-related issues.',
          'Follow up with logistics partners to ensure timely movement and delivery of goods.',
          'Support warehouse and inventory teams in material movement and dispatch coordination.',
          'Handle routine customer/vendor queries related to shipment and delivery status.',
          'Ensure proper documentation and follow applicable company logistics procedures.',
          'Escalate operational issues to the Logistics Manager / Supervisor when required.',
          'Support cost-effective and efficient logistics operations.',
          'Prepare daily/weekly logistics status reports as required.',
          'Maintain professional communication with internal and external stakeholders.'
        ]
      },
      {
        title: 'Inventory Executive',
        code: 'GGIPL-LOG-IE-005',
        level: 'L8',
        salary: '₹26,000–₹31,000',
        vacancies: 150,
        fee: 180,
        qualification: '12th / Intermediate or Graduate in Logistics, Supply Chain Management, Inventory Management, Commerce, Business Administration, Operations Management, or a related field. Relevant inventory/logistics certification is preferred.',
        experience: '0–3 years of relevant experience in Inventory Management, Warehouse Operations, Logistics, Stock Control, or Supply Chain Operations. Freshers with relevant training may also be considered.',
        extraDocuments: [
          'Relevant Logistics / LITC Certificate'
        ],
        duties: [
          'Maintain accurate inventory and stock records.',
          'Monitor daily stock receipts, issues, transfers, and dispatches.',
          'Coordinate with warehouse and logistics teams for material movement.',
          'Conduct regular physical stock verification and reconciliation.',
          'Identify stock shortages, excess inventory, damages, and discrepancies.',
          'Update inventory records in ERP, inventory software, or company MIS systems.',
          'Maintain proper documentation for inward and outward material movements.',
          'Support stock audits and prepare inventory reports.',
          'Monitor minimum and maximum stock levels and report replenishment requirements.',
          'Coordinate with procurement, warehouse, logistics, and other concerned departments.',
          'Track material movement and ensure proper identification and storage records.',
          'Report inventory discrepancies and operational issues to the concerned supervisor.',
          'Assist in improving inventory accuracy, storage practices, and stock-control procedures.',
          'Maintain confidentiality and accuracy of inventory-related information.',
          'Prepare daily, weekly, or monthly inventory reports as required by management.'
        ]
      },
      {
        title: 'Delivery Supervisor',
        code: 'GGIPL-LOG-DS-006',
        level: 'L9',
        salary: '₹27,000–₹35,000',
        vacancies: 570,
        fee: 280,
        qualification: '12th / Intermediate or Graduate in Logistics, Supply Chain Management, Transportation Management, Operations Management, Business Administration, or a related field. Relevant logistics or delivery management certification is preferred.',
        experience: '1–4 years of relevant experience in Delivery Operations, Logistics, Transportation, Distribution, Warehouse Operations, or related fields. Supervisory experience is preferred.',
        extraDocuments: [
          'Relevant Logistics / LITC Certificate'
        ],
        duties: [
          'Supervise day-to-day delivery and distribution operations.',
          'Allocate delivery assignments and coordinate with delivery staff.',
          'Monitor dispatch, shipment movement, and delivery schedules.',
          'Track deliveries and ensure timely completion of assigned routes.',
          'Coordinate with warehouse, logistics, transport, and customer support teams.',
          'Monitor delivery delays, failed deliveries, damages, shortages, and customer issues.',
          'Ensure proper handling and movement of goods during delivery operations.',
          'Maintain delivery records, proof of delivery, route details, and daily reports.',
          'Follow up with delivery personnel regarding pending and completed shipments.',
          'Resolve routine operational issues and escalate major concerns to management.',
          'Monitor attendance, performance, and work allocation of delivery staff.',
          'Ensure compliance with applicable safety, transportation, and company procedures.',
          'Support route planning and efficient utilization of delivery resources.',
          'Maintain professional communication with customers, vendors, transporters, and internal teams.',
          'Prepare daily/weekly delivery performance reports and support process improvements.'
        ]
      },
      {
        title: 'Warehouse Associate',
        code: 'GGIPL-LOG-WA-007',
        level: 'L10',
        salary: '₹25,000–₹30,000',
        vacancies: 350,
        fee: 199,
        qualification: '10th / 12th / Intermediate or equivalent. Relevant training or certificate in Logistics, Warehouse Operations, Inventory Management, or Supply Chain is preferred.',
        experience: '0–2 years of relevant experience in Warehouse Operations, Logistics, Inventory, Packing, Dispatch, or Material Handling. Freshers may also be considered.',
        extraDocuments: [
          'Relevant Logistics / LITC Certificate'
        ],
        duties: [
          'Assist in day-to-day warehouse operations.',
          'Receive, check, sort, label, and store incoming goods and materials.',
          'Support picking, packing, loading, unloading, and dispatch activities.',
          'Maintain proper handling and movement of warehouse materials.',
          'Assist with stock counting and physical inventory verification.',
          'Update inward and outward material records as instructed.',
          'Check goods for quantity, visible damage, and basic documentation.',
          'Coordinate with warehouse supervisors and logistics teams for dispatch requirements.',
          'Maintain proper organization and cleanliness of assigned warehouse areas.',
          'Report stock shortages, damages, discrepancies, or operational issues to the supervisor.',
          'Follow applicable safety procedures and material-handling instructions.',
          'Assist in maintaining inventory, dispatch, and delivery-related records.',
          'Support timely movement of goods within the warehouse.',
          'Handle tools and warehouse equipment responsibly as authorized.',
          'Perform other assigned warehouse and logistics duties according to company procedures.'
        ]
      }
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
      {
        title: 'Electrical Division Head',
        code: 'GGIPL-ELEC-DH-001',
        level: 'L3',
        salary: '₹60,000–₹1,50,000+',
        vacancies: 270,
        fee: 180,
        qualification: 'Bachelor’s Degree / Diploma in Electrical Engineering, Electrical & Electronics Engineering, Power Systems, or a related technical field. Relevant professional electrical certification is preferred.',
        experience: '7–12 years of relevant experience in Electrical Engineering, Electrical Operations, Power Systems, Infrastructure, Maintenance, Projects, or related technical fields. Leadership and project management experience is preferred.',
        extraDocuments: [
          'Relevant Electrical / Electrical Industrial Training Certificate'
        ],
        duties: [
          'Lead and manage the overall operations of the Electrical Division.',
          'Develop electrical operational strategies, plans, and performance objectives.',
          'Supervise electrical projects, maintenance activities, installations, and technical operations.',
          'Manage electrical engineering and technical teams and allocate responsibilities effectively.',
          'Coordinate with project teams, contractors, vendors, suppliers, and internal departments.',
          'Monitor electrical systems, equipment, installations, maintenance schedules, and operational performance.',
          'Review technical requirements, project progress, resource needs, and operational risks.',
          'Ensure electrical work is carried out according to applicable technical, safety, and company standards.',
          'Monitor project budgets, material requirements, manpower, and resource utilization.',
          'Identify electrical faults, operational risks, and maintenance requirements and ensure timely corrective action.',
          'Maintain technical documentation, inspection records, maintenance reports, and project records.',
          'Support procurement and evaluation of electrical equipment, materials, tools, and services.',
          'Monitor team performance and provide technical guidance, training, and supervision.',
          'Prepare regular management reports covering projects, maintenance, performance, costs, and risks.',
          'Identify opportunities for process improvement, energy efficiency, reliability, and cost optimization.',
          'Ensure proper emergency response and escalation procedures for major electrical incidents.',
          'Coordinate with management on new electrical projects, infrastructure requirements, and business development opportunities.'
        ]
      },
      {
        title: 'Electrical Project Manager',
        code: 'GGIPL-ELEC-PM-002',
        level: 'L5',
        salary: '₹40,000–₹90,000',
        vacancies: 176,
        fee: 140,
        qualification: 'Bachelor’s Degree / Diploma in Electrical Engineering, Electrical & Electronics Engineering, Power Systems, or a related technical field. Relevant project management or electrical certification is preferred.',
        experience: '3–7 years of relevant experience in Electrical Projects, Engineering, Installation, Maintenance, Infrastructure, or related technical operations. Project coordination or team leadership experience is preferred.',
        extraDocuments: [
          'Relevant Electrical / Electrical Industrial Training Certificate'
        ],
        duties: [
          'Plan, coordinate, and manage electrical projects from initiation through completion.',
          'Prepare project schedules, work plans, manpower requirements, and resource plans.',
          'Coordinate with engineers, technicians, contractors, vendors, suppliers, and internal teams.',
          'Monitor electrical installation, testing, commissioning, maintenance, and project activities.',
          'Track project progress against approved timelines, budgets, and quality requirements.',
          'Review technical drawings, specifications, material requirements, and project documentation.',
          'Identify project risks, technical issues, delays, and resource constraints and coordinate corrective actions.',
          'Ensure electrical work follows applicable technical, safety, quality, and company procedures.',
          'Coordinate procurement and availability of electrical materials, equipment, tools, and resources.',
          'Monitor contractor and vendor performance and resolve routine project-related issues.',
          'Conduct project meetings and maintain progress reports, inspection records, and documentation.',
          'Monitor project costs and support effective utilization of manpower and materials.',
          'Coordinate testing, commissioning, handover, and completion activities as applicable.',
          'Ensure proper reporting and escalation of major technical or project issues.',
          'Prepare regular project status reports and performance updates for management.',
          'Support process improvements, cost optimization, and efficient project execution.'
        ]
      },
      {
        title: 'Electrical Engineer',
        code: 'GGIPL-ELEC-EE-003',
        level: 'L8',
        salary: '₹32,000–₹60,000',
        vacancies: 150,
        fee: 110,
        qualification: 'Bachelor’s Degree / Diploma in Electrical Engineering, Electrical & Electronics Engineering, Power Systems, or a related technical field. Relevant professional electrical certification is preferred.',
        experience: '1–5 years of relevant experience in Electrical Engineering, Installation, Maintenance, Projects, Power Systems, Infrastructure, or related technical operations. Freshers with the required technical qualification may be considered for suitable positions.',
        extraDocuments: [
          'Relevant Electrical / Electrical Industrial Training Certificate'
        ],
        duties: [
          'Execute and supervise assigned electrical engineering activities.',
          'Assist in the planning, installation, testing, commissioning, and maintenance of electrical systems and equipment.',
          'Inspect electrical installations and identify technical faults or performance issues.',
          'Perform troubleshooting and coordinate corrective maintenance as required.',
          'Review electrical drawings, specifications, work plans, and technical documentation.',
          'Coordinate with technicians, project teams, contractors, vendors, and other departments.',
          'Monitor electrical work to ensure quality, safety, and project requirements are followed.',
          'Maintain inspection reports, maintenance records, test reports, and technical documentation.',
          'Support electrical project planning, material requirements, manpower coordination, and scheduling.',
          'Assist in monitoring project progress, costs, resources, and technical requirements.',
          'Ensure proper use and handling of electrical tools, equipment, and materials.',
          'Identify potential electrical safety risks and report them to the concerned supervisor/manager.',
          'Support preventive maintenance activities to improve equipment reliability and performance.',
          'Participate in technical meetings, inspections, testing, commissioning, and handover activities as applicable.',
          'Prepare technical and operational reports for management review.',
          'Follow applicable electrical safety procedures, technical standards, and company policies.'
        ]
      },
      {
        title: 'Site Engineer',
        code: 'GGIPL-ELEC-SE-004',
        level: 'L8',
        salary: '₹29,000–₹45,000',
        vacancies: 399,
        fee: 170,
        qualification: 'Bachelor’s Degree / Diploma in Electrical Engineering, Electrical & Electronics Engineering, or a related technical field. Relevant electrical/site engineering certification is preferred.',
        experience: '1–5 years of relevant experience in Electrical Projects, Site Engineering, Installation, Maintenance, Construction, Infrastructure, or related technical operations. Freshers with the required technical qualification may be considered for suitable positions.',
        extraDocuments: [
          'Relevant Electrical / Electrical Industrial Training Certificate'
        ],
        duties: [
          'Supervise day-to-day electrical activities at assigned project sites.',
          'Coordinate electrical installation, maintenance, testing, and commissioning work.',
          'Monitor site activities according to approved drawings, specifications, schedules, and work plans.',
          'Coordinate with Electrical Engineers, Technicians, Contractors, Vendors, and Project Managers.',
          'Inspect electrical work and identify technical, quality, or safety-related issues.',
          'Support troubleshooting and ensure timely resolution of site-level electrical problems.',
          'Monitor manpower, tools, equipment, and electrical material requirements at the site.',
          'Maintain daily site records, work progress reports, inspection reports, and technical documentation.',
          'Track project progress and report delays, material shortages, technical issues, or site risks.',
          'Ensure electrical activities follow applicable safety procedures and company standards.',
          'Coordinate material receipt, storage, and utilization at the project site.',
          'Assist with testing, commissioning, inspection, and handover activities as applicable.',
          'Conduct routine site inspections and report defects or maintenance requirements.',
          'Support coordination of contractors and ensure assigned work is completed as scheduled.',
          'Prepare regular site progress updates for the Project Manager / Management.',
          'Maintain professional coordination with all stakeholders and follow company procedures.'
        ]
      },
      {
        title: 'Electrical Technician',
        code: 'GGIPL-ELEC-ET-005',
        level: 'L11',
        salary: '₹27,000–₹32,000',
        vacancies: 270,
        fee: 180,
        qualification: 'ITI / Diploma in Electrical, Electrical & Electronics, Wireman, Electrician, or a relevant technical trade. Relevant electrical maintenance training or certification is preferred.',
        experience: '0–3 years of relevant experience in electrical installation, maintenance, equipment servicing, troubleshooting, or related technical work. Freshers with relevant technical training may also be considered.',
        extraDocuments: [
          'Relevant Electrical / EITC Certificate'
        ],
        duties: [
          'Perform electrical installation, maintenance, servicing, and repair activities as assigned.',
          'Inspect electrical equipment, wiring, panels, fixtures, and related systems.',
          'Identify electrical faults and carry out troubleshooting within assigned responsibilities.',
          'Assist in preventive and corrective maintenance of electrical systems and equipment.',
          'Support testing, inspection, installation, and commissioning activities.',
          'Coordinate with Electrical Engineers, Site Engineers, Supervisors, and other technical teams.',
          'Maintain tools, equipment, spare parts, and assigned electrical materials properly.',
          'Maintain maintenance logs, inspection records, work reports, and fault reports.',
          'Report electrical defects, breakdowns, unsafe conditions, and recurring faults to the supervisor.',
          'Follow applicable electrical safety procedures, PPE requirements, and workplace instructions.',
          'Assist with emergency breakdown response and restoration activities as authorized.',
          'Ensure proper handling and use of electrical tools and equipment.',
          'Support site/project teams in completing electrical work within assigned schedules.',
          'Maintain cleanliness and organized working conditions at electrical work areas.',
          'Perform duties according to company procedures and applicable technical requirements.'
        ]
      },
      {
        title: 'Electrician',
        code: 'GGIPL-ELEC-EL-006',
        level: 'L11',
        salary: '₹24,000–₹30,000',
        vacancies: 370,
        fee: 160,
        qualification: '10th / 12th or equivalent. ITI in Electrician / Wireman or a relevant technical trade is preferred.',
        experience: '0–3 years of relevant experience in electrical installation, wiring, maintenance, repair, or equipment servicing. Freshers with relevant technical training may also be considered.',
        extraDocuments: [
          'Relevant Electrical / EITC Certificate'
        ],
        duties: [
          'Perform electrical installation, wiring, repair, and maintenance work as assigned.',
          'Install and maintain electrical fixtures, switches, sockets, panels, lighting systems, and related equipment.',
          'Inspect electrical connections and identify faults or damaged components.',
          'Perform basic electrical troubleshooting and corrective maintenance.',
          'Assist Electrical Engineers, Technicians, and Site Supervisors with assigned technical work.',
          'Support preventive maintenance of electrical equipment and systems.',
          'Use electrical tools and testing equipment safely and correctly.',
          'Maintain basic records of completed work, faults, repairs, and maintenance activities.',
          'Report electrical breakdowns, unsafe conditions, and major technical issues to the supervisor.',
          'Follow applicable electrical safety procedures, PPE requirements, and company instructions.',
          'Assist in installation, testing, and commissioning activities as required.',
          'Maintain tools, equipment, cables, spare parts, and other assigned materials properly.',
          'Ensure the work area is kept clean, organized, and safe.',
          'Respond to routine electrical maintenance requirements within assigned responsibilities.',
          'Perform other electrical duties assigned by the supervisor or management.'
        ]
      }
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
      {
        title: 'Security Business Head',
        code: 'GGIPL-SEC-BH-001',
        level: 'L3',
        salary: '₹50,000–₹1,20,000+',
        vacancies: 120,
        fee: 110,
        qualification: 'Graduate / Postgraduate in Security Management, Business Administration, Operations Management, Risk Management, or a related field. Relevant security management / professional certification is preferred.',
        experience: '7–12 years of relevant experience in Security Services, Security Operations, Risk Management, Facility Security, Corporate Security, or related fields. Leadership and business management experience is preferred.',
        extraDocuments: [
          'Relevant Security / Security Industry Management Certificate'
        ],
        duties: [
          'Lead and manage the overall business and operations of the Security Division.',
          'Develop security business strategies, operational plans, and performance objectives.',
          'Manage security service operations for assigned clients, sites, facilities, or projects.',
          'Develop and maintain professional relationships with clients, business partners, vendors, and stakeholders.',
          'Supervise security teams and ensure effective manpower deployment and operational coordination.',
          'Identify new business opportunities and support business development initiatives.',
          'Monitor service quality, client satisfaction, operational performance, and business targets.',
          'Coordinate security assessments, risk identification, incident management, and corrective actions.',
          'Ensure security personnel follow applicable company procedures, client requirements, and legal/regulatory requirements.',
          'Monitor manpower requirements, attendance, deployment, training, and performance.',
          'Coordinate with management regarding contracts, operational requirements, budgets, and business performance.',
          'Maintain security reports, incident records, client reports, operational documentation, and MIS.',
          'Review security incidents and ensure appropriate escalation and follow-up.',
          'Support recruitment, training, briefing, and development of security personnel.',
          'Monitor operational costs, resources, and productivity and identify improvement opportunities.',
          'Prepare regular management reports covering business growth, operations, client service, incidents, and KPIs.',
          'Support risk management, emergency preparedness, and business continuity activities as applicable.'
        ]
      },
      {
        title: 'Security Operations Manager',
        code: 'GGIPL-SEC-SOM-002',
        level: 'L6',
        salary: '₹35,000–₹70,000',
        vacancies: 470,
        fee: 280,
        qualification: 'Graduate / Diploma in Security Management, Security Operations, Business Administration, Operations Management, Risk Management, or a related field. Relevant security management certification is preferred.',
        experience: '3–7 years of relevant experience in Security Operations, Facility Security, Corporate Security, Security Services, Risk Management, or related fields. Supervisory or managerial experience is preferred.',
        extraDocuments: [
          'Relevant Security / Security Industry Management Certificate'
        ],
        duties: [
          'Manage and supervise day-to-day security operations at assigned sites or facilities.',
          'Plan and coordinate security manpower deployment, duty schedules, and shift arrangements.',
          'Supervise security personnel and monitor attendance, discipline, performance, and operational readiness.',
          'Coordinate with clients, site management, security teams, vendors, and internal departments.',
          'Conduct routine security inspections and identify operational gaps and potential risks.',
          'Monitor access control, visitor management, patrolling, surveillance, and other assigned security activities.',
          'Respond to security incidents, emergencies, complaints, and operational issues and ensure timely escalation.',
          'Maintain incident reports, security logs, deployment records, inspection reports, and MIS documentation.',
          'Conduct security briefings and support training and awareness programs for security personnel.',
          'Ensure security staff follow company procedures, client requirements, safety practices, and applicable legal/regulatory requirements.',
          'Coordinate emergency response and support incident investigation and corrective actions.',
          'Monitor security equipment, communication systems, uniforms, tools, and other operational resources.',
          'Evaluate team performance and recommend corrective or improvement measures.',
          'Prepare regular operational reports and performance updates for senior management.',
          'Support security audits, risk assessments, client reviews, and continuous improvement initiatives.',
          'Assist the Security Business Head in operational planning, resource management, and client service requirements.'
        ]
      },
      {
        title: 'Security Officer',
        code: 'GGIPL-SEC-SO-003',
        level: 'L8',
        salary: '₹30,000–₹45,000',
        vacancies: 570,
        fee: 160,
        qualification: '12th / Intermediate or Graduate. Diploma / Certificate in Security Management, Security Operations, Facility Security, Risk Management, or a related field is preferred.',
        experience: '1–5 years of relevant experience in Security Services, Security Operations, Facility Security, Corporate Security, Access Control, or related fields. Supervisory experience is preferred.',
        extraDocuments: [
          'Relevant Security / SIMC Certificate'
        ],
        duties: [
          'Supervise and monitor security activities at the assigned site or facility.',
          'Ensure proper deployment and functioning of security personnel during assigned shifts.',
          'Monitor access control, visitor entry, patrolling, and other assigned security activities.',
          'Conduct regular security inspections and identify potential security risks.',
          'Maintain security registers, incident reports, visitor records, shift reports, and other required documentation.',
          'Respond promptly to security incidents, emergencies, disturbances, and unauthorized access.',
          'Coordinate with security supervisors, site management, clients, and relevant internal teams.',
          'Brief security personnel on assigned duties, site procedures, safety requirements, and emergency protocols.',
          'Monitor compliance with company security procedures and client/site requirements.',
          'Report security breaches, suspicious activities, incidents, equipment issues, and operational concerns to the concerned supervisor.',
          'Support emergency response, evacuation, and incident-management procedures as applicable.',
          'Monitor security equipment, communication devices, access-control systems, and other assigned resources.',
          'Assist with security audits, inspections, investigations, and corrective actions.',
          'Maintain professional conduct and confidentiality while performing security duties.',
          'Prepare daily and periodic security reports for the Security Operations Manager / management.'
        ]
      },
      {
        title: 'Security Supervisor',
        code: 'GGIPL-SEC-SS-004',
        level: 'L9',
        salary: '₹25,000–₹35,000',
        vacancies: 670,
        fee: 299,
        qualification: '12th / Intermediate or equivalent. Diploma / Certificate in Security Management, Security Operations, Facility Security, or a related field is preferred.',
        experience: '1–5 years of relevant experience in Security Services, Security Operations, Facility Security, Corporate Security, or related fields. Supervisory experience will be preferred.',
        extraDocuments: [
          'Relevant Security / SIMC Certificate'
        ],
        duties: [
          'Supervise and coordinate day-to-day security operations at the assigned site or facility.',
          'Manage security personnel deployment, shift schedules, attendance, and duty assignments.',
          'Conduct regular site inspections and ensure security posts are properly staffed.',
          'Monitor access control, visitor management, patrolling, surveillance, and entry/exit procedures.',
          'Brief security personnel regarding duties, site instructions, safety procedures, and emergency protocols.',
          'Monitor discipline, punctuality, appearance, and professional conduct of security staff.',
          'Respond to security incidents, emergencies, disturbances, and unauthorized access.',
          'Maintain security registers, incident reports, shift reports, visitor records, and other operational documentation.',
          'Coordinate with Security Officers, clients, site management, and internal departments.',
          'Identify security risks and report vulnerabilities or unusual activities to the concerned management.',
          'Support emergency response, evacuation, incident management, and security escalation procedures.',
          'Monitor the condition and availability of assigned security equipment and communication devices.',
          'Support security audits, inspections, investigations, and corrective actions.',
          'Provide on-the-job briefings and support training of security personnel.',
          'Prepare daily and periodic security performance reports for the Security Officer / Security Operations Manager.',
          'Ensure security activities are performed according to company procedures, client requirements, and applicable laws and regulations.'
        ]
      },
      {
        title: 'Security Guard',
        code: 'GGIPL-SEC-SG-005',
        level: 'L10',
        salary: '₹22,000–₹25,000',
        vacancies: 650,
        fee: 299,
        qualification: '10th / 12th or equivalent. Relevant Security Training / Security Guard certification is preferred.',
        experience: '0–3 years of relevant experience in Security Services, Facility Security, Corporate Security, Access Control, or related work. Freshers may also be considered.',
        extraDocuments: [
          'Relevant Security / SIMC Certificate'
        ],
        duties: [
          'Maintain security and safety at the assigned site, premises, or facility.',
          'Monitor entry and exit of authorized personnel, visitors, vehicles, and materials.',
          'Perform regular patrolling of assigned areas and report unusual or suspicious activities.',
          'Monitor access-control procedures and follow site-specific security instructions.',
          'Maintain visitor registers, security logs, shift records, and incident reports.',
          'Verify visitor or staff authorization as per applicable site procedures.',
          'Respond promptly to security incidents, emergencies, disturbances, or unauthorized access.',
          'Immediately report security breaches, suspicious activities, accidents, or safety concerns to the supervisor.',
          'Support emergency response, evacuation, and incident-management procedures as instructed.',
          'Maintain discipline, alertness, punctuality, and professional conduct during duty hours.',
          'Safeguard assigned premises, assets, equipment, and property against unauthorized access or loss.',
          'Coordinate with Security Supervisors, Security Officers, site management, and emergency services when required.',
          'Follow applicable company security procedures, safety instructions, and legal requirements.',
          'Maintain confidentiality of security-related information.',
          'Perform other security duties assigned by the authorized supervisor.'
        ]
      },
      {
        title: 'Control Room Operator',
        code: 'GGIPL-SEC-CRO-006',
        level: 'L11',
        salary: '₹19,000–₹28,000',
        vacancies: 150,
        fee: 109,
        qualification: '12th / Intermediate or equivalent. Certificate / Diploma in Security Operations, Control Room Operations, CCTV Monitoring, Emergency Management, or a related field is preferred.',
        experience: '0–3 years of relevant experience in Control Room Operations, CCTV Monitoring, Security Operations, Facility Security, Emergency Response, or related work. Freshers with relevant training may also be considered.',
        extraDocuments: [
          'Relevant Security / SIMC Certificate'
        ],
        duties: [
          'Monitor the security control room and assigned surveillance systems during duty hours.',
          'Monitor CCTV feeds, alarms, access-control systems, and other assigned security monitoring equipment.',
          'Identify and promptly report suspicious activities, security incidents, safety risks, or system alerts.',
          'Receive and communicate incident information to Security Supervisors, Officers, or authorized management personnel.',
          'Maintain accurate control room logs, incident registers, shift records, and communication records.',
          'Coordinate with security personnel deployed at different locations during incidents or emergencies.',
          'Monitor entry/exit alerts and security-related system notifications as applicable.',
          'Escalate critical incidents according to established emergency and communication procedures.',
          'Maintain effective communication with field security teams, supervisors, and relevant departments.',
          'Support emergency response and incident-management activities as instructed.',
          'Report CCTV, alarm, communication, or monitoring-system faults to the concerned technical/support team.',
          'Maintain confidentiality of surveillance footage, security information, access data, and incident records.',
          'Conduct proper shift handovers and communicate pending incidents or important operational updates.',
          'Follow applicable security procedures, emergency protocols, data confidentiality requirements, and company policies.',
          'Prepare daily or periodic control room reports as required by management.'
        ]
      }
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
      {
        title: 'Plant Head',
        code: 'GGIPL-MFG-PH-001',
        level: 'L3',
        salary: '₹80,000–₹1,50,000+',
        vacancies: 150,
        fee: 109,
        qualification: 'Bachelor’s Degree / Diploma in Mechanical Engineering, Electrical Engineering, Production Engineering, Industrial Engineering, Manufacturing, Operations Management, or a related field. Relevant professional qualification in Manufacturing / Plant Operations is preferred.',
        experience: '7–12 years of relevant experience in Plant Operations, Manufacturing, Production, Industrial Operations, Engineering, Maintenance, or related fields. Senior-level leadership and plant management experience is preferred.',
        extraDocuments: [
          'Relevant Manufacturing Industry Management Certificate'
        ],
        duties: [
          'Lead and manage overall plant operations, production, maintenance, quality, and operational activities.',
          'Develop plant-level operational plans, production targets, and performance objectives.',
          'Ensure efficient utilization of manpower, machinery, materials, and other plant resources.',
          'Monitor production schedules, productivity, operational efficiency, and delivery targets.',
          'Coordinate with Production, Engineering, Maintenance, Quality, Stores, Logistics, HR, and other departments.',
          'Monitor plant machinery, equipment, utilities, and maintenance requirements.',
          'Ensure production and operational activities follow applicable safety, quality, environmental, and company procedures.',
          'Identify operational risks, production bottlenecks, equipment failures, and process issues and ensure timely corrective action.',
          'Monitor plant budgets, operating costs, manpower requirements, and resource utilization.',
          'Supervise and develop plant management and operational teams through training, performance monitoring, and leadership.',
          'Coordinate with suppliers, contractors, service providers, and other external stakeholders as required.',
          'Monitor quality standards and coordinate corrective and preventive actions with the Quality team.',
          'Maintain plant records, operational reports, production data, maintenance reports, and management MIS.',
          'Conduct regular operational reviews and implement continuous improvement initiatives.',
          'Support productivity improvement, waste reduction, cost optimization, and process efficiency.',
          'Ensure emergency preparedness and appropriate response to major plant incidents.',
          'Prepare regular reports on production, plant performance, costs, quality, safety, and operational risks for management.',
          'Support strategic planning and expansion initiatives for the manufacturing division.'
        ]
      },
      {
        title: 'Production Manager',
        code: 'GGIPL-MFG-PM-002',
        level: 'L5',
        salary: '₹40,000–₹90,000',
        vacancies: 450,
        fee: 209,
        qualification: 'Bachelor’s Degree / Diploma in Mechanical Engineering, Production Engineering, Industrial Engineering, Manufacturing, Operations Management, or a relevant technical field. Candidates with relevant manufacturing/production training or professional certification may be preferred.',
        experience: '3–7 years of relevant experience in production, manufacturing, plant operations, or industrial operations.',
        extraDocuments: [
          'Relevant Manufacturing / MIMC Certificate'
        ],
        duties: [
          'Manage day-to-day production activities and ensure production targets are achieved.',
          'Prepare and monitor production schedules, manpower planning, and resource allocation.',
          'Supervise production teams and coordinate with maintenance, quality, stores, logistics, and other departments.',
          'Monitor production output, productivity, efficiency, and operational performance.',
          'Ensure proper utilization of machinery, equipment, raw materials, and manpower.',
          'Identify production delays, bottlenecks, breakdowns, and operational issues and coordinate corrective actions.',
          'Maintain production records, daily reports, MIS reports, and performance data.',
          'Coordinate with the Quality team to maintain required quality standards.',
          'Ensure compliance with workplace safety procedures, PPE requirements, and company policies.',
          'Monitor material consumption, production wastage, and operational costs.',
          'Support preventive maintenance and timely reporting of machinery/equipment issues.',
          'Train, guide, and evaluate production staff and supervisors.',
          'Implement process improvements to increase productivity and reduce waste.',
          'Coordinate with suppliers, contractors, and internal departments whenever required.',
          'Escalate major operational, quality, safety, or production issues to senior management.',
          'Support audits, inspections, documentation, and continuous improvement initiatives.'
        ]
      },
      {
        title: 'Quality Manager',
        code: 'GGIPL-MFG-QM-003',
        level: 'L5',
        salary: '₹35,000–₹75,000',
        vacancies: 350,
        fee: 220,
        qualification: 'Bachelor’s Degree / Diploma in Mechanical Engineering, Production Engineering, Industrial Engineering, Manufacturing, Quality Management, or a relevant technical field. Knowledge of Quality Control, Quality Assurance, inspection procedures, and manufacturing processes preferred. Relevant quality/manufacturing training or professional certification may be preferred.',
        experience: '3–7 years of relevant experience in Quality Control, Quality Assurance, Manufacturing, Production, Inspection, or Industrial Operations.',
        extraDocuments: [
          'Relevant Manufacturing / MIMC Certificate'
        ],
        duties: [
          'Manage day-to-day Quality Control and Quality Assurance activities.',
          'Establish and monitor quality standards for manufacturing and production processes.',
          'Inspect raw materials, work-in-progress, and finished products.',
          'Identify quality defects, non-conformities, and process deviations.',
          'Coordinate with Production, Maintenance, Stores, and other departments to resolve quality issues.',
          'Conduct root-cause analysis and implement corrective and preventive actions.',
          'Maintain quality inspection records, reports, checklists, and documentation.',
          'Monitor product quality, process performance, rejection rates, and customer complaints.',
          'Support internal inspections, audits, and compliance activities.',
          'Ensure quality procedures are followed throughout the production process.',
          'Train and guide quality inspectors and production staff on quality requirements.',
          'Monitor measuring and testing equipment and coordinate calibration where required.',
          'Identify opportunities for process improvement and reduction of defects and wastage.',
          'Prepare regular quality performance reports and submit them to management.',
          'Support continuous improvement initiatives across manufacturing operations.'
        ]
      },
      {
        title: 'Production Engineer',
        code: 'GGIPL-MFG-PE-004',
        level: 'L8',
        salary: '₹25,000–₹50,000',
        vacancies: 550,
        fee: 250,
        qualification: 'Bachelor’s Degree / Diploma in Mechanical Engineering, Production Engineering, Industrial Engineering, Manufacturing Engineering, or a relevant technical field. Candidates with relevant manufacturing, production, or technical training may be preferred.',
        experience: '1–5 years of relevant experience in production, manufacturing, industrial operations, or engineering. Freshers with relevant technical qualifications may also be considered.',
        extraDocuments: [
          'Relevant Manufacturing / MIMC Certificate'
        ],
        duties: [
          'Monitor and support day-to-day production and manufacturing activities.',
          'Assist in production planning, scheduling, and resource allocation.',
          'Monitor production output, productivity, efficiency, and process performance.',
          'Coordinate with Production, Quality, Maintenance, Stores, and other departments.',
          'Ensure proper utilization of machinery, equipment, raw materials, and manpower.',
          'Identify production delays, process issues, bottlenecks, and equipment-related problems.',
          'Support troubleshooting and corrective actions to minimize production downtime.',
          'Monitor production processes to ensure quality and safety requirements are followed.',
          'Maintain production records, process documentation, checklists, and daily reports.',
          'Assist in implementing process improvements to increase productivity and reduce waste.',
          'Support preventive maintenance activities and coordinate with maintenance teams.',
          'Monitor material usage, wastage, and production efficiency.',
          'Assist in quality inspections and resolution of production-related quality issues.',
          'Follow workplace safety procedures, PPE requirements, and company policies.',
          'Prepare production performance reports and communicate operational issues to management.',
          'Support continuous improvement and manufacturing efficiency initiatives.'
        ]
      },
      {
        title: 'Production Supervisor',
        code: 'GGIPL-MFG-PS-005',
        level: 'L9',
        salary: '₹23,000–₹35,000',
        vacancies: 750,
        fee: 250,
        qualification: '12th / Intermediate or equivalent qualification. Diploma / ITI in Mechanical, Production, Manufacturing, Electrical, Fitter, or a relevant technical trade preferred. Relevant manufacturing / production training or professional certification may be preferred.',
        experience: '1–4 years of relevant experience in production, manufacturing, plant operations, or industrial supervision. Freshers with relevant technical training may also be considered.',
        extraDocuments: [
          'Relevant Manufacturing / MIMC Certificate'
        ],
        duties: [
          'Supervise day-to-day production activities on the assigned shift.',
          'Allocate work and manpower according to production requirements.',
          'Monitor production targets, output, productivity, and work schedules.',
          'Coordinate with Production Engineers, Quality, Maintenance, Stores, and other departments.',
          'Ensure proper use of machinery, equipment, raw materials, and manpower.',
          'Monitor production processes and identify delays, defects, bottlenecks, and operational issues.',
          'Ensure production work is carried out according to company procedures and quality standards.',
          'Maintain shift-wise production records, checklists, reports, and documentation.',
          'Report machine breakdowns and technical issues to the Maintenance team.',
          'Support quality inspections and coordinate corrective actions for production-related defects.',
          'Ensure workers follow safety procedures, PPE requirements, and workplace rules.',
          'Monitor material consumption and minimize unnecessary wastage.',
          'Train, guide, and supervise production workers and operators.',
          'Maintain discipline and proper coordination within the production team.',
          'Assist in implementing productivity and process-improvement initiatives.',
          'Escalate major production, quality, safety, or manpower issues to the Production Manager.',
          'Prepare shift reports and provide regular operational updates to management.'
        ]
      },
      {
        title: 'Machine Operator',
        code: 'GGIPL-MFG-MO-006',
        level: 'L11',
        salary: '₹18,000–₹28,000',
        vacancies: 250,
        fee: 210,
        qualification: '10th / 12th or equivalent qualification. ITI / Diploma in Mechanical, Production, Manufacturing, Fitter, Machinist, Electrical, or a relevant technical trade preferred. Relevant machine operation / manufacturing training or professional certification may be preferred.',
        experience: '0–3 years of relevant experience in machine operation, manufacturing, production, or industrial operations. Freshers with relevant technical training may also be considered.',
        extraDocuments: [
          'Relevant Manufacturing / MIMC Certificate'
        ],
        duties: [
          'Operate assigned production machinery and equipment safely and efficiently.',
          'Follow production schedules, operating instructions, and standard operating procedures.',
          'Perform machine setup, basic adjustments, loading/unloading, and operation as required.',
          'Monitor machine performance and production output during the assigned shift.',
          'Check products for basic quality requirements and report defects or abnormalities.',
          'Identify unusual machine sounds, vibrations, errors, or operational issues and report them promptly.',
          'Coordinate with Production Supervisors, Engineers, Maintenance, and Quality teams.',
          'Maintain proper production records, machine logs, checklists, and shift reports.',
          'Ensure correct handling and use of raw materials and production components.',
          'Maintain cleanliness and proper housekeeping around the machine and work area.',
          'Follow workplace safety procedures, PPE requirements, and company policies.',
          'Assist maintenance personnel during routine inspection and machine servicing when required.',
          'Minimize material wastage and support efficient production operations.',
          'Follow shift handover procedures and communicate pending issues to the next shift.',
          'Support productivity, quality, and continuous improvement initiatives.'
        ]
      },
      {
        title: 'Maintenance Technician',
        code: 'GGIPL-MFG-MT-007',
        level: 'L11',
        salary: '₹20,000–₹32,000',
        vacancies: 250,
        fee: 210,
        qualification: '10th / 12th or equivalent qualification. ITI / Diploma in Mechanical, Electrical, Fitter, Electronics, Instrumentation, HVAC, or a relevant technical trade preferred. Relevant maintenance / manufacturing / technical training or professional certification may be preferred.',
        experience: '0–3 years of relevant experience in industrial maintenance, machine maintenance, manufacturing, electrical/mechanical maintenance, or plant operations. Freshers with relevant technical training may also be considered.',
        extraDocuments: [
          'Relevant Manufacturing / MIMC Certificate'
        ],
        duties: [
          'Perform preventive and corrective maintenance of production machinery and equipment.',
          'Inspect machines, equipment, electrical/mechanical components, and utility systems regularly.',
          'Identify and troubleshoot basic mechanical, electrical, and operational faults.',
          'Respond promptly to machine breakdowns and minimize production downtime.',
          'Carry out routine servicing, repairs, adjustments, lubrication, and component replacement as required.',
          'Coordinate with Production Supervisors, Production Engineers, and other technical teams.',
          'Maintain maintenance logs, inspection records, breakdown reports, and service documentation.',
          'Monitor machine performance and report recurring technical problems.',
          'Assist in preventive maintenance schedules and equipment inspections.',
          'Ensure proper use, storage, and maintenance of tools, spare parts, and maintenance equipment.',
          'Follow workplace safety procedures, PPE requirements, electrical safety practices, and company policies.',
          'Support installation, testing, commissioning, and relocation of machinery when required.',
          'Maintain cleanliness and proper housekeeping in maintenance areas.',
          'Report major equipment faults and repair requirements to the Maintenance Engineer / Manager.',
          'Support continuous improvement activities aimed at improving equipment reliability and reducing downtime.'
        ]
      }
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
      {
        title: 'Skill Development Director',
        code: 'GGIPL-SD-DIR-001',
        level: 'L3',
        salary: '₹50,000–₹1,20,000+',
        vacancies: 150,
        fee: 110,
        qualification: 'Bachelor’s Degree / Master’s Degree in Education, Skill Development, Vocational Education, Training & Development, Human Resource Management, Business Administration, or a relevant field. Professional qualification or relevant training/certification in Skill Development, Vocational Training, Career Development, or Training Management may be preferred.',
        experience: '7–12 years of relevant experience in skill development, vocational education, training management, education, career development, institutional operations, or programme management.',
        extraDocuments: [
          'Relevant Skill Development / Professional Skill Development Certificate'
        ],
        duties: [
          'Provide strategic leadership for the Skill Development division.',
          'Develop and implement skill development programmes aligned with industry and employment requirements.',
          'Plan and oversee vocational, professional, technical, and career-oriented training programmes.',
          'Establish programme objectives, training standards, curriculum frameworks, and performance indicators.',
          'Lead trainers, instructors, coordinators, counsellors, and programme teams.',
          'Coordinate with employers, industry partners, training organizations, institutions, and other stakeholders.',
          'Identify emerging employment trends and recommend new training programmes based on market requirements.',
          'Monitor student enrolment, attendance, training quality, assessments, completion, and placement-related outcomes.',
          'Ensure training centres and programmes follow applicable company procedures and relevant standards.',
          'Develop partnerships for internships, apprenticeships, industry exposure, and employment opportunities where applicable.',
          'Review trainer performance and organize faculty development and training initiatives.',
          'Monitor programme budgets, resources, infrastructure, and operational requirements.',
          'Review feedback from learners, trainers, employers, and stakeholders and implement improvements.',
          'Maintain programme documentation, reports, MIS, records, and management dashboards.',
          'Identify operational risks and implement corrective and preventive measures.',
          'Promote continuous improvement in training quality, learner experience, and programme effectiveness.',
          'Present regular performance reports and strategic recommendations to senior management.',
          'Support expansion of Skill Development centres, programmes, and industry collaborations.'
        ]
      },
      {
        title: 'Training Manager',
        code: 'GGIPL-SD-TM-002',
        level: 'L6',
        salary: '₹30,000–₹70,000',
        vacancies: 150,
        fee: 110,
        qualification: 'Bachelor’s Degree / Diploma in Education, Skill Development, Vocational Training, Human Resource Management, Business Administration, Training & Development, or a relevant field. Relevant professional training or certification in Skill Development, Vocational Training, Training Management, or Career Development may be preferred.',
        experience: '3–7 years of relevant experience in training, skill development, vocational education, programme management, instructional coordination, or training operations.',
        extraDocuments: [
          'Relevant Skill Development / PSDC Certificate'
        ],
        duties: [
          'Plan, organize, and manage day-to-day training programmes.',
          'Develop training schedules, batches, sessions, and programme calendars.',
          'Coordinate with trainers, instructors, counsellors, coordinators, and administrative teams.',
          'Monitor learner enrolment, attendance, participation, assessments, and course completion.',
          'Ensure training sessions are conducted according to approved schedules and programme requirements.',
          'Support development and implementation of training materials, lesson plans, practical sessions, and assessments.',
          'Monitor trainer performance and provide operational support where required.',
          'Coordinate classroom, laboratory, practical training, equipment, and other training resources.',
          'Maintain learner records, attendance sheets, assessment results, certificates, and programme documentation.',
          'Collect learner and trainer feedback and identify areas for improvement.',
          'Coordinate with industry partners and relevant stakeholders for practical exposure, internships, placements, or career-oriented activities where applicable.',
          'Monitor training quality and ensure compliance with applicable company procedures and programme standards.',
          'Prepare daily, weekly, and monthly training reports and MIS.',
          'Manage training-related resources and support budget planning and utilization.',
          'Address learner concerns, trainer issues, scheduling conflicts, and operational challenges.',
          'Conduct regular programme reviews and recommend improvements to management.',
          'Support new course launches, training-centre activities, and programme expansion.'
        ]
      },
      {
        title: 'Centre Manager',
        code: 'GGIPL-SD-CM-003',
        level: 'L7',
        salary: '₹25,000–₹50,000',
        vacancies: 150,
        fee: 99,
        qualification: 'Bachelor’s Degree / Diploma in Education, Skill Development, Vocational Training, Business Administration, Management, Human Resources, or a relevant field. Relevant training, skill development, vocational education, or centre management certification may be preferred.',
        experience: '2–5 years of relevant experience in training-centre management, skill development, education, vocational training, programme coordination, or institutional operations.',
        extraDocuments: [
          'Relevant Skill Development / PSDC Certificate'
        ],
        duties: [
          'Manage the day-to-day operations of the assigned Skill Development Centre.',
          'Ensure smooth functioning of training batches, classrooms, practical sessions, and centre activities.',
          'Coordinate with trainers, instructors, counsellors, administrative staff, and management.',
          'Monitor student enrolment, attendance, participation, assessments, and course completion.',
          'Ensure training schedules and programme activities are conducted as planned.',
          'Maintain learner records, attendance registers, assessment records, certificates, and centre documentation.',
          'Monitor the availability and proper use of classrooms, equipment, training materials, and other resources.',
          'Address learner concerns and coordinate resolution of centre-level issues.',
          'Monitor trainer attendance, performance, schedules, and training delivery.',
          'Coordinate with the Training Manager and Skill Development team regarding programme requirements.',
          'Support student counselling, orientation, career guidance, and placement-related activities where applicable.',
          'Coordinate with external stakeholders, employers, industry partners, and other organizations when required.',
          'Ensure the centre follows applicable company policies, safety procedures, and operational standards.',
          'Monitor centre expenses, resources, supplies, and administrative requirements.',
          'Prepare daily, weekly, and monthly centre performance reports and MIS.',
          'Conduct regular reviews of centre performance and recommend improvements.',
          'Support new course launches, student mobilization, promotional activities, and centre expansion initiatives.'
        ]
      },
      {
        title: 'Senior Trainer',
        code: 'GGIPL-SD-ST-004',
        level: 'L8',
        salary: '₹25,000–₹45,000',
        vacancies: 150,
        fee: 99,
        qualification: 'Bachelor’s Degree / Diploma in the relevant technical, vocational, professional, education, or training field. Relevant Skill Development, Vocational Training, Trainer, or Professional Certification may be preferred. Strong subject knowledge in the assigned training area is required.',
        experience: '2–5 years of relevant experience in training, teaching, vocational education, skill development, or industry-related practical training.',
        extraDocuments: [
          'Relevant Skill Development / PSDC Certificate'
        ],
        duties: [
          'Deliver high-quality theoretical and practical training sessions to learners.',
          'Prepare lesson plans, training schedules, presentations, practical exercises, and learning materials.',
          'Explain technical, vocational, and job-oriented concepts in a clear and practical manner.',
          'Conduct practical demonstrations, workshops, activities, and hands-on training where applicable.',
          'Assess learner knowledge, practical skills, progress, and overall performance.',
          'Conduct tests, assignments, practical assessments, and internal evaluations.',
          'Provide constructive feedback and additional support to learners who require improvement.',
          'Maintain attendance, assessment records, learner progress reports, and training documentation.',
          'Mentor junior trainers and provide guidance on effective training methods.',
          'Coordinate with the Training Manager and Centre Manager regarding training schedules and learner requirements.',
          'Maintain discipline and a positive learning environment in classrooms and practical sessions.',
          'Keep training content updated according to industry trends and relevant job requirements.',
          'Support career guidance, employability sessions, interview preparation, and placement-oriented activities where applicable.',
          'Ensure proper use and maintenance of training equipment, tools, and learning resources.',
          'Follow applicable company policies, safety procedures, and training standards.',
          'Collect learner feedback and recommend improvements to training programmes.',
          'Participate in trainer meetings, workshops, curriculum reviews, and professional development activities.',
          'Prepare regular training performance reports for management.'
        ]
      },
      {
        title: 'Trainer / Faculty',
        code: 'GGIPL-SD-TR-005',
        level: 'L8',
        salary: '₹18,000–₹35,000',
        vacancies: 150,
        fee: 99,
        qualification: 'Bachelor’s Degree / Diploma / ITI or relevant qualification in the assigned training field. Relevant Skill Development, Vocational Training, Technical, or Professional Certification may be preferred. Strong practical and subject knowledge in the assigned training area.',
        experience: '0–3 years of relevant experience in training, teaching, vocational education, skill development, or industry-related work. Freshers with relevant qualifications and training may also be considered.',
        extraDocuments: [
          'Relevant Skill Development / PSDC Certificate'
        ],
        duties: [
          'Conduct theoretical and practical training sessions for learners.',
          'Prepare lesson plans, presentations, practical exercises, and training materials.',
          'Explain course concepts clearly using suitable teaching methods.',
          'Conduct practical demonstrations and hands-on training where applicable.',
          'Monitor learner attendance, participation, progress, and performance.',
          'Conduct tests, assignments, practical assessments, and internal evaluations.',
          'Provide feedback and additional guidance to learners who need improvement.',
          'Maintain attendance sheets, assessment records, learner progress reports, and training documentation.',
          'Maintain classroom discipline and create a positive learning environment.',
          'Coordinate with the Senior Trainer, Training Manager, and Centre Manager.',
          'Use training equipment, tools, software, and other learning resources appropriately.',
          'Keep training content updated according to the assigned course and relevant industry requirements.',
          'Support career guidance, employability sessions, interview preparation, and placement-oriented activities where applicable.',
          'Follow applicable company policies, safety procedures, and training standards.',
          'Collect learner feedback and suggest improvements in training delivery.',
          'Participate in trainer meetings, workshops, assessments, and professional development activities.',
          'Prepare regular training and learner-performance reports.'
        ]
      },
      {
        title: 'Student Counsellor',
        code: 'GGIPL-SD-SC-006',
        level: 'L8',
        salary: '₹18,000–₹35,000',
        vacancies: 150,
        fee: 99,
        qualification: 'Bachelor’s Degree / Diploma in Counselling, Psychology, Education, Social Work, Human Resources, Business Administration, or a relevant field. Relevant Skill Development, Career Counselling, Vocational Training, or Professional Certification may be preferred. Good communication and interpersonal skills are essential.',
        experience: '0–3 years of relevant experience in student counselling, career counselling, education, training, admissions, customer support, or skill development. Freshers with relevant qualifications and good communication skills may also be considered.',
        extraDocuments: [
          'Relevant Skill Development / PSDC Certificate'
        ],
        duties: [
          'Counsel students regarding suitable courses, training programmes, and career opportunities.',
          'Understand students’ educational background, interests, skills, and career goals.',
          'Explain course structure, eligibility, duration, training methodology, assessments, and career pathways accurately.',
          'Assist prospective students during the enquiry, counselling, and admission process.',
          'Conduct one-to-one and group counselling sessions.',
          'Maintain student enquiry, counselling, admission, and follow-up records.',
          'Follow up with prospective students regarding programme information and admission procedures.',
          'Coordinate with Trainers, Centre Manager, Training Manager, and administrative teams.',
          'Guide students regarding training schedules, attendance, assessments, and centre procedures.',
          'Support career guidance, employability sessions, interview preparation, and placement-related activities where applicable.',
          'Address student queries and escalate complex concerns to the appropriate department.',
          'Maintain confidentiality of student information and follow company policies.',
          'Collect student feedback and identify areas where additional support may be required.',
          'Prepare daily, weekly, and monthly counselling and admission reports.',
          'Support student engagement, retention, and successful course completion.',
          'Participate in orientation programmes, career events, workshops, and student-awareness activities.'
        ]
      },
      {
        title: 'Placement Coordinator',
        code: 'GGIPL-SD-PC-007',
        level: 'L9',
        salary: '₹20,000–₹35,000',
        vacancies: 150,
        fee: 99,
        qualification: 'Bachelor’s Degree / Diploma in Business Administration, Human Resources, Education, Skill Development, Management, or a relevant field. Relevant experience or certification in Placement Assistance, Career Development, Recruitment, Employability, or Skill Development may be preferred. Good communication, coordination, and interpersonal skills are essential.',
        experience: '1–4 years of relevant experience in placement coordination, recruitment support, career services, student relations, HR coordination, or skill development. Freshers with relevant qualifications and strong communication skills may also be considered.',
        extraDocuments: [
          'Relevant Skill Development / PSDC Certificate'
        ],
        duties: [
          'Coordinate placement and career-support activities for eligible students and trainees.',
          'Build and maintain communication with employers, recruiters, companies, and industry partners.',
          'Identify suitable employment opportunities based on students’ qualifications, skills, and training.',
          'Share verified job and interview information with eligible candidates.',
          'Coordinate job drives, interviews, recruitment events, campus placement activities, and employer interactions.',
          'Maintain student placement records, employer databases, interview schedules, and placement status.',
          'Assist students with CV/resume preparation, interview preparation, communication skills, and job-readiness activities.',
          'Coordinate with Trainers, Student Counsellors, Centre Managers, and Training Managers.',
          'Follow up with candidates and employers regarding interview schedules, selection status, joining, and placement outcomes.',
          'Collect and maintain placement-related documents and records.',
          'Track placement performance, employer feedback, candidate outcomes, and joining status.',
          'Support career guidance and employability programmes.',
          'Maintain professional relationships with existing and prospective employers.',
          'Prepare daily, weekly, and monthly placement reports and MIS.',
          'Identify opportunities for improving placement rates and employer engagement.',
          'Ensure that placement-related information communicated to students is accurate and transparent.',
          'Maintain confidentiality of student and employer information.',
          'Support placement audits, reviews, meetings, and management reporting.'
        ]
      },
      {
        title: 'Admission Executive',
        code: 'GGIPL-SD-AE-008',
        level: 'L8',
        salary: '₹15,000–₹28,000',
        vacancies: 150,
        fee: 99,
        qualification: '12th / Intermediate or equivalent qualification. Graduate candidates in Business Administration, Education, Management, Marketing, Human Resources, or a relevant field may be preferred. Good communication, interpersonal, and basic computer skills are essential.',
        experience: '0–3 years of relevant experience in admissions, student support, education, counselling, customer service, sales support, or skill development. Freshers with good communication skills may also be considered.',
        extraDocuments: [
          'Relevant Skill Development / PSDC Certificate'
        ],
        duties: [
          'Handle student enquiries related to courses, training programmes, eligibility, duration, fees, schedules, and admission procedures.',
          'Explain available programmes clearly and accurately to prospective students.',
          'Assist students with the admission and registration process.',
          'Verify admission forms and supporting documents according to applicable centre procedures.',
          'Maintain student enquiry, registration, admission, and follow-up records.',
          'Conduct follow-ups with prospective students through approved communication channels.',
          'Coordinate with Student Counsellors, Trainers, Centre Managers, and administrative teams.',
          'Schedule student counselling sessions, orientations, and admission-related meetings.',
          'Support student onboarding and provide information regarding centre rules, training schedules, and programme procedures.',
          'Maintain accurate admission databases, registers, and MIS reports.',
          'Respond professionally to student and parent queries and escalate complex matters when required.',
          'Support admission campaigns, awareness programmes, seminars, workshops, and student outreach activities.',
          'Ensure that information provided to students regarding programmes and career opportunities is accurate and transparent.',
          'Maintain confidentiality of student information and follow company policies.',
          'Prepare daily, weekly, and monthly admission reports.',
          'Support the Centre Manager in achieving enrolment and programme administration objectives.'
        ]
      }
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
      {
        title: 'Transport Operations Head',
        code: 'GGIPL-TOH-001',
        level: 'L3',
        salary: '₹50,000–₹1,00,000',
        vacancies: 250,
        fee: 150,
        qualification: 'Bachelor’s Degree / Diploma in Transport Management, Logistics, Supply Chain Management, Operations Management, Business Administration, or a relevant field. Relevant professional certification in Transport / Logistics / Operations may be preferred.',
        experience: '5–10 years of relevant experience in transport operations, fleet management, logistics, supply chain, or transportation services, with supervisory/managerial experience preferred.',
        extraDocuments: [
          'Relevant Transport / Driver Industry Training Certificate'
        ],
        duties: [
          'Lead and manage overall transport operations and fleet activities.',
          'Develop and implement efficient transportation plans, routes, schedules, and operational procedures.',
          'Manage vehicles, drivers, transport staff, and operational resources.',
          'Monitor vehicle deployment, availability, utilization, movement, and delivery schedules.',
          'Coordinate with drivers, supervisors, logistics teams, clients, vendors, and other departments.',
          'Monitor vehicle maintenance, servicing, fitness, insurance, and required operational documentation as applicable.',
          'Track fuel consumption, transportation costs, vehicle utilization, and operational efficiency.',
          'Identify route delays, breakdowns, accidents, delivery issues, and other operational challenges and coordinate timely resolution.',
          'Ensure transport operations follow applicable safety requirements and company procedures.',
          'Maintain vehicle, trip, fuel, maintenance, driver, and operational records.',
          'Monitor driver performance, attendance, discipline, and compliance with assigned duties.',
          'Coordinate emergency response and contingency arrangements for major transport disruptions.',
          'Manage transport vendors and service providers and monitor service performance.',
          'Prepare operational budgets, performance reports, MIS, and cost-analysis reports.',
          'Identify opportunities to reduce transportation costs and improve efficiency.',
          'Conduct regular operational reviews and implement corrective and preventive actions.',
          'Support recruitment, training, briefing, and performance management of transport personnel.',
          'Report major operational, safety, financial, or compliance-related issues to senior management.',
          'Lead continuous improvement initiatives across transport operations.'
        ]
      },
      {
        title: 'Fleet Manager',
        code: 'GGIPL-FM-002',
        level: 'L6',
        salary: '₹40,000–₹60,000',
        vacancies: 250,
        fee: 150,
        qualification: 'Bachelor’s Degree / Diploma in Transport Management, Fleet Management, Logistics, Supply Chain Management, Operations Management, Business Administration, or a relevant field. Relevant professional certification in Fleet, Transport, Logistics, or Operations may be preferred.',
        experience: '3–7 years of relevant experience in fleet management, transport operations, logistics, vehicle operations, or transportation services.',
        extraDocuments: [
          'Relevant Transport / DITC Certificate'
        ],
        duties: [
          'Manage day-to-day fleet operations and vehicle deployment.',
          'Plan and monitor vehicle schedules, routes, assignments, and utilization.',
          'Maintain accurate records of vehicles, drivers, trips, fuel, maintenance, and operational activities.',
          'Monitor vehicle availability, utilization, downtime, and operational efficiency.',
          'Coordinate with drivers, Transport Operations Head, supervisors, workshops, vendors, and other departments.',
          'Schedule preventive maintenance, servicing, inspections, and repairs to minimize vehicle downtime.',
          'Monitor vehicle-related documents, insurance, fitness, permits, and other applicable compliance requirements.',
          'Track fuel consumption and identify opportunities to improve fuel efficiency and reduce operational costs.',
          'Monitor driver attendance, performance, discipline, and adherence to company procedures.',
          'Handle vehicle breakdowns, delays, accidents, and other operational issues and coordinate timely resolution.',
          'Maintain fleet maintenance schedules and coordinate with authorized service providers/workshops.',
          'Monitor spare parts, repair costs, maintenance expenses, and service records.',
          'Ensure vehicles are operated in accordance with applicable safety procedures and company policies.',
          'Coordinate emergency and contingency arrangements for vehicle or route disruptions.',
          'Evaluate vehicle and vendor performance and prepare operational reports.',
          'Maintain fleet MIS, dashboards, cost reports, and management records.',
          'Identify opportunities for fleet optimization, cost reduction, and improved vehicle utilization.',
          'Support recruitment, induction, briefing, and training of drivers and fleet personnel.',
          'Report major safety, maintenance, financial, or operational issues to management.'
        ]
      },
      {
        title: 'Transport Supervisor',
        code: 'GGIPL-TS-003',
        level: 'L9',
        salary: '₹34,000–₹45,000',
        vacancies: 250,
        fee: 150,
        qualification: '12th / Intermediate or equivalent qualification. Diploma / Bachelor’s Degree in Transport Management, Logistics, Fleet Management, Operations, Business Administration, or a relevant field may be preferred. Relevant transport / logistics / fleet training or professional certification may be preferred.',
        experience: '2–5 years of relevant experience in transport operations, fleet supervision, logistics, vehicle operations, or transportation services.',
        extraDocuments: [
          'Relevant Transport / DITC Certificate'
        ],
        duties: [
          'Supervise day-to-day transport and vehicle operations.',
          'Coordinate vehicle deployment, routes, schedules, trips, and assignments.',
          'Monitor vehicle availability, movement, utilization, and operational performance.',
          'Supervise drivers and transport staff and ensure proper allocation of duties.',
          'Coordinate with the Fleet Manager, Transport Operations Head, drivers, workshops, vendors, and other departments.',
          'Monitor driver attendance, discipline, performance, and adherence to company procedures.',
          'Maintain trip sheets, vehicle movement records, fuel records, driver records, and operational documentation.',
          'Monitor vehicle servicing, maintenance schedules, breakdowns, and repair requirements.',
          'Report vehicle breakdowns, accidents, delays, route issues, and other operational problems promptly.',
          'Coordinate timely resolution of transport-related issues to minimize service disruption.',
          'Monitor fuel usage and support efficient fuel and resource management.',
          'Ensure vehicles and drivers follow applicable safety procedures and company policies.',
          'Support emergency and contingency arrangements during transport disruptions.',
          'Coordinate with workshops and service providers for vehicle maintenance and repairs.',
          'Assist in monitoring transportation costs and operational efficiency.',
          'Conduct regular inspections of vehicles and operational activities where required.',
          'Prepare daily, weekly, and monthly transport performance reports.',
          'Maintain proper documentation and support internal reviews and audits.',
          'Assist the Fleet Manager in improving vehicle utilization and transport efficiency.',
          'Support driver briefings, operational training, and safety awareness activities.'
        ]
      },
      {
        title: 'Fleet Coordinator',
        code: 'GGIPL-FC-004',
        level: 'L9',
        salary: '₹21,000–₹30,000',
        vacancies: 250,
        fee: 150,
        qualification: '12th / Intermediate or equivalent qualification. Diploma / Bachelor’s Degree in Transport Management, Logistics, Fleet Management, Operations, Business Administration, or a relevant field may be preferred. Relevant transport / fleet / logistics training or professional certification may be preferred.',
        experience: '0–3 years of relevant experience in fleet coordination, transport operations, logistics, dispatch, vehicle management, or related operations. Freshers with relevant qualifications and training may also be considered.',
        extraDocuments: [
          'Relevant Transport /DITC Certificate'
        ],
        duties: [
          'Coordinate day-to-day fleet and transport operations.',
          'Schedule vehicles according to operational requirements, routes, and trip assignments.',
          'Coordinate with drivers regarding vehicle deployment, reporting time, routes, and schedules.',
          'Monitor vehicle movement, availability, utilization, and trip status.',
          'Maintain vehicle, driver, trip, fuel, and dispatch records.',
          'Coordinate with the Fleet Manager and Transport Supervisor regarding daily fleet requirements.',
          'Track vehicle servicing, maintenance schedules, breakdowns, and repair requirements.',
          'Report vehicle delays, breakdowns, accidents, route issues, and other operational problems.',
          'Coordinate with workshops, service providers, vendors, and internal teams when required.',
          'Monitor trip completion and ensure timely updates of vehicle movement records.',
          'Assist in monitoring fuel consumption and vehicle operating expenses.',
          'Ensure required operational and vehicle documentation is properly maintained.',
          'Support driver attendance, duty allocation, and shift coordination.',
          'Assist with emergency and contingency arrangements during transport disruptions.',
          'Prepare daily, weekly, and monthly fleet operation reports and MIS.',
          'Maintain accurate records for management review and operational audits.',
          'Support fleet utilization, route optimization, and operational efficiency initiatives.',
          'Follow applicable safety procedures, company policies, and transport operating standards.',
          'Escalate significant operational or safety issues to the appropriate supervisor or manager.'
        ]
      },
      {
        title: 'Driver Trainer',
        code: 'GGIPL-DS-DT-001',
        level: 'L8',
        salary: '₹26,000–₹35,000',
        vacancies: 250,
        fee: 150,
        qualification: '10th / 12th or equivalent qualification. Valid driving licence appropriate to the vehicle category being trained, as applicable. Relevant driving instruction, transport operations, road-safety, or driver-training qualification/certification may be preferred. Good knowledge of traffic rules, road safety, defensive driving, and vehicle handling is required.',
        experience: 'as a driving instructor or trainer will be preferred.',
        extraDocuments: [
          'Valid Driving Licence, as applicable',
          'Relevant Transport / DITC Certificate'
        ],
        duties: [
          'Conduct theoretical and practical training for drivers.',
          'Train drivers on safe, responsible, and efficient vehicle operation.',
          'Provide instruction on defensive driving, road safety, traffic rules, and hazard awareness.',
          'Demonstrate correct vehicle handling, basic vehicle controls, parking, reversing, and safe manoeuvring.',
          'Assess trainees\' driving skills, knowledge, confidence, and overall readiness.',
          'Conduct practical driving assessments according to applicable company procedures.',
          'Identify areas requiring improvement and provide corrective guidance.',
          'Train drivers on pre-trip and post-trip vehicle inspection procedures.',
          'Explain basic vehicle maintenance awareness, emergency procedures, and breakdown reporting.',
          'Educate drivers on company transport policies, operational procedures, and professional conduct.',
          'Maintain trainee attendance, assessment records, training logs, and performance reports.',
          'Coordinate with Fleet Managers, Transport Supervisors, and other operational teams.',
          'Conduct refresher training and safety-awareness sessions for existing drivers.',
          'Monitor driver performance and recommend additional training where required.',
          'Support induction and orientation programmes for newly recruited drivers.',
          'Promote safe driving practices, fuel-efficient driving, and responsible vehicle use.',
          'Report serious safety concerns or training issues to the appropriate management team.',
          'Prepare regular training and assessment reports for management review.'
        ]
      },
      {
        title: 'Commercial Driver',
        code: 'GGIPL-DS-CD-002',
        level: 'L11',
        salary: '₹21,000–₹30,000',
        vacancies: 250,
        fee: 150,
        qualification: 'Minimum 10th Pass required. 12th Pass candidates preferred. Valid Driving Licence (DL) for the applicable commercial vehicle category is mandatory. Relevant driving/transport training certificate such as DITC.',
        experience: '1–3 years of commercial/professional driving experience preferred. Freshers may be considered if they hold the required valid licence and demonstrate suitable driving skills.',
        extraDocuments: [
          'Valid Driving Licence',
          'Relevant Transport / Driver Industry Training Certificate such as DITC'
        ],
        duties: [
          'Safely operate company/commercial vehicles as assigned.',
          'Follow traffic rules, road-safety procedures and company driving policies.',
          'Pick up and drop off passengers, staff, materials or goods as assigned.',
          'Maintain trip sheets, vehicle records and required documentation.',
          'Conduct basic pre-trip and post-trip vehicle checks.',
          'Report vehicle faults, breakdowns or maintenance requirements promptly.',
          'Maintain cleanliness and basic upkeep of the assigned vehicle.',
          'Follow assigned routes, schedules and instructions.',
          'Ensure safe handling of passengers, goods and company property.',
          'Support emergency procedures when required.',
          'Maintain professional behaviour and courteous communication.',
          'Coordinate with the Transport Supervisor/Fleet Coordinator regarding daily assignments.',
          'Maintain confidentiality and protect company/customer information where applicable.'
        ]
      }
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
      {
        title: 'Education Director',
        code: 'GGIPL-EDU-DIR-001',
        level: 'L3',
        salary: '₹50,000–₹1,20,000+',
        vacancies: 310,
        fee: 250,
        qualification: 'Bachelor’s or Master’s Degree in Education, Teaching, Educational Administration, Management, or a related field preferred. B.Ed., M.Ed., or relevant professional/educational qualification may be preferred for applicable roles. Relevant Teaching / Education / Training Certificate such as TITC.',
        experience: 'in educational leadership and team management preferred.',
        extraDocuments: [
          'Relevant Teaching / Teaching Industry Training Certificate such as TITC'
        ],
        duties: [
          'Lead and manage the overall Teaching & Education Division.',
          'Develop academic strategies, educational programmes and institutional objectives.',
          'Supervise academic, teaching, training and administrative teams.',
          'Establish and monitor academic standards and quality benchmarks.',
          'Support curriculum planning, course development and programme implementation.',
          'Monitor teaching quality, learner performance and academic outcomes.',
          'Coordinate with trainers, teachers, academic coordinators and centre managers.',
          'Develop partnerships with relevant educational and training organisations where appropriate.',
          'Review student feedback and identify opportunities for academic improvement.',
          'Support faculty development, training and professional-development initiatives.',
          'Monitor departmental budgets, resources and operational requirements.',
          'Ensure proper academic records, reports and documentation are maintained.',
          'Review performance reports and present recommendations to senior management.',
          'Address academic and operational issues and coordinate appropriate corrective actions.',
          'Support expansion of educational programmes and learning centres.',
          'Ensure company policies and applicable education-related requirements are followed.',
          'Promote a professional, inclusive and learner-focused educational environment.'
        ]
      },
      {
        title: 'Academic Head',
        code: 'GGIPL-EDU-AH-002',
        level: 'L4',
        salary: '₹35,000–₹80,000',
        vacancies: 310,
        fee: 220,
        qualification: 'Bachelor’s or Master’s Degree in Education, Teaching, Academic Administration, Management, or a related field preferred. B.Ed., M.Ed., or relevant academic/training qualification may be preferred. Relevant Teaching / Education / Training Certificate such as TITC.',
        experience: 'in supervising teachers/trainers and managing academic activities preferred.',
        extraDocuments: [
          'Relevant Teaching / Teaching Industry Training Certificate such as TITC'
        ],
        duties: [
          'Manage day-to-day academic operations of the institution/centre.',
          'Supervise teachers, trainers and academic coordinators.',
          'Prepare and monitor academic calendars, class schedules and training plans.',
          'Coordinate curriculum implementation and lesson planning.',
          'Monitor teaching quality and classroom performance.',
          'Track student attendance, assessments and academic progress.',
          'Conduct academic reviews and provide feedback to teaching staff.',
          'Support teacher training and professional-development activities.',
          'Address student and faculty academic concerns.',
          'Maintain academic records, reports and documentation.',
          'Coordinate examinations, assessments and evaluation activities.',
          'Review student feedback and recommend academic improvements.',
          'Coordinate with management regarding academic performance and requirements.',
          'Ensure academic activities follow company policies and applicable educational requirements.',
          'Prepare periodic academic performance and MIS reports.'
        ]
      },
      {
        title: 'Centre Head',
        code: 'GGIPL-EDU-CH-003',
        level: 'L5',
        salary: '₹30,000–₹60,000',
        vacancies: 310,
        fee: 220,
        qualification: 'Bachelor’s Degree in Education, Management, Business Administration, Training, or a related field preferred. Diploma/PG qualification in Education, Training or Centre Management may be preferred. Relevant Teaching / Education / Training Certificate such as TITC. Basic computer and administrative skills required.',
        experience: 'in managing teaching/training staff and student operations preferred.',
        extraDocuments: [
          'Relevant Teaching / Teaching Industry Training Certificate such as TITC'
        ],
        duties: [
          'Manage the day-to-day operations of the education/training centre.',
          'Coordinate classes, batches, schedules and academic activities.',
          'Supervise teachers, trainers, counsellors and centre staff.',
          'Monitor student admissions, attendance and learner engagement.',
          'Ensure proper classroom and centre facilities are maintained.',
          'Coordinate student enquiries, counselling and admission activities.',
          'Monitor academic and operational performance of the centre.',
          'Maintain student, staff, attendance and administrative records.',
          'Coordinate examinations, assessments and academic activities.',
          'Address student, parent and staff concerns professionally.',
          'Support placement and career-development activities where applicable.',
          'Monitor centre resources, equipment and administrative requirements.',
          'Prepare daily, weekly and monthly centre reports/MIS.',
          'Coordinate with senior management regarding centre performance and requirements.',
          'Ensure centre activities follow company policies and applicable educational requirements.',
          'Support implementation of new courses, programmes and centre initiatives.'
        ]
      },
      {
        title: 'Subject Teacher',
        code: 'GGIPL-EDU-ST-004',
        level: 'L8',
        salary: '₹20,000–₹45,000',
        vacancies: 510,
        fee: 220,
        qualification: 'Bachelor’s Degree in the relevant subject or a related field preferred. B.Ed. or relevant teaching qualification preferred where applicable. Subject-specific qualification should match the subject being taught. Relevant Teaching / Education / Training Certificate such as TITC. Good communication and classroom-management skills required.',
        experience: '0–5 years of teaching/training experience preferred. Freshers with relevant educational and teaching qualifications may be considered.',
        extraDocuments: [
          'Relevant Teaching / Teaching Industry Training Certificate such as TITC'
        ],
        duties: [
          'Plan and deliver lessons according to the assigned subject and curriculum.',
          'Explain concepts clearly using appropriate teaching methods and learning materials.',
          'Prepare lesson plans, assignments, worksheets and classroom activities.',
          'Conduct tests, assessments and examinations as assigned.',
          'Monitor student attendance, participation and academic progress.',
          'Provide constructive feedback and additional academic support where required.',
          'Maintain classroom discipline and create a positive learning environment.',
          'Identify students who require additional academic assistance.',
          'Communicate student progress and academic concerns to the appropriate academic team.',
          'Maintain accurate academic and assessment records.',
          'Participate in faculty meetings, training programmes and academic activities.',
          'Use appropriate educational tools and technology to support learning.',
          'Encourage students to develop subject knowledge, problem-solving and critical-thinking skills.',
          'Follow institutional academic policies, procedures and professional standards.',
          'Support co-curricular and educational activities when assigned.'
        ]
      },
      {
        title: 'Vocational Instructor',
        code: 'GGIPL-EDU-VI-005',
        level: 'L8',
        salary: '₹18,000–₹40,000',
        vacancies: 250,
        fee: 120,
        qualification: '12th Pass with relevant technical/vocational qualification preferred. ITI, Diploma, Bachelor’s Degree, or relevant qualification in the assigned vocational/technical trade preferred. Relevant Teaching / Education / Vocational Training Certificate such as TITC. Practical knowledge of the assigned trade is preferred.',
        experience: '0–5 years of relevant vocational training, technical work, teaching, or instructor experience. Freshers with relevant technical/vocational qualifications may be considered.',
        extraDocuments: [
          'Relevant Teaching / Teaching Industry Training Certificate such as TITC'
        ],
        duties: [
          'Deliver theoretical and practical vocational training in the assigned trade.',
          'Prepare lesson plans, training schedules and practical demonstrations.',
          'Explain technical concepts, procedures and workplace practices clearly.',
          'Conduct practical exercises, assignments, tests and skill assessments.',
          'Demonstrate proper use of tools, equipment and training materials.',
          'Monitor trainee attendance, participation and skill development.',
          'Provide individual guidance and corrective feedback to trainees.',
          'Maintain training records, assessment results and learner progress reports.',
          'Ensure proper safety procedures are followed during practical sessions.',
          'Maintain and report the condition of training equipment and tools.',
          'Support trainees in developing job-ready technical and professional skills.',
          'Coordinate with the Centre Head and academic/training team.',
          'Participate in workshops, industry-oriented training and skill-development activities.',
          'Support career guidance and placement-related activities where assigned.',
          'Follow institutional procedures and applicable vocational-training requirements.'
        ]
      },
      {
        title: 'Academic Counsellor',
        code: 'GGIPL-EDU-AC-006',
        level: 'L8',
        salary: '₹18,000–₹35,000',
        vacancies: 250,
        fee: 120,
        qualification: 'Minimum 12th Pass preferred. Bachelor’s Degree/Diploma in Education, Counselling, Psychology, Social Work, Business Administration, Management, or a related field preferred. Relevant Teaching / Education / Counselling / Training Certificate such as TITC. Good communication and interpersonal skills required.',
        experience: '0–3 years of experience in academic counselling, student counselling, admissions, education, training, customer service, or a related field. Freshers with strong communication and counselling skills may be considered.',
        extraDocuments: [
          'Relevant Teaching / Teaching Industry Training Certificate such as TITC'
        ],
        duties: [
          'Provide academic and career guidance to students and prospective learners.',
          'Explain available courses, programmes, eligibility requirements and learning pathways.',
          'Understand student interests, educational backgrounds and career goals.',
          'Assist students in selecting suitable courses based on their requirements.',
          'Handle student and parent enquiries professionally.',
          'Support admission, registration and onboarding processes.',
          'Conduct counselling sessions through phone, online or in-person meetings as applicable.',
          'Maintain accurate student enquiry, counselling and admission records.',
          'Follow up with prospective students regarding applications and admissions.',
          'Coordinate with academic, admission and placement teams.',
          'Provide information about course schedules, training facilities and programme procedures.',
          'Address routine student concerns and escalate complex matters appropriately.',
          'Maintain confidentiality of student information and records.',
          'Prepare counselling activity and admission-related reports.',
          'Participate in orientation programmes, seminars and student-support activities.',
          'Follow institutional policies and professional counselling standards.'
        ]
      }
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
      {
        title: 'Chief Technology Officer',
        code: 'GGIPL-IT-CTO-001',
        level: 'L2',
        salary: '₹80,000–₹2,50,000+',
        vacancies: 350,
        fee: 190,
        qualification: 'Bachelor’s Degree in Computer Science, Information Technology, Software Engineering, Electronics, Computer Applications, or a related field preferred. Master’s Degree/M.Tech/MCA/MBA in Technology or a related discipline may be preferred for senior-level responsibilities. Relevant IT / Technology / Professional Certificate such as ITITC. Strong knowledge of technology strategy, software development, IT infrastructure, cybersecurity and digital systems preferred.',
        experience: '8–15 years of relevant experience in IT, technology management, software development, infrastructure, digital transformation, or related fields. Proven experience leading technical teams and managing technology projects preferred.',
        extraDocuments: [
          'Relevant IT / Technology / Professional Certificate such as ITITC'
        ],
        duties: [
          'Develop and lead the organisation’s overall technology strategy.',
          'Align technology initiatives with business objectives and long-term organisational goals.',
          'Lead software development, IT infrastructure, cybersecurity and technology operations.',
          'Supervise and guide software engineers, developers, IT administrators and technical teams.',
          'Evaluate and implement appropriate technologies, platforms and digital solutions.',
          'Oversee technology projects, timelines, budgets and resource allocation.',
          'Establish appropriate standards for software development, system architecture and IT operations.',
          'Monitor system performance, availability, scalability and reliability.',
          'Support cybersecurity, data protection, access-control and technology-risk management.',
          'Lead digital-transformation and automation initiatives.',
          'Review technology vendors, service providers and external technical partners.',
          'Ensure appropriate documentation of systems, processes and technical procedures.',
          'Identify technology risks, operational issues and opportunities for improvement.',
          'Prepare technology budgets, performance reports and management presentations.',
          'Promote innovation, research and adoption of suitable emerging technologies.',
          'Support business continuity, disaster-recovery and technology contingency planning.',
          'Coordinate with senior management and other departments on technology requirements.',
          'Ensure technology operations follow company policies and applicable legal/regulatory requirements.'
        ]
      },
      {
        title: 'IT Manager',
        code: 'GGIPL-IT-ITM-002',
        level: 'L5',
        salary: '₹50,000–₹1,00,000',
        vacancies: 350,
        fee: 190,
        qualification: 'Bachelor’s Degree in Computer Science, Information Technology, Computer Applications, Software Engineering, Electronics, or a related field preferred. MCA, M.Tech, MBA (IT), or relevant postgraduate qualification may be preferred. Relevant IT / Technology / Professional Certificate such as ITITC. Strong knowledge of IT infrastructure, software systems, networking and cybersecurity is preferred.',
        experience: 'in managing IT teams and technology projects preferred.',
        extraDocuments: [
          'Relevant IT / ITITC Certificate'
        ],
        duties: [
          'Manage day-to-day IT operations and technology infrastructure.',
          'Supervise IT support, system administration, networking and technical teams.',
          'Monitor servers, networks, systems, software and IT equipment.',
          'Ensure reliable availability and performance of IT systems.',
          'Coordinate installation, configuration, maintenance and upgrades of IT systems.',
          'Manage user accounts, access permissions and IT support requirements.',
          'Monitor cybersecurity controls and report potential security risks.',
          'Support data backup, recovery and business-continuity procedures.',
          'Troubleshoot hardware, software, network and system-related issues.',
          'Coordinate with technology vendors and external service providers.',
          'Maintain IT asset inventories, licences and technical documentation.',
          'Plan and monitor IT projects, budgets and resource requirements.',
          'Develop and maintain IT policies, procedures and operational standards.',
          'Prepare IT performance reports and MIS for senior management.',
          'Identify opportunities for automation, system improvement and cost optimisation.',
          'Conduct team training and performance reviews.',
          'Ensure IT operations follow company policies and applicable data-protection and security requirements.'
        ]
      },
      {
        title: 'Software Developer',
        code: 'GGIPL-IT-SD-003',
        level: 'L8',
        salary: '₹30,000–₹80,000',
        vacancies: 350,
        fee: 190,
        qualification: 'Bachelor’s Degree in Computer Science, Information Technology, Software Engineering, Computer Applications, or a related field preferred. BCA, B.Tech, BE, MCA or equivalent technical qualification may be preferred. Relevant IT / Software Development / Professional Certificate such as ITITC Strong programming and software-development fundamentals required.',
        experience: '1–5 years of relevant experience in software development, application development, web development, mobile development, or a related field. Freshers with strong programming skills and relevant technical qualifications may be considered.',
        extraDocuments: [
          'Relevant IT / ITITC Certificate'
        ],
        duties: [
          'Design, develop, test and maintain software applications.',
          'Analyse technical and business requirements and convert them into software solutions.',
          'Write clean, efficient, maintainable and well-documented code.',
          'Develop and maintain web, desktop, mobile or backend applications as assigned.',
          'Debug software issues and implement appropriate fixes.',
          'Conduct unit testing, integration testing and performance checks.',
          'Collaborate with UI/UX designers, testers, IT teams and project managers.',
          'Participate in code reviews and follow established development standards.',
          'Integrate APIs, databases and third-party services where required.',
          'Maintain technical documentation and development records.',
          'Monitor application performance and troubleshoot production issues.',
          'Support software upgrades, enhancements and maintenance activities.',
          'Follow secure coding practices and appropriate data-protection procedures.',
          'Research and evaluate suitable technologies and development tools.',
          'Participate in Agile/Scrum or other project-management processes where applicable.',
          'Report development progress, technical issues and project risks to the appropriate team lead/manager.'
        ]
      },
      {
        title: 'Web Developer',
        code: 'GGIPL-IT-WD-004',
        level: 'L8',
        salary: '₹22,000–₹50,000',
        vacancies: 350,
        fee: 190,
        qualification: '12th Pass / Graduate preferred Diploma / Bachelor’s Degree in Computer Science, Information Technology, Web Development, Software Engineering, Computer Applications, or a related field preferred. Basic knowledge of web development technologies.',
        experience: '0–3 years preferred. Freshers with relevant technical skills or training may also be considered.',
        extraDocuments: [
          'ITITC Certificate or relevant IT/Web Development certificate'
        ],
        duties: [
          'Develop, maintain, and update company websites and web applications.',
          'Create responsive and user-friendly web pages.',
          'Work with HTML, CSS, JavaScript and other relevant web technologies.',
          'Fix website bugs, errors, and performance issues.',
          'Coordinate with designers and software development teams.',
          'Integrate APIs, databases, forms, and website functionalities as required.',
          'Ensure websites are compatible with desktop and mobile devices.',
          'Perform basic website security and performance checks.',
          'Maintain technical documentation and development records.',
          'Support website upgrades, improvements, and new feature development.',
          'Monitor website functionality and resolve technical issues.',
          'Follow company IT, data-security, and development procedures.'
        ]
      },
      {
        title: 'Data Analyst',
        code: 'GGIPL-IT-DA-004',
        level: 'L8',
        salary: '₹25,000–₹60,000',
        vacancies: 350,
        fee: 190,
        qualification: '12th Pass / Graduate preferred. Bachelor’s Degree or Diploma in Data Analytics, Computer Science, Information Technology, Statistics, Mathematics, Economics, Business Analytics, Commerce, or a related field preferred. Basic knowledge of data analysis and computer applications.',
        experience: '0–3 years preferred. Freshers with relevant technical training and analytical skills may also be considered.',
        extraDocuments: [
          'ITITC Certificate or relevant IT/Data Analytics certificate'
        ],
        duties: [
          'Collect, organize, clean, and analyze business data.',
          'Prepare reports, dashboards, and data summaries.',
          'Identify trends, patterns, and data-related insights.',
          'Maintain accurate databases and data records.',
          'Perform data validation and quality checks.',
          'Prepare Excel-based reports and analytical presentations.',
          'Work with internal teams to understand data requirements.',
          'Support management with data-driven insights for decision-making.',
          'Monitor key performance indicators (KPIs) and prepare regular reports.',
          'Identify inconsistencies, missing data, and reporting errors.',
          'Maintain proper documentation of analytical processes and reports.',
          'Follow company data-security, confidentiality, and IT procedures.'
        ]
      },
      {
        title: 'Network Administrator',
        code: 'GGIPL-IT-NA-005',
        level: 'L8',
        salary: '₹25,000–₹55,000',
        vacancies: 350,
        fee: 190,
        qualification: '12th Pass / Graduate preferred. Diploma / Bachelor’s Degree in Computer Science, Information Technology, Networking, Computer Applications, Electronics & Communication, or a related field preferred. Basic knowledge of computer networks and IT infrastructure.',
        experience: '1–5 years preferred. Freshers with relevant networking training and technical skills may also be considered.',
        extraDocuments: [
          'ITITC Certificate or relevant IT/Networking certificate'
        ],
        duties: [
          'Install, configure, and maintain computer networks and network devices.',
          'Monitor network performance, availability, and connectivity.',
          'Configure and manage routers, switches, access points, and related equipment.',
          'Troubleshoot LAN/WAN and connectivity-related issues.',
          'Monitor network security and access controls.',
          'Maintain network documentation, configurations, and technical records.',
          'Manage user access and network permissions as authorized.',
          'Support network upgrades, installations, and infrastructure improvements.',
          'Identify and resolve network performance and connectivity problems.',
          'Coordinate with IT teams and service providers for technical issues.',
          'Assist with backup, disaster-recovery, and business-continuity procedures.',
          'Follow company IT, cybersecurity, data-protection, and access-control policies.'
        ]
      },
      {
        title: 'IT Support Executive',
        code: 'GGIPL-IT-ISE-006',
        level: 'L8',
        salary: '₹18,000–₹35,000',
        vacancies: 350,
        fee: 190,
        qualification: '12th Pass / Graduate preferred. Diploma / Bachelor’s Degree in Computer Science, Information Technology, Computer Applications, Electronics, or a related field preferred. Basic knowledge of computer hardware, software, operating systems, and networking.',
        experience: '0–3 years preferred. Freshers with relevant IT training and technical skills may also be considered.',
        extraDocuments: [
          'ITITC Certificate or relevant IT/Computer Support certificate'
        ],
        duties: [
          'Provide day-to-day technical support to employees and users.',
          'Troubleshoot computer hardware, software, printer, and connectivity issues.',
          'Install and configure computers, software, peripherals, and basic IT equipment.',
          'Assist users with operating systems, applications, email, and other IT services.',
          'Identify and resolve basic network and internet connectivity problems.',
          'Maintain IT equipment, asset records, and support documentation.',
          'Create, update, and track technical support requests.',
          'Assist with software updates, system maintenance, and basic security procedures.',
          'Coordinate with Network Administrators and IT Managers for complex technical issues.',
          'Support user account and access-related requests as authorized.',
          'Maintain proper records of troubleshooting and maintenance activities.',
          'Follow company IT, cybersecurity, data-protection, and information-security procedures.'
        ]
      }
    ]
  },

  {
    id: 'construction',
    division: 'Construction',
    brandName: 'Global Growth Construction',
    status: 'active',
    certificate: 'CITC',
    roles: [
      {
        title: 'Construction Director',
        code: 'GGIPL-CON-DIR-001',
        level: 'L3',
        salary: '₹70,000–₹1,50,000+',
        vacancies: 450,
        fee: 160,
        qualification: 'Bachelor’s Degree / Diploma in Civil Engineering, Construction Management, Architecture, Project Management, Infrastructure, or a related field preferred. Master’s Degree / MBA in Construction or Project Management may be preferred for senior-level responsibilities. Strong knowledge of construction operations, project planning, safety, quality, and resource management.',
        experience: '7–15 years of relevant experience in construction, infrastructure, civil engineering, project management, or related fields.',
        extraDocuments: [
          'CETC Certificate or relevant Construction / Civil / Technical certificate',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Lead and oversee the overall activities of the Construction Division.',
          'Develop construction strategies, project plans, schedules, and operational targets.',
          'Supervise multiple construction projects and monitor progress against approved plans.',
          'Coordinate with project managers, engineers, contractors, consultants, suppliers, and other stakeholders.',
          'Monitor project budgets, resource allocation, material requirements, and cost control.',
          'Ensure construction activities meet applicable quality, safety, and environmental requirements.',
          'Review project progress, identify delays or risks, and coordinate corrective actions.',
          'Monitor manpower, equipment, materials, and other project resources.',
          'Evaluate contractor and vendor performance and support contract coordination.',
          'Review project reports, site updates, budgets, and performance indicators.',
          'Support project planning, tendering, procurement, and execution activities.',
          'Promote efficient construction practices and continuous improvement.',
          'Ensure proper project documentation, records, approvals, and reporting.',
          'Coordinate with senior management regarding major project decisions and business requirements.',
          'Support the development and expansion of the Construction and Infrastructure Division.'
        ]
      },
      {
        title: 'Project Manager',
        code: 'GGIPL-CON-PM-002',
        level: 'L5',
        salary: '₹60,000–₹1,00,000',
        vacancies: 450,
        fee: 160,
        qualification: 'Bachelor’s Degree / Diploma in Civil Engineering, Construction Management, Project Management, Architecture, Infrastructure, or a related field preferred. Relevant project-management or construction certification may be preferred. Good knowledge of construction planning, execution, quality, safety, and resource management.',
        experience: '5–10 years of relevant experience in construction, civil engineering, infrastructure, project management, or related fields.',
        extraDocuments: [
          'CETC Certificate or relevant Construction',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Plan, manage, and coordinate construction projects from initiation through completion.',
          'Develop project schedules, milestones, work plans, and execution strategies.',
          'Coordinate with engineers, site teams, contractors, consultants, suppliers, and other stakeholders.',
          'Monitor project progress, productivity, timelines, and deliverables.',
          'Manage project resources including manpower, materials, equipment, and site requirements.',
          'Monitor project budgets, costs, procurement, and resource utilization.',
          'Identify project risks, delays, technical issues, and operational bottlenecks and coordinate corrective actions.',
          'Ensure construction activities follow applicable quality, safety, and environmental requirements.',
          'Review site reports, drawings, work schedules, measurements, and project documentation as applicable.',
          'Monitor contractor and vendor performance and coordinate required improvements.',
          'Conduct project review meetings and prepare progress reports for management.',
          'Maintain proper project records, approvals, correspondence, and documentation.',
          'Coordinate inspections, testing, handover, and project close-out activities.',
          'Support continuous improvement in project execution, productivity, cost control, and quality.',
          'Provide regular updates to senior management regarding project performance and major issues.'
        ]
      },
      {
        title: 'Civil Engineer',
        code: 'GGIPL-CON-CE-003',
        level: 'L8',
        salary: '₹45,000–₹60,000',
        vacancies: 450,
        fee: 160,
        qualification: 'Bachelor’s Degree / Diploma in Civil Engineering or a related field preferred. Knowledge of construction methods, structural drawings, site execution, estimation, and project documentation. Good understanding of construction quality, safety, materials, measurements, and site coordination. Relevant technical or construction certification may be preferred.',
        experience: '2–5 years of relevant experience in civil construction, infrastructure, site engineering, project execution, or related fields.',
        extraDocuments: [
          'CETC Certificate or relevant Construction/Civil Engineering certification',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Supervise and coordinate civil construction activities at project sites.',
          'Review construction drawings, specifications, work plans, and technical documents.',
          'Monitor site execution to ensure work is completed according to approved plans and schedules.',
          'Coordinate with Project Managers, contractors, supervisors, consultants, and site teams.',
          'Monitor manpower, materials, equipment, and other site resources.',
          'Conduct regular site inspections and monitor construction quality and workmanship.',
          'Check measurements, quantities, material requirements, and work progress.',
          'Identify construction issues, delays, defects, and technical problems and coordinate corrective actions.',
          'Ensure construction activities follow applicable quality, safety, and environmental requirements.',
          'Maintain daily site reports, measurements, progress records, and project documentation.',
          'Coordinate material requirements and ensure timely availability of construction materials.',
          'Monitor contractor and subcontractor work and report performance issues to management.',
          'Assist in project scheduling, cost monitoring, estimation, and resource planning.',
          'Coordinate inspections, testing, rectification, and completion of assigned works.',
          'Provide regular progress updates and technical reports to the Project Manager and senior management.',
          'Support project completion, handover, documentation, and project close-out activities.',
          'Follow company policies, site procedures, quality standards, and applicable construction regulations.',
          'Contribute to improving project quality, productivity, safety, and timely completion.'
        ]
      },
      {
        title: 'Site Engineer',
        code: 'GGIPL-CON-SE-004',
        level: 'L8',
        salary: '₹35,000–₹45,000',
        vacancies: 450,
        fee: 160,
        qualification: 'Bachelor’s Degree / Diploma in Civil Engineering, Construction Engineering, Infrastructure, or a related field preferred. Knowledge of construction methods, site execution, structural drawings, measurements, estimation, and project documentation. Good understanding of construction materials, quality control, safety procedures, and site coordination. Relevant Construction / Civil Engineering professional certificate such as CETC may be preferred.',
        experience: 'in site supervision, contractor coordination, quality monitoring, and construction activities preferred.',
        extraDocuments: [
          'CETC Certificate or relevant Construction / Civil Engineering certificate',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Supervise and coordinate day-to-day civil construction activities at project sites.',
          'Review construction drawings, specifications, work schedules, and technical documents.',
          'Monitor site execution according to approved drawings, specifications, quality standards, and project schedules.',
          'Coordinate with Project Managers, Civil Engineers, contractors, supervisors, consultants, and site workers.',
          'Monitor manpower, materials, equipment, tools, and other site resources.',
          'Conduct regular site inspections and monitor construction quality and workmanship.',
          'Check measurements, quantities, material requirements, and work progress.',
          'Ensure construction activities are carried out according to approved plans and applicable safety requirements.',
          'Identify site-level technical issues, delays, defects, and operational problems and coordinate corrective actions.',
          'Maintain daily progress reports, site records, measurements, checklists, and project documentation.',
          'Coordinate with procurement and site teams regarding material requirements and availability.',
          'Monitor contractor and subcontractor activities and report performance issues to senior management.',
          'Assist in project planning, scheduling, estimation, quantity assessment, and cost monitoring.',
          'Coordinate inspections, testing, rectification, and completion of assigned construction works.',
          'Ensure proper implementation of site safety, quality-control, and environmental procedures.',
          'Review work completion and assist with project handover and close-out documentation.',
          'Provide regular updates regarding site progress, manpower, materials, quality, and major issues.',
          'Follow company policies, project procedures, applicable construction standards, and regulatory requirements.',
          'Support continuous improvement in construction quality, productivity, safety, and timely project completion.'
        ]
      },
      {
        title: 'Quantity Surveyor',
        code: 'GGIPL-CON-QS-005',
        level: 'L8',
        salary: '₹32,000–₹55,000',
        vacancies: 450,
        fee: 160,
        qualification: 'Bachelor’s Degree / Diploma in Civil Engineering, Quantity Surveying, Construction Management, or a related field preferred. Knowledge of quantity estimation, measurement, rate analysis, costing, budgeting, and construction documentation. Good understanding of construction materials, drawings, specifications, contracts, and project cost control. Relevant Construction / Civil Engineering professional certificate such as CETC may be preferred.',
        experience: 'in preparing quantity take-offs, bills, cost estimates, and contractor measurements preferred.',
        extraDocuments: [
          'CETC Certificate or relevant Construction / Civil Engineering certificate',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Prepare quantity take-offs, measurements, estimates, and cost calculations for construction projects.',
          'Review architectural, structural, civil, and engineering drawings to determine project quantities.',
          'Prepare Bills of Quantities (BOQ), material schedules, and cost estimates.',
          'Conduct quantity measurements and verify work completed at project sites.',
          'Monitor project costs, budgets, variations, and expenditure.',
          'Coordinate with Project Managers, Civil Engineers, contractors, consultants, procurement teams, and site personnel.',
          'Review contractor and subcontractor bills and verify quantities before processing.',
          'Conduct rate analysis for construction materials, labour, equipment, and related works.',
          'Monitor material consumption and identify potential wastage or cost overruns.',
          'Assist in preparation and evaluation of tenders, quotations, and commercial proposals.',
          'Maintain accurate records of measurements, quantities, estimates, invoices, variations, and project costs.',
          'Review variations, additional works, and change orders and assess their financial impact.',
          'Support procurement and project teams with quantity and cost-related information.',
          'Compare estimated costs with actual project expenditure and identify significant variances.',
          'Assist in contract administration, payment certification, and commercial documentation.',
          'Prepare regular cost reports, quantity reports, and financial updates for management.',
          'Ensure quantity and costing records are maintained accurately throughout the project lifecycle.',
          'Support project close-out activities, including final measurements, account reconciliation, and documentation.',
          'Identify opportunities for cost optimisation while maintaining required quality and project standards.',
          'Follow company policies, project procedures, applicable construction standards, and contractual requirements.'
        ]
      },
      {
        title: 'Safety Officer',
        code: 'GGIPL-CON-SO-007',
        level: 'L8',
        salary: '₹25,000–₹50,000',
        vacancies: 450,
        fee: 160,
        qualification: '10th / 12th Pass with relevant Safety / Construction qualification preferred. Diploma / Certificate in Occupational Health & Safety, Industrial Safety, Construction Safety, or a related field preferred. Good knowledge of construction-site safety procedures, hazard identification, risk assessment, PPE, emergency response, and safety documentation. Relevant Construction / Safety professional certificate such as CETC may be preferred.',
        experience: 'in conducting site inspections, safety briefings, risk assessments, and incident reporting preferred.',
        extraDocuments: [
          'CETC Certificate or relevant Safety / Construction Safety certificate',
          'Relevant safety qualification or professional certification'
        ],
        duties: [
          'Monitor and implement safety procedures across construction project sites.',
          'Conduct regular site safety inspections and identify potential hazards and unsafe conditions.',
          'Ensure workers and site personnel follow applicable safety procedures and company requirements.',
          'Conduct safety briefings, toolbox talks, and awareness sessions for workers and site teams.',
          'Monitor the proper use of Personal Protective Equipment (PPE).',
          'Identify workplace hazards and assist in conducting risk assessments and implementing control measures.',
          'Monitor safety compliance during construction, excavation, lifting, electrical, work-at-height, and other site activities.',
          'Maintain safety inspection reports, checklists, incident records, and other required documentation.',
          'Report accidents, near-misses, unsafe conditions, and safety violations to the appropriate management personnel.',
          'Assist in investigating workplace incidents and coordinating corrective and preventive actions.',
          'Coordinate with Site Engineers, Project Managers, contractors, subcontractors, and workers regarding safety requirements.',
          'Monitor emergency preparedness, evacuation procedures, first-aid arrangements, and emergency response systems.',
          'Ensure safety signage, barricading, access controls, and other required safety measures are maintained.',
          'Monitor housekeeping and safe storage of construction materials, tools, equipment, and hazardous substances.',
          'Conduct or assist with safety training and induction programmes for new workers and site personnel.',
          'Maintain records of safety training, inspections, PPE distribution, permits, and compliance activities.',
          'Support internal safety audits and inspections and assist in closing identified safety observations.',
          'Promote a strong safety culture and encourage workers to report hazards and unsafe practices.',
          'Provide regular safety performance updates and reports to the Project Manager and senior management.',
          'Follow company policies, project procedures, applicable occupational safety requirements, and relevant construction regulations.'
        ]
      },
      {
        title: 'Site Supervisor',
        code: 'GGIPL-CON-SS-006',
        level: 'L9',
        salary: '₹29,000–₹35,000',
        vacancies: 450,
        fee: 160,
        qualification: '10th / 12th Pass or Diploma in Civil Engineering, Construction, Building Technology, or a related field preferred. Basic knowledge of construction activities, site operations, materials, measurements, and work procedures. Ability to read and understand basic construction drawings and site instructions. Relevant Construction / Civil Engineering professional certificate such as CETC may be preferred.',
        experience: 'in supervising workers, coordinating site activities, and monitoring daily work progress preferred.',
        extraDocuments: [
          'CETC Certificate or relevant Construction / Civil Engineering certificate'
        ],
        duties: [
          'Supervise day-to-day construction activities at the assigned project site.',
          'Coordinate and monitor workers, contractors, subcontractors, and site staff.',
          'Ensure work is carried out according to project plans, drawings, schedules, and site instructions.',
          'Monitor daily manpower, material usage, equipment, and work requirements.',
          'Check the quality and progress of construction work at the site.',
          'Assist engineers and Project Managers in implementing project plans and work schedules.',
          'Conduct regular site inspections and report construction issues or delays.',
          'Ensure proper use and handling of construction materials, tools, and equipment.',
          'Monitor measurements and quantities of completed work as directed by the engineering team.',
          'Coordinate material requirements with site and procurement teams.',
          'Maintain daily work reports, attendance records, material records, and site documentation.',
          'Ensure workers follow applicable site safety procedures and company policies.',
          'Identify unsafe conditions, quality issues, or site-level problems and report them to the concerned supervisor or engineer.',
          'Coordinate with Civil Engineers, Site Engineers, contractors, and other project personnel.',
          'Assist in resolving routine site-level operational and construction issues.',
          'Monitor housekeeping, cleanliness, and proper organisation of the work area.',
          'Support inspections, testing, rectification, and completion of assigned works.',
          'Provide regular updates on manpower, work progress, materials, and site issues.',
          'Assist with project completion, handover, and required site documentation.',
          'Follow company policies, project procedures, quality standards, and applicable construction requirements.'
        ]
      }
    ]
  },

  {
    id: 'infrastructure',
    division: 'Infrastructure',
    brandName: 'Global Growth Infrastructure',
    status: 'active',
    certificate: 'MIRTC',
    roles: [
      {
        title: 'Infrastructure Director',
        code: 'GGIPL-INF-ID-001',
        level: 'L3',
        salary: '₹70,000–₹1,50,000+',
        vacancies: 350,
        fee: 150,
        qualification: 'Bachelor’s Degree in Civil Engineering, Infrastructure Engineering, Construction Management, Architecture, Project Management, or a related field preferred. Master’s Degree in Infrastructure Management, Construction Management, Project Management, Engineering, or a related discipline may be preferred for senior-level responsibilities. Relevant Infrastructure / Construction professional certification such as MIRTC may be preferred. Strong knowledge of infrastructure planning, project execution, construction management, budgeting, quality control, safety, and resource management preferred.',
        experience: 'in strategic planning, project budgeting, risk management, and operational leadership preferred.',
        extraDocuments: [
          'MIRTC Certificate or relevant Infrastructure / Construction / Engineering certificate',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Develop and lead the organisation’s overall infrastructure strategy and development plans.',
          'Plan, manage, and oversee infrastructure projects from initiation through completion.',
          'Establish project objectives, execution strategies, timelines, milestones, and performance targets.',
          'Coordinate with Project Managers, Civil Engineers, consultants, contractors, government authorities, vendors, and other stakeholders.',
          'Monitor project progress, quality, cost, safety, resource utilisation, and delivery schedules.',
          'Oversee infrastructure planning, construction, development, maintenance, and improvement activities.',
          'Review project proposals, technical reports, drawings, estimates, budgets, and implementation plans.',
          'Manage project budgets, procurement activities, contracts, resources, and cost-control measures.',
          'Identify infrastructure-related risks, delays, technical challenges, and operational issues and coordinate appropriate corrective actions.',
          'Establish and monitor quality-control standards and project performance requirements.',
          'Ensure infrastructure activities comply with applicable safety, environmental, technical, contractual, and regulatory requirements.',
          'Lead and guide multidisciplinary engineering, construction, operations, and support teams.',
          'Monitor contractor, consultant, supplier, and service-provider performance.',
          'Conduct periodic project review meetings and evaluate project performance against approved objectives.',
          'Review project reports, financial information, progress statements, technical documentation, and compliance records.',
          'Support feasibility studies, infrastructure planning, budgeting, and long-term development initiatives.',
          'Identify opportunities for improving project efficiency, cost effectiveness, quality, productivity, and sustainability.',
          'Coordinate inspections, testing, commissioning, handover, maintenance, and project close-out activities.',
          'Prepare infrastructure performance reports, management presentations, budgets, and strategic recommendations.',
          'Maintain appropriate project records, approvals, contracts, correspondence, and technical documentation.',
          'Support business continuity, emergency planning, infrastructure risk management, and contingency planning.',
          'Provide strategic advice to senior management regarding infrastructure investments, project priorities, and operational requirements.',
          'Promote continuous improvement, innovation, safety, quality, and sustainable infrastructure development.'
        ]
      },
      {
        title: 'Project Director',
        code: 'GGIPL-INF-PD-002',
        level: 'L4',
        salary: '₹60,000–₹1,50,000',
        vacancies: 350,
        fee: 150,
        qualification: 'Bachelor’s Degree in Civil Engineering, Construction Management, Infrastructure Management, Project Management, Architecture, or a related field preferred. Master’s Degree in Project Management, Construction Management, Engineering, Infrastructure, or a related discipline may be preferred for senior-level responsibilities. Relevant Infrastructure / Construction professional certification such as MIRTC may be preferred. Strong knowledge of project planning, construction execution, budgeting, contract management, quality control, safety, and resource management preferred.',
        experience: 'in project planning, budgeting, risk management, contract administration, and strategic decision-making preferred.',
        extraDocuments: [
          'MIRTC Certificate or relevant Infrastructure / Construction / Project Management certificate',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Direct and oversee major projects from planning and initiation through execution and completion.',
          'Establish project objectives, scope, milestones, schedules, budgets, and execution strategies.',
          'Lead Project Managers, engineers, consultants, contractors, site teams, and other project personnel.',
          'Coordinate with senior management and stakeholders to ensure project objectives are aligned with organisational goals.',
          'Monitor project progress, timelines, budgets, quality, safety, resources, and overall performance.',
          'Review project plans, technical documents, drawings, estimates, contracts, schedules, and progress reports.',
          'Oversee project budgets, procurement, resource allocation, cost control, and financial performance.',
          'Identify project risks, delays, technical challenges, contractual issues, and operational bottlenecks.',
          'Develop and implement appropriate risk-mitigation and corrective-action strategies.',
          'Monitor contractor, consultant, supplier, and subcontractor performance.',
          'Conduct regular project review meetings and evaluate performance against approved targets.',
          'Ensure project activities comply with applicable quality, safety, environmental, contractual, and regulatory requirements.',
          'Coordinate with engineering, procurement, finance, legal, operations, and other departments as required.',
          'Review project variations, change orders, additional works, claims, and their potential financial or schedule impact.',
          'Oversee quality-control processes, inspections, testing, commissioning, and project deliverables.',
          'Maintain effective project governance, documentation, reporting, approvals, and communication processes.',
          'Prepare project performance reports, management presentations, forecasts, and strategic recommendations.',
          'Ensure timely resolution of critical project issues and escalate major risks to senior management.',
          'Support project handover, completion, final documentation, and close-out activities.',
          'Identify opportunities for improving project efficiency, productivity, cost effectiveness, quality, and sustainability.',
          'Promote effective safety practices, professional standards, teamwork, and continuous improvement.',
          'Provide strategic leadership and regular updates to senior management regarding project status, major risks, financial performance, and expected outcomes.'
        ]
      },
      {
        title: 'Project Manager',
        code: 'GGIPL-INF-PM-003',
        level: 'L5',
        salary: '₹45,000–₹1,00,000',
        vacancies: 350,
        fee: 150,
        qualification: 'Bachelor’s Degree / Diploma in Civil Engineering, Construction Management, Infrastructure Management, Project Management, Architecture, or a related field preferred. Relevant Project Management / Construction professional certification such as MIRTC may be preferred. Good knowledge of project planning, construction execution, scheduling, budgeting, quality control, safety, and resource management. Knowledge of project documentation, contractor coordination, procurement, and cost monitoring preferred.',
        experience: 'in managing project teams, contractors, consultants, schedules, budgets, and site activities preferred.',
        extraDocuments: [
          'MIRTC Certificate or relevant Infrastructure / Construction / Project Management certificate',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Plan, manage, and coordinate infrastructure and construction projects from initiation through completion.',
          'Develop project schedules, milestones, work plans, execution strategies, and project timelines.',
          'Coordinate with Project Directors, engineers, site teams, contractors, consultants, suppliers, and other stakeholders.',
          'Monitor project progress, productivity, timelines, deliverables, quality, and overall performance.',
          'Manage project resources including manpower, materials, equipment, contractors, and site requirements.',
          'Monitor project budgets, costs, procurement, expenditure, and resource utilisation.',
          'Review project drawings, specifications, estimates, schedules, reports, and other technical documentation.',
          'Identify project risks, delays, technical issues, and operational bottlenecks and coordinate corrective actions.',
          'Monitor contractor and subcontractor performance and ensure work is completed according to approved requirements.',
          'Ensure project activities comply with applicable quality, safety, environmental, contractual, and regulatory requirements.',
          'Conduct regular project review meetings and coordinate with relevant departments to resolve project issues.',
          'Review measurements, progress reports, work completion records, invoices, and project documentation as applicable.',
          'Coordinate procurement and ensure timely availability of required materials, equipment, and resources.',
          'Monitor project variations, additional works, change orders, and their impact on project cost and schedule.',
          'Maintain proper project records, approvals, correspondence, contracts, reports, and documentation.',
          'Prepare regular project progress reports, cost reports, forecasts, and management updates.',
          'Coordinate inspections, testing, commissioning, handover, and project close-out activities.',
          'Support risk management, quality improvement, cost optimisation, and productivity enhancement initiatives.',
          'Ensure effective communication between management, engineering teams, contractors, and site personnel.',
          'Provide regular updates to the Project Director and senior management regarding project status, major risks, delays, and performance.',
          'Follow company policies, project procedures, applicable construction standards, contractual requirements, and regulatory guidelines.',
          'Promote safe, efficient, timely, and quality-focused project execution.'
        ]
      },
      {
        title: 'Planning Engineer',
        code: 'GGIPL-INF-PE-004',
        level: 'L8',
        salary: '₹30,000–₹60,000',
        vacancies: 350,
        fee: 150,
        qualification: 'Bachelor’s Degree / Diploma in Civil Engineering, Construction Management, Project Management, Infrastructure, or a related field preferred. Knowledge of project planning, scheduling, construction activities, resource planning, progress monitoring, and project documentation. Good understanding of construction drawings, work breakdown structures, project milestones, cost monitoring, and scheduling techniques. Relevant Infrastructure / Construction / Project Management professional certification such as MIRTC may be preferred.',
        experience: 'in preparing project schedules, monitoring progress, coordinating with site teams, and preparing planning reports preferred.',
        extraDocuments: [
          'MIRTC Certificate or relevant Infrastructure / Construction / Project Management certificate',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Develop and maintain detailed project schedules, work plans, milestones, and execution programmes.',
          'Coordinate with Project Managers, Project Directors, Civil Engineers, Site Engineers, contractors, consultants, and other project teams.',
          'Prepare project work breakdown structures and establish activity sequences and timelines.',
          'Monitor actual project progress against approved schedules and identify delays or deviations.',
          'Collect progress information from site teams and prepare regular planning and progress reports.',
          'Track manpower, materials, equipment, and other resources required for project execution.',
          'Assist in project resource planning and allocation to support timely completion.',
          'Identify critical activities, schedule constraints, risks, and potential project delays.',
          'Coordinate with relevant teams to develop recovery plans and corrective actions for delayed activities.',
          'Review construction drawings, specifications, work programmes, and project requirements for planning purposes.',
          'Monitor project milestones, deliverables, dependencies, and key performance indicators.',
          'Assist in preparing short-term, weekly, monthly, and long-term project schedules.',
          'Maintain project planning records, baseline schedules, progress updates, forecasts, and related documentation.',
          'Coordinate with procurement teams regarding material schedules and required delivery timelines.',
          'Monitor contractor and subcontractor progress against agreed work programmes.',
          'Assist in analysing project productivity, delays, variations, and schedule impacts.',
          'Prepare progress presentations, dashboards, forecasts, and management reports as required.',
          'Coordinate project review meetings and communicate schedule-related issues to management.',
          'Support project cost and resource monitoring by providing accurate planning and progress information.',
          'Assist in project completion planning, handover schedules, and project close-out activities.',
          'Identify opportunities to improve project scheduling, resource utilisation, productivity, and timely delivery.',
          'Ensure planning activities follow company policies, project procedures, contractual requirements, and applicable construction standards.'
        ]
      },
      {
        title: 'Civil / Structural Engineer',
        code: 'GGIPL-INF-CSE-005',
        level: 'L8',
        salary: '₹25,000–₹60,000',
        vacancies: 350,
        fee: 150,
        qualification: 'Bachelor’s Degree / Diploma in Civil Engineering, Structural Engineering, Construction Engineering, Infrastructure, or a related field preferred. Knowledge of structural analysis, design principles, construction methods, engineering drawings, specifications, and site execution. Good understanding of reinforced concrete, steel structures, foundations, structural detailing, measurements, and construction materials. Knowledge of relevant engineering standards, quality requirements, and construction safety practices preferred. Relevant Infrastructure / Construction / Engineering professional certification such as MIRTC may be preferred.',
        experience: 'in structural inspection, engineering calculations, drawing review, site coordination, and construction supervision preferred.',
        extraDocuments: [
          'MIRTC Certificate or relevant Infrastructure',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Prepare, review, and coordinate civil and structural engineering drawings, designs, specifications, and technical documents.',
          'Conduct structural assessments, site inspections, measurements, and technical evaluations as required.',
          'Coordinate with Project Managers, Planning Engineers, Site Engineers, contractors, consultants, architects, and other technical teams.',
          'Monitor civil and structural construction activities to ensure compliance with approved drawings and specifications.',
          'Review structural details, reinforcement drawings, foundation layouts, steel structures, and related engineering documents.',
          'Assist in structural calculations, design reviews, quantity assessments, and technical documentation.',
          'Monitor construction quality, workmanship, materials, and engineering practices at project sites.',
          'Identify structural, civil, technical, or construction-related issues and coordinate appropriate corrective actions.',
          'Verify dimensio ns, levels, quantities, measurements, and completed works as applicable.',
          'Coordinate with site teams to resolve technical queries and construction-related engineering issues.',
          'Monitor the use and quality of construction materials and ensure they meet approved project requirements.',
          'Review contractor and subcontractor work and provide technical guidance where required.',
          'Assist in preparing technical reports, inspection reports, progress reports, and engineering documentation.',
          'Coordinate inspections, testing, approvals, rectification, and completion of civil and structural works.',
          'Ensure engineering activities follow applicable quality, safety, environmental, and construction requirements.',
          'Support project planning, estimation, resource requirements, and technical coordination.',
          'Monitor structural and civil work progress against approved project schedules.',
          'Maintain proper engineering records, drawings, revisions, calculations, approvals, and site documentation.',
          'Assist in resolving design changes, variations, site conditions, and technical challenges.',
          'Support project handover, as-built documentation, testing, completion, and close-out activities.',
          'Provide regular technical updates and recommendations to the Project Manager and senior management.',
          'Promote quality, safety, efficiency, and continuous improvement in civil and structural engineering activities.'
        ]
      },
      {
        title: 'Site Supervisor',
        code: 'GGIPL-INF-SS-006',
        level: 'L9',
        salary: '₹27,000–₹35,000',
        vacancies: 350,
        fee: 150,
        qualification: '10th / 12th Pass or Diploma in Civil Engineering, Construction, Infrastructure, Building Technology, or a related field preferred. Basic knowledge of construction activities, site operations, materials, measurements, and work procedures. Ability to understand basic construction drawings, work schedules, site instructions, and safety requirements. Relevant Infrastructure / Construction professional certification such as MIRTC may be preferred.',
        experience: 'in supervising workers, coordinating site activities, monitoring work progress, and maintaining site records preferred.',
        extraDocuments: [
          'MIRTC Certificate or relevant Infrastructure'
        ],
        duties: [
          'Supervise day-to-day infrastructure and construction activities at the assigned project site.',
          'Coordinate and monitor workers, contractors, subcontractors, and site personnel.',
          'Ensure work is carried out according to approved project plans, drawings, schedules, and site instructions.',
          'Monitor daily manpower, materials, equipment, tools, and other site requirements.',
          'Check the quality, progress, and workmanship of ongoing construction activities.',
          'Assist Project Managers, Engineers, and Site Engineers in implementing project plans and schedules.',
          'Conduct regular site inspections and report delays, defects, technical issues, or other site-related problems.',
          'Monitor the proper use, handling, and storage of construction materials and equipment.',
          'Check measurements and quantities of completed work as directed by the engineering team.',
          'Coordinate material requirements with the site, procurement, and project teams.',
          'Maintain daily work reports, attendance records, material records, inspection records, and other site documentation.',
          'Ensure workers follow applicable site safety procedures, PPE requirements, and company policies.',
          'Identify unsafe conditions and report safety or quality concerns to the concerned Engineer or Project Manager.',
          'Coordinate with Civil Engineers, Site Engineers, Planning Engineers, contractors, and other project personnel.',
          'Assist in resolving routine site-level construction and operational issues.',
          'Monitor site housekeeping, cleanliness, access, and proper organisation of work areas.',
          'Support inspections, testing, rectification, and completion of assigned works.',
          'Provide regular updates regarding manpower, work progress, material requirements, quality, safety, and site issues.',
          'Assist with project completion, handover, and required site documentation.',
          'Follow company policies, project procedures, quality standards, safety requirements, and applicable infrastructure regulations.',
          'Support efficient, safe, timely, and quality-focused project execution.'
        ]
      }
    ]
  },

  {
    id: 'energy',
    division: 'Energy',
    brandName: 'Global Growth Energy',
    status: 'active',
    certificate: 'EETC',
    roles: [
      {
        title: 'Energy Business Head',
        code: 'GGIPL-ENE-BH-001',
        level: 'L3',
        salary: '₹70,000–₹1,50,000+',
        vacancies: 350,
        fee: 150,
        qualification: 'Bachelor’s Degree in Electrical Engineering, Mechanical Engineering, Energy Engineering, Power Engineering, Renewable Energy, Business Management, or a related field preferred. Master’s Degree in Energy Management, Engineering, Business Administration, Renewable Energy, or a related discipline may be preferred for senior-level responsibilities. Relevant Energy / Electrical / Technical professional certification such as EETC may be preferred. Strong knowledge of energy-sector operations, business development, project management, resource planning, financial management, and regulatory requirements preferred.',
        experience: 'managing large projects, clients, vendors, business partners, and cross-functional teams preferred.',
        extraDocuments: [
          'EETC Certificate or relevant Energy / Electrical / Technical professional certificate',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Develop and lead the organisation’s overall energy business strategy and growth plans.',
          'Identify new business opportunities across energy, power, electrical, renewable energy, and related sectors.',
          'Establish business objectives, revenue targets, operational plans, and strategic priorities.',
          'Lead business development, client acquisition, partnerships, proposals, and commercial initiatives.',
          'Manage and guide business, technical, project, operations, and support teams.',
          'Build and maintain strong relationships with clients, contractors, suppliers, consultants, investors, and business partners.',
          'Oversee energy-related projects from planning and development through execution and completion.',
          'Monitor project schedules, budgets, resources, quality, safety, and overall business performance.',
          'Prepare and manage annual business plans, budgets, forecasts, performance targets, and growth strategies.',
          'Monitor revenue, profitability, operating costs, project performance, and key business indicators.',
          'Identify market trends, emerging technologies, customer requirements, and potential areas for business expansion.',
          'Evaluate commercial proposals, tenders, contracts, partnerships, and strategic business opportunities.',
          'Coordinate with engineering and technical teams regarding project feasibility, execution, quality, and performance.',
          'Ensure business operations comply with applicable company policies, contractual requirements, safety standards, and relevant energy-sector regulations.',
          'Monitor vendor, contractor, consultant, and service-provider performance.',
          'Identify business, operational, financial, technical, and project-related risks and coordinate appropriate mitigation measures.',
          'Lead negotiations with clients, vendors, contractors, and strategic partners as required.',
          'Review business reports, project reports, financial statements, performance dashboards, and management information.',
          'Conduct regular business and project review meetings and implement corrective actions where required.',
          'Promote operational efficiency, cost optimisation, innovation, sustainability, and continuous business improvement.',
          'Support digital transformation and adoption of suitable technologies within energy operations.',
          'Prepare regular management reports, business presentations, forecasts, and strategic recommendations.',
          'Provide strategic leadership and regular updates to senior management regarding business performance, opportunities, risks, and growth initiatives.'
        ]
      },
      {
        title: 'Energy Project Manager',
        code: 'GGIPL-ENE-PM-002',
        level: 'L5',
        salary: '₹45,000–₹1,00,000',
        vacancies: 350,
        fee: 150,
        qualification: 'Bachelor’s Degree / Diploma in Electrical Engineering, Mechanical Engineering, Energy Engineering, Power Engineering, Renewable Energy, Project Management, or a related field preferred. Master’s Degree in Energy Management, Engineering, Renewable Energy, Project Management, or a related discipline may be preferred for senior-level responsibilities. Relevant Energy / Electrical / Technical professional certification such as EETC may be preferred. Good knowledge of energy projects, project planning, execution, scheduling, budgeting, quality control, safety, procurement, and resource management.',
        experience: 'managing energy projects, technical teams, contractors, consultants, suppliers, schedules, budgets, and project resources preferred.',
        extraDocuments: [
          'EETC Certificate or relevant Energy',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Plan, manage, and coordinate energy projects from initiation through execution and completion.',
          'Develop project schedules, milestones, work plans, execution strategies, and delivery timelines.',
          'Coordinate with Energy Business Heads, engineers, technical teams, contractors, consultants, suppliers, and other stakeholders.',
          'Monitor project progress, productivity, quality, safety, timelines, deliverables, and overall performance.',
          'Manage project resources including manpower, materials, equipment, technology, contractors, and site requirements.',
          'Monitor project budgets, costs, procurement, expenditure, and resource utilisation.',
          'Review technical specifications, project plans, drawings, estimates, schedules, proposals, and project documentation.',
          'Coordinate energy, electrical, power, renewable-energy, and related technical activities according to project requirements.',
          'Identify project risks, delays, technical issues, resource constraints, and operational bottlenecks and coordinate corrective actions.',
          'Monitor contractor, subcontractor, consultant, and vendor performance.',
          'Ensure project activities comply with applicable quality, safety, environmental, contractual, and regulatory requirements.',
          'Coordinate procurement activities and ensure timely availability of required equipment, materials, and resources.',
          'Monitor project variations, additional works, change requests, and their impact on project cost and schedule.',
          'Conduct regular project review meetings and coordinate with relevant departments to resolve project issues.',
          'Maintain project schedules, progress reports, cost records, approvals, correspondence, technical documents, and other project records.',
          'Prepare weekly, monthly, and periodic project performance reports for management.',
          'Monitor project milestones, key performance indicators, resource utilisation, and delivery targets.',
          'Coordinate inspections, testing, commissioning, handover, and project close-out activities.',
          'Support risk management, quality improvement, cost optimisation, productivity enhancement, and operational efficiency initiatives.',
          'Coordinate with finance, procurement, engineering, operations, and other departments as required.',
          'Identify opportunities for improving project execution, energy efficiency, sustainability, and cost effectiveness.',
          'Ensure effective communication between management, technical teams, contractors, vendors, and project stakeholders.',
          'Provide regular updates to the Energy Business Head and senior management regarding project status, risks, delays, financial performance, and expected outcomes.',
          'Follow company policies, project procedures, applicable technical standards, safety requirements, contractual conditions, and relevant energy-sector regulations.',
          'Promote safe, efficient, timely, sustainable, and quality-focused execution of energy projects.'
        ]
      },
      {
        title: 'Energy Engineer',
        code: 'GGIPL-ENE-EE-003',
        level: 'L8',
        salary: '₹30,000–₹65,000',
        vacancies: 350,
        fee: 150,
        qualification: 'Bachelor’s Degree / Diploma in Electrical Engineering, Mechanical Engineering, Energy Engineering, Power Engineering, Renewable Energy, or a related field preferred. Knowledge of energy systems, power generation, electrical systems, renewable energy technologies, energy efficiency, and engineering principles. Good understanding of technical drawings, equipment specifications, project documentation, testing, maintenance, and site coordination. Relevant Energy / Electrical / Technical professional certification such as EETC may be preferred.',
        experience: 'in energy-system installation, testing, commissioning, maintenance, project execution, or technical operations preferred.',
        extraDocuments: [
          'EETC Certificate or relevant Energy / Electrical / Technical professional certificate',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Assist in planning, designing, implementing, and maintaining energy-related projects and systems.',
          'Coordinate with Energy Project Managers, engineers, technical teams, contractors, consultants, and site personnel.',
          'Review technical drawings, specifications, equipment requirements, project plans, and engineering documentation.',
          'Monitor installation, operation, testing, commissioning, and maintenance of energy and electrical systems.',
          'Conduct site inspections and identify technical, operational, safety, and performance-related issues.',
          'Assist in evaluating energy consumption, system efficiency, equipment performance, and operational requirements.',
          'Support implementation of energy-efficiency measures and suitable renewable-energy solutions.',
          'Monitor equipment, electrical systems, power systems, energy systems, and related infrastructure as applicable to the project.',
          'Coordinate with procurement teams regarding technical specifications and equipment/material requirements.',
          'Assist in reviewing technical quotations, equipment specifications, vendor documentation, and project requirements.',
          'Monitor contractor and vendor activities to ensure work is completed according to approved technical requirements.',
          'Conduct or coordinate testing, inspections, measurements, and commissioning activities as required.',
          'Maintain engineering records, inspection reports, test results, equipment details, drawings, and project documentation.',
          'Identify technical risks, equipment failures, performance issues, and operational problems and coordinate corrective actions.',
          'Assist in preparing technical reports, progress reports, energy-performance reports, and management updates.',
          'Support preventive maintenance, troubleshooting, equipment optimisation, and reliability improvement activities.',
          'Ensure engineering activities comply with applicable quality, safety, environmental, technical, and regulatory requirements.',
          'Coordinate with operations, maintenance, construction, procurement, finance, and other departments as required.',
          'Assist in monitoring project schedules, technical deliverables, resource requirements, and engineering milestones.',
          'Support project completion, testing, commissioning, handover, and close-out documentation.',
          'Identify opportunities to improve energy efficiency, system reliability, operational performance, cost effectiveness, and sustainability.',
          'Follow company policies, project procedures, technical standards, safety requirements, and applicable energy-sector regulations.',
          'Provide regular technical updates and recommendations to the Energy Project Manager and senior management.'
        ]
      },
      {
        title: 'Operations Engineer',
        code: 'GGIPL-ENE-OE-004',
        level: 'L8',
        salary: '₹25,000–₹50,000',
        vacancies: 350,
        fee: 150,
        qualification: 'Bachelor’s Degree / Diploma in Electrical Engineering, Mechanical Engineering, Energy Engineering, Power Engineering, Renewable Energy, or a related field preferred. Knowledge of energy operations, power systems, electrical equipment, plant operations, maintenance, and technical processes. Good understanding of operational procedures, equipment monitoring, troubleshooting, safety practices, and technical documentation. Relevant Energy / Electrical / Technical professional certification such as EETC may be preferred.',
        experience: 'in monitoring equipment, coordinating technical teams, troubleshooting operational issues, and maintaining operational records preferred.',
        extraDocuments: [
          'EETC Certificate or relevant Energy / Electrical / Technical professional certificate',
          'Relevant professional registration/licence, where applicable to the role'
        ],
        duties: [
          'Monitor and coordinate day-to-day operations of energy-related systems, facilities, and equipment.',
          'Ensure energy operations are carried out safely, efficiently, and according to approved operating procedures.',
          'Coordinate with Energy Engineers, Project Managers, technicians, maintenance teams, contractors, and other operational personnel.',
          'Monitor equipment performance, energy output, operational parameters, and system efficiency.',
          'Conduct regular operational inspections and identify technical or performance-related issues.',
          'Assist in troubleshooting equipment failures, operational problems, and system abnormalities.',
          'Coordinate preventive and corrective maintenance activities with engineering and maintenance teams.',
          'Monitor electrical systems, energy equipment, power systems, and related infrastructure as applicable to the project.',
          'Maintain daily operational logs, equipment records, inspection reports, maintenance records, and other required documentation.',
          'Monitor energy consumption, production, efficiency, and operational performance against established targets.',
          'Coordinate with procurement and technical teams regarding spare parts, equipment, materials, and operational requirements.',
          'Monitor contractor and vendor activities related to operations, maintenance, and technical services.',
          'Ensure proper implementation of operational safety procedures, PPE requirements, emergency procedures, and workplace safety practices.',
          'Identify operational risks, equipment defects, process inefficiencies, and potential safety hazards and report them to the concerned management.',
          'Support testing, commissioning, system start-up, shutdown, and operational handover activities as required.',
          'Assist in implementing energy-efficiency measures, process improvements, and operational optimisation initiatives.',
          'Prepare daily, weekly, and monthly operational performance reports for management.',
          'Analyse operational data and identify opportunities to improve reliability, productivity, efficiency, and cost effectiveness.',
          'Coordinate with engineering, maintenance, project, procurement, safety, and administrative departments as required.',
          'Support emergency response, business continuity, equipment recovery, and operational contingency procedures.',
          'Ensure operations follow applicable technical standards, quality requirements, environmental requirements, company policies, and safety regulations.',
          'Maintain proper records of operational incidents, corrective actions, inspections, maintenance activities, and system performance.',
          'Provide regular operational updates and recommendations to the Energy Project Manager and senior management.',
          'Promote safe, reliable, efficient, and continuous operation of energy-related systems and facilities.'
        ]
      },
      {
        title: 'Safety Officer',
        code: 'GGIPL-ENE-SO-006',
        level: 'L8',
        salary: '₹25,000–₹50,000',
        vacancies: 350,
        fee: 150,
        qualification: 'Minimum 10th / 12th Pass from a recognized board. Diploma / Certificate in Industrial Safety, Occupational Health & Safety, Electrical Safety, Fire & Safety, Energy Safety or a related field will be preferred. Basic knowledge of workplace safety procedures, hazard identification, risk assessment, PPE and emergency response. Relevant safety training/certification will be preferred.',
        experience: '1–5 years of relevant experience in safety, energy, electrical, industrial, construction, plant or infrastructure operations. Candidates with relevant safety qualification/training may be considered according to project requirements.',
        extraDocuments: [
          'EETC Certificate or relevant Electrical'
        ],
        duties: [
          'Conduct regular safety inspections of work areas, equipment and operational activities.',
          'Identify workplace hazards and recommend appropriate corrective measures.',
          'Assist in preparing and implementing site-specific safety procedures.',
          'Monitor compliance with safety rules, operational procedures and PPE requirements.',
          'Conduct toolbox talks and basic safety awareness sessions for employees and workers.',
          'Ensure employees use appropriate personal protective equipment.',
          'Assist in risk assessments and preparation of preventive safety measures.',
          'Monitor electrical, mechanical and energy-related work for safety compliance.',
          'Report unsafe conditions, incidents, near misses and potential hazards promptly.',
          'Assist with accident and incident investigations and maintain related records.',
          'Support emergency preparedness, evacuation procedures and emergency response activities.',
          'Check safety signage, barricading, access routes and emergency equipment.',
          'Coordinate with engineers, technicians, supervisors and contractors regarding safety matters.',
          'Maintain daily safety inspection reports, checklists and safety records.',
          'Assist in conducting safety audits and compliance inspections.',
          'Monitor housekeeping and ensure technical/work areas remain safe and organized.',
          'Support implementation of fire prevention and electrical safety procedures.',
          'Verify that maintenance and technical activities follow approved safety practices.',
          'Assist in safety induction and training for new employees, contractors and visitors.',
          'Track corrective actions and follow up until identified safety issues are resolved.',
          'Maintain records of safety training, inspections, incidents and corrective actions.',
          'Communicate significant safety risks and recommendations to senior management.',
          'Promote a strong safety culture and encourage employees to report unsafe conditions.',
          'Perform other safety-related duties assigned by the Safety Manager, Engineer or Department Management.'
        ]
      },
      {
        title: 'Technician',
        code: 'GGIPL-ENE-TN-005',
        level: 'L11',
        salary: '₹18,000–₹35,000',
        vacancies: 350,
        fee: 150,
        qualification: 'Minimum 10th / 12th Pass from a recognized board. ITI / Diploma in Electrical, Mechanical, Energy, Power, Electronics or a related technical field will be preferred. Basic knowledge of electrical/mechanical equipment, tools, maintenance procedures and workplace safety. Candidates with relevant technical training or industry certification may be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'EETC Certificate or relevant Electrical/Energy/Technical qualification certificate',
          'ITI/Diploma certificate, if applicable'
        ],
        duties: [
          'Perform routine technical and maintenance activities at assigned locations.',
          'Operate and monitor electrical, mechanical and energy-related equipment.',
          'Assist engineers and senior technical staff in installation and maintenance activities.',
          'Conduct regular inspection of machines, equipment, tools and systems.',
          'Identify technical faults and support troubleshooting activities.',
          'Carry out preventive and corrective maintenance as instructed.',
          'Maintain equipment, tools and technical work areas in proper condition.',
          'Follow approved operating procedures and technical instructions.',
          'Support installation, testing and commissioning of equipment.',
          'Check equipment performance and report abnormal conditions.',
          'Maintain daily maintenance logs, service records and operational reports.',
          'Assist in replacement, repair and servicing of electrical/mechanical components.',
          'Coordinate with engineers, supervisors, vendors and maintenance teams.',
          'Follow workplace safety procedures and use appropriate PPE.',
          'Immediately report equipment failures, hazards or unsafe conditions.',
          'Assist during emergency maintenance and breakdown situations.',
          'Maintain proper inventory and usage records of tools, spare parts and materials.',
          'Support energy-efficiency and equipment-performance improvement activities.',
          'Ensure technical work is carried out according to applicable standards and site procedures.',
          'Participate in inspections, testing and periodic maintenance schedules.',
          'Maintain proper housekeeping around technical and equipment areas.',
          'Prepare basic technical updates and communicate work status to supervisors.',
          'Support project teams during equipment installation, maintenance and handover activities.',
          'Perform other technical duties assigned by the Engineer, Supervisor or Department Management.'
        ]
      }
    ]
  },

  {
    id: 'renewable-energy',
    division: 'Renewable Energy',
    brandName: 'Global Growth Renewable Energy',
    status: 'active',
    certificate: 'SITC',
    roles: [
      {
        title: 'Renewable Energy Head',
        code: 'GGIPL-ENE-REH-007',
        level: 'L3',
        salary: '₹60,000–₹1,50,000+',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree in Renewable Energy, Electrical Engineering, Mechanical Engineering, Energy Engineering, Power Engineering, Environmental Engineering, Business Management or a related field. Master’s Degree in Renewable Energy, Energy Management, Engineering, Business Administration or a related discipline may be preferred. Strong knowledge of renewable energy systems, project development, operations, business planning and energy-sector practices. Knowledge of solar, wind, hybrid energy systems, energy efficiency and sustainability initiatives will be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'SITC Certificate or relevant Renewable Energy/Energy/Technical qualification certificate',
          'Degree/Diploma certificate, as applicable'
        ],
        duties: [
          'Lead the overall strategy and development of renewable energy business activities.',
          'Develop short-term and long-term business plans for renewable energy projects.',
          'Identify new opportunities in solar, wind, hybrid and other renewable energy sectors.',
          'Lead project development from initial planning through execution and commissioning.',
          'Set business, operational, project and performance objectives for the department.',
          'Manage project budgets, resources, timelines and overall operational performance.',
          'Coordinate with engineering, operations, finance, procurement and project teams.',
          'Develop and maintain relationships with clients, partners, vendors and contractors.',
          'Evaluate project feasibility, technical requirements, commercial opportunities and risks.',
          'Monitor renewable energy project progress, quality, cost and schedule performance.',
          'Oversee procurement, vendor selection, contracts and supply-chain coordination.',
          'Ensure projects and operations follow applicable technical, environmental and safety requirements.',
          'Review technical proposals, project reports, performance data and management dashboards.',
          'Identify operational risks and implement appropriate mitigation and corrective actions.',
          'Monitor energy generation, system performance, efficiency and project KPIs.',
          'Support business negotiations, tenders, proposals and strategic partnerships.',
          'Lead and mentor managers, engineers, technicians and other department personnel.',
          'Promote energy efficiency, sustainability and continuous operational improvement.',
          'Prepare periodic business, project and performance reports for senior management.',
          'Review market trends, emerging renewable technologies and industry developments.',
          'Coordinate inspections, testing, commissioning and project handover activities.',
          'Ensure proper documentation, project records and operational reporting are maintained.',
          'Resolve major technical, operational, commercial and project-related issues.',
          'Provide strategic recommendations to senior management regarding renewable energy growth.',
          'Perform other leadership and business responsibilities assigned by the management.'
        ]
      },
      {
        title: 'Solar Project Manager',
        code: 'GGIPL-ENE-SPM-008',
        level: 'L5',
        salary: '₹40,000–₹80,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree / Diploma in Electrical Engineering, Mechanical Engineering, Renewable Energy, Solar Energy, Energy Management, Civil Engineering, Project Management or a related field. Knowledge of solar PV systems, project planning, installation, commissioning, operations and maintenance. Familiarity with project scheduling, resource planning, quality control and site safety. Relevant renewable-energy or technical certification may be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'SITC Certificate or relevant Solar/Renewable Energy/Technical qualification certificate',
          'Degree/Diploma certificate, as applicable'
        ],
        duties: [
          'Plan and manage solar projects from initiation through completion and handover.',
          'Prepare project schedules, milestones, work plans and execution strategies.',
          'Coordinate solar PV installation, electrical works, civil works and associated activities.',
          'Monitor project progress against approved schedules and targets.',
          'Manage project manpower, equipment, materials and other resources.',
          'Coordinate with engineers, technicians, contractors, vendors and site teams.',
          'Review technical drawings, specifications, layouts and project documentation.',
          'Monitor installation of solar modules, mounting structures, inverters, cables and related equipment.',
          'Ensure work is performed according to approved technical specifications and quality requirements.',
          'Monitor project costs, procurement requirements and material availability.',
          'Identify project risks, delays and technical issues and implement corrective actions.',
          'Conduct regular site meetings and coordinate project activities among different teams.',
          'Monitor contractor and subcontractor performance and work quality.',
          'Ensure compliance with applicable safety procedures and site requirements.',
          'Coordinate inspections, testing and commissioning of solar systems.',
          'Maintain project records, progress reports, measurements and technical documentation.',
          'Track project KPIs, productivity, quality, schedule and resource utilization.',
          'Coordinate procurement and timely delivery of solar equipment and materials.',
          'Support resolution of technical issues during installation and commissioning.',
          'Prepare weekly and monthly project status reports for senior management.',
          'Coordinate final testing, documentation, completion and project handover.',
          'Identify opportunities to improve project efficiency, quality and cost performance.',
          'Ensure proper maintenance of project records and as-built documentation.',
          'Coordinate with relevant departments for successful project completion.',
          'Perform other project-management responsibilities assigned by senior management.'
        ]
      },
      {
        title: 'Solar Engineer',
        code: 'GGIPL-ENE-SE-009',
        level: 'L8',
        salary: '₹25,000–₹55,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree / Diploma in Electrical Engineering, Renewable Energy, Solar Energy, Mechanical Engineering, Energy Engineering or a related technical field. Basic to intermediate knowledge of Solar PV systems, electrical systems, solar modules, inverters, batteries and related equipment. Knowledge of solar system installation, testing, commissioning and maintenance. Ability to read and understand electrical drawings, technical specifications and project documentation. Relevant solar/renewable-energy technical certification may be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'SITC Certificate or relevant Solar/Renewable Energy/Technical qualification certificate',
          'Degree/Diploma certificate, as applicable'
        ],
        duties: [
          'Assist in the design, installation and implementation of solar PV systems.',
          'Review solar project drawings, layouts, specifications and technical documents.',
          'Supervise installation of solar modules, mounting structures and associated equipment.',
          'Coordinate installation of inverters, cables, batteries and electrical components.',
          'Conduct inspections of solar equipment and installation work.',
          'Perform testing and commissioning activities for solar PV systems.',
          'Monitor system performance and identify technical abnormalities.',
          'Diagnose and assist in resolving electrical and solar-system faults.',
          'Coordinate with technicians, project managers, contractors and vendors.',
          'Ensure installation work follows approved technical specifications and quality requirements.',
          'Support preventive and corrective maintenance of solar systems.',
          'Monitor solar generation, equipment performance and system efficiency.',
          'Prepare technical reports, inspection records and maintenance documentation.',
          'Assist in preparing material requirements and technical specifications.',
          'Verify equipment and materials received at project sites.',
          'Support site surveys, measurements and technical assessments.',
          'Ensure proper implementation of electrical and workplace safety procedures.',
          'Assist during troubleshooting, repair and replacement of defective components.',
          'Coordinate testing, inspection and final commissioning activities.',
          'Maintain project drawings, equipment records and technical documentation.',
          'Identify opportunities to improve solar-system efficiency and reliability.',
          'Provide technical updates and progress information to the Project Manager.',
          'Support project completion, documentation and system handover.',
          'Coordinate with operations and maintenance teams after project commissioning.',
          'Perform other engineering and technical responsibilities assigned by management.'
        ]
      },
      {
        title: 'Site Engineer',
        code: 'GGIPL-ENE-SE-010',
        level: 'L8',
        salary: '₹22,000–₹45,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree / Diploma in Civil Engineering, Electrical Engineering, Renewable Energy, Solar Energy, Mechanical Engineering, Energy Engineering or a related field. Basic knowledge of solar/renewable-energy project site operations and construction activities. Ability to understand technical drawings, layouts, specifications and site documentation. Knowledge of site measurements, material coordination, quality control and workplace safety. Relevant solar/renewable-energy technical certification may be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'SITC Certificate or relevant Solar/Renewable Energy/Technical qualification certificate',
          'Degree/Diploma certificate, as applicable'
        ],
        duties: [
          'Supervise day-to-day activities at assigned solar and renewable-energy project sites.',
          'Coordinate site execution activities according to approved project plans and schedules.',
          'Review and interpret technical drawings, layouts and project specifications.',
          'Coordinate with Project Managers, Solar Engineers, Technicians and contractors.',
          'Monitor installation of solar modules, mounting structures and related equipment.',
          'Coordinate civil, electrical and mechanical site activities as required.',
          'Monitor manpower, materials, tools and equipment required for site activities.',
          'Conduct regular site inspections and monitor work progress.',
          'Check measurements, levels, alignment and installation quality.',
          'Ensure work is performed according to approved drawings and technical requirements.',
          'Monitor quality of materials and workmanship at the project site.',
          'Identify site issues, delays and technical problems and report them promptly.',
          'Coordinate with vendors, subcontractors and service providers.',
          'Assist in material planning, requirements and site procurement coordination.',
          'Maintain daily site reports, measurements, work records and progress documentation.',
          'Ensure compliance with workplace safety procedures and appropriate PPE requirements.',
          'Support testing, inspection and commissioning of solar and associated systems.',
          'Coordinate corrective actions for identified quality or technical issues.',
          'Monitor project activities against approved schedules and completion targets.',
          'Assist engineers during site surveys, inspections and technical assessments.',
          'Maintain proper housekeeping and safe working conditions at the site.',
          'Support preparation of project completion and handover documentation.',
          'Coordinate with operations and maintenance teams after project completion.',
          'Provide regular progress updates to the Project Manager and Department Management.',
          'Perform other site-engineering responsibilities assigned by management.'
        ]
      },
      {
        title: 'O&M Engineer',
        code: 'GGIPL-ENE-OM-012',
        level: 'L8',
        salary: '₹25,000–₹50,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree / Diploma in Electrical Engineering, Mechanical Engineering, Renewable Energy, Solar Energy, Energy Engineering or a related technical field. Knowledge of solar PV systems, electrical equipment, power systems, maintenance procedures and renewable-energy operations. Understanding of preventive and corrective maintenance practices. Ability to read technical drawings, equipment manuals and maintenance documentation. Relevant solar/renewable-energy technical certification may be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'SITC Certificate or relevant Solar/Renewable Energy/Technical qualification certificate',
          'Degree/Diploma certificate, as applicable'
        ],
        duties: [
          'Manage day-to-day operation and maintenance activities of assigned solar/renewable-energy systems.',
          'Monitor solar PV plant and equipment performance on a regular basis.',
          'Conduct scheduled inspections of solar modules, inverters, transformers, cables and electrical systems.',
          'Plan and implement preventive maintenance activities.',
          'Coordinate corrective maintenance and breakdown-repair activities.',
          'Identify equipment faults and support technical troubleshooting.',
          'Monitor power generation, equipment performance and operational efficiency.',
          'Analyse operational data to identify performance deviations and recurring issues.',
          'Coordinate with technicians, engineers, vendors and maintenance contractors.',
          'Maintain daily operational logs, maintenance records and equipment history.',
          'Ensure maintenance activities are completed according to approved schedules.',
          'Coordinate availability of spare parts, tools, equipment and maintenance materials.',
          'Inspect equipment after repair and verify proper functioning.',
          'Support testing, commissioning and performance verification of equipment.',
          'Ensure compliance with electrical, operational and workplace safety procedures.',
          'Monitor preventive-maintenance schedules and ensure timely completion.',
          'Assist in root-cause analysis of recurring equipment failures.',
          'Prepare maintenance reports, breakdown reports and periodic performance reports.',
          'Coordinate emergency response during equipment breakdowns or operational incidents.',
          'Monitor contractor and service-provider performance during maintenance activities.',
          'Maintain proper technical documentation, checklists and inspection records.',
          'Support energy-efficiency and system-performance improvement initiatives.',
          'Coordinate with project and engineering teams regarding technical modifications or upgrades.',
          'Assist in maintaining equipment availability and minimizing avoidable downtime.',
          'Provide regular operational and maintenance updates to the Project Manager or Department Management.'
        ]
      },
      {
        title: 'Solar Technician',
        code: 'GGIPL-ENE-ST-011',
        level: 'L11',
        salary: '₹18,000–₹32,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Minimum 10th / 12th Pass from a recognized board. ITI / Diploma in Electrical, Solar Energy, Renewable Energy, Electronics, Mechanical or a related technical field will be preferred. Basic knowledge of solar PV systems, electrical wiring, solar modules, inverters, batteries and related equipment. Knowledge of installation, testing, troubleshooting and maintenance of solar systems. Relevant solar/renewable-energy technical training or certification may be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'SITC Certificate or relevant Solar/Renewable Energy/Technical qualification certificate',
          'ITI/Diploma certificate, if applicable'
        ],
        duties: [
          'Install and maintain solar PV modules and associated equipment.',
          'Assist engineers in solar-system installation and commissioning activities.',
          'Perform electrical wiring, connections and equipment installation as instructed.',
          'Install and check inverters, cables, batteries and related solar components.',
          'Conduct routine inspections of solar panels and electrical equipment.',
          'Identify technical faults and assist in troubleshooting solar systems.',
          'Perform preventive and corrective maintenance activities.',
          'Check solar-system connections, equipment condition and operational performance.',
          'Assist with testing and commissioning of newly installed solar systems.',
          'Follow approved technical drawings, installation procedures and site instructions.',
          'Maintain tools, equipment and technical work areas in proper condition.',
          'Coordinate with Solar Engineers, Site Engineers, Supervisors and Project Managers.',
          'Report equipment faults, damaged components and unsafe conditions promptly.',
          'Maintain daily installation, maintenance and service records.',
          'Assist in replacement and repair of defective solar and electrical components.',
          'Monitor basic system performance and report abnormal readings.',
          'Follow electrical safety procedures and use appropriate PPE during technical work.',
          'Assist during emergency breakdown and repair activities.',
          'Maintain proper housekeeping at solar project sites.',
          'Support site inspections, testing and quality checks.',
          'Verify availability and condition of required tools, spare parts and materials.',
          'Assist in preparing project completion and maintenance documentation.',
          'Support final inspection and handover of installed solar systems.',
          'Follow company procedures and applicable technical and safety requirements.',
          'Perform other technical duties assigned by the Engineer, Supervisor or Department Management.'
        ]
      }
    ]
  },

  {
    id: 'agriculture',
    division: 'Agriculture',
    brandName: 'Global Growth Agriculture',
    status: 'active',
    certificate: 'AITC',
    roles: [
      {
        title: 'Agriculture Business Head',
        code: 'GGIPL-AGR-BH-001',
        level: 'L3',
        salary: '₹50,000–₹1,20,000+',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree in Agriculture, Agricultural Business Management, Agribusiness, Horticulture, Agricultural Economics, Rural Management, Business Management or a related field. Master’s Degree in Agriculture, Agribusiness, Rural Management, MBA or a related discipline may be preferred. Strong understanding of agricultural operations, farm management, agri-business development, supply chains and market practices. Knowledge of agricultural products, procurement, distribution, sales and business development will be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'AITC Certificate or relevant Agriculture/Agribusiness qualification certificate',
          'Degree/Diploma certificate'
        ],
        duties: [
          'Lead the overall strategy and business operations of the Agriculture Division.',
          'Develop short-term and long-term agricultural business plans and growth strategies.',
          'Identify new opportunities in agriculture, agribusiness, horticulture and allied sectors.',
          'Develop business relationships with farmers, suppliers, buyers, distributors and strategic partners.',
          'Lead agricultural procurement, sourcing and supply-chain activities.',
          'Monitor business targets, revenue, costs and overall operational performance.',
          'Develop and implement strategies for agricultural product marketing and distribution.',
          'Manage department teams and provide leadership, guidance and performance direction.',
          'Coordinate agricultural projects from planning through implementation and completion.',
          'Evaluate market trends, agricultural demand, pricing and competitive opportunities.',
          'Develop partnerships and commercial opportunities with relevant stakeholders.',
          'Monitor vendor, supplier and service-provider performance.',
          'Support contract negotiations, commercial proposals and business agreements.',
          'Ensure agricultural activities follow applicable quality, safety and operational requirements.',
          'Identify business, operational and market risks and implement mitigation strategies.',
          'Monitor procurement costs, inventory, logistics and product movement.',
          'Review operational reports, sales performance and business-development data.',
          'Improve productivity, operational efficiency and cost effectiveness across agricultural activities.',
          'Coordinate with finance, operations, logistics, sales and other departments.',
          'Prepare periodic business-performance reports for senior management.',
          'Lead expansion initiatives and evaluate new agricultural markets and projects.',
          'Promote sustainable and efficient agricultural practices where applicable.',
          'Resolve major operational, commercial and stakeholder-related issues.',
          'Build and maintain long-term relationships with key business partners.',
          'Perform other strategic and managerial responsibilities assigned by senior management.'
        ]
      },
      {
        title: 'Agriculture Manager',
        code: 'GGIPL-AGR-AM-002',
        level: 'L6',
        salary: '₹30,000–₹60,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree / Diploma in Agriculture, Horticulture, Agribusiness, Agricultural Management, Agricultural Economics, Rural Management or a related field. Knowledge of agricultural operations, crop management, farm planning, procurement and agricultural supply chains. Basic understanding of modern farming practices, agricultural equipment and resource management. Relevant agriculture/agri-business training or certification may be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'AITC Certificate or relevant Agriculture',
          'Degree/Diploma certificate'
        ],
        duties: [
          'Manage day-to-day agricultural operations and assigned projects.',
          'Prepare farm and agricultural activity plans according to seasonal requirements.',
          'Coordinate crop production, cultivation and field-management activities.',
          'Supervise field staff, workers and agricultural teams.',
          'Monitor crop health, growth, irrigation and general field conditions.',
          'Coordinate procurement and availability of seeds, fertilizers, equipment and other inputs.',
          'Maintain records of agricultural activities, materials, production and resource usage.',
          'Monitor agricultural productivity, quality and operational targets.',
          'Coordinate with farmers, suppliers, vendors and other stakeholders.',
          'Assist in implementing modern and efficient agricultural practices.',
          'Monitor use of water, equipment, manpower and other agricultural resources.',
          'Identify operational issues affecting crop production and recommend corrective measures.',
          'Coordinate field inspections and maintain agricultural activity reports.',
          'Monitor agricultural equipment and arrange maintenance when required.',
          'Support quality control of agricultural products and harvested produce.',
          'Assist in procurement, storage and movement of agricultural products.',
          'Monitor costs, material consumption and operational expenses.',
          'Coordinate with logistics, finance, procurement and business-development teams.',
          'Maintain proper documentation relating to agricultural operations.',
          'Evaluate agricultural performance and recommend productivity improvements.',
          'Support sustainable and resource-efficient farming practices.',
          'Prepare periodic operational and performance reports for senior management.',
          'Ensure agricultural activities follow applicable safety and operational procedures.',
          'Assist in planning new agricultural projects and expansion activities.',
          'Perform other agricultural-management responsibilities assigned by senior management.'
        ]
      },
      {
        title: 'Agronomist',
        code: 'GGIPL-AGR-AG-004',
        level: 'L8',
        salary: '₹25,000–₹50,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree in Agronomy, Agriculture, Agricultural Science, Horticulture, Soil Science or a related field. Master’s Degree in Agronomy, Agriculture or a related specialization may be preferred. Good knowledge of crop production, soil management, irrigation, fertilizers, pest management and modern farming practices. Knowledge of agricultural data collection, field trials and crop-performance analysis will be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'AITC Certificate or relevant Agriculture',
          'Degree/Diploma certificate'
        ],
        duties: [
          'Develop and support crop production plans based on seasonal and field requirements.',
          'Conduct regular field visits and monitor crop growth and overall crop health.',
          'Assess soil conditions and recommend suitable soil-management practices.',
          'Advise on appropriate seeds, fertilizers, nutrients and other agricultural inputs.',
          'Monitor irrigation practices and recommend efficient water-management methods.',
          'Identify crop diseases, pest problems, nutrient deficiencies and other field issues.',
          'Recommend appropriate corrective and preventive agricultural practices.',
          'Conduct field observations, crop assessments and agricultural data collection.',
          'Support implementation of modern and sustainable farming techniques.',
          'Monitor crop productivity, quality and performance against established targets.',
          'Coordinate field trials, demonstrations and evaluation of agricultural practices.',
          'Maintain records of crop performance, field activities, inputs and observations.',
          'Analyse agricultural data and prepare crop-performance reports.',
          'Coordinate with Agriculture Officers, Managers, farmers and field teams.',
          'Assist in planning crop rotations and efficient land utilisation.',
          'Monitor the appropriate use of fertilizers, pesticides and other crop inputs.',
          'Promote safe and responsible agricultural-input practices.',
          'Support soil testing and interpretation of relevant soil-analysis results.',
          'Identify opportunities to improve crop yield, quality and resource efficiency.',
          'Assist in implementing sustainable agriculture and conservation practices.',
          'Provide technical guidance to field teams regarding crop-management activities.',
          'Monitor weather and seasonal conditions that may affect crop production.',
          'Prepare periodic agronomy reports and provide recommendations to management.',
          'Support agricultural projects, research activities and productivity-improvement programmes.',
          'Perform other agronomy-related responsibilities assigned by the Agriculture Manager or Department Management.'
        ]
      },
      {
        title: 'Agriculture Officer',
        code: 'GGIPL-AGR-AO-003',
        level: 'L8',
        salary: '₹22,000–₹40,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree / Diploma in Agriculture, Horticulture, Agribusiness, Agricultural Science, Agricultural Management or a related field. Basic knowledge of crop production, farm management, soil and water management and agricultural practices. Knowledge of agricultural inputs, field operations, crop monitoring and basic agricultural documentation. Relevant agriculture training or certification may be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'AITC Certificate or relevant Agriculture',
          'Degree/Diploma certificate'
        ],
        duties: [
          'Monitor day-to-day agricultural and field activities.',
          'Assist in implementing crop production and farm-management plans.',
          'Conduct regular field visits and monitor crop growth and health.',
          'Coordinate with farmers, field workers and agricultural teams.',
          'Monitor irrigation, soil conditions and general field requirements.',
          'Assist in planning the use of seeds, fertilizers and other agricultural inputs.',
          'Maintain records of crops, field activities, materials and resource usage.',
          'Identify crop-related problems and report them to the Agriculture Manager.',
          'Support implementation of appropriate crop-care and cultivation practices.',
          'Monitor agricultural productivity and quality at assigned locations.',
          'Assist with agricultural surveys, field inspections and data collection.',
          'Coordinate availability and proper use of agricultural tools and equipment.',
          'Monitor storage and handling of agricultural inputs and produce.',
          'Assist in maintaining quality standards for agricultural products.',
          'Prepare daily and periodic field activity reports.',
          'Coordinate with procurement and logistics teams for agricultural materials.',
          'Monitor manpower and agricultural activities according to approved schedules.',
          'Support sustainable and resource-efficient farming practices.',
          'Maintain proper documentation of agricultural operations and observations.',
          'Assist in identifying opportunities to improve productivity and operational efficiency.',
          'Report field-level risks, delays, crop issues and resource requirements.',
          'Coordinate with supervisors and management regarding agricultural activities.',
          'Ensure field activities follow applicable safety and operational procedures.',
          'Support agricultural projects, trials and new cultivation initiatives where assigned.',
          'Perform other agriculture-related responsibilities assigned by the Agriculture Manager or Department Management.'
        ]
      },
      {
        title: 'Farm Supervisor',
        code: 'GGIPL-AGR-FS-005',
        level: 'L9',
        salary: '₹18,000–₹30,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Minimum 10th / 12th Pass from a recognized board. Diploma / Certificate in Agriculture, Horticulture, Farm Management, Agricultural Operations or a related field will be preferred. Basic knowledge of crop cultivation, irrigation, farm equipment, agricultural inputs and field operations. Ability to supervise workers and maintain basic farm records. Relevant agriculture training or certification may be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'AITC Certificate or relevant Agriculture',
          'Diploma/Certificate'
        ],
        duties: [
          'Supervise day-to-day farm and field operations.',
          'Allocate work and coordinate with farm workers and field staff.',
          'Monitor crop cultivation activities according to the approved farming plan.',
          'Supervise land preparation, sowing, planting, irrigation and harvesting activities.',
          'Monitor crop growth, field conditions and general farm productivity.',
          'Coordinate the timely availability and use of seeds, fertilizers and other farm inputs.',
          'Monitor irrigation activities and ensure efficient use of water resources.',
          'Assist in identifying crop diseases, pests and other field-related problems.',
          'Report crop issues and operational problems to the Agriculture Manager or Officer.',
          'Supervise the proper use and maintenance of agricultural tools and equipment.',
          'Maintain daily records of manpower, field activities, materials and farm operations.',
          'Monitor the quality and handling of agricultural produce.',
          'Coordinate harvesting, sorting, storage and movement of farm produce.',
          'Ensure workers follow applicable safety procedures during farm activities.',
          'Monitor proper storage and handling of agricultural inputs and equipment.',
          'Assist Agriculture Officers and Agronomists during field inspections and assessments.',
          'Monitor daily productivity and progress against assigned operational targets.',
          'Maintain proper housekeeping and organized working conditions across farm areas.',
          'Report manpower, equipment, material and operational requirements to management.',
          'Assist in implementing modern and sustainable farming practices.',
          'Coordinate routine maintenance of farm equipment and facilities.',
          'Support seasonal crop planning and preparation activities.',
          'Prepare daily and periodic farm-operation reports.',
          'Assist during agricultural projects, demonstrations and productivity-improvement programmes.',
          'Perform other farm-supervision duties assigned by the Agriculture Manager or Department Management.'
        ]
      },
      {
        title: 'Field Executive',
        code: 'GGIPL-AGR-FE-006',
        level: 'L8',
        salary: '₹16,000–₹28,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Minimum 10th / 12th Pass from a recognized board. Diploma / Certificate in Agriculture, Horticulture, Farm Management, Agribusiness or a related field will be preferred. Basic knowledge of agricultural field activities, crop cultivation, farm operations and agricultural inputs. Good communication and field-coordination skills. Basic ability to maintain field records and prepare activity reports.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'AITC Certificate or relevant Agriculture',
          'Diploma/Certificate'
        ],
        duties: [
          'Conduct regular field visits to assigned agricultural locations.',
          'Coordinate day-to-day agricultural activities with farmers and field teams.',
          'Monitor crop cultivation, field conditions and agricultural operations.',
          'Collect field-level information, observations and agricultural data.',
          'Assist Agriculture Officers, Managers and Agronomists during field activities.',
          'Support implementation of approved crop-management and farming practices.',
          'Monitor the availability and usage of seeds, fertilizers and other agricultural inputs.',
          'Assist in identifying crop, irrigation, pest and field-related issues.',
          'Report field problems and operational requirements to the concerned supervisor.',
          'Maintain daily records of field visits, activities and observations.',
          'Coordinate with farmers, farm workers, suppliers and local field teams.',
          'Assist with agricultural surveys, inspections and data collection.',
          'Monitor progress of assigned agricultural activities against planned schedules.',
          'Support distribution and proper handling of agricultural materials.',
          'Assist in monitoring crop quality and agricultural produce.',
          'Coordinate harvesting, collection and movement activities where assigned.',
          'Support implementation of sustainable and resource-efficient farming practices.',
          'Maintain photographs, measurements, records and other project documentation where required.',
          'Communicate field requirements and updates to the Agriculture Manager.',
          'Assist with agricultural demonstrations, training activities and field programmes.',
          'Monitor basic farm equipment and report maintenance requirements.',
          'Support quality checks and field-level compliance with company procedures.',
          'Maintain professional relationships with farmers and other stakeholders.',
          'Prepare daily, weekly and periodic field activity reports.',
          'Perform other field-related responsibilities assigned by the Agriculture Manager or Department Management.'
        ]
      }
    ]
  },

  {
    id: 'food-beverages',
    division: 'Food & Beverages',
    brandName: 'Global Growth Food & Beverages',
    status: 'active',
    certificate: 'FITC',
    roles: [
      {
        title: 'F&B Director',
        code: 'GGIPL-FNB-FBD-001',
        level: 'L3',
        salary: '₹50,000–₹1,20,000+',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree in Hotel Management, Hospitality Management, Food & Beverage Management, Business Administration, Culinary Management or a related field. Master’s Degree in Hospitality Management, Hotel Administration, Business Administration or a related discipline may be preferred. Strong knowledge of food & beverage operations, hospitality management, service standards, budgeting and team leadership. Knowledge of food safety, hygiene, inventory management and customer-service standards will be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'FITC Certificate or relevant Food & Beverage',
          'Degree/Diploma certificate'
        ],
        duties: [
          'Lead the overall Food & Beverage operations and strategic direction of the department.',
          'Develop F&B business plans, operational strategies and growth objectives.',
          'Manage restaurants, catering, banquet, food-service and related F&B operations.',
          'Set operational, service-quality, revenue and customer-satisfaction targets.',
          'Lead, train and develop F&B managers, supervisors and operational teams.',
          'Monitor departmental revenue, costs, profitability and financial performance.',
          'Prepare and manage F&B budgets, forecasts and operational expenditure.',
          'Develop menus, service standards and operational procedures in coordination with relevant teams.',
          'Ensure consistent food quality, presentation and customer-service standards.',
          'Monitor food procurement, inventory, storage and consumption.',
          'Coordinate with suppliers, vendors and procurement teams to maintain efficient supply.',
          'Ensure appropriate food hygiene, sanitation and safety practices are implemented.',
          'Monitor compliance with applicable food-safety and operational requirements.',
          'Analyse customer feedback and implement service and operational improvements.',
          'Develop strategies to improve revenue, productivity and cost efficiency.',
          'Review outlet performance, sales reports, inventory levels and operational KPIs.',
          'Coordinate with finance, procurement, HR, kitchen and operations departments.',
          'Manage vendor relationships, commercial negotiations and service contracts where applicable.',
          'Identify operational risks and implement appropriate corrective and preventive measures.',
          'Conduct regular management reviews and performance meetings with F&B teams.',
          'Support new outlet openings, F&B projects, events and business expansion initiatives.',
          'Ensure proper maintenance of F&B records, reports, SOPs and documentation.',
          'Handle major operational, customer-service and business-related issues.',
          'Prepare periodic performance reports and strategic recommendations for senior management.',
          'Perform other leadership and strategic responsibilities assigned by senior management.'
        ]
      },
      {
        title: 'Restaurant Manager',
        code: 'GGIPL-FNB-RM-002',
        level: 'L6',
        salary: '₹30,000–₹60,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree / Diploma in Hotel Management, Hospitality Management, Food & Beverage Management, Restaurant Management, Business Administration or a related field. Knowledge of restaurant operations, food & beverage service, customer service, inventory management and staff supervision. Basic understanding of food safety, hygiene, sanitation and operational procedures. Relevant hospitality or F&B training/certification may be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'FITC Certificate or relevant Food & Beverage',
          'Degree/Diploma certificate'
        ],
        duties: [
          'Manage day-to-day restaurant operations and service activities.',
          'Supervise restaurant staff, supervisors, service personnel and support teams.',
          'Prepare staff schedules and allocate duties according to operational requirements.',
          'Monitor food and beverage service quality and customer experience.',
          'Ensure proper implementation of restaurant SOPs and service standards.',
          'Monitor food quality, presentation, hygiene and service standards.',
          'Ensure compliance with applicable food-safety and sanitation requirements.',
          'Handle customer feedback, complaints and service-related issues professionally.',
          'Monitor restaurant sales, revenue and daily operational performance.',
          'Assist in preparing budgets, sales targets and cost-control plans.',
          'Monitor food inventory, stock levels and consumption.',
          'Coordinate with kitchen, procurement, suppliers and support departments.',
          'Monitor wastage and implement appropriate cost-control measures.',
          'Coordinate procurement and timely availability of food, beverages and operational supplies.',
          'Conduct regular inspections of dining, kitchen and service areas.',
          'Train and guide employees on customer service, hygiene and operational procedures.',
          'Monitor employee performance and support staff development.',
          'Maintain daily sales, inventory, attendance and operational records.',
          'Coordinate restaurant maintenance and report equipment or facility issues.',
          'Ensure proper cash-handling and billing procedures are followed where applicable.',
          'Review customer feedback and recommend improvements to restaurant operations.',
          'Support promotional activities, events and business-development initiatives.',
          'Prepare daily, weekly and monthly restaurant performance reports.',
          'Coordinate with senior management regarding operational issues and improvement plans.',
          'Perform other restaurant-management responsibilities assigned by senior management.'
        ]
      },
      {
        title: 'Food Production Manager',
        code: 'GGIPL-FNB-FPM-003',
        level: 'L6',
        salary: '₹30,000–₹60,000',
        vacancies: 250,
        fee: 130,
        qualification: 'Bachelor’s Degree / Diploma in Hotel Management, Food Production, Culinary Arts, Food Technology, Hospitality Management or a related field. Knowledge of food production, kitchen operations, menu planning, food costing, inventory management and quality control. Understanding of food hygiene, sanitation, food safety and kitchen safety procedures. Culinary or hospitality training/certification may be preferred.',
        experience: 'certificate, if applicable.',
        extraDocuments: [
          'FITC Certificate or relevant Food Production',
          'Degree/Diploma certificate'
        ],
        duties: [
          'Manage daily food production and kitchen operations.',
          'Plan production schedules according to expected demand and service requirements.',
          'Supervise chefs, cooks, kitchen assistants and food-production staff.',
          'Coordinate preparation, cooking, portioning and presentation of food products.',
          'Ensure food quality and consistency are maintained according to established standards.',
          'Monitor recipes, portion sizes and production specifications.',
          'Coordinate with procurement teams for timely availability of ingredients and supplies.',
          'Monitor food inventory, stock levels and ingredient consumption.',
          'Implement appropriate food-cost and wastage-control measures.',
          'Conduct regular quality checks of raw materials and prepared food.',
          'Ensure proper storage, handling and rotation of food ingredients.',
          'Maintain high standards of kitchen hygiene, sanitation and cleanliness.',
          'Ensure employees follow applicable food-safety and kitchen-safety procedures.',
          'Prepare and maintain production records, stock reports and kitchen documentation.',
          'Coordinate with Restaurant Managers, F&B teams and other operational departments.',
          'Monitor kitchen equipment and report maintenance or repair requirements.',
          'Train and guide food-production staff on recipes, hygiene and operational procedures.',
          'Monitor staff performance, productivity and adherence to production schedules.',
          'Assist in menu planning, recipe standardisation and product development.',
          'Review food production costs and recommend efficiency improvements.',
          'Monitor customer feedback relating to food quality and implement corrective measures.',
          'Ensure proper handling of food waste and support waste-reduction initiatives.',
          'Conduct regular kitchen inspections and follow up on identified issues.',
          'Prepare daily, weekly and monthly food-production performance reports.',
          'Perform other food-production and operational responsibilities assigned by senior management.'
        ]
      },
      {
        title: 'Food Safety Executive',
        code: 'GGIPL-FNB-FSE-005',
        level: 'L8',
        salary: '₹25,000–₹45,000',
        vacancies: 250,
        fee: 130,
        qualification: '10th / 12th Pass from a recognized board. Diploma/Certificate in Food Safety, Food Technology, Hotel Management, Hospitality, Food Science, Nutrition or a related field will be preferred. Basic knowledge of food hygiene, sanitation, food handling and quality-control procedures. Knowledge of safe food storage, temperature control and contamination prevention. Relevant FITC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'FITC Certificate',
          'Relevant Food Safety / Food Technology / Hospitality qualification certificate, if applicable'
        ],
        duties: [
          'Monitor food-safety practices across kitchen and food-production areas.',
          'Conduct routine hygiene and sanitation inspections.',
          'Check proper handling, preparation and storage of food.',
          'Monitor food storage temperatures and applicable control procedures.',
          'Identify potential food-safety risks and recommend corrective actions.',
          'Check the quality and condition of raw materials.',
          'Monitor expiry dates and proper product labeling.',
          'Ensure appropriate segregation of raw and prepared food.',
          'Inspect kitchen equipment and food-contact surfaces for cleanliness.',
          'Maintain food-safety inspection records and checklists.',
          'Support implementation of hygiene and sanitation procedures.',
          'Conduct or assist with food-safety awareness sessions for staff.',
          'Monitor personal hygiene and appropriate protective practices among food handlers.',
          'Report food-safety violations or quality concerns to management.',
          'Assist in investigating food-quality complaints and incidents.',
          'Support internal quality and hygiene audits.',
          'Monitor cleaning and sanitation schedules.',
          'Check proper waste-handling and disposal practices.',
          'Coordinate with kitchen, procurement and operations teams regarding food-safety requirements.',
          'Assist in maintaining required food-safety documentation.',
          'Support corrective and preventive action procedures.',
          'Monitor compliance with applicable food-safety requirements.',
          'Assist during inspections by authorized personnel where applicable.',
          'Prepare periodic food-safety and quality reports.',
          'Promote a strong food-safety and hygiene culture within the workplace.'
        ]
      },
      {
        title: 'Service Executive',
        code: 'GGIPL-FNB-SE-006',
        level: 'L8',
        salary: '₹16,000–₹28,000',
        vacancies: 250,
        fee: 130,
        qualification: '10th / 12th Pass from a recognized board. Diploma/Certificate in Hotel Management, Hospitality, Food & Beverage Service, Catering or related field will be preferred. Basic knowledge of customer service, food & beverage service and hospitality operations. Good communication and interpersonal skills. Relevant FITC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'FITC Certificate',
          'Relevant Hotel Management / Hospitality / F&B qualification certificate, if applicable'
        ],
        duties: [
          'Provide professional and courteous service to customers.',
          'Attend to customer requirements and service requests.',
          'Assist customers with menu and product information.',
          'Take and communicate customer orders accurately.',
          'Coordinate with kitchen and food-production teams.',
          'Ensure timely delivery of food and beverages.',
          'Maintain cleanliness of service areas.',
          'Arrange tables, service stations and required service equipment.',
          'Follow established food and beverage service procedures.',
          'Check orders before serving customers.',
          'Handle customer queries and routine service concerns.',
          'Escalate customer complaints to the appropriate supervisor.',
          'Maintain professional communication with customers and colleagues.',
          'Support billing and order-related processes where assigned.',
          'Monitor availability of service items, cutlery and supplies.',
          'Maintain proper hygiene and personal grooming standards.',
          'Follow applicable food-safety and workplace-safety procedures.',
          'Assist with opening and closing service activities.',
          'Coordinate with other departments during busy service periods.',
          'Help maintain proper service standards and customer satisfaction.',
          'Support inventory checks of service-related items.',
          'Report damaged equipment or shortages to the supervisor.',
          'Maintain service records and checklists where required.',
          'Assist in special events, functions and hospitality activities.',
          'Perform other service-related duties assigned by the supervisor or management.'
        ]
      },
      {
        title: 'Chef',
        code: 'GGIPL-FNB-CHEF-004',
        level: 'L11',
        salary: '₹20,000–₹50,000',
        vacancies: 250,
        fee: 130,
        qualification: '10th / 12th Pass from a recognized board. Diploma/Certificate in Hotel Management, Culinary Arts, Food Production, Catering or related field will be preferred. Basic knowledge of food preparation, kitchen operations, hygiene and food safety. Ability to follow recipes, portion standards and kitchen procedures. Relevant FITC Certificate may be preferred as per the applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'FITC Certificate',
          'Relevant culinary/hotel-management qualification certificate, if applicable'
        ],
        duties: [
          'Prepare food according to approved recipes and quality standards.',
          'Manage daily kitchen and food-production activities.',
          'Maintain consistency in taste, presentation and portion sizes.',
          'Prepare ingredients required for daily operations.',
          'Monitor cooking times and food temperatures.',
          'Ensure proper food storage and handling.',
          'Maintain kitchen hygiene and cleanliness.',
          'Follow applicable food-safety and hygiene procedures.',
          'Check the quality and freshness of ingredients.',
          'Coordinate with kitchen assistants and other food-production staff.',
          'Minimize food wastage and control ingredient usage.',
          'Maintain proper portion control.',
          'Assist in menu preparation and new dish development where required.',
          'Maintain kitchen equipment and report technical issues.',
          'Follow daily preparation and production schedules.',
          'Ensure proper labeling and storage of prepared food.',
          'Maintain cleanliness of workstations, utensils and cooking equipment.',
          'Support inventory checking and communicate ingredient requirements.',
          'Coordinate with restaurant/service teams for timely food preparation.',
          'Handle customer-specific food requirements where applicable.',
          'Follow workplace safety procedures.',
          'Maintain required kitchen records and checklists.',
          'Support inspections and quality-control activities.',
          'Ensure timely completion of assigned kitchen duties.',
          'Maintain professional standards and teamwork within the kitchen.'
        ]
      }
    ]
  },

  {
    id: 'retail',
    division: 'Retail',
    brandName: 'Global Growth Retail',
    status: 'active',
    certificate: 'RITC',
    roles: [
      {
        title: 'Retail Business Head',
        code: 'GGIPL-RET-BH-001',
        level: 'L3',
        salary: '₹70,000–₹1,20,000+',
        vacancies: 250,
        fee: 105,
        qualification: 'Bachelor’s Degree in Retail Management, Business Administration, Marketing, Commerce, Management or a related field. Master’s Degree in Business Administration, Retail Management or a related field may be preferred. Strong knowledge of retail operations, sales management, customer service, inventory and business development. Knowledge of retail performance, budgeting, merchandising and team management. Relevant RIMC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'RIMC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Develop and implement overall retail business strategies.',
          'Lead retail operations across assigned locations or business units.',
          'Set and monitor sales and revenue targets.',
          'Develop plans for business growth and market expansion.',
          'Monitor store performance and operational efficiency.',
          'Manage retail teams and department-level leadership.',
          'Review sales, revenue and profitability reports.',
          'Develop customer acquisition and retention strategies.',
          'Monitor product availability and inventory levels.',
          'Coordinate with procurement and supply-chain teams.',
          'Review pricing, promotions and merchandising strategies.',
          'Identify new market and business opportunities.',
          'Build and maintain key business relationships.',
          'Monitor customer satisfaction and service standards.',
          'Analyse market trends and competitor activities.',
          'Prepare business forecasts, budgets and performance plans.',
          'Control operational costs and support profitability improvement.',
          'Establish performance indicators for retail teams.',
          'Conduct regular business and operational reviews.',
          'Ensure compliance with applicable company policies and procedures.',
          'Coordinate with finance, HR, marketing and operations departments.',
          'Resolve escalated operational and customer-service issues.',
          'Prepare management reports and business performance updates.',
          'Support expansion projects, new-store openings and business initiatives.',
          'Drive continuous improvement in retail operations and business performance.'
        ]
      },
      {
        title: 'Store Manager',
        code: 'GGIPL-RET-SM-002',
        level: 'L7',
        salary: '₹40,000–₹60,000',
        vacancies: 250,
        fee: 105,
        qualification: 'Bachelor’s Degree/Diploma in Retail Management, Business Administration, Commerce, Marketing, Management or a related field. Diploma/Certificate in Retail Operations or Store Management may be preferred. Good knowledge of store operations, inventory management, sales, customer service and staff supervision. Basic knowledge of billing, stock records, merchandising and retail reporting. Relevant RIMC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'RIMC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Manage daily operations of the assigned retail store.',
          'Supervise store staff and allocate daily responsibilities.',
          'Monitor sales performance and store targets.',
          'Maintain appropriate inventory and stock levels.',
          'Conduct regular stock verification and physical inventory checks.',
          'Monitor receiving, storage and movement of merchandise.',
          'Ensure proper product display and merchandising.',
          'Maintain accurate stock and store records.',
          'Coordinate with procurement and supply-chain teams.',
          'Monitor billing and point-of-sale activities where applicable.',
          'Handle customer queries and service-related concerns.',
          'Resolve routine customer complaints professionally.',
          'Monitor product availability and replenishment requirements.',
          'Reduce stock losses, damage and unnecessary wastage.',
          'Ensure proper housekeeping and cleanliness of the store.',
          'Monitor staff attendance, discipline and work performance.',
          'Train and guide store employees on operational procedures.',
          'Prepare daily, weekly and monthly store performance reports.',
          'Monitor store expenses and support cost-control activities.',
          'Ensure compliance with company policies and operational procedures.',
          'Coordinate with management regarding sales and operational issues.',
          'Monitor promotional activities and product campaigns.',
          'Support achievement of customer-service and sales objectives.',
          'Identify operational problems and implement corrective measures.',
          'Maintain smooth and efficient store operations.'
        ]
      },
      {
        title: 'Assistant Store Manager',
        code: 'GGIPL-RET-ASM-003',
        level: 'L7',
        salary: '₹35,000–₹39,000',
        vacancies: 250,
        fee: 105,
        qualification: 'Bachelor’s Degree/Diploma in Retail Management, Business Administration, Commerce, Marketing, Management or a related field. Diploma/Certificate in Retail Operations or Store Management may be preferred. Basic knowledge of retail operations, inventory management, sales and customer service. Good communication, coordination and team-management skills. Relevant RIMC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'RIMC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Assist the Store Manager in managing daily store operations.',
          'Supervise staff and allocate daily work responsibilities.',
          'Support achievement of store sales targets.',
          'Monitor stock availability and inventory levels.',
          'Assist with physical stock verification.',
          'Monitor receiving and storage of merchandise.',
          'Ensure proper product arrangement and display.',
          'Maintain accurate stock and operational records.',
          'Monitor billing and point-of-sale activities where applicable.',
          'Assist with customer queries and complaints.',
          'Support customer-service standards across the store.',
          'Coordinate product replenishment activities.',
          'Monitor damaged, missing or excess stock.',
          'Assist in reducing stock loss and wastage.',
          'Maintain store cleanliness and housekeeping standards.',
          'Support staff training and operational guidance.',
          'Monitor employee attendance and daily performance.',
          'Prepare routine sales, stock and operational reports.',
          'Assist with promotional activities and product campaigns.',
          'Coordinate with procurement and supply-chain teams.',
          'Support implementation of company policies and procedures.',
          'Report operational issues to the Store Manager.',
          'Assist with opening and closing store procedures.',
          'Support audits, inspections and inventory checks.',
          'Perform other store-management duties assigned by management.'
        ]
      },
      {
        title: 'Sales Executive',
        code: 'GGIPL-RET-SE-004',
        level: 'L8',
        salary: '₹18,000–₹28,000',
        vacancies: 250,
        fee: 105,
        qualification: '10th / 12th Pass from a recognized board. Diploma/Certificate in Retail Management, Sales, Marketing, Business Administration or a related field may be preferred. Basic knowledge of sales, customer service, retail operations and product presentation. Good communication, interpersonal and customer-handling skills. Ability to work toward individual and store-level sales targets. Relevant RIMC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'RIMC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Assist customers in selecting suitable products and services.',
          'Achieve assigned daily, weekly and monthly sales targets.',
          'Explain product features, benefits and pricing to customers.',
          'Handle customer enquiries professionally.',
          'Maintain a positive and customer-friendly sales environment.',
          'Generate leads and identify potential customers.',
          'Follow up with prospective and existing customers.',
          'Support promotional and sales campaigns.',
          'Maintain proper product displays and merchandising standards.',
          'Monitor product availability and inform the store supervisor about replenishment needs.',
          'Assist customers throughout the purchase process.',
          'Support billing and point-of-sale activities where applicable.',
          'Handle routine customer complaints and escalate complex issues.',
          'Maintain accurate sales and customer records.',
          'Prepare daily and periodic sales reports.',
          'Coordinate with Store Manager and other retail staff.',
          'Monitor competitor activities and market trends where required.',
          'Promote new products, offers and approved promotional activities.',
          'Maintain professional grooming and communication standards.',
          'Follow company sales policies and procedures.',
          'Ensure accurate communication of product information.',
          'Support customer retention and relationship-building activities.',
          'Participate in team meetings and sales-training programmes.',
          'Maintain cleanliness and proper presentation of the assigned sales area.',
          'Perform other sales and customer-service duties assigned by management.'
        ]
      },
      {
        title: 'Inventory Executive',
        code: 'GGIPL-RET-IE-006',
        level: 'L8',
        salary: '₹19,000–₹30,000',
        vacancies: 250,
        fee: 105,
        qualification: '10th / 12th Pass from a recognized board. Diploma/Certificate in Inventory Management, Retail Management, Supply Chain, Logistics, Commerce or a related field may be preferred. Basic knowledge of inventory control, stock handling, warehouse operations and retail processes. Basic computer knowledge, particularly inventory and stock-record systems. Good numerical, organizational and record-maintenance skills. Relevant RIMC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'RIMC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Maintain accurate records of inventory and stock movements.',
          'Monitor incoming and outgoing stock.',
          'Conduct regular physical stock verification.',
          'Reconcile physical inventory with system records.',
          'Update inventory records accurately and on time.',
          'Monitor minimum and maximum stock levels.',
          'Identify stock shortages, excess inventory and discrepancies.',
          'Coordinate with store and warehouse teams for stock movement.',
          'Assist with receiving and inspection of incoming goods.',
          'Verify quantities and product details against delivery documents.',
          'Ensure proper labeling and storage of inventory.',
          'Monitor damaged, expired or slow-moving products.',
          'Prepare stock and inventory reports.',
          'Support stock audits and inventory reconciliation.',
          'Coordinate with procurement teams regarding replenishment requirements.',
          'Track inventory transfers between stores or locations.',
          'Maintain proper documentation for stock transactions.',
          'Assist in reducing inventory losses and wastage.',
          'Follow established inventory-control procedures.',
          'Monitor storage conditions where applicable.',
          'Report inventory discrepancies to the Store Manager or authorized supervisor.',
          'Support periodic cycle counts and physical inventory checks.',
          'Maintain organized inventory records and supporting documents.',
          'Coordinate with sales and operations teams regarding product availability.',
          'Perform other inventory and store-support duties assigned by management.'
        ]
      },
      {
        title: 'Cashier',
        code: 'GGIPL-RET-CAS-005',
        level: 'L10',
        salary: '₹22,000–₹25,000',
        vacancies: 250,
        fee: 105,
        qualification: '10th / 12th Pass from a recognized board. Diploma/Certificate in Retail Management, Commerce, Accounting, Finance or a related field may be preferred. Basic knowledge of cash handling, billing, point-of-sale (POS) operations and customer service. Basic computer and numerical skills. Good communication and customer-handling skills. Relevant RIMC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'RIMC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Operate the cash counter efficiently and professionally.',
          'Process customer purchases accurately.',
          'Handle cash, card and other approved payment methods.',
          'Operate POS and billing systems as required.',
          'Generate accurate bills and receipts.',
          'Verify prices, discounts and promotional offers before billing.',
          'Count and maintain the assigned cash balance.',
          'Perform cash reconciliation at the end of the shift.',
          'Report cash discrepancies to the Store Manager.',
          'Provide customers with accurate change and receipts.',
          'Handle customer queries related to billing and payments.',
          'Maintain proper records of daily transactions.',
          'Follow authorized refund, exchange and cancellation procedures.',
          'Ensure secure handling of cash and payment-related documents.',
          'Maintain cleanliness and organization of the cash counter.',
          'Coordinate with Store Manager and sales staff regarding billing issues.',
          'Verify applicable promotional discounts and approved offers.',
          'Assist with daily cash closing procedures.',
          'Support stock or product verification where required.',
          'Maintain confidentiality of transaction-related information.',
          'Follow company cash-handling and financial-control procedures.',
          'Report suspicious or unusual transactions to the appropriate supervisor.',
          'Provide courteous and professional customer service.',
          'Support audits and transaction verification activities.',
          'Perform other cashier and retail-support duties assigned by management.'
        ]
      }
    ]
  },

  {
    id: 'real-estate',
    division: 'Real Estate',
    brandName: 'Global Growth Real Estate',
    status: 'active',
    certificate: 'SCITC',
    roles: [
      {
        title: 'Real Estate Director',
        code: 'GGIPL-REA-RED-001',
        level: 'L3',
        salary: '₹60,000–₹1,50,000+',
        vacancies: 250,
        fee: 105,
        qualification: 'Bachelor’s Degree in Real Estate Management, Business Administration, Commerce, Finance, Marketing, Civil Engineering, Architecture or a related field. Master’s Degree in Business Administration, Real Estate Management, Finance or a related field may be preferred. Strong knowledge of real estate operations, property development, sales, leasing and business management. Knowledge of property documentation, market analysis, budgeting and project coordination. Strong leadership, negotiation and business-development skills. Relevant SCITC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'SCITC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Develop and implement the overall real estate business strategy.',
          'Lead real estate operations and business-development activities.',
          'Identify new property and investment opportunities.',
          'Monitor real estate market trends and local market conditions.',
          'Develop plans for property acquisition and development.',
          'Oversee sales, leasing and property-management activities.',
          'Establish business targets and monitor performance.',
          'Lead and guide real estate management teams.',
          'Build relationships with clients, investors, developers and business partners.',
          'Coordinate with legal, finance, construction and technical teams.',
          'Review property valuations, feasibility studies and investment proposals.',
          'Monitor project budgets, costs and financial performance.',
          'Support property negotiations and commercial agreements.',
          'Review property documentation and coordinate with authorized legal professionals.',
          'Monitor project timelines and development progress.',
          'Evaluate potential risks associated with real estate projects.',
          'Develop strategies for improving property value and business returns.',
          'Monitor customer and client satisfaction.',
          'Review sales, leasing and revenue reports.',
          'Prepare business plans and management reports.',
          'Support marketing and promotional strategies for properties.',
          'Ensure operations follow applicable laws, regulations and company policies.',
          'Coordinate with government authorities and professional consultants where required.',
          'Resolve escalated operational, commercial and client-related issues.',
          'Drive sustainable growth and continuous improvement of the real estate business.'
        ]
      },
      {
        title: 'Project Manager',
        code: 'GGIPL-REA-PM-002',
        level: 'L5',
        salary: '₹40,000–₹80,000',
        vacancies: 250,
        fee: 105,
        qualification: 'Bachelor’s Degree/Diploma in Civil Engineering, Construction Management, Real Estate Management, Architecture, Project Management or a related field. Master’s Degree in Project Management, Real Estate Management, Construction Management or a related field may be preferred. Knowledge of real estate project planning, construction coordination, budgeting, scheduling and documentation. Good understanding of project execution, quality, safety and resource management. Relevant SCITC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'SCITC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Plan and manage real estate projects from initiation through completion.',
          'Develop project schedules, milestones and execution plans.',
          'Coordinate with architects, engineers, contractors and consultants.',
          'Monitor project progress against approved timelines.',
          'Manage project resources, manpower, materials and equipment.',
          'Prepare and monitor project budgets and cost estimates.',
          'Track project expenditure and identify cost-control opportunities.',
          'Coordinate procurement and material requirements.',
          'Monitor contractor and vendor performance.',
          'Review project drawings, specifications and technical documentation.',
          'Conduct regular project-progress meetings.',
          'Monitor construction and development activities where applicable.',
          'Ensure required quality standards are followed.',
          'Support implementation of applicable health and safety procedures.',
          'Identify project risks and develop appropriate mitigation plans.',
          'Maintain project records, reports and documentation.',
          'Coordinate inspections, testing and quality-control activities.',
          'Monitor changes, variations and project requirements.',
          'Communicate project status to senior management and stakeholders.',
          'Resolve project-related operational and coordination issues.',
          'Coordinate with finance and legal teams on project-related matters.',
          'Monitor project compliance with applicable approvals and requirements.',
          'Support project completion, handover and close-out activities.',
          'Evaluate project performance and prepare management reports.',
          'Drive timely, efficient and cost-effective project execution.'
        ]
      },
      {
        title: 'Property Manager',
        code: 'GGIPL-REA-PM-003',
        level: 'L6',
        salary: '₹30,000–₹60,000',
        vacancies: 250,
        fee: 105,
        qualification: 'Bachelor’s Degree/Diploma in Real Estate Management, Property Management, Business Administration, Commerce, Civil Engineering, Construction Management or a related field. Diploma/Certificate in Property Management or Real Estate Operations may be preferred. Knowledge of property operations, maintenance, tenant/client management and documentation. Good communication, coordination, negotiation and problem-solving skills. Relevant SCITC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'SCITC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Manage day-to-day operations of assigned properties.',
          'Coordinate property maintenance and repair activities.',
          'Monitor property condition and identify maintenance requirements.',
          'Coordinate with tenants, clients, owners and other stakeholders.',
          'Handle routine tenant and customer service requests.',
          'Maintain records of property-related activities and documentation.',
          'Coordinate with maintenance staff, contractors and service providers.',
          'Monitor vendor performance and service quality.',
          'Support property inspections and periodic condition assessments.',
          'Track maintenance schedules and service requirements.',
          'Monitor property-related expenses and support cost-control activities.',
          'Coordinate procurement of maintenance materials and services where required.',
          'Assist with rental, occupancy or leasing-related administrative activities where applicable.',
          'Maintain records of agreements, service contracts and property documents.',
          'Monitor compliance with applicable property and safety procedures.',
          'Coordinate emergency maintenance and urgent service requirements.',
          'Prepare regular property operations and maintenance reports.',
          'Address and escalate tenant complaints appropriately.',
          'Support property improvement and renovation activities.',
          'Monitor cleanliness, security and general upkeep of properties.',
          'Coordinate with finance teams regarding property-related payments and expenses.',
          'Assist with property handover and takeover procedures.',
          'Maintain confidentiality of tenant, client and property information.',
          'Identify operational risks and recommend corrective actions.',
          'Perform other property-management duties assigned by management.'
        ]
      },
      {
        title: 'Sales Manager',
        code: 'GGIPL-REA-SM-004',
        level: 'L6',
        salary: '₹30,000–₹70,000',
        salaryNote: 'Incentives',
        vacancies: 250,
        fee: 105,
        qualification: 'Bachelor’s Degree/Diploma in Real Estate Management, Business Administration, Marketing, Sales, Commerce, Management or a related field. Diploma/Certificate in Real Estate Sales, Marketing or Business Development may be preferred. Strong knowledge of sales, customer relationship management, lead generation and business development. Good communication, negotiation, presentation and team-management skills. Relevant SCITC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'SCITC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Develop and implement real estate sales strategies.',
          'Set and monitor individual and team sales targets.',
          'Lead and supervise the real estate sales team.',
          'Generate and manage property-sales leads.',
          'Follow up with prospective buyers and clients.',
          'Explain property features, pricing and applicable terms to customers.',
          'Arrange and coordinate property visits and site visits.',
          'Build and maintain strong client relationships.',
          'Negotiate with clients within approved company guidelines.',
          'Monitor the sales pipeline and conversion rates.',
          'Prepare daily, weekly and monthly sales reports.',
          'Analyse market trends and customer requirements.',
          'Coordinate with marketing teams for lead-generation activities.',
          'Monitor competitor activities and market conditions.',
          'Support promotional campaigns and property marketing activities.',
          'Coordinate with property-management, legal and documentation teams.',
          'Ensure accurate communication of property-related information.',
          'Assist clients with the appropriate documentation process.',
          'Maintain customer and sales records securely.',
          'Resolve routine customer concerns and escalate complex issues.',
          'Conduct regular sales-team meetings and performance reviews.',
          'Train and guide sales executives on approved sales processes.',
          'Monitor achievement of revenue and business-development targets.',
          'Ensure sales activities comply with applicable company policies and laws.',
          'Develop strategies to improve sales performance and customer satisfaction.'
        ]
      },
      {
        title: 'Sales Executive',
        code: 'GGIPL-REA-SE-005',
        level: 'L8',
        salary: '₹18,000–₹35,000',
        salaryNote: 'Incentives',
        vacancies: 250,
        fee: 105,
        qualification: '10th / 12th Pass from a recognized board. Diploma/Certificate in Real Estate Management, Sales, Marketing, Business Administration or a related field may be preferred. Basic knowledge of sales, customer service, lead generation and marketing activities. Good communication, negotiation and interpersonal skills. Basic computer knowledge and record-maintenance skills. Relevant SCITC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'SCITC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Generate and follow up on property sales leads.',
          'Contact prospective customers and explain available properties.',
          'Arrange site visits and property presentations.',
          'Explain property features, pricing and payment plans to customers.',
          'Build and maintain good customer relationships.',
          'Assist customers throughout the sales process.',
          'Maintain accurate customer and lead records.',
          'Achieve assigned sales and business-development targets.',
          'Support marketing campaigns and promotional activities.',
          'Coordinate with Sales Managers and property teams.',
          'Handle customer enquiries and provide appropriate information.',
          'Prepare daily, weekly and monthly sales reports.',
          'Monitor market trends and competitor activities.',
          'Assist customers with documentation and application processes where applicable.',
          'Maintain professional communication and presentation standards.',
          'Participate in customer meetings, exhibitions and promotional events.',
          'Ensure proper follow-up of leads and enquiries.',
          'Support customer satisfaction and relationship-building initiatives.',
          'Maintain confidentiality of customer information.',
          'Follow company sales policies and approved procedures.',
          'Coordinate with legal, finance and operations teams where required.',
          'Resolve routine customer concerns and escalate complex matters.',
          'Maintain records of sales activities and customer interactions.',
          'Support achievement of departmental revenue targets.',
          'Perform other sales and business-development duties assigned by management.'
        ]
      },
      {
        title: 'CRM Executive',
        code: 'GGIPL-REA-CRM-006',
        level: 'L8',
        salary: '₹18,000–₹30,000',
        vacancies: 250,
        fee: 105,
        qualification: '10th / 12th Pass from a recognized board. Diploma/Certificate in Customer Relationship Management, Business Administration, Sales, Marketing, Real Estate Management or a related field may be preferred. Basic knowledge of CRM systems, customer communication, lead management and record maintenance. Good communication, interpersonal and problem-solving skills. Basic computer knowledge and ability to maintain digital records. Relevant SCITC Certificate may be preferred as per applicable role requirements.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'SCITC Certificate',
          'Relevant educational/professional qualification certificate, if applicable'
        ],
        duties: [
          'Maintain accurate customer and lead information in the CRM system.',
          'Record customer enquiries and interactions.',
          'Follow up with prospective and existing customers.',
          'Coordinate with the sales team regarding customer leads.',
          'Track lead status and follow-up activities.',
          'Respond to customer enquiries through approved communication channels.',
          'Provide customers with accurate information regarding available services or properties.',
          'Schedule customer calls, meetings and site visits where required.',
          'Monitor customer requests and ensure timely follow-up.',
          'Maintain records of customer communications and service requests.',
          'Identify pending customer issues and coordinate for resolution.',
          'Escalate unresolved complaints to the appropriate manager.',
          'Prepare customer and CRM activity reports.',
          'Monitor lead conversion and follow-up status.',
          'Support the sales team with customer information and lead updates.',
          'Update CRM records regularly and accurately.',
          'Maintain confidentiality of customer information.',
          'Assist with customer feedback and satisfaction activities.',
          'Coordinate with sales, marketing, operations and management teams.',
          'Support customer-retention and relationship-building activities.',
          'Track scheduled appointments and follow-up commitments.',
          'Assist in preparing daily, weekly and monthly CRM reports.',
          'Ensure customer records are complete and properly maintained.',
          'Follow company CRM, customer-service and data-handling procedures.',
          'Perform other customer-relationship and administrative duties assigned by management.'
        ]
      }
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
      {
        title: 'Consultancy Director',
        code: 'GGIPL-CON-CDD-001',
        level: 'L3',
        salary: '₹60,000–₹1,50,000+',
        vacancies: 350,
        fee: 170,
        qualification: 'Bachelor’s Degree in Business Administration, Management, Commerce, Finance, Economics, Consulting, Engineering or a related field. MBA, PGDM, Master’s Degree or relevant professional qualification will be preferred. Strong knowledge of business consulting, strategic planning, project management and organizational development. Excellent leadership, communication, negotiation and analytical skills. Knowledge of business analysis, client relationship management and consultancy operations preferred. BCITC Certificate may be preferred where applicable and should be genuine and relevant to the position.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'BCITC Certificate',
          'Educational/Professional Qualification Certificates, wherever applicable'
        ],
        duties: [
          'Develop the overall strategy for consultancy operations.',
          'Lead and manage consultancy business activities.',
          'Establish organizational goals, performance targets and growth plans.',
          'Develop consulting services based on approved business requirements.',
          'Build and maintain relationships with clients and business partners.',
          'Understand client requirements and develop appropriate consulting approaches.',
          'Oversee preparation of business proposals and consultancy plans.',
          'Review client projects, deliverables and consulting outcomes.',
          'Lead strategic planning and business improvement initiatives.',
          'Analyze market trends and identify new consultancy opportunities.',
          'Monitor revenue, profitability and overall business performance.',
          'Develop and maintain key client relationships.',
          'Lead, mentor and supervise consultancy teams.',
          'Allocate projects, responsibilities and resources effectively.',
          'Review project timelines, budgets and deliverables.',
          'Coordinate with finance, legal, HR, operations and other departments.',
          'Ensure consultancy activities follow approved company policies.',
          'Identify business, operational and project-related risks.',
          'Review reports, presentations and strategic recommendations.',
          'Support clients with structured business and operational recommendations.',
          'Monitor client satisfaction and service quality.',
          'Resolve escalated client concerns and project issues.',
          'Develop performance reports for senior management.',
          'Maintain confidentiality of client and company information.',
          'Perform other strategic and consultancy responsibilities assigned by authorized management.'
        ]
      },
      {
        title: 'Management Consultant',
        code: 'GGIPL-CON-MC-003',
        level: 'L5',
        salary: '₹40,000–₹1,00,000',
        vacancies: 350,
        fee: 170,
        qualification: 'Bachelor’s Degree in Business Administration, Management, Commerce, Economics, Finance, Engineering or a related field. MBA, PGDM, Master’s Degree or relevant professional qualification will be preferred. Strong knowledge of management principles, business strategy, organizational development and process improvement. Good analytical, communication, presentation, leadership and problem-solving skills. Knowledge of MS Excel, business analysis and presentation tools preferred. BCITC Certificate may be preferred where applicable and should be genuine and relevant to the position.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'BCITC Certificate',
          'Educational/Professional Qualification Certificates, wherever applicable'
        ],
        duties: [
          'Assess client organizational and management requirements.',
          'Analyze business operations, processes and management structures.',
          'Identify operational and organizational challenges.',
          'Develop practical management improvement recommendations.',
          'Assist clients in strategic planning and execution.',
          'Conduct market and industry research.',
          'Evaluate organizational performance and key performance indicators.',
          'Review business processes and identify efficiency opportunities.',
          'Develop process-improvement and operational strategies.',
          'Support organizational restructuring and change-management initiatives where applicable.',
          'Prepare management reports, presentations and strategic recommendations.',
          'Analyze operational and financial information relevant to assigned projects.',
          'Assist in developing business plans and implementation roadmaps.',
          'Identify operational risks and recommend appropriate mitigation measures.',
          'Coordinate with client management and internal consulting teams.',
          'Conduct meetings, interviews and requirement-gathering sessions.',
          'Monitor implementation of approved recommendations.',
          'Track project milestones, deliverables and timelines.',
          'Measure project outcomes against agreed objectives.',
          'Support cost-control and productivity-improvement initiatives.',
          'Maintain professional relationships with clients and stakeholders.',
          'Maintain accurate project documentation and records.',
          'Protect confidential client and company information.',
          'Prepare periodic progress reports for senior consultants and management.',
          'Perform other management consulting responsibilities assigned by authorized management.'
        ]
      },
      {
        title: 'Business Consultant',
        code: 'GGIPL-CON-BC-002',
        level: 'L6',
        salary: '₹35,000–₹80,000',
        vacancies: 350,
        fee: 170,
        qualification: 'Bachelor’s Degree in Business Administration, Management, Commerce, Finance, Economics, Marketing, Engineering or a related field. MBA, PGDM, Master’s Degree or relevant professional qualification will be preferred. Good understanding of business strategy, market analysis, operations, financial planning and organizational development. Strong analytical, communication, presentation and problem-solving skills. Knowledge of MS Excel, business reporting and presentation tools preferred. BCITC Certificate may be preferred where applicable and should be genuine and relevant to the position.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'BCITC Certificate',
          'Educational/Professional Qualification Certificates, wherever applicable'
        ],
        duties: [
          'Understand client business requirements and objectives.',
          'Analyze business operations, processes and performance.',
          'Conduct market and industry research.',
          'Identify business challenges, opportunities and improvement areas.',
          'Develop practical business recommendations.',
          'Assist clients with strategic planning and business development.',
          'Prepare business analysis reports and presentations.',
          'Analyze financial and operational information where applicable.',
          'Develop business plans, forecasts and performance strategies.',
          'Support process-improvement and cost-optimization initiatives.',
          'Evaluate business risks and recommend mitigation approaches.',
          'Monitor project progress and consulting deliverables.',
          'Coordinate with client teams and internal consultancy teams.',
          'Conduct client meetings and requirement discussions.',
          'Maintain professional relationships with clients.',
          'Track implementation of approved recommendations.',
          'Measure and report project outcomes and performance.',
          'Identify potential new business opportunities.',
          'Support preparation of proposals and consultancy presentations.',
          'Maintain accurate project and client documentation.',
          'Protect confidential client and company information.',
          'Prepare periodic reports for senior consultants and management.',
          'Stay informed about relevant market and business trends.',
          'Ensure recommendations are based on accurate information and approved scope.',
          'Perform other business consulting responsibilities assigned by authorized management.'
        ]
      },
      {
        title: 'HR Consultant',
        code: 'GGIPL-CON-HRC-004',
        level: 'L8',
        salary: '₹25,000–₹60,000',
        vacancies: 350,
        fee: 170,
        qualification: 'Bachelor’s Degree in Human Resource Management, Business Administration, Management, Commerce, Psychology or a related field. MBA/PGDM in Human Resources, Labour Relations or Management will be preferred. Good understanding of recruitment, employee relations, HR policies, performance management and organizational development. Strong communication, interpersonal, analytical and problem-solving skills. Knowledge of HRMS, recruitment platforms, MS Excel and HR documentation preferred. BCITC Certificate may be preferred where applicable and should be genuine and relevant to the position.',
        experience: 'Certificate, if applicable.',
        extraDocuments: [
          'BCITC Certificate',
          'Educational/Professional Qualification Certificates, wherever applicable'
        ],
        duties: [
          'Understand client HR requirements and organizational objectives.',
          'Provide HR-related consulting support within the approved scope.',
          'Assess recruitment and workforce requirements.',
          'Develop recruitment and talent-acquisition recommendations.',
          'Support development and review of HR policies and procedures.',
          'Assist clients with workforce planning.',
          'Review employee onboarding and HR documentation processes.',
          'Support performance-management system improvements.',
          'Assist with employee engagement and retention initiatives.',
          'Analyze HR processes and identify improvement opportunities.',
          'Support organizational development and change-management initiatives.',
          'Prepare HR reports, presentations and consulting recommendations.',
          'Analyze workforce data and relevant HR metrics.',
          'Assist with job descriptions and role-structure development.',
          'Support training and skill-development planning.',
          'Provide guidance on HR process documentation and best practices.',
          'Coordinate with client management and internal consultancy teams.',
          'Maintain accurate project and client records.',
          'Monitor implementation of approved HR recommendations.',
          'Track project milestones, deliverables and timelines.',
          'Identify HR-related operational risks and escalate them appropriately.',
          'Maintain confidentiality of employee and client information.',
          'Support compliance-related HR documentation under applicable requirements.',
          'Prepare periodic project and performance reports for management.',
          'Perform other HR consulting responsibilities assigned by authorized management.'
        ]
      },
      {
        title: 'Career Consultant',
        code: 'GGIPL-CON-CC-005',
        level: 'L8',
        salary: '₹20,000–₹45,000',
        vacancies: 350,
        fee: 170,
        qualification: 'Minimum 10th & 12th pass. Diploma / Bachelor’s Degree in Career Counselling, Psychology, Education, Management, HR, Business, Social Work or a related field will be preferred. Good communication and counselling skills are required. Knowledge of career planning, education options and employment opportunities will be an advantage. BCITC Certificate may be preferred as per the applicable role requirements.',
        experience: '0–3 years of relevant experience in career counselling, student counselling, recruitment, education consultancy, HR or customer guidance. Freshers with suitable communication and counselling skills may also be considered.',
        extraDocuments: [
          'BCITC Certificate'
        ],
        duties: [
          'Provide career guidance to students, candidates and job seekers.',
          'Understand candidates’ educational background, skills and career interests.',
          'Suggest suitable career pathways based on qualifications and interests.',
          'Explain available courses, training programmes and career options.',
          'Guide candidates regarding education and skill-development opportunities.',
          'Conduct one-to-one career counselling sessions.',
          'Help candidates identify their strengths and areas for improvement.',
          'Explain basic eligibility requirements for different career options.',
          'Assist candidates in preparing career-development plans.',
          'Maintain accurate counselling records and candidate information.',
          'Follow up with candidates regarding their career plans.',
          'Coordinate with training and academic departments when required.',
          'Provide accurate information about programmes and job-oriented training.',
          'Assist candidates with basic resume and interview preparation.',
          'Conduct career-orientation sessions and presentations.',
          'Maintain professional communication with candidates and parents where applicable.',
          'Handle candidate queries through phone, email or other approved communication channels.',
          'Maintain confidentiality of candidate information.',
          'Prepare counselling reports and periodic activity reports.',
          'Support career fairs, seminars, workshops and awareness programmes.',
          'Maintain updated knowledge of relevant education and employment trends.',
          'Avoid making false promises regarding guaranteed employment, salary or selection.',
          'Escalate complex academic, legal or professional matters to the appropriate department.',
          'Follow company policies and applicable professional standards.',
          'Contribute to candidate satisfaction and continuous improvement of counselling services.'
        ]
      },
      {
        title: 'Business Development Executive',
        code: 'GGIPL-CON-BDE-006',
        level: 'L8',
        salary: '₹18,000–₹35,000',
        salaryNote: 'Performance-Based Incentives',
        vacancies: 350,
        fee: 170,
        qualification: 'Minimum 10th & 12th pass. Diploma / Bachelor’s Degree in Business Administration, Management, Marketing, Commerce, Sales or a related field will be preferred. Good communication, negotiation and interpersonal skills. Basic knowledge of sales, business development and customer relationship management. BCITC Certificate may be preferred as per applicable role requirements.',
        experience: '0–3 years of relevant experience in business development, sales, marketing, customer relationship management or consultancy. Freshers with good communication and sales skills may also be considered.',
        extraDocuments: [
          'BCITC Certificate'
        ],
        duties: [
          'Identify and develop new business opportunities.',
          'Generate leads through approved business-development channels.',
          'Contact prospective clients and understand their requirements.',
          'Explain company services and applicable business solutions.',
          'Conduct follow-ups with prospective clients.',
          'Maintain professional relationships with existing and potential clients.',
          'Prepare and share business proposals as authorized.',
          'Support the preparation of quotations and commercial information.',
          'Coordinate with internal departments to meet client requirements.',
          'Maintain accurate lead and client information in the CRM system.',
          'Track sales leads from initial contact through conversion.',
          'Achieve assigned business-development and sales targets.',
          'Conduct market research and identify potential business segments.',
          'Monitor competitor activities and relevant market trends.',
          'Participate in meetings, presentations and business-development events.',
          'Build and maintain a professional business network.',
          'Handle client enquiries and coordinate timely responses.',
          'Prepare periodic sales and business-development reports.',
          'Follow up on pending proposals, enquiries and business discussions.',
          'Maintain confidentiality of client and company information.',
          'Ensure all communication with clients is accurate and professional.',
          'Coordinate with management regarding major business opportunities.',
          'Support customer retention and repeat-business initiatives.',
          'Follow company sales policies, ethical standards and approved communication practices.',
          'Contribute ideas for improving business-development processes and revenue opportunities.'
        ]
      }
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
 * APPLICATION FEE.
 * ---------------------------------------------------------------------------
 * Each vacancy notice carries a non-refundable application fee, set per post by
 * the client and confirmed by their Director of Legal & Compliance.
 *
 * WHY THIS BLOCK EXISTS AND WHY IT IS LONG
 * Charging a job applicant is the single highest-risk thing on this site. It is
 * also the thing a fraudulent scheme does, which means a legitimate one has to
 * work visibly harder to look unlike one. Everything here is a protection:
 *
 *   - the fee is disclosed with the post, before a candidate enters any data
 *   - it is stated as a processing charge, never as consideration for a job
 *   - a payment reference is promised, so a candidate has proof
 *   - a named grievance route is published
 *   - the refund position is stated rather than left ambiguous
 *
 * `refundPolicy` is a labelled placeholder on purpose. "Non-refundable" is what
 * the notices say, but a refund position has to be written by the client's
 * lawyer and stated exactly — silence here is what consumer complaints are
 * built on. It renders through resolve(), so nothing shows until it is real.
 *
 * NOTHING IN THIS BUILD TAKES A PAYMENT. The frontend displays the fee and the
 * terms; the gateway itself is specified in BACKEND_PROMPT.md.
 */
export const APPLICATION_FEE = {
  heading: 'About the application fee',
  intro:
    'Each vacancy notice carries a one-time application processing fee, shown on the post itself. ' +
    'The amount differs by post and is stated before you begin an application.',
  points: [
    {
      title: 'What the fee covers',
      text: 'Processing and administration of your application — screening against the stated eligibility, record-keeping, and scheduling through the recruitment stages.'
    },
    {
      title: 'What the fee does not buy',
      text: 'It does not buy a position, an interview, a shortlisting or any assurance of employment. Selection is decided only by the published recruitment process, and paying the fee gives no advantage within it.'
    },
    {
      title: 'You will get a reference',
      text: 'Every payment returns an application reference and a receipt to the email address you register. Keep it. It is your proof of payment and the reference any query about your application will be tracked against.'
    },
    {
      // Summarised, not restated. The policy itself is one document at
      // /refund, rendered from assets/js/data/refund.js — a refund term that
      // says one thing here and another there is worth nothing.
      title: 'Refunds',
      text: 'The fee is refunded in full if you are charged more than once for the same application, if a payment is taken but no application is recorded against it, or if the vacancy is withdrawn before applications are screened. It is not refunded once your application has been screened — including if you are not shortlisted, not selected, or you withdraw.',
      link: { href: '/refund', label: 'Read the full Refund & Cancellation Policy' }
    },
    {
      title: 'Pay only through this website',
      text: 'The fee is payable only through the payment page linked from a vacancy notice on this website. No employee, agent or representative of Global Growth Industries is authorised to collect an application fee in cash, by bank transfer, or through any other channel. If anyone asks you to, do not pay — report it to the address below.'
    }
  ],
  grievance: {
    label: 'Questions or complaints about a fee',
    email: 'hr@globalgrowthindustries.com',
    phone: '+91 92048 04718'
  }
};

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
    freshers:      acceptsFreshers(role),
    // The four standard documents, anything a particular post adds on top (an
    // ITI certificate, say), and the division's training certificate. Most
    // notices word that certificate themselves — "Relevant Electrical /
    // Electrical Industrial Training Certificate" — so it is only appended
    // where the post's own list does not already ask for it, or the applicant
    // would see the same requirement twice under two different names.
    documents: [
      ...STANDARD_DOCUMENTS,
      ...(role.extraDocuments || []),
      ...(namesCertificate(role, division) ? [] : [`${division.certificate} Certificate`])
    ]
  }))
);

/**
 * Every vacancy notice the client has issued is Full-Time, and every one
 * carries the same compensation caveat. Held once rather than repeated on each
 * role — if a future notice differs, give that role its own `employmentType`.
 */
export const EMPLOYMENT_TYPE = 'Full-Time';

export const COMPENSATION_NOTE =
  'Final compensation may vary based on qualifications, relevant experience, skills, ' +
  'role responsibilities and organisational policies.';

/** Posts advertised against a role, or null where none has been notified. */
export const isVacancy = role => Number.isFinite(role.vacancies) && role.vacancies > 0;

/**
 * Whether a post is open to candidates with no experience.
 *
 * Derived from the client's own experience wording rather than set as a
 * separate flag, so the two can never disagree. If a notice says "Freshers may
 * apply" then the post accepts freshers, by definition — and when the client
 * sends the next batch it works without anyone remembering to tick a box.
 *
 * A post starting at "0–" years is also treated as open: a range beginning at
 * zero is an invitation whether or not the word appears.
 */
// A function declaration, not a const: ALL_ROLES is initialised above this
// point and calls it, which a const would put in the temporal dead zone.
export function acceptsFreshers(role) {
  const text = role.experience || '';
  return /fresher/i.test(text) || /^\s*0\s*[–-]/.test(text);
}

/**
 * Whether a post's own document list already asks for the division training
 * certificate, under any of the names the client gives it.
 *
 * The notices name it three ways — by code ("EITC Certificate"), by expansion
 * ("Electrical Industrial Training Certificate"), or as an alternative
 * ("SITC Certificate or relevant Solar/Renewable Energy certificate"). Matching
 * the code alone would miss the second, so a post that merely asks for a
 * "training certificate" for its own trade counts too.
 */
// Declared, not assigned to a const: ALL_ROLES is initialised above this point
// and calls it, which a const would put in the temporal dead zone.
export function namesCertificate(role, division) {
  const code = division.certificate;
  return (role.extraDocuments || []).some(document =>
    new RegExp(`\\b${code}\\b`, 'i').test(document) ||
    /training certificate/i.test(document));
}

/** Every role with a live vacancy notice — a post count and an application fee. */
export const OPEN_VACANCIES = ALL_ROLES.filter(role => isVacancy(role) && role.status === 'active');

export const VACANCY_TOTALS = {
  notices:   OPEN_VACANCIES.length,
  posts:     OPEN_VACANCIES.reduce((n, r) => n + r.vacancies, 0),
  divisions: new Set(OPEN_VACANCIES.map(r => r.divisionId)).size,
  feeLow:    OPEN_VACANCIES.length ? Math.min(...OPEN_VACANCIES.map(r => r.fee).filter(Number.isFinite)) : 0,
  feeHigh:   OPEN_VACANCIES.length ? Math.max(...OPEN_VACANCIES.map(r => r.fee).filter(Number.isFinite)) : 0
};

/** Format a rupee amount the way an Indian reader expects it. */
export const rupees = amount =>
  `₹${Number(amount).toLocaleString('en-IN')}`;

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
