import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Pool } from 'pg';
import {
  CMSCharterMember,
  CMSHistoryEntry,
  CMSMeeting,
  CMSService,
  CMSVideo,
} from '@/types/cms';

// =========================================================================
// ENVIRONMENT CONFIGURATION
// Supports Vercel + Supabase standard integration variables
// =========================================================================

export const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  '';

export const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

export const POSTGRES_URL =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  '';

let supabaseClient: SupabaseClient | null = null;
let pgPool: Pool | null = null;

/**
 * Returns a server-side Supabase client for administrative/CMS operations
 */
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return null;
  }
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return supabaseClient;
}

/**
 * Returns a PostgreSQL direct connection pool if connection string is configured
 */
export function getPostgresPool(): Pool | null {
  if (!POSTGRES_URL) {
    return null;
  }
  if (!pgPool) {
    pgPool = new Pool({
      connectionString: POSTGRES_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 10000,
    });
  }
  return pgPool;
}

// =========================================================================
// DATA MAPPERS (Database snake_case <-> TypeScript camelCase)
// =========================================================================

export type DbRow = Record<string, unknown>;

export function mapRowToCharterMember(row: DbRow): CMSCharterMember {
  return {
    id: String(row.id || ''),
    name: String(row.name || ''),
    role: String(row.role || ''),
    charterYear: String(row.charter_year || row.charterYear || 'April 2021'),
    parentId: row.parent_id !== undefined ? (row.parent_id as string | null) : ((row.parentId as string | null) ?? null),
    photoUrl: (row.photo_url || row.photoUrl) ? String(row.photo_url || row.photoUrl) : undefined,
    description: String(row.description || ''),
    historicalInfo: String(row.historical_info || row.historicalInfo || ''),
    sponsorName: (row.sponsor_name || row.sponsorName) ? String(row.sponsor_name || row.sponsorName) : undefined,
    order: Number(row.display_order ?? row.order ?? 0),
    status: (row.status as 'confirmed' | 'pending_team_submission') || 'confirmed',
    isPublished: row.is_published !== undefined ? Boolean(row.is_published) : Boolean(row.isPublished ?? true),
    createdAt: String(row.created_at || row.createdAt || new Date().toISOString()),
    updatedAt: String(row.updated_at || row.updatedAt || new Date().toISOString()),
  };
}

export function mapCharterMemberToRow(m: CMSCharterMember): Record<string, unknown> {
  return {
    id: m.id,
    name: m.name,
    role: m.role,
    charter_year: m.charterYear || 'April 2021',
    parent_id: m.parentId || null,
    photo_url: m.photoUrl || null,
    description: m.description || null,
    historical_info: m.historicalInfo || null,
    sponsor_name: m.sponsorName || null,
    display_order: m.order ?? 0,
    status: m.status || 'confirmed',
    is_published: m.isPublished ?? true,
    created_at: m.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function mapRowToService(row: DbRow): CMSService {
  let videoIds: string[] = [];
  if (Array.isArray(row.video_ids)) videoIds = row.video_ids as string[];
  else if (Array.isArray(row.videoIds)) videoIds = row.videoIds as string[];
  else if (typeof row.video_ids === 'string') {
    try { videoIds = JSON.parse(row.video_ids); } catch {}
  }

  let images: string[] = [];
  if (Array.isArray(row.images)) images = row.images as string[];
  else if (typeof row.images === 'string') {
    try { images = JSON.parse(row.images); } catch {}
  }

  return {
    id: String(row.id || ''),
    name: String(row.name || ''),
    category: String(row.category || ''),
    year: row.year ? String(row.year) : '2024–2025',
    partnerAssociation: (row.partner_association || row.partnerAssociation) ? String(row.partner_association || row.partnerAssociation) : undefined,
    shortDescription: String(row.short_description || row.shortDescription || ''),
    fullDescription: String(row.full_description || row.fullDescription || ''),
    impactMetrics: (row.impact_metrics || row.impactMetrics) ? String(row.impact_metrics || row.impactMetrics) : undefined,
    iconName: String(row.icon_name || row.iconName || 'Users'),
    videoIds,
    images,
    displayOrder: Number(row.display_order ?? row.displayOrder ?? 0),
    isPublished: row.is_published !== undefined ? Boolean(row.is_published) : Boolean(row.isPublished ?? true),
    createdAt: String(row.created_at || row.createdAt || new Date().toISOString()),
    updatedAt: String(row.updated_at || row.updatedAt || new Date().toISOString()),
  };
}

export function mapServiceToRow(s: CMSService): Record<string, unknown> {
  return {
    id: s.id,
    name: s.name,
    category: s.category,
    year: s.year || '2024–2025',
    partner_association: s.partnerAssociation || null,
    short_description: s.shortDescription || '',
    full_description: s.fullDescription || '',
    impact_metrics: s.impactMetrics || null,
    icon_name: s.iconName || 'Users',
    video_ids: s.videoIds || [],
    images: s.images || [],
    display_order: s.displayOrder ?? 0,
    is_published: s.isPublished ?? true,
    created_at: s.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function mapRowToVideo(row: DbRow): CMSVideo {
  return {
    id: String(row.id || ''),
    youtubeId: String(row.youtube_id || row.youtubeId || ''),
    title: String(row.title || ''),
    category: (row.category as 'service' | 'joint_meeting' | 'event') || 'service',
    serviceId: (row.service_id || row.serviceId) ? String(row.service_id || row.serviceId) : undefined,
    description: String(row.description || ''),
    channel: (row.channel) ? String(row.channel) : undefined,
    requiresVerification: Boolean(row.requires_verification ?? row.requiresVerification ?? false),
    verificationNote: (row.verification_note || row.verificationNote) ? String(row.verification_note || row.verificationNote) : undefined,
    displayOrder: Number(row.display_order ?? row.displayOrder ?? 0),
    isPublished: row.is_published !== undefined ? Boolean(row.is_published) : Boolean(row.isPublished ?? true),
    createdAt: String(row.created_at || row.createdAt || new Date().toISOString()),
    updatedAt: String(row.updated_at || row.updatedAt || new Date().toISOString()),
  };
}

export function mapVideoToRow(v: CMSVideo): Record<string, unknown> {
  return {
    id: v.id,
    youtube_id: v.youtubeId,
    title: v.title,
    category: v.category || 'service',
    service_id: v.serviceId || null,
    description: v.description || null,
    channel: v.channel || null,
    requires_verification: Boolean(v.requiresVerification ?? false),
    verification_note: v.verificationNote || null,
    display_order: v.displayOrder ?? 0,
    is_published: v.isPublished ?? true,
    created_at: v.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function mapRowToHistory(row: DbRow): CMSHistoryEntry {
  let activities: string[] = [];
  if (Array.isArray(row.activities)) activities = row.activities as string[];
  else if (typeof row.activities === 'string') {
    try { activities = JSON.parse(row.activities); } catch {}
  }

  let images: string[] = [];
  if (Array.isArray(row.images)) images = row.images as string[];
  else if (typeof row.images === 'string') {
    try { images = JSON.parse(row.images); } catch {}
  }

  let videos: string[] = [];
  if (Array.isArray(row.videos)) videos = row.videos as string[];
  else if (typeof row.videos === 'string') {
    try { videos = JSON.parse(row.videos); } catch {}
  }

  return {
    id: String(row.id || ''),
    tenureYear: String(row.tenure_year || row.tenureYear || ''),
    president: String(row.president || ''),
    teamTitle: String(row.team_title || row.teamTitle || ''),
    termDates: String(row.term_dates || row.termDates || ''),
    summary: String(row.summary || ''),
    activities,
    backgroundNote: (row.background_note || row.backgroundNote) ? String(row.background_note || row.backgroundNote) : undefined,
    images,
    videos,
    displayOrder: Number(row.display_order ?? row.displayOrder ?? 0),
    isPublished: row.is_published !== undefined ? Boolean(row.is_published) : Boolean(row.isPublished ?? true),
    createdAt: String(row.created_at || row.createdAt || new Date().toISOString()),
    updatedAt: String(row.updated_at || row.updatedAt || new Date().toISOString()),
  };
}

export function mapHistoryToRow(h: CMSHistoryEntry): Record<string, unknown> {
  return {
    id: h.id,
    tenure_year: h.tenureYear,
    president: h.president,
    team_title: h.teamTitle,
    term_dates: h.termDates,
    summary: h.summary,
    activities: h.activities || [],
    background_note: h.backgroundNote || null,
    images: h.images || [],
    videos: h.videos || [],
    display_order: h.displayOrder ?? 0,
    is_published: h.isPublished ?? true,
    created_at: h.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function mapRowToMeeting(row: DbRow): CMSMeeting {
  let agenda: string[] = [];
  if (Array.isArray(row.agenda)) agenda = row.agenda as string[];
  else if (typeof row.agenda === 'string') {
    try { agenda = JSON.parse(row.agenda); } catch {}
  }

  return {
    id: String(row.id || ''),
    title: String(row.title || ''),
    date: String(row.date || ''),
    time: String(row.time || ''),
    location: String(row.location || ''),
    status: (row.status as 'upcoming' | 'completed') || 'upcoming',
    description: String(row.description || ''),
    agenda,
    isPublished: row.is_published !== undefined ? Boolean(row.is_published) : Boolean(row.isPublished ?? true),
    createdAt: String(row.created_at || row.createdAt || new Date().toISOString()),
    updatedAt: String(row.updated_at || row.updatedAt || new Date().toISOString()),
  };
}

export function mapMeetingToRow(m: CMSMeeting): Record<string, unknown> {
  return {
    id: m.id,
    title: m.title,
    date: m.date,
    time: m.time,
    location: m.location,
    status: m.status || 'upcoming',
    description: m.description || '',
    agenda: m.agenda || [],
    is_published: m.isPublished ?? true,
    created_at: m.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
