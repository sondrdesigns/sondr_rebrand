'use client';
import { useState, useEffect, useCallback } from 'react';
import { TaskModal } from './TaskModal';
import { apiErrorMessage } from '@/lib/client-api';

const COLUMNS = [
  { status: 'todo', label: 'To Do', color: 'rgba(0,0,0,0.32)' },
  { status: 'in-progress', label: 'In Progress', color: 'var(--ikb, rgb(0,47,167))' },
  { status: 'review', label: 'Review', color: 'rgb(200,140,40)' },
  { status: 'done', label: 'Done', color: 'rgb(0,0,0)' },
];

const PRIORITY_DOT = {
  high: { color: 'rgb(180,0,0)', title: 'High priority' },
  medium: { color: 'rgb(200,140,40)', title: 'Medium priority' },
  low: { color: 'rgba(0,0,0,0.25)', title: 'Low priority' },
};

function TaskCard({ task, members, onClick }) {
  const assignee = members.find(m => m.id === task.assigneeId);
  const dot = PRIORITY_DOT[task.priority] || PRIORITY_DOT.medium;
  const isOverdue = task.dueDate && task.status !== 'done' && new Date(task.dueDate) < new Date();

  return (
    <div
      onClick={onClick}
      style={{
        background: 'rgb(255,255,255)',
        border: '1px solid rgba(0,0,0,0.1)',
        padding: '14px 16px',
        marginBottom: 8,
        cursor: 'pointer',
        transition: 'border-color 0.12s, box-shadow 0.12s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.28)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Priority dot + title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <div
          title={dot.title}
          style={{
            width: 7, height: 7, borderRadius: '50%',
            background: dot.color, flexShrink: 0, marginTop: 5,
          }}
        />
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          color: 'var(--ink)',
          lineHeight: 1.4,
          flex: 1,
        }}>
          {task.title}
        </div>
      </div>

      {/* Metadata row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 15 }}>
        {assignee && (
          <div style={{
            fontSize: 10,
            letterSpacing: '0.08em',
            color: 'var(--ink-soft)',
            fontFamily: 'var(--font-mono)',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {assignee.name}
          </div>
        )}
        {task.dueDate && (
          <div style={{
            fontSize: 10,
            letterSpacing: '0.08em',
            color: isOverdue ? 'rgb(180,0,0)' : 'var(--ink-soft)',
            fontFamily: 'var(--font-mono)',
            flexShrink: 0,
          }}>
            {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </div>
        )}
      </div>
    </div>
  );
}

export function TaskBoard({ projectId, members }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [modal, setModal] = useState(null); // null | 'new' | task object

  const fetchTasks = useCallback(() => {
    fetch(`/api/admin/tasks?projectId=${encodeURIComponent(projectId)}`)
      .then(async r => {
        if (!r.ok) throw new Error(await apiErrorMessage(r, 'Unable to load tasks'));
        return r.json();
      })
      .then(data => { setTasks(data); setLoading(false); })
      .catch(error => { setErrorMessage(error.message); setLoading(false); });
  }, [projectId]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  function handleSave(savedTask) {
    setTasks(prev => {
      const idx = prev.findIndex(t => t.id === savedTask.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = savedTask;
        return next;
      }
      return [savedTask, ...prev];
    });
    setModal(null);
  }

  function handleDelete(taskId) {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    setModal(null);
  }

  if (loading) {
    return (
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', color: 'var(--ink-soft)',
      }}>
        loading tasks…
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div style={{ padding: '40px 56px', color: 'rgb(180,0,0)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        {errorMessage}
      </div>
    );
  }

  const byStatus = status => tasks.filter(t => t.status === status);

  return (
    <>
      <div style={{
        padding: '28px 56px 60px',
        display: 'flex',
        gap: 16,
        overflowX: 'auto',
        minWidth: 0,
      }}>
        {COLUMNS.map(col => {
          const colTasks = byStatus(col.status);
          return (
            <div key={col.status} style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column' }}>
              {/* Column header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 14,
                paddingBottom: 12,
                borderBottom: `2px solid ${col.color}`,
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: col.color, flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: col.color, fontFamily: 'var(--font-mono)', flex: 1,
                }}>
                  {col.label}
                </span>
                <span style={{ fontSize: 11, color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)' }}>
                  {colTasks.length}
                </span>
              </div>

              {/* Task cards */}
              <div style={{ flex: 1 }}>
                {colTasks.length === 0 ? (
                  <div style={{
                    padding: '16px 0', fontSize: 11,
                    color: 'rgba(0,0,0,0.2)', fontStyle: 'italic',
                    fontFamily: 'var(--font-serif)', textAlign: 'center',
                  }}>
                    None
                  </div>
                ) : colTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    members={members}
                    onClick={() => setModal(task)}
                  />
                ))}
              </div>

              {/* Add task button */}
              {col.status === 'todo' && (
                <button
                  onClick={() => setModal('new')}
                  style={{
                    marginTop: 8,
                    padding: '10px 0',
                    background: 'transparent',
                    border: '1px dashed rgba(0,0,0,0.18)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-soft)',
                    width: '100%',
                    transition: 'border-color 0.12s, color 0.12s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--inkb, rgba(0,47,167,0.5))';
                    e.currentTarget.style.color = 'var(--ink)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.18)';
                    e.currentTarget.style.color = 'var(--ink-soft)';
                  }}
                >
                  + Add Task
                </button>
              )}
            </div>
          );
        })}
      </div>

      {modal && (
        <TaskModal
          task={modal === 'new' ? null : modal}
          projectId={projectId}
          members={members}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
