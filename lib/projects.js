import fs from 'fs/promises';
import path from 'path';
import slugify from 'slugify';

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');

function validateId(id) {
  if (!id || typeof id !== 'string' || !/^[a-z0-9_-]+$/i.test(id) || id.length > 128) {
    throw new Error('Invalid ID');
  }
}

async function ensureDir() {
  await fs.mkdir(PROJECTS_DIR, { recursive: true });
}

export function generateProjectId(name) {
  const base = slugify(name, { lower: true, strict: true });
  return `${base}-${Date.now().toString(36).slice(-4)}`;
}

export async function getAllProjects() {
  try {
    await ensureDir();
    const files = await fs.readdir(PROJECTS_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    const projects = await Promise.all(
      jsonFiles.map(async (file) => {
        const raw = await fs.readFile(path.join(PROJECTS_DIR, file), 'utf8');
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
  const raw = await fs.readFile(path.join(PROJECTS_DIR, `${id}.json`), 'utf8');
  return JSON.parse(raw);
}

export async function saveProject(id, data) {
  validateId(id);
  await ensureDir();
  const payload = { ...data, id, updatedAt: new Date().toISOString() };
  await fs.writeFile(
    path.join(PROJECTS_DIR, `${id}.json`),
    JSON.stringify(payload, null, 2),
    'utf8'
  );
  return id;
}

export async function deleteProject(id) {
  validateId(id);
  await fs.unlink(path.join(PROJECTS_DIR, `${id}.json`));
}
