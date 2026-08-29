export function ExhibitionImage({ src, alt, photographer, date, context }) {
  if (!src) return null;
  const hasCaption = photographer || date || context;
  return (
    <figure style={{ margin: '2.5em 0', padding: 0 }}>
      <img
        src={src}
        alt={alt || ''}
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
      />
      {hasCaption && (
        <figcaption style={{
          padding: '10px 0 0',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--ink-soft)',
          letterSpacing: '0.1em',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          marginTop: 0,
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          {photographer && <span>{photographer}</span>}
          {date && <span style={{ opacity: 0.6 }}>{date}</span>}
          {context && <em style={{ fontStyle: 'italic' }}>{context}</em>}
        </figcaption>
      )}
    </figure>
  );
}
