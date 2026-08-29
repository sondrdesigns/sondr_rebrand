import { NextResponse } from 'next/server';
import { getMember, saveMember, deleteMember } from '@/lib/members';
import { requireAuth } from '@/lib/auth';

export async function GET(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  try {
    const member = await getMember(params.id);
    return NextResponse.json(member);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const body = await request.json();
  await saveMember(params.id, { ...body });
  return NextResponse.json({ id: params.id });
}

export async function DELETE(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  await deleteMember(params.id);
  return NextResponse.json({ ok: true });
}
