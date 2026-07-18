import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from './project-card';
import type { ProjectEntry } from '@/lib/types';

export function FeaturedProjectsSection({ projects }: { projects: ProjectEntry[] }) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 border-t border-slate-100 dark:border-zinc-900">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <div className="flex flex-col gap-1 max-w-2xl">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">Projects</span>
          <h2 className="text-xl md:text-2xl font-heading font-bold tracking-tight">Production-grade solutions with live design schematics</h2>
        </div>
        <Link href="/projects" className="w-fit text-xs font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-1.5 hover:underline shrink-0">
          View all projects <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {projects.slice(0, 4).map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
