import slugify from 'slugify';
import { seedKVJsonTypeIfNeeded, storeList, storeGet, storeSet, storeDel } from './store.js';

function validateId(id) {
  if (!id || typeof id !== 'string' || !/^[a-z0-9_-]+$/i.test(id) || id.length > 128) {
    throw new Error('Invalid ID');
  }
}

export function generateProjectId(name) {
  const base = slugify(name, { lower: true, strict: true });
  return `${base || 'project'}-${Date.now().toString(36).slice(-4)}`;
}

export async function getAllProjects() {
  await seedKVJsonTypeIfNeeded('projects');
  const ids = await storeList('projects');
  const projects = await Promise.all(ids.map(async id => {
    try {
      return { ...await storeGet('projects', id), id };
    } catch (error) {
      if (!error?.message?.startsWith('Not found:')) throw error;
      await storeDel('projects', id);
      return null;
    }
  }));
  return projects.filter(Boolean).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export async function getProject(id) {
  validateId(id);
  await seedKVJsonTypeIfNeeded('projects');
  return storeGet('projects', id);
}

export async function saveProject(id, data) {
  validateId(id);
  await seedKVJsonTypeIfNeeded('projects');
  await storeSet('projects', id, { ...data, id, updatedAt: new Date().toISOString() });
  return id;
}

export async function deleteProject(id) {
  validateId(id);
  await seedKVJsonTypeIfNeeded('projects');
  await storeDel('projects', id);
}
