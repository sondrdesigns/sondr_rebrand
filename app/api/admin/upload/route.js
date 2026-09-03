import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { randomBytes } from 'crypto';
import path from 'path';
import { requireAuth } from '@/lib/auth';
import { put } from '@vercel/blob';
import { adminErrorResponse } from '@/lib/admin-response';

const ALLOWED_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    if (bytes.byteLength > MAX_BYTES) {
      return NextResponse.json({ error: 'File exceeds 4 MB limit.' }, { status: 400 });
    }

    const filename = `${Date.now()}-${randomBytes(8).toString('hex')}.${ext}`;
    if (process.env.VERCEL) {
      const blob = await put(`blog/${filename}`, bytes, {
        access: 'public',
        addRandomSuffix: false,
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url }, { status: 201 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blog');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));
    return NextResponse.json({ url: `/uploads/blog/${filename}` }, { status: 201 });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to upload image');
  }
}
