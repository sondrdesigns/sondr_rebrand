'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ROLE_SUGGESTIONS = ['Designer', 'Developer', 'Strategist', 'Account Manager', 'Creative Director', 'Copywriter'];

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

export function MemberForm({ initialData, isNew }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saveState, setSaveState] = useState('idle');

  const [form, setForm] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    email: initialData?.email || '',
    bio: initialData?.bio || '',
    pronouns: initialData?.pronouns || '',
    portfolioUrl: initialData?.portfolioUrl || '',
  });

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
  }

  async function handleSave() {
    setSaving(true);
    setSaveState('saving');
    try {
      let res;
      if (isNew) {
        res = await fetch('/api/admin/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch(`/api/admin/members/${initialData.id}`, {
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
        router.replace(`/admin/members/${data.id}`);
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
    if (!confirm(`Remove ${form.name || 'this member'}? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/members/${initialData.id}`, { method: 'DELETE' });
      router.push('/admin/members');
    } finally {
      setDeleting(false);
    }
  }

  const saveLabel = { idle: '', saving: 'saving…', saved: 'saved ✓', error: 'error' }[saveState];

  return (
    <div style={{ padding: '56px', maxWidth: 680 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 40px', marginBottom: 40 }}>

        {/* Name — full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="Name"
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

        {/* Role */}
        <div>
          <label style={labelStyle}>Role</label>
          <input
            type="text"
            value={form.role}
            onChange={e => set('role', e.target.value)}
            placeholder="e.g. Designer"
            list="role-suggestions"
            style={inputStyle}
          />
          <datalist id="role-suggestions">
            {ROLE_SUGGESTIONS.map(r => <option key={r} value={r} />)}
          </datalist>
        </div>

        {/* Pronouns */}
        <div>
          <label style={labelStyle}>Pronouns</label>
          <input
            type="text"
            value={form.pronouns}
            onChange={e => set('pronouns', e.target.value)}
            placeholder="e.g. she/her"
            style={inputStyle}
          />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="name@sondrdesigns.com"
            style={inputStyle}
          />
        </div>

        {/* Portfolio URL */}
        <div>
          <label style={labelStyle}>Portfolio URL</label>
          <input
            type="url"
            value={form.portfolioUrl}
            onChange={e => set('portfolioUrl', e.target.value)}
            placeholder="https://"
            style={inputStyle}
          />
        </div>

        {/* Bio */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Bio</label>
          <textarea
            value={form.bio}
            onChange={e => set('bio', e.target.value)}
            placeholder="A short bio for the about page…"
            rows={5}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
          />
        </div>
      </div>

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
          {saving ? 'saving…' : isNew ? 'Add Member' : 'Save Changes'}
        </button>

        <button
          onClick={() => router.push('/admin/members')}
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
            {deleting ? 'removing…' : 'Remove Member'}
          </button>
        )}
      </div>
    </div>
  );
}
