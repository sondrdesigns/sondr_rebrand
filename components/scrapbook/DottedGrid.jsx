import React from 'react';

/**
 * DottedGrid — the notebook dotted-grid surface. Wrap any section in it
 * to get the signature paper background. Optional left margin rule.
 */
export function DottedGrid({
  children,
  margin = false,
  paper = 'var(--paper)',
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: paper,
        backgroundImage:
          'radial-gradient(var(--dot) var(--dot-size), transparent var(--dot-size))',
        backgroundSize: 'var(--grid-pitch) var(--grid-pitch)',
        ...style,
      }}
      {...rest}
    >
      {margin && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 'var(--margin-rule-x)',
            width: 0,
            borderLeft: '1.5px solid var(--rule-color)',
          }}
        />
      )}
      {children}
    </div>
  );
}
