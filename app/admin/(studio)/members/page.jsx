export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllMembers } from '@/lib/members';
import { getAllProjects } from '@/lib/projects';

export default async function MembersPage() {
  const [members, projects] = await Promise.all([
    getAllMembers(),
    getAllProjects(),
  ]);

  // Count projects per member
  const projectsByMember = {};
  projects.forEach(p => {
    (p.memberIds || p.members || []).forEach(mid => {
      projectsByMember[mid] = (projectsByMember[mid] || 0) + 1;
    });
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <div style={{
        padding: '40px 56px 32px',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        borderBottom: '1.5px solid var(--ink)',
      }}>
        <div>
          <div style={{
            fontSize: 10,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            marginBottom: 6,
          }}>
            studio
          </div>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 28,
            fontWeight: 400,
          }}>
            Team
          </div>
        </div>
        <Link
          href="/admin/members/new"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'var(--ink)',
            color: 'rgb(255,251,240)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 15,
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          Add Member +
        </Link>
      </div>

      {/* Table */}
      <div style={{ padding: '40px 56px' }}>
        {members.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--ink-soft)' }}>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 24,
              fontStyle: 'italic',
              marginBottom: 12,
            }}>
              No team members yet.
            </div>
            <div style={{ fontSize: 13, letterSpacing: '0.12em' }}>Add your first collaborator.</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ink-soft)' }}>
                {['Name', 'Role', 'Email', 'Projects', ''].map(h => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '0 24px 14px 0',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-soft)',
                      fontWeight: 400,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <td style={{ padding: '18px 24px 18px 0' }}>
                    <div style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 16,
                      color: 'var(--ink)',
                    }}>
                      {member.name}
                    </div>
                  </td>
                  <td style={{
                    padding: '18px 24px 18px 0',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-soft)',
                  }}>
                    {member.role || '—'}
                  </td>
                  <td style={{
                    padding: '18px 24px 18px 0',
                    fontSize: 13,
                    color: 'var(--ink-soft)',
                    letterSpacing: '0.04em',
                  }}>
                    {member.email || '—'}
                  </td>
                  <td style={{
                    padding: '18px 24px 18px 0',
                    fontSize: 13,
                    color: 'var(--ink-soft)',
                    fontFamily: 'var(--font-serif)',
                  }}>
                    {projectsByMember[member.id] || 0}
                  </td>
                  <td style={{ padding: '18px 0', textAlign: 'right' }}>
                    <Link
                      href={`/admin/members/${member.id}`}
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-soft)',
                        textDecoration: 'none',
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
