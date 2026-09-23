import { OrgTreeNode, LeadershipTenure, TeamMember } from '@/types';

/**
 * CURRENT ACTIVE LEADERSHIP HIERARCHY (Tree Structure)
 * 
 * Configured per mentor directives:
 * - President (Confirmation Pending)
 * - 1st Vice President (Confirmation Pending)
 * - Secretary (Confirmation Pending)
 * - Treasurer: GnanaShekar R (Confirmed, Phone: +91 96321 44481)
 * 
 * Supports dynamic addition of new positions/bearers via "+ Add" capability.
 */
export const INITIAL_LEADERSHIP_TREE: OrgTreeNode[] = [
  {
    id: 'node-president',
    name: 'President',
    position: 'Club President',
    status: 'pending_confirmation',
    description: 'Executive head presiding over club operations and constitutional compliance. Official name and profile pending Directorate confirmation.',
    level: 1,
    parentId: null,
    children: [
      {
        id: 'node-vp1',
        name: '1st Vice President',
        position: '1st Vice President',
        status: 'pending_confirmation',
        description: 'First Vice President assisting the presidential office and overseeing service project committees. Official confirmation pending.',
        level: 2,
        parentId: 'node-president',
        children: [],
      },
      {
        id: 'node-secretary',
        name: 'Secretary',
        position: 'Club Secretary',
        status: 'pending_confirmation',
        description: 'Custodian of records, communications, and official correspondence. Lead point of contact for Club / District requests.',
        level: 2,
        parentId: 'node-president',
        children: [],
      },
      {
        id: 'node-treasurer',
        name: 'GnanaShekar R',
        position: 'LCB Brigade Treasurer',
        status: 'confirmed',
        phone: '+91 96321 44481',
        description: 'Confirmed Treasurer managing club financial accounts, funds custody, budgeting, and statutory audits.',
        level: 2,
        parentId: 'node-president',
        children: [],
      },
    ],
  },
];

/**
 * Historical Leadership Tenures (Segregated strictly from Current Leadership)
 * 
 * Grounded in verified mentor records:
 * 1. April 2021: Charter President L. A. V. Nagaraj and Team
 * 2. 2021–2022: President A. V. Nagaraj (1 July to 30 June)
 * 3. 2022–2023: President B. S. Ramesh and Team (1 July to 30 June)
 */
export const HISTORICAL_TENURES: LeadershipTenure[] = [
  {
    id: 'tenure-charter-2021',
    tenureYear: 'April 2021',
    termDates: 'Chartering — April 2021',
    president: 'L. A. V. Nagaraj',
    teamTitle: 'Charter President — L. A. V. Nagaraj and Team',
    summary:
      'Formal founding and chartering of LCB Brigade in April 2021. The charter leadership brought foundational experience from Rotary International Service Projects, raising ₹31 Lakh CSR funds and establishing early community impact.',
    backgroundNote: 'Previous experience with Rotary International service projects',
    keyInitiatives: [
      'Official Chartering of LCB Brigade (April 2021)',
      'Previous experience with Rotary International service projects',
      'CSR fund raised: ₹31 Lakh',
      'Distribution of food / groceries in association with ISKCON & MLA Ashoka',
      'Urban Tree Plantation Campaign',
      'RO Plant Installation initiative initiated',
    ],
    uncertainNotes: 'Some wording from initial charter records pending final mentor verification',
    isOfficial: true,
    members: [
      {
        id: 'officer-charter-01',
        name: 'L. A. V. Nagaraj and Team',
        position: 'Charter President',
        tenure: 'Charter (April 2021)',
        termDates: 'April 2021',
        department: 'Charter Executive',
        bio: 'Charter President who led the foundation of LCB Brigade in April 2021. Brought prior leadership experience from Rotary International service projects to anchor community welfare drives.',
        experienceHighlight: 'Previous experience with Rotary International service projects',
        isOfficial: true,
        status: 'confirmed',
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
      'Annual presidential term from 1 July 2021 to 30 June 2022 under President A. V. Nagaraj. Executed high-impact relief projects including the large-scale distribution of food grains in association with ISKCON & MLA Ashoka, as well as tree plantation campaigns.',
    keyInitiatives: [
      'Distribution of food / groceries in association with ISKCON & MLA Ashoka',
      'Tree Plantation drive across community spaces',
      'Grassroots civic relief and community outreach',
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
        bio: 'Served as President of LCB Brigade for the 2021–2022 tenure (1 July to 30 June). Directed key service initiatives including food grain distribution with ISKCON & MLA Ashoka and environmental tree planting.',
        isOfficial: true,
        status: 'confirmed',
      },
    ],
  },
  {
    id: 'tenure-2022-2023',
    tenureYear: '2022–2023',
    termDates: '1 July 2022 to 30 June 2023',
    president: 'B. S. Ramesh and Team',
    teamTitle: '2022–2023 — 1 July to 30 June — B. S. Ramesh, President and Team',
    summary:
      'Annual leadership tenure from 1 July 2022 to 30 June 2023 under President B. S. Ramesh and Team. Notable accomplishments included the community RO Plant Installation for clean potable water, Blood Donation Camp, and Leo Club Installation.',
    keyInitiatives: [
      'RO Plant Installation (Clean drinking water facility)',
      'Blood Donation Camp for regional healthcare support',
      'Leo Club Installation fostering youth leadership',
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
        bio: 'Served as President of LCB Brigade for the 2022–2023 tenure (1 July to 30 June) with the executive team. Led the RO Plant Installation, Blood Donation Camp, and Leo Club Installation.',
        isOfficial: true,
        status: 'confirmed',
      },
    ],
  },
];

/**
 * Backward compatibility alias for views expecting TEAM_DATA
 */
export const TEAM_DATA: TeamMember[] = [
  {
    id: 'current-treasurer',
    name: 'GnanaShekar R',
    position: 'LCB Brigade Treasurer',
    tenure: 'Current Directorate',
    bio: 'Confirmed Treasurer of LCB Brigade overseeing financial custody, transparency, and budget management.',
    phone: '+91 96321 44481',
    isOfficial: true,
    status: 'confirmed',
  },
  {
    id: 'current-president-slot',
    name: 'President',
    position: 'Club President',
    tenure: 'Current Directorate',
    bio: 'Executive head of LCB Brigade. Full name, photo, and official profile details pending Directorate confirmation.',
    isOfficial: true,
    status: 'pending_confirmation',
  },
  {
    id: 'current-vp1-slot',
    name: '1st Vice President',
    position: '1st Vice President',
    tenure: 'Current Directorate',
    bio: 'Assisting presidential office and coordinating committees. Official confirmation pending.',
    isOfficial: true,
    status: 'pending_confirmation',
  },
  {
    id: 'current-secretary-slot',
    name: 'Secretary',
    position: 'Club Secretary',
    tenure: 'Current Directorate',
    bio: 'Secretariat lead for club correspondence and district representation. Official confirmation pending.',
    isOfficial: true,
    status: 'pending_confirmation',
  },
];
