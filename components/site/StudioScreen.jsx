'use client';

import React from 'react';
import { Heading } from '@/components/typography/Heading';
import { MonoText } from '@/components/typography/MonoText';
import { PolaroidCard } from '@/components/scrapbook/PolaroidCard';

const TEAM = [
  { name: 'aizen chung', role: 'co-founder · project manager', tint: '#d8d3ea', email: 'aizen@sondrdesigns.com' },
  { name: 'toshio nagai', role: 'co-founder · head of technology', tint: '#d4e4ee', email: 'toshi@sondrdesigns.com' },
  { name: 'joseph kim', role: 'head of design', tint: '#f0dcc4', email: 'joseph@sondrdesigns.com' },
];

const ETHOS = [
  { t: 'paper first', d: 'every project starts as a sketch. screens come later.' },
  { t: 'no house style', d: 'the work should look like you, not like us.' },
  { t: 'built to last', d: 'hand-coded, lightweight, made to age gracefully.' },
];

export function StudioScreen() {
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setMobile(window.innerWidth < 820);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="screen-section" style={{ padding: '58px 80px 110px' }}>
      <div style={{ maxWidth: 760 }}>
        <Heading level="title" as="h1">the studio</Heading>
        <MonoText style={{ marginTop: 24, lineHeight: 1.85, maxWidth: 620 }}>
          sondr is a small studio — small on purpose. three people based in honolulu, each leaving a fingerprint on the work. we share drafts, argue about kerning, and build things that last. the small part is intentional.
        </MonoText>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(3, 240px)',
        gap: mobile ? '48px 24px' : '66px',
        marginTop: 66,
        justifyItems: 'center',
        justifyContent: mobile ? 'center' : 'start',
      }}>
        {TEAM.map((member, index) => (
          <div key={member.name} style={{ position: 'relative', width: mobile ? '100%' : 240, maxWidth: 240 }}>
            {index % 2 === 0 && !mobile && (
              <img src="/assets/tape-cream.png" alt="" style={{ position: 'absolute', width: 120, top: -20, left: 60, zIndex: 3, transform: 'rotate(-8deg)', filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,.22))' }} />
            )}
            <PolaroidCard
              width={mobile ? undefined : 240}
              tilt={[-3, 2, -2][index % 3]}
              assetBase="/"
              src="/assets/profile-placeholder.svg"
              tint={member.tint}
              caption={member.name}
              email={member.email}
              comingSoon
              style={mobile ? { width: '100%' } : undefined}
            />
            <MonoText muted size="small" style={{ textAlign: 'center', marginTop: 10 }}>{member.role}</MonoText>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 60, marginTop: 90, flexWrap: 'wrap', borderTop: '1.5px solid var(--rule-color)', paddingTop: 44 }}>
        {ETHOS.map((item) => (
          <div key={item.t} style={{ maxWidth: 300 }}>
            <Heading level="heading" as="h4" style={{ fontSize: 22 }}>{item.t}</Heading>
            <MonoText muted size="small" style={{ marginTop: 12, lineHeight: 1.7 }}>{item.d}</MonoText>
          </div>
        ))}
      </div>
    </section>
  );
}
