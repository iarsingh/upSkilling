'use client';

import { motion } from 'framer-motion';
import { resolveIcon } from '@/lib/icon-map';
import type { SkillCategory } from '@/lib/types';

export function SkillsSection({ categories }: { categories: SkillCategory[] }) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 border-t border-slate-100 dark:border-zinc-900">
      <div className="flex flex-col gap-1 max-w-3xl mb-8">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">Skills</span>
        <h2 className="text-xl md:text-2xl font-heading font-bold tracking-tight">Tools, platforms &amp; engineering practices</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = resolveIcon(cat.icon);
          return (
            <motion.div
              key={cat.category}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 hover:border-indigo-200 dark:hover:border-emerald-900 hover:shadow-lg transition-colors flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border dark:border-zinc-850 text-indigo-600 dark:text-emerald-400">
                  <Icon className="w-4 h-4" />
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <span
                    key={skill.name}
                    className="text-[10px] font-mono px-2 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300"
                    title={`${skill.level}%`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
