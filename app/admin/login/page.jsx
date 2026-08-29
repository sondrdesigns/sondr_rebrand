'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const domain = trimmedEmail.split('@')[1] ?? '';
    const validDomain = domain === 'sondrdesigns.com' || domain === 'sondr' || domain.startsWith('sondr.');
    if (!validDomain) {
      setError('use your sondr email to sign in.');
      return;
    }
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmedEmail, password }),
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
      position: 'fixed', inset: 0,
      background: 'rgb(255,251,240)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: 380, padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 12 }}>
            Sondr Designs
          </div>
          <div style={{ fontSize: 26, fontWeight: 500, color: 'rgb(0,0,0)', letterSpacing: '-0.01em' }}>
            Admin
          </div>
          <div style={{ marginTop: 16, height: 1, background: 'rgba(0,0,0,0.12)' }} />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block', fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: 8,
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@sondrdesigns.com"
              required
              autoFocus
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'transparent',
                border: '1.5px solid rgba(0,0,0,0.2)',
                padding: '11px 14px',
                fontSize: 14,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                color: 'rgb(0,0,0)',
                outline: 'none',
                letterSpacing: '0.02em',
                transition: 'border-color 0.12s',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgb(0,0,0)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.2)'; }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 28 }}>
            <label style={{
              display: 'block', fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: 8,
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'transparent',
                border: '1.5px solid rgba(0,0,0,0.2)',
                padding: '11px 14px',
                fontSize: 14,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                color: 'rgb(0,0,0)',
                outline: 'none',
                letterSpacing: '0.08em',
                transition: 'border-color 0.12s',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgb(0,0,0)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.2)'; }}
            />
          </div>

          {error && (
            <div style={{
              fontSize: 11, letterSpacing: '0.1em',
              color: 'rgb(180,0,0)', marginBottom: 20,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px 0',
              background: 'rgb(0,0,0)', color: 'rgb(255,251,240)',
              border: 'none', cursor: loading ? 'wait' : 'pointer',
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 12, fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: 48, fontSize: 10, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', textAlign: 'center',
        }}>
          Sondr Designs &middot; Honolulu &middot; Est. 2025
        </div>
      </div>
    </div>
  );
}
