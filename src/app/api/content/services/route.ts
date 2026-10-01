import { NextResponse } from 'next/server';
import { getCMSServices } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const services = await getCMSServices(true);
    return NextResponse.json(
      { success: true, services },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Failed to load services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load services' },
      { status: 500 }
    );
  }
}
