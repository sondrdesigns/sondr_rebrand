import fs from 'fs/promises';
import path from 'path';
import slugify from 'slugify';

const MEMBERS_DIR = path.join(process.cwd(), 'content', 'members');

async function ensureDir() {
  await fs.mkdir(MEMBERS_DIR, { recursive: true });
}

export function generateMemberId(name) {
  const base = slugify(name, { lower: true, strict: true });
  return `${base}-${Date.now().toString(36).slice(-4)}`;
}

export async function getAllMembers() {
  try {
    await ensureDir();
    const files = await fs.readdir(MEMBERS_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    const members = await Promise.all(
      jsonFiles.map(async (file) => {
        const raw = await fs.readFile(path.join(MEMBERS_DIR, file), 'utf8');
        return JSON.parse(raw);
      })
    );
    return members.sort((a, b) => {
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
  } catch {
    return [];
  }
}

export async function getMember(id) {
  const raw = await fs.readFile(path.join(MEMBERS_DIR, `${id}.json`), 'utf8');
  return JSON.parse(raw);
}

export async function saveMember(id, data) {
  await ensureDir();
  const payload = { ...data, id, updatedAt: new Date().toISOString() };
  await fs.writeFile(
    path.join(MEMBERS_DIR, `${id}.json`),
    JSON.stringify(payload, null, 2),
    'utf8'
  );
  return id;
}

export async function deleteMember(id) {
  await fs.unlink(path.join(MEMBERS_DIR, `${id}.json`));
}
