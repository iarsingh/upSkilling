import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { inter, jetbrainsMono, lora, notoSerifDevanagari, spaceGrotesk } from '@/lib/fonts';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ScrollProgressBar } from '@/components/scroll-progress-bar';
import { getProfile } from '@/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akhileshranjan.dev';

export function generateMetadata(): Metadata {
  const profile = getProfile();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${profile.name} — ${profile.title}`,
      template: `%s — ${profile.name}`,
    },
    description: profile.aboutMe,
    keywords: ['Platform Engineer', 'DevOps Engineer', 'MLOps Engineer', 'Kubernetes', 'GCP', 'Terraform', profile.name],
    authors: [{ name: profile.name, url: SITE_URL }],
    openGraph: {
      type: 'website',
      title: `${profile.name} — ${profile.title}`,
      description: profile.aboutMe,
      url: SITE_URL,
      siteName: profile.name,
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} — ${profile.title}`,
      description: profile.aboutMe,
    },
    alternates: {
      types: { 'application/rss+xml': `${SITE_URL}/rss.xml` },
    },
  };
}

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.classList.add(theme);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = getProfile();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    url: SITE_URL,
    sameAs: [profile.github, profile.linkedin, profile.instagram, profile.youtube, profile.credly, profile.googleSkills],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${lora.variable} ${notoSerifDevanagari.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <ScrollProgressBar />
          <SiteHeader profile={profile} />
          <main className="flex-1">{children}</main>
          <SiteFooter profile={profile} />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
