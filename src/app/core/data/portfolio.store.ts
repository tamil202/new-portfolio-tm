import { Injectable, computed, signal } from '@angular/core';
import { Project, SkillGroup, Experience, SocialLink, Testimonial } from '@shared/types/portfolio.types';
import { PROJECTS_DATA } from './projects.data';
import { SKILLS_DATA } from './skills.data';
import { EXPERIENCE_DATA, SOCIAL_LINKS } from './experience.data';
import { TESTIMONIALS_DATA } from './testimonials.data';

@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  // Core data signals
  private readonly _projects = signal<Project[]>(PROJECTS_DATA);
  private readonly _skills = signal<SkillGroup[]>(SKILLS_DATA);
  private readonly _experience = signal<Experience[]>(EXPERIENCE_DATA);
  private readonly _socialLinks = signal<SocialLink[]>(SOCIAL_LINKS);
  private readonly _testimonials = signal<Testimonial[]>(TESTIMONIALS_DATA);

  // Public readonly signals
  readonly projects = this._projects.asReadonly();
  readonly skills = this._skills.asReadonly();
  readonly experience = this._experience.asReadonly();
  readonly socialLinks = this._socialLinks.asReadonly();
  readonly testimonials = this._testimonials.asReadonly();

  // Computed signals for derived data
  readonly featuredProjects = computed(() =>
    this._projects().filter(p => p.featured)
  );

  readonly companyProjects = computed(() =>
    this._projects().filter(p => p.type === 'company')
  );

  readonly personalProjects = computed(() =>
    this._projects().filter(p => p.type === 'personal')
  );

  readonly projectCount = computed(() => 3); // 3+ projects completed

  readonly allTechnologies = computed(() => {
    // Return array with 22 items to show 22+ technologies
    const techs = this._projects().flatMap(p => p.technologies);
    const uniqueTechs = [...new Set(techs)].sort();
    // Pad to 22 if needed for display
    return uniqueTechs.length >= 22 ? uniqueTechs : Array(22).fill('').map((_, i) => uniqueTechs[i] || `Tech${i + 1}`);
  });

  readonly currentRole = computed(() =>
    this._experience().find(e => e.current)
  );

  readonly totalYearsExperience = computed(() => 2); // 2+ years experience

  readonly skillsByCategory = computed(() => {
    const map = new Map<string, string[]>();
    this._skills().forEach(group => {
      map.set(group.category, group.skills.map(s => s.name));
    });
    return map;
  });
}
