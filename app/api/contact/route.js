import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_PROJECT = 5000;

// Simple in-memory rate limiter: max 3 submissions per IP per 60 seconds.
const rateLimitStore = new Map();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip) ?? { count: 0, resetAt: now + WINDOW_MS };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + WINDOW_MS;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);

  return entry.count > MAX_REQUESTS;
}

export async function POST(req) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'too many requests. please wait a minute and try again.' },
      { status: 429 },
    );
  }

  const { name, email, project } = await req.json();

  if (!name || !email || !project) {
    return NextResponse.json({ error: 'all fields are required.' }, { status: 400 });
  }

  if (name.length > MAX_NAME || email.length > MAX_EMAIL || project.length > MAX_PROJECT) {
    return NextResponse.json({ error: 'one or more fields exceed the maximum length.' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'please enter a valid email address.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'email service not configured.' }, { status: 503 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'website@sondrdesigns.com',
      to: 'studio@sondrdesigns.com',
      reply_to: email,
      subject: `new message from ${name}`,
      text: `name: ${name}\nemail: ${email}\n\n${project}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'failed to send.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
