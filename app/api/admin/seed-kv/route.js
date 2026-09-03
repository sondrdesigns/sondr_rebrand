// One-time endpoint to seed Redis from committed content/ files.
// Safe to call multiple times because IDs already in Redis are skipped.
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getStoreStatus, storeSet, storeList, storeSetFlag } from '@/lib/store';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;

  if (getStoreStatus().mode !== 'redis') {
    return NextResponse.json({ error: 'Redis not configured. Connect Upstash Redis and redeploy.' }, { status: 503 });
  }

  const results = {};

  // Seed JSON-based content types (members, projects, tasks)
  for (const type of ['members', 'projects', 'tasks']) {
    const existingIds = await storeList(type);
    const dir = path.join(process.cwd(), 'content', type);
    let files = [];
    try { files = await fs.readdir(dir); } catch {
      results[type] = { seeded: 0, skipped: 0 };
      continue;
    }
    let seeded = 0, skipped = 0;
    for (const file of files.filter(f => f.endsWith('.json') && f !== '.gitkeep')) {
      const id = file.replace('.json', '');
      if (existingIds.includes(id)) { skipped++; continue; }
      try {
        const data = JSON.parse(await fs.readFile(path.join(dir, file), 'utf8'));
        await storeSet(type, id, data);
        seeded++;
      } catch {}
    }
    results[type] = { seeded, skipped };
    await storeSetFlag(`${type}:seeded`, '1');
  }

  // Seed blog posts (MDX format → stored as { frontmatter, content })
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const existingSlugs = await storeList('posts');
  let blogSeeded = 0, blogSkipped = 0;
  try {
    const files = await fs.readdir(blogDir);
    for (const file of files.filter(f => f.endsWith('.mdx'))) {
      const slug = file.replace('.mdx', '');
      if (existingSlugs.includes(slug)) { blogSkipped++; continue; }
      try {
        const raw = await fs.readFile(path.join(blogDir, file), 'utf8');
        const { data, content } = matter(raw);
        await storeSet('posts', slug, { frontmatter: { ...data, slug }, content });
        blogSeeded++;
      } catch {}
    }
    // Mark blog as seeded so auto-seed in blog.js doesn't run again
    await storeSetFlag('blog:seeded', '1');
  } catch {}
  results.posts = { seeded: blogSeeded, skipped: blogSkipped };

  return NextResponse.json({ ok: true, results });
}
