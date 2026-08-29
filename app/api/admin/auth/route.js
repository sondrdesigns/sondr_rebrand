import { NextResponse } from 'next/server';
import { generateSessionToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD;
  // timing-safe compare
  if (!password || !expected || password.length !== expected.length ||
      !password.split('').every((c, i) => c === expected[i])) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  const token = await generateSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
  return res;
}
