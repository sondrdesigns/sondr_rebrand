'use client';
import { EditorContent } from '@tiptap/react';
import { useEditorContext } from './EditorContext';

export function EditorCanvas() {
  const editor = useEditorContext();

  return (
    <div style={{ flex: 1, padding: '0 56px 80px', position: 'relative' }}>
      <style>{`
        .tiptap { outline: none; }
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: rgba(102,99,99,0.5);
          pointer-events: none;
          float: left;
          height: 0;
          font-family: var(--font-mono);
          font-size: 16px;
          letter-spacing: 0.02em;
        }
        .tiptap h1 {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 400;
          line-height: 1.2;
          margin: 40px 0 16px;
          color: var(--ink);
        }
        .tiptap h2 {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 400;
          line-height: 1.25;
          margin: 36px 0 14px;
          color: var(--ink);
        }
        .tiptap h3 {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 32px 0 12px;
          color: var(--ink-soft);
        }
        .tiptap p {
          margin: 0 0 18px;
          font-family: var(--font-mono);
          font-size: 16px;
          line-height: 1.8;
          color: var(--ink);
          letter-spacing: 0.02em;
        }
        .tiptap blockquote {
          border-left: 3px solid var(--ink);
          margin: 32px 0;
          padding: 8px 0 8px 24px;
          font-family: var(--font-serif);
          font-size: 20px;
          font-style: italic;
          line-height: 1.5;
          color: var(--ink);
        }
        .tiptap hr {
          border: none;
          border-top: 1px solid var(--ink-soft);
          margin: 40px 0;
        }
        .tiptap ul, .tiptap ol {
          padding-left: 28px;
          margin: 0 0 18px;
          font-family: var(--font-mono);
          font-size: 15px;
          line-height: 1.75;
          color: var(--ink);
        }
        .tiptap li { margin-bottom: 6px; }
        .tiptap strong { font-weight: 600; }
        .tiptap em { font-style: italic; }
        .tiptap s { text-decoration: line-through; opacity: 0.6; }
        .tiptap code {
          font-family: var(--font-mono);
          font-size: 13px;
          background: rgba(0,0,0,0.05);
          padding: 2px 5px;
          border-radius: 2px;
        }
        .tiptap .ProseMirror-selectednode { outline: 2px solid var(--tape-blue); }
        .tiptap pullquote {
          display: block;
          border-left: 3px solid var(--tape-blue);
          margin: 36px 0;
          padding: 12px 0 12px 28px;
          font-family: var(--font-serif);
          font-size: 22px;
          font-style: italic;
          line-height: 1.5;
          color: var(--ink);
          background: rgba(0,47,167,0.04);
        }
        .tiptap pullquote p {
          margin: 0;
          font-family: var(--font-serif);
          font-size: inherit;
          font-style: italic;
          letter-spacing: 0;
        }
      `}</style>
      <EditorContent editor={editor} />
    </div>
  );
}
