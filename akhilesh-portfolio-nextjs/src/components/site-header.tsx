'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Calendar,
  Camera,
  Coffee,
  FileText,
  Home,
  Layers,
  Mail,
  Menu,
  MoreHorizontal,
  Moon,
  Sparkles,
  Sun,
  Video,
  X,
} from 'lucide-react';
import { useTheme } from './theme-provider';
import type { Profile } from '@/lib/types';

const primaryLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: Layers },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/poetry', label: 'Poetry', icon: Sparkles },
  { href: '/resume', label: 'Resume', icon: FileText },
];

const moreLinks = [
  { href: '/videos', label: 'Performance Videos', icon: Video },
  { href: '/gallery', label: 'Gallery', icon: Camera },
  { href: '/testimonials', label: 'Testimonials', icon: Award },
  { href: '/book-a-session', label: 'Book a Session', icon: Calendar },
  { href: '/support', label: 'Support', icon: Coffee },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function SiteHeader({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-3 z-50 px-3 no-print">
      <div className="max-w-6xl mx-auto px-3 md:px-4 h-14 flex items-center justify-between rounded-2xl border border-white/50 dark:border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:shadow-black/20">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 dark:from-emerald-400 dark:to-cyan-400 text-white dark:text-zinc-950 flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/20">
            AR
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-black uppercase tracking-wider block leading-none">{profile.name}</span>
            <span className="text-[9px] opacity-60 font-medium">{profile.title}</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isActive(item.href)
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-emerald-950/25 dark:text-emerald-400 font-bold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900/60'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900/60"
            >
              <MoreHorizontal className="w-4 h-4" />
              <span>More</span>
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl p-1.5 flex flex-col gap-0.5"
                >
                  {moreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-500 dark:text-zinc-400 dark:hover:text-zinc-100"
            title="Toggle light/dark theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg border border-slate-200/80 dark:border-zinc-800 text-slate-600 dark:text-zinc-400"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden max-w-6xl mx-auto mt-2 bg-white/95 dark:bg-zinc-950/95 border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-xl px-4 py-4 grid grid-cols-2 gap-1.5 overflow-hidden"
          >
            {[...primaryLinks, ...moreLinks].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                  isActive(item.href)
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-emerald-950/20 dark:text-emerald-400 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-900'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
