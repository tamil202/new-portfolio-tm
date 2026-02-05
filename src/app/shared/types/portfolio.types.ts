export interface Project {
  id: string;
  title: string;
  summary?: string;
  description: string;
  technologies: string[];
  role?: string;
  timeline?: string;
  impact?: string;
  metrics?: ProjectMetric[];
  links?: ProjectLink[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  featured: boolean;
  type: 'personal' | 'company';
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  kind?: 'github' | 'demo' | 'ovsx' | 'docs' | 'case-study';
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  current: boolean;
  highlights: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}
