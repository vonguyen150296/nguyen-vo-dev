// Types for the portfolio website

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'remote' | 'onsite' | 'hybrid';
  mission?: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Value {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Translation {
  // Navigation
  nav: {
    home: string;
    experience: string;
    skills: string;
    mindset: string;
    contact: string;
  };
  // Hero
  hero: {
    greeting: string;
    headline: string;
    subheadline: string;
    ctaProjects: string;
    ctaCV: string;
    ctaCall: string;
  };
  // Video Section
  video: {
    title: string;
    placeholder: string;
  };
  // Experience
  experience: {
    title: string;
    subtitle: string;
    items: Experience[];
  };
  // Skills
  skills: {
    title: string;
    subtitle: string;
    categories: SkillCategory[];
  };
  // Mindset
  mindset: {
    title: string;
    subtitle: string;
    values: Value[];
    personalityTitle: string;
    personality: string[];
  };
  // Contact
  contact: {
    title: string;
    subtitle: string;
    availability: string;
    email: string;
    linkedin: string;
    github: string;
  };
  // Footer
  footer: {
    copyright: string;
  };
  // Chatbot
  chatbot: {
    title: string;
    placeholder: string;
    send: string;
    greeting: string;
  };
}

export type Locale = 'en' | 'de' | 'fr';

export type Theme = 'light' | 'dark';
