export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  live_url?: string;
  github_url?: string;
  technologies: string[];
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  skills: string[];
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}