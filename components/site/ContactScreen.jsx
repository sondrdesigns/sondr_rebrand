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
  { label: 'email', value: 'hello@sondr.designs', icon: 'contact' },
  { label: 'studio', value: 'no. 14, paper mill lane', icon: 'interior' },
  { label: 'new work', value: 'projects@sondr.designs', icon: 'works' },
];

export function ContactScreen() {
  const [sent, setSent] = useState(false);

  return (
    <section style={{ padding: '58px 80px 110px' }}>
      <Heading level="title">say hello</Heading>
      <MonoText muted style={{ marginTop: 14, maxWidth: 520 }}>
        one place for everything. drop a note, or reach us however you like.
      </MonoText>

      <div style={{ display: 'flex', gap: 80, marginTop: 56, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 300, display: 'flex', flexDirection: 'column', gap: 0 }}>
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

        <div style={{ position: 'relative', width: 460 }}>
          <img src="/assets/tape-blue.png" alt="" style={{ position: 'absolute', width: 210, top: -26, left: 130, zIndex: 2, transform: 'rotate(3deg)', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,.4))' }} />
          <Card lift style={{ padding: 36 }}>
            {sent ? (
              <div>
                <Heading level="heading" style={{ fontSize: 26 }}>note received</Heading>
                <MonoText style={{ marginTop: 14 }}>thanks - we'll be in touch within a day or two.</MonoText>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Field label="your name" placeholder="jane doe" />
                <Field label="email" type="email" placeholder="jane@studio.com" />
                <Field label="project" multiline rows={4} placeholder="tell us about it" />
                <Button variant="solid" size="lg" onClick={() => setSent(true)}>send it</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
