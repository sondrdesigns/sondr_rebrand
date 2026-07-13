'use client';

import { useState } from 'react';
import { Heading } from '@/components/typography/Heading';
import { MonoText } from '@/components/typography/MonoText';
import { FlipPolaroid } from '@/components/scrapbook/FlipPolaroid';
import { WORKS, swatch } from '@/lib/siteData';

export function WorksScreen() {
  const [filter, setFilter] = useState('all');
  const roles = ['all', ...Array.from(new Set(WORKS.map((work) => work.role)))];
  const shown = filter === 'all' ? WORKS : WORKS.filter((work) => work.role === filter);

  return (
    <section style={{ padding: '58px 80px 100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <Heading level="title">the works library</Heading>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '64px 48px', marginTop: 56, justifyItems: 'center' }}>
        {shown.map((work, index) => (
          <FlipPolaroid
            key={work.title}
            width={244}
            tilt={[-2, 2, -1, 3, -3, 1][index % 6]}
            assetBase="/"
            src={swatch(work.tint)}
            caption={`${work.title} · ${work.year}`}
            title={work.title}
            meta={`${work.year} · ${work.role}`}
            notes={work.notes}
          />
        ))}
      </div>
    </section>
  );
}
