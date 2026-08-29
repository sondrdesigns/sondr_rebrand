'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEditor as useTiptap } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

import { PullQuoteExtension } from '@/lib/tiptap/PullQuoteExtension';
import { ExhibitionImageExtension } from '@/lib/tiptap/ExhibitionImageExtension';
import { EditorContext } from './EditorContext';
import { EditorToolbar } from './EditorToolbar';
import { EditorCanvas } from './EditorCanvas';
import { SlugField } from './SlugField';
import { TagInput } from './TagInput';
import { MetaPanel } from './MetaPanel';
import { PublishPanel } from './PublishPanel';
import { CoverImageUpload } from './CoverImageUpload';

function toSlug(t) {
  return t
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function EditorSkeleton() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--paper)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.18em',
      color: 'var(--ink-soft)',
    }}>
      loading editor…
    </div>
  );
}

export function PostEditor({ initialFrontmatter, initialContent, isNew }) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState(initialFrontmatter?.title || '');
  const [slug, setSlug] = useState(initialFrontmatter?.slug || '');
  const [slugManual, setSlugManual] = useState(!isNew);
  const [tags, setTags] = useState(initialFrontmatter?.tags || []);
  const [status, setStatus] = useState(initialFrontmatter?.status || 'draft');
  const [scheduledFor, setScheduledFor] = useState(initialFrontmatter?.scheduledFor || '');
  const [coverImage, setCoverImage] = useState(initialFrontmatter?.coverImage || '');
  const [excerpt, setExcerpt] = useState(initialFrontmatter?.excerpt || '');
  const [dropCap, setDropCap] = useState(initialFrontmatter?.dropCap || false);
  const [saveState, setSaveState] = useState('idle');
  const [firstPublish, setFirstPublish] = useState(!initialFrontmatter?.publishedAt);
  const [titleFocused, setTitleFocused] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!slugManual && title) setSlug(toSlug(title));
  }, [title, slugManual]);

  const editor = useTiptap({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Begin writing…' }),
      CharacterCount,
      PullQuoteExtension,
      ExhibitionImageExtension,
    ],
    content: initialContent || '',
    editorProps: {
      attributes: {
        style: [
          'outline: none',
          'min-height: 600px',
          'font-family: var(--font-mono)',
          'font-size: 16px',
          'line-height: 1.8',
          'color: var(--ink)',
          'letter-spacing: 0.02em',
        ].join(';'),
      },
    },
  });

  const wordCount = editor?.storage?.characterCount?.words() ?? 0;

  const handleSave = useCallback(async () => {
    if (!editor) return;
    setSaveState('saving');

    const html = editor.getHTML();

    const frontmatter = {
      ...(initialFrontmatter || {}),
      title,
      slug,
      tags,
      status,
      excerpt,
      dropCap,
      ...(coverImage ? { coverImage } : {}),
      ...(status === 'scheduled' ? { scheduledFor } : {}),
    };

    if (status === 'published' && firstPublish) {
      frontmatter.publishedAt = new Date().toISOString();
      setFirstPublish(false);
    }

    try {
      let res;
      if (isNew) {
        res = await fetch('/api/admin/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ frontmatter, content: html }),
        });
      } else {
        res = await fetch(`/api/admin/posts/${slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ frontmatter, content: html }),
        });
      }

      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);

      if (isNew && data.slug) {
        router.replace(`/admin/blog/${data.slug}/edit`);
      }
    } catch {
      setSaveState('error');
    }
  }, [editor, title, slug, tags, status, scheduledFor, coverImage, excerpt, dropCap, firstPublish, isNew, initialFrontmatter]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleSave]);

  if (!mounted) return <EditorSkeleton />;

  const saveLabel = {
    idle: '',
    saving: 'saving…',
    saved: 'saved ✓',
    error: 'error — try again',
  }[saveState];

  function topBarButtonLabel() {
    if (saveState === 'saving') return 'saving…';
    if (status === 'draft') return 'Save Draft';
    if (firstPublish) return 'Open the Exhibition';
    return 'Update Entry';
  }

  function topBarButtonStyle() {
    const base = {
      padding: '10px 24px',
      background: 'var(--ink)',
      color: 'var(--paper)',
      border: 'none',
      cursor: saveState === 'saving' ? 'default' : 'pointer',
      letterSpacing: '0.03em',
    };
    if (status === 'draft') {
      return { ...base, fontFamily: 'var(--font-mono)', fontStyle: 'italic', fontSize: 14 };
    }
    if (firstPublish) {
      return { ...base, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15 };
    }
    return { ...base, fontFamily: 'var(--font-mono)', fontSize: 13 };
  }

  return (
    <EditorContext.Provider value={editor}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--paper)' }}>

        {/* Top bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          borderBottom: '1.5px solid var(--ink)',
          padding: '14px 32px',
          display: 'flex', alignItems: 'center', gap: 20,
          background: 'var(--paper)', fontFamily: 'var(--font-mono)',
        }}>
          <Link
            href="/admin/blog"
            style={{
              fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--ink-soft)', textDecoration: 'none', flexShrink: 0,
            }}
          >
            &larr; Archive
          </Link>
          <div style={{ flex: 1 }} />
          {saveLabel ? (
            <span style={{
              fontSize: 11, letterSpacing: '0.12em',
              color: saveState === 'error' ? '#c0392b' : 'var(--ink-soft)',
              fontFamily: 'var(--font-mono)',
            }}>
              {saveLabel}
            </span>
          ) : null}
          <button
            onClick={handleSave}
            disabled={saveState === 'saving'}
            style={topBarButtonStyle()}
          >
            {topBarButtonLabel()}
          </button>
        </div>

        {/* Main body */}
        <div style={{ display: 'flex', flex: 1 }}>

          {/* Left column — editor */}
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            borderRight: '1.5px solid var(--ink)', minWidth: 0,
          }}>
            {/* Cover image */}
            <CoverImageUpload value={coverImage} onChange={setCoverImage} />

            {/* Formatting toolbar */}
            <EditorToolbar />

            {/* Title */}
            <div style={{ padding: '40px 56px 0' }}>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onFocus={() => setTitleFocused(true)}
                onBlur={() => setTitleFocused(false)}
                placeholder="Entry title…"
                style={{
                  display: 'block', width: '100%', boxSizing: 'border-box',
                  background: 'transparent', border: 'none',
                  borderBottom: titleFocused ? '1.5px solid var(--ink)' : '1px solid rgba(0,0,0,0.1)',
                  paddingBottom: 16, marginBottom: 32,
                  fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 400,
                  color: 'var(--ink)', outline: 'none', lineHeight: 1.15,
                  transition: 'border-color 0.15s',
                }}
              />
            </div>

            {/* Tiptap canvas */}
            <EditorCanvas />
          </div>

          {/* Right column — panels */}
          <div style={{
            width: 320, flexShrink: 0, padding: '32px 28px',
            display: 'flex', flexDirection: 'column', gap: 32,
          }}>
            <SlugField slug={slug} onChange={setSlug} onManualEdit={setSlugManual} />
            <TagInput tags={tags} onChange={setTags} />
            <MetaPanel
              excerpt={excerpt}
              onExcerptChange={setExcerpt}
              dropCap={dropCap}
              onDropCapChange={setDropCap}
            />
            <PublishPanel
              status={status}
              onStatusChange={setStatus}
              scheduledFor={scheduledFor}
              onScheduledForChange={setScheduledFor}
              onSave={handleSave}
              saveState={saveState}
              isFirstPublish={firstPublish}
              wordCount={wordCount}
            />
          </div>
        </div>
      </div>
    </EditorContext.Provider>
  );
}
