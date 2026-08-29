'use client';
import { useState, useRef } from 'react';

const SUGGESTIONS = ['process', 'type & design', 'studio life', 'interior', 'web'];

export function TagInput({ tags, onChange }) {
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  function addTag(tag) {
    const trimmed = tag.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
  }

  function removeTag(index) {
    onChange(tags.filter((_, i) => i !== index));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue.replace(/,$/, ''));
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  function handleChange(e) {
    const val = e.target.value;
    // Auto-add if user types a comma
    if (val.endsWith(',')) {
      const tag = val.slice(0, -1);
      if (tag.trim()) {
        addTag(tag);
        setInputValue('');
      }
    } else {
      setInputValue(val);
    }
  }

  const visibleSuggestions = SUGGESTIONS.filter(
    s => !tags.includes(s)
  );

  return (
    <div>
      <div style={{
        fontSize: 9,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--ink-soft)',
        fontFamily: 'var(--font-mono)',
        marginBottom: 8,
      }}>
        Tags
      </div>

      {/* Tag chips + input row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          alignItems: 'center',
          borderBottom: '1px solid rgba(102,99,99,0.4)',
          paddingBottom: 8,
          cursor: 'text',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, i) => (
          <span
            key={tag}
            style={{
              background: 'var(--sticky-yellow)',
              padding: '4px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.06em',
              color: 'var(--ink)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {tag}
            <button
              onClick={e => { e.stopPropagation(); removeTag(i); }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
                fontSize: 12,
                color: 'var(--ink-soft)',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label={`Remove tag ${tag}`}
            >
              ×
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={tags.length === 0 ? 'Add tags…' : ''}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.04em',
            color: 'var(--ink)',
            minWidth: 80,
            flex: 1,
            padding: '2px 0',
          }}
        />
      </div>

      {/* Suggestions */}
      {focused && visibleSuggestions.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginTop: 8,
        }}>
          {visibleSuggestions.map(s => (
            <button
              key={s}
              onMouseDown={e => {
                e.preventDefault();
                addTag(s);
              }}
              style={{
                background: 'none',
                border: '1px solid rgba(102,99,99,0.35)',
                padding: '3px 9px',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.08em',
                color: 'var(--ink-soft)',
                cursor: 'pointer',
                transition: 'border-color 0.1s',
              }}
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
