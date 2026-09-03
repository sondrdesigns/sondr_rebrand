import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { useState, useRef } from 'react';
import { apiErrorMessage } from '@/lib/client-api';

function ExhibitionImageNodeView({ node, updateAttributes }) {
  const { src, alt, photographer, date, context } = node.attrs;
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileRef = useRef();

  async function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);
    setErrorMessage('');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      if (!res.ok) throw new Error(await apiErrorMessage(res, 'Unable to upload image'));
      const { url } = await res.json();
      updateAttributes({ src: url });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setUploading(false);
    }
  }

  const captionInput = (key, placeholder, flex) => (
    <input
      key={key}
      value={node.attrs[key] || ''}
      placeholder={placeholder}
      onChange={e => updateAttributes({ [key]: e.target.value })}
      style={{
        flex,
        border: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.18)',
        fontSize: 11,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        outline: 'none',
        background: 'transparent',
        color: 'var(--ink)',
        padding: '2px 0 4px',
        minWidth: 0,
      }}
    />
  );

  return (
    <NodeViewWrapper>
      <div
        contentEditable={false}
        data-drag-handle
        style={{
          margin: '24px 0',
          border: '1px solid rgba(0,0,0,0.12)',
          background: 'white',
          userSelect: 'none',
        }}
      >
        {src ? (
          <div style={{ position: 'relative' }}>
            <img
              src={src}
              alt={alt || ''}
              style={{ width: '100%', display: 'block', maxHeight: 500, objectFit: 'cover' }}
            />
            <button
              onClick={() => updateAttributes({ src: '' })}
              style={{
                position: 'absolute', top: 8, right: 8,
                background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none',
                padding: '4px 10px', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
              }}
            >
              Replace
            </button>
          </div>
        ) : (
          <div
            style={{
              height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.03)', cursor: 'pointer',
              border: '1.5px dashed rgba(0,0,0,0.15)',
            }}
            onClick={() => fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => handleFile(e.target.files[0])}
            />
            <span style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14, color: 'rgba(0,0,0,0.35)',
            }}>
              {uploading ? 'Uploading…' : errorMessage || 'Click to add exhibition image'}
            </span>
          </div>
        )}

        {/* Caption bar */}
        <div style={{
          padding: '10px 16px',
          display: 'flex',
          gap: 16,
          borderTop: '1px solid rgba(0,0,0,0.08)',
          background: 'rgba(0,0,0,0.01)',
        }}>
          {captionInput('photographer', 'Photographer', '0 0 130px')}
          {captionInput('date', 'Year', '0 0 60px')}
          {captionInput('context', 'Exhibition / Location', '1')}
          {captionInput('alt', 'Alt text', '0 0 100px')}
        </div>
      </div>
    </NodeViewWrapper>
  );
}

export const ExhibitionImageExtension = Node.create({
  name: 'exhibitionImage',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: '' },
      alt: { default: '' },
      photographer: { default: '' },
      date: { default: '' },
      context: { default: '' },
    };
  },

  parseHTML() {
    return [{
      tag: 'exhibitionimage',
      getAttrs: el => ({
        src: el.getAttribute('src') || '',
        alt: el.getAttribute('alt') || '',
        photographer: el.getAttribute('photographer') || '',
        date: el.getAttribute('date') || '',
        context: el.getAttribute('context') || '',
      }),
    }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['exhibitionimage', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ExhibitionImageNodeView);
  },

  addCommands() {
    return {
      insertExhibitionImage: (attrs = {}) => ({ commands }) => {
        return commands.insertContent({ type: this.name, attrs });
      },
    };
  },
});
