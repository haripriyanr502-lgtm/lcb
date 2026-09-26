import { Service } from '@/types';

/**
 * Service Projects and Core Directives of LCB Brigade
 * Derived exclusively from verified historical and active initiatives.
 */
export const SERVICES_DATA: Service[] = [
  {
    id: 'service-ro-water-plant',
    iconName: 'Droplets',
    name: 'RO Clean Water Plant Installation',
    category: 'Civic Infrastructure & Public Health',
    year: '2022–2023',
    shortDescription:
      'Commissioned Reverse Osmosis (RO) water purification plant providing certified safe drinking water to the local community.',
    fullDescription:
      'A permanent civic infrastructure initiative executed under President B. S. Ramesh and Team. The RO plant addresses the fundamental need for pure potable water, significantly reducing waterborne illnesses and serving hundreds of local families daily.',
    impactMetrics: 'Permanent operational RO purification plant serving community residents',
    isOfficial: true,
  },
  {
    id: 'service-food-distribution',
    iconName: 'HeartHandshake',
    name: 'Food & Grocery Relief Distribution',
    category: 'Community Welfare & Food Security',
    year: '2021–2022',
    partnerAssociation: 'In association with ISKCON & MLA Ashoka',
    shortDescription:
      'Collaborative food relief drives distributing essential grains and grocery packages to vulnerable families and individuals.',
    fullDescription:
      'In partnership with ISKCON and MLA Ashoka during the 2021–2022 term under President A. V. Nagaraj, LCB Brigade organized coordinated supply distribution drives ensuring essential nourishment reached underprivileged sections of society.',
    impactMetrics: 'Essential grocery kits and food supplies distributed in partnership with ISKCON & MLA Ashoka',
    isOfficial: true,
  },
  {
    id: 'service-tree-plantation',
    iconName: 'Trees',
    name: 'Tree Plantation & Environmental Greening',
    category: 'Environmental Sustainability',
    year: '2021–2022',
    shortDescription:
      'Urban greening campaigns planting native tree saplings across public zones to promote environmental conservation.',
    fullDescription:
      'Environmental preservation stands as a core service pillar. LCB Brigade mobilizes volunteer cadres and citizen participants to plant native shade-giving and fruit-bearing trees in parks, roadsides, and school perimeters.',
    impactMetrics: 'Community afforestation drives enhancing local ecological biodiversity',
    isOfficial: true,
  },
  {
    id: 'service-blood-donation',
    iconName: 'HeartPulse',
    name: 'Voluntary Blood Donation Drives & Healthcare',
    category: 'Healthcare & Life Support',
    year: '2022–2023',
    shortDescription:
      'Organizing periodic blood donation camps in association with accredited blood banks for emergency hospital supplies.',
    fullDescription:
      'Dedicated to saving lives by facilitating blood donation drives. Volunteer donors contribute across blood groups to replenish regional blood banks for emergency trauma care, pediatric surgeries, and critical patient treatments.',
    impactMetrics: 'Essential blood units collected for regional clinical emergency requirements',
    isOfficial: true,
  },
  {
    id: 'service-vision-healthcare',
    iconName: 'HeartPulse',
    name: 'Vision Care & Eye Screening Camps',
    category: 'Healthcare & Life Support',
    year: 'Periodic Directives',
    shortDescription:
      'Diagnostic eye screening, pediatric vision checkups, and cataract surgery coordination for underserved citizens.',
    fullDescription:
      'In line with Lions International global vision directives, LCB Brigade conducts targeted optical screening camps in residential schools and rural areas, detecting visual impairment early and facilitating cataract corrective treatments.',
    impactMetrics: 'Comprehensive vision diagnostics and school eye screenings delivered to vulnerable groups',
    isOfficial: true,
  },
  {
    id: 'service-educational-support',
    iconName: 'GraduationCap',
    name: 'Student Educational Kit & Notebook Distribution',
    category: 'Youth Leadership & Social Empowerment',
    year: 'Annual Directives',
    shortDescription:
      'Supplying thousands of notebooks, school bags, and learning materials to government and residential schools.',
    fullDescription:
      'Empowering children through uninterrupted education. LCB Brigade distributes thousands of notebooks and school bags annually, encouraging student retention and celebrating national occasions like Independence Day with young scholars.',
    impactMetrics: 'Over 4,000 notebooks and school bag kits distributed to government school students',
    isOfficial: true,
  },
  {
    id: 'service-leo-club-youth',
    iconName: 'GraduationCap',
    name: 'Leo Club & Youth Leadership Mentorship',
    category: 'Youth Leadership & Social Empowerment',
    year: '2022–2023',
    shortDescription:
      'Sponsoring and guiding the youth Leo Club to nurture social responsibility, leadership skills, and civic engagement.',
    fullDescription:
      'Installed during the 2022–2023 term under President B. S. Ramesh and Team, the Leo Club serves as a training ground for young civic leaders. Members gain hands-on experience in project management, public speaking, and community service.',
    impactMetrics: 'Structured platform empowering next-generation youth leaders and volunteers',
    isOfficial: true,
  },
  {
    id: 'service-community-welfare',
    iconName: 'HeartHandshake',
    name: 'Community Care & Senior Citizen Outreach',
    category: 'Community Welfare & Food Security',
    year: 'Community Outreach',
    shortDescription:
      'Outreach visits and welfare support drives to old-age homes and specialized schools for differently-abled children.',
    fullDescription:
      'Fostering compassionate civic engagement through direct visits and material provisions to senior citizen residential centers and educational institutions for hearing and speech impaired students.',
    impactMetrics: 'Direct material assistance and compassionate care delivered to senior citizens and special needs children',
    isOfficial: true,
  },
  {
    id: 'service-csr-civic-partnerships',
    iconName: 'Briefcase',
    name: 'CSR Project Mobilization & Execution',
    category: 'Corporate Social Responsibility & Civic Funding',
    year: 'April 2021 onwards',
    shortDescription:
      'Mobilizing corporate CSR investments (such as the initial ₹31 Lakh fund) to deliver high-impact public service projects.',
    fullDescription:
      'Drawing on deep experience with international service frameworks, LCB Brigade bridges the corporate sector and community needs. Transparent project execution ensures corporate CSR funds translate into measurable, enduring civic benefits.',
    impactMetrics: '₹31 Lakh CSR funding successfully raised and deployed for community welfare',
    isOfficial: true,
  },
];

export function getServiceById(id: string): Service | undefined {
  return SERVICES_DATA.find((s) => s.id === id);
}
