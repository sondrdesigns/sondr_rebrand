import slugify from 'slugify';
import { storeList, storeGet, storeSet, storeDel } from './store.js';

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
    const ids = await storeList('members');
    const members = await Promise.all(
      ids.map(id => storeGet('members', id).catch(() => null))
    );
    return members.filter(Boolean).sort((a, b) =>
      (a.name || '').toLowerCase().localeCompare((b.name || '').toLowerCase())
    );
  } catch {
    return [];
  }
}

export async function getMember(id) {
  validateId(id);
  return storeGet('members', id);
}

export async function saveMember(id, data) {
  validateId(id);
  await storeSet('members', id, { ...data, id, updatedAt: new Date().toISOString() });
  return id;
}

export async function deleteMember(id) {
  validateId(id);
  await storeDel('members', id);
}
