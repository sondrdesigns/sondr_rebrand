'use client';
import { useRouter } from 'next/navigation';

export function DeleteButton({ slug }) {
  const router = useRouter();
  async function handleDelete() {
    if (!confirm('Delete this entry permanently?')) return;
    await fetch(`/api/admin/posts/${slug}`, { method: 'DELETE' });
    router.refresh();
  }
  return (
    <button
      onClick={handleDelete}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgb(102,99,99)', fontFamily: 'var(--font-mono, monospace)',
      }}
    >
      Delete
    </button>
  );
}
