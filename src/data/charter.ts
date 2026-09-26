import { CharterSectionItem } from '@/types';

export const CHARTER_SECTIONS: CharterSectionItem[] = [
  {
    id: 'sec-01',
    title: '1. Introduction & Declaration of Purpose',
    content: [
      'The LCB BRIGADE is established as a disciplined, non-partisan, public-service-oriented institution dedicated to fostering leadership, social responsibility, collective unity, and community service.',
      'This official Charter delineates the institutional foundation, operational directives, governance protocols, and ethical mandates governing all members and activities of LCB BRIGADE.',
      'Every member affiliated with LCB BRIGADE pledges allegiance to the core tenets of Service, Discipline, and Excellence in all public and private conduct.',
    ],
    isPlaceholder: true,
  },
  {
    id: 'sec-02',
    title: '2. Mission Statement',
    content: [
      'To build a unified, disciplined, and proactive brigade of individuals dedicated to public service, community welfare, ethical leadership, and societal advancement.',
      'To provide structured support to civic initiatives, cultivate leadership capabilities among members, and uphold high standards of integrity in all organizational endeavors.',
    ],
    isPlaceholder: true,
  },
  {
    id: 'sec-03',
    title: '3. Vision Statement',
    content: [
      'To be recognized as a premier benchmark for public-service excellence, disciplined civic engagement, and transformative leadership.',
      'To inspire communities through selflessness, accountability, and unwavering dedication to societal harmony and progress.',
    ],
    isPlaceholder: true,
  },
  {
    id: 'sec-04',
    title: '4. Strategic Objectives',
    content: [
      'The primary objectives of LCB BRIGADE include:',
    ],
    subsections: [
      {
        title: '4.1 Civic & Community Support',
        points: [
          'Organize and execute structured civic welfare and public service campaigns.',
          'Collaborate with municipal authorities and public bodies to address localized social needs.',
        ],
      },
      {
        title: '4.2 Leadership & Character Formation',
        points: [
          'Conduct rigorous leadership workshops focused on ethical governance and public responsibility.',
          'Instill habits of discipline, punctuality, respect, and duty across all membership tiers.',
        ],
      },
      {
        title: '4.3 Emergency Logistics & Relief',
        points: [
          'Maintain trained volunteer logistics units capable of aiding community emergency responses.',
          'Provide non-partisan, non-discriminatory humanitarian assistance during local crises.',
        ],
      },
    ],
    isPlaceholder: true,
  },
  {
    id: 'sec-05',
    title: '5. Core Principles & Values',
    content: [
      'All actions taken under the banner of LCB BRIGADE must align with five foundational pillars:',
    ],
    subsections: [
      {
        title: 'The Five Pillars',
        points: [
          'Leadership — Exemplifying integrity, initiative, and ethical decision-making.',
          'Service — Putting community welfare ahead of personal gain.',
          'Unity — Fostering solidarity across diverse backgrounds and viewpoints.',
          'Responsibility — Taking complete accountability for assigned duties and institutional standards.',
          'Excellence — Striving for the highest quality in every deployment and project.',
        ],
      },
    ],
    isPlaceholder: true,
  },
  {
    id: 'sec-06',
    title: '6. Member Responsibilities & Duty Code',
    content: [
      'Membership in LCB BRIGADE carries sacred duties towards the organization and society at large.',
    ],
    subsections: [
      {
        title: '6.1 Duties of Members',
        points: [
          'Actively participate in official meetings, assembly calls, and designated service drives.',
          'Maintain personal integrity and represent LCB BRIGADE with dignity at all times.',
          'Protect institutional assets, confidential data, and official property.',
        ],
      },
    ],
    isPlaceholder: true,
  },
  {
    id: 'sec-07',
    title: '7. Code of Conduct & Discipline',
    content: [
      'Discipline is the cornerstone of LCB BRIGADE. Zero tolerance is observed for misconduct, breach of ethics, or unauthorized actions taken in the name of the organization.',
    ],
    subsections: [
      {
        title: '7.1 Prohibited Conduct',
        points: [
          'Misrepresenting official brigade positions or authority.',
          'Engaging in partisan political activities using institutional titles or emblems.',
          'Any action that compromises public trust, safety, or institutional integrity.',
        ],
      },
      {
        title: '7.2 Disciplinary Protocol',
        points: [
          'Allegations of conduct violations are reviewed by the Ethics Committee in accordance with due process.',
          'Sanctions range from formal warning to immediate revocation of membership.',
        ],
      },
    ],
    isPlaceholder: true,
  },
  {
    id: 'sec-08',
    title: '8. Organizational Structure & Governance',
    content: [
      'LCB BRIGADE operates under a hierarchical, transparent governance structure designed for operational efficiency and accountability.',
    ],
    subsections: [
      {
        title: '8.1 Governance Tiers',
        points: [
          'Directorate General — Executive leadership responsible for strategic vision and policy.',
          'Regional Councils — Operational leadership for regional zones and chapter deployment.',
          'Service Captains — Ground leadership overseeing direct service units.',
          'Active Cadre / Members — Dedicated volunteers fulfilling project mandates.',
        ],
      },
    ],
    isPlaceholder: true,
  },
];

/**
 * CHARTER MEMBERS FAMILY TREE (Genealogical Hierarchy)
 *
 * Grounded in official verified founding records:
 * - Charter President: Ln. L. A. V. Nagaraj and Team (April 2021)
 * - Rotary International service projects experience
 * - CSR fund raised: ₹31 Lakh
 *
 * The detailed member roll and sponsoring lineage will be populated
 * upon submission by the Secretariat. No fictitious member names are substituted.
 */
export const INITIAL_CHARTER_TREE: import('@/types').CharterMemberNode[] = [
  {
    id: 'charter-root-nagaraj',
    name: 'Ln. L. A. V. Nagaraj and Team',
    position: 'Founding Charter President',
    charterYear: 'April 2021',
    status: 'confirmed',
    bio: 'Charter President who anchored the foundation of LCB Brigade in April 2021. Brought prior leadership experience from Rotary International service projects and mobilized ₹31 Lakh CSR funds for community welfare.',
    notes: 'Confirmed Founding President • Rotary International Experience • ₹31 Lakh CSR Raised',
    level: 1,
    parentId: null,
    children: [
      {
        id: 'charter-exec-vp1',
        name: 'Charter 1st Vice President',
        position: 'Office of Charter 1st Vice President',
        charterYear: 'April 2021',
        status: 'pending_team_submission',
        notes: 'Charter Vice President assisting the presidential office and supervising early service directives.',
        level: 2,
        parentId: 'charter-root-nagaraj',
        children: [
          {
            id: 'charter-branch-service',
            name: 'Charter Community Service Director',
            position: 'Director — Service Directives',
            charterYear: 'April 2021',
            status: 'pending_team_submission',
            notes: 'Coordinated food distribution with ISKCON & tree plantation.',
            level: 3,
            parentId: 'charter-exec-vp1',
            children: [],
          },
        ],
      },
      {
        id: 'charter-exec-secretary',
        name: 'Charter Secretary',
        position: 'Office of Charter Secretary',
        charterYear: 'April 2021',
        status: 'pending_team_submission',
        notes: 'Charter Secretariat custodian of founding minutes, district correspondence, and official charter roll.',
        level: 2,
        parentId: 'charter-root-nagaraj',
        children: [
          {
            id: 'charter-branch-cadre1',
            name: 'Inducted Charter Cadre (Section A)',
            position: 'Charter Members Roll Slot',
            charterYear: 'April 2021',
            status: 'pending_team_submission',
            notes: 'Awaiting team submission of founding inducted members roster.',
            level: 3,
            parentId: 'charter-exec-secretary',
            children: [],
          },
        ],
      },
      {
        id: 'charter-exec-treasurer',
        name: 'Charter Treasurer',
        position: 'Office of Charter Treasurer',
        charterYear: 'April 2021',
        status: 'pending_team_submission',
        notes: 'Charter Financial Custodian overseeing initial statutory accounts and the ₹31 Lakh CSR disbursement.',
        level: 2,
        parentId: 'charter-root-nagaraj',
        children: [
          {
            id: 'charter-branch-cadre2',
            name: 'Inducted Charter Cadre (Section B)',
            position: 'Charter Members Roll Slot',
            charterYear: 'April 2021',
            status: 'pending_team_submission',
            notes: 'Awaiting team submission of founding inducted members roster.',
            level: 3,
            parentId: 'charter-exec-treasurer',
            children: [],
          },
        ],
      },
    ],
  },
];

