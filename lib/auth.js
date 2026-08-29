// lib/auth.js
const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || 'dev-secret-key-32chars!!';
const COOKIE_NAME = 'admin_session';
const COOKIE_VALUE_PAYLOAD = 'sondr-admin';

async function getKey() {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function generateSessionToken() {
  const key = await getKey();
  const enc = new TextEncoder();
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(COOKIE_VALUE_PAYLOAD));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifySessionToken(token) {
  if (!token) return false;
  try {
    const expected = await generateSessionToken();
    return token === expected;
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
