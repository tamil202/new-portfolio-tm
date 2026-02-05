import { Project } from '@shared/types/portfolio.types';

export const PROJECTS_DATA: Project[] = [
  // Company Projects
  {
    id: 'exmine',
    title: 'EXMINE Application',
    summary: 'Workflow-driven product app within the ULRS ecosystem.',
    description: 'Product application within the ULRS ecosystem for business workflow and data-driven operations. Built with modern Angular using Signals for state management and signal-based forms. Worked on both frontend and backend modules, implementing features and fixing bugs.',
    role: 'Full-stack engineer',
    timeline: '2026',
    impact: 'Stabilized critical workflows and improved admin efficiency.',
    metrics: [
      { label: 'Focus', value: 'Workflow automation' },
      { label: 'Scope', value: 'Enterprise product' },
      { label: 'Stack', value: 'Angular + NestJS' }
    ],
    technologies: ['Angular', 'Signals', 'NestJS', 'TypeScript', 'MySQL', 'Prisma'],
    featured: true,
    type: 'company'
  },
  {
    id: 'ultra-table',
    title: 'Ultra-Table Angular Library',
    summary: 'Reusable data table with virtual scrolling for large datasets.',
    description: 'High-performance, reusable data table component with virtual scrolling, sorting, filtering, and pagination. Optimized for large datasets. Released internally via GitLab package registry.',
    role: 'Frontend engineer',
    timeline: '2025 - 2026',
    impact: 'Standardized complex tables across internal apps.',
    metrics: [
      { label: 'Focus', value: 'Performance UI' },
      { label: 'Use', value: 'Reusable library' },
      { label: 'Key', value: 'Virtual scroll' }
    ],
    technologies: ['Angular', 'TypeScript', 'RxJS', 'CDK Virtual Scroll'],
    featured: true,
    type: 'company'
  },
  {
    id: 'ulrs',
    title: 'ULRS - Universal Loan Review System',
    summary: 'Enterprise loan review platform with complex workflows.',
    description: 'Enterprise loan review platform handling complex workflows, document processing, and review management. Built with Angular frontend, NestJS backend, and MySQL database, deployed on AWS.',
    role: 'Full-stack engineer',
    timeline: '2025 - 2026',
    impact: 'Delivered scalable reviews and document processing.',
    metrics: [
      { label: 'Focus', value: 'Loan reviews' },
      { label: 'Infra', value: 'AWS deployment' },
      { label: 'Stack', value: 'Angular + NestJS' }
    ],
    technologies: ['Angular', 'NestJS', 'MySQL', 'AWS', 'TypeScript'],
    featured: true,
    type: 'company'
  },
  {
    id: 'attendance-system',
    title: 'Attendance & Server Management',
    summary: 'Internal tools for employee attendance and infra ops.',
    description: 'Internal systems for employee attendance tracking and server infrastructure management. Developed features, fixed bugs, and collaborated on testing and deployment.',
    role: 'Backend + frontend',
    timeline: '2025',
    impact: 'Improved internal operations and reporting.',
    metrics: [
      { label: 'Focus', value: 'Internal tooling' },
      { label: 'Stack', value: 'Node + Angular' },
      { label: 'Type', value: 'Ops systems' }
    ],
    technologies: ['Angular', 'Node.js', 'MySQL', 'REST APIs'],
    featured: true,
    type: 'company'
  },
  // Personal Projects
  {
    id: 'mail-expense',
    title: 'Mail Expense Dashboard',
    summary: 'Automated expense analytics from email receipts.',
    description: 'Automated expense tracking system that reads transaction emails via IMAP, parses amounts, categorizes expenses, and generates analytics dashboards. Runs on a self-hosted Raspberry Pi server.',
    role: 'Solo developer',
    timeline: '2025',
    impact: 'Hands-free spend tracking and monthly summaries.',
    metrics: [
      { label: 'Input', value: 'IMAP receipts' },
      { label: 'Deploy', value: 'Raspberry Pi' },
      { label: 'Output', value: 'Analytics dashboard' }
    ],
    technologies: ['Node.js', 'IMAP', 'Raspberry Pi', 'SQLite', 'Analytics'],
    featured: true,
    type: 'personal'
  },
  {
    id: 'flow-mind',
    title: 'Flow Mind',
    summary: 'VS Code extension that turns selected code into flow diagrams.',
    description: 'VS Code extension that generates a flow diagram from selected code/text to explain execution flow. Available in the Open VSX Registry (OVSX). Built with Node.js, TypeScript, the VS Code API, and Groq API.',
    role: 'Extension author',
    timeline: '2026',
    impact: 'Makes code comprehension faster for readers.',
    metrics: [
      { label: 'Surface', value: 'VS Code' },
      { label: 'Output', value: 'Flow diagram' },
      { label: 'AI', value: 'Groq API' }
    ],
    links: [
      { label: 'OVSX', url: 'https://open-vsx.org/', kind: 'ovsx' }
    ],
    technologies: ['Node.js', 'TypeScript', 'VS Code API', 'Groq API'],
    featured: true,
    type: 'personal'
  },
  {
    id: 'vscode-gemini',
    title: 'VS Code Command Generator',
    summary: 'Generates CLI commands from natural language in VS Code.',
    description: 'VS Code extension that uses the Gemini API to generate command-line instructions from natural language. Helps speed up terminal workflows.',
    role: 'Extension author',
    timeline: '2025',
    impact: 'Faster terminal workflows with AI assistance.',
    metrics: [
      { label: 'Surface', value: 'VS Code' },
      { label: 'Input', value: 'Natural language' },
      { label: 'Output', value: 'CLI commands' }
    ],
    technologies: ['TypeScript', 'VS Code API', 'Gemini API'],
    featured: true,
    type: 'personal'
  },
  {
    id: 'tsc-app',
    title: 'npx tsc-app',
    summary: 'CLI for scaffolding TypeScript projects with defaults.',
    description: 'CLI tool for scaffolding TypeScript projects with sensible defaults. Generates project structure, tsconfig, and basic setup. Installable via npx.',
    role: 'Tooling developer',
    timeline: '2024',
    impact: 'Speeds up project bootstrap.',
    metrics: [
      { label: 'Command', value: 'npx tsc-app' },
      { label: 'Output', value: 'TS starter' },
      { label: 'Focus', value: 'Fast setup' }
    ],
    technologies: ['Node.js', 'TypeScript', 'CLI', 'npm'],
    featured: true,
    type: 'personal'
  }
];
