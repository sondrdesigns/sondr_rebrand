'use client';

import * as React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/typography/Heading';
import { MonoText } from '@/components/typography/MonoText';
import { Button } from '@/components/core/Button';
import { Divider } from '@/components/core/Divider';
import { StickyNote } from '@/components/scrapbook/StickyNote';
import { FlipPolaroid } from '@/components/scrapbook/FlipPolaroid';
import { WORKS, swatch } from '@/lib/siteData';

function SwipeHint() {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.14em',
      color: 'var(--ink-muted)',
      opacity: 0.7,
    }}>
      <span style={{ display: 'inline-block', animation: 'swipe-nudge 1.6s ease-in-out infinite' }}>←</span>
      swipe
      <span style={{ display: 'inline-block', animation: 'swipe-nudge 1.6s ease-in-out infinite reverse' }}>→</span>
      <style>{`
        @keyframes swipe-nudge {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(-4px); opacity: 1; }
        }
      `}</style>
    </span>
  );
}

function FeaturedWorks() {
  const pinRef = React.useRef(null);
  const stickyRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const [mobile, setMobile] = React.useState(false);

  React.useEffect(() => {
    const pin = pinRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!pin || !sticky || !track) return undefined;

    let maxTranslate = 0;
    let isMobile = window.innerWidth < 820;

    const update = () => {
      if (isMobile || maxTranslate <= 0) return;
      const rect = pin.getBoundingClientRect();
      const span = pin.offsetHeight - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      const tx = progress * maxTranslate;
      track.style.transform = `translateX(${-tx}px)`;
      sticky.style.backgroundPosition = `${sticky._bgX || 0}px ${(sticky._bgY || 0) + tx / 60}px`;
    };

    const measure = () => {
      isMobile = window.innerWidth < 820;
      setMobile(isMobile);
      if (isMobile) {
        pin.style.height = 'auto';
        track.style.transform = 'none';
        maxTranslate = 0;
        sticky.style.backgroundPosition = '';
        return;
      }
      maxTranslate = Math.max(0, track.scrollWidth - sticky.clientWidth);
      pin.style.height = `${window.innerHeight + maxTranslate}px`;
      const pitch = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pitch')) || 24;
      sticky._bgX = -((sticky.getBoundingClientRect().left + window.scrollX) % pitch);
      sticky._bgY = -(sticky.offsetTop % pitch);
      update();
    };

    measure();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 900);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const cards = WORKS.map((work, index) => (
    <FlipPolaroid
      key={work.title}
      width={290}
      tilt={[-3, 2, -2, 3, -1, 2][index % 6]}
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
      style={{ flex: '0 0 auto', scrollSnapAlign: mobile ? 'center' : 'none' }}
    />
  ));

  return (
    <section ref={pinRef} style={{ position: 'relative' }}>
      <div
        ref={stickyRef}
        style={{
          position: mobile ? 'static' : 'sticky',
          top: 0,
          height: mobile ? 'auto' : '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'var(--paper)',
          backgroundImage: 'radial-gradient(var(--dot) var(--dot-size), transparent var(--dot-size))',
          backgroundSize: 'var(--grid-pitch) var(--grid-pitch)',
        }}
      >
        <div style={{ padding: mobile ? '0 24px' : '0 70px', marginBottom: 34, position: 'relative' }}>
          <img src="/assets/tape-blue.png" alt="" style={{ position: 'absolute', width: mobile ? 160 : 320, top: -20, left: mobile ? 8 : 52, transform: 'rotate(-2deg)', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,.4))' }} />
          <Heading level="title" style={{ position: 'relative' }}>featured works</Heading>
          <MonoText muted style={{ marginTop: 12, maxWidth: 520, position: 'relative' }}>
            {mobile
              ? 'swipe sideways to flip through the projects. tap a photo to read the back.'
              : 'keep scrolling - the works run sideways, like flipping through a notebook. hover a photo to read the back.'}
          </MonoText>
        </div>
        <div style={{ position: 'relative' }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 60,
              padding: mobile ? '10px 24px 40px' : '10px 70px',
              overflowX: mobile ? 'auto' : 'visible',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: mobile ? 'x mandatory' : 'none',
              willChange: 'transform',
            }}
          >
            {cards}
            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 18, paddingLeft: 20, paddingRight: 40 }}>
              <MonoText muted style={{ maxWidth: 200 }}>that's the reel. want the full library?</MonoText>
              <Button as="a" href="/works">see all works →</Button>
            </div>
          </div>
          {mobile && (
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 40,
              width: 80,
              background: 'linear-gradient(to right, transparent, var(--paper))',
              pointerEvents: 'none',
            }} />
          )}
          {mobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              paddingBottom: 18,
            }}>
              <SwipeHint />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { n: '01', title: 'web design & build', desc: 'bespoke marketing sites, portfolios & shops. designed and coded in-house.' },
  { n: '02', title: 'brand identity', desc: 'marks, type systems and the small details that make a brand feel like a person.' },
  { n: '03', title: 'interior dept.', desc: 'a growing practice - furniture pieces and spatial thinking, same hand.' },
];

function Footer() {
  return (
    <footer className="footer-inner" style={{ padding: '60px 70px 70px', display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', borderTop: '1.5px solid var(--rule-color)' }}>
      <div>
        <img src="/assets/sondr-text-logo.png" alt="Sondr Designs" className="footer-brand-logo" />
        <MonoText muted size="small" style={{ marginTop: 12 }}>© 2026 - crafted by hand, on paper first.</MonoText>
      </div>
      <div style={{ display: 'flex', gap: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <MonoText muted size="small">pages</MonoText>
          {['works', 'blog', 'studio', 'contact'].map((page) => (
            <Link key={page} href={`/${page}`} style={{ fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: '.1em', color: 'var(--ink)', textDecoration: 'none' }}>
              {page}
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <MonoText muted size="small">elsewhere</MonoText>
          <a href="https://www.instagram.com/sondr.designs" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: '.1em', color: 'var(--ink)', textDecoration: 'none' }}>
            instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export function HomeScreen() {
  return (
    <div>
      <section className="hero-section" style={{ position: 'relative', padding: '30px 70px 66px' }}>
        <div className="hero-stickies" style={{ position: 'absolute', right: 60, top: 20 }}>
          <StickyNote tilt={4} size={196} style={{ position: 'absolute', top: 0, right: 0 }}>
            since 2024 - we build sites with a soul.
          </StickyNote>
          <StickyNote tilt={-6} size={172} color="#c9e5ff" style={{ position: 'absolute', top: 150, right: 74 }}>
            raw · organic · personal
          </StickyNote>
        </div>

        <MonoText muted style={{ marginBottom: 22 }}>a design studio - web, brand & interiors</MonoText>
        <Heading className="hero-h1" style={{ maxWidth: 820, fontSize: 88 }}>crafting elevated <span style={{ color: 'var(--tape-blue)' }}>digital</span> experiences</Heading>
        <MonoText style={{ maxWidth: 600, marginTop: 32, lineHeight: 1.7 }}>
          we help businesses grow by crafting powerful digital platforms that drive conversion and define your identity in the online space.
        </MonoText>
        <div style={{ marginTop: 38, display: 'flex', gap: 18 }}>
          <Button as="a" href="/works" size="lg">view works</Button>
          <Button as="a" href="/contact" size="lg" variant="solid">get in touch</Button>
        </div>
        <MonoText muted size="small" style={{ marginTop: 54, letterSpacing: '.2em' }}>↓ scroll</MonoText>
      </section>

      <Divider />
      <FeaturedWorks />
      <Divider />

      <section className="services-section" style={{ padding: '70px 70px 84px', display: 'flex', gap: 90, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 420 }}>
          <Heading level="heading">what we do</Heading>
          <MonoText style={{ marginTop: 22, lineHeight: 1.8 }}>
            we treat every project like a page in a notebook - open, a little messy, entirely yours. no templates, no house style pressed onto you. just careful, hand-built work.
          </MonoText>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          {SERVICES.map((service) => (
            <div key={service.n} style={{ display: 'flex', gap: 26, padding: '22px 0', borderTop: '1.5px solid var(--rule-color)' }}>
              <MonoText muted style={{ width: 40 }}>{service.n}</MonoText>
              <div>
                <Heading level="heading" as="h4" style={{ fontSize: 24 }}>{service.title}</Heading>
                <MonoText muted size="small" style={{ marginTop: 8 }}>{service.desc}</MonoText>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section" style={{ background: 'var(--tape-blue)', padding: '92px 70px', position: 'relative', overflow: 'hidden' }}>
        <img src="/assets/tape-cream.png" alt="" style={{ position: 'absolute', width: 240, top: -20, right: 120, transform: 'rotate(8deg)', opacity: 0.9 }} />
        <MonoText style={{ color: '#fff', letterSpacing: '.14em', marginBottom: 20 }}>got something in mind?</MonoText>
        <Heading className="cta-h2" style={{ color: '#fff', fontSize: 72, maxWidth: 900 }}>let's make something unrepeatable</Heading>
        <div style={{ marginTop: 40 }}>
          <Button as="a" href="/contact" size="lg" style={{ background: '#fff', color: 'var(--tape-blue)', boxShadow: 'none' }}>start a project</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
