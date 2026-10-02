import { NextResponse } from 'next/server';
import { getCMSMeetings } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const meetings = await getCMSMeetings(true);
    return NextResponse.json(
      { success: true, count: meetings.length, meetings },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Failed to load meetings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load meetings' },
      { status: 500 }
    );
  }
}
