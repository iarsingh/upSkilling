'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import type { ExperienceEntry } from '@/lib/types';

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(entries[0]?.id ?? null);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 border-t border-slate-100 dark:border-zinc-900">
      <div className="flex flex-col gap-1 max-w-3xl mb-8">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">Professional Experience</span>
        <h2 className="text-xl md:text-2xl font-heading font-bold tracking-tight">Career timeline</h2>
      </div>

      <div className="relative flex flex-col gap-4 pl-6 md:pl-8 border-l-2 border-slate-100 dark:border-zinc-900">
        {entries.map((exp) => {
          const isOpen = openId === exp.id;
          return (
            <div key={exp.id} className="relative">
              <span
                className={`absolute -left-[31px] md:-left-[39px] top-5 w-3.5 h-3.5 rounded-full border-2 ${
                  exp.current
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'bg-white dark:bg-zinc-950 border-slate-300 dark:border-zinc-700'
                }`}
              />
              <button
                onClick={() => setOpenId(isOpen ? null : exp.id)}
                className="w-full text-left p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 hover:border-indigo-200 dark:hover:border-emerald-900 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold">{exp.role}</h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">{exp.company} · {exp.location}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                      {exp.period}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 flex flex-col gap-4 overflow-hidden"
                  >
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed italic">{exp.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">Responsibilities</span>
                        <ul className="flex flex-col gap-1">
                          {exp.responsibilities.map((r, i) => (
                            <li key={i} className="text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-1.5">
                              <span className="text-slate-300 dark:text-zinc-600 shrink-0">•</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">Achievements</span>
                        <ul className="flex flex-col gap-1.5">
                          {exp.achievements.map((a, i) => (
                            <li key={i} className="text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-50 dark:border-zinc-900">
                      {exp.impactMetrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <span className="text-sm font-black text-indigo-600 dark:text-emerald-400 block">{m.value}</span>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span key={t} className="text-[9px] font-mono px-2 py-1 rounded-full bg-slate-100 dark:bg-zinc-800">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
