import fs from 'fs/promises';
import path from 'path';
import {
  CMSCharterMember,
  CMSHistoryEntry,
  CMSService,
  CMSVideo,
  CMSMeeting,
  CMSStoreData,
} from '@/types/cms';
import { CharterMemberNode } from '@/types';
import { SERVICES_DATA } from '@/data/services';
import {
  SERVICE_VIDEOS,
  JOINT_MEETING_VIDEOS,
  EVENT_VIDEOS,
} from '@/data/videos';
import { HISTORICAL_TENURES } from '@/data/team';
import { MEETINGS_DATA } from '@/data/meetings';

const STORE_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cms_store.json');

/**
 * Builds initial seed data strictly from verified existing data sources
 */
function createInitialSeedData(): CMSStoreData {
  const now = new Date().toISOString();

  // 1. Seed Charter Members (Flattened from verified tree hierarchy)
  const charterMembers: CMSCharterMember[] = [
    {
      id: 'charter-root-nagaraj',
      name: 'Ln. L. A. V. Nagaraj and Team',
      role: 'Founding Charter President',
      charterYear: 'April 2021',
      parentId: null,
      description:
        'Charter President who anchored the foundation of LCB Brigade in April 2021. Brought prior leadership experience from Rotary International service projects and mobilized ₹31 Lakh CSR funds for community welfare.',
      historicalInfo:
        'Confirmed Founding President • Rotary International Experience • ₹31 Lakh CSR Raised',
      order: 1,
      status: 'confirmed',
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'charter-exec-vp1',
      name: 'Charter 1st Vice President',
      role: 'Office of Charter 1st Vice President',
      charterYear: 'April 2021',
      parentId: 'charter-root-nagaraj',
      description:
        'Charter Vice President assisting the presidential office and supervising early service directives.',
      historicalInfo:
        'Charter executive position awaiting official member submission from Directorate archives.',
      order: 2,
      status: 'pending_team_submission',
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'charter-branch-service',
      name: 'Charter Community Service Director',
      role: 'Director — Service Directives',
      charterYear: 'April 2021',
      parentId: 'charter-exec-vp1',
      description: 'Coordinated food distribution with ISKCON & tree plantation.',
      historicalInfo: 'Awaiting team submission of directorate details.',
      order: 3,
      status: 'pending_team_submission',
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'charter-exec-secretary',
      name: 'Charter Secretary',
      role: 'Office of Charter Secretary',
      charterYear: 'April 2021',
      parentId: 'charter-root-nagaraj',
      description:
        'Charter Secretariat custodian of founding minutes, district correspondence, and official charter roll.',
      historicalInfo:
        'Charter secretariat lead awaiting official member submission from Directorate archives.',
      order: 4,
      status: 'pending_team_submission',
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'charter-branch-cadre1',
      name: 'Inducted Charter Cadre (Section A)',
      role: 'Charter Members Roll Slot',
      charterYear: 'April 2021',
      parentId: 'charter-exec-secretary',
      description: 'Awaiting team submission of founding inducted members roster.',
      historicalInfo: 'Slot for inducted charter member roll.',
      order: 5,
      status: 'pending_team_submission',
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'charter-exec-treasurer',
      name: 'Charter Treasurer',
      role: 'Office of Charter Treasurer',
      charterYear: 'April 2021',
      parentId: 'charter-root-nagaraj',
      description:
        'Charter Financial Custodian overseeing initial statutory accounts and the ₹31 Lakh CSR disbursement.',
      historicalInfo:
        'Charter Financial Custodian awaiting official member submission from Directorate archives.',
      order: 6,
      status: 'pending_team_submission',
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'charter-branch-cadre2',
      name: 'Inducted Charter Cadre (Section B)',
      role: 'Charter Members Roll Slot',
      charterYear: 'April 2021',
      parentId: 'charter-exec-treasurer',
      description: 'Awaiting team submission of founding inducted members roster.',
      historicalInfo: 'Slot for inducted charter member roll.',
      order: 7,
      status: 'pending_team_submission',
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    },
  ];

  // 2. Seed History Entries
  const historyEntries: CMSHistoryEntry[] = HISTORICAL_TENURES.map(
    (tenure, idx) => ({
      id: tenure.id,
      tenureYear: tenure.tenureYear,
      president: tenure.president,
      teamTitle: tenure.teamTitle,
      termDates: tenure.termDates,
      summary: tenure.summary,
      activities: tenure.keyInitiatives || [],
      backgroundNote: tenure.backgroundNote || '',
      images: [],
      videos: [],
      displayOrder: idx + 1,
      isPublished: true,
      createdAt: now,
      updatedAt: now,
    })
  );

  // 3. Seed Services
  const services: CMSService[] = SERVICES_DATA.map((srv, idx) => ({
    id: srv.id,
    name: srv.name,
    category: srv.category,
    year: srv.year,
    partnerAssociation: srv.partnerAssociation,
    shortDescription: srv.shortDescription,
    fullDescription: srv.fullDescription,
    impactMetrics: srv.impactMetrics,
    iconName: srv.iconName,
    displayOrder: idx + 1,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  }));

  // 4. Seed Videos
  const allVideosRaw = [
    ...SERVICE_VIDEOS.map((v) => ({ ...v, category: 'service' as const })),
    ...JOINT_MEETING_VIDEOS.map((v) => ({
      ...v,
      category: 'joint_meeting' as const,
    })),
    ...EVENT_VIDEOS.map((v) => ({ ...v, category: 'event' as const })),
  ];

  const videos: CMSVideo[] = allVideosRaw.map((v, idx) => ({
    id: v.id,
    youtubeId: v.youtubeId,
    title: v.title,
    category: v.category,
    serviceId: v.serviceId,
    description: v.description,
    channel: v.channel,
    requiresVerification: v.requiresVerification,
    verificationNote: v.verificationNote,
    displayOrder: idx + 1,
    isPublished: v.isPublished !== false,
    createdAt: now,
    updatedAt: now,
  }));

  // 5. Seed Meetings
  const meetings: CMSMeeting[] = MEETINGS_DATA.map((m) => ({
    id: m.id,
    title: m.title,
    date: m.date,
    time: m.time,
    location: m.location,
    status: m.status,
    description: m.description,
    agenda: m.agenda,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  }));

  return {
    charterMembers,
    historyEntries,
    services,
    videos,
    meetings,
    lastUpdated: now,
  };
}

const TMP_STORE_FILE_PATH = path.join('/tmp', 'cms_store.json');

const KV_REST_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_REST_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'haripriyanr502-lgtm/lcb';

let inMemoryStore: CMSStoreData | null = null;

async function loadFromKV(): Promise<CMSStoreData | null> {
  if (!KV_REST_URL || !KV_REST_TOKEN) return null;
  try {
    const res = await fetch(`${KV_REST_URL}/get/lcb_cms_store`, {
      headers: { Authorization: `Bearer ${KV_REST_TOKEN}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const body = await res.json();
    if (body && body.result) {
      const parsed = typeof body.result === 'string' ? JSON.parse(body.result) : body.result;
      return parsed as CMSStoreData;
    }
  } catch (err) {
    console.error('CMS KV load warning:', err);
  }
  return null;
}

async function saveToKV(data: CMSStoreData): Promise<boolean> {
  if (!KV_REST_URL || !KV_REST_TOKEN) return false;
  try {
    const serialized = JSON.stringify(data);
    const res = await fetch(`${KV_REST_URL}/set/lcb_cms_store`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_REST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([serialized]),
    });
    return res.ok;
  } catch (err) {
    console.error('CMS KV save warning:', err);
    return false;
  }
}

async function syncToGitHub(data: CMSStoreData): Promise<void> {
  if (!GITHUB_TOKEN) return;
  try {
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/cms_store.json`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    let sha: string | undefined;
    if (getRes.ok) {
      const getJson = await getRes.json();
      sha = getJson.sha;
    }

    await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/cms_store.json`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'chore(cms): update persisted CMS store via Admin Portal',
          content,
          sha,
        }),
      }
    );
  } catch (err) {
    console.error('CMS GitHub sync warning:', err);
  }
}

/**
 * Loads the CMS Store from available persistence tiers:
 * 1. In-memory cache
 * 2. Remote KV (Upstash / Vercel KV)
 * 3. Serverless /tmp/cms_store.json
 * 4. Primary disk file src/data/cms_store.json
 * 5. Verified seed fallback
 */
export async function loadCMSStore(): Promise<CMSStoreData> {
  if (inMemoryStore) {
    return inMemoryStore;
  }

  // Tier 1: Try Remote KV
  const kvData = await loadFromKV();
  if (kvData) {
    inMemoryStore = kvData;
    return kvData;
  }

  // Tier 2: Try /tmp/cms_store.json on serverless environments
  try {
    const tmpData = await fs.readFile(TMP_STORE_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(tmpData) as CMSStoreData;
    if (parsed && Array.isArray(parsed.services)) {
      inMemoryStore = parsed;
      return parsed;
    }
  } catch {
    // /tmp does not exist yet or is not readable, proceed to primary file
  }

  // Tier 3: Primary codebase file
  try {
    const rawData = await fs.readFile(STORE_FILE_PATH, 'utf-8');
    inMemoryStore = JSON.parse(rawData) as CMSStoreData;
    return inMemoryStore;
  } catch (err: unknown) {
    const isNotFound = (err as NodeJS.ErrnoException).code === 'ENOENT';
    if (isNotFound) {
      const initial = createInitialSeedData();
      await saveCMSStore(initial);
      inMemoryStore = initial;
      return initial;
    }
    console.error('Error loading cms_store.json, creating fallback:', err);
    const initial = createInitialSeedData();
    inMemoryStore = initial;
    return initial;
  }
}

/**
 * Saves the CMS Store across persistence tiers:
 * - Updates in-memory store
 * - Persists to Upstash/Vercel KV if configured
 * - Syncs to GitHub repository if GITHUB_TOKEN configured
 * - Writes to primary disk path or serverless /tmp fallback if read-only
 */
export async function saveCMSStore(data: CMSStoreData): Promise<void> {
  data.lastUpdated = new Date().toISOString();
  inMemoryStore = data;

  // Sync to Cloud KV (non-blocking failure)
  saveToKV(data).catch(() => {});

  // Sync to GitHub repo (non-blocking failure)
  syncToGitHub(data).catch(() => {});

  const serialized = JSON.stringify(data, null, 2);

  // Try writing to primary codebase path first (works locally and on traditional servers)
  try {
    const tempPath = `${STORE_FILE_PATH}.tmp-${Date.now()}`;
    await fs.mkdir(path.dirname(STORE_FILE_PATH), { recursive: true });
    await fs.writeFile(tempPath, serialized, 'utf-8');
    await fs.rename(tempPath, STORE_FILE_PATH);
    return;
  } catch {
    // If primary file write fails due to read-only filesystem (common on Vercel/Lambda EROFS)
    // fall back immediately to writable /tmp directory
    try {
      const tmpTemp = `${TMP_STORE_FILE_PATH}.tmp-${Date.now()}`;
      await fs.mkdir(path.dirname(TMP_STORE_FILE_PATH), { recursive: true });
      await fs.writeFile(tmpTemp, serialized, 'utf-8');
      await fs.rename(tmpTemp, TMP_STORE_FILE_PATH);
    } catch (tmpErr) {
      console.error('Fatal: Failed to write to both primary and /tmp store:', tmpErr);
    }
  }
}

/* =========================================================================
   CHARTER MEMBERS CMS OPERATIONS
   ========================================================================= */

export async function getCMSCharterMembers(
  publishedOnly = false
): Promise<CMSCharterMember[]> {
  const store = await loadCMSStore();
  let list = store.charterMembers || [];
  if (publishedOnly) {
    list = list.filter((m) => m.isPublished);
  }
  return list.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getCMSCharterMemberById(
  id: string
): Promise<CMSCharterMember | null> {
  const store = await loadCMSStore();
  return store.charterMembers.find((m) => m.id === id) || null;
}

export async function saveCMSCharterMember(
  data: Partial<CMSCharterMember> & { name: string; role: string }
): Promise<CMSCharterMember> {
  const store = await loadCMSStore();
  const now = new Date().toISOString();

  let member: CMSCharterMember;

  if (data.id) {
    const existingIndex = store.charterMembers.findIndex((m) => m.id === data.id);
    if (existingIndex >= 0) {
      member = {
        ...store.charterMembers[existingIndex],
        ...data,
        updatedAt: now,
      };
      store.charterMembers[existingIndex] = member;
    } else {
      member = {
        id: data.id,
        name: data.name,
        role: data.role,
        charterYear: data.charterYear || 'April 2021',
        parentId: data.parentId || null,
        photoUrl: data.photoUrl,
        description: data.description,
        historicalInfo: data.historicalInfo,
        sponsorName: data.sponsorName,
        order: data.order ?? store.charterMembers.length + 1,
        status: data.status || 'pending_team_submission',
        isPublished: data.isPublished !== false,
        createdAt: now,
        updatedAt: now,
      };
      store.charterMembers.push(member);
    }
  } else {
    const newId = `charter-member-${Date.now()}`;
    member = {
      id: newId,
      name: data.name,
      role: data.role,
      charterYear: data.charterYear || 'April 2021',
      parentId: data.parentId || null,
      photoUrl: data.photoUrl,
      description: data.description,
      historicalInfo: data.historicalInfo,
      sponsorName: data.sponsorName,
      order: data.order ?? store.charterMembers.length + 1,
      status: data.status || 'pending_team_submission',
      isPublished: data.isPublished !== false,
      createdAt: now,
      updatedAt: now,
    };
    store.charterMembers.push(member);
  }

  await saveCMSStore(store);
  return member;
}

export async function deleteCMSCharterMember(id: string): Promise<boolean> {
  const store = await loadCMSStore();
  const initialLen = store.charterMembers.length;
  // Re-parent children to null or parent's parent
  const target = store.charterMembers.find((m) => m.id === id);
  const fallbackParent = target ? target.parentId : null;

  store.charterMembers = store.charterMembers
    .filter((m) => m.id !== id)
    .map((m) => (m.parentId === id ? { ...m, parentId: fallbackParent } : m));

  if (store.charterMembers.length !== initialLen) {
    await saveCMSStore(store);
    return true;
  }
  return false;
}

/**
 * Builds an expandable hierarchical CharterMemberNode[] tree dynamically from CMS records
 */
export async function buildDynamicCharterTree(
  publishedOnly = true
): Promise<CharterMemberNode[]> {
  const members = await getCMSCharterMembers(publishedOnly);

  const nodeMap = new Map<string, CharterMemberNode>();

  // Convert each CMS member to a CharterMemberNode
  members.forEach((m) => {
    nodeMap.set(m.id, {
      id: m.id,
      name: m.name,
      position: m.role,
      charterYear: m.charterYear || 'April 2021',
      status: m.status,
      sponsorName: m.sponsorName,
      sponsorId: m.parentId,
      bio: m.description,
      notes: m.historicalInfo,
      level: m.parentId ? 2 : 1,
      parentId: m.parentId,
      children: [],
      isCustomAdded: false,
    });
  });

  const roots: CharterMemberNode[] = [];

  members.forEach((m) => {
    const currentNode = nodeMap.get(m.id);
    if (!currentNode) return;

    if (!m.parentId) {
      currentNode.level = 1;
      roots.push(currentNode);
    } else {
      const parentNode = nodeMap.get(m.parentId);
      if (parentNode) {
        currentNode.level = parentNode.level + 1;
        parentNode.children = parentNode.children || [];
        parentNode.children.push(currentNode);
      } else {
        // If parent not found, attach under root
        if (roots[0]) {
          currentNode.level = 2;
          roots[0].children = roots[0].children || [];
          roots[0].children.push(currentNode);
        } else {
          roots.push(currentNode);
        }
      }
    }
  });

  return roots;
}

/* =========================================================================
   ORGANIZATIONAL HISTORY CMS OPERATIONS
   ========================================================================= */

export async function getCMSHistory(
  publishedOnly = false
): Promise<CMSHistoryEntry[]> {
  const store = await loadCMSStore();
  let list = store.historyEntries || [];
  if (publishedOnly) {
    list = list.filter((h) => h.isPublished);
  }
  return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

export async function getCMSHistoryById(
  id: string
): Promise<CMSHistoryEntry | null> {
  const store = await loadCMSStore();
  return store.historyEntries.find((h) => h.id === id) || null;
}

export async function saveCMSHistory(
  data: Partial<CMSHistoryEntry> & { tenureYear: string; president: string }
): Promise<CMSHistoryEntry> {
  const store = await loadCMSStore();
  const now = new Date().toISOString();

  let entry: CMSHistoryEntry;

  if (data.id) {
    const idx = store.historyEntries.findIndex((h) => h.id === data.id);
    if (idx >= 0) {
      entry = {
        ...store.historyEntries[idx],
        ...data,
        updatedAt: now,
      };
      store.historyEntries[idx] = entry;
    } else {
      entry = {
        id: data.id,
        tenureYear: data.tenureYear,
        president: data.president,
        teamTitle:
          data.teamTitle ||
          `${data.tenureYear} — ${data.president}, President and Team`,
        termDates: data.termDates || data.tenureYear,
        summary: data.summary || '',
        activities: data.activities || [],
        backgroundNote: data.backgroundNote,
        images: data.images || [],
        videos: data.videos || [],
        displayOrder: data.displayOrder ?? store.historyEntries.length + 1,
        isPublished: data.isPublished !== false,
        createdAt: now,
        updatedAt: now,
      };
      store.historyEntries.push(entry);
    }
  } else {
    const newId = `tenure-${Date.now()}`;
    entry = {
      id: newId,
      tenureYear: data.tenureYear,
      president: data.president,
      teamTitle:
        data.teamTitle ||
        `${data.tenureYear} — ${data.president}, President and Team`,
      termDates: data.termDates || data.tenureYear,
      summary: data.summary || '',
      activities: data.activities || [],
      backgroundNote: data.backgroundNote,
      images: data.images || [],
      videos: data.videos || [],
      displayOrder: data.displayOrder ?? store.historyEntries.length + 1,
      isPublished: data.isPublished !== false,
      createdAt: now,
      updatedAt: now,
    };
    store.historyEntries.push(entry);
  }

  await saveCMSStore(store);
  return entry;
}

export async function deleteCMSHistory(id: string): Promise<boolean> {
  const store = await loadCMSStore();
  const initialLen = store.historyEntries.length;
  store.historyEntries = store.historyEntries.filter((h) => h.id !== id);
  if (store.historyEntries.length !== initialLen) {
    await saveCMSStore(store);
    return true;
  }
  return false;
}

/* =========================================================================
   SERVICES CMS OPERATIONS
   ========================================================================= */

export async function getCMSServices(
  publishedOnly = false
): Promise<CMSService[]> {
  const store = await loadCMSStore();
  let list = store.services || [];
  if (publishedOnly) {
    list = list.filter((s) => s.isPublished);
  }
  return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

export async function getCMSServiceById(id: string): Promise<CMSService | null> {
  const store = await loadCMSStore();
  return store.services.find((s) => s.id === id) || null;
}

export async function saveCMSService(
  data: Partial<CMSService> & { name: string; category: string }
): Promise<CMSService> {
  const store = await loadCMSStore();
  const now = new Date().toISOString();

  let service: CMSService;

  if (data.id) {
    const idx = store.services.findIndex((s) => s.id === data.id);
    if (idx >= 0) {
      service = {
        ...store.services[idx],
        ...data,
        updatedAt: now,
      };
      store.services[idx] = service;
    } else {
      service = {
        id: data.id,
        name: data.name,
        category: data.category,
        year: data.year,
        partnerAssociation: data.partnerAssociation,
        shortDescription: data.shortDescription || '',
        fullDescription: data.fullDescription || data.shortDescription || '',
        impactMetrics: data.impactMetrics,
        iconName: data.iconName || 'Users',
        videoIds: data.videoIds || [],
        images: data.images || [],
        displayOrder: data.displayOrder ?? store.services.length + 1,
        isPublished: data.isPublished !== false,
        createdAt: now,
        updatedAt: now,
      };
      store.services.push(service);
    }
  } else {
    // Generate clean slug from name
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const newId = `service-${slug || Date.now()}`;

    service = {
      id: newId,
      name: data.name,
      category: data.category,
      year: data.year,
      partnerAssociation: data.partnerAssociation,
      shortDescription: data.shortDescription || '',
      fullDescription: data.fullDescription || data.shortDescription || '',
      impactMetrics: data.impactMetrics,
      iconName: data.iconName || 'Users',
      videoIds: data.videoIds || [],
      images: data.images || [],
      displayOrder: data.displayOrder ?? store.services.length + 1,
      isPublished: data.isPublished !== false,
      createdAt: now,
      updatedAt: now,
    };
    store.services.push(service);
  }

  await saveCMSStore(store);
  return service;
}

export async function deleteCMSService(id: string): Promise<boolean> {
  const store = await loadCMSStore();
  const initialLen = store.services.length;
  store.services = store.services.filter((s) => s.id !== id);
  if (store.services.length !== initialLen) {
    await saveCMSStore(store);
    return true;
  }
  return false;
}

/* =========================================================================
   VIDEOS CMS OPERATIONS
   ========================================================================= */

export async function getCMSVideos(options?: {
  category?: string;
  serviceId?: string;
  publishedOnly?: boolean;
}): Promise<CMSVideo[]> {
  const store = await loadCMSStore();
  let list = store.videos || [];

  if (options?.publishedOnly) {
    list = list.filter((v) => v.isPublished);
  }
  if (options?.category) {
    list = list.filter((v) => v.category === options.category);
  }
  if (options?.serviceId) {
    list = list.filter((v) => v.serviceId === options.serviceId);
  }

  return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

export async function getCMSVideoById(id: string): Promise<CMSVideo | null> {
  const store = await loadCMSStore();
  return store.videos.find((v) => v.id === id || v.youtubeId === id) || null;
}

export async function saveCMSVideo(
  data: Partial<CMSVideo> & { youtubeId: string; title: string }
): Promise<CMSVideo> {
  const store = await loadCMSStore();
  const now = new Date().toISOString();

  // Extract clean 11-char YouTube ID if a full URL was pasted
  let cleanId = data.youtubeId.trim();
  const ytMatch = cleanId.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    cleanId = ytMatch[1];
  }

  let video: CMSVideo;

  if (data.id) {
    const idx = store.videos.findIndex((v) => v.id === data.id);
    if (idx >= 0) {
      video = {
        ...store.videos[idx],
        ...data,
        youtubeId: cleanId,
        updatedAt: now,
      };
      store.videos[idx] = video;
    } else {
      video = {
        id: data.id,
        youtubeId: cleanId,
        title: data.title,
        category: data.category || 'service',
        serviceId: data.serviceId,
        description: data.description,
        channel: data.channel || 'I am Bangalorean',
        requiresVerification: data.requiresVerification,
        verificationNote: data.verificationNote,
        displayOrder: data.displayOrder ?? store.videos.length + 1,
        isPublished: data.isPublished !== false,
        createdAt: now,
        updatedAt: now,
      };
      store.videos.push(video);
    }
  } else {
    // Generate ID from youtubeId or timestamp
    const newId = `vid-${cleanId}`;
    // Check for existing duplicate by youtubeId
    const existing = store.videos.find((v) => v.youtubeId === cleanId);
    if (existing) {
      video = {
        ...existing,
        ...data,
        youtubeId: cleanId,
        updatedAt: now,
      };
      const idx = store.videos.indexOf(existing);
      store.videos[idx] = video;
    } else {
      video = {
        id: newId,
        youtubeId: cleanId,
        title: data.title,
        category: data.category || 'service',
        serviceId: data.serviceId,
        description: data.description,
        channel: data.channel || 'I am Bangalorean',
        requiresVerification: data.requiresVerification,
        verificationNote: data.verificationNote,
        displayOrder: data.displayOrder ?? store.videos.length + 1,
        isPublished: data.isPublished !== false,
        createdAt: now,
        updatedAt: now,
      };
      store.videos.push(video);
    }
  }

  await saveCMSStore(store);
  return video;
}

export async function deleteCMSVideo(id: string): Promise<boolean> {
  const store = await loadCMSStore();
  const initialLen = store.videos.length;
  store.videos = store.videos.filter((v) => v.id !== id && v.youtubeId !== id);
  if (store.videos.length !== initialLen) {
    await saveCMSStore(store);
    return true;
  }
  return false;
}
