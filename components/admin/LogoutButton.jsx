'use client';
import { useRouter } from 'next/navigation';

export function LogoutButton({ variant = 'default' }) {
  const router = useRouter();

  const color = variant === 'sidebar'
    ? 'rgba(255,251,240,0.45)'
    : 'rgb(102,99,99)';

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <button
      onClick={logout}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 11,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color,
        fontFamily: 'var(--font-mono, monospace)',
        padding: 0,
      }}
    >
      Exit Archive
    </button>
  );
}
