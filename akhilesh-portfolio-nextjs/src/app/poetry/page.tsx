import type { Metadata } from 'next';
import { PoetryList } from '@/components/poetry-list';
import { InstagramIcon } from '@/components/brand-icons';
import { getAllPoetry, getProfile } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Shayari & Poetry',
  description: 'Original Hindi shayari and poetry — love, life, motivation, heartbreak, friendship, and hope.',
};

export default function PoetryPage() {
  const poems = getAllPoetry();
  const profile = getProfile();

  return (
    <div className="poetry-scope min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500">The Code &amp; The Couplet</span>
            <h1 className="text-2xl md:text-4xl font-serif italic tracking-tight text-stone-50">Shayari &amp; Poetry</h1>
            <p className="text-sm text-stone-400 leading-relaxed">
              Hindi shayari and spoken-word poetry — a different side of the same engineer. Featured verses below, new ones added through the admin panel.
            </p>
          </div>
          <a
            href={profile.poetryInstagram}
            target="_blank"
            rel="noreferrer"
            className="w-fit shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-fuchsia-700 via-rose-600 to-amber-500 text-white text-xs font-bold"
          >
            <InstagramIcon className="w-4 h-4" />
            @theakhishayar on Instagram
          </a>
        </div>

        <PoetryList poems={poems} />
      </div>
    </div>
  );
}
