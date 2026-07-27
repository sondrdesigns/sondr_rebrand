'use client';

import { useState } from 'react';
import { Heading } from '@/components/typography/Heading';
import { MonoText } from '@/components/typography/MonoText';
import { Field } from '@/components/core/Field';
import { Button } from '@/components/core/Button';
import { Card } from '@/components/core/Card';
import { StickyNote } from '@/components/scrapbook/StickyNote';
import { SondrIcon } from '@/components/navigation/SondrIcon';

const CONTACTS = [
  { label: 'email', value: 'studio@sondrdesigns.com', icon: 'contact' },
  { label: 'based in', value: 'honolulu, hawaii', icon: 'studio' },
  { label: 'new work', value: 'studio@sondrdesigns.com', icon: 'works' },
];

export function ContactScreen() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !project.trim()) {
      setError('please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, project }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'something went wrong. try emailing us directly.');
      } else {
        setSent(true);
      }
    } catch {
      setError('something went wrong. try emailing us directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="screen-section" style={{ padding: '58px 80px 110px' }}>
      <Heading level="title">say hello</Heading>
      <MonoText muted style={{ marginTop: 14, maxWidth: 520 }}>
        one place for everything. drop a note, or reach us however you like.
      </MonoText>

      <div className="contact-flex" style={{ display: 'flex', gap: 80, marginTop: 56, flexWrap: 'wrap' }}>
        <div className="contact-info-col" style={{ minWidth: 300, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {CONTACTS.map((contact) => (
            <div key={contact.label} style={{ display: 'flex', gap: 18, alignItems: 'center', padding: '20px 0', borderTop: '1.5px solid var(--rule-color)' }}>
              <span className="sondr-icon"><SondrIcon name={contact.icon} size={26} /></span>
              <div>
                <MonoText muted size="small">{contact.label}</MonoText>
                <MonoText style={{ marginTop: 4 }}>{contact.value}</MonoText>
              </div>
            </div>
          ))}
          <StickyNote tilt={-5} size={210} style={{ marginTop: 40 }}>
            studio hours - mon to thu, 10-6. we reply to every note.
          </StickyNote>
        </div>

        <div className="contact-form-col" style={{ position: 'relative', width: 460 }}>
          <img src="/assets/tape-blue.png" alt="" style={{ position: 'absolute', width: 210, top: -26, left: 130, zIndex: 2, transform: 'rotate(3deg)', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,.4))' }} />
          <Card lift style={{ padding: 36 }}>
            {sent ? (
              <div>
                <Heading level="heading" style={{ fontSize: 26 }}>note received</Heading>
                <MonoText style={{ marginTop: 14 }}>thanks - we'll be in touch within a day or two.</MonoText>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Field
                  label="your name"
                  placeholder="jane doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Field
                  label="email"
                  type="email"
                  placeholder="jane@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Field
                  label="project"
                  multiline
                  rows={4}
                  placeholder="tell us about it"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                />
                {error && (
                  <MonoText size="small" style={{ color: 'var(--tape-blue)' }}>{error}</MonoText>
                )}
                <Button
                  variant="solid"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? 'sending...' : 'send it'}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
