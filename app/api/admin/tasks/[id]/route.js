import { NextResponse } from 'next/server';
import { getTask, saveTask, deleteTask } from '@/lib/tasks';

export async function GET(request, { params }) {
  try {
    const task = await getTask(params.id);
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  const body = await request.json();
  await saveTask(params.id, body);
  return NextResponse.json({ id: params.id });
}

export async function DELETE(request, { params }) {
  await deleteTask(params.id);
  return NextResponse.json({ ok: true });
}
