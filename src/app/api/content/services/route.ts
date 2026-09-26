import { NextResponse } from 'next/server';
import { getCMSServices } from '@/lib/cms/store';

export async function GET() {
  try {
    const services = await getCMSServices(true);
    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error('Failed to load services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load services' },
      { status: 500 }
    );
  }
}
