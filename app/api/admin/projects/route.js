import { NextResponse } from 'next/server';
import { getAllProjects, saveProject, generateProjectId } from '@/lib/projects';

export async function GET() {
  const projects = await getAllProjects();
  return NextResponse.json(projects);
}

export async function POST(request) {
  const data = await request.json();
  const id = data.id || generateProjectId(data.name || 'project');
  const now = new Date().toISOString();
  await saveProject(id, { ...data, id, createdAt: now, updatedAt: now });
  return NextResponse.json({ id });
}
