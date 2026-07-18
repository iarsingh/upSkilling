'use client';

import { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from './brand-icons';
import type { Profile } from '@/lib/types';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

export function ContactSection({ profile }: { profile: Profile }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (res.ok && data.sent) {
        setStatus('sent');
      } else {
        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        setStatus('mailto');
      }
    } catch {
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
    }

    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setStatus('idle');
    }, 5000);
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 md:px-6 py-14 border-t border-slate-100 dark:border-zinc-900">
      <div className="flex flex-col gap-1 max-w-3xl mb-8">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">Contact</span>
        <h2 className="text-xl md:text-2xl font-heading font-bold tracking-tight">Let&rsquo;s talk about your platform, team, or role</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 p-6 bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 rounded-2xl">
          {status === 'sent' || status === 'mailto' ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
              <h3 className="text-sm font-bold">{status === 'sent' ? 'Message sent!' : 'Opening your email client…'}</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-xs">
                {status === 'sent'
                  ? `Thanks — I'll get back to you at ${email}.`
                  : `A message to ${profile.email} has been pre-filled. Hit send in your mail app to deliver it.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-zinc-500">Your Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 border dark:border-zinc-800 rounded-lg p-2.5 text-xs bg-slate-50/50 dark:bg-zinc-950/30 outline-none focus:border-indigo-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-zinc-500">Your Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 border dark:border-zinc-800 rounded-lg p-2.5 text-xs bg-slate-50/50 dark:bg-zinc-950/30 outline-none focus:border-indigo-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-zinc-500">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mt-1 border dark:border-zinc-800 rounded-lg p-2.5 text-xs bg-slate-50/50 dark:bg-zinc-950/30 outline-none focus:border-indigo-500"
                  placeholder="Tell me about the role, project, or question…"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-zinc-950 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                <Send className="w-3.5 h-3.5" />
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-2 flex flex-col gap-3">
          <a href={`mailto:${profile.email}`} className="p-4 rounded-xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 flex items-center gap-3 hover:border-indigo-200 dark:hover:border-emerald-900">
            <Mail className="w-4 h-4 text-indigo-600 dark:text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold truncate">{profile.email}</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 flex items-center gap-3 hover:border-indigo-200 dark:hover:border-emerald-900">
            <LinkedinIcon className="w-4 h-4 text-indigo-600 dark:text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">LinkedIn</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 flex items-center gap-3 hover:border-indigo-200 dark:hover:border-emerald-900">
            <GithubIcon className="w-4 h-4 text-indigo-600 dark:text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">GitHub</span>
          </a>
          <a href={profile.instagram} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 flex items-center gap-3 hover:border-indigo-200 dark:hover:border-emerald-900">
            <InstagramIcon className="w-4 h-4 text-indigo-600 dark:text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">Instagram</span>
          </a>
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-indigo-600 dark:text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">{profile.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
