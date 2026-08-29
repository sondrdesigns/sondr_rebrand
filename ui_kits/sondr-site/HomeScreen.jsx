/* global React */
// HomeScreen — hero · featured works (scroll pans sideways) · services/mission · blue CTA · footer
const { Heading, MonoText, Button, StickyNote, FlipPolaroid, Divider } = window.SondrDesignsDesignSystem_41b26a;

function SwipeHint() {
  return (
    React.createElement('span', {
      style: {
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em',
        color: 'var(--ink-muted)', opacity: 0.7,
      }
    },
      React.createElement('span', { style: { display: 'inline-block', animation: 'swipe-nudge 1.6s ease-in-out infinite' } }, '←'),
      ' swipe ',
      React.createElement('span', { style: { display: 'inline-block', animation: 'swipe-nudge 1.6s ease-in-out infinite reverse' } }, '→'),
      React.createElement('style', null, `
        @keyframes swipe-nudge {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(-4px); opacity: 1; }
        }
      `)
    )
  );
}

// Featured works: a scroll-pinned section. Scrolling down through it pans
// the polaroids horizontally, like flipping sideways through a notebook.
function FeaturedWorks({ go }) {
  const { swatch, WORKS } = window.SondrData;
  const pinRef = React.useRef(null);
  const stickyRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const [mobile, setMobile] = React.useState(false);

  React.useEffect(() => {
    const pin = pinRef.current, sticky = stickyRef.current, track = trackRef.current;
    if (!pin || !sticky || !track) return;
    let maxTranslate = 0;
    let isMobile = window.innerWidth < 820;

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
      pin.style.height = (window.innerHeight + maxTranslate) + 'px';
      const pitch = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pitch')) || 24;
      sticky._bgX = -((sticky.getBoundingClientRect().left + window.scrollX) % pitch);
      sticky._bgY = -(sticky.offsetTop % pitch);
      update();
    };
    const update = () => {
      if (isMobile || maxTranslate <= 0) return;
      const rect = pin.getBoundingClientRect();
      const span = pin.offsetHeight - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      const tx = progress * maxTranslate;
      track.style.transform = 'translateX(' + (-tx) + 'px)';
      sticky.style.backgroundPosition = (sticky._bgX || 0) + 'px ' + ((sticky._bgY || 0) + tx / 60) + 'px';
    };

    measure();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 900); // after webfont settles
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', measure);
      clearTimeout(t1); clearTimeout(t2);
    };
  }, []);

  const cards = WORKS.map((w, i) => (
    <FlipPolaroid key={w.title} width={290} tilt={[-3, 2, -2, 3, -1, 2][i % 6]} assetBase="../../"
      src={swatch(w.tint)} caption={`${w.title} · ${w.year}`}
      title={w.title} meta={`${w.year} · ${w.role}`} notes={w.notes}
      style={{ flex: '0 0 auto', scrollSnapAlign: mobile ? 'center' : 'none' }} />
  ));

  return (
    <section ref={pinRef} style={{ position: 'relative' }}>
      <div ref={stickyRef} style={{
        position: mobile ? 'static' : 'sticky', top: 0,
        height: mobile ? 'auto' : '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        backgroundColor: 'var(--paper)',
        backgroundImage: 'radial-gradient(var(--dot) var(--dot-size), transparent var(--dot-size))',
        backgroundSize: 'var(--grid-pitch) var(--grid-pitch)',
      }}>
        {/* pinned heading */}
        <div style={{ padding: mobile ? '0 24px' : '0 70px', marginBottom: 34, position: 'relative' }}>
          <img src="../../assets/tape-blue.png" alt="" style={{ position: 'absolute', width: 320, top: -20, left: mobile ? 8 : 52, transform: 'rotate(-2deg)', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,.4))' }} />
          <Heading level="title" style={{ position: 'relative' }}>featured works</Heading>
          <MonoText muted style={{ marginTop: 12, maxWidth: 520 }}>
            {mobile
              ? 'swipe sideways to flip through the projects. tap a photo to read the back.'
              : 'keep scrolling — the works run sideways, like flipping through a notebook. hover a photo to read the back.'}
          </MonoText>
        </div>
        {/* horizontal track */}
        <div style={{ position: 'relative' }}>
          <div ref={trackRef} style={{
            display: 'flex', alignItems: 'center', gap: 60,
            padding: mobile ? '10px 24px 40px' : '10px 70px',
            overflowX: mobile ? 'auto' : 'visible',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: mobile ? 'x mandatory' : 'none',
            willChange: 'transform',
          }}>
            {cards}
            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 18, paddingLeft: 20, paddingRight: 40 }}>
              <MonoText muted style={{ maxWidth: 200 }}>that's the reel. want the full library?</MonoText>
              <Button onClick={() => go('works')}>see all works →</Button>
            </div>
          </div>
          {mobile && (
            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 40, width: 80,
              background: 'linear-gradient(to right, transparent, var(--paper))',
              pointerEvents: 'none',
            }} />
          )}
          {mobile && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, paddingBottom: 18 }}>
              <SwipeHint />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function HomeScreen({ go }) {
  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section style={{ position: 'relative', padding: '30px 70px 66px' }}>
        <div style={{ position: 'absolute', right: 60, top: 20 }}>
          <StickyNote tilt={4} size={196} style={{ position: 'absolute', top: 0, right: 0 }}>
            since 2024 — we build sites with a soul.
          </StickyNote>
          <StickyNote tilt={-6} size={172} color="#c9e5ff" style={{ position: 'absolute', top: 150, right: 74 }}>
            raw · organic · personal
          </StickyNote>
        </div>

        <MonoText muted style={{ marginBottom: 22 }}>a design studio — web, brand & interiors</MonoText>
        <Heading style={{ maxWidth: 820, fontSize: 88 }}>crafting elevated <span style={{ color: 'var(--tape-blue)' }}>digital</span> experiences</Heading>
        <MonoText style={{ maxWidth: 600, marginTop: 32, lineHeight: 1.7 }}>
          we help businesses grow by crafting powerful digital platforms that drive conversion and define your identity in the online space.
        </MonoText>
        <div style={{ marginTop: 38, display: 'flex', gap: 18 }}>
          <Button size="lg" onClick={() => go('works')}>view works</Button>
          <Button size="lg" variant="solid" onClick={() => go('contact')}>get in touch</Button>
        </div>
        <MonoText muted size="small" style={{ marginTop: 54, letterSpacing: '.2em' }}>↓ scroll</MonoText>
      </section>

      <Divider />

      {/* ---------- FEATURED WORKS (horizontal pan) ---------- */}
      <FeaturedWorks go={go} />

      <Divider />

      {/* ---------- SERVICES / MISSION ---------- */}
      <section style={{ padding: '70px 70px 84px', display: 'flex', gap: 90, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 420 }}>
          <Heading level="heading">what we do</Heading>
          <MonoText style={{ marginTop: 22, lineHeight: 1.8 }}>
            we treat every project like a page in a notebook — open, a little messy, entirely yours. no templates, no house style pressed onto you. just careful, hand-built work.
          </MonoText>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          {SERVICES.map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: 26, padding: '22px 0', borderTop: '1.5px solid var(--rule-color)' }}>
              <MonoText muted style={{ width: 40 }}>{s.n}</MonoText>
              <div>
                <Heading level="heading" as="h4" style={{ fontSize: 24 }}>{s.title}</Heading>
                <MonoText muted size="small" style={{ marginTop: 8 }}>{s.desc}</MonoText>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- BLUE SCREEN CTA ---------- */}
      <section style={{ background: 'var(--tape-blue)', padding: '92px 70px', position: 'relative', overflow: 'hidden' }}>
        <img src="../../assets/tape-cream.png" alt="" style={{ position: 'absolute', width: 240, top: -20, right: 120, transform: 'rotate(8deg)', opacity: 0.9 }} />
        <MonoText style={{ color: '#fff', letterSpacing: '.14em', marginBottom: 20 }}>got something in mind?</MonoText>
        <Heading style={{ color: '#fff', fontSize: 72, maxWidth: 900 }}>let's make something unrepeatable</Heading>
        <div style={{ marginTop: 40 }}>
          <Button size="lg" onClick={() => go('contact')}
            style={{ background: '#fff', color: 'var(--tape-blue)', boxShadow: 'none' }}>start a project</Button>
        </div>
      </section>

      <Footer go={go} />
    </div>
  );
}

const SERVICES = [
  { n: '01', title: 'web design & build', desc: 'bespoke marketing sites, portfolios & shops. designed and coded in-house.' },
  { n: '02', title: 'brand identity', desc: 'marks, type systems and the small details that make a brand feel like a person.' },
  { n: '03', title: 'interior dept.', desc: 'a growing practice — furniture pieces and spatial thinking, same hand.' },
];

function Footer({ go }) {
  return (
    <footer style={{ padding: '60px 70px 70px', display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', borderTop: '1.5px solid var(--rule-color)' }}>
      <div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 24, letterSpacing: '.14em' }}>sondr designs</span>
        <MonoText muted size="small" style={{ marginTop: 12 }}>© 2026 — crafted by hand, on paper first.</MonoText>
      </div>
      <div style={{ display: 'flex', gap: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <MonoText muted size="small">pages</MonoText>
          {['works', 'blog', 'studio', 'contact'].map((p) => (
            <a key={p} href="#" onClick={(e) => { e.preventDefault(); go(p); }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: '.1em', color: 'var(--ink)', textDecoration: 'none' }}>{p}</a>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <MonoText muted size="small">elsewhere</MonoText>
          {['instagram', 'read.cv', 'are.na'].map((p) => (
            <a key={p} href="#" onClick={(e) => e.preventDefault()}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: '.1em', color: 'var(--ink)', textDecoration: 'none' }}>{p}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

window.HomeScreen = HomeScreen;
window.SondrFooter = Footer;
