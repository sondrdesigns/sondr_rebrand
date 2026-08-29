export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { DeleteButton } from '@/components/admin/DeleteButton';

export default async function BlogListPage() {
  const posts = await getAllPosts({ includeUnpublished: true });

  const statusColor = {
    published: 'rgb(0,0,0)',
    draft: 'rgb(102,99,99)',
    scheduled: 'var(--ikb)',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-mono, monospace)' }}>
      {/* Page header */}
      <div style={{
        padding: '40px 56px 32px',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        borderBottom: '1.5px solid var(--ink)',
      }}>
        <div>
          <div style={{
            fontSize: 10,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            fontFamily: 'var(--font-mono)',
            marginBottom: 6,
          }}>
            editorial
          </div>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 28,
          }}>
            The Archive
          </div>
        </div>
        <Link
          href="/admin/blog/new"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'var(--ink)',
            color: 'rgb(255,251,240)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 15,
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          New Entry +
        </Link>
      </div>

      {/* Post list */}
      <div style={{ padding: '40px 56px' }}>
        {posts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            paddingTop: 80,
            color: 'var(--ink-soft)',
            fontSize: 13,
            letterSpacing: '0.14em',
          }}>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 24,
              fontStyle: 'italic',
              marginBottom: 12,
            }}>
              The archive is empty.
            </div>
            <div>Begin your first entry.</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ink-soft)' }}>
                {['Title', 'Status', 'Published', 'Updated', ''].map(h => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '0 0 14px',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-soft)',
                      fontWeight: 400,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.slug} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <td style={{ padding: '18px 0', paddingRight: 24 }}>
                    <Link
                      href={`/admin/blog/${post.slug}/edit`}
                      style={{
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        fontSize: 15,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {post.title || '(untitled)'}
                    </Link>
                  </td>
                  <td style={{ padding: '18px 0', paddingRight: 24 }}>
                    <span style={{
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: statusColor[post.status] || 'var(--ink-soft)',
                    }}>
                      {post.status || 'draft'}
                    </span>
                  </td>
                  <td style={{
                    padding: '18px 0',
                    paddingRight: 24,
                    fontSize: 12,
                    color: 'var(--ink-soft)',
                    letterSpacing: '0.06em',
                  }}>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td style={{
                    padding: '18px 0',
                    paddingRight: 24,
                    fontSize: 12,
                    color: 'var(--ink-soft)',
                    letterSpacing: '0.06em',
                  }}>
                    {post.updatedAt
                      ? new Date(post.updatedAt).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td style={{ padding: '18px 0', textAlign: 'right' }}>
                    <Link
                      href={`/admin/blog/${post.slug}/edit`}
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-soft)',
                        textDecoration: 'none',
                        marginRight: 20,
                      }}
                    >
                      Edit
                    </Link>
                    <DeleteButton slug={post.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
