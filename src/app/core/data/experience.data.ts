import { Experience, SocialLink } from '@shared/types/portfolio.types';

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'exp-1',
    company: 'Stellar Innovations',
    role: 'IT Development Manager (IT Infra & Cloud, Security & Compliance)',
    period: '02/2025 - Present',
    current: true,
    highlights: [
      'Led cross-functional programs across cloud, DevOps, database, and security, aligning delivery with engineering, operations, and compliance.',
      'Managed 100+ engineers across development, infrastructure, and operations teams, driving execution, accountability, and delivery outcomes.',
      'Improved application performance from 20% to 80% through architecture redesign, performance tuning, and scalable system enhancements.',
      'Reduced cloud costs 30-40% (₹1 Cr to ₹60 lakhs annually) through FinOps, while implementing AWS Control Tower and Security Hub for governance and compliance.',
      'Reduced DevOps licensing costs 40% and saved approximately $80K annually by consolidating multiple toolchains into GitLab.',
      'Led vulnerability remediation management and acted as technical SPOC for SOC and internal audits, ensuring compliance readiness.',
      'Collaborated with procurement teams to manage end-to-end procurement activities and define software development specifications.',
      'Led development of an AI-powered employee attendance and activity tracking system with real-time monitoring, improving productivity and reducing time wastage.'
    ]
  },
  {
    id: 'exp-2',
    company: 'Grand Mark, South Africa',
    role: 'Business Solution Manager – SQL Server & Cloud',
    period: '02/2022 - 07/2024',
    current: false,
    highlights: [
      'Led a team of 12 engineers delivering cloud-based solutions across cloud and database platforms.',
      'Achieved 99.99% availability through optimized architecture and platform improvements.',
      'Improved MSSQL performance 35-50% using tuning and indexing strategies.',
      'Implemented DR and backup strategies, reducing data loss risk by 95%.',
      'Led SYSPRO ERP implementation across 100+ branches in Africa, standardizing business processes and improving enterprise adoption.'
    ]
  },
  {
    id: 'exp-3',
    company: 'Zensar Technologies, India & South Africa',
    role: 'Project Lead – Database & Cloud Support',
    period: '04/2007 - 02/2022',
    current: false,
    highlights: [
      'Delivered enterprise database and cloud solutions for global clients across multiple engagements.',
      'Managed MSSQL environments with 99%+ uptime through proactive support and control.',
      'Led cloud migrations involving 5TB+ of data and implemented monitoring solutions to improve visibility and reliability.',
      'Reduced operational costs by 30% through optimization and automation initiatives.',
      'Advised clients on solution delivery and technical strategy, supporting business growth and successful project execution.'
    ]
  },
  {
    id: 'exp-4',
    company: 'Videocon International',
    role: 'Technical Production Engineer',
    period: '6 Years',
    current: false,
    highlights: [
      'Optimized production systems for reliability and throughput in electronics manufacturing.',
      'Led troubleshooting and continuous improvement initiatives across technical operations.'
    ]
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'Email',
    url: 'mailto:thirucare@zohomail.com',
    icon: 'email'
  },
];
