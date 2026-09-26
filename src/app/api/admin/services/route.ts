import { NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from '@/lib/cms/auth';
import {
  getCMSServices,
  saveCMSService,
  deleteCMSService,
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
    const services = await getCMSServices(false);
    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error('Failed to get services:', error);
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
    const { name, category } = body;

    if (!name || !category) {
      return NextResponse.json(
        { success: false, error: 'Service name and category are required' },
        { status: 400 }
      );
    }

    const service = await saveCMSService(body);
    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Failed to create service:', error);
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
        { success: false, error: 'Service ID is required for update' },
        { status: 400 }
      );
    }

    const service = await saveCMSService(body);
    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Failed to update service:', error);
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
        { success: false, error: 'Service ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteCMSService(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Failed to delete service:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
