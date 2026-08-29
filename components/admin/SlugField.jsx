'use client';

export function SlugField({ slug, onChange, onManualEdit }) {
  function handleChange(e) {
    const raw = e.target.value;
    // Strip the leading /blog/ prefix if user typed it
    const value = raw.startsWith('/blog/') ? raw.slice(6) : raw;
    onManualEdit(true);
    onChange(value);
  }

  return (
    <div>
      <div style={{
        fontSize: 9,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--ink-soft)',
        fontFamily: 'var(--font-mono)',
        marginBottom: 8,
      }}>
        Permalink
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(102,99,99,0.4)',
        paddingBottom: 6,
      }}>
        <span style={{
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          color: 'var(--ink-soft)',
          letterSpacing: '0.04em',
          flexShrink: 0,
          userSelect: 'none',
        }}>
          /blog/
        </span>
        <input
          type="text"
          value={slug}
          onChange={handleChange}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.04em',
            color: 'var(--ink)',
            padding: 0,
          }}
          placeholder="post-slug"
        />
      </div>
    </div>
  );
}
