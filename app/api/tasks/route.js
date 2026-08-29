import { NextResponse } from 'next/server';
import { getAllTasks } from '@/lib/tasks';
import { getAllProjects } from '@/lib/projects';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public endpoint — members enter their email on /my-tasks to see assigned tasks.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email')?.toLowerCase().trim();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'valid email required' }, { status: 400 });
  }

  const [tasks, projects] = await Promise.all([
    getAllTasks({ assigneeEmail: email }),
    getAllProjects(),
  ]);

  // Only expose the fields a member needs; omit budget, memberIds, internal notes
  const projectMap = Object.fromEntries(
    projects.map(p => [p.id, { id: p.id, name: p.name, client: p.client, status: p.status, dueDate: p.dueDate }])
  );

  const enriched = tasks.map(t => ({
    id: t.id,
    title: t.title,
    description: t.description,
    status: t.status,
    priority: t.priority,
    dueDate: t.dueDate,
    projectId: t.projectId,
    project: t.projectId ? (projectMap[t.projectId] ?? null) : null,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  }));

  return NextResponse.json(enriched);
}
