import { NextResponse } from 'next/server';
import { getAllTasks, saveTask, generateTaskId } from '@/lib/tasks';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');
  const tasks = await getAllTasks(projectId ? { projectId } : {});
  return NextResponse.json(tasks);
}

export async function POST(request) {
  const data = await request.json();
  const id = generateTaskId();
  const now = new Date().toISOString();
  await saveTask(id, { ...data, id, createdAt: now, updatedAt: now });
  return NextResponse.json({ id });
}
