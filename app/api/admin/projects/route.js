import { NextResponse } from 'next/server';
import { getAllProjects, saveProject, generateProjectId } from '@/lib/projects';
import { requireAuth } from '@/lib/auth';

export async function GET(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const projects = await getAllProjects();
  return NextResponse.json(projects);
}

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const data = await request.json();
  // Always generate server-side; reject client-supplied ids
  const id = generateProjectId(data.name || 'project');
  const now = new Date().toISOString();
  await saveProject(id, { ...data, id, createdAt: now, updatedAt: now });
  return NextResponse.json({ id });
}
