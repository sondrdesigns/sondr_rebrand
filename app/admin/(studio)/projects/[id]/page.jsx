export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/projects';
import { getAllMembers } from '@/lib/members';
import { getAllTasks } from '@/lib/tasks';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  let project;
  try {
    project = await getProject(id);
  } catch {
    notFound();
  }

  const [members, tasks] = await Promise.all([
    getAllMembers(),
    getAllTasks({ projectId: id }),
  ]);

  const taskCounts = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Header */}
      <div style={{
        padding: '28px 56px',
        borderBottom: '1.5px solid var(--ink)',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        fontFamily: 'var(--font-mono)',
      }}>
        <Link
          href="/admin/projects"
          style={{
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--ink-soft)', textDecoration: 'none',
          }}
        >
          &larr; Projects
        </Link>
        <div style={{ flex: 1 }} />

        {/* Tasks quick link */}
        <Link
          href={`/admin/projects/${id}/tasks`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '9px 18px',
            border: '1px solid rgba(0,0,0,0.2)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            transition: 'border-color 0.12s',
          }}
        >
          <span style={{ color: 'var(--ikb, rgb(0,47,167))', fontWeight: 600 }}>
            {taskCounts.inProgress > 0 ? taskCounts.inProgress : taskCounts.total}
          </span>
          {taskCounts.inProgress > 0 ? 'in progress' : `task${taskCounts.total !== 1 ? 's' : ''}`}
          <span style={{ color: 'var(--ink-soft)' }}>→</span>
        </Link>

        <div style={{
          fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-soft)',
        }}>
          Edit Project
        </div>
      </div>

      <ProjectForm initialData={project} members={members} isNew={false} />
    </div>
  );
}
