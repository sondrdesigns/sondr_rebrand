import { NextResponse } from 'next/server';
import { getAllMembers, saveMember, generateMemberId } from '@/lib/members';
import { requireAuth } from '@/lib/auth';
import { adminErrorResponse, validationError } from '@/lib/admin-response';

export async function GET(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  try {
    return NextResponse.json(await getAllMembers());
  } catch (error) {
    return adminErrorResponse(error, 'Unable to load members');
  }
}

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  try {
    const data = await request.json();
    if (!data.name?.trim()) return validationError('Member name is required');
    const id = generateMemberId(data.name);
    const now = new Date().toISOString();
    await saveMember(id, { ...data, name: data.name.trim(), id, createdAt: now, updatedAt: now });
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to add member');
  }
}
