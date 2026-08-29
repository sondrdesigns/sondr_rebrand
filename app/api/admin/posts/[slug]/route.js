import { NextResponse } from 'next/server';
import { getPost, savePost, deletePost } from '@/lib/blog';

export async function GET(request, { params }) {
  try {
    const post = await getPost(params.slug);
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  const { frontmatter, content } = await request.json();
  const fm = { ...frontmatter, updatedAt: new Date().toISOString() };
  await savePost(params.slug, fm, content || '');
  return NextResponse.json({ slug: params.slug });
}

export async function DELETE(request, { params }) {
  try {
    await deletePost(params.slug);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
