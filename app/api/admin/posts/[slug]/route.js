import { NextResponse } from 'next/server';
import { getPost, savePost, deletePost } from '@/lib/blog';
import { requireAuth } from '@/lib/auth';

export async function GET(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { slug } = await params;
  const { frontmatter, content } = await request.json();
  const fm = { ...frontmatter, updatedAt: new Date().toISOString() };
  await savePost(slug, fm, content || '');
  return NextResponse.json({ slug });
}

export async function DELETE(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { slug } = await params;
  try {
    await deletePost(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to delete post', { slug, error });
    return NextResponse.json({ error: 'Unable to delete article' }, { status: 500 });
  }
}
