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
      { title: 'Hospital / Healthcare Administrator', level: 'L5',  salary: '₹35,000–₹80,000', qualification: 'Healthcare or Hospital Administration, or Graduate' },
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
      title: 'Refunds',
      text: '{{APPLICATION_FEE_REFUND_POLICY — to be drafted and confirmed by the company’s legal adviser, stating the circumstances in which the fee is and is not refundable, and the timeline for a refund.}}'
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
    // The four standard documents, the division's training certificate, and
    // anything a particular post adds on top (an ITI certificate, say).
    documents: [
      ...STANDARD_DOCUMENTS,
      ...(role.extraDocuments || []),
      `${division.certificate} Certificate`
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
