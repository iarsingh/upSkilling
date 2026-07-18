export interface Skill {
  name: string;
  level: number; // 0 to 100
  icon?: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface TimelineExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  skills: string[];
  impactMetrics: { label: string; value: string }[];
}

export interface ArchitectureDiagram {
  id: string;
  title: string;
  description: string;
  nodes: { id: string; label: string; type: 'client' | 'network' | 'compute' | 'database' | 'storage' | 'security' | 'ml' }[];
  edges: { from: string; to: string; label?: string }[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  problem: string;
  approach: string;
  challenges: string;
  solution: string;
  results: string[];
  tools: string[];
  githubUrl?: string;
  liveUrl?: string;
  architectureId?: string;
  screenshotPrompt?: string;
  imageName?: string;
}

export interface GitHubProject {
  name: string;
  title: string;
  description: string;
  url: string;
  language: string;
  technologies: string[];
}

export interface Poetry {
  id: string;
  title: string;
  text: string; // Lines of Shayari
  translation?: string; // English meaning
  mood: 'Romantic' | 'Philosophical' | 'Nostalgic' | 'Inspirational';
  videoUrl?: string; // YouTube/Instagram link if any
}

export interface ResumeData {
  name: string;
  title: string;
  tagline: string;
  experienceYears: number;
  aboutMe: string;
  aboutJourney: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  linkedinRecommendations: string;
  instagram: string;
  poetryInstagram: string;
  youtube: string;
  topmate: string;
  buymeacoffee: string;
  credly: string;
  googleSkills: string;
  architectureCapabilities: {
    title: string;
    description: string;
  }[];
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
  skillCategories: SkillCategory[];
  timeline: TimelineExperience[];
  projects: Project[];
  githubProjects: GitHubProject[];
  architectures: ArchitectureDiagram[];
  poetryList: Poetry[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    link?: string;
    imageUrl?: string;
    featured?: boolean;
  }[];
}
