import { NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || 'dev-secret-key-32chars!!';
const PAYLOAD = 'sondr-admin';

async function verifyToken(token) {
  if (!token) return false;
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw', enc.encode(SECRET_KEY),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(PAYLOAD));
    const expected = Array.from(new Uint8Array(sig))
      .map(b => b.toString(16).padStart(2, '0')).join('');
    return token === expected;
  } catch { return false; }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next();
  }
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const valid = await verifyToken(token);
  if (!valid) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
