import { Certification, EducationItem, Award } from '@shared/types/portfolio.types';

export const CERTIFICATIONS_DATA: Certification[] = [
  { id: 'cert-1', name: 'Google Project Management', issuer: 'Coursera' },
  { id: 'cert-2', name: 'CCSP', issuer: 'Certified Cloud Security Professional' },
  { id: 'cert-3', name: 'CISSP', issuer: 'Certified Information Systems Security Professional' },
  { id: 'cert-4', name: 'DevOps', issuer: 'Coursera' },
  { id: 'cert-5', name: 'Ethical Hacking', issuer: 'Coursera' },
  { id: 'cert-6', name: 'PMI-ACP', issuer: 'Project Management Institute' },
  { id: 'cert-7', name: 'Lean Six Sigma Yellow Belt' },
  { id: 'cert-8', name: 'Scrum Master', issuer: 'Skill Soft' },
  { id: 'cert-9', name: 'MCDBA / MCITP – SQL Server', issuer: 'Microsoft Certified' }
];

export const EDUCATION_DATA: EducationItem[] = [
  { id: 'edu-1', degree: "Bachelor's Degree", field: 'Electronics and Communication Engineering' },
  { id: 'edu-2', degree: 'Diploma', field: 'Electronics and Communication Engineering' }
];

export const AWARDS_DATA: Award[] = [
  { id: 'award-1', title: 'Annual Excellence – Budding Innovation', period: '2015/16' },
  { id: 'award-2', title: 'Outstanding Contribution', period: '2015/16' },
  { id: 'award-3', title: 'Customer Centricity', period: '2015/16' },
  { id: 'award-4', title: 'Best Resource', period: '2015/16' }
];
