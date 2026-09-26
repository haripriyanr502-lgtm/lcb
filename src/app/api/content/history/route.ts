import { NextResponse } from 'next/server';
import { getCMSHistory } from '@/lib/cms/store';

export async function GET() {
  try {
    const history = await getCMSHistory(true);
    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error('Failed to load history:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load history' },
      { status: 500 }
    );
  }
}
