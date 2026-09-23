export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed';
  description: string;
  agenda?: string[];
  scheduleBreakdown?: {
    time: string;
    session: string;
    highlight?: boolean;
  }[];
}

export interface MeetingScheduleInfo {
  frequency: string;
  cadenceDescription: string;
  sessions: {
    time: string;
    title: string;
    description: string;
    highlight?: boolean;
  }[];
  fellowship: string;
}

export interface SecretaryRequest {
  representativeName: string;
  clubOrDistrictName: string;
  designation?: string;
  contactPhone?: string;
  contactEmail?: string;
  subject: string;
  message: string;
}

export interface OrgTreeNode {
  id: string;
  name: string;
  position: string;
  status: 'confirmed' | 'pending_confirmation';
  phone?: string;
  email?: string;
  photo?: string;
  description?: string;
  parentId?: string | null;
  children?: OrgTreeNode[];
  level: number;
  department?: string;
  isCustomAdded?: boolean;
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
  phone?: string;
  emailContact?: string;
  isOfficial: boolean;
  status?: 'confirmed' | 'pending_confirmation';
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
  uncertainNotes?: string;
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
  uncertainNotes?: string;
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
