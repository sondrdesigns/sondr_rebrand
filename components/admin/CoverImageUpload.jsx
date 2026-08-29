'use client';
import { useRef, useState } from 'react';

export function CoverImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef();

  async function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const { url } = await res.json();
      onChange(url);
    } finally {
      setUploading(false);
    }
  }

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }

  if (value) {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <img
          src={value}
          alt="cover"
          style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block' }}
        />
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(0,0,0,0.55)',
            color: 'rgb(255,251,240)',
            border: 'none',
            padding: '6px 14px',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      style={{
        width: '100%',
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        border: `1.5px dashed ${dragOver ? 'var(--ink)' : 'rgba(0,0,0,0.15)'}`,
        cursor: 'pointer',
        background: dragOver ? 'rgba(0,0,0,0.02)' : 'transparent',
        transition: 'all 0.14s',
        userSelect: 'none',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])}
      />
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: 15,
        color: 'var(--ink-soft)',
      }}>
        {uploading ? 'Uploading…' : 'Drop a cover image, or click to browse'}
      </div>
      <div style={{
        fontSize: 9,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.3)',
        fontFamily: 'var(--font-mono)',
      }}>
        jpeg · png · webp
      </div>
    </div>
  );
}
