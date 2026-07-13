import React from 'react';

/**
 * Heading — Sondr's display type. Inter, medium, UPPERCASE, tracked wide,
 * tight leading. Levels map to the type scale (display / title / heading).
 */
const LEVELS = {
  display: { fontSize: 'var(--text-display)', lineHeight: 'var(--text-display-lh)' },
  title:   { fontSize: 'var(--text-title)',   lineHeight: 1 },
  heading: { fontSize: 'var(--text-heading)', lineHeight: 1.05 },
};

export function Heading({
  children,
  level = 'display',
  as,
  color = 'var(--ink)',
  style = {},
  ...rest
}) {
  const Tag = as || (level === 'display' ? 'h1' : level === 'title' ? 'h2' : 'h3');
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--weight-medium)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wide)',
        color,
        ...LEVELS[level],
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
