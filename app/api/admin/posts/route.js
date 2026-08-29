import { NextResponse } from 'next/server';
import { getAllPosts, savePost, generateSlug } from '@/lib/blog';

export async function GET() {
  const posts = await getAllPosts({ includeUnpublished: true });
  return NextResponse.json(posts);
}

export async function POST(request) {
  const { frontmatter, content } = await request.json();
  const slug = frontmatter.slug || generateSlug(frontmatter.title || 'untitled');
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
