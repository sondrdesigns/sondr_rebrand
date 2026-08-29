import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const TASKS_DIR = path.join(process.cwd(), 'content', 'tasks');

function validateId(id) {
  if (!id || typeof id !== 'string' || !/^[a-z0-9_-]+$/i.test(id) || id.length > 128) {
    throw new Error('Invalid ID');
  }
}

async function ensureDir() {
  await fs.mkdir(TASKS_DIR, { recursive: true });
}

export function generateTaskId() {
  return `task-${crypto.randomBytes(4).toString('hex')}`;
}

export async function getAllTasks({ projectId, assigneeEmail } = {}) {
  try {
    await ensureDir();
    const files = await fs.readdir(TASKS_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    const tasks = await Promise.all(
      jsonFiles.map(async f => {
        const raw = await fs.readFile(path.join(TASKS_DIR, f), 'utf8');
        return JSON.parse(raw);
      })
    );
    let result = tasks;
    if (projectId) result = result.filter(t => t.projectId === projectId);
    if (assigneeEmail) result = result.filter(t => t.assigneeEmail === assigneeEmail);
    return result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch {
    return [];
  }
}

export async function getTask(id) {
  validateId(id);
  const raw = await fs.readFile(path.join(TASKS_DIR, `${id}.json`), 'utf8');
  return JSON.parse(raw);
}

export async function saveTask(id, data) {
  validateId(id);
  await ensureDir();
  const payload = { ...data, id, updatedAt: new Date().toISOString() };
  await fs.writeFile(
    path.join(TASKS_DIR, `${id}.json`),
    JSON.stringify(payload, null, 2),
    'utf8'
  );
  return id;
}

export async function deleteTask(id) {
  validateId(id);
  await fs.unlink(path.join(TASKS_DIR, `${id}.json`));
}

export async function getTaskCountsByProject(projectIds) {
  const tasks = await getAllTasks();
  const counts = {};
  for (const id of projectIds) counts[id] = { total: 0, done: 0 };
  for (const task of tasks) {
    if (counts[task.projectId] !== undefined) {
      counts[task.projectId].total++;
      if (task.status === 'done') counts[task.projectId].done++;
    }
  }
  return counts;
}
