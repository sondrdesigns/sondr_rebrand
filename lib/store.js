// Persistent storage layer. Production writes require Redis; local development
// uses the committed content directory so CRUD can be exercised without cloud credentials.
import fs from 'fs/promises';
import path from 'path';

const IS_VERCEL = !!process.env.VERCEL;
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const USE_REDIS = !!(REDIS_URL && REDIS_TOKEN);
const REPO_BASE = path.join(process.cwd(), 'content');
const FS_BASE = REPO_BASE;

export class StorageUnavailableError extends Error {
  constructor() {
    super('Persistent database is not connected. Connect Upstash Redis and redeploy.');
    this.name = 'StorageUnavailableError';
    this.code = 'STORAGE_UNAVAILABLE';
  }
}

export function getStoreStatus() {
  if (USE_REDIS) return { mode: 'redis', writable: true };
  if (IS_VERCEL) return { mode: 'repository', writable: false };
  return { mode: 'filesystem', writable: true };
}

export function assertStoreWritable() {
  if (IS_VERCEL && !USE_REDIS) throw new StorageUnavailableError();
}

let _kv;
async function kv() {
  if (!_kv) {
    const mod = await import('@vercel/kv');
    _kv = mod.createClient({ url: REDIS_URL, token: REDIS_TOKEN });
  }
  return _kv;
}

export async function checkStoreConnection() {
  const status = getStoreStatus();
  if (!USE_REDIS) return status;
  try {
    const store = await kv();
    await store.ping();
    return { ...status, connected: true };
  } catch (error) {
    return { ...status, writable: false, connected: false, error: error.message };
  }
}

const jsonSeedChecks = new Set();

// Seed KV from committed JSON content once per type. This keeps first deploys
// populated while still allowing admin deletes to stay deleted afterward.
export async function seedKVJsonTypeIfNeeded(type) {
  if (!USE_REDIS || jsonSeedChecks.has(type)) return;

  const flagName = `${type}:seeded`;
  const alreadySeeded = await storeGetFlag(flagName);
  if (alreadySeeded) {
    jsonSeedChecks.add(type);
    return;
  }

  try {
    const existingIds = await storeList(type);
    const dir = path.join(REPO_BASE, type);
    const files = await fs.readdir(dir);

    for (const file of files.filter(f => f.endsWith('.json') && f !== '.gitkeep')) {
      const id = file.replace('.json', '');
      if (existingIds.includes(id)) continue;

      try {
        const data = JSON.parse(await fs.readFile(path.join(dir, file), 'utf8'));
        await storeSet(type, id, data);
      } catch {}
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }

  await storeSetFlag(flagName, '1');
  jsonSeedChecks.add(type);
}

export async function storeList(type) {
  if (USE_REDIS) {
    const store = await kv();
    return (await store.smembers(`${type}:index`)) || [];
  }
  const dir = path.join(FS_BASE, type);
  let files;
  try {
    files = await fs.readdir(dir);
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }
  return files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
}

export async function storeGet(type, id) {
  if (USE_REDIS) {
    const store = await kv();
    const val = await store.get(`${type}:${id}`);
    if (val == null) throw new Error(`Not found: ${type}/${id}`);
    return val;
  }
  const raw = await fs.readFile(path.join(FS_BASE, type, `${id}.json`), 'utf8');
  return JSON.parse(raw);
}

export async function storeSet(type, id, data) {
  if (USE_REDIS) {
    const store = await kv();
    await store.set(`${type}:${id}`, data);
    await store.sadd(`${type}:index`, id);
    return;
  }
  assertStoreWritable();
  const dir = path.join(FS_BASE, type);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${id}.json`), JSON.stringify(data, null, 2), 'utf8');
}

export async function storeDel(type, id) {
  if (USE_REDIS) {
    const store = await kv();
    await store.del(`${type}:${id}`);
    await store.srem(`${type}:index`, id);
    return;
  }
  assertStoreWritable();
  try {
    await fs.unlink(path.join(FS_BASE, type, `${id}.json`));
  } catch (err) {
    if (err?.code !== 'ENOENT') throw err;
  }
}

// One-bit flags used to track first-run state (e.g. "has blog been seeded?").
// On filesystem these are no-ops — flags are only meaningful in KV.
export async function storeGetFlag(name) {
  if (!USE_REDIS) return null;
  const store = await kv();
  return store.get(`_flag:${name}`);
}

export async function storeSetFlag(name, value) {
  if (!USE_REDIS) return;
  const store = await kv();
  await store.set(`_flag:${name}`, value);
}
