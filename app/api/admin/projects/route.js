import { NextResponse } from 'next/server';
import { getAllProjects, saveProject, generateProjectId } from '@/lib/projects';
import { requireAuth } from '@/lib/auth';
import { adminErrorResponse, validationError } from '@/lib/admin-response';

export async function GET(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  try {
    return NextResponse.json(await getAllProjects());
  } catch (error) {
    return adminErrorResponse(error, 'Unable to load projects');
  }
}

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  try {
    const data = await request.json();
    if (!data.name?.trim()) return validationError('Project name is required');
    const id = generateProjectId(data.name);
    const now = new Date().toISOString();
    await saveProject(id, { ...data, name: data.name.trim(), id, createdAt: now, updatedAt: now });
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return adminErrorResponse(error, 'Unable to add project');
  }
}
