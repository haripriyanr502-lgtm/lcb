import { NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from '@/lib/cms/auth';
import { loadCMSStore } from '@/lib/cms/store';

export async function GET(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin session required' },
      { status: 401 }
    );
  }

  try {
    const store = await loadCMSStore();

    const stats = {
      charterMembers: {
        total: store.charterMembers.length,
        published: store.charterMembers.filter((m) => m.isPublished).length,
        pendingDetails: store.charterMembers.filter(
          (m) => m.status === 'pending_team_submission'
        ).length,
      },
      historyEntries: {
        total: store.historyEntries.length,
        published: store.historyEntries.filter((h) => h.isPublished).length,
      },
      services: {
        total: store.services.length,
        published: store.services.filter((s) => s.isPublished).length,
      },
      videos: {
        total: store.videos.length,
        published: store.videos.filter((v) => v.isPublished).length,
        flaggedForVerification: store.videos.filter(
          (v) => v.requiresVerification
        ).length,
      },
      lastUpdated: store.lastUpdated,
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error('Failed to get admin stats:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
