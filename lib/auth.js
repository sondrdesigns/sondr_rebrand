import { NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;

function getSecret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error('ADMIN_SESSION_SECRET is not set');
  return s;
}

async function hmacHex(secret, payload) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function generateSessionToken() {
  const secret = getSecret();
  const timestamp = Date.now().toString();
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0')).join('');
  const sig = await hmacHex(secret, `${timestamp}:${nonce}`);
  return `${timestamp}:${nonce}:${sig}`;
}

export async function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;
  try {
    const secret = getSecret();
    const parts = token.split(':');
    if (parts.length !== 3) return false;
    const [timestamp, nonce, sig] = parts;
    const age = Date.now() - Number(timestamp);
    if (age < 0 || age > SESSION_TTL) return false;
    const expected = await hmacHex(secret, `${timestamp}:${nonce}`);
    if (sig.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
    return diff === 0;
  } catch { return false; }
}

export async function requireAuth(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!await verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export { COOKIE_NAME };
