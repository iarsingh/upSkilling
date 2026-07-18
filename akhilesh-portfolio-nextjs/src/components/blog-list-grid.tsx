'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Search } from 'lucide-react';
import type { BlogPost } from '@/lib/content';
import type { BlogCategory } from '@/lib/types';

const CATEGORIES: (BlogCategory | 'All')[] = ['All', 'DevOps', 'Terraform', 'Kubernetes', 'MLOps', 'Cloud', 'AI Infrastructure', 'Monitoring'];

export function BlogListGrid({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<(BlogCategory | 'All')>('All');

  const filtered = posts.filter((post) => {
    const matchesCategory = category === 'All' || post.category === category;
    const matchesSearch = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts…"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-transparent focus:border-indigo-500 dark:focus:border-emerald-500 outline-none text-xs"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                category === c ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-zinc-950' : 'hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-300 dark:border-zinc-800 rounded-3xl">
          <p className="text-sm font-bold">No posts yet in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col p-5 bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 rounded-2xl hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 dark:hover:border-emerald-900 transition-all"
            >
              <span className="text-[10px] font-extrabold uppercase text-indigo-600 dark:text-emerald-400">{post.category}</span>
              <h2 className="text-sm font-bold mt-1.5 mb-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-emerald-400">{post.title}</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50 dark:border-zinc-850 text-[10px] text-slate-400">
                <span>{post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
