import React from 'react';

/**
 * StickyNote — a yellow post-it. Slightly tilted, adhesive-lift shadow,
 * one nicked corner. Drop short handwritten-feeling notes inside.
 */
export function StickyNote({
  children,
  tilt = -3,
  color = 'var(--sticky-yellow)',
  size = 220,
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        minHeight: size * 0.9,
        padding: '22px 20px',
        background: color,
        boxShadow: 'var(--shadow-sticky)',
        transform: `rotate(${tilt}deg)`,
        borderRadius: 'var(--radius-note)',
        fontFamily: 'var(--font-mono)',
        fontSize: '15px',
        lineHeight: 1.5,
        letterSpacing: 'var(--tracking-wide)',
        color: 'var(--ink)',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {/* curled bottom corner */}
      <span
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 26,
          height: 26,
          background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.12) 50%)',
        }}
      />
      {children}
    </div>
  );
}
