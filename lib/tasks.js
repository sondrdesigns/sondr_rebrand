import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { contentDir, ensureContentDir } from './content-dir.js';

function validateId(id) {
  if (!id || typeof id !== 'string' || !/^[a-z0-9_-]+$/i.test(id) || id.length > 128) {
    throw new Error('Invalid ID');
  }
}

export function generateTaskId() {
  return `task-${crypto.randomBytes(4).toString('hex')}`;
}

export async function getAllTasks({ projectId, assigneeEmail } = {}) {
  try {
    const dir = await ensureContentDir('tasks');
    const files = await fs.readdir(dir);
    const tasks = await Promise.all(
      files.filter(f => f.endsWith('.json')).map(async f => {
        const raw = await fs.readFile(path.join(dir, f), 'utf8');
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
  const dir = contentDir('tasks');
  const raw = await fs.readFile(path.join(dir, `${id}.json`), 'utf8');
  return JSON.parse(raw);
}

export async function saveTask(id, data) {
  validateId(id);
  const dir = await ensureContentDir('tasks');
  const payload = { ...data, id, updatedAt: new Date().toISOString() };
  await fs.writeFile(path.join(dir, `${id}.json`), JSON.stringify(payload, null, 2), 'utf8');
  return id;
}

export async function deleteTask(id) {
  validateId(id);
  const dir = contentDir('tasks');
  await fs.unlink(path.join(dir, `${id}.json`));
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
