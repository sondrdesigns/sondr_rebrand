'use client';

const labelStyle = {
  display: 'block',
  fontSize: 9,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--ink-soft)',
  fontFamily: 'var(--font-mono)',
  marginBottom: 8,
};

export function MetaPanel({ excerpt, onExcerptChange, dropCap, onDropCapChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        fontSize: 9,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--ink-soft)',
        fontFamily: 'var(--font-mono)',
      }}>
        Entry Meta
      </div>

      {/* Excerpt */}
      <div>
        <label style={labelStyle}>Excerpt</label>
        <textarea
          value={excerpt}
          onChange={e => onExcerptChange(e.target.value)}
          placeholder="Short description for previews and SEO…"
          rows={4}
          style={{
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            background: 'transparent',
            border: '1px solid var(--ink-soft)',
            padding: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--ink)',
            letterSpacing: '0.04em',
            outline: 'none',
            resize: 'vertical',
            lineHeight: 1.6,
          }}
        />
      </div>

      {/* Drop cap toggle */}
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <div
          onClick={() => onDropCapChange(!dropCap)}
          role="switch"
          aria-checked={dropCap}
          style={{
            width: 36,
            height: 20,
            background: dropCap ? 'var(--ink)' : 'rgba(0,0,0,0.15)',
            borderRadius: 10,
            position: 'relative',
            cursor: 'pointer',
            transition: 'background 0.15s',
            flexShrink: 0,
          }}
        >
          <div style={{
            position: 'absolute',
            top: 2,
            left: dropCap ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'white',
            transition: 'left 0.15s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }} />
        </div>
        <span style={{
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-soft)',
          fontFamily: 'var(--font-mono)',
        }}>
          Drop Cap
        </span>
      </label>
    </div>
  );
}
