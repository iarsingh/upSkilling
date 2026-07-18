import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/content';

export function generateStaticParams() {
  return getAllBlogPosts(true).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 md:px-6 py-14 flex flex-col gap-8">
      <Link href="/blog" className="w-fit text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-emerald-400">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to blog
      </Link>

      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">{post.category}</span>
        <h1 className="text-2xl md:text-4xl font-heading font-extrabold tracking-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-zinc-500">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readingTime}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-mono px-2 py-1 rounded-full bg-slate-100 dark:bg-zinc-800">{tag}</span>
          ))}
        </div>
        {post.draft && (
          <div className="text-xs font-bold px-3 py-2 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40 w-fit">
            Draft — only visible because you followed a direct link.
          </div>
        )}
      </div>

      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-indigo-600 dark:prose-a:text-emerald-400 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
