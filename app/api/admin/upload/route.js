import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { randomBytes } from 'crypto';
import path from 'path';
import { requireAuth } from '@/lib/auth';

const ALLOWED_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;

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
    return NextResponse.json({ error: 'File exceeds 5 MB limit.' }, { status: 400 });
  }

  const filename = `${Date.now()}-${randomBytes(8).toString('hex')}.${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blog');
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));
  return NextResponse.json({ url: `/uploads/blog/${filename}` });
}
