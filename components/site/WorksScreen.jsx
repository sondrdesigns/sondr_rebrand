'use client';

import { useState, useEffect } from 'react';
import { Heading } from '@/components/typography/Heading';
import { MonoText } from '@/components/typography/MonoText';
import { FlipPolaroid } from '@/components/scrapbook/FlipPolaroid';
import { WORKS, swatch } from '@/lib/siteData';

export function WorksScreen() {
  const [filter, setFilter] = useState('all');
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 820);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const roles = ['all', ...Array.from(new Set(WORKS.map((work) => work.role)))];
  const shown = filter === 'all' ? WORKS : WORKS.filter((work) => work.role === filter);

  return (
    <section className="screen-section" style={{ padding: '58px 80px 100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <Heading level="title" as="h1">the works library</Heading>
          <MonoText muted style={{ marginTop: 14, maxWidth: 520 }}>
            every site we've built, filed by hand. {WORKS.length} projects and counting.
          </MonoText>
        </div>
        <MonoText muted size="small">{shown.length} shown</MonoText>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 34, flexWrap: 'wrap', borderBottom: '1.5px solid var(--rule-color)', paddingBottom: 22 }}>
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => setFilter(role)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              letterSpacing: '.1em',
              padding: '8px 16px',
              border: 'none',
              borderRadius: 0,
              background: filter === role ? 'var(--ink)' : 'transparent',
              color: filter === role ? 'var(--paper)' : 'var(--ink)',
              boxShadow: filter === role ? 'none' : 'inset 0 0 0 1px var(--ink)',
            }}
          >
            {role}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: mobile ? '48px 16px' : '64px 48px',
        marginTop: 56,
        justifyItems: 'center',
      }}>
        {shown.map((work, index) => (
          <FlipPolaroid
            key={work.title}
            width={mobile ? undefined : 244}
            tilt={[-2, 2, -1, 3, -3, 1][index % 6]}
            assetBase="/"
            src={work.image ? undefined : swatch(work.tint)}
            logoSrc={work.image}
            tint={work.tint}
            caption={work.title}
            title={work.title}
            meta={work.role}
            notes={work.notes}
            url={work.url}
            comingSoon={work.comingSoon}
            style={mobile ? { width: '100%' } : undefined}
          />
        ))}
      </div>
    </section>
  );
}
