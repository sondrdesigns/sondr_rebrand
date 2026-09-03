import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import slugify from 'slugify';
import {
  assertStoreWritable,
  getStoreStatus,
  storeList,
  storeGet,
  storeSet,
  storeDel,
  storeGetFlag,
  storeSetFlag,
} from './store.js';

const USE_KV = getStoreStatus().mode === 'redis';
const REPO_BLOG = path.join(process.cwd(), 'content', 'blog');
const FS_BLOG = REPO_BLOG;

function validateSlug(slug) {
  if (!slug || typeof slug !== 'string' || !/^[a-z0-9_-]+$/i.test(slug) || slug.length > 128) {
    throw new Error('Invalid slug');
  }
}

export function generateSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

// Seed KV from committed MDX files once. Uses a flag so deletes don't trigger re-seed.
let kvInitChecked = false;
async function seedKVBlogIfNeeded() {
  if (kvInitChecked) return;
  const alreadySeeded = await storeGetFlag('blog:seeded');
  if (alreadySeeded) {
    kvInitChecked = true;
    return;
  }
  try {
    const files = await fs.readdir(REPO_BLOG);
    const existingSlugs = await storeList('posts');
    await Promise.all(
      files.filter(f => f.endsWith('.mdx')).map(async file => {
        const raw = await fs.readFile(path.join(REPO_BLOG, file), 'utf8');
        const { data, content } = matter(raw);
        const slug = data.slug || file.replace('.mdx', '');
        if (existingSlugs.includes(slug)) return;
        await storeSet('posts', slug, { frontmatter: { ...data, slug }, content });
      })
    );
    await storeSetFlag('blog:seeded', '1');
    kvInitChecked = true;
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

export async function getAllPosts({ includeUnpublished = false } = {}) {
  const now = new Date();

  if (USE_KV) {
    await seedKVBlogIfNeeded();
    const slugs = await storeList('posts');
    const items = await Promise.all(slugs.map(async slug => {
      try {
        const item = await storeGet('posts', slug);
        return { ...item.frontmatter, slug };
      } catch (error) {
        if (!error?.message?.startsWith('Not found:')) throw error;
        await storeDel('posts', slug);
        return null;
      }
    }));
    const posts = items.filter(Boolean);
    const filtered = includeUnpublished ? posts : posts.filter(p =>
      p.status === 'published' ||
      (p.status === 'scheduled' && new Date(p.scheduledFor) <= now)
    );
    return filtered.sort((a, b) => {
      const da = a.publishedAt ? new Date(a.publishedAt) : new Date(0);
      const db = b.publishedAt ? new Date(b.publishedAt) : new Date(0);
      return db - da;
    });
  }

  // Local writes use the filesystem; production without Redis is read-only.
  try {
    const files = await fs.readdir(FS_BLOG);
    const posts = await Promise.all(
      files.filter(f => f.endsWith('.mdx')).map(async file => {
        const raw = await fs.readFile(path.join(FS_BLOG, file), 'utf8');
        const { data } = matter(raw);
        return { ...data, slug: file.replace('.mdx', '') };
      })
    );
    const filtered = includeUnpublished ? posts : posts.filter(p =>
      p.status === 'published' ||
      (p.status === 'scheduled' && new Date(p.scheduledFor) <= now)
    );
    return filtered.sort((a, b) => {
      const da = a.publishedAt ? new Date(a.publishedAt) : new Date(0);
      const db = b.publishedAt ? new Date(b.publishedAt) : new Date(0);
      return db - da;
    });
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }
}

export async function getPost(slug) {
  validateSlug(slug);

  if (USE_KV) {
    await seedKVBlogIfNeeded();
    const item = await storeGet('posts', slug);
    return { frontmatter: item.frontmatter, content: item.content || '' };
  }

  const raw = await fs.readFile(path.join(FS_BLOG, `${slug}.mdx`), 'utf8');
  const { data, content } = matter(raw);
  return { frontmatter: { ...data, slug }, content };
}

export async function savePost(slug, frontmatter, content) {
  validateSlug(slug);

  if (USE_KV) {
    await seedKVBlogIfNeeded();
    await storeSet('posts', slug, { frontmatter: { ...frontmatter, slug }, content: content || '' });
    return slug;
  }

  assertStoreWritable();
  await fs.mkdir(FS_BLOG, { recursive: true });
  await fs.writeFile(path.join(FS_BLOG, `${slug}.mdx`), matter.stringify(content || '', frontmatter), 'utf8');
  return slug;
}

export async function deletePost(slug) {
  validateSlug(slug);

  if (USE_KV) {
    await seedKVBlogIfNeeded();
    await storeDel('posts', slug);
    return;
  }

  assertStoreWritable();
  try {
    await fs.unlink(path.join(FS_BLOG, `${slug}.mdx`));
  } catch (err) {
    if (err?.code !== 'ENOENT') throw err;
  }
}
