import { getProjects } from "@/lib/data";
import { ArrowUpRightIcon } from "@/app/components/icons";

export const metadata = { title: "Projects | Akhilesh Ranjan Singh" };

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 font-mono">
        <span className="text-accent">$</span> ls -la ~/projects
      </h1>
      <p className="text-muted mb-12 font-mono text-sm">{projects.length} entries · GCP, MLOps, and platform-engineering builds</p>

      <div className="space-y-5">
        {projects.map((p) => (
          <article
            key={p.id}
            className="rounded-xl border border-border bg-surface overflow-hidden hover:border-accent/40 transition-colors"
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-background/40">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-xs font-mono text-muted truncate">{p.slug}.md</span>
              {p.featured && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded bg-accent/15 text-accent font-mono shrink-0">featured</span>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
              <p className="text-muted leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4 font-mono">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded bg-background text-accent-2/80 border border-border/60">
                    {t}
                  </span>
                ))}
              </div>
              {(p.repoUrl || p.liveUrl) && (
                <div className="flex gap-4 text-sm pt-1 font-mono">
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:opacity-80 transition-opacity"
                    >
                      repository
                      <ArrowUpRightIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:opacity-80 transition-opacity"
                    >
                      live
                      <ArrowUpRightIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
        {projects.length === 0 && <p className="text-muted font-mono">No projects yet.</p>}
      </div>
    </div>
  );
}
