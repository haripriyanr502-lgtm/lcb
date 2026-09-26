import { NextResponse } from 'next/server';
import {
  validateAdminCredentials,
  createSessionToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/cms/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid administrator credentials' },
        { status: 401 }
      );
    }

    const token = createSessionToken(username);

    const response = NextResponse.json({
      success: true,
      user: {
        username,
        role: 'admin',
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}
