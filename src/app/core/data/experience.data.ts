import { Experience, SocialLink } from '@shared/types/portfolio.types';

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'exp-1',
    company: 'Stellar Innovations',
    role: 'Senior Technical Project Manager (IT Dev, Infra & Security)',
    period: '02/2025 - Present',
    current: true,
    highlights: [
      'Managed 80+ developers across Python, full-stack, infrastructure, and cloud database teams with operational support.',
      'Standardized Jira tracking with Kanban/Scrum workflows to improve cross-team delivery visibility.',
      'Implemented Snyk integrated with Jira/GitHub and rolled out Cortex developer scorecards.',
      'Consolidated OVH + AWS infrastructure (100+ VMs) with environment segregation; achieved 30% cost savings.',
      'Deployed AWS Control Tower and Security Hub; applied FinOps to cut monthly spend 40% ($100k to $60k).',
      'Led security analysts using Wazuh/Nessus and drove remediation for critical findings.'
    ]
  },
  {
    id: 'exp-2',
    company: 'Grand Mark, South Africa',
    role: 'Technical Operations Manager – SQL Server Database & Cloud',
    period: '07/2021 - 07/2024',
    current: false,
    highlights: [
      'Led a 12-engineer team delivering multi-region AWS deployment, reducing latency 50% and achieving 99.99% availability.',
      'Adopted Agile delivery, increasing speed by 30% and reducing costs 25%.',
      'Unified project management workflows, reducing cross-department delays by 60%.',
      'Directed SQL performance tuning, improving response times 50% and reducing data loss risk 95%.',
      'Implemented indexing and query optimization initiatives, reducing critical query time by 35%.'
    ]
  },
  {
    id: 'exp-3',
    company: 'Zensar Technologies, South Africa',
    role: 'Project Lead / Database & Cloud Support Engineer',
    period: '04/2007 - 02/2022',
    current: false,
    highlights: [
      'Served as technical consultant, securing major accounts including Grand Mark, Netforist, Silica, Nedbank, and Harmony Gold.',
      'Managed SQL databases for high-transaction retail apps, delivering 99% uptime with robust backups.',
      'Planned and executed SQL upgrades, patches, and replication with minimal downtime.',
      'Led AWS/Azure migrations for 5TB+ data, improving scalability during peak periods.',
      'Conducted TCO analysis and CloudWatch monitoring, reducing operational costs by 30%.'
    ]
  },
  {
    id: 'exp-4',
    company: 'Videocon International',
    role: 'Technical Production Engineer',
    period: '5+ Years',
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
    url: 'mailto:thirumurugan.g@zohomail.in',
    icon: 'email'
  },
];
