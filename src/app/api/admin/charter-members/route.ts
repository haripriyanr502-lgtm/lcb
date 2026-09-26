import { NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from '@/lib/cms/auth';
import {
  getCMSCharterMembers,
  saveCMSCharterMember,
  deleteCMSCharterMember,
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
    const members = await getCMSCharterMembers(false);
    return NextResponse.json({ success: true, members });
  } catch (error) {
    console.error('Failed to get charter members:', error);
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
    const { name, role } = body;

    if (!name || !role) {
      return NextResponse.json(
        { success: false, error: 'Name and role/position are required' },
        { status: 400 }
      );
    }

    const member = await saveCMSCharterMember(body);
    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Failed to create charter member:', error);
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
        { success: false, error: 'Member ID is required for update' },
        { status: 400 }
      );
    }

    const member = await saveCMSCharterMember(body);
    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Failed to update charter member:', error);
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
        { success: false, error: 'Member ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteCMSCharterMember(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Failed to delete charter member:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
