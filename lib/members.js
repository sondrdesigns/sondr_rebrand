import fs from 'fs/promises';
import path from 'path';
import slugify from 'slugify';
import { contentDir, ensureContentDir } from './content-dir.js';

function validateId(id) {
  if (!id || typeof id !== 'string' || !/^[a-z0-9_-]+$/i.test(id) || id.length > 128) {
    throw new Error('Invalid ID');
  }
}

export function generateMemberId(name) {
  const base = slugify(name, { lower: true, strict: true });
  return `${base || 'member'}-${Date.now().toString(36).slice(-4)}`;
}

export async function getAllMembers() {
  try {
    const dir = await ensureContentDir('members');
    const files = await fs.readdir(dir);
    const members = await Promise.all(
      files.filter(f => f.endsWith('.json')).map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), 'utf8');
        return JSON.parse(raw);
      })
    );
    return members.sort((a, b) =>
      (a.name || '').toLowerCase().localeCompare((b.name || '').toLowerCase())
    );
  } catch {
    return [];
  }
}

export async function getMember(id) {
  validateId(id);
  const dir = contentDir('members');
  const raw = await fs.readFile(path.join(dir, `${id}.json`), 'utf8');
  return JSON.parse(raw);
}

export async function saveMember(id, data) {
  validateId(id);
  const dir = await ensureContentDir('members');
  const payload = { ...data, id, updatedAt: new Date().toISOString() };
  await fs.writeFile(path.join(dir, `${id}.json`), JSON.stringify(payload, null, 2), 'utf8');
  return id;
}

export async function deleteMember(id) {
  validateId(id);
  const dir = contentDir('members');
  await fs.unlink(path.join(dir, `${id}.json`));
}
