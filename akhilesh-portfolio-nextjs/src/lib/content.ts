import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type {
  BlogFrontmatter,
  Certification,
  ExperienceEntry,
  GalleryImage,
  GitHubProject,
  PerformanceVideo,
  PoetryFrontmatter,
  Profile,
  ProjectEntry,
  SkillCategory,
  Stat,
  Testimonial,
} from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readJSON<T>(filename: string): T {
  const filePath = path.join(CONTENT_DIR, filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

export function getProfile(): Profile {
  return readJSON<Profile>('profile.json');
}

export function getStats(): Stat[] {
  return readJSON<Stat[]>('stats.json');
}

export function getSkills(): SkillCategory[] {
  return readJSON<SkillCategory[]>('skills.json');
}

export function getExperience(): ExperienceEntry[] {
  return readJSON<ExperienceEntry[]>('experience.json');
}

export function getProjects(): ProjectEntry[] {
  return readJSON<ProjectEntry[]>('projects.json');
}

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getGithubProjects(): GitHubProject[] {
  return readJSON<GitHubProject[]>('github-projects.json');
}

export function getCertifications(): Certification[] {
  return readJSON<Certification[]>('certifications.json');
}

export function getTestimonials(): Testimonial[] {
  return readJSON<Testimonial[]>('testimonials.json');
}

export function getGallery(): GalleryImage[] {
  return readJSON<GalleryImage[]>('gallery.json');
}

export function getVideos(): PerformanceVideo[] {
  return readJSON<PerformanceVideo[]>('videos.json');
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

export function getAllBlogPosts(includeDrafts = false): BlogPost[] {
  const dir = path.join(CONTENT_DIR, 'blog');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug,
      content,
      readingTime: readingTime(content).text,
      ...(data as BlogFrontmatter),
    };
  });

  return posts
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(CONTENT_DIR, 'blog', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    content,
    readingTime: readingTime(content).text,
    ...(data as BlogFrontmatter),
  };
}

export interface PoetryEntry extends PoetryFrontmatter {
  slug: string;
  content: string;
}

export function getAllPoetry(): PoetryEntry[] {
  const dir = path.join(CONTENT_DIR, 'poetry');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const poems = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug,
      content: content.trim(),
      ...(data as PoetryFrontmatter),
    };
  });

  return poems.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPoetryBySlug(slug: string): PoetryEntry | undefined {
  const filePath = path.join(CONTENT_DIR, 'poetry', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    content: content.trim(),
    ...(data as PoetryFrontmatter),
  };
}
