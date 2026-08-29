import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import slugify from 'slugify';
import { storeList, storeGet, storeSet, storeDel, storeGetFlag, storeSetFlag } from './store.js';

const USE_KV = !!process.env.KV_REST_API_URL;
const IS_VERCEL = !!process.env.VERCEL;
const REPO_BLOG = path.join(process.cwd(), 'content', 'blog');
const TMP_BLOG = '/tmp/sondr-content/blog';
const FS_BLOG = IS_VERCEL ? TMP_BLOG : REPO_BLOG;

function validateSlug(slug) {
  if (!slug || typeof slug !== 'string' || !/^[a-z0-9_-]+$/i.test(slug) || slug.length > 128) {
    throw new Error('Invalid slug');
  }
}

export function generateSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

// Seed /tmp from repo on Vercel (filesystem path only, not KV path).
let tmpSeeded = false;
async function seedTmpBlog() {
  if (!IS_VERCEL || USE_KV || tmpSeeded) return;
  tmpSeeded = true;
  try {
    await fs.cp(REPO_BLOG, TMP_BLOG, { recursive: true, force: false, errorOnExist: false });
  } catch {}
  await fs.mkdir(TMP_BLOG, { recursive: true });
}

// Seed KV from committed MDX files once. Uses a flag so deletes don't trigger re-seed.
let kvInitChecked = false;
async function seedKVBlogIfNeeded() {
  if (kvInitChecked) return;
  kvInitChecked = true;
  const alreadySeeded = await storeGetFlag('blog:seeded');
  if (alreadySeeded) return;
  try {
    const files = await fs.readdir(REPO_BLOG);
    await Promise.all(
      files.filter(f => f.endsWith('.mdx')).map(async file => {
        const raw = await fs.readFile(path.join(REPO_BLOG, file), 'utf8');
        const { data, content } = matter(raw);
        const slug = data.slug || file.replace('.mdx', '');
        await storeSet('posts', slug, { frontmatter: { ...data, slug }, content });
      })
    );
    await storeSetFlag('blog:seeded', '1');
  } catch {}
}

export async function getAllPosts({ includeUnpublished = false } = {}) {
  const now = new Date();

  if (USE_KV) {
    try {
      await seedKVBlogIfNeeded();
      const slugs = await storeList('posts');
      const items = await Promise.all(slugs.map(s => storeGet('posts', s).catch(() => null)));
      const posts = items.filter(Boolean).map(item => item.frontmatter);
      const filtered = includeUnpublished ? posts : posts.filter(p =>
        p.status === 'published' ||
        (p.status === 'scheduled' && new Date(p.scheduledFor) <= now)
      );
      return filtered.sort((a, b) => {
        const da = a.publishedAt ? new Date(a.publishedAt) : new Date(0);
        const db = b.publishedAt ? new Date(b.publishedAt) : new Date(0);
        return db - da;
      });
    } catch { return []; }
  }

  // Filesystem path (local dev or Vercel without KV).
  await seedTmpBlog();
  try {
    const files = await fs.readdir(FS_BLOG);
    const posts = await Promise.all(
      files.filter(f => f.endsWith('.mdx')).map(async file => {
        const raw = await fs.readFile(path.join(FS_BLOG, file), 'utf8');
        const { data } = matter(raw);
        return { ...data, slug: data.slug || file.replace('.mdx', '') };
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
  } catch { return []; }
}

export async function getPost(slug) {
  validateSlug(slug);

  if (USE_KV) {
    await seedKVBlogIfNeeded();
    const item = await storeGet('posts', slug);
    return { frontmatter: item.frontmatter, content: item.content || '' };
  }

  await seedTmpBlog();
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

  await seedTmpBlog();
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

  await seedTmpBlog();
  await fs.unlink(path.join(FS_BLOG, `${slug}.mdx`));
}
