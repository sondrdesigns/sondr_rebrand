export function PullQuote({ children }) {
  return (
    <blockquote style={{
      margin: '2.5em 0',
      padding: '0 0 0 28px',
      borderLeft: '3px solid var(--ink)',
      fontFamily: 'var(--font-serif)',
      fontSize: 'clamp(18px, 2.2vw, 24px)',
      fontStyle: 'italic',
      color: 'var(--ink)',
      lineHeight: 1.55,
    }}>
      {children}
    </blockquote>
  );
}
