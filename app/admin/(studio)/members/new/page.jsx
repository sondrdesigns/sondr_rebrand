import Link from 'next/link';
import { MemberForm } from '@/components/admin/MemberForm';

export default function NewMemberPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Header */}
      <div style={{
        padding: '32px 56px',
        borderBottom: '1.5px solid var(--ink)',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        fontFamily: 'var(--font-mono)',
      }}>
        <Link
          href="/admin/members"
          style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            textDecoration: 'none',
          }}
        >
          &larr; Team
        </Link>
        <div style={{ flex: 1 }} />
        <div style={{
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--ink-soft)',
        }}>
          New Member
        </div>
      </div>

      <MemberForm isNew />
    </div>
  );
}
