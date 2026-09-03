'use client';
import { useRouter } from 'next/navigation';
import { apiErrorMessage } from '@/lib/client-api';

export function DeleteButton({ slug }) {
  const router = useRouter();
  async function handleDelete() {
    if (!confirm('Delete this entry permanently?')) return;
    const res = await fetch(`/api/admin/posts/${encodeURIComponent(slug)}`, { method: 'DELETE' });
    if (!res.ok) {
      alert(await apiErrorMessage(res, 'Unable to delete article'));
      return;
    }
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
