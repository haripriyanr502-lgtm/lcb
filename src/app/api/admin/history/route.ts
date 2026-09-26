import { NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from '@/lib/cms/auth';
import {
  getCMSHistory,
  saveCMSHistory,
  deleteCMSHistory,
} from '@/lib/cms/store';

export async function GET(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin session required' },
      { status: 401 }
    );
  }

  try {
    const history = await getCMSHistory(false);
    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error('Failed to get history entries:', error);
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
    const { tenureYear, president } = body;

    if (!tenureYear || !president) {
      return NextResponse.json(
        { success: false, error: 'Tenure Year and President Name are required' },
        { status: 400 }
      );
    }

    const entry = await saveCMSHistory(body);
    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error('Failed to create history entry:', error);
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
        { success: false, error: 'History ID is required for update' },
        { status: 400 }
      );
    }

    const entry = await saveCMSHistory(body);
    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error('Failed to update history entry:', error);
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
        { success: false, error: 'History ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteCMSHistory(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Failed to delete history entry:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
