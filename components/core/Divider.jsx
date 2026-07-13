import React from 'react';

/**
 * Divider — a thin ruled line, like a pencil stroke across the page.
 * Horizontal by default; supports a faint "hand-drawn" wobble variant.
 */
export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'var(--rule-color)',
  length = '100%',
  style = {},
  ...rest
}) {
  const horizontal = orientation === 'horizontal';
  return (
    <span
      role="separator"
      aria-orientation={orientation}
      style={{
        display: 'block',
        width: horizontal ? length : 0,
        height: horizontal ? 0 : length,
        borderTop: horizontal
          ? `1.5px ${variant === 'dashed' ? 'dashed' : 'solid'} ${color}`
          : 'none',
        borderLeft: horizontal
          ? 'none'
          : `1.5px ${variant === 'dashed' ? 'dashed' : 'solid'} ${color}`,
        ...style,
      }}
      {...rest}
    />
  );
}
