'use client';
import { useState } from 'react';

export function PublishPanel({
  status,
  onStatusChange,
  scheduledFor,
  onScheduledForChange,
  onSave,
  saveState,
  isFirstPublish,
  wordCount,
}) {
  const [pressed, setPressed] = useState(false);

  function getButtonLabel() {
    if (saveState === 'saving') return 'saving…';
    if (status === 'draft') return 'Save Draft';
    if (isFirstPublish) return 'Open the Exhibition';
    return 'Update Entry';
  }

  function getButtonStyle() {
    const base = {
      width: '100%',
      padding: '16px 0',
      background: 'var(--ink)',
      color: 'var(--paper)',
      border: 'none',
      cursor: saveState === 'saving' ? 'default' : 'pointer',
      letterSpacing: '0.03em',
      transform: pressed ? 'scale(0.98)' : 'scale(1)',
      transition: 'transform 0.08s',
    };

    if (status === 'draft') {
      return {
        ...base,
        fontFamily: 'var(--font-mono)',
        fontStyle: 'italic',
        fontSize: 15,
      };
    }

    if (isFirstPublish) {
      return {
        ...base,
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: 17,
      };
    }

    return {
      ...base,
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
    };
  }

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'transparent',
    border: '1px solid var(--ink-soft)',
    padding: '10px',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    color: 'var(--ink)',
    letterSpacing: '0.04em',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Section label */}
      <div style={{
        fontSize: 9,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--ink-soft)',
        fontFamily: 'var(--font-mono)',
      }}>
        Publication
      </div>

      {/* Status select */}
      <select
        value={status}
        onChange={e => onStatusChange(e.target.value)}
        style={inputStyle}
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="scheduled">Scheduled</option>
      </select>

      {/* Datetime — only when scheduled */}
      {status === 'scheduled' && (
        <input
          type="datetime-local"
          value={scheduledFor}
          onChange={e => onScheduledForChange(e.target.value)}
          style={inputStyle}
        />
      )}

      {/* Save button */}
      <button
        onClick={onSave}
        disabled={saveState === 'saving'}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        style={getButtonStyle()}
      >
        {getButtonLabel()}
      </button>

      {/* Word count */}
      <div style={{
        fontSize: 10,
        letterSpacing: '0.14em',
        color: 'var(--ink-soft)',
        fontFamily: 'var(--font-mono)',
        textAlign: 'center',
      }}>
        {wordCount} {wordCount === 1 ? 'word' : 'words'}
      </div>
    </div>
  );
}
