import { Project } from '@shared/types/portfolio.types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'finops',
    title: 'AWS FinOps Architecture',
    summary: 'Architected a multi-account cost governance blueprint that cut spend from $100k to $60k/mo.',
    description: 'Designed the AWS Control Tower and Security Hub architecture, introduced FinOps guardrails, and aligned cost ownership with compliance and monitoring practices.',
    role: 'Senior Technical Project Manager',
    timeline: '2025 - Present',
    impact: 'Delivered 40% monthly cost reduction while strengthening governance, visibility, and architecture controls.',
    metrics: [
      { label: 'Blueprint', value: 'Multi-account AWS' },
      { label: 'Savings', value: '$40k/mo' },
      { label: 'Focus', value: 'Cost & compliance' }
    ],
    technologies: ['AWS', 'Control Tower', 'Security Hub', 'FinOps', 'Lambda'],
    featured: true,
    type: 'company'
  },
  {
    id: 'infra-consolidation',
    title: 'OVH + AWS Architecture Consolidation',
    summary: 'Re-architected 100+ VM estate with clear prod/dev/UAT boundaries.',
    description: 'Blueprinted environment segmentation, reduced bare-metal reliance, and introduced Zabbix-aligned monitoring to maintain architecture standards across OVH and AWS.',
    role: 'Program Lead',
    timeline: '2025',
    impact: 'Lowered infrastructure expenses 30% while improving environment safety and governance.',
    metrics: [
      { label: 'Architected', value: '100+ VMs' },
      { label: 'Savings', value: '30% cost' },
      { label: 'Scope', value: 'OVH + AWS' }
    ],
    technologies: ['OVH', 'AWS', 'VMware', 'VPC/VNet', 'Zabbix'],
    featured: true,
    type: 'company'
  },
  {
    id: 'security-automation',
    title: 'Secure SDLC Architecture',
    summary: 'Built organization-wide architecture for secure CI/CD and compliance tracking.',
    description: 'Integrated Snyk, Cortex, Wazuh, and Nessus into architecture review pipelines, ensuring vulnerability data surfaced to stakeholders and teams could fix issues fast.',
    role: 'Security Program Owner',
    timeline: '2025 - Present',
    impact: 'Elevated vulnerability visibility and shortened remediation cycles with architecture guardrails.',
    metrics: [
      { label: 'Architecture', value: 'Snyk + Cortex' },
      { label: 'Process', value: 'Secure SDLC' },
      { label: 'Scope', value: 'Org-wide' }
    ],
    technologies: ['Snyk', 'Cortex', 'Jira', 'GitHub', 'Wazuh', 'Nessus'],
    featured: true,
    type: 'company'
  },
  {
    id: 'multi-region',
    title: 'Multi-Region AWS Architecture',
    summary: 'Delivered 99.99% availability with 50% lower latency through a regional blueprint.',
    description: 'Defined multi-region AWS architecture patterns, tuning availability strategies, and orchestrating a 12-engineer delivery team for resilience and performance.',
    role: 'Technical Operations Manager',
    timeline: '2021 - 2024',
    impact: 'Lowered latency by 50% and maintained 99.99% availability through resilient architecture.',
    metrics: [
      { label: 'Architecture', value: 'Multi-region AWS' },
      { label: 'Availability', value: '99.99%' },
      { label: 'Latency', value: '-50%' }
    ],
    technologies: ['AWS', 'CloudWatch', 'VPC', 'EC2', 'Load Balancing'],
    featured: true,
    type: 'company'
  },
  {
    id: 'sql-optimization',
    title: 'Enterprise SQL Architecture',
    summary: 'Architected database performance and recovery strategies for ERP-critical systems.',
    description: 'Directed data architecture projects including indexing, profiling, and backup/recovery automation to unlock 50% faster response times while reducing risk.',
    role: 'Database Program Lead',
    timeline: '2014 - 2024',
    impact: 'Improved response times 50% and cut data loss risk 95% with hardened architecture.',
    metrics: [
      { label: 'Architecture', value: 'ERP systems' },
      { label: 'Response', value: '-50%' },
      { label: 'Risk', value: '-95% data loss' }
    ],
    technologies: ['MSSQL Server', 'SQL Profiler', 'Indexing', 'SSIS', 'MySQL'],
    featured: true,
    type: 'company'
  },
  {
    id: 'productivity-automation',
    title: 'Productivity & Timesheet Automation',
    summary: 'Built attendance and project-based timesheet platforms with monitoring.',
    description: 'Delivered internal web and desktop tools for attendance, time tracking, and productivity monitoring with automated screenshots and idle detection.',
    role: 'Program Owner',
    timeline: '2025',
    impact: 'Improved reporting accuracy and achieved 100% productivity compliance.',
    metrics: [
      { label: 'Coverage', value: 'Org-wide' },
      { label: 'Automation', value: 'Idle detection' },
      { label: 'Outcome', value: '100% compliance' }
    ],
    technologies: ['Jira', 'Reporting', 'Desktop Monitoring', 'Web App'],
    featured: true,
    type: 'company'
  }
];
