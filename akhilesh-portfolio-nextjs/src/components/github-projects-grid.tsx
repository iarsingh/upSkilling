'use client';

import { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { GithubIcon } from './brand-icons';
import type { GitHubProject } from '@/lib/types';

const FILTERS = ['All', 'Cloud', 'MLOps', 'AI', 'DevOps', 'Web'];
const FILTER_TERMS: Record<string, string[]> = {
  Cloud: ['gcp', 'gke', 'cloud', 'kubernetes'],
  MLOps: ['mlops', 'mlflow', 'kserve', 'vertex ai'],
  AI: ['ai', 'ollama', 'genai', 'rag', 'gemini'],
  DevOps: ['devops', 'terraform', 'jenkins', 'ansible', 'sre', 'github actions'],
  Web: ['react', 'typescript', 'frontend', 'web ui'],
};

export function GithubProjectsGrid({ projects }: { projects: GitHubProject[] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = projects.filter((project) => {
    const searchable = `${project.title} ${project.description} ${project.technologies.join(' ')}`.toLowerCase();
    const matchesSearch = searchable.includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || FILTER_TERMS[filter]?.some((term) => searchable.includes(term));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-2xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 sticky top-20 z-20 backdrop-blur-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, tools, or outcomes…"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-transparent focus:border-indigo-500 dark:focus:border-emerald-500 outline-none text-xs"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                filter === f ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-zinc-950' : 'hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[10px] font-mono text-slate-400">Showing {filtered.length} of {projects.length} projects</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col justify-between gap-5 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300 dark:hover:border-emerald-800 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <GithubIcon className="w-5 h-5 text-slate-400 dark:text-zinc-500" />
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-emerald-400" />
              </div>
              <h3 className="font-bold mt-4 group-hover:text-indigo-600 dark:group-hover:text-emerald-400">{project.title}</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mt-2">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span key={t} className="text-[9px] font-mono px-2 py-1 rounded-full bg-slate-100 dark:bg-zinc-800">{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center border border-dashed border-slate-300 dark:border-zinc-800 rounded-3xl">
          <Search className="w-8 h-8 mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-bold">No matching projects</p>
          <button onClick={() => { setSearch(''); setFilter('All'); }} className="text-xs text-indigo-600 dark:text-emerald-400 mt-2 hover:underline">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
