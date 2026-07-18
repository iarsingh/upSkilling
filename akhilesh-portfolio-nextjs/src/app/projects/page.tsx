import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { ProjectCard } from '@/components/project-card';
import { GithubProjectsGrid } from '@/components/github-projects-grid';
import { getGithubProjects, getProfile, getProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Flagship platform, MLOps, and DevOps projects with problem, solution, and architecture breakdowns, plus a curated list of public GitHub repositories.',
};

export default function ProjectsPage() {
  const projects = getProjects();
  const githubProjects = getGithubProjects();
  const profile = getProfile();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 flex flex-col gap-14">
      <div className="flex flex-col gap-2 max-w-3xl">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">Projects</span>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight">Kubernetes, GCP &amp; MLOps in production</h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
          Flagship platform engineering, DevSecOps, and MLOps case studies below, plus a curated set of public GitHub repositories.
        </p>
        <a href={profile.github} target="_blank" rel="noreferrer" className="w-fit text-xs font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-1.5 hover:underline">
          View the complete GitHub profile <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-bold">Flagship projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-slate-100 dark:border-zinc-900 pt-10">
        <h2 className="text-lg font-bold">All public GitHub projects</h2>
        <GithubProjectsGrid projects={githubProjects} />
      </section>
    </div>
  );
}
