import { NextResponse } from 'next/server';
import { getAllMembers, saveMember, generateMemberId } from '@/lib/members';

export async function GET() {
  const members = await getAllMembers();
  return NextResponse.json(members);
}

export async function POST(request) {
  const data = await request.json();
  const id = data.id || generateMemberId(data.name || 'member');
  const now = new Date().toISOString();
  await saveMember(id, { ...data, id, createdAt: now, updatedAt: now });
  return NextResponse.json({ id });
}
