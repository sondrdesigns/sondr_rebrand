'use client';
import { useState } from 'react';

const STATUS_CONFIG = {
  'todo': { label: 'To Do', color: 'rgba(0,0,0,0.32)' },
  'in-progress': { label: 'In Progress', color: 'rgb(0,47,167)' },
  'review': { label: 'Review', color: 'rgb(200,140,40)' },
  'done': { label: 'Done', color: 'rgb(0,0,0)' },
};

const PRIORITY_DOT = {
  high: 'rgb(180,0,0)',
  medium: 'rgb(200,140,40)',
  low: 'rgba(0,0,0,0.2)',
};

function TaskRow({ task }) {
  const st = STATUS_CONFIG[task.status] || STATUS_CONFIG['todo'];
  const isOverdue = task.dueDate && task.status !== 'done' && new Date(task.dueDate) < new Date();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16,
      padding: '18px 0',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
    }}>
      {/* Priority dot */}
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: PRIORITY_DOT[task.priority] || PRIORITY_DOT.medium,
        flexShrink: 0, marginTop: 6,
      }} />

      {/* Task info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 15,
          color: task.status === 'done' ? 'var(--ink-soft)' : 'var(--ink)',
          textDecoration: task.status === 'done' ? 'line-through' : 'none',
          letterSpacing: '0.02em',
          marginBottom: task.description ? 5 : 0,
        }}>
          {task.title}
        </div>
        {task.description && (
          <div style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.5, letterSpacing: '0.02em' }}>
            {task.description}
          </div>
        )}
        {task.project && (
          <div style={{
            marginTop: 6, fontSize: 10,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.4)',
          }}>
            {task.project.name}
            {task.project.client ? ` · ${task.project.client}` : ''}
          </div>
        )}
      </div>

      {/* Right meta */}
      <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
        <span style={{
          fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: st.color, fontFamily: 'monospace',
        }}>
          {st.label}
        </span>
        {task.dueDate && (
          <span style={{
            fontSize: 11,
            color: isOverdue ? 'rgb(180,0,0)' : 'var(--ink-soft)',
            letterSpacing: '0.04em',
          }}>
            {isOverdue ? 'Overdue · ' : ''}
            {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </span>
        )}
      </div>
    </div>
  );
}

const STATUS_ORDER = ['in-progress', 'review', 'todo', 'done'];

export default function MyTasksPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/tasks?email=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setTasks(data);
      setSubmitted(trimmed);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Group by project, sorted by status order
  const grouped = tasks
    ? Object.values(
        tasks.reduce((acc, task) => {
          const key = task.projectId || '__none';
          if (!acc[key]) acc[key] = { project: task.project, tasks: [] };
          acc[key].tasks.push(task);
          return acc;
        }, {})
      ).map(g => ({
        ...g,
        tasks: [...g.tasks].sort(
          (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
        ),
      }))
    : null;

  const openCount = tasks ? tasks.filter(t => t.status !== 'done').length : 0;

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '80px 32px 120px' }}>
      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <div style={{
          fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'var(--ink-soft)', marginBottom: 14, fontFamily: 'var(--font-mono, monospace)',
        }}>
          Sondr Studio
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif, Georgia, serif)',
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--ink)',
          lineHeight: 1.15,
          margin: '0 0 16px',
        }}>
          My Tasks
        </h1>
        <p style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 13,
          color: 'var(--ink-soft)',
          letterSpacing: '0.04em',
          lineHeight: 1.6,
          margin: 0,
        }}>
          Enter your studio email to see tasks assigned to you.
        </p>
      </div>

      {/* Email form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="name@sondrdesigns.com"
            required
            style={{
              flex: 1,
              padding: '14px 18px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 14,
              color: 'var(--ink)',
              background: 'transparent',
              border: '1.5px solid var(--ink)',
              borderRight: 'none',
              outline: 'none',
              letterSpacing: '0.04em',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px 28px',
              background: 'var(--ink)',
              color: 'rgb(255,251,240)',
              border: 'none',
              cursor: loading ? 'default' : 'pointer',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              flexShrink: 0,
            }}
          >
            {loading ? '…' : 'View'}
          </button>
        </div>
        {error && (
          <div style={{ marginTop: 10, fontSize: 12, color: 'rgb(180,0,0)', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.06em' }}>
            {error}
          </div>
        )}
      </form>

      {/* Results */}
      {tasks !== null && (
        <>
          <div style={{
            marginBottom: 36,
            paddingBottom: 16,
            borderBottom: '1.5px solid var(--ink)',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}>
            <div style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontStyle: 'italic',
              fontSize: 18,
              color: 'var(--ink)',
            }}>
              {tasks.length === 0
                ? 'No tasks found.'
                : `${openCount} open · ${tasks.length} total`}
            </div>
            <div style={{
              fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--ink-soft)', fontFamily: 'var(--font-mono, monospace)',
            }}>
              {submitted}
            </div>
          </div>

          {tasks.length === 0 ? (
            <div style={{
              textAlign: 'center', paddingTop: 48,
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontStyle: 'italic', fontSize: 18, color: 'var(--ink-soft)',
            }}>
              Nothing on your plate right now.
            </div>
          ) : (
            grouped.map((group, i) => (
              <div key={i} style={{ marginBottom: 40 }}>
                {/* Project heading */}
                {group.project && (
                  <div style={{
                    marginBottom: 4,
                    fontSize: 9, letterSpacing: '0.22em',
                    textTransform: 'uppercase', color: 'var(--ink-soft)',
                    fontFamily: 'var(--font-mono, monospace)',
                  }}>
                    {group.project.name}
                    {group.project.client ? ` — ${group.project.client}` : ''}
                  </div>
                )}
                {group.tasks.map(task => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
