import { NextResponse } from 'next/server';
import { getMember, saveMember, deleteMember } from '@/lib/members';
import { requireAuth } from '@/lib/auth';

export async function GET(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const member = await getMember(id);
    return NextResponse.json(member);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  const body = await request.json();
  await saveMember(id, { ...body });
  return NextResponse.json({ id });
}

export async function DELETE(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  await deleteMember(id);
  return NextResponse.json({ ok: true });
}
