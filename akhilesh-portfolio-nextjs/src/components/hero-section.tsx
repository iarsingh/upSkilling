'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { Profile } from '@/lib/types';

export function HeroSection({ profile }: { profile: Profile }) {
  const [typingText, setTypingText] = useState('');

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = profile.taglines[wordIndex];
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      setTypingText(word.substring(0, charIndex));
      let speed = isDeleting ? 40 : 100;

      if (!isDeleting && charIndex === word.length) {
        isDeleting = true;
        speed = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % profile.taglines.length;
        speed = 400;
      }
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, [profile.taglines]);

  return (
    <section className="hero-grid relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12 md:py-20 max-w-6xl mx-auto px-4 md:px-6 overflow-hidden">
      {/* Lightweight CSS-only animated background — no heavy particle JS library, keeps Lighthouse perf high */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[420px] h-[420px] rounded-full bg-indigo-500/10 dark:bg-emerald-500/10 blur-3xl animate-float-a -top-20 -left-20" />
        <div className="absolute w-[360px] h-[360px] rounded-full bg-violet-500/10 dark:bg-cyan-500/10 blur-3xl animate-float-b top-1/3 right-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,116,139,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,.08)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_40%,transparent_100%)]" />
      </div>

      <div className="lg:col-span-7 flex flex-col gap-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-indigo-50 text-indigo-600 dark:bg-emerald-950/20 dark:text-emerald-400 border dark:border-emerald-900/30 self-start">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Available for platform &amp; MLOps engagements</span>
        </span>

        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.05]">
            Hi, I&rsquo;m <span className="text-gradient">{profile.name}</span>
          </h1>
          <div className="h-8 md:h-10 text-sm md:text-lg font-semibold font-mono text-slate-500 dark:text-zinc-400 flex items-center gap-1">
            <span
              className="text-indigo-600 dark:text-emerald-400 border-r-2 border-indigo-600 dark:border-emerald-400 pr-1"
              style={{ animation: 'blink 1s step-end infinite' }}
            >
              {typingText}
            </span>
          </div>
        </div>

        <p className="text-sm md:text-base text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          {profile.tagline}
        </p>

        <div className="flex flex-wrap gap-2.5 pt-2">
          <Link href="/resume" className="px-5 py-2 bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-bold rounded-lg shadow-sm hover:scale-[1.02] transition-transform">
            View Resume
          </Link>
          <Link href="/contact" className="px-5 py-2 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 text-xs font-bold rounded-lg transition-colors">
            Contact Me
          </Link>
          <a href={profile.topmate} target="_blank" rel="noreferrer" className="px-5 py-2 bg-indigo-600 text-white dark:bg-emerald-500 dark:text-zinc-950 text-xs font-bold rounded-lg shadow-xs hover:scale-[1.02] transition-transform">
            Book 1:1 (Topmate)
          </a>
        </div>
      </div>

      <div className="lg:col-span-5 flex justify-center lg:justify-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-56 h-56 md:w-72 md:h-72"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-emerald-400 opacity-80 blur-sm" />
          <div className="absolute inset-1 rounded-[1.85rem] bg-white dark:bg-zinc-950 flex items-center justify-center overflow-hidden">
            {profile.photoUrl ? (
              <Image src={profile.photoUrl} alt={profile.name} fill className="object-cover" priority />
            ) : (
              <span className="font-heading text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-emerald-500">
                AR
              </span>
            )}
          </div>
          <span className="absolute -bottom-2 -right-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-lg text-[9px] font-mono font-bold">
            <span className="status-dot" /> Open to work
          </span>
        </motion.div>
      </div>
    </section>
  );
}
