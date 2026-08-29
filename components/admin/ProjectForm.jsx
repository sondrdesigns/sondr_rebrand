'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUS_OPTIONS = ['Pitched', 'Active', 'On Hold', 'Completed'];

const inputStyle = {
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  background: 'transparent',
  border: '1px solid rgba(0,0,0,0.2)',
  padding: '12px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: 14,
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
  marginBottom: 8,
};

export function ProjectForm({ initialData, members = [], isNew }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saveState, setSaveState] = useState('idle');

  const [form, setForm] = useState({
    name: initialData?.name || '',
    client: initialData?.client || '',
    status: initialData?.status || 'Pitched',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate || '',
    budget: initialData?.budget || '',
    memberIds: initialData?.memberIds || [],
  });

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function toggleMember(id) {
    setForm(f => ({
      ...f,
      memberIds: f.memberIds.includes(id)
        ? f.memberIds.filter(m => m !== id)
        : [...f.memberIds, id],
    }));
  }

  async function handleSave() {
    setSaving(true);
    setSaveState('saving');
    try {
      let res;
      if (isNew) {
        res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch(`/api/admin/projects/${initialData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, id: initialData.id }),
        });
      }
      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
      if (isNew) {
        router.replace(`/admin/projects/${data.id}`);
      } else {
        router.refresh();
      }
    } catch {
      setSaveState('error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${form.name || 'this project'}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/projects/${initialData.id}`, { method: 'DELETE' });
      router.push('/admin/projects');
    } finally {
      setDeleting(false);
    }
  }

  const saveLabel = { idle: '', saving: 'saving…', saved: 'saved ✓', error: 'error' }[saveState];

  return (
    <div style={{ padding: '56px', maxWidth: 800 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 40px', marginBottom: 40 }}>

        {/* Project Name — full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Project Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="Untitled Project"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              background: 'transparent',
              border: 'none',
              borderBottom: '1.5px solid var(--ink)',
              padding: '8px 0',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 26,
              color: 'var(--ink)',
              outline: 'none',
              letterSpacing: '0.01em',
            }}
          />
        </div>

        {/* Client */}
        <div>
          <label style={labelStyle}>Client</label>
          <input
            type="text"
            value={form.client}
            onChange={e => set('client', e.target.value)}
            placeholder="Client name"
            style={inputStyle}
          />
        </div>

        {/* Status */}
        <div>
          <label style={labelStyle}>Status</label>
          <select
            value={form.status}
            onChange={e => set('status', e.target.value)}
            style={{ ...inputStyle, appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }}
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label style={labelStyle}>Due Date</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={e => set('dueDate', e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Budget */}
        <div>
          <label style={labelStyle}>Budget</label>
          <input
            type="text"
            value={form.budget}
            onChange={e => set('budget', e.target.value)}
            placeholder="e.g. $12,000"
            style={inputStyle}
          />
        </div>

        {/* Description */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Description / Notes</label>
          <textarea
            value={form.description}
            onChange={e => set('description', e.target.value)}
            placeholder="Scope, deliverables, notes…"
            rows={6}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
          />
        </div>
      </div>

      {/* Team Members */}
      {members.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <div style={{ ...labelStyle, marginBottom: 14 }}>Assign Team Members</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {members.map(m => {
              const checked = form.memberIds.includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleMember(m.id)}
                  style={{
                    padding: '9px 18px',
                    border: checked ? '1.5px solid var(--ink)' : '1px solid rgba(0,0,0,0.18)',
                    background: checked ? 'var(--ink)' : 'transparent',
                    color: checked ? 'rgb(255,251,240)' : 'var(--ink-soft)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'all 0.12s',
                  }}
                >
                  {m.name}{m.role ? ` · ${m.role}` : ''}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Action row */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: '14px 32px',
            background: 'var(--ink)',
            color: 'rgb(255,251,240)',
            border: 'none',
            cursor: saving ? 'default' : 'pointer',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 15,
            letterSpacing: '0.04em',
          }}
        >
          {saving ? 'saving…' : isNew ? 'Create Project' : 'Save Changes'}
        </button>

        <button
          onClick={() => router.push('/admin/projects')}
          style={{
            padding: '14px 24px',
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

        {saveLabel && (
          <span style={{
            fontSize: 11,
            letterSpacing: '0.12em',
            color: saveState === 'error' ? '#c0392b' : 'var(--ink-soft)',
            fontFamily: 'var(--font-mono)',
          }}>
            {saveLabel}
          </span>
        )}

        {!isNew && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              marginLeft: 'auto',
              padding: '14px 24px',
              background: 'transparent',
              border: '1px solid rgba(180,0,0,0.3)',
              cursor: deleting ? 'default' : 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgb(180,0,0)',
            }}
          >
            {deleting ? 'deleting…' : 'Delete Project'}
          </button>
        )}
      </div>
    </div>
  );
}
