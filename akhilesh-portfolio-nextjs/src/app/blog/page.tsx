import type { Metadata } from 'next';
import { BlogListGrid } from '@/components/blog-list-grid';
import { getAllBlogPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing on DevOps, Terraform, Kubernetes, MLOps, Cloud, AI infrastructure, and monitoring.',
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 flex flex-col gap-8">
      <div className="flex flex-col gap-2 max-w-3xl">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">Technical Blog</span>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight">DevOps, Terraform, Kubernetes &amp; MLOps writing</h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
          Notes and deep dives from real platform work. New posts get added through the admin panel — no code changes required.
        </p>
      </div>
      <BlogListGrid posts={posts} />
    </div>
  );
}
