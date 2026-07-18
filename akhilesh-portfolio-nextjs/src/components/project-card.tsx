import Link from 'next/link';
import { ArrowRight, ImageOff } from 'lucide-react';
import type { ProjectEntry } from '@/lib/types';

export function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 dark:hover:border-emerald-900 transition-all"
    >
      <div className="h-32 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-emerald-500/10 dark:from-emerald-500/10 dark:via-cyan-500/10 dark:to-indigo-500/10 flex items-center justify-center border-b border-slate-100 dark:border-zinc-900">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 dark:text-zinc-600">
            <ImageOff className="w-3.5 h-3.5" /> image coming soon
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-slate-400 dark:text-zinc-500">{project.category}</span>
          <h3 className="text-sm font-bold mt-1 mb-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-emerald-400">
            {project.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">{project.subtitle}</p>
        </div>
        <div className="flex items-center justify-between border-t pt-3 border-slate-50 dark:border-zinc-850">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 2).map((t) => (
              <span key={t} className="text-[9px] font-mono bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{t}</span>
            ))}
          </div>
          <span className="text-[10px] font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-0.5">
            Details <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
