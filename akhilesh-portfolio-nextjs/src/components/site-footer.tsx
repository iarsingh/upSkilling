'use client';

import Link from 'next/link';
import { ArrowUp, Award, Cloud } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from './brand-icons';
import type { Profile } from '@/lib/types';

const quickLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/poetry', label: 'Poetry' },
  { href: '/resume', label: 'Resume' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export function SiteFooter({ profile }: { profile: Profile }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-slate-200/60 dark:border-zinc-900 no-print py-10 text-slate-500 dark:text-zinc-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-zinc-200">{profile.name}</span>
            <p className="text-[11px] leading-relaxed mt-2">{profile.tagline}</p>
            <p className="text-[11px] mt-2">{profile.location}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-start gap-3">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" aria-label="LinkedIn">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" aria-label="GitHub">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href={profile.credly} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" aria-label="Credly">
              <Award className="w-4 h-4" />
            </a>
            <a href={profile.googleSkills} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" aria-label="Google Cloud Skills">
              <Cloud className="w-4 h-4" />
            </a>
            <a href={profile.youtube} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-emerald-400 transition-colors" aria-label="YouTube">
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-100 dark:border-zinc-900 text-[10px]">
          <span>© {new Date().getFullYear()} {profile.name} · All rights reserved</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 font-semibold"
          >
            <ArrowUp className="w-3 h-3" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
