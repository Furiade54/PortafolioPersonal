export interface Skill {
  name: string;
  level: 'Avanzado' | 'Intermedio' | 'Iniciando';
  iconName: string; // Used to look up Lucide icons dynamically
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
  color: string; // Tailwind accent base name, e.g., 'cyan', 'purple', 'blue'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'Frontend' | 'Backend' | 'Fullstack' | 'DevOps';
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  apiMockEndpoint?: string;
  apiMockResponse?: Record<string, unknown>;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export interface DeveloperProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  aboutMe: string;
  shortSummary: string;
}
