import { getExperience } from "@/lib/data";

export const metadata = { title: "Experience | Akhilesh Ranjan Singh" };

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 font-mono">
        <span className="text-accent">$</span> git log --oneline --stat
      </h1>
      <p className="text-muted mb-12 font-mono text-sm">Nearly 7 years across DevOps, Platform Engineering, and MLOps</p>

      <div className="relative pl-8 space-y-12 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-border">
        {experience.map((e) => (
          <article key={e.id} className="relative">
            <div className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-background status-dot" />
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <h2 className="text-lg font-semibold">
                <span className="text-accent-3 font-mono text-sm mr-2">commit</span>
                {e.title}
              </h2>
              <span className="text-sm text-muted font-mono">
                {e.startDate} &ndash; {e.endDate}
              </span>
            </div>
            <p className="text-accent text-sm mb-4 font-mono pl-[3.1rem]">
              Author: {e.company} &lt;{e.location}&gt;
            </p>
            <ul className="space-y-2 text-muted leading-relaxed">
              {e.highlights.map((h, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-accent font-mono shrink-0">+</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
        {experience.length === 0 && <p className="text-muted font-mono">No experience listed yet.</p>}
      </div>
    </div>
  );
}
