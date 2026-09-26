import { NextResponse } from 'next/server';
import { getCMSVideos } from '@/lib/cms/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const serviceId = searchParams.get('serviceId') || undefined;

    const videos = await getCMSVideos({
      category,
      serviceId,
      publishedOnly: true,
    });

    return NextResponse.json({ success: true, videos });
  } catch (error) {
    console.error('Failed to load videos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load videos' },
      { status: 500 }
    );
  }
}
