import { Service } from '@/types';

/**
 * Official and Historical Service Projects of LCB BRIGADE
 * Structured project-wise and domain-wise with clear tags for official initiatives and sample demonstration content.
 */
export const SERVICES_DATA: Service[] = [
  // OFFICIAL LCB BRIGADE SERVICE PROJECTS
  {
    id: 'service-official-food-grains',
    iconName: 'Users',
    name: 'Distribution of Food Grains',
    category: 'Community Welfare & Food Relief',
    year: '2021–2022',
    partnerAssociation: 'In association with ISKCON & MLA Ashoka',
    shortDescription:
      'Organized large-scale distribution of essential food grains to support vulnerable families, executed in direct association with ISKCON and MLA Ashoka.',
    fullDescription:
      'A landmark community relief project of LCB BRIGADE executed during the 2021–2022 tenure under President A. V. Nagaraj. Working in close collaboration with ISKCON and MLA Ashoka, LCB BRIGADE organized the systematic sourcing, packaging, and distribution of essential food grains to underserved families and community members, reinforcing the organization’s foundational pillar of dedicated public service.',
    impactMetrics: 'Collaborative food security drive with ISKCON & MLA Ashoka',
    isOfficial: true,
  },
  {
    id: 'service-official-tree-plantation',
    iconName: 'Compass',
    name: 'Tree Plantation Drive',
    category: 'Environmental & Civic Greening',
    year: '2021–2022',
    shortDescription:
      'Comprehensive environmental greening initiative dedicated to urban afforestation, tree planting, and ecological preservation.',
    fullDescription:
      'As part of LCB BRIGADE’s enduring commitment to environmental stewardship, the organization initiated targeted tree plantation drives across public spaces, institutional boundaries, and community grounds. Cadre volunteers participated in planting native tree saplings and promoting ecological awareness among local citizens.',
    impactMetrics: 'Extensive tree planting and green canopy enhancement',
    isOfficial: true,
  },
  {
    id: 'service-official-ro-plant',
    iconName: 'ShieldCheck',
    name: 'RO Plant Installation',
    category: 'Public Infrastructure & Water Access',
    year: '2022–2023',
    shortDescription:
      'Installation of a permanent Reverse Osmosis (RO) water purification plant to ensure sustained access to clean drinking water.',
    fullDescription:
      'Spearheaded during the 2022–2023 tenure under President B. S. Ramesh and Team, this vital community infrastructure project established an operational RO Water Purification Plant. The facility delivers safe, clean, and potable drinking water to local residents, fulfilling a critical public health and welfare need.',
    impactMetrics: 'Permanent clean drinking water RO plant facility installed and operational',
    isOfficial: true,
  },

  // SAMPLE / DEMO SERVICE PROJECTS (For Layout & Future Project Archival Demonstration)
  {
    id: 'service-demo-leadership',
    iconName: 'ShieldCheck',
    name: '[SAMPLE / DEMO] Youth Leadership & Civic Ethics Seminar',
    category: 'Leadership Development',
    year: '2023–2024 [DEMO]',
    shortDescription:
      '[SAMPLE / DEMO ENTRY] Illustrative training module demonstrating how leadership and ethics workshops are presented.',
    fullDescription:
      '[SAMPLE / DEMO ENTRY] Designed to showcase the presentation of structured leadership seminars, public ethics forums, and character-building workshops for emerging civic leaders.',
    impactMetrics: '[DEMO] Exemplary metric: 500+ attendees across quarterly sessions',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
  {
    id: 'service-demo-health',
    iconName: 'HandHeart',
    name: '[SAMPLE / DEMO] Community Health & Eye Screening Camp',
    category: 'Healthcare & Preventive Wellness',
    year: '2023–2024 [DEMO]',
    shortDescription:
      '[SAMPLE / DEMO ENTRY] Illustrative project showing how periodic medical, vision screening, and health checkup drives are documented.',
    fullDescription:
      '[SAMPLE / DEMO ENTRY] Demonstrates project card formatting for free medical camps, diagnostic screenings, and community health consultations organized in neighborhood centers.',
    impactMetrics: '[DEMO] Exemplary metric: 1,200+ citizens screened across 4 medical camps',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
  {
    id: 'service-demo-education',
    iconName: 'GraduationCap',
    name: '[SAMPLE / DEMO] School Digital Learning & Kit Distribution',
    category: 'Educational Support',
    year: '2024–2025 [DEMO]',
    shortDescription:
      '[SAMPLE / DEMO ENTRY] Illustrative initiative demonstrating educational aid, study supplies, and digital literacy equipment drives.',
    fullDescription:
      '[SAMPLE / DEMO ENTRY] Formats the archival record for educational assistance programs, school kit sponsorships, and basic computer education support for public school students.',
    impactMetrics: '[DEMO] Exemplary metric: Educational supplies sponsored for 8 public schools',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
  {
    id: 'service-demo-relief',
    iconName: 'LifeBuoy',
    name: '[SAMPLE / DEMO] Seasonal Blanket & Essential Relief Drive',
    category: 'Seasonal Humanitarian Relief',
    year: '2024–2025 [DEMO]',
    shortDescription:
      '[SAMPLE / DEMO ENTRY] Illustrative emergency aid program demonstrating winter relief and clothing distribution formatting.',
    fullDescription:
      '[SAMPLE / DEMO ENTRY] Illustrates how seasonal emergency relief efforts, warm clothing provisions, and weather-protection kits distributed to unsheltered individuals are displayed.',
    impactMetrics: '[DEMO] Exemplary metric: 2,000+ relief kits distributed during winter months',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
  {
    id: 'service-demo-water-harvesting',
    iconName: 'Compass',
    name: '[SAMPLE / DEMO] Rainwater Harvesting & Water Conservation',
    category: 'Civic Infrastructure & Water',
    year: '2025–2026 [DEMO]',
    shortDescription:
      '[SAMPLE / DEMO ENTRY] Illustrative project for community rainwater harvesting structures and conservation campaigns.',
    fullDescription:
      '[SAMPLE / DEMO ENTRY] Showcases documentation of environmental water management initiatives, percolation pits, and public ground water recharging campaigns.',
    impactMetrics: '[DEMO] Exemplary metric: 15 harvesting units installed across community buildings',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
  {
    id: 'service-demo-vocational',
    iconName: 'Users',
    name: '[SAMPLE / DEMO] Vocational Skill & Self-Reliance Workshop',
    category: 'Skill & Capability Building',
    year: '2025–2026 [DEMO]',
    shortDescription:
      '[SAMPLE / DEMO ENTRY] Illustrative capability-building project for youth and women vocational training modules.',
    fullDescription:
      '[SAMPLE / DEMO ENTRY] Demonstrates presentation of career skills coaching, craft certifications, and entrepreneurship readiness modules conducted by volunteer mentors.',
    impactMetrics: '[DEMO] Exemplary metric: 350+ candidates trained in vocational proficiencies',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
  {
    id: 'service-demo-road-safety',
    iconName: 'ShieldCheck',
    name: '[SAMPLE / DEMO] Civic Road Safety & Traffic Awareness Drive',
    category: 'Public Safety & Advocacy',
    year: '2026 [DEMO]',
    shortDescription:
      '[SAMPLE / DEMO ENTRY] Illustrative public awareness project demonstrating safety advocacy campaigns.',
    fullDescription:
      '[SAMPLE / DEMO ENTRY] Displays layout formatting for public safety drives, helmet awareness campaigns, pedestrian safety education, and civic compliance workshops.',
    impactMetrics: '[DEMO] Exemplary metric: 5 civic junctions covered with public awareness leaflets',
    isOfficial: false,
    isDemo: true,
    isPlaceholder: true,
  },
];
