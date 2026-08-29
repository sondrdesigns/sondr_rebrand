// One-time endpoint to seed Vercel KV from committed content/ files.
// Call once after enabling KV: GET /api/admin/seed-kv
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { storeSet, storeList } from '@/lib/store';
import fs from 'fs/promises';
import path from 'path';

const TYPES = ['members', 'projects', 'tasks'];

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;

  if (!process.env.KV_REST_API_URL) {
    return NextResponse.json({ error: 'KV not configured — add a KV store in your Vercel dashboard.' }, { status: 503 });
  }

  const results = {};

  for (const type of TYPES) {
    const existingIds = await storeList(type);
    const dir = path.join(process.cwd(), 'content', type);
    let files = [];
    try {
      files = await fs.readdir(dir);
    } catch {
      results[type] = { seeded: 0, skipped: 0 };
      continue;
    }

    let seeded = 0;
    let skipped = 0;
    for (const file of files.filter(f => f.endsWith('.json'))) {
      const id = file.replace('.json', '');
      if (existingIds.includes(id)) { skipped++; continue; }
      try {
        const raw = await fs.readFile(path.join(dir, file), 'utf8');
        const data = JSON.parse(raw);
        await storeSet(type, id, data);
        seeded++;
      } catch {
        // skip malformed files
      }
    }
    results[type] = { seeded, skipped };
  }

  return NextResponse.json({ ok: true, results });
}
