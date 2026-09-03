import { NextResponse } from 'next/server';
import { getProject, saveProject, deleteProject } from '@/lib/projects';
import { getAllMembers } from '@/lib/members';
import { requireAuth } from '@/lib/auth';
import { sendProjectStatusEmail } from '@/lib/email';
import { getAllTasks, deleteTask } from '@/lib/tasks';
import { adminErrorResponse, adminReadErrorResponse, validationError } from '@/lib/admin-response';

export async function GET(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const project = await getProject(id);
    return NextResponse.json(project);
  } catch (error) {
    return adminReadErrorResponse(error, 'Unable to load project');
  }
}

export async function PUT(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const body = await request.json();
    if (!body.name?.trim()) return validationError('Project name is required');
    const prev = await getProject(id);
    const project = { ...prev, ...body, name: body.name.trim(), id };
    await saveProject(id, project);

    if (body.status !== prev.status && project.memberIds?.length) {
      const allMembers = await getAllMembers().catch(() => []);
      const assigned = allMembers.filter(m => project.memberIds.includes(m.id) && m.email);
      sendProjectStatusEmail(project, assigned).catch(() => {});
    }

    return NextResponse.json({ id });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to update project');
  }
}

export async function DELETE(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const tasks = await getAllTasks({ projectId: id });
    await Promise.all(tasks.map(task => deleteTask(task.id)));
    await deleteProject(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to delete project');
  }
}
