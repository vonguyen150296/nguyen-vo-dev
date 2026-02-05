/**
 * Site Configuration
 * Centralized configuration for all site-wide settings
 */

export const siteConfig = {
  // Personal Information
  personal: {
    name: 'Nguyen Vo',
    title: 'Frontend Architect & UX Engineer',
    location: 'Germany',
  },

  // Contact Information
  contact: {
    email: 'nguyen.vo@outlook.com',
    linkedin: 'https://www.linkedin.com/in/nguyen-vo-150296/',
    github: 'https://github.com/vonguyen150296',
  },

  // CV/Resume
  cv: {
    downloadUrl: '/cv/nguyen-vo-cv.pdf', // Place your CV in public/cv/ folder
    filename: 'Nguyen_Vo_CV.pdf',
  },

  // Site Metadata
  metadata: {
    title: 'Nguyen Vo | Frontend Architect & UX Engineer',
    description:
      'Frontend Architect specializing in performance optimization, design systems, and creating seamless user experiences for global teams.',
    keywords: [
      'Frontend Developer',
      'React',
      'TypeScript',
      'UX Engineer',
      'Design Systems',
      'Web Development',
    ],
    url: 'https://nguyen-vo.dev', // Update with your actual domain
    image: '/og-image.png', // Open Graph image
  },

  // Social Links (for sharing, SEO)
  social: {
    twitter: '', // Add if you have Twitter/X
    youtube: '', // Add if you have YouTube
  },

  // Copyright
  copyright: {
    year: 2026,
    holder: 'Nguyen Vo',
  },

  // Navigation sections
  sections: ['home', 'experience', 'skills', 'mindset', 'contact'] as const,

  // Available languages
  languages: [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'de', label: 'DE', name: 'Deutsch' },
  ] as const,

  // Default language
  defaultLanguage: 'en' as const,

  // Theme settings
  theme: {
    defaultTheme: 'dark' as const,
    storageKey: 'nguyen-vo-theme',
  },

  // Analytics (optional)
  analytics: {
    googleAnalyticsId: '', // Add your GA4 ID if needed
  },
} as const;

// Type exports for TypeScript support
export type SiteConfig = typeof siteConfig;
export type Language = (typeof siteConfig.languages)[number]['code'];
export type Section = (typeof siteConfig.sections)[number];
