import React, { useState } from 'react';
import { Poetry } from '../types';
import { Book, Heart, Sparkles, Languages, Instagram, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CreativeShayariProps {
  poetryList: Poetry[];
  instagramUrl: string;
}

export const CreativeShayari: React.FC<CreativeShayariProps> = ({ poetryList, instagramUrl }) => {
  const [activePoetryId, setActivePoetryId] = useState<string | null>(poetryList[0]?.id || null);
  const [showEnglish, setShowEnglish] = useState(false);
  const [likedList, setLikedList] = useState<Set<string>>(new Set());

  const activePo = poetryList.find(p => p.id === activePoetryId);

  const toggleLike = (id: string) => {
    const updated = new Set(likedList);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setLikedList(updated);
  };

  const getMoodBadgeColor = (mood: string) => {
    switch (mood) {
      case 'Philosophical': return 'bg-purple-50 text-purple-700 dark:bg-purple-950/20 dark:text-purple-400 border border-purple-200/50';
      case 'Inspirational': return 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-200/50';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200/50';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="creative-shayari-section">
      {/* Sidebar: Poet Identity, Quote of the Week, and Playlist */}
      <div className="md:col-span-1 flex flex-col gap-5">
        {/* Quote of the Week */}
        <div className="p-5 rounded-2xl bg-[#fdfaf5] dark:bg-zinc-900 border border-amber-100/50 dark:border-zinc-800 relative overflow-hidden flex flex-col gap-2">
          <span className="absolute -right-6 -bottom-6 text-amber-500/5 text-7xl font-serif pointer-events-none select-none">“</span>
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-amber-700 dark:text-amber-400 tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quote of the Week</span>
          </div>
          <p className="text-xs font-serif italic text-stone-700 dark:text-zinc-300 leading-relaxed pt-0.5">
            "कमांड लाइन के कोट्स और पन्नों के शेर... दोनों ही दिल से निकलें, तभी असरदार होते हैं।"
          </p>
          <p className="text-[10px] opacity-60 self-end">— Akhilesh Ranjan</p>
        </div>

        {/* Poetry Catalogue list */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-1 pl-1">
            Poetry Catalogue
          </span>
          {poetryList.map((po) => {
            const isActive = activePoetryId === po.id;
            return (
              <button
                key={po.id}
                id={`poetry-tab-${po.id}`}
                onClick={() => {
                  setActivePoetryId(po.id);
                  setShowEnglish(false);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                  isActive
                    ? 'border-amber-500 bg-[#fbf9f4] dark:border-amber-600 dark:bg-zinc-900 text-stone-900 dark:text-zinc-100'
                    : 'border-slate-100 bg-white dark:bg-zinc-900/40 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-200 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-stone-50 dark:bg-zinc-950 text-amber-700 dark:text-amber-400">
                    <Book className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold truncate">{po.title}</span>
                </div>
                <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${getMoodBadgeColor(po.mood)}`}>
                  {po.mood}
                </span>
              </button>
            );
          })}
        </div>

        {/* Public poetry profile */}
        <div className="p-5 bg-gradient-to-br from-fuchsia-700 via-rose-600 to-amber-500 text-white rounded-2xl relative overflow-hidden flex flex-col gap-4 border border-rose-500/30 no-print">
          <Instagram className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
          <div className="relative z-10">
            <span className="text-[9px] uppercase font-bold tracking-widest text-white/75">Poetry on Instagram</span>
            <h5 className="text-sm font-extrabold mt-1">@theakhishayar</h5>
            <p className="text-[10px] text-white/80 mt-1 leading-relaxed">Hindi poetry, shayari, reels, and spoken-word work by Akhil Ranjan.</p>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 w-fit px-3 py-2 bg-white text-rose-700 rounded-lg text-[10px] font-extrabold flex items-center gap-1.5 hover:bg-rose-50 transition-colors"
            title="Open the Akhi Shayar poetry profile"
            referrerPolicy="no-referrer"
          >
            View original poetry & reels <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Workspace: Aesthetic reader block */}
      <div className="md:col-span-2">
        <AnimatePresence mode="wait">
          {activePo && (
            <motion.div
              key={activePo.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="bg-[#fcfbf9] dark:bg-zinc-900/60 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative"
              id={`poetry-content-${activePo.id}`}
            >
              {/* Aesthetic flower/verse frame details */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-stone-300 dark:border-zinc-800 opacity-60 pointer-events-none" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-stone-300 dark:border-zinc-800 opacity-60 pointer-events-none" />

              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-base font-extrabold tracking-wide font-serif italic text-stone-800 dark:text-zinc-100">
                    {activePo.title}
                  </h3>
                  <span className={`inline-flex px-2 py-0.5 text-[8px] font-bold uppercase rounded-full tracking-wider mt-1.5 ${getMoodBadgeColor(activePo.mood)}`}>
                    {activePo.mood} Mood
                  </span>
                </div>

                <div className="flex items-center gap-2 no-print">
                  {activePo.translation && (
                    <button
                      id="poetry-lang-toggle"
                      onClick={() => setShowEnglish(!showEnglish)}
                      className="p-1.5 rounded-lg border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-stone-50 text-stone-700 dark:text-zinc-300 transition-colors flex items-center gap-1.5 text-[10px] font-bold"
                      title="Translate between Hindi verse and English explanation"
                    >
                      <Languages className="w-3.5 h-3.5" />
                      <span>{showEnglish ? 'Show Hindi Original' : 'Explain English meaning'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => toggleLike(activePo.id)}
                    className={`p-2 rounded-full border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors ${
                      likedList.has(activePo.id) ? 'text-red-500 border-red-200' : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedList.has(activePo.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Main Text Panel - styled elegantly like a book page */}
              <div className="flex flex-col items-center justify-center text-center py-6 border-y border-dashed border-stone-200 dark:border-zinc-800 min-h-[180px]">
                <AnimatePresence mode="wait">
                  {showEnglish ? (
                    <motion.div
                      key="english-trans"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-stone-600 dark:text-zinc-400 text-xs italic leading-relaxed max-w-md font-sans"
                    >
                      {activePo.translation}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hindi-orig"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-stone-800 dark:text-zinc-200 text-sm font-serif leading-loose whitespace-pre tracking-wide italic"
                    >
                      {activePo.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer card brand */}
              <div className="flex items-center justify-between opacity-60 text-[10px] font-serif italic">
                <span>कलम: अखिलेश रंजन</span>
                <span>सर्जक की अभिव्यक्ति</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
