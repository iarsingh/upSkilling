import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { getProfile, getExperience, getProjects, getCertifications } from "@/lib/data";
import { logout } from "@/app/actions/auth";
import {
  updateProfile,
  createProject,
  updateProject,
  deleteProject,
  createExperience,
  updateExperience,
  deleteExperience,
  createSkill,
  deleteSkill,
  createCertification,
  deleteCertification,
} from "@/app/actions/content";

export const metadata = { title: "Admin | Akhilesh Ranjan Singh" };

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors";
const buttonClass = "rounded-lg bg-accent text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity";
const dangerButtonClass = "rounded-lg border border-red-500/50 text-red-400 px-3 py-1.5 text-xs font-medium hover:bg-red-500/10 transition-colors";

export default async function AdminDashboard() {
  await verifySession();

  const [profile, experience, skills, projects, certifications] = await Promise.all([
    getProfile(),
    getExperience(),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    getProjects(),
    getCertifications(),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 space-y-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
        <form action={logout}>
          <button type="submit" className="text-sm text-muted hover:text-accent transition-colors">
            Log out
          </button>
        </form>
      </div>

      {/* Profile */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <form action={updateProfile} className="space-y-3 max-w-xl">
          <input name="fullName" defaultValue={profile?.fullName} placeholder="Full name" className={inputClass} required />
          <input name="headline" defaultValue={profile?.headline} placeholder="Headline" className={inputClass} required />
          <textarea name="summary" defaultValue={profile?.summary} placeholder="Summary" rows={4} className={inputClass} required />
          <div className="grid grid-cols-2 gap-3">
            <input name="email" defaultValue={profile?.email} placeholder="Email" className={inputClass} required />
            <input name="phone" defaultValue={profile?.phone} placeholder="Phone" className={inputClass} required />
          </div>
          <input name="location" defaultValue={profile?.location} placeholder="Location" className={inputClass} required />
          <div className="grid grid-cols-2 gap-3">
            <input name="linkedin" defaultValue={profile?.linkedin} placeholder="LinkedIn URL" className={inputClass} required />
            <input name="github" defaultValue={profile?.github} placeholder="GitHub URL" className={inputClass} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input name="kaggle" defaultValue={profile?.kaggle ?? ""} placeholder="Kaggle URL (optional)" className={inputClass} />
            <input name="hackerrank" defaultValue={profile?.hackerrank ?? ""} placeholder="HackerRank URL (optional)" className={inputClass} />
          </div>
          <input name="credly" defaultValue={profile?.credly ?? ""} placeholder="Credly URL (optional)" className={inputClass} />
          <button type="submit" className={buttonClass}>
            Save Profile
          </button>
        </form>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <div className="space-y-6 mb-8">
          {projects.map((p) => (
            <form
              key={p.id}
              action={updateProject.bind(null, p.id)}
              className="space-y-2 border border-border rounded-lg p-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <input name="title" defaultValue={p.title} placeholder="Title" className={inputClass} required />
                <input name="slug" defaultValue={p.slug} placeholder="Slug" className={inputClass} required />
              </div>
              <input name="summary" defaultValue={p.summary} placeholder="Summary" className={inputClass} required />
              <textarea name="description" defaultValue={p.description} placeholder="Description" rows={3} className={inputClass} required />
              <textarea name="tags" defaultValue={p.tags.join("\n")} placeholder="Tags (one per line)" rows={2} className={inputClass} />
              <div className="grid grid-cols-2 gap-3">
                <input name="repoUrl" defaultValue={p.repoUrl ?? ""} placeholder="Repo URL" className={inputClass} />
                <input name="liveUrl" defaultValue={p.liveUrl ?? ""} placeholder="Live URL" className={inputClass} />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="featured" defaultChecked={p.featured} />
                  Featured
                </label>
                <input name="order" type="number" defaultValue={p.order} className={`${inputClass} w-24`} />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" className={buttonClass}>
                  Save
                </button>
                <button type="submit" formAction={deleteProject.bind(null, p.id)} className={dangerButtonClass}>
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>

        <details className="border border-border rounded-lg p-4">
          <summary className="cursor-pointer text-sm font-medium">Add new project</summary>
          <form action={createProject} className="space-y-2 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <input name="title" placeholder="Title" className={inputClass} required />
              <input name="slug" placeholder="Slug" className={inputClass} required />
            </div>
            <input name="summary" placeholder="Summary" className={inputClass} required />
            <textarea name="description" placeholder="Description" rows={3} className={inputClass} required />
            <textarea name="tags" placeholder="Tags (one per line)" rows={2} className={inputClass} />
            <div className="grid grid-cols-2 gap-3">
              <input name="repoUrl" placeholder="Repo URL" className={inputClass} />
              <input name="liveUrl" placeholder="Live URL" className={inputClass} />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featured" />
                Featured
              </label>
              <input name="order" type="number" defaultValue={0} className={`${inputClass} w-24`} />
            </div>
            <button type="submit" className={buttonClass}>
              Add Project
            </button>
          </form>
        </details>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Experience</h2>
        <div className="space-y-6 mb-8">
          {experience.map((e) => (
            <form
              key={e.id}
              action={updateExperience.bind(null, e.id)}
              className="space-y-2 border border-border rounded-lg p-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <input name="title" defaultValue={e.title} placeholder="Title" className={inputClass} required />
                <input name="company" defaultValue={e.company} placeholder="Company" className={inputClass} required />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input name="location" defaultValue={e.location} placeholder="Location" className={inputClass} required />
                <input name="startDate" defaultValue={e.startDate} placeholder="Start (MM/YYYY)" className={inputClass} required />
                <input name="endDate" defaultValue={e.endDate} placeholder="End (MM/YYYY or Present)" className={inputClass} required />
              </div>
              <textarea
                name="highlights"
                defaultValue={e.highlights.join("\n")}
                placeholder="Highlights (one per line)"
                rows={4}
                className={inputClass}
              />
              <input name="order" type="number" defaultValue={e.order} className={`${inputClass} w-24`} />
              <div className="flex gap-2 pt-1">
                <button type="submit" className={buttonClass}>
                  Save
                </button>
                <button type="submit" formAction={deleteExperience.bind(null, e.id)} className={dangerButtonClass}>
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>

        <details className="border border-border rounded-lg p-4">
          <summary className="cursor-pointer text-sm font-medium">Add new role</summary>
          <form action={createExperience} className="space-y-2 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <input name="title" placeholder="Title" className={inputClass} required />
              <input name="company" placeholder="Company" className={inputClass} required />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <input name="location" placeholder="Location" className={inputClass} required />
              <input name="startDate" placeholder="Start (MM/YYYY)" className={inputClass} required />
              <input name="endDate" placeholder="End (MM/YYYY or Present)" className={inputClass} required />
            </div>
            <textarea name="highlights" placeholder="Highlights (one per line)" rows={4} className={inputClass} />
            <input name="order" type="number" defaultValue={0} className={`${inputClass} w-24`} />
            <button type="submit" className={buttonClass}>
              Add Role
            </button>
          </form>
        </details>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((s) => (
            <form
              key={s.id}
              action={deleteSkill.bind(null, s.id)}
              className="text-xs pl-2.5 pr-1 py-1 rounded-full border border-border flex items-center gap-2"
              title={s.category}
            >
              {s.name}
              <button type="submit" className="text-muted hover:text-red-400" aria-label={`Delete ${s.name}`}>
                &times;
              </button>
            </form>
          ))}
        </div>
        <form action={createSkill} className="flex gap-3 items-end flex-wrap">
          <input name="name" placeholder="Skill name" className={`${inputClass} w-48`} required />
          <input name="category" placeholder="Category" className={`${inputClass} w-48`} required />
          <input name="order" type="number" defaultValue={0} className={`${inputClass} w-24`} />
          <button type="submit" className={buttonClass}>
            Add Skill
          </button>
        </form>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Certifications</h2>
        <div className="space-y-2 mb-6">
          {certifications.map((c) => (
            <form key={c.id} action={deleteCertification.bind(null, c.id)} className="flex items-center justify-between text-sm border-b border-border pb-2">
              <span>
                {c.name} &mdash; {c.issuer}
                {c.year ? ` (${c.year})` : ""}
              </span>
              <button type="submit" className={dangerButtonClass}>
                Delete
              </button>
            </form>
          ))}
        </div>
        <form action={createCertification} className="flex gap-3 items-end flex-wrap">
          <input name="name" placeholder="Certification name" className={`${inputClass} w-56`} required />
          <input name="issuer" placeholder="Issuer" className={`${inputClass} w-40`} required />
          <input name="year" placeholder="Year (optional)" className={`${inputClass} w-28`} />
          <input name="url" placeholder="URL (optional)" className={`${inputClass} w-48`} />
          <button type="submit" className={buttonClass}>
            Add Certification
          </button>
        </form>
      </section>
    </div>
  );
}
