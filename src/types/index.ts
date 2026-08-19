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

export interface Service {
  id: string;
  iconName: string;
  name: string;
  category: 'Community Service' | 'Leadership' | 'Outreach' | 'Support' | 'Development' | 'Social Initiatives';
  shortDescription: string;
  fullDescription: string;
  impactMetrics?: string;
  isPlaceholder?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image?: string;
  department?: string;
  emailContact?: string;
  isPlaceholder?: boolean;
}

export interface Achievement {
  id: string;
  year: number | string;
  title: string;
  category: string;
  description: string;
  impact: string;
  image?: string;
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
