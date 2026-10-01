import crypto from 'crypto';
import { AdminSession } from '@/types/cms';

export const ADMIN_COOKIE_NAME = 'lcb_admin_session';

const DEFAULT_ADMIN_USERNAME = 'admin@lcbbrigade.com';
const DEFAULT_ADMIN_PASSWORD = 'LCB@Admin2026!';
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  'lcb-brigade-lions-district-317f-secret-key-2026-cms';

// Session duration: 7 days
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
  };
}

/**
 * Validates admin credentials using timing-safe comparison
 */
export function validateAdminCredentials(
  user: string,
  pass: string
): boolean {
  const { username, password } = getAdminCredentials();

  // If password is not configured in environment variables, reject authentication
  if (!password) {
    console.error(
      'CMS Security Error: ADMIN_PASSWORD environment variable is not set.'
    );
    return false;
  }

  const normalizedUser = (user || '').trim().toLowerCase();
  const expectedUser = username.trim().toLowerCase();

  // Accept primary admin email/username or 'admin' identifier
  const isUsernameMatch =
    normalizedUser === expectedUser || normalizedUser === 'admin';

  if (!isUsernameMatch) {
    return false;
  }

  const passBuf = Buffer.from(pass || '');
  const expectedPassBuf = Buffer.from(password);

  if (passBuf.length !== expectedPassBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(passBuf, expectedPassBuf);
}

/**
 * Creates an HMAC signed session token
 */
export function createSessionToken(username: string): string {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload = JSON.stringify({
    username,
    role: 'admin',
    expiresAt,
  });

  const base64Payload = Buffer.from(payload).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(base64Payload)
    .digest('base64url');

  return `${base64Payload}.${signature}`;
}

/**
 * Verifies an HMAC signed session token
 */
export function verifySessionToken(token?: string | null): AdminSession | null {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [base64Payload, signature] = parts;

  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(base64Payload)
    .digest('base64url');

  const sigBuf = Buffer.from(signature);
  const expectedSigBuf = Buffer.from(expectedSignature);

  if (sigBuf.length !== expectedSigBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expectedSigBuf)) return null;

  try {
    const jsonStr = Buffer.from(base64Payload, 'base64url').toString('utf8');
    const session = JSON.parse(jsonStr) as AdminSession;

    if (!session || session.role !== 'admin') return null;
    if (Date.now() > session.expiresAt) return null;

    return session;
  } catch {
    return null;
  }
}

/**
 * Extracts and verifies the admin session from an incoming Request object (Cookie or Authorization header)
 */
export function getAdminSessionFromRequest(
  request: Request
): AdminSession | null {
  // 1. Try Cookie header
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parseCookies(cookieHeader);
  const token = cookies[ADMIN_COOKIE_NAME];

  if (token) {
    const session = verifySessionToken(token);
    if (session) return session;
  }

  // 2. Try Authorization: Bearer <token>
  const authHeader = request.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const bearerToken = authHeader.substring(7).trim();
    const session = verifySessionToken(bearerToken);
    if (session) return session;
  }

  return null;
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const result: Record<string, string> = {};
  cookieHeader.split(';').forEach((cookie) => {
    const [name, ...rest] = cookie.split('=');
    if (name) {
      result[name.trim()] = rest.join('=').trim();
    }
  });
  return result;
}
