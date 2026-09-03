import { NextResponse } from 'next/server';
import { getAllPosts, getPost, savePost, generateSlug } from '@/lib/blog';
import { requireAuth } from '@/lib/auth';
import { adminErrorResponse, validationError } from '@/lib/admin-response';

export async function GET(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  try {
    return NextResponse.json(await getAllPosts({ includeUnpublished: true }));
  } catch (error) {
    return adminErrorResponse(error, 'Unable to load articles');
  }
}

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  try {
    const { frontmatter, content } = await request.json();
    if (!frontmatter?.title?.trim()) return validationError('Article title is required');
    const slug = generateSlug(frontmatter.title);
    const existing = await getPost(slug).catch(error => {
      if (error?.code === 'ENOENT' || error?.message?.startsWith('Not found:')) return null;
      throw error;
    });
    if (existing) {
      return NextResponse.json({ error: 'An article with this title already exists' }, { status: 409 });
    }
    const now = new Date().toISOString();
    const fm = {
      ...frontmatter,
      title: frontmatter.title.trim(),
      slug,
      status: frontmatter.status || 'draft',
      createdAt: now,
      updatedAt: now,
    };
    await savePost(slug, fm, content || '');
    return NextResponse.json({ slug }, { status: 201 });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to add article');
  }
}
