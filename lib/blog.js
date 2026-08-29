import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import slugify from 'slugify';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export function generateSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

export async function getAllPosts({ includeUnpublished = false } = {}) {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const mdxFiles = files.filter(f => f.endsWith('.mdx'));
    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const raw = await fs.readFile(path.join(CONTENT_DIR, file), 'utf8');
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
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { frontmatter: { ...data, slug }, content };
}

export async function savePost(slug, frontmatter, content) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const fileContent = matter.stringify(content, frontmatter);
  await fs.writeFile(filePath, fileContent, 'utf8');
  return slug;
}

export async function deletePost(slug) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  await fs.unlink(filePath);
}
