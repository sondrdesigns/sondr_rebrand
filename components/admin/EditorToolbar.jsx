'use client';
import { useEditorContext } from './EditorContext';

function ToolButton({ symbol, label, active, onClick, disabled }) {
  const base = {
    background: 'none',
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    padding: '6px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    opacity: disabled ? 0.25 : active ? 1 : 0.5,
    fontFamily: 'var(--font-mono)',
    borderBottom: active ? '2px solid var(--ink)' : '2px solid transparent',
    transition: 'opacity 0.12s',
    flexShrink: 0,
  };

  return (
    <button
      style={base}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={e => { if (!disabled && !active) e.currentTarget.style.opacity = '0.85'; }}
      onMouseLeave={e => { if (!disabled && !active) e.currentTarget.style.opacity = '0.5'; }}
      title={label}
    >
      <span style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1 }}>{symbol}</span>
      <span style={{
        fontSize: 9,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--ink-soft)',
        lineHeight: 1,
      }}>
        {label}
      </span>
    </button>
  );
}

function Divider() {
  return (
    <span style={{
      width: 1,
      height: 28,
      background: 'rgba(0,0,0,0.12)',
      margin: '0 8px',
      flexShrink: 0,
      display: 'inline-block',
      alignSelf: 'center',
    }} />
  );
}

export function EditorToolbar() {
  const editor = useEditorContext();

  const disabled = !editor;

  const wordCount = editor?.storage?.characterCount?.words() ?? 0;

  return (
    <div style={{
      borderBottom: '1.5px solid rgba(0,0,0,0.1)',
      padding: '8px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      overflowX: 'auto',
      background: 'var(--paper)',
      position: 'sticky',
      top: 53,
      zIndex: 9,
    }}>
      {/* Group 1 — STRUCTURE */}
      <ToolButton
        symbol="P"
        label="para"
        disabled={disabled}
        active={editor?.isActive('paragraph')}
        onClick={() => editor?.chain().focus().setParagraph().run()}
      />
      <ToolButton
        symbol="H1"
        label="h1"
        disabled={disabled}
        active={editor?.isActive('heading', { level: 1 })}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
      />
      <ToolButton
        symbol="H2"
        label="h2"
        disabled={disabled}
        active={editor?.isActive('heading', { level: 2 })}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <ToolButton
        symbol="H3"
        label="h3"
        disabled={disabled}
        active={editor?.isActive('heading', { level: 3 })}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
      />

      <Divider />

      {/* Group 2 — STYLE */}
      <ToolButton
        symbol="B"
        label="bold"
        disabled={disabled}
        active={editor?.isActive('bold')}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      />
      <ToolButton
        symbol="I"
        label="italic"
        disabled={disabled}
        active={editor?.isActive('italic')}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      />
      <ToolButton
        symbol="U"
        label="under"
        disabled={disabled}
        active={editor?.isActive('underline')}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      />
      <ToolButton
        symbol="S"
        label="strike"
        disabled={disabled}
        active={editor?.isActive('strike')}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      />

      <Divider />

      {/* Group 3 — BLOCK */}
      <ToolButton
        symbol='"'
        label="quote"
        disabled={disabled}
        active={editor?.isActive('blockquote')}
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      />
      <ToolButton
        symbol="❝"
        label="pull"
        disabled={disabled}
        active={editor?.isActive('pullQuote')}
        onClick={() => editor?.chain().focus().togglePullQuote().run()}
      />
      <ToolButton
        symbol="⊡"
        label="exhibit"
        disabled={disabled}
        active={false}
        onClick={() => editor?.chain().focus().insertExhibitionImage().run()}
      />
      <ToolButton
        symbol="─"
        label="rule"
        disabled={disabled}
        active={false}
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
      />

      <Divider />

      {/* Group 4 — LIST */}
      <ToolButton
        symbol="•"
        label="bullet"
        disabled={disabled}
        active={editor?.isActive('bulletList')}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      />
      <ToolButton
        symbol="1."
        label="ordered"
        disabled={disabled}
        active={editor?.isActive('orderedList')}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      />

      <Divider />

      {/* Group 5 — ALIGN */}
      <ToolButton
        symbol="←"
        label="left"
        disabled={disabled}
        active={editor?.isActive({ textAlign: 'left' })}
        onClick={() => editor?.chain().focus().setTextAlign('left').run()}
      />
      <ToolButton
        symbol="≡"
        label="center"
        disabled={disabled}
        active={editor?.isActive({ textAlign: 'center' })}
        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
      />
      <ToolButton
        symbol="→"
        label="right"
        disabled={disabled}
        active={editor?.isActive({ textAlign: 'right' })}
        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
      />

      <Divider />

      {/* Group 6 — HISTORY */}
      <ToolButton
        symbol="↩"
        label="undo"
        disabled={disabled}
        active={false}
        onClick={() => editor?.chain().focus().undo().run()}
      />
      <ToolButton
        symbol="↪"
        label="redo"
        disabled={disabled}
        active={false}
        onClick={() => editor?.chain().focus().redo().run()}
      />

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Group 7 — INFO */}
      <span style={{
        fontSize: 10,
        letterSpacing: '0.14em',
        color: 'var(--ink-soft)',
        fontFamily: 'var(--font-mono)',
        flexShrink: 0,
        paddingRight: 4,
      }}>
        {wordCount} {wordCount === 1 ? 'word' : 'words'}
      </span>
    </div>
  );
}
