import Link from 'next/link';
import { BlogScreen } from '@/components/site/BlogScreen';
import { getAllPosts } from '@/lib/blog';

export const revalidate = 60;

export const metadata = {
  title: 'Blog',
  description:
    'The Sondr notebook — notes on process, type, and the small decisions that make a site feel like a person. First entries landing soon.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Sondr Designs',
    description: 'Notes on process, type, and the small decisions that make a site feel like a person.',
    url: 'https://sondrdesigns.com/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return <BlogScreen />;
  }

  return (
    <div>
      <section style={{ padding: '58px 80px 56px' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgb(102,99,99)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          the notebook — journal
        </div>
        <h1 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, lineHeight: 1.15, color: 'rgb(0,0,0)', margin: 0, maxWidth: 640 }}>
          where the work gets unpacked
        </h1>
        <p style={{ marginTop: 20, maxWidth: 560, lineHeight: 1.85, fontFamily: 'var(--font-mono)', fontSize: 14, color: 'rgb(0,0,0)', letterSpacing: '0.02em' }}>
          notes on process, type decisions, and the small choices that make a site feel like a person. written in the gaps between projects.
        </p>
      </section>

      <div style={{ borderBottom: '1.5px solid var(--rule-color, rgba(0,0,0,0.12))' }} />

      <section style={{ padding: '48px 80px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {posts.map((post, i) => (
            <article key={post.slug}>
              {i > 0 && <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }} />}
              <Link
                href={`/blog/${post.slug}`}
                style={{ display: 'block', padding: '40px 0', textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgb(102,99,99)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                    : ''}
                  {post.tags?.length ? ` · ${post.tags.join(', ')}` : ''}
                </div>
                <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 400, lineHeight: 1.2, color: 'rgb(0,0,0)', margin: '0 0 16px', maxWidth: 640 }}>
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: 'rgb(102,99,99)', maxWidth: '60ch', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
                    {post.excerpt}
                  </p>
                )}
                <div style={{ marginTop: 20, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgb(0,0,0)', fontFamily: 'var(--font-mono)' }}>
                  Read &rarr;
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <div style={{ borderTop: '1.5px solid rgb(0,0,0)', padding: '64px 80px 80px', background: 'rgb(0,0,0)', color: 'rgb(255,251,240)' }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
            the dispatch — newsletter
          </div>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 38, fontWeight: 400, color: 'rgb(255,251,240)', margin: '0 0 16px' }}>
            get new entries in your inbox
          </h2>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-mono)' }}>
            no cadence, no filler. one email per post, when it&apos;s actually ready.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', alignItems: 'stretch' }}>
            <input
              type="email"
              placeholder="your email"
              autoComplete="email"
              aria-label="Your email address"
              style={{
                background: 'transparent', border: 'none',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.35)',
                padding: '14px 18px', width: 280,
                fontFamily: 'var(--font-mono)', fontSize: 14,
                letterSpacing: '0.08em', outline: 'none', color: 'rgb(255,251,240)',
              }}
            />
            <button
              type="button"
              style={{
                padding: '14px 24px', background: 'transparent',
                border: 'none', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.55)',
                color: 'rgb(255,251,240)', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.12em',
              }}
            >
              subscribe &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
