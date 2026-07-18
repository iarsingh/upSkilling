import React from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, MapPin, Printer, ExternalLink } from 'lucide-react';

interface ResumeViewProps {
  data: ResumeData;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ data }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6" id="resume-page-view">
      {/* Printable Control panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-zinc-900 border dark:border-zinc-800 rounded-xl no-print">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider">ATS-Friendly Resume Sheet</h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            This sheet is formatted for applicant tracking crawlers. Print or save directly to a PDF.
          </p>
        </div>

        <button
          onClick={handlePrint}
          id="trigger-print-btn"
          className="px-4 py-2 bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-102 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Actual Printable Document Container */}
      <div 
        className="bg-white text-zinc-900 border border-slate-200 p-8 md:p-12 rounded-2xl flex flex-col gap-6 font-sans max-w-4xl mx-auto shadow-sm print:shadow-none print:border-none print:p-0"
        id="resume-printable-doc"
      >
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-zinc-900 pb-4 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">{data.name}</h1>
            <p className="text-sm font-bold text-zinc-700 mt-1 uppercase tracking-wider">{data.title}</p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-1.5 text-xs text-zinc-600 font-medium">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {data.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {data.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {data.location}
            </span>
          </div>
        </div>

        {/* Short summary block */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 border-b pb-1">
            Professional Profile
          </h3>
          <p className="text-xs text-zinc-700 leading-relaxed">
            {data.aboutMe}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 border-b pb-1">
            Architecture Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-1">
            {data.architectureCapabilities.map((capability) => (
              <div key={capability.title} className="text-xs">
                <span className="font-bold text-zinc-800">{capability.title}: </span>
                <span className="text-zinc-600">{capability.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills grid summary */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 border-b pb-1">
            Technical Skillsets
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-1 text-xs">
            {data.skillCategories.map((cat) => (
              <div key={cat.category} className="flex gap-1.5">
                <span className="font-bold text-zinc-800 shrink-0">{cat.category}:</span>
                <span className="text-zinc-600">
                  {cat.items.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 border-b pb-1">
            Work History
          </h3>

          <div className="flex flex-col gap-5">
            {data.timeline.map((exp) => (
              <div key={exp.id} className="flex flex-col gap-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold text-zinc-850">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="text-zinc-500 font-mono font-medium">{exp.period} | {exp.location}</span>
                </div>
                
                <p className="text-[11px] text-zinc-600 italic">"{exp.description}"</p>

                <div className="flex flex-col gap-1 pl-2 border-l border-zinc-300">
                  {exp.bullets.map((bullet, i) => (
                    <div key={i} className="text-xs text-zinc-700 leading-relaxed flex items-start gap-2">
                      <span className="text-zinc-400 shrink-0 mt-1">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Public engineering work */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 border-b pb-1">
            Selected GitHub Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-1">
            {data.githubProjects.slice(0, 8).map((project) => (
              <div key={project.name} className="text-xs break-inside-avoid">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-zinc-900 underline underline-offset-2"
                >
                  {project.title} <ExternalLink className="inline w-3 h-3" />
                </a>
                <p className="text-[11px] text-zinc-600 leading-relaxed mt-0.5">{project.description}</p>
                <span className="text-[10px] text-zinc-500 font-mono break-all">{project.url.replace('https://', '')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications and Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 border-b pb-1">
              Certifications
            </h3>
            <div className="flex flex-col gap-1.5 text-xs text-zinc-700">
              {data.certifications.slice(0, 5).map((cert, i) => (
                <div key={i} className="flex justify-between gap-2">
                  <a href={cert.link} target="_blank" rel="noreferrer" className="underline underline-offset-2">{cert.name}</a>
                  <span className="text-zinc-500 font-medium shrink-0 ml-1">({cert.date})</span>
                </div>
              ))}
              <a href={data.credly} target="_blank" rel="noreferrer" className="font-bold underline underline-offset-2 mt-1">View all verified badges on Credly</a>
              <a href={data.googleSkills} target="_blank" rel="noreferrer" className="font-bold underline underline-offset-2">View Google Cloud Skills profile</a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 border-b pb-1">
              Social Links & Telemetries
            </h3>
            <div className="flex flex-col gap-1.5 text-xs text-zinc-700">
              <div className="flex justify-between gap-3">
                <span className="font-bold">LinkedIn:</span>
                <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 font-medium underline">linkedin.com/in/iamarsingh</a>
              </div>
              <div className="flex justify-between gap-3">
                <span className="font-bold">Recommendations:</span>
                <a href={data.linkedinRecommendations} target="_blank" rel="noreferrer" className="text-zinc-500 font-medium underline">View on LinkedIn</a>
              </div>
              <div className="flex justify-between gap-3">
                <span className="font-bold">GitHub Codebase:</span>
                <a href={data.github} target="_blank" rel="noreferrer" className="text-zinc-500 font-medium underline">github.com/iarsingh</a>
              </div>
              <div className="flex justify-between gap-3">
                <span className="font-bold">Mentorship:</span>
                <a href={data.topmate} target="_blank" rel="noreferrer" className="text-zinc-500 font-medium underline">topmate.io/iamarsingh</a>
              </div>
              <div className="flex justify-between gap-3">
                <span className="font-bold">Verified Credentials:</span>
                <a href={data.credly} target="_blank" rel="noreferrer" className="text-zinc-500 font-medium underline">Credly profile</a>
              </div>
              <div className="flex justify-between gap-3">
                <span className="font-bold">Google Cloud Learning:</span>
                <a href={data.googleSkills} target="_blank" rel="noreferrer" className="text-zinc-500 font-medium underline">Skills profile</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
