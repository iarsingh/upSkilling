import TerminalWindow from "@/app/components/TerminalWindow";
import { getProfile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, KaggleIcon, CodeIcon, MailIcon, ArrowUpRightIcon } from "@/app/components/icons";

export const metadata = { title: "Contact | Akhilesh Ranjan Singh" };

export default async function ContactPage() {
  const profile = await getProfile();

  const links = [
    { label: "email", value: profile?.email, href: `mailto:${profile?.email}`, Icon: MailIcon },
    { label: "linkedin", value: "Connect on LinkedIn", href: profile?.linkedin ?? undefined, Icon: LinkedInIcon },
    { label: "github", value: "View repositories", href: profile?.github ?? undefined, Icon: GitHubIcon },
    { label: "kaggle", value: "View profile", href: profile?.kaggle ?? undefined, Icon: KaggleIcon },
    { label: "hackerrank", value: "View profile", href: profile?.hackerrank ?? undefined, Icon: CodeIcon },
    { label: "credly", value: "View badges", href: profile?.credly ?? undefined, Icon: CodeIcon },
  ].filter((l) => l.href);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 font-mono">
        <span className="text-accent">$</span> cat contact.json
      </h1>

      <TerminalWindow title="contact.json" className="mb-10">
        <div className="text-foreground/90">{"{"}</div>
        <div className="pl-4">
          <span className="text-accent-2">&quot;location&quot;</span>: <span className="text-foreground/80">&quot;{profile?.location}&quot;</span>,
        </div>
        <div className="pl-4">
          <span className="text-accent-2">&quot;phone&quot;</span>: <span className="text-foreground/80">&quot;{profile?.phone}&quot;</span>,
        </div>
        <div className="pl-4">
          <span className="text-accent-2">&quot;status&quot;</span>: <span className="text-foreground/80">&quot;open_to_work&quot;</span>
        </div>
        <div className="text-foreground/90">{"}"}</div>
      </TerminalWindow>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href?.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            className="group flex items-center justify-between gap-3 border border-border bg-surface rounded-xl px-5 py-4 hover:border-accent/40 hover:bg-surface-hover transition-colors"
          >
            <div className="flex items-center gap-3">
              {l.Icon && <l.Icon className="w-5 h-5 text-accent shrink-0" />}
              <div>
                <p className="text-sm font-medium font-mono">./{l.label}</p>
                <p className="text-xs text-muted truncate max-w-[14rem]">{l.value}</p>
              </div>
            </div>
            <ArrowUpRightIcon className="w-4 h-4 text-muted group-hover:text-accent transition-colors shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
