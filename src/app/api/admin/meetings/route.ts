import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSessionFromRequest } from '@/lib/cms/auth';
import {
  getCMSMeetings,
  saveCMSMeeting,
  deleteCMSMeeting,
} from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

function triggerRevalidation() {
  try {
    revalidatePath('/meetings');
    revalidatePath('/api/content/meetings');
    revalidatePath('/');
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
    const meetings = await getCMSMeetings(false);
    return NextResponse.json({ success: true, meetings });
  } catch (error) {
    console.error('Failed to get meetings:', error);
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
    const { title, date } = body;

    if (!title || !date) {
      return NextResponse.json(
        { success: false, error: 'Meeting title and date are required' },
        { status: 400 }
      );
    }

    const meeting = await saveCMSMeeting(body);
    triggerRevalidation();
    return NextResponse.json({ success: true, meeting });
  } catch (error) {
    console.error('Failed to create meeting:', error);
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
        { success: false, error: 'Meeting ID is required for update' },
        { status: 400 }
      );
    }

    const meeting = await saveCMSMeeting(body);
    triggerRevalidation();
    return NextResponse.json({ success: true, meeting });
  } catch (error) {
    console.error('Failed to update meeting:', error);
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
        { success: false, error: 'Meeting ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteCMSMeeting(id);
    if (success) {
      triggerRevalidation();
    }
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
