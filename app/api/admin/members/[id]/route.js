import { NextResponse } from 'next/server';
import { getMember, saveMember, deleteMember } from '@/lib/members';
import { getAllProjects, saveProject } from '@/lib/projects';
import { getAllTasks, saveTask } from '@/lib/tasks';
import { requireAuth } from '@/lib/auth';
import { adminErrorResponse, adminReadErrorResponse, validationError } from '@/lib/admin-response';

export async function GET(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const member = await getMember(id);
    return NextResponse.json(member);
  } catch (error) {
    return adminReadErrorResponse(error, 'Unable to load member');
  }
}

export async function PUT(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const body = await request.json();
    if (!body.name?.trim()) return validationError('Member name is required');
    const previous = await getMember(id);
    await saveMember(id, { ...previous, ...body, name: body.name.trim(), id });
    return NextResponse.json({ id });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to update member');
  }
}

export async function DELETE(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const [projects, tasks] = await Promise.all([getAllProjects(), getAllTasks()]);
    await Promise.all(projects
      .filter(project => project.memberIds?.includes(id))
      .map(project => saveProject(project.id, {
        ...project,
        memberIds: project.memberIds.filter(memberId => memberId !== id),
      })));
    await Promise.all(tasks
      .filter(task => task.assigneeId === id)
      .map(task => saveTask(task.id, { ...task, assigneeId: '', assigneeEmail: '' })));
    await deleteMember(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to delete member');
  }
}
