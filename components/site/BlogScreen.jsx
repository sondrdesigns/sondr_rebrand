import { Heading } from '@/components/typography/Heading';
import { MonoText } from '@/components/typography/MonoText';
import { Button } from '@/components/core/Button';
import { StickyNote } from '@/components/scrapbook/StickyNote';

export function BlogScreen() {
  return (
    <section style={{ padding: '90px 80px 120px', position: 'relative', minHeight: 560 }}>
      <img src="/assets/tape-cream.png" alt="" style={{ position: 'absolute', width: 260, top: 40, right: 160, transform: 'rotate(-9deg)', filter: 'drop-shadow(2px 3px 4px rgba(0,0,0,.22))' }} />

      <div style={{ maxWidth: 720 }}>
        <MonoText muted style={{ marginBottom: 20 }}>the notebook - journal</MonoText>
        <Heading style={{ fontSize: 80 }}>currently<br />scribbling</Heading>
        <MonoText style={{ marginTop: 32, maxWidth: 560, lineHeight: 1.8 }}>
          our journal is still in draft. we're filling the margins with notes on process, type, and the little decisions that make a site feel like a person. first entries land soon.
        </MonoText>

        <div style={{ display: 'flex', gap: 18, marginTop: 40, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            placeholder="your email"
            style={{ background: 'var(--paper-white)', border: 'none', boxShadow: 'inset 0 0 0 1px var(--ink)', padding: '16px 18px', width: 300, fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: '.1em', outline: 'none' }}
          />
          <Button variant="solid" size="lg">tell me when it's live</Button>
        </div>
      </div>

      <div style={{ position: 'absolute', right: 90, bottom: 90 }}>
        <StickyNote tilt={5} size={190}>draft: "why we start on paper"</StickyNote>
        <StickyNote tilt={-7} size={170} color="#c9e5ff" style={{ position: 'absolute', top: -40, right: 120 }}>
          draft: "type as texture"
        </StickyNote>
      </div>
    </section>
  );
}
