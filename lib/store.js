// Persistent storage layer.
// With KV_REST_API_URL: Vercel KV (Redis) — truly persistent across Lambda instances.
// On Vercel without KV: /tmp (writable, survives warm starts, resets on cold start).
// Locally: filesystem under content/.
import fs from 'fs/promises';
import path from 'path';

const IS_VERCEL = !!process.env.VERCEL;
const USE_KV = !!process.env.KV_REST_API_URL;
const REPO_BASE = path.join(process.cwd(), 'content');
const TMP_BASE = '/tmp/sondr-content';
// On Vercel the deploy dir is read-only; only /tmp is writable.
const FS_BASE = IS_VERCEL ? TMP_BASE : REPO_BASE;

// Seed /tmp from committed content/ files on first Lambda invocation.
let seeded = false;
async function seedTmp() {
  if (!IS_VERCEL || USE_KV || seeded) return;
  seeded = true;
  try {
    await fs.cp(REPO_BASE, TMP_BASE, { recursive: true, force: false, errorOnExist: false });
  } catch {}
}

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
  await seedTmp();
  const dir = path.join(FS_BASE, type);
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
  await seedTmp();
  const raw = await fs.readFile(path.join(FS_BASE, type, `${id}.json`), 'utf8');
  return JSON.parse(raw);
}

export async function storeSet(type, id, data) {
  if (USE_KV) {
    const store = await kv();
    await store.set(`${type}:${id}`, data);
    await store.sadd(`${type}:index`, id);
    return;
  }
  await seedTmp();
  const dir = path.join(FS_BASE, type);
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
  await seedTmp();
  await fs.unlink(path.join(FS_BASE, type, `${id}.json`));
}
