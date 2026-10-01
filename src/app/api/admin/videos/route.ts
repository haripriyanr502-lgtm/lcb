import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSessionFromRequest } from '@/lib/cms/auth';
import { getCMSVideos, saveCMSVideo, deleteCMSVideo } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

function triggerRevalidation() {
  try {
    revalidatePath('/services');
    revalidatePath('/services/[id]', 'page');
    revalidatePath('/meetings');
    revalidatePath('/achievements');
    revalidatePath('/api/content/videos');
  } catch (err) {
    console.error('Revalidation error:', err);
  }
}

export async function GET(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin session required' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const serviceId = searchParams.get('serviceId') || undefined;

    const videos = await getCMSVideos({
      category,
      serviceId,
      publishedOnly: false, // Return drafts as well for admin
    });

    return NextResponse.json({ success: true, videos });
  } catch (error) {
    console.error('Failed to get videos:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
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
    const body = await request.json();
    const { youtubeId, title } = body;

    if (!youtubeId || !title) {
      return NextResponse.json(
        { success: false, error: 'YouTube ID / URL and title are required' },
        { status: 400 }
      );
    }

    const video = await saveCMSVideo(body);
    triggerRevalidation();
    return NextResponse.json({ success: true, video });
  } catch (error) {
    console.error('Failed to create video:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin session required' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'Video ID is required for update' },
        { status: 400 }
      );
    }

    const video = await saveCMSVideo(body);
    triggerRevalidation();
    return NextResponse.json({ success: true, video });
  } catch (error) {
    console.error('Failed to update video:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin session required' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Video ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteCMSVideo(id);
    if (success) {
      triggerRevalidation();
    }
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Failed to delete video:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
