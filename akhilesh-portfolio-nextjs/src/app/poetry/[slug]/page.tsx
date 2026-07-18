import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PoetryReader } from '@/components/poetry-reader';
import { getAllPoetry, getPoetryBySlug } from '@/lib/content';

export function generateStaticParams() {
  return getAllPoetry().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const poem = getPoetryBySlug(slug);
  if (!poem) return {};
  return { title: `${poem.title} (${poem.titleEnglish})`, description: poem.translation ?? poem.titleEnglish };
}

export default async function PoetryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = getPoetryBySlug(slug);
  if (!poem) notFound();

  return (
    <div className="poetry-scope min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 flex flex-col gap-8">
        <Link href="/poetry" className="w-fit text-xs font-bold text-stone-400 flex items-center gap-1.5 hover:text-amber-500">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to poetry
        </Link>
        <PoetryReader poem={poem} />
      </div>
    </div>
  );
}
