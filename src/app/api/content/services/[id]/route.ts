import { NextResponse } from 'next/server';
import { getCMSServiceById } from '@/lib/cms/store';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const service = await getCMSServiceById(id);

    if (!service || !service.isPublished) {
      return NextResponse.json(
        { success: false, error: 'Service not found or unpublished' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Failed to load service detail:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load service detail' },
      { status: 500 }
    );
  }
}
