// Persistent storage layer.
// On Vercel (KV_REST_API_URL present): uses Vercel KV (Redis) — survives across Lambda instances.
// Locally (no KV creds): falls back to the filesystem under content/.
import fs from 'fs/promises';
import path from 'path';

const USE_KV = !!process.env.KV_REST_API_URL;
const LOCAL_BASE = path.join(process.cwd(), 'content');

let _kv;
async function kv() {
  if (!_kv) {
    const mod = await import('@vercel/kv');
    _kv = mod.kv;
  }
  return _kv;
}

export async function storeList(type) {
  if (USE_KV) {
    const store = await kv();
    return (await store.smembers(`${type}:index`)) || [];
  }
  const dir = path.join(LOCAL_BASE, type);
  await fs.mkdir(dir, { recursive: true });
  const files = await fs.readdir(dir);
  return files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
}

export async function storeGet(type, id) {
  if (USE_KV) {
    const store = await kv();
    const val = await store.get(`${type}:${id}`);
    if (val == null) throw new Error(`Not found: ${type}/${id}`);
    return val;
  }
  const raw = await fs.readFile(path.join(LOCAL_BASE, type, `${id}.json`), 'utf8');
  return JSON.parse(raw);
}

export async function storeSet(type, id, data) {
  if (USE_KV) {
    const store = await kv();
    await store.set(`${type}:${id}`, data);
    await store.sadd(`${type}:index`, id);
    return;
  }
  const dir = path.join(LOCAL_BASE, type);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${id}.json`), JSON.stringify(data, null, 2), 'utf8');
}

export async function storeDel(type, id) {
  if (USE_KV) {
    const store = await kv();
    await store.del(`${type}:${id}`);
    await store.srem(`${type}:index`, id);
    return;
  }
  await fs.unlink(path.join(LOCAL_BASE, type, `${id}.json`));
}
