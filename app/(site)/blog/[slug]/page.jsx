import { notFound } from 'next/navigation';
import { getPost, getAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/lib/mdxComponents';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  try {
    const { frontmatter } = await getPost(params.slug);
    return {
      title: frontmatter.seo?.metaTitle || `${frontmatter.title} — Sondr Designs`,
      description: frontmatter.seo?.metaDescription || frontmatter.excerpt,
      openGraph: {
        images: frontmatter.coverImage
          ? [frontmatter.coverImage]
          : frontmatter.seo?.ogImage
          ? [frontmatter.seo.ogImage]
          : [],
      },
    };
  } catch { return {}; }
}

export default async function BlogPostPage({ params }) {
  let post;
  try {
    post = await getPost(params.slug);
  } catch {
    notFound();
  }
  const { frontmatter, content } = post;
  const now = new Date();
  const isVisible =
    frontmatter.status === 'published' ||
    (frontmatter.status === 'scheduled' && new Date(frontmatter.scheduledFor) <= now);
  if (!isVisible) notFound();

  const { coverImage, dropCap } = frontmatter;

  return (
    <article>
      {/* Cover image — full bleed */}
      {coverImage && (
        <div style={{ width: '100%', height: 'clamp(280px, 45vw, 540px)', overflow: 'hidden' }}>
          <img
            src={coverImage}
            alt={frontmatter.title || ''}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      {/* Post body */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: coverImage ? '64px 40px 100px' : '80px 40px 100px', fontFamily: 'var(--font-mono, monospace)' }}>
        {/* Meta */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            marginBottom: 20,
            fontFamily: 'var(--font-mono)',
          }}>
            {frontmatter.publishedAt
              ? new Date(frontmatter.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })
              : ''}
            {frontmatter.tags?.length ? ` · ${frontmatter.tags.join(', ')}` : ''}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: 'var(--ink)',
            margin: 0,
            marginBottom: 24,
          }}>
            {frontmatter.title}
          </h1>
          {frontmatter.excerpt && (
            <p style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: 'var(--ink-soft)',
              margin: 0,
              maxWidth: '60ch',
              letterSpacing: '0.02em',
              fontFamily: 'var(--font-mono)',
            }}>
              {frontmatter.excerpt}
            </p>
          )}
          <div style={{ marginTop: 32, width: 48, height: 1.5, background: 'var(--ink)' }} />
        </div>

        {/* Drop cap style */}
        {dropCap && (
          <style>{`
            .blog-body > p:first-of-type::first-letter {
              font-family: var(--font-serif);
              font-size: 5.2em;
              font-weight: 400;
              line-height: 0.75;
              float: left;
              margin-right: 0.08em;
              margin-top: 0.06em;
              color: var(--ink);
            }
          `}</style>
        )}

        {/* MDX body */}
        <div
          className="blog-body"
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: 'var(--ink)',
            letterSpacing: '0.02em',
          }}
        >
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
