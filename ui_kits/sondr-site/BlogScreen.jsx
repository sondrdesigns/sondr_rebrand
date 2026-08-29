/* global React */
// BlogScreen — proper blog landing with empty state + newsletter.
const { Heading, MonoText, Button, Divider } = window.SondrDesignsDesignSystem_41b26a;

const CATEGORIES = ['all', 'process', 'type & design', 'studio life'];

function BlogScreen() {
  return (
    React.createElement('div', null,
      React.createElement('section', { style: { padding: '58px 80px 56px' } },
        React.createElement(MonoText, { muted: true, style: { marginBottom: 16, letterSpacing: '.18em' } }, 'the notebook — journal'),
        React.createElement(Heading, { level: 'title', style: { maxWidth: 640 } }, 'where the work gets unpacked'),
        React.createElement(MonoText, { style: { marginTop: 20, maxWidth: 560, lineHeight: 1.85 } },
          'notes on process, type decisions, and the small choices that make a site feel like a person. written in the gaps between projects.'
        )
      ),
      React.createElement(Divider, null),
      React.createElement('section', { style: { padding: '40px 80px 32px' } },
        React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
          CATEGORIES.map((cat) =>
            React.createElement('button', {
              key: cat,
              type: 'button',
              style: {
                fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em',
                padding: '7px 14px', border: 'none', borderRadius: 0,
                background: cat === 'all' ? 'var(--ink)' : 'transparent',
                color: cat === 'all' ? 'var(--paper)' : 'var(--ink)',
                boxShadow: cat === 'all' ? 'none' : 'inset 0 0 0 1px var(--ink)',
                cursor: 'default',
              },
            }, cat)
          )
        )
      ),
      React.createElement('section', { style: { padding: '0 80px 80px' } },
        React.createElement('div', {
          style: {
            border: '1.5px dashed var(--rule-color)', padding: '80px 48px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', gap: 16, background: 'rgba(255,255,255,0.35)',
          }
        },
          React.createElement('img', { src: '../../assets/tape-cream.png', alt: '', style: { width: 160, transform: 'rotate(-4deg)', opacity: 0.7, filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,.15))' } }),
          React.createElement(Heading, { level: 'heading', style: { fontSize: 28, marginTop: 8 } }, 'first entries coming soon'),
          React.createElement(MonoText, { muted: true, style: { maxWidth: 400, lineHeight: 1.8 } },
            'we\'re filling the margins now — notes on kerning, wireframes, and how a brief becomes a brand. sign up below to get the first post.'
          )
        )
      ),
      React.createElement(Divider, null),
      React.createElement('section', { style: { padding: '64px 80px 80px', background: 'var(--ink)', color: 'var(--paper)' } },
        React.createElement('div', { style: { maxWidth: 640 } },
          React.createElement(MonoText, { style: { color: 'rgba(255,255,255,0.55)', letterSpacing: '.16em', marginBottom: 16 } }, 'the dispatch — newsletter'),
          React.createElement(Heading, { level: 'heading', style: { color: 'var(--paper)', fontSize: 38 } }, 'get new entries in your inbox'),
          React.createElement(MonoText, { style: { color: 'rgba(255,255,255,0.65)', marginTop: 16, lineHeight: 1.8 } },
            'no cadence, no filler. one email per post, when it\'s actually ready.'
          ),
          React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', alignItems: 'stretch' } },
            React.createElement('input', {
              type: 'email', placeholder: 'your email',
              style: {
                background: 'transparent', border: 'none',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.35)',
                padding: '14px 18px', width: 280, fontFamily: 'var(--font-mono)',
                fontSize: 14, letterSpacing: '.08em', outline: 'none', color: 'var(--paper)',
              }
            }),
            React.createElement(Button, {
              variant: 'outline', size: 'lg',
              style: { background: 'transparent', color: 'var(--paper)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.55)' }
            }, 'subscribe →')
          )
        )
      )
    )
  );
}
window.BlogScreen = BlogScreen;
