import React from 'react';

/**
 * Button — Sondr's outlined "ballot box" button. A hairline black
 * rectangle on paper, mono label, wide tracking. Sharp corners.
 */
export function Button({
  children,
  variant = 'outline',
  size = 'md',
  as = 'button',
  href,
  onClick,
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '10px 20px', fontSize: '13px' },
    md: { padding: '15px 34px', fontSize: '15px' },
    lg: { padding: '20px 44px', fontSize: '20px' },
  };

  const variants = {
    outline: {
      background: 'transparent',
      color: 'var(--ink)',
      boxShadow: 'inset 0 0 0 1px var(--ink)',
    },
    solid: {
      background: 'var(--ink)',
      color: 'var(--paper)',
      boxShadow: 'none',
    },
    sticky: {
      background: 'var(--sticky-yellow)',
      color: 'var(--ink)',
      boxShadow: 'var(--shadow-sticky)',
    },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    letterSpacing: 'var(--tracking-wide)',
    lineHeight: 1,
    textTransform: 'lowercase',
    textDecoration: 'none',
    border: 'none',
    borderRadius: 'var(--radius-none)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'transform 120ms ease, background 120ms ease, color 120ms ease',
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  const Tag = as === 'a' || href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={Tag === 'button' ? disabled : undefined}
      style={base}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
