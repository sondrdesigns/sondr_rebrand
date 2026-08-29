import { NextResponse } from 'next/server';
import { getAllTasks } from '@/lib/tasks';
import { getAllProjects } from '@/lib/projects';

// Public endpoint — returns tasks assigned to a given email address.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email')?.toLowerCase().trim();
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

  const [tasks, projects] = await Promise.all([
    getAllTasks({ assigneeEmail: email }),
    getAllProjects(),
  ]);

  const projectMap = Object.fromEntries(projects.map(p => [p.id, p]));

  const enriched = tasks.map(t => ({
    ...t,
    project: projectMap[t.projectId] || null,
  }));

  return NextResponse.json(enriched);
}
