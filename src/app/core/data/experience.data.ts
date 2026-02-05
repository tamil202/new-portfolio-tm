import { Experience, SocialLink } from '@shared/types/portfolio.types';

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'exp-1',
    company: 'Current Company',
    role: 'Software Engineer',
    period: '2026 - Present',
    current: true,
    highlights: [
      'Developing and maintaining Angular frontend applications',
      'Building backend services with NestJS and MySQL',
      'Working on ULRS and EXMINE applications with AWS deployment',
      'Creating reusable UI component libraries for internal use'
    ]
  },
  {
    id: 'exp-2',
    company: 'Previous Role',
    role: 'Junior Software Engineer',
    period: '2025 - 2026',
    current: false,
    highlights: [
      'Built Ultra-Table Angular library with virtual scrolling for large datasets',
      'Developed features for attendance and server management systems',
      'Fixed bugs and collaborated on testing and deployment',
      'Worked with Angular, Node.js, and MySQL stack'
    ]
  },
  {
    id: 'exp-3',
    company: 'Starting Role',
    role: 'Junior Software Developer',
    period: '2024 - 2025',
    current: false,
    highlights: [
      'Learned Angular, TypeScript, and RxJS fundamentals',
      'Contributed to frontend development tasks',
      'Worked on bug fixes and feature enhancements',
      'Gained experience with REST API integration'
    ]
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/tamil202',
    icon: 'github'
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tamilvanan-d-1a5925260/',
    icon: 'linkedin'
  },
  {
    platform: 'Email',
    url: 'mailto:tdev@tamix.in',
    icon: 'email'
  }
];
