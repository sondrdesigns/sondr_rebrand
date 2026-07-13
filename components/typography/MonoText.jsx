import React from 'react';

/**
 * MonoText — body/label copy in Intel One Mono with wide tracking.
 * The counterpart to Heading; carries all running text, captions, labels.
 */
export function MonoText({
  children,
  as = 'p',
  size = 'body',
  muted = false,
  style = {},
  ...rest
}) {
  const sizes = {
    lead: 'var(--text-lead)',
    body: 'var(--text-body)',
    small: 'var(--text-small)',
  };
  const Tag = as;
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: 'var(--font-mono)',
        fontWeight: 'var(--weight-regular)',
        fontSize: sizes[size],
        lineHeight: 'var(--body-lh)',
        letterSpacing: 'var(--tracking-wide)',
        color: muted ? 'var(--text-muted)' : 'var(--ink)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
