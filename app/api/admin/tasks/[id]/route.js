import { NextResponse } from 'next/server';
import { getTask, saveTask, deleteTask } from '@/lib/tasks';
import { getProject } from '@/lib/projects';
import { requireAuth } from '@/lib/auth';
import { sendTaskAssignedEmail } from '@/lib/email';

export async function GET(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const task = await getTask(id);
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  const body = await request.json();
  const prev = await getTask(id).catch(() => null);
  await saveTask(id, body);

  // Email if assignee was newly set or changed
  if (body.assigneeEmail && body.assigneeEmail !== prev?.assigneeEmail) {
    const project = body.projectId
      ? await getProject(body.projectId).catch(() => null)
      : null;
    sendTaskAssignedEmail({ ...body, id }, project).catch(() => {});
  }

  return NextResponse.json({ id });
}

export async function DELETE(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  await deleteTask(id);
  return NextResponse.json({ ok: true });
}
