import { TeamMember, LeadershipTenure } from '@/types';

/**
 * Official and Historical Leadership Tenures of LCB BRIGADE
 * Designed with a year-wise and tenure-wise structure for seamless addition of future presidents and teams.
 */
export const LEADERSHIP_TENURES: LeadershipTenure[] = [
  {
    id: 'tenure-charter-2021',
    tenureYear: 'April 2021',
    termDates: 'Charter — April 2021',
    president: 'L. A. V. Nagaraj',
    teamTitle: 'Charter President — L. A. V. Nagaraj and Team',
    summary:
      'Formal founding and chartering of LCB BRIGADE in April 2021. The charter leadership brought extensive foundational experience from Rotary International Service Projects to establish organizational discipline and service standards.',
    backgroundNote: 'Previous experience with Rotary International Service Project',
    keyInitiatives: [
      'Chartering and formal foundation of LCB BRIGADE (April 2021)',
      'Integration of Rotary International Service Project leadership experience',
      'Establishment of foundational institutional values and community directives',
    ],
    isOfficial: true,
    members: [
      {
        id: 'officer-charter-01',
        name: 'L. A. V. Nagaraj and Team',
        position: 'Charter President',
        tenure: 'Charter (April 2021)',
        termDates: 'April 2021',
        department: 'Charter Executive',
        bio: 'Charter President who led the establishment of LCB BRIGADE in April 2021. Brought prior leadership experience from Rotary International Service Projects to establish the core mission of community welfare and disciplined public duty.',
        experienceHighlight: 'Previous experience with Rotary International Service Project',
        isOfficial: true,
      },
    ],
  },
  {
    id: 'tenure-2021-2022',
    tenureYear: '2021–2022',
    termDates: '1 July 2021 to 30 June 2022',
    president: 'A. V. Nagaraj',
    teamTitle: '2021–2022 — 1 July to 30 June — A. V. Nagaraj, President',
    summary:
      'Annual leadership term from 1 July 2021 to 30 June 2022 under President A. V. Nagaraj. Executed high-impact relief initiatives including the large-scale distribution of food grains in association with ISKCON & MLA Ashoka, as well as tree plantation campaigns.',
    keyInitiatives: [
      'Distribution of food grains in association with ISKCON & MLA Ashoka',
      'Comprehensive Tree Plantation & greening drive',
      'Civic relief logistics and grassroots outreach',
    ],
    isOfficial: true,
    members: [
      {
        id: 'officer-2021-01',
        name: 'A. V. Nagaraj',
        position: 'President (2021–2022)',
        tenure: '2021–2022',
        termDates: '1 July to 30 June',
        department: 'Executive Council',
        bio: 'Served as President of LCB BRIGADE for the 2021–2022 term (1 July to 30 June). Directed key service projects including the food grain distribution drive in association with ISKCON & MLA Ashoka and environmental tree plantation drives.',
        isOfficial: true,
      },
    ],
  },
  {
    id: 'tenure-2022-2023',
    tenureYear: '2022–2023',
    termDates: '1 July 2022 to 30 June 2023',
    president: 'B. S. Ramesh',
    teamTitle: '2022–2023 — 1 July to 30 June — B. S. Ramesh, President and Team',
    summary:
      'Annual leadership term from 1 July 2022 to 30 June 2023 under President B. S. Ramesh and Team. Spearheaded the landmark RO Plant Installation project to deliver safe drinking water to the community alongside continued social service operations.',
    keyInitiatives: [
      'RO Plant Installation (Clean drinking water project)',
      'Community infrastructure and health support drives',
      'Strengthening civic volunteer networks',
    ],
    isOfficial: true,
    members: [
      {
        id: 'officer-2022-01',
        name: 'B. S. Ramesh and Team',
        position: 'President (2022–2023)',
        tenure: '2022–2023',
        termDates: '1 July to 30 June',
        department: 'Executive Council',
        bio: 'Served as President of LCB BRIGADE for the 2022–2023 term (1 July to 30 June) with the executive team. Led the successful execution of the community RO Plant Installation providing clean potable water infrastructure.',
        isOfficial: true,
      },
    ],
  },
  // SAMPLE / DEMO TENURES (For Layout & Multi-Year Display Demonstration)
  {
    id: 'tenure-demo-2023-2024',
    tenureYear: '2023–2024 [SAMPLE/DEMO]',
    termDates: '1 July 2023 to 30 June 2024',
    president: '[DEMO] Sample President & Team',
    teamTitle: '2023–2024 — [SAMPLE / DEMO ENTRY] — Illustrative Leadership Term',
    summary:
      '[SAMPLE / DEMO ENTRY] Demonstrates how historical tenures for 2023–2024 and subsequent periods will be showcased as new records are archived.',
    keyInitiatives: [
      '[SAMPLE/DEMO] Multi-District Health & Eye Screening Camps',
      '[SAMPLE/DEMO] Expanded Youth Leadership Modules',
    ],
    isOfficial: false,
    isDemo: true,
    members: [
      {
        id: 'officer-demo-01',
        name: '[SAMPLE / DEMO] Illustrative President',
        position: 'President (2023–2024) [DEMO]',
        tenure: '2023–2024 [DEMO]',
        termDates: '1 July to 30 June',
        department: 'Executive Directorate',
        bio: '[SAMPLE / DEMO ENTRY] Illustrative presidential profile for testing layout presentation of annual leadership archives.',
        isOfficial: false,
        isDemo: true,
        isPlaceholder: true,
      },
    ],
  },
  {
    id: 'tenure-demo-2024-2025',
    tenureYear: '2024–2025 [SAMPLE/DEMO]',
    termDates: '1 July 2024 to 30 June 2025',
    president: '[DEMO] Sample President & Team',
    teamTitle: '2024–2025 — [SAMPLE / DEMO ENTRY] — Illustrative Leadership Term',
    summary:
      '[SAMPLE / DEMO ENTRY] Demonstrates future year-wise leadership archival formatting for the 2024–2025 period.',
    keyInitiatives: [
      '[SAMPLE/DEMO] Solar Community Lighting Initiative',
      '[SAMPLE/DEMO] Educational Scholarship Outreach',
    ],
    isOfficial: false,
    isDemo: true,
    members: [
      {
        id: 'officer-demo-02',
        name: '[SAMPLE / DEMO] Illustrative President',
        position: 'President (2024–2025) [DEMO]',
        tenure: '2024–2025 [DEMO]',
        termDates: '1 July to 30 June',
        department: 'Executive Directorate',
        bio: '[SAMPLE / DEMO ENTRY] Illustrative presidential profile demonstrating layout presentation of annual governance cycles.',
        isOfficial: false,
        isDemo: true,
        isPlaceholder: true,
      },
    ],
  },
];

/**
 * Individual Leadership and Officer Profiles (Official & Demonstration Profiles)
 */
export const TEAM_DATA: TeamMember[] = [
  // Official Leadership Records
  {
    id: 'team-official-01',
    name: 'L. A. V. Nagaraj and Team',
    position: 'Charter President (April 2021)',
    tenure: 'Charter (April 2021)',
    termDates: 'Chartering — April 2021',
    department: 'Charter Executive Directorate',
    bio: 'Charter President who spearheaded the founding of LCB BRIGADE in April 2021. Brought rich previous experience from Rotary International Service Projects to establish the institutional framework, service ethos, and initial community programs.',
    experienceHighlight: 'Previous experience with Rotary International Service Project',
    isOfficial: true,
  },
  {
    id: 'team-official-02',
    name: 'A. V. Nagaraj',
    position: 'President (2021–2022)',
    tenure: '2021–2022',
    termDates: '1 July 2021 to 30 June 2022',
    department: 'Executive Council',
    bio: 'President for the 2021–2022 term (1 July to 30 June). Led significant community initiatives including the major food grain distribution drive in association with ISKCON & MLA Ashoka and expansive tree plantation drives.',
    isOfficial: true,
  },
  {
    id: 'team-official-03',
    name: 'B. S. Ramesh and Team',
    position: 'President (2022–2023)',
    tenure: '2022–2023',
    termDates: '1 July 2022 to 30 June 2023',
    department: 'Executive Council',
    bio: 'President for the 2022–2023 term (1 July to 30 June) alongside the executive team. Directed major civic infrastructure projects, prominently the community RO Plant Installation for clean potable water access.',
    isOfficial: true,
  },

  // Sample Demo Team & Officer Roles (Clearly Tagged for UI Demonstration)
  {
    id: 'team-demo-01',
    name: '[SAMPLE / DEMO] Operations Coordinator',
    position: 'Operations & Logistics Officer [DEMO]',
    tenure: 'Active Directorate [DEMO]',
    department: 'Operations & Field Deployment',
    bio: '[SAMPLE / DEMO ENTRY] Illustrative profile demonstrating the presentation of operational coordinators and field logistics officers.',
    emailContact: 'demo.operations@lcbbrigade.org',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
  {
    id: 'team-demo-02',
    name: '[SAMPLE / DEMO] Community Outreach Lead',
    position: 'Community Relations Officer [DEMO]',
    tenure: 'Active Directorate [DEMO]',
    department: 'Public Service & Community Relations',
    bio: '[SAMPLE / DEMO ENTRY] Illustrative profile demonstrating public outreach leads and community partnership liaison roles.',
    emailContact: 'demo.outreach@lcbbrigade.org',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
  {
    id: 'team-demo-03',
    name: '[SAMPLE / DEMO] Governance & Ethics Officer',
    position: 'Charter & Ethics Lead [DEMO]',
    tenure: 'Active Directorate [DEMO]',
    department: 'Governance & Institutional Compliance',
    bio: '[SAMPLE / DEMO ENTRY] Illustrative profile demonstrating ethics committee officers and charter compliance coordinators.',
    emailContact: 'demo.governance@lcbbrigade.org',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
  {
    id: 'team-demo-04',
    name: '[SAMPLE / DEMO] Member Training Director',
    position: 'Capability Development Lead [DEMO]',
    tenure: 'Active Directorate [DEMO]',
    department: 'Training & Skill Enhancement',
    bio: '[SAMPLE / DEMO ENTRY] Illustrative profile demonstrating volunteer training leads and member induction managers.',
    emailContact: 'demo.training@lcbbrigade.org',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
  {
    id: 'team-demo-05',
    name: '[SAMPLE / DEMO] Resource Secretariat',
    position: 'Treasurer & Resource Lead [DEMO]',
    tenure: 'Active Directorate [DEMO]',
    department: 'Finance & Resource Stewardship',
    bio: '[SAMPLE / DEMO ENTRY] Illustrative profile demonstrating financial secretariats, audit reporting, and donation stewards.',
    emailContact: 'demo.finance@lcbbrigade.org',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
];
