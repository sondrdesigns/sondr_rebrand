'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      setError('incorrect password.');
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgb(255,251,240)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono, monospace)',
    }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '0 24px' }}>
        {/* Museum header */}
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgb(102,99,99)', marginBottom: 16 }}>
            sondr designs — restricted access
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: 'rgb(0,0,0)', lineHeight: 1.2 }}>
            Editorial Archive
          </div>
          <div style={{ marginTop: 12, width: 40, height: 1, background: 'rgb(0,0,0)', margin: '12px auto 0' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgb(102,99,99)', marginBottom: 10 }}>
              Access Code
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'transparent',
                border: 'none', borderBottom: '1.5px solid rgb(0,0,0)',
                padding: '10px 0', fontSize: 15,
                fontFamily: 'var(--font-mono, monospace)',
                color: 'rgb(0,0,0)', outline: 'none',
                letterSpacing: '0.08em',
              }}
            />
          </div>

          {error && (
            <div style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ikb, rgb(0,47,167))', marginBottom: 20 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '16px 0',
              background: 'rgb(0,0,0)', color: 'rgb(255,251,240)',
              border: 'none', cursor: loading ? 'wait' : 'pointer',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic', fontSize: 17,
              letterSpacing: '0.04em',
              transition: 'transform 120ms ease',
            }}
          >
            {loading ? 'verifying…' : 'Enter the Archive'}
          </button>
        </form>

        <div style={{ marginTop: 48, textAlign: 'center', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgb(102,99,99)' }}>
          sondr designs &middot; leeds &middot; est. 2024
        </div>
      </div>
    </div>
  );
}
