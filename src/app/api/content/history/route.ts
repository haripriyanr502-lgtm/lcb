import { NextResponse } from 'next/server';
import { getCMSHistory } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const history = await getCMSHistory(true);
    return NextResponse.json(
      { success: true, history },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Failed to load history:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load history' },
      { status: 500 }
    );
  }
}
