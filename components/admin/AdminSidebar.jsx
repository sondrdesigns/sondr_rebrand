'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutButton } from './LogoutButton';

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true, icon: '⊞' },
  { href: '/admin/blog', label: 'Blog', icon: '✎' },
  { href: '/admin/projects', label: 'Projects', icon: '◈' },
  { href: '/admin/members', label: 'Members', icon: '◉' },
  { href: '/admin/finances', label: 'Finances', icon: '◇' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: 220,
      height: '100vh',
      background: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
      overflowY: 'auto',
    }}>
      {/* IKB accent stripe */}
      <div style={{ height: 3, background: 'var(--ikb, rgb(0,47,167))', flexShrink: 0 }} />

      {/* Wordmark */}
      <div style={{ padding: '28px 28px 36px' }}>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 20,
          color: 'rgb(255,251,240)',
          letterSpacing: '0.02em',
        }}>
          Sondr
        </div>
        <div style={{
          fontSize: 9,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'rgba(255,251,240,0.35)',
          marginTop: 4,
          fontFamily: 'var(--font-mono)',
        }}>
          Studio
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        {NAV.map(item => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 28px',
                paddingLeft: isActive ? 26 : 28,
                borderLeft: isActive
                  ? '2px solid var(--ikb, rgb(0,47,167))'
                  : '2px solid transparent',
                background: isActive ? 'rgba(0,47,167,0.18)' : 'transparent',
                textDecoration: 'none',
                color: isActive ? 'rgb(255,251,240)' : 'rgba(255,251,240,0.42)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                transition: 'color 0.15s, background 0.15s, border-color 0.15s',
              }}
            >
              <span style={{ fontSize: 13, opacity: isActive ? 1 : 0.65 }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{
        padding: '20px 28px 28px',
        borderTop: '1px solid rgba(255,251,240,0.08)',
      }}>
        <LogoutButton variant="sidebar" />
      </div>
    </div>
  );
}
