import React from 'react';

/**
 * Field — a text input / textarea styled as a hairline paper box with a
 * mono label above it. Matches the Card's border treatment.
 */
export function Field({
  label,
  placeholder,
  multiline = false,
  rows = 4,
  value,
  onChange,
  type = 'text',
  style = {},
  ...rest
}) {
  const control = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--paper-white)',
    border: 'none',
    boxShadow: 'inset 0 0 0 1px var(--ink)',
    borderRadius: 'var(--radius-none)',
    padding: '14px 16px',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-body)',
    letterSpacing: 'var(--tracking-wide)',
    color: 'var(--ink)',
    outline: 'none',
    resize: multiline ? 'vertical' : 'none',
  };
  return (
    <label style={{ display: 'block', ...style }}>
      {label && (
        <span
          style={{
            display: 'block',
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-small)',
            letterSpacing: 'var(--tracking-wide)',
            textTransform: 'lowercase',
            color: 'var(--text-muted)',
          }}
        >
          {label}
        </span>
      )}
      {multiline ? (
        <textarea rows={rows} placeholder={placeholder} value={value} onChange={onChange} style={control} {...rest} />
      ) : (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={control} {...rest} />
      )}
    </label>
  );
}
