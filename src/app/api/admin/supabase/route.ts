import { NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from '@/lib/cms/auth';
import {
  getSupabaseAdminClient,
  getPostgresPool,
  SUPABASE_URL,
  SUPABASE_KEY,
  POSTGRES_URL,
} from '@/lib/supabase';
import { loadCMSStore, saveCMSStore } from '@/lib/cms/store';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin session required' },
      { status: 401 }
    );
  }

  const supabase = getSupabaseAdminClient();

  const statusInfo = {
    configured: Boolean(SUPABASE_URL && SUPABASE_KEY),
    urlPresent: Boolean(SUPABASE_URL),
    keyPresent: Boolean(SUPABASE_KEY),
    postgresUrlPresent: Boolean(POSTGRES_URL),
    tables: {
      charter_members: null as number | null,
      services: null as number | null,
      videos: null as number | null,
      history_entries: null as number | null,
      meetings: null as number | null,
    },
    tablesExist: false,
    errorMessage: null as string | null,
  };

  if (supabase) {
    try {
      const [membersRes, servicesRes, videosRes, historyRes, meetingsRes] =
        await Promise.all([
          supabase.from('charter_members').select('*', { count: 'exact', head: true }),
          supabase.from('services').select('*', { count: 'exact', head: true }),
          supabase.from('videos').select('*', { count: 'exact', head: true }),
          supabase.from('history_entries').select('*', { count: 'exact', head: true }),
          supabase.from('meetings').select('*', { count: 'exact', head: true }),
        ]);

      if (membersRes.error || servicesRes.error) {
        statusInfo.errorMessage =
          membersRes.error?.message || servicesRes.error?.message || 'Tables may not exist yet';
      } else {
        statusInfo.tablesExist = true;
        statusInfo.tables.charter_members = membersRes.count ?? 0;
        statusInfo.tables.services = servicesRes.count ?? 0;
        statusInfo.tables.videos = videosRes.count ?? 0;
        statusInfo.tables.history_entries = historyRes.count ?? 0;
        statusInfo.tables.meetings = meetingsRes.count ?? 0;
      }
    } catch (err: unknown) {
      statusInfo.errorMessage = err instanceof Error ? err.message : 'Failed to query Supabase tables';
    }
  }

  return NextResponse.json({ success: true, status: statusInfo });
}

export async function POST(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin session required' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const action = body.action || 'seed_baseline';

    if (action === 'migrate_schema') {
      const pool = getPostgresPool();
      if (!pool) {
        return NextResponse.json(
          {
            success: false,
            error:
              'POSTGRES_URL connection string not available in environment. Please execute src/lib/cms/supabase_schema.sql in the Supabase Dashboard SQL Editor.',
          },
          { status: 400 }
        );
      }

      const schemaSqlPath = path.join(
        process.cwd(),
        'src',
        'lib',
        'cms',
        'supabase_schema.sql'
      );
      const sqlContent = await fs.readFile(schemaSqlPath, 'utf-8');
      const client = await pool.connect();
      try {
        await client.query(sqlContent);
      } finally {
        client.release();
      }

      return NextResponse.json({
        success: true,
        message: 'Schema successfully executed against Supabase PostgreSQL database.',
      });
    }

    if (action === 'seed_baseline' || action === 'sync_all') {
      const store = await loadCMSStore(true);
      await saveCMSStore(store);

      const supabase = getSupabaseAdminClient();
      let tableCounts = null;
      if (supabase) {
        const [m, s, v, h, mt] = await Promise.all([
          supabase.from('charter_members').select('*', { count: 'exact', head: true }),
          supabase.from('services').select('*', { count: 'exact', head: true }),
          supabase.from('videos').select('*', { count: 'exact', head: true }),
          supabase.from('history_entries').select('*', { count: 'exact', head: true }),
          supabase.from('meetings').select('*', { count: 'exact', head: true }),
        ]);
        tableCounts = {
          charter_members: m.count ?? 0,
          services: s.count ?? 0,
          videos: v.count ?? 0,
          history_entries: h.count ?? 0,
          meetings: mt.count ?? 0,
        };
      }

      return NextResponse.json({
        success: true,
        message: 'CMS baseline data successfully synchronized to Supabase.',
        tableCounts,
        counts: {
          charterMembers: store.charterMembers.length,
          services: store.services.length,
          videos: store.videos.length,
          historyEntries: store.historyEntries.length,
          meetings: store.meetings.length,
        },
      });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error: unknown) {
    console.error('Supabase admin action error:', error);
    const msg = error instanceof Error ? error.message : 'Operation failed';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
