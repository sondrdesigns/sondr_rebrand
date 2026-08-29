import { NextResponse } from 'next/server';
import { getAllMembers, saveMember, generateMemberId } from '@/lib/members';
import { requireAuth } from '@/lib/auth';

export async function GET(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const members = await getAllMembers();
  return NextResponse.json(members);
}

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const data = await request.json();
  const id = generateMemberId(data.name || 'member');
  const now = new Date().toISOString();
  await saveMember(id, { ...data, id, createdAt: now, updatedAt: now });
  return NextResponse.json({ id });
}
