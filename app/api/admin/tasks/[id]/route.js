import { NextResponse } from 'next/server';
import { getTask, saveTask, deleteTask } from '@/lib/tasks';
import { getProject } from '@/lib/projects';
import { requireAuth } from '@/lib/auth';
import { sendTaskAssignedEmail } from '@/lib/email';
import { adminErrorResponse, adminReadErrorResponse, validationError } from '@/lib/admin-response';

export async function GET(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const task = await getTask(id);
    return NextResponse.json(task);
  } catch (error) {
    return adminReadErrorResponse(error, 'Unable to load task');
  }
}

export async function PUT(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const body = await request.json();
    if (!body.title?.trim()) return validationError('Task title is required');
    const prev = await getTask(id);
    const task = { ...prev, ...body, title: body.title.trim(), id };
    await saveTask(id, task);

    if (task.assigneeEmail && task.assigneeEmail !== prev.assigneeEmail) {
      const project = task.projectId
        ? await getProject(task.projectId).catch(() => null)
        : null;
      sendTaskAssignedEmail(task, project).catch(() => {});
    }

    return NextResponse.json({ id });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to update task');
  }
}

export async function DELETE(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  try {
    await deleteTask(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to delete task');
  }
}
