'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Heart } from 'lucide-react';
import type { PoetryEntry } from '@/lib/content';
import type { PoetryMood } from '@/lib/types';

const MOODS: (PoetryMood | 'All')[] = ['All', 'Love', 'Life', 'Motivation', 'Heartbreak', 'Friendship', 'Hope'];

const MOOD_STYLE: Record<string, string> = {
  Love: 'bg-rose-950/30 text-rose-300 border-rose-800/40',
  Life: 'bg-sky-950/30 text-sky-300 border-sky-800/40',
  Motivation: 'bg-amber-950/30 text-amber-300 border-amber-800/40',
  Heartbreak: 'bg-violet-950/30 text-violet-300 border-violet-800/40',
  Friendship: 'bg-emerald-950/30 text-emerald-300 border-emerald-800/40',
  Hope: 'bg-cyan-950/30 text-cyan-300 border-cyan-800/40',
};

export function PoetryList({ poems }: { poems: PoetryEntry[] }) {
  const [mood, setMood] = useState<(PoetryMood | 'All')>('All');
  const filtered = mood === 'All' ? poems : poems.filter((p) => p.mood === mood);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {MOODS.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all border ${
              mood === m ? 'bg-amber-500 text-stone-950 border-amber-500' : 'border-white/10 text-stone-400 hover:border-white/30'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 rounded-3xl">
          <p className="text-sm font-bold text-stone-300">No poems yet in this mood</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((poem) => (
            <Link
              key={poem.slug}
              href={`/poetry/${poem.slug}`}
              className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-amber-700/40 transition-all flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded-lg bg-stone-900 text-amber-400"><BookOpen className="w-4 h-4" /></span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border ${MOOD_STYLE[poem.mood]}`}>{poem.mood}</span>
              </div>
              <div>
                <h2 className="font-serif italic text-lg text-stone-100" style={{ fontFamily: 'var(--font-devanagari)' }}>{poem.title}</h2>
                <p className="text-xs text-stone-400 font-serif italic mt-0.5">{poem.titleEnglish}</p>
              </div>
              <p
                className="text-sm text-stone-300 leading-loose line-clamp-3 whitespace-pre-line"
                style={{ fontFamily: 'var(--font-devanagari)' }}
              >
                {poem.content}
              </p>
              <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1 mt-1">
                Read full poem <Heart className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
