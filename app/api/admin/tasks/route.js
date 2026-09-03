import { NextResponse } from 'next/server';
import { getAllTasks, saveTask, generateTaskId } from '@/lib/tasks';
import { getProject } from '@/lib/projects';
import { requireAuth } from '@/lib/auth';
import { sendTaskAssignedEmail } from '@/lib/email';
import { adminErrorResponse, validationError } from '@/lib/admin-response';

export async function GET(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    return NextResponse.json(await getAllTasks(projectId ? { projectId } : {}));
  } catch (error) {
    return adminErrorResponse(error, 'Unable to load tasks');
  }
}

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  try {
    const data = await request.json();
    if (!data.title?.trim()) return validationError('Task title is required');
    if (!data.projectId) return validationError('Project is required');
    const id = generateTaskId();
    const now = new Date().toISOString();
    const task = { ...data, title: data.title.trim(), id, createdAt: now, updatedAt: now };
    await saveTask(id, task);

    if (data.assigneeEmail) {
      const project = await getProject(data.projectId).catch(() => null);
      sendTaskAssignedEmail(task, project).catch(() => {});
    }

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to add task');
  }
}
