import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, ExternalLink, ImageOff, TrendingUp } from 'lucide-react';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { getProjectBySlug, getProjects } from '@/lib/content';

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.subtitle,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-14 flex flex-col gap-8">
      <Link href="/projects" className="w-fit text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-emerald-400">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to projects
      </Link>

      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">{project.category}</span>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight mt-1">{project.title}</h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 max-w-2xl">{project.subtitle}</p>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-fit mt-3 text-xs font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-1.5 hover:underline">
            View source on GitHub <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      <div className="h-56 md:h-72 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-emerald-500/10 dark:from-emerald-500/10 dark:via-cyan-500/10 dark:to-indigo-500/10 border border-slate-100 dark:border-zinc-900 flex items-center justify-center">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover rounded-2xl" />
        ) : (
          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 dark:text-zinc-600">
            <ImageOff className="w-4 h-4" /> project image coming soon
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-red-50/30 dark:bg-red-950/10 border border-red-100/50 dark:border-red-900/20 rounded-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-500 block mb-1.5">Problem</span>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{project.problem}</p>
          </div>
          <div className="p-4 bg-indigo-50/30 dark:bg-zinc-900/40 border border-indigo-100/50 dark:border-zinc-900 rounded-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-500 dark:text-emerald-400 block mb-1.5">Approach</span>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{project.approach}</p>
          </div>
          <div className="p-4 bg-amber-50/30 dark:bg-zinc-900/40 border border-amber-100/50 dark:border-zinc-900 rounded-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500 block mb-1.5">Challenges</span>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{project.challenges}</p>
          </div>
          <div className="p-4 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/20 rounded-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500 block mb-1.5">Solution</span>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{project.solution}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-2">Architecture</span>
            {project.architecture && <ArchitectureDiagram diagram={project.architecture} />}
          </div>

          <div className="p-4 bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 rounded-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-3.5 h-3.5" /> Results
            </span>
            <div className="flex flex-col gap-1.5">
              {project.results.map((r, i) => (
                <div key={i} className="text-xs leading-relaxed flex items-start gap-2 text-slate-600 dark:text-zinc-400">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-900 dark:bg-zinc-900 text-white rounded-xl border border-slate-800 dark:border-zinc-800">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block mb-2">Business Impact</span>
            <div className="flex flex-col gap-1.5">
              {project.businessImpact.map((impact, i) => (
                <p key={i} className="text-xs text-slate-300 leading-relaxed">• {impact}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-zinc-900">
        {project.technologies.map((t) => (
          <span key={t} className="text-[10px] font-mono bg-slate-100 dark:bg-zinc-900 px-2.5 py-0.5 rounded-full">{t}</span>
        ))}
      </div>
    </div>
  );
}
