import { Heading } from '@/components/typography/Heading';
import { MonoText } from '@/components/typography/MonoText';
import { Button } from '@/components/core/Button';
import { Divider } from '@/components/core/Divider';

const CATEGORIES = ['all', 'process', 'type & design', 'studio life'];

export function BlogScreen() {
  return (
    <div>
      <section className="blog-header-section" style={{ padding: '58px 80px 56px' }}>
        <MonoText muted style={{ marginBottom: 16, letterSpacing: '.18em' }}>the notebook — journal</MonoText>
        <Heading level="title" as="h1" style={{ maxWidth: 640 }}>where the work gets unpacked</Heading>
        <MonoText style={{ marginTop: 20, maxWidth: 560, lineHeight: 1.85 }}>
          notes on process, type decisions, and the small choices that make a site feel like a person. written in the gaps between projects.
        </MonoText>
      </section>

      <Divider />

      <section className="blog-posts-section" style={{ padding: '40px 80px 32px' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '.1em',
                padding: '7px 14px',
                border: 'none',
                borderRadius: 0,
                background: cat === 'all' ? 'var(--ink)' : 'transparent',
                color: cat === 'all' ? 'var(--paper)' : 'var(--ink)',
                boxShadow: cat === 'all' ? 'none' : 'inset 0 0 0 1px var(--ink)',
                cursor: 'default',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="blog-empty-section" style={{ padding: '0 80px 80px' }}>
        <div style={{
          border: '1.5px dashed var(--rule-color)',
          padding: '80px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 16,
          background: 'rgba(255,255,255,0.35)',
        }}>
          <img
            src="/assets/tape-cream.png"
            alt=""
            style={{ width: 160, transform: 'rotate(-4deg)', opacity: 0.7, filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,.15))' }}
          />
          <Heading level="heading" as="p" style={{ fontSize: 28, marginTop: 8 }}>first entries coming soon</Heading>
          <MonoText muted style={{ maxWidth: 400, lineHeight: 1.8 }}>
            we're filling the margins now — notes on kerning, wireframes, and how a brief becomes a brand. sign up below to get the first post.
          </MonoText>
        </div>
      </section>

      <Divider />

      <section className="blog-newsletter-section" style={{ padding: '64px 80px 80px', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ maxWidth: 640 }}>
          <MonoText style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '.16em', marginBottom: 16 }}>
            the dispatch — newsletter
          </MonoText>
          <Heading level="heading" as="h2" style={{ color: 'var(--paper)', fontSize: 38 }}>
            get new entries in your inbox
          </Heading>
          <MonoText style={{ color: 'rgba(255,255,255,0.65)', marginTop: 16, lineHeight: 1.8 }}>
            no cadence, no filler. one email per post, when it's actually ready.
          </MonoText>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', alignItems: 'stretch' }}>
            <input
              type="email"
              id="blog-notify-email"
              name="email"
              aria-label="Your email address"
              placeholder="your email"
              autoComplete="email"
              style={{
                background: 'transparent',
                border: 'none',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.35)',
                padding: '14px 18px',
                width: 280,
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                letterSpacing: '.08em',
                outline: 'none',
                color: 'var(--paper)',
              }}
            />
            <Button
              variant="outline"
              size="lg"
              style={{ background: 'transparent', color: 'var(--paper)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.55)' }}
            >
              subscribe →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
