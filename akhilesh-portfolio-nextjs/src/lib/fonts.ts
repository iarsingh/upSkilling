import { Inter, JetBrains_Mono, Lora, Noto_Serif_Devanagari, Space_Grotesk } from 'next/font/google';

export const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const lora = Lora({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

export const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: '--font-devanagari',
  subsets: ['devanagari'],
  display: 'swap',
});
