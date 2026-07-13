import React from 'react';

/**
 * Card — a clean white sheet with a hairline black inset border, matching
 * the source's Rectangle (405×146, inset 0 0 0 1px black). Sharp corners.
 * The neutral container for content that isn't taped/pinned.
 */
export function Card({
  children,
  padded = true,
  lift = false,
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--paper-white)',
        boxShadow: lift
          ? 'inset 0 0 0 1px var(--ink), var(--shadow-lift)'
          : 'inset 0 0 0 1px var(--ink)',
        borderRadius: 'var(--radius-none)',
        padding: padded ? 'var(--space-3)' : 0,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
