import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import slugify from 'slugify';
import { contentDir, ensureContentDir } from './content-dir.js';

function validateSlug(slug) {
  if (!slug || typeof slug !== 'string' || !/^[a-z0-9_-]+$/i.test(slug) || slug.length > 128) {
    throw new Error('Invalid slug');
  }
}

export function generateSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

export async function getAllPosts({ includeUnpublished = false } = {}) {
  try {
    const dir = await ensureContentDir('blog');
    const files = await fs.readdir(dir);
    const posts = await Promise.all(
      files.filter(f => f.endsWith('.mdx')).map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), 'utf8');
        const { data } = matter(raw);
        return { ...data, slug: data.slug || file.replace('.mdx', '') };
      })
    );
    const now = new Date();
    const filtered = includeUnpublished
      ? posts
      : posts.filter(p =>
          p.status === 'published' ||
          (p.status === 'scheduled' && new Date(p.scheduledFor) <= now)
        );
    return filtered.sort((a, b) => {
      const da = a.publishedAt ? new Date(a.publishedAt) : new Date(0);
      const db = b.publishedAt ? new Date(b.publishedAt) : new Date(0);
      return db - da;
    });
  } catch {
    return [];
  }
}

export async function getPost(slug) {
  validateSlug(slug);
  const dir = contentDir('blog');
  const raw = await fs.readFile(path.join(dir, `${slug}.mdx`), 'utf8');
  const { data, content } = matter(raw);
  return { frontmatter: { ...data, slug }, content };
}

export async function savePost(slug, frontmatter, content) {
  validateSlug(slug);
  const dir = await ensureContentDir('blog');
  await fs.writeFile(path.join(dir, `${slug}.mdx`), matter.stringify(content, frontmatter), 'utf8');
  return slug;
}

export async function deletePost(slug) {
  validateSlug(slug);
  const dir = contentDir('blog');
  await fs.unlink(path.join(dir, `${slug}.mdx`));
}
