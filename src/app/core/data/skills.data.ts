import { SkillGroup } from '@shared/types/portfolio.types';

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: 'Architecture & Governance',
    skills: [
      { name: 'Enterprise Architecture' },
      { name: 'Solution Architecture' },
      { name: 'Architecture Review Boards' },
      { name: 'Stakeholder Management' },
      { name: 'Change Control' },
      { name: 'Risk & Compliance' },
      { name: 'TOGAF principles' },
      { name: 'Audit & SOC guidance' }
    ]
  },
  {
    category: 'Data Architecture',
    skills: [
      { name: 'MSSQL Server' },
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Data Modeling' },
      { name: 'Indexing Strategy' },
      { name: 'Performance Tuning' },
      { name: 'Backup & Recovery' },
      { name: 'Replication' }
    ]
  },
  {
    category: 'Cloud Architecture',
    skills: [
      { name: 'AWS' },
      { name: 'Azure' },
      { name: 'GCP' },
      { name: 'OCI' },
      { name: 'Control Tower' },
      { name: 'Security Hub' },
      { name: 'Hybrid VPC/VNet' },
      { name: 'Cloud Reference Architectures' },
      { name: 'FinOps' }
    ]
  },
  {
    category: 'Security & Observability',
    skills: [
      { name: 'Snyk' },
      { name: 'Cortex' },
      { name: 'Wazuh' },
      { name: 'Nessus' },
      { name: 'Zabbix' },
      { name: 'Vulnerability Management' }
    ]
  },
  {
    category: 'Automation & Tooling',
    skills: [
      { name: 'SSIS' },
      { name: 'Power BI' },
      { name: 'Amazon Glue' },
      { name: 'Jenkins' },
      { name: 'GitHub/GitLab' },
      { name: 'Windows Server' },
      { name: 'Ubuntu' },
      { name: 'Kali Linux' }
    ]
  }
];
