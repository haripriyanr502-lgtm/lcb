export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed';
  description: string;
  agenda?: string[];
  isPlaceholder?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department?: string;
  tenure?: string;
  termDates?: string;
  bio: string;
  experienceHighlight?: string;
  image?: string;
  emailContact?: string;
  isOfficial: boolean;
  isPlaceholder?: boolean;
  isDemo?: boolean;
}

export interface LeadershipTenure {
  id: string;
  tenureYear: string;
  termDates: string;
  president: string;
  teamTitle: string;
  summary: string;
  backgroundNote?: string;
  keyInitiatives?: string[];
  members: TeamMember[];
  isOfficial: boolean;
  isDemo?: boolean;
}

export interface Service {
  id: string;
  iconName: string;
  name: string;
  category: string;
  year?: string;
  partnerAssociation?: string;
  shortDescription: string;
  fullDescription: string;
  impactMetrics?: string;
  isOfficial: boolean;
  isDemo?: boolean;
  isPlaceholder?: boolean;
}

export interface Achievement {
  id: string;
  year: number | string;
  title: string;
  category: string;
  description: string;
  impact: string;
  association?: string;
  leadership?: string;
  image?: string;
  isOfficial: boolean;
  isDemo?: boolean;
  isPlaceholder?: boolean;
}

export interface CharterSectionItem {
  id: string;
  title: string;
  content: string[];
  subsections?: { title: string; points: string[] }[];
  isPlaceholder?: boolean;
}

export interface JoinApplication {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  areaOfInterest: string;
  skills: string;
  whyJoin: string;
  message: string;
}

export interface DonationOption {
  amount: number;
  label: string;
  description: string;
}
