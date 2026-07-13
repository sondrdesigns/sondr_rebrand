import React from 'react';

/**
 * NavItem — a single navigation entry. Lowercase mono; the "current"
 * state gets a hand-underline. Lives in the left margin on desktop.
 */
export function NavItem({
  children,
  href = '#',
  current = false,
  onClick,
  style = {},
  ...rest
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={current ? 'page' : undefined}
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-lead)',
        letterSpacing: 'var(--tracking-wide)',
        color: 'var(--ink)',
        textDecoration: 'none',
        paddingBottom: 2,
        borderBottom: current ? '2px solid var(--ink)' : '2px solid transparent',
        opacity: current ? 1 : 0.72,
        transition: 'opacity 120ms ease, border-color 120ms ease',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = current ? 1 : 0.72; }}
      {...rest}
    >
      {children}
    </a>
  );
}
