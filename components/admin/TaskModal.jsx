'use client';
import { useState, useEffect } from 'react';

const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
];

const inputStyle = {
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  background: 'transparent',
  border: '1px solid rgba(0,0,0,0.18)',
  padding: '10px 12px',
  fontFamily: 'var(--font-mono)',
  fontSize: 13,
  color: 'var(--ink)',
  letterSpacing: '0.04em',
  outline: 'none',
};

const labelStyle = {
  display: 'block',
  fontSize: 9,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--ink-soft)',
  fontFamily: 'var(--font-mono)',
  marginBottom: 7,
};

export function TaskModal({ task, projectId, members, onSave, onDelete, onClose }) {
  const isNew = !task?.id;

  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'todo',
    priority: task?.priority || 'medium',
    assigneeId: task?.assigneeId || '',
    assigneeEmail: task?.assigneeEmail || '',
    dueDate: task?.dueDate || '',
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function handleAssignee(memberId) {
    const member = members.find(m => m.id === memberId);
    set('assigneeId', memberId);
    set('assigneeEmail', member?.email || '');
  }

  async function handleSave() {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload = { ...form, projectId };
      let res;
      if (isNew) {
        res = await fetch('/api/admin/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/tasks/${task.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...task, ...payload }),
        });
      }
      const data = await res.json();
      onSave({ ...payload, id: isNew ? data.id : task.id });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this task?')) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/tasks/${task.id}`, { method: 'DELETE' });
      onDelete(task.id);
    } finally {
      setDeleting(false);
    }
  }

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: 'var(--paper)',
        width: '100%',
        maxWidth: 520,
        maxHeight: '90vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Modal header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          position: 'sticky', top: 0, background: 'var(--paper)',
          zIndex: 1,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)' }}>
              {isNew ? 'New Task' : 'Edit Task'}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1, padding: '0 4px' }}
          >
            ×
          </button>
        </div>

        {/* Form body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Title */}
          <div>
            <label style={labelStyle}>Task Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
              style={{
                ...inputStyle,
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 18,
                border: 'none',
                borderBottom: '1.5px solid var(--ink)',
                padding: '6px 0',
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Details, links, context…"
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>

          {/* Status + Priority row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Status</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value)}
                style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
              >
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Priority</label>
              <select
                value={form.priority}
                onChange={e => set('priority', e.target.value)}
                style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
              >
                {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
          </div>

          {/* Assignee + Due date row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Assignee</label>
              <select
                value={form.assigneeId}
                onChange={e => handleAssignee(e.target.value)}
                style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
              >
                <option value="">Unassigned</option>
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={e => set('dueDate', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{
          padding: '16px 28px 24px',
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          borderTop: '1px solid rgba(0,0,0,0.08)',
        }}>
          <button
            onClick={handleSave}
            disabled={saving || !form.title.trim()}
            style={{
              padding: '12px 28px',
              background: 'var(--ink)',
              color: 'rgb(255,251,240)',
              border: 'none',
              cursor: saving || !form.title.trim() ? 'default' : 'pointer',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 14,
              letterSpacing: '0.04em',
              opacity: !form.title.trim() ? 0.5 : 1,
            }}
          >
            {saving ? 'saving…' : isNew ? 'Create Task' : 'Save Changes'}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '12px 20px',
              background: 'transparent',
              border: '1px solid rgba(0,0,0,0.18)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
            }}
          >
            Cancel
          </button>
          {!isNew && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                marginLeft: 'auto',
                padding: '12px 20px',
                background: 'transparent',
                border: '1px solid rgba(180,0,0,0.28)',
                cursor: deleting ? 'default' : 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgb(180,0,0)',
              }}
            >
              {deleting ? 'deleting…' : 'Delete'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
