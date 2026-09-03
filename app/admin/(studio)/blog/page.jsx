'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiErrorMessage } from '@/lib/client-api';

const STATUS_COLOR = {
  published: 'rgb(0,0,0)',
  draft: 'rgb(130,120,120)',
  scheduled: 'var(--ikb, rgb(0,47,167))',
};

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/posts')
      .then(async r => {
        if (!r.ok) throw new Error(await apiErrorMessage(r, 'Unable to load articles'));
        return r.json();
      })
      .then(data => { setPosts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(error => { setErrorMessage(error.message); setLoading(false); });
  }, []);

  async function handleDelete(slug) {
    if (!confirm('Delete this entry permanently?')) return;
    setDeletingSlug(slug);
    try {
      const res = await fetch(`/api/admin/posts/${encodeURIComponent(slug)}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.slug !== slug));
      } else {
        const data = await res.json();
        alert(data.error || 'Delete failed');
      }
    } catch {
      alert('Delete failed — check your connection');
    } finally {
      setDeletingSlug(null);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-mono, monospace)' }}>
      {/* Header */}
      <div style={{
        padding: '40px 56px 32px',
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        borderBottom: '1.5px solid var(--ink)',
      }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
            editorial
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 28 }}>
            The Archive
          </div>
        </div>
        <Link
          href="/admin/blog/new"
          style={{
            display: 'inline-block', padding: '12px 24px',
            background: 'var(--ink)', color: 'rgb(255,251,240)',
            fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15,
            textDecoration: 'none', letterSpacing: '0.04em',
          }}
        >
          New Entry +
        </Link>
      </div>

      {/* List */}
      <div style={{ padding: '40px 56px' }}>
        {errorMessage ? (
          <div style={{ color: 'rgb(180,0,0)', fontSize: 12 }}>{errorMessage}</div>
        ) : loading ? (
          <div style={{ fontSize: 12, letterSpacing: '0.18em', color: 'var(--ink-soft)', paddingTop: 40 }}>
            loading…
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--ink-soft)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontStyle: 'italic', marginBottom: 12 }}>
              The archive is empty.
            </div>
            <div style={{ fontSize: 13, letterSpacing: '0.1em' }}>Begin your first entry.</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ink-soft)' }}>
                {['Title', 'Status', 'Published', 'Updated', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '0 0 14px', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-soft)', fontWeight: 400 }}>
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
                      style={{ color: 'var(--ink)', textDecoration: 'none', fontSize: 15, letterSpacing: '0.04em' }}
                    >
                      {post.title || '(untitled)'}
                    </Link>
                  </td>
                  <td style={{ padding: '18px 0', paddingRight: 24 }}>
                    <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: STATUS_COLOR[post.status] || 'var(--ink-soft)' }}>
                      {post.status || 'draft'}
                    </span>
                  </td>
                  <td style={{ padding: '18px 0', paddingRight: 24, fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                    {fmtDate(post.publishedAt)}
                  </td>
                  <td style={{ padding: '18px 0', paddingRight: 24, fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                    {fmtDate(post.updatedAt)}
                  </td>
                  <td style={{ padding: '18px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <Link
                      href={`/admin/blog/${post.slug}/edit`}
                      style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', textDecoration: 'none', marginRight: 20 }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      disabled={deletingSlug === post.slug}
                      style={{
                        background: 'none', border: 'none', cursor: deletingSlug === post.slug ? 'default' : 'pointer',
                        fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: deletingSlug === post.slug ? 'var(--ink-soft)' : 'rgb(130,120,120)',
                        fontFamily: 'var(--font-mono, monospace)',
                      }}
                    >
                      {deletingSlug === post.slug ? 'deleting…' : 'Delete'}
                    </button>
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
