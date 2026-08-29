import path from 'path';
import fs from 'fs/promises';

// On Vercel the deployment directory is read-only at runtime.
// We copy seed data from the repo to /tmp once per Lambda lifetime,
// then read/write from there.
const IS_VERCEL = !!process.env.VERCEL;
const REPO_BASE = path.join(process.cwd(), 'content');
const TMP_BASE = '/tmp/sondr-content';

let seeded = false;

async function seed() {
  if (!IS_VERCEL || seeded) return;
  seeded = true;
  try {
    await fs.cp(REPO_BASE, TMP_BASE, { recursive: true, force: false, errorOnExist: false });
  } catch {
    // Partial copy is fine — ensureDir below creates missing dirs
  }
}

export function contentDir(type) {
  return IS_VERCEL ? path.join(TMP_BASE, type) : path.join(REPO_BASE, type);
}

export async function ensureContentDir(type) {
  await seed();
  const dir = contentDir(type);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}
