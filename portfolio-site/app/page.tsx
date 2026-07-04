import Link from "next/link";
import TerminalWindow from "./components/TerminalWindow";
import TypedLines from "./components/TypedLines";
import { GitHubIcon, LinkedInIcon, KaggleIcon, CodeIcon, ArrowUpRightIcon } from "./components/icons";
import { getProfile, getFeaturedProjects, getSkills, getCertifications } from "@/lib/data";

export default async function Home() {
  const [profile, featuredProjects, skillsByCategory, certifications] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getSkills(),
    getCertifications(),
  ]);

  const socialLinks = [
    { href: profile?.linkedin, label: "linkedin", Icon: LinkedInIcon },
    { href: profile?.github, label: "github", Icon: GitHubIcon },
    { href: profile?.kaggle, label: "kaggle", Icon: KaggleIcon },
    { href: profile?.hackerrank, label: "hackerrank", Icon: CodeIcon },
  ].filter((l): l is typeof l & { href: string } => Boolean(l.href));

  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <TerminalWindow title="akhilesh@devops-mlops:~">
          <TypedLines
            lines={[
              { prompt: "$", text: "whoami", className: "text-foreground/90" },
              { text: profile?.fullName ?? "", className: "text-foreground font-semibold text-base pl-4 mb-2" },
              { prompt: "$", text: "cat role.txt", className: "text-foreground/90" },
              { text: profile?.headline ?? "", className: "text-accent-2 pl-4 mb-2" },
              { prompt: "$", text: "kubectl get pods -n mlops --output=summary", className: "text-foreground/90" },
              {
                text: "vertex-pipeline   Running   mlflow-registry   Running   kserve-endpoint   Running",
                className: "text-muted pl-4 text-xs mb-2",
              },
              { prompt: "$", text: "echo $STATUS", className: "text-foreground/90" },
            ]}
          />
          <div className="flex items-center gap-2 pl-4 mt-1">
            <span className="w-2 h-2 rounded-full bg-accent status-dot" />
            <span className="text-accent text-xs">available_for_new_opportunities=true</span>
          </div>
        </TerminalWindow>

        <p className="max-w-2xl text-muted leading-relaxed mt-8 mb-8 fade-up">{profile?.summary}</p>

        <div className="flex flex-wrap items-center gap-3">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-mono hover:border-accent/50 hover:text-accent transition-colors"
            >
              <Icon className="w-4 h-4" />
              ./{label}
            </a>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get in touch
            <ArrowUpRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-semibold tracking-tight font-mono">
              <span className="text-accent">#</span> featured_projects
            </h2>
            <Link href="/projects" className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-1 font-mono">
              ls -la /projects
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((p) => (
              <div key={p.id} className="rounded-xl border border-border bg-surface overflow-hidden hover:border-accent/40 transition-colors group">
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-background/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 text-xs font-mono text-muted truncate">{p.slug}.md</span>
                </div>
                <div className="p-5">
                  <h3 className="font-medium mb-1.5 group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted mb-4 leading-relaxed">{p.summary}</p>
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded bg-background text-accent-2/80 border border-border/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skillsByCategory.size > 0 && (
        <section className="py-16 border-t border-border">
          <h2 className="text-2xl font-semibold tracking-tight mb-8 font-mono">
            <span className="text-accent">#</span> skills.yaml
          </h2>
          <div className="rounded-xl border border-border bg-surface p-6 font-mono text-sm space-y-4">
            {Array.from(skillsByCategory.entries()).map(([category, names]) => (
              <div key={category} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-4">
                <span className="text-accent-2 sm:w-52 sm:shrink-0">{category.toLowerCase().replace(/[^a-z0-9]+/g, "_")}:</span>
                <div className="flex flex-wrap gap-1.5">
                  {names.map((name) => (
                    <span key={name} className="text-xs px-2 py-0.5 rounded bg-background text-foreground/80 border border-border/60">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="py-16 border-t border-border">
          <h2 className="text-2xl font-semibold tracking-tight mb-8 font-mono">
            <span className="text-accent">#</span> get certifications
          </h2>
          <div className="rounded-xl border border-border bg-surface overflow-hidden font-mono text-sm">
            <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-2.5 border-b border-border text-xs text-muted">
              <span>NAME</span>
              <span>ISSUER</span>
            </div>
            {certifications.map((c) => (
              <div key={c.id} className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 border-b border-border/60 last:border-0 hover:bg-surface-hover transition-colors">
                <span>{c.name}</span>
                <span className="text-muted text-xs">
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ""}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
