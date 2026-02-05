import {
  Component,
  ElementRef,
  afterNextRender,
  viewChild,
  viewChildren,
  inject,
  DestroyRef,
  signal,
  computed
} from '@angular/core';
import { PortfolioStore } from '@core/data/portfolio.store';
import { scrollStaggerReveal } from '@shared/animations/gsap.utils';

@Component({
  selector: 'app-skills',
  standalone: true,
  template: `
    <section class="skills section" id="skills">
      <div class="container">
        <h2 class="section-title">Skills & Technologies</h2>
        <p class="section-subtitle">Core stack grouped by category with quick filters.</p>
        <div class="skill-filters" role="tablist" aria-label="Skill categories">
          @for (category of categoryOptions(); track category) {
            <button
              type="button"
              class="filter-chip"
              [class.active]="activeCategory() === category"
              (click)="setCategory(category)"
              role="tab"
              [attr.aria-selected]="activeCategory() === category">
              {{ category }}
            </button>
          }
        </div>
        <div #skillsGrid class="skills-grid">
          @for (group of filteredSkills(); track group.category) {
            <div class="skill-group">
              <h3 class="skill-category">{{ group.category }}</h3>
              <div class="skill-list">
                @for (skill of group.skills; track skill.name) {
                  <span #skillBadge class="skill-badge">{{ skill.name }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2.5rem;
    }

    .section-subtitle {
      color: var(--color-text-muted);
      text-align: center;
      margin-top: -1.5rem;
      margin-bottom: 2rem;
    }

    .skill-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
      margin-bottom: 2.5rem;
    }

    .filter-chip {
      padding: 0.45rem 0.9rem;
      border-radius: 999px;
      border: 1px solid var(--color-border);
      background: var(--color-bg-alt);
      color: var(--color-text);
      font-size: 0.875rem;
      cursor: pointer;
      transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
    }

    .filter-chip:hover {
      border-color: var(--color-accent);
    }

    .filter-chip.active {
      background: rgba(59, 130, 246, 0.15);
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .skill-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .skill-category {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-text);
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--color-accent);
      display: inline-block;
      width: fit-content;
    }

    .skill-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.625rem;
    }

    .skill-badge {
      padding: 0.5rem 1rem;
      background: var(--color-bg-alt);
      border: 1px solid var(--color-border);
      border-radius: 6px;
      font-size: 0.9375rem;
      color: var(--color-text);
      transition: border-color 0.2s ease, background 0.2s ease;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }

    .skill-badge:hover {
      border-color: var(--color-accent);
      background: rgba(59, 130, 246, 0.05);
      box-shadow: 0 0 12px rgba(59, 130, 246, 0.2);
    }
  `]
})
export class SkillsComponent {
  private readonly store = inject(PortfolioStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly skillsGrid = viewChild.required<ElementRef>('skillsGrid');
  readonly skillBadges = viewChildren<ElementRef>('skillBadge');

  readonly skills = this.store.skills;
  readonly activeCategory = signal('All');
  readonly categoryOptions = computed(() => [
    'All',
    ...this.skills().map(group => group.category)
  ]);

  readonly filteredSkills = computed(() => {
    const active = this.activeCategory();
    if (active === 'All') {
      return this.skills();
    }
    return this.skills().filter(group => group.category === active);
  });

  constructor() {
    afterNextRender(() => {
      this.initAnimation();
    });
  }

  setCategory(category: string): void {
    this.activeCategory.set(category);
  }

  private initAnimation(): void {
    const trigger = scrollStaggerReveal(
      this.skillsGrid(),
      '.skill-badge',
      {
        y: 20,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.out'
      }
    );

    this.destroyRef.onDestroy(() => {
      trigger?.kill();
    });
  }
}
