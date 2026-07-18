import type { Metadata } from 'next';
import { ResumeView } from '@/components/resume-view';
import { getCertifications, getExperience, getGithubProjects, getProfile, getSkills } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'ATS-friendly resume — experience, skills, certifications, and public projects. View online or download as PDF.',
};

export default function ResumePage() {
  const profile = getProfile();
  const skills = getSkills();
  const experience = getExperience();
  const githubProjects = getGithubProjects();
  const certifications = getCertifications();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-14">
      <div className="flex flex-col gap-1 max-w-3xl mb-8 no-print">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-emerald-400">Resume</span>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight">View or download my resume</h1>
      </div>
      <ResumeView profile={profile} skills={skills} experience={experience} githubProjects={githubProjects} certifications={certifications} />
    </div>
  );
}
