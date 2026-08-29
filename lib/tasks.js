import crypto from 'crypto';
import { storeList, storeGet, storeSet, storeDel } from './store.js';

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
    const ids = await storeList('tasks');
    const tasks = await Promise.all(
      ids.map(id => storeGet('tasks', id).catch(() => null))
    );
    let result = tasks.filter(Boolean);
    if (projectId) result = result.filter(t => t.projectId === projectId);
    if (assigneeEmail) result = result.filter(t => t.assigneeEmail === assigneeEmail);
    return result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch {
    return [];
  }
}

export async function getTask(id) {
  validateId(id);
  return storeGet('tasks', id);
}

export async function saveTask(id, data) {
  validateId(id);
  await storeSet('tasks', id, { ...data, id, updatedAt: new Date().toISOString() });
  return id;
}

export async function deleteTask(id) {
  validateId(id);
  await storeDel('tasks', id);
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
