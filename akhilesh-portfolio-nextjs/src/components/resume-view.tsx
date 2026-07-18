'use client';

import { ExternalLink, Mail, MapPin, Phone, Printer } from 'lucide-react';
import type { Certification, ExperienceEntry, GitHubProject, Profile, SkillCategory } from '@/lib/types';

interface ResumeViewProps {
  profile: Profile;
  skills: SkillCategory[];
  experience: ExperienceEntry[];
  githubProjects: GitHubProject[];
  certifications: Certification[];
}

export function ResumeView({ profile, skills, experience, githubProjects, certifications }: ResumeViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-zinc-900 border dark:border-zinc-800 rounded-xl no-print">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider">ATS-Friendly Resume</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">View below, or print / save directly to PDF.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
        >
          <Printer className="w-4 h-4" /> Download / Print Resume
        </button>
      </div>

      <div className="bg-white text-zinc-900 border border-slate-200 p-8 md:p-12 rounded-2xl flex flex-col gap-6 max-w-4xl mx-auto shadow-sm print:shadow-none print:border-none print:p-0" id="resume-doc">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-zinc-900 pb-4 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{profile.name}</h1>
            <p className="text-sm font-bold text-zinc-700 mt-1 uppercase tracking-wider">{profile.title}</p>
          </div>
          <div className="flex flex-col gap-1.5 text-xs text-zinc-600 font-medium">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{profile.email}</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{profile.phone}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{profile.location}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-extrabold uppercase tracking-widest border-b pb-1">Professional Profile</h2>
          <p className="text-xs text-zinc-700 leading-relaxed">{profile.aboutMe}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-extrabold uppercase tracking-widest border-b pb-1">Technical Skillsets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-1 text-xs">
            {skills.map((cat) => (
              <div key={cat.category} className="flex gap-1.5">
                <span className="font-bold text-zinc-800 shrink-0">{cat.category}:</span>
                <span className="text-zinc-600">{cat.items.map((s) => s.name).join(', ')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-extrabold uppercase tracking-widest border-b pb-1">Work History</h2>
          <div className="flex flex-col gap-5">
            {experience.map((exp) => (
              <div key={exp.id} className="flex flex-col gap-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="text-zinc-500 font-mono font-medium">{exp.period} | {exp.location}</span>
                </div>
                <div className="flex flex-col gap-1 pl-2 border-l border-zinc-300">
                  {exp.achievements.map((a, i) => (
                    <div key={i} className="text-xs text-zinc-700 leading-relaxed flex items-start gap-2">
                      <span className="text-zinc-400 shrink-0 mt-1">•</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-extrabold uppercase tracking-widest border-b pb-1">Selected GitHub Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-1">
            {githubProjects.slice(0, 8).map((project) => (
              <div key={project.name} className="text-xs break-inside-avoid">
                <a href={project.url} target="_blank" rel="noreferrer" className="font-bold text-zinc-900 underline underline-offset-2">
                  {project.title} <ExternalLink className="inline w-3 h-3" />
                </a>
                <p className="text-[11px] text-zinc-600 leading-relaxed mt-0.5">{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-extrabold uppercase tracking-widest border-b pb-1">Certifications</h2>
            <div className="flex flex-col gap-1.5 text-xs text-zinc-700">
              {certifications.slice(0, 5).map((cert, i) => (
                <div key={i} className="flex justify-between gap-2">
                  <a href={cert.link} target="_blank" rel="noreferrer" className="underline underline-offset-2">{cert.name}</a>
                  <span className="text-zinc-500 font-medium shrink-0 ml-1">({cert.date})</span>
                </div>
              ))}
              <a href={profile.credly} target="_blank" rel="noreferrer" className="font-bold underline underline-offset-2 mt-1">View all verified badges on Credly</a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-extrabold uppercase tracking-widest border-b pb-1">Links</h2>
            <div className="flex flex-col gap-1.5 text-xs text-zinc-700">
              <span><span className="font-bold">LinkedIn:</span> <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline">{profile.linkedin.replace('https://', '')}</a></span>
              <span><span className="font-bold">GitHub:</span> <a href={profile.github} target="_blank" rel="noreferrer" className="underline">{profile.github.replace('https://', '')}</a></span>
              <span><span className="font-bold">Google Cloud Skills:</span> <a href={profile.googleSkills} target="_blank" rel="noreferrer" className="underline">View profile</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
