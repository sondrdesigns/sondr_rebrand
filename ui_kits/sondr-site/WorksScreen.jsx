/* global React */
// WorksScreen — a structured, organized library of all client works.
const { Heading, MonoText, FlipPolaroid, Button } = window.SondrDesignsDesignSystem_41b26a;

function WorksScreen() {
  const { swatch, WORKS } = window.SondrData;
  const [filter, setFilter] = React.useState('all');
  const roles = ['all', ...Array.from(new Set(WORKS.map((w) => w.role)))];
  const shown = filter === 'all' ? WORKS : WORKS.filter((w) => w.role === filter);
  return (
    <section style={{ padding: '58px 80px 100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <Heading level="title">the works library</Heading>
          <MonoText muted style={{ marginTop: 14, maxWidth: 520 }}>
            every site we’ve built, filed by hand. {WORKS.length} projects and counting.
          </MonoText>
        </div>
        <MonoText muted size="small">{shown.length} shown</MonoText>
      </div>

      {/* filter row */}
      <div style={{ display: 'flex', gap: 10, marginTop: 34, flexWrap: 'wrap', borderBottom: '1.5px solid var(--rule-color)', paddingBottom: 22 }}>
        {roles.map((r) => (
          <button key={r} onClick={() => setFilter(r)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '.1em', cursor: 'pointer',
              padding: '8px 16px', border: 'none', borderRadius: 0,
              background: filter === r ? 'var(--ink)' : 'transparent',
              color: filter === r ? 'var(--paper)' : 'var(--ink)',
              boxShadow: filter === r ? 'none' : 'inset 0 0 0 1px var(--ink)',
            }}>{r}</button>
        ))}
      </div>

      {/* grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '64px 48px', marginTop: 56, justifyItems: 'center' }}>
        {shown.map((w, i) => (
          <FlipPolaroid key={w.title} width={244} tilt={[-2, 2, -1, 3, -3, 1][i % 6]} assetBase="../../"
            src={swatch(w.tint)} caption={`${w.title} · ${w.year}`}
            title={w.title} meta={`${w.year} · ${w.role}`} notes={w.notes} />
        ))}
      </div>
    </section>
  );
}
window.WorksScreen = WorksScreen;
