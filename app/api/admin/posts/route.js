import { NextResponse } from 'next/server';
import { getAllPosts, savePost, generateSlug } from '@/lib/blog';
import { requireAuth } from '@/lib/auth';

export async function GET(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const posts = await getAllPosts({ includeUnpublished: true });
  return NextResponse.json(posts);
}

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { frontmatter, content } = await request.json();
  // Always generate slug server-side from title; reject client-supplied slug
  const slug = generateSlug(frontmatter.title || 'untitled');
  const now = new Date().toISOString();
  const fm = {
    ...frontmatter,
    slug,
    status: frontmatter.status || 'draft',
    createdAt: now,
    updatedAt: now,
  };
  await savePost(slug, fm, content || '');
  return NextResponse.json({ slug });
}
