import { getPost } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { PostEditor } from '@/components/admin/PostEditor';

export default async function EditPostPage({ params }) {
  let post;
  try {
    post = await getPost(params.slug);
  } catch {
    notFound();
  }
  return (
    <PostEditor
      isNew={false}
      initialFrontmatter={post.frontmatter}
      initialContent={post.content}
    />
  );
}
