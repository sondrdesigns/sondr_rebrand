import { NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;

async function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;
  try {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret) return false;
    const parts = token.split(':');
    if (parts.length !== 3) return false;
    const [timestamp, nonce, sig] = parts;
    const age = Date.now() - Number(timestamp);
    if (age < 0 || age > SESSION_TTL) return false;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw', enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sigBytes = await crypto.subtle.sign('HMAC', key, enc.encode(`${timestamp}:${nonce}`));
    const expected = Array.from(new Uint8Array(sigBytes))
      .map(b => b.toString(16).padStart(2, '0')).join('');
    if (sig.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
    return diff === 0;
  } catch { return false; }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!await verifyToken(token)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const res = NextResponse.next();
  if (pathname.startsWith('/api/admin/')) {
    res.headers.set('Cache-Control', 'private, no-store');
  }
  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
