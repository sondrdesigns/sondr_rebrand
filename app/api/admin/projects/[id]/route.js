import { NextResponse } from 'next/server';
import { getProject, saveProject, deleteProject } from '@/lib/projects';
import { getAllMembers } from '@/lib/members';
import { requireAuth } from '@/lib/auth';
import { sendProjectStatusEmail } from '@/lib/email';

export async function GET(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  try {
    const project = await getProject(params.id);
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const body = await request.json();
  const prev = await getProject(params.id).catch(() => null);
  await saveProject(params.id, { ...body });

  // Email assigned members when project status changes
  if (prev && body.status !== prev.status && body.memberIds?.length) {
    const allMembers = await getAllMembers().catch(() => []);
    const assigned = allMembers.filter(m => body.memberIds.includes(m.id) && m.email);
    sendProjectStatusEmail({ ...body, id: params.id }, assigned).catch(() => {});
  }

  return NextResponse.json({ id: params.id });
}

export async function DELETE(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  await deleteProject(params.id);
  return NextResponse.json({ ok: true });
}
