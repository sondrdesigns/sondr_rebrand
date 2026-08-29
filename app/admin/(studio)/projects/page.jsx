export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';
import { getTaskCountsByProject } from '@/lib/tasks';

const COLUMNS = [
  { status: 'Pitched', color: 'rgba(0,0,0,0.35)', label: 'Pitched' },
  { status: 'Active', color: 'var(--ikb)', label: 'Active' },
  { status: 'On Hold', color: 'rgb(200,140,40)', label: 'On Hold' },
  { status: 'Completed', color: 'rgb(0,0,0)', label: 'Completed' },
];

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const taskCounts = await getTaskCountsByProject(projects.map(p => p.id));
  const byStatus = (status) => projects.filter(p => p.status === status);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>
      {/* Page header */}
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
            Projects
          </div>
        </div>
        <Link
          href="/admin/projects/new"
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
          New Project +
        </Link>
      </div>

      {/* Kanban board */}
      <div style={{ padding: '36px 56px 60px', overflowX: 'auto' }}>
        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--ink-soft)' }}>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 24,
              fontStyle: 'italic',
              marginBottom: 12,
            }}>
              No projects yet.
            </div>
            <div style={{ fontSize: 13, letterSpacing: '0.12em' }}>Commission your first.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 20, minWidth: 800 }}>
            {COLUMNS.map(col => {
              const colProjects = byStatus(col.status);
              return (
                <div key={col.status} style={{ flex: 1, minWidth: 200 }}>
                  {/* Column header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 16,
                    paddingBottom: 12,
                    borderBottom: `2px solid ${col.color}`,
                  }}>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: col.color,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: col.color,
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {col.label}
                    </span>
                    <span style={{
                      marginLeft: 'auto',
                      fontSize: 11,
                      color: 'var(--ink-soft)',
                    }}>
                      {colProjects.length}
                    </span>
                  </div>

                  {/* Project cards */}
                  {colProjects.length === 0 ? (
                    <div style={{
                      padding: '20px 0',
                      fontSize: 11,
                      color: 'rgba(0,0,0,0.25)',
                      fontStyle: 'italic',
                      fontFamily: 'var(--font-serif)',
                      textAlign: 'center',
                    }}>
                      None
                    </div>
                  ) : (
                    colProjects.map(project => (
                      <Link
                        key={project.id}
                        href={`/admin/projects/${project.id}`}
                        style={{ textDecoration: 'none', display: 'block' }}
                      >
                        <div style={{
                          background: 'rgb(255,255,255)',
                          border: '1px solid rgba(0,0,0,0.12)',
                          padding: '16px 18px',
                          marginBottom: 10,
                          cursor: 'pointer',
                        }}>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 13,
                            color: 'var(--ink)',
                            marginBottom: 6,
                          }}>
                            {project.name}
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 11,
                            color: 'var(--ink-soft)',
                            letterSpacing: '0.06em',
                          }}>
                            {project.client}
                          </div>
                          {/* Task progress */}
                          {taskCounts[project.id]?.total > 0 && (
                            <div style={{ marginTop: 12 }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: 10,
                                letterSpacing: '0.1em',
                                color: 'var(--ink-soft)',
                                marginBottom: 5,
                                fontFamily: 'var(--font-mono)',
                              }}>
                                <span>{taskCounts[project.id].done}/{taskCounts[project.id].total} tasks</span>
                              </div>
                              <div style={{
                                height: 3,
                                background: 'rgba(0,0,0,0.08)',
                                borderRadius: 2,
                                overflow: 'hidden',
                              }}>
                                <div style={{
                                  height: '100%',
                                  width: `${Math.round((taskCounts[project.id].done / taskCounts[project.id].total) * 100)}%`,
                                  background: taskCounts[project.id].done === taskCounts[project.id].total ? 'var(--ink)' : 'var(--ikb, rgb(0,47,167))',
                                  transition: 'width 0.3s',
                                }} />
                              </div>
                            </div>
                          )}
                          {project.dueDate && (
                            <div style={{
                              marginTop: 10,
                              fontFamily: 'var(--font-mono)',
                              fontSize: 10,
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              color: 'var(--ink-soft)',
                            }}>
                              Due {new Date(project.dueDate).toLocaleDateString('en-GB', {
                                day: 'numeric', month: 'short',
                              })}
                            </div>
                          )}
                          {project.budget && (
                            <div style={{
                              marginTop: 6,
                              fontFamily: 'var(--font-serif)',
                              fontSize: 16,
                              color: 'var(--ink)',
                            }}>
                              £{project.budget.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
