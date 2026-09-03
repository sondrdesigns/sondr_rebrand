import { NextResponse } from 'next/server';
import { getPost, savePost, deletePost } from '@/lib/blog';
import { requireAuth } from '@/lib/auth';
import { adminErrorResponse, adminReadErrorResponse, validationError } from '@/lib/admin-response';

export async function GET(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    return NextResponse.json(post);
  } catch (error) {
    return adminReadErrorResponse(error, 'Unable to load article');
  }
}

export async function PUT(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { slug } = await params;
  try {
    const { frontmatter, content } = await request.json();
    if (!frontmatter?.title?.trim()) return validationError('Article title is required');
    const previous = await getPost(slug);
    const nextSlug = frontmatter.slug || slug;
    if (nextSlug !== slug) {
      const collision = await getPost(nextSlug).catch(error => {
        if (error?.code === 'ENOENT' || error?.message?.startsWith('Not found:')) return null;
        throw error;
      });
      if (collision) {
        return NextResponse.json({ error: 'That article slug is already in use' }, { status: 409 });
      }
    }
    const fm = {
      ...previous.frontmatter,
      ...frontmatter,
      title: frontmatter.title.trim(),
      slug: nextSlug,
      updatedAt: new Date().toISOString(),
    };
    await savePost(nextSlug, fm, content || '');
    if (nextSlug !== slug) await deletePost(slug);
    return NextResponse.json({ slug: nextSlug });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to update article');
  }
}

export async function DELETE(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { slug } = await params;
  try {
    await deletePost(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to delete article');
  }
}
