export interface Profile {
  name: string;
  title: string;
  tagline: string;
  taglines: string[];
  experienceYears: number;
  aboutMe: string;
  aboutJourney: string;
  currentCompany: string;
  email: string;
  phone: string;
  location: string;
  photoUrl: string | null;
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
}

export interface Stat {
  label: string;
  value: string;
  subtext: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: SkillItem[];
}

export interface ImpactMetric {
  label: string;
  value: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  impactMetrics: ImpactMetric[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'client' | 'network' | 'compute' | 'database' | 'storage' | 'security' | 'ml';
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ArchitectureDiagram {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface ProjectEntry {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  problem: string;
  solution: string;
  approach: string;
  challenges: string;
  results: string[];
  technologies: string[];
  businessImpact: string[];
  githubUrl?: string;
  architecture?: ArchitectureDiagram;
  imageUrl?: string | null;
}

export interface GitHubProject {
  name: string;
  title: string;
  description: string;
  url: string;
  language: string;
  technologies: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  relationship: string;
  source: 'colleague' | 'manager' | 'client' | 'mentee' | 'topmate';
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'event' | 'meetup' | 'speaking' | 'travel' | 'performance';
  caption?: string;
}

export interface PerformanceVideo {
  id: string;
  title: string;
  platform: 'instagram' | 'youtube';
  embedUrl: string;
  category: 'open-mic' | 'poetry' | 'reel';
}

export type PoetryMood = 'Love' | 'Life' | 'Motivation' | 'Heartbreak' | 'Friendship' | 'Hope';

export interface PoetryFrontmatter {
  title: string;
  titleEnglish: string;
  mood: PoetryMood;
  date: string;
  translation?: string;
  featured?: boolean;
}

export type BlogCategory =
  | 'DevOps'
  | 'Terraform'
  | 'Kubernetes'
  | 'MLOps'
  | 'Cloud'
  | 'AI Infrastructure'
  | 'Monitoring';

export interface BlogFrontmatter {
  title: string;
  category: BlogCategory;
  excerpt: string;
  date: string;
  tags: string[];
  draft?: boolean;
}
