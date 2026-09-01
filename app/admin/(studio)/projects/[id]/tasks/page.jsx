export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/projects';
import { getAllMembers } from '@/lib/members';
import { TaskBoard } from '@/components/admin/TaskBoard';

const STATUS_COLOR = {
  Active: 'var(--ikb, rgb(0,47,167))',
  Pitched: 'rgba(0,0,0,0.35)',
  'On Hold': 'rgb(200,140,40)',
  Completed: 'rgb(0,0,0)',
};

export default async function ProjectTasksPage({ params }) {
  const { id } = await params;
  let project;
  try {
    project = await getProject(id);
  } catch {
    notFound();
  }

  const members = await getAllMembers();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '28px 56px',
        borderBottom: '1.5px solid var(--ink)',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        fontFamily: 'var(--font-mono)',
        flexShrink: 0,
      }}>
        <Link
          href={`/admin/projects/${id}`}
          style={{
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--ink-soft)', textDecoration: 'none',
          }}
        >
          &larr; {project.name || 'Project'}
        </Link>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 22,
            fontWeight: 400,
            color: 'var(--ink)',
          }}>
            {project.name}
          </div>
          {project.client && (
            <div style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.1em', marginTop: 2 }}>
              {project.client}
            </div>
          )}
        </div>
        <div style={{
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: STATUS_COLOR[project.status] || 'var(--ink-soft)',
          fontFamily: 'var(--font-mono)',
        }}>
          {project.status}
        </div>
      </div>

      {/* Task board */}
      <TaskBoard projectId={id} members={members} />
    </div>
  );
}
