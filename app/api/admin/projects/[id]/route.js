import { NextResponse } from 'next/server';
import { getProject, saveProject, deleteProject } from '@/lib/projects';

export async function GET(request, { params }) {
  try {
    const project = await getProject(params.id);
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  const body = await request.json();
  await saveProject(params.id, { ...body });
  return NextResponse.json({ id: params.id });
}

export async function DELETE(request, { params }) {
  await deleteProject(params.id);
  return NextResponse.json({ ok: true });
}
