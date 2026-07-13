import { Heading } from '@/components/typography/Heading';
import { MonoText } from '@/components/typography/MonoText';
import { PolaroidCard } from '@/components/scrapbook/PolaroidCard';
import { swatch } from '@/lib/siteData';

const TEAM = [
  { name: 'rowan vale', role: 'founder · design', tint: '#d8d3ea' },
  { name: 'imogen park', role: 'design · type', tint: '#cfe3d0' },
  { name: 'theo à beckett', role: 'engineering', tint: '#f0dcc4' },
  { name: 'sana rao', role: 'interior dept.', tint: '#f3d9d2' },
];

const ETHOS = [
  { t: 'paper first', d: 'every project starts as a sketch. screens come later.' },
  { t: 'no house style', d: 'the work should look like you, not like us.' },
  { t: 'built to last', d: 'hand-coded, lightweight, made to age gracefully.' },
];

export function StudioScreen() {
  return (
    <section style={{ padding: '58px 80px 110px' }}>
      <div style={{ maxWidth: 760 }}>
        <Heading level="title">the studio</Heading>
        <MonoText style={{ marginTop: 24, lineHeight: 1.85, maxWidth: 620 }}>
          sondr is a small studio - small on purpose. a handful of people who each leave a fingerprint on the work. we sit close, share drafts on paper, and argue about kerning like it matters. it does.
        </MonoText>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 66, marginTop: 66 }}>
        {TEAM.map((member, index) => (
          <div key={member.name} style={{ position: 'relative', width: 240 }}>
            {index % 2 === 0 && (
              <img src="/assets/tape-cream.png" alt="" style={{ position: 'absolute', width: 120, top: -20, left: 60, zIndex: 3, transform: 'rotate(-8deg)', filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,.22))' }} />
            )}
            <PolaroidCard
              width={240}
              tilt={[-3, 2, -2, 3][index % 4]}
              assetBase="/"
              src={swatch(member.tint)}
              caption={member.name}
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
