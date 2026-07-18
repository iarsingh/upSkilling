import { Building2, MapPin } from 'lucide-react';
import type { Profile } from '@/lib/types';

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 border-t border-slate-100 dark:border-zinc-900">
      <div className="flex flex-col gap-1 max-w-3xl mb-8">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">About Me</span>
        <h2 className="text-xl md:text-2xl font-heading font-bold tracking-tight">Professional summary &amp; journey</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{profile.aboutMe}</p>
          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{profile.aboutJourney}</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-emerald-950/30 text-indigo-600 dark:text-emerald-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Company</span>
              <span className="text-sm font-bold">{profile.currentCompany}</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-emerald-950/30 text-indigo-600 dark:text-emerald-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
              <span className="text-sm font-bold">{profile.location}</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 dark:bg-zinc-900 text-white border border-slate-800 dark:border-zinc-800">
            <span className="text-3xl font-black text-emerald-400">{profile.experienceYears}+</span>
            <span className="text-[11px] font-bold uppercase tracking-wide block mt-1 text-slate-300">Years of Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
