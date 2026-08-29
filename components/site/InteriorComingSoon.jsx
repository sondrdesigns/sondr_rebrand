'use client';

import React from 'react';
import { Heading } from '@/components/typography/Heading';
import { MonoText } from '@/components/typography/MonoText';
import { Button } from '@/components/core/Button';
import { StickyNote } from '@/components/scrapbook/StickyNote';
import { Divider } from '@/components/core/Divider';

export function InteriorComingSoon() {
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setMobile(window.innerWidth < 820);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <section
        style={{
          position: 'relative',
          padding: mobile ? '48px 24px 64px' : '70px 70px 90px',
          minHeight: 'calc(100vh - 120px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundImage: 'radial-gradient(var(--dot) var(--dot-size), transparent var(--dot-size))',
          backgroundSize: 'var(--grid-pitch) var(--grid-pitch)',
        }}
      >
        {!mobile && (
          <>
            <img
              src="/assets/tape-cream.png"
              alt=""
              style={{
                position: 'absolute',
                width: 260,
                top: 50,
                right: 90,
                transform: 'rotate(-5deg)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,.35))',
              }}
            />
            <StickyNote tilt={5} size={190} style={{ position: 'absolute', top: 80, right: 110 }}>
              something careful is being made here.
            </StickyNote>
          </>
        )}

        <MonoText muted style={{ marginBottom: 20, letterSpacing: '.2em' }}>
          interior dept.
        </MonoText>
        <Heading style={{ maxWidth: 680, fontSize: 72 }}>
          furniture with a{' '}
          <span style={{ color: 'var(--tape-blue)' }}>point of view</span>
        </Heading>
        <MonoText style={{ maxWidth: 540, marginTop: 32, lineHeight: 1.85 }}>
          the interior department is a growing practice — furniture pieces and spatial
          thinking, made with the same hand as our web and brand work. we're taking
          our time to get it right.
        </MonoText>

        <div style={{ marginTop: 44, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button as="a" href="/contact" size="lg" variant="solid">
            enquire early →
          </Button>
          <MonoText muted size="small" style={{ marginLeft: 4 }}>
            or drop us a line at studio@sondrdesigns.com
          </MonoText>
        </div>

        <div style={{ marginTop: 80 }}>
          <Divider />
          <div style={{ marginTop: 32, display: 'flex', gap: 60, flexWrap: 'wrap' }}>
            <div>
              <MonoText muted size="small" style={{ letterSpacing: '.18em', marginBottom: 14 }}>
                in the meantime
              </MonoText>
              <div style={{ display: 'flex', gap: 14 }}>
                <Button as="a" href="/works" size="sm">view works</Button>
                <Button as="a" href="/studio" size="sm">the studio</Button>
              </div>
            </div>
            <div>
              <MonoText muted size="small" style={{ letterSpacing: '.18em', marginBottom: 14 }}>
                what to expect
              </MonoText>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['handmade furniture pieces', 'limited editions & made to order', 'spatial consultancy'].map((item) => (
                  <MonoText key={item} size="small">— {item}</MonoText>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
