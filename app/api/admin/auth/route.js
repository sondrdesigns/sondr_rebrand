import { NextResponse } from 'next/server';
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { generateSessionToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  const { email, password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD;

  if (
    !email || typeof email !== 'string' ||
    !password || typeof password !== 'string' ||
    !expected
  ) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Require a sondr email — allows @sondrdesigns.com, @sondr.com, @sondr.studio, @sondr, etc.
  const domain = email.trim().toLowerCase().split('@')[1] ?? '';
  const validDomain = domain === 'sondrdesigns.com' || domain === 'sondr' || domain.startsWith('sondr.');
  if (!validDomain) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Compare HMACs (always 32 bytes) — avoids timing and length oracles
  const salt = randomBytes(32);
  const h = (s) => createHmac('sha256', salt).update(s).digest();
  if (!timingSafeEqual(h(password), h(expected))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await generateSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
  return res;
}
