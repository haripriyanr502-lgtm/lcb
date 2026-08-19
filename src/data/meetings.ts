import { Meeting } from '@/types';

export const MEETINGS_DATA: Meeting[] = [
  {
    id: 'meeting-01',
    title: 'Quarterly Organizational Assembly & Strategy Briefing',
    date: '2026-09-15',
    time: '10:00 AM - 01:00 PM IST',
    location: 'Central Conference Hall / Virtual Stream',
    status: 'upcoming',
    description:
      'Executive gathering focused on evaluating current initiatives, reviewing strategic priorities for Q4 2026, and aligning operational leadership.',
    agenda: [
      'Address by Organization Directorate',
      'Review of Active Community Services',
      'Financial Transparency & Resource Allocation Report',
      'Open Forum & Member Q&A',
    ],
    isPlaceholder: true,
  },
  {
    id: 'meeting-02',
    title: 'Community Outreach & Service Coordination Council',
    date: '2026-10-05',
    time: '02:00 PM - 05:00 PM IST',
    location: 'Regional Center - North Wing',
    status: 'upcoming',
    description:
      'Coordination meeting for ground leadership and volunteer captains preparing for upcoming social impact and support programs.',
    agenda: [
      'Volunteer Team Briefing & Safety Guidelines',
      'Logistics & Resource Distribution Protocol',
      'Partner Agency Coordination',
    ],
    isPlaceholder: true,
  },
  {
    id: 'meeting-03',
    title: 'Annual General Directorate & Charter Review',
    date: '2026-11-20',
    time: '11:00 AM - 04:00 PM IST',
    location: 'Main Auditorium, Civic Complex',
    status: 'upcoming',
    description:
      'Official annual session dedicated to reviewing institutional governance, charter principles, member conduct guidelines, and institutional milestones.',
    agenda: [
      'Presentation of Annual Performance & Impact Metrics',
      'Charter Amendment & Governance Discussion',
      'Recognition of Outstanding Leadership',
    ],
    isPlaceholder: true,
  },
  {
    id: 'meeting-04',
    title: 'Leadership & Discipline Symposium 2026 (Completed)',
    date: '2026-05-12',
    time: '09:30 AM - 03:30 PM IST',
    location: 'Institutional Leadership Center',
    status: 'completed',
    description:
      'A comprehensive symposium bringing together brigade representatives to discuss leadership ethics, public service excellence, and team unity.',
    agenda: [
      'Keynote: Principles of Ethical Leadership',
      'Breakout Workshops on Community Engagement',
      'Adoption of the 2026 Service Directive',
    ],
    isPlaceholder: true,
  },
  {
    id: 'meeting-05',
    title: 'Q1 Special Committee Session on Youth Engagement (Completed)',
    date: '2026-02-18',
    time: '03:00 PM - 06:00 PM IST',
    location: 'Virtual Conference Suite',
    status: 'completed',
    description:
      'Focused roundtable on developing structured youth mentorship and skills development programs across participating regions.',
    isPlaceholder: true,
  },
];
