import { ExternalLink } from 'lucide-react';
import type { Certification, Profile } from '@/lib/types';

export function CertificationsSection({ certifications, profile }: { certifications: Certification[]; profile: Profile }) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 border-t border-slate-100 dark:border-zinc-900">
      <div className="flex flex-col gap-1 max-w-3xl mb-6">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">Certifications</span>
        <h2 className="text-xl md:text-2xl font-heading font-bold tracking-tight">Verified certifications &amp; skill badges</h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <a href={profile.credly} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-1 hover:underline">
          Credly profile <ExternalLink className="w-3 h-3" />
        </a>
        <a href={profile.googleSkills} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-1 hover:underline">
          Google Cloud Skills profile <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {certifications.map((cert, i) => (
          <a
            key={i}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 rounded-xl hover:border-slate-300 dark:hover:border-zinc-800 hover:shadow-md transition-all flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              {cert.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cert.imageUrl} alt="" className="w-8 h-8 object-contain shrink-0" loading="lazy" />
              )}
              <div className="min-w-0">
                <span className="font-bold text-slate-800 dark:text-zinc-200 block line-clamp-2">{cert.name}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{cert.issuer} · {cert.date}</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </a>
        ))}
      </div>
    </section>
  );
}
