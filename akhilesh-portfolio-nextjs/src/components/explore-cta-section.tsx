import Link from 'next/link';
import { BookOpen, Calendar, Camera, Coffee, Sparkles, Video } from 'lucide-react';

const items = [
  { href: '/blog', label: 'Technical Blog', desc: 'DevOps, Terraform, Kubernetes & MLOps writeups', icon: BookOpen },
  { href: '/poetry', label: 'Shayari & Poetry', desc: 'Hindi & English verse, a different side of me', icon: Sparkles },
  { href: '/videos', label: 'Performance Videos', desc: 'Open mic & poetry reels', icon: Video },
  { href: '/gallery', label: 'Gallery', desc: 'Events, meetups & speaking sessions', icon: Camera },
  { href: '/book-a-session', label: 'Book a Session', icon: Calendar, desc: 'Mentorship & career guidance via Topmate' },
  { href: '/support', label: 'Buy Me a Coffee', desc: 'Support the blogs, tools & poetry', icon: Coffee },
];

export function ExploreCtaSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 border-t border-slate-100 dark:border-zinc-900">
      <div className="flex flex-col gap-1 max-w-3xl mb-8">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">Explore More</span>
        <h2 className="text-xl md:text-2xl font-heading font-bold tracking-tight">The engineer &amp; the writer, in one place</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 hover:border-indigo-200 dark:hover:border-emerald-900 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <span className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-emerald-950/30 text-indigo-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <item.icon className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold group-hover:text-indigo-600 dark:group-hover:text-emerald-400">{item.label}</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{item.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
