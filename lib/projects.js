import fs from 'fs/promises';
import path from 'path';
import slugify from 'slugify';
import { contentDir, ensureContentDir } from './content-dir.js';

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
  try {
    const dir = await ensureContentDir('projects');
    const files = await fs.readdir(dir);
    const projects = await Promise.all(
      files.filter(f => f.endsWith('.json')).map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), 'utf8');
        return JSON.parse(raw);
      })
    );
    return projects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch {
    return [];
  }
}

export async function getProject(id) {
  validateId(id);
  const dir = contentDir('projects');
  const raw = await fs.readFile(path.join(dir, `${id}.json`), 'utf8');
  return JSON.parse(raw);
}

export async function saveProject(id, data) {
  validateId(id);
  const dir = await ensureContentDir('projects');
  const payload = { ...data, id, updatedAt: new Date().toISOString() };
  await fs.writeFile(path.join(dir, `${id}.json`), JSON.stringify(payload, null, 2), 'utf8');
  return id;
}

export async function deleteProject(id) {
  validateId(id);
  const dir = contentDir('projects');
  await fs.unlink(path.join(dir, `${id}.json`));
}
