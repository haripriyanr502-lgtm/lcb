import { NextResponse } from 'next/server';
import { buildDynamicCharterTree } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const tree = await buildDynamicCharterTree(true);
    return NextResponse.json(
      { success: true, tree },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Failed to load charter tree:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load charter tree' },
      { status: 500 }
    );
  }
}
