import { NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from '@/lib/cms/auth';

export async function GET(request: Request) {
  const session = getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      username: session.username,
      role: session.role,
      expiresAt: session.expiresAt,
    },
  });
}
