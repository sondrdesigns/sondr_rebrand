export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { getAllProjects } from '@/lib/projects';
import { getAllMembers } from '@/lib/members';

function StatTile({ label, value, sub }) {
  return (
    <div style={{
      background: 'rgb(255,255,255)',
      border: '1px solid var(--ink)',
      padding: '28px 24px',
      flex: 1,
    }}>
      <div style={{
        fontSize: 9,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--ink-soft)',
        fontFamily: 'var(--font-mono)',
        marginBottom: 12,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 44,
        fontWeight: 400,
        color: 'var(--ink)',
        lineHeight: 1,
      }}>
        {value}
      </div>
      {sub && (
        <div style={{
          fontSize: 11,
          color: 'var(--ink-soft)',
          fontFamily: 'var(--font-mono)',
          marginTop: 8,
          letterSpacing: '0.06em',
        }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    published: 'rgb(0,0,0)',
    draft: 'rgb(102,99,99)',
    scheduled: 'var(--ikb)',
    Active: 'var(--ikb)',
    Pitched: 'rgba(0,0,0,0.4)',
    'On Hold': 'rgb(200,140,40)',
    Completed: 'rgb(0,0,0)',
  };
  return (
    <span style={{
      fontSize: 10,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: colors[status] || 'rgb(102,99,99)',
      fontFamily: 'var(--font-mono)',
    }}>
      {status || 'draft'}
    </span>
  );
}

export default async function AdminDashboard() {
  const [posts, projects, members] = await Promise.all([
    getAllPosts({ includeUnpublished: true }),
    getAllProjects(),
    getAllMembers(),
  ]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const publishedPosts = posts.filter(p => p.status === 'published');
  const activeProjects = projects.filter(p => p.status === 'Active');
  const hasStripe = !!process.env.STRIPE_SECRET_KEY;

  const recentPosts = publishedPosts.slice(0, 3);
  const recentProjects = activeProjects.slice(0, 3);

  return (
    <div style={{
      padding: '56px 56px 80px',
      fontFamily: 'var(--font-mono)',
    }}>
      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 48,
      }}>
        <div>
          <div style={{
            fontSize: 10,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            marginBottom: 8,
          }}>
            sondr designs
          </div>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 36,
            fontWeight: 400,
            color: 'var(--ink)',
            lineHeight: 1.15,
          }}>
            {greeting}.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link
            href="/admin/blog/new"
            style={{
              display: 'inline-block',
              padding: '11px 22px',
              border: '1px solid var(--ink)',
              background: 'transparent',
              color: 'var(--ink)',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            New Post +
          </Link>
          <Link
            href="/admin/projects/new"
            style={{
              display: 'inline-block',
              padding: '11px 22px',
              background: 'var(--ink)',
              color: 'rgb(255,251,240)',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 14,
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            New Project +
          </Link>
        </div>
      </div>

      {/* Stat tiles */}
      <div style={{ display: 'flex', gap: 1, marginBottom: 56 }}>
        <StatTile
          label="Active Projects"
          value={activeProjects.length}
          sub={`${projects.length} total`}
        />
        <StatTile
          label="Published Posts"
          value={publishedPosts.length}
          sub={`${posts.length} total`}
        />
        <StatTile
          label="Team Members"
          value={members.length}
          sub={members.length === 1 ? '1 member' : `${members.length} members`}
        />
        <StatTile
          label="Revenue"
          value="—"
          sub={hasStripe ? 'loading…' : 'connect stripe'}
        />
      </div>

      {/* Recent Posts */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}>
          <div style={{
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
          }}>
            Recent Posts
          </div>
          <Link
            href="/admin/blog"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              textDecoration: 'none',
            }}
          >
            View all →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div style={{
            padding: '28px 0',
            color: 'var(--ink-soft)',
            fontSize: 13,
            fontStyle: 'italic',
            fontFamily: 'var(--font-serif)',
          }}>
            No published posts yet.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {recentPosts.map(post => (
                <tr key={post.slug} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <td style={{ padding: '14px 0', paddingRight: 24 }}>
                    <Link
                      href={`/admin/blog/${post.slug}/edit`}
                      style={{
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        fontSize: 14,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {post.title || '(untitled)'}
                    </Link>
                  </td>
                  <td style={{ padding: '14px 0', paddingRight: 24 }}>
                    <StatusBadge status={post.status} />
                  </td>
                  <td style={{
                    padding: '14px 0',
                    fontSize: 12,
                    color: 'var(--ink-soft)',
                    letterSpacing: '0.06em',
                    textAlign: 'right',
                  }}>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Active Projects */}
      <div style={{ marginBottom: 56 }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}>
          <div style={{
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
          }}>
            Active Projects
          </div>
          <Link
            href="/admin/projects"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              textDecoration: 'none',
            }}
          >
            View all →
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div style={{
            padding: '28px 0',
            color: 'var(--ink-soft)',
            fontSize: 13,
            fontStyle: 'italic',
            fontFamily: 'var(--font-serif)',
          }}>
            No active projects.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                {['Name', 'Client', 'Status', 'Due'].map(h => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '0 0 10px',
                      fontSize: 9,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-soft)',
                      fontWeight: 400,
                      paddingRight: 24,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentProjects.map(project => (
                <tr key={project.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <td style={{ padding: '14px 0', paddingRight: 24 }}>
                    <Link
                      href={`/admin/projects/${project.id}`}
                      style={{
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        fontSize: 14,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {project.name || '(unnamed)'}
                    </Link>
                  </td>
                  <td style={{
                    padding: '14px 0',
                    paddingRight: 24,
                    fontSize: 12,
                    color: 'var(--ink-soft)',
                    letterSpacing: '0.06em',
                  }}>
                    {project.client || '—'}
                  </td>
                  <td style={{ padding: '14px 0', paddingRight: 24 }}>
                    <StatusBadge status={project.status} />
                  </td>
                  <td style={{
                    padding: '14px 0',
                    fontSize: 12,
                    color: 'var(--ink-soft)',
                    letterSpacing: '0.06em',
                  }}>
                    {project.dueDate
                      ? new Date(project.dueDate).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short',
                        })
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick actions */}
      <div style={{
        display: 'flex',
        gap: 24,
        paddingTop: 32,
        borderTop: '1px solid rgba(0,0,0,0.1)',
      }}>
        <Link
          href="/admin/blog/new"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.12em',
            color: 'var(--ink)',
            textDecoration: 'none',
          }}
        >
          New Entry →
        </Link>
        <Link
          href="/admin/projects/new"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.12em',
            color: 'var(--ink)',
            textDecoration: 'none',
          }}
        >
          New Project →
        </Link>
        <Link
          href="/admin/finances"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.12em',
            color: 'var(--ink)',
            textDecoration: 'none',
          }}
        >
          Finances →
        </Link>
      </div>
    </div>
  );
}
