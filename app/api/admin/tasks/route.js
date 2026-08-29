import { NextResponse } from 'next/server';
import { getAllTasks, saveTask, generateTaskId } from '@/lib/tasks';
import { getProject } from '@/lib/projects';
import { requireAuth } from '@/lib/auth';
import { sendTaskAssignedEmail } from '@/lib/email';

export async function GET(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');
  const tasks = await getAllTasks(projectId ? { projectId } : {});
  return NextResponse.json(tasks);
}

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const data = await request.json();
  const id = generateTaskId();
  const now = new Date().toISOString();
  const task = { ...data, id, createdAt: now, updatedAt: now };
  await saveTask(id, task);

  if (data.assigneeEmail) {
    const project = data.projectId
      ? await getProject(data.projectId).catch(() => null)
      : null;
    sendTaskAssignedEmail(task, project).catch(() => {});
  }

  return NextResponse.json({ id });
}
