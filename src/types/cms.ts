/**
 * CMS Content Management System Types for LCB Brigade
 */

export interface CMSCharterMember {
  id: string;
  name: string;
  role: string;
  charterYear: string;
  parentId: string | null; // Sponsoring or lineage parent in the Family Tree
  photoUrl?: string;
  description?: string;
  historicalInfo?: string;
  sponsorName?: string;
  order: number;
  status: 'confirmed' | 'pending_team_submission';
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CMSHistoryEntry {
  id: string;
  tenureYear: string;
  president: string;
  teamTitle: string;
  termDates: string;
  summary: string;
  activities: string[];
  backgroundNote?: string;
  images?: string[];
  videos?: string[];
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CMSService {
  id: string;
  name: string;
  category: string;
  year?: string;
  partnerAssociation?: string;
  shortDescription: string;
  fullDescription: string;
  impactMetrics?: string;
  iconName: string;
  videoIds?: string[];
  images?: string[];
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CMSVideo {
  id: string;
  youtubeId: string;
  title: string;
  category: 'service' | 'joint_meeting' | 'event';
  serviceId?: string;
  description?: string;
  channel?: string;
  requiresVerification?: boolean;
  verificationNote?: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CMSMeeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed';
  description: string;
  agenda?: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CMSStoreData {
  charterMembers: CMSCharterMember[];
  historyEntries: CMSHistoryEntry[];
  services: CMSService[];
  videos: CMSVideo[];
  meetings: CMSMeeting[];
  lastUpdated: string;
}

export interface AdminSession {
  username: string;
  role: 'admin';
  expiresAt: number;
}
