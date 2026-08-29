import { NextResponse } from 'next/server';
import { getTask, saveTask, deleteTask } from '@/lib/tasks';
import { getProject } from '@/lib/projects';
import { requireAuth } from '@/lib/auth';
import { sendTaskAssignedEmail } from '@/lib/email';

export async function GET(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  try {
    const task = await getTask(params.id);
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const body = await request.json();
  const prev = await getTask(params.id).catch(() => null);
  await saveTask(params.id, body);

  // Email if assignee was newly set or changed
  if (body.assigneeEmail && body.assigneeEmail !== prev?.assigneeEmail) {
    const project = body.projectId
      ? await getProject(body.projectId).catch(() => null)
      : null;
    sendTaskAssignedEmail({ ...body, id: params.id }, project).catch(() => {});
  }

  return NextResponse.json({ id: params.id });
}

export async function DELETE(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  await deleteTask(params.id);
  return NextResponse.json({ ok: true });
}
