import {
  Component,
  ElementRef,
  afterNextRender,
  viewChild,
  viewChildren,
  inject,
  DestroyRef,
  signal,
  computed,
  effect
} from '@angular/core';
import { PortfolioStore } from '@core/data/portfolio.store';
import { scrollStaggerReveal, refreshScrollTriggers } from '@shared/animations/gsap.utils';

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <section class="projects section" id="projects">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Architecture Programs</h2>
          <p class="section-subtitle">Blueprints, governance, and automation streams that shaped enterprise systems.</p>
        </div>
        <div class="project-controls">
          <div class="filter-group" role="tablist" aria-label="Project type">
            <button
              type="button"
              class="filter-chip"
              [class.active]="activeType() === 'all'"
              (click)="setType('all')"
              role="tab"
              [attr.aria-selected]="activeType() === 'all'">
              All
            </button>
            <button
              type="button"
              class="filter-chip"
              [class.active]="activeType() === 'company'"
              (click)="setType('company')"
              role="tab"
              [attr.aria-selected]="activeType() === 'company'">
              Architecture
            </button>
          </div>
          <label class="featured-toggle">
            <input
              type="checkbox"
              [checked]="featuredOnly()"
              (change)="toggleFeatured($any($event.target).checked)">
            Featured only
          </label>
        </div>
        <div #projectsGrid class="projects-grid">
          @for (project of filteredProjects(); track project.id; let i = $index) {
            <article #projectCard class="project-card" [class.personal]="project.type === 'personal'" [attr.data-index]="i">
              <div class="card-glow" [class.personal-glow]="project.type === 'personal'"></div>
              <div class="project-preview" [attr.data-type]="project.type">
                <span class="preview-label">{{ project.summary || project.title }}</span>
              </div>
              <div class="card-content">
                <div class="card-header">
                  <span class="project-type" [class.personal-type]="project.type === 'personal'">
                    {{ project.type }}
                  </span>
                  @if (project.featured) {
                    <span class="featured-badge">Featured</span>
                  }
                </div>
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.impact || project.description }}</p>
                <div class="project-meta">
                  @if (project.role) {
                    <span class="meta-pill">{{ project.role }}</span>
                  }
                  @if (project.timeline) {
                    <span class="meta-pill">{{ project.timeline }}</span>
                  }
                </div>
                @if (project.metrics?.length) {
                  <div class="project-metrics">
                    @for (metric of project.metrics; track metric.label) {
                      <div class="metric">
                        <span class="metric-label">{{ metric.label }}</span>
                        <span class="metric-value">{{ metric.value }}</span>
                      </div>
                    }
                  </div>
                }
                <details class="project-details">
                  <summary>Details</summary>
                  <p class="details-text">{{ project.description }}</p>
                  <div class="details-tech">
                    <span class="details-label">Tech</span>
                    <div class="details-tags">
                      @for (tech of project.technologies; track tech) {
                        <span class="tech-tag" [class.personal-tag]="project.type === 'personal'">{{ tech }}</span>
                      }
                    </div>
                  </div>
                </details>
                <div class="project-tech">
                  @for (tech of project.technologies; track tech) {
                    <span class="tech-tag" [class.personal-tag]="project.type === 'personal'">{{ tech }}</span>
                  }
                </div>
                @if (project.links?.length) {
                  <div class="project-links">
                    @for (link of project.links; track link.url) {
                      <a class="project-link" [href]="link.url" target="_blank" rel="noopener">
                        {{ link.label }}
                      </a>
                    }
                  </div>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects {
      background: var(--color-bg);
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: clamp(1.75rem, 4vw, 2.25rem);
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 0.75rem;
    }

    .section-title::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background: var(--color-accent);
      margin: 1rem auto 0;
      border-radius: 2px;
    }

    .section-subtitle {
      color: var(--color-text-muted);
      font-size: 0.95rem;
    }

    .project-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin: 2rem 0 2.5rem;
    }

    .filter-group {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
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

    .filter-chip.active {
      background: rgba(59, 130, 246, 0.15);
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .featured-toggle {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .featured-toggle input {
      accent-color: var(--color-accent);
    }

    .projects-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem;
      align-items: stretch;
    }

    .project-card {
      flex: 1 1 280px;
      max-width: 340px;
      position: relative;
      background: var(--color-bg-alt);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      overflow: hidden;
      transition: border-color 0.3s ease, transform 0.3s ease;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }

    .project-card:hover {
      border-color: rgba(59, 130, 246, 0.4);
      transform: translateY(-4px);
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.25);
    }

    .project-card.personal:hover {
      border-color: rgba(16, 185, 129, 0.4);
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.25);
    }

    .card-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(59, 130, 246, 0.06),
        transparent 40%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .card-glow.personal-glow {
      background: radial-gradient(
        600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(16, 185, 129, 0.06),
        transparent 40%
      );
    }

    .project-card:hover .card-glow {
      opacity: 1;
    }

    .card-content {
      position: relative;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
    }

    .project-preview {
      height: 110px;
      display: flex;
      align-items: flex-end;
      padding: 1rem 1.5rem;
      background:
        linear-gradient(135deg, rgba(59, 130, 246, 0.15), transparent 70%),
        radial-gradient(circle at top left, rgba(59, 130, 246, 0.25), transparent 60%);
      border-bottom: 1px solid var(--color-border);
    }

    .project-preview[data-type="personal"] {
      background:
        linear-gradient(135deg, rgba(16, 185, 129, 0.18), transparent 70%),
        radial-gradient(circle at top left, rgba(16, 185, 129, 0.25), transparent 60%);
    }

    .preview-label {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      max-width: 80%;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .project-type {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-accent);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.8;
    }

    .project-type.personal-type {
      color: #10b981;
    }

    .featured-badge {
      font-size: 0.7rem;
      padding: 0.25rem 0.5rem;
      border-radius: 999px;
      border: 1px solid rgba(59, 130, 246, 0.3);
      color: var(--color-accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
    }

    .project-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--color-text);
      line-height: 1.3;
    }

    .project-description {
      color: var(--color-text-muted);
      line-height: 1.7;
      font-size: 0.85rem;
      flex-grow: 1;
    }

    .project-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .meta-pill {
      font-size: 0.75rem;
      padding: 0.25rem 0.6rem;
      border-radius: 999px;
      border: 1px solid var(--color-border);
      color: var(--color-text-muted);
    }

    .project-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 0.75rem;
      margin-top: 0.25rem;
    }

    .metric {
      padding: 0.5rem 0.75rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--color-border);
      border-radius: 6px;
    }

    .metric-label {
      display: block;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-text-muted);
      margin-bottom: 0.25rem;
    }

    .metric-value {
      font-size: 0.85rem;
      color: var(--color-text);
    }

    .project-details {
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 0.6rem 0.8rem;
      background: rgba(59, 130, 246, 0.06);
    }

    .project-details summary {
      cursor: pointer;
      font-weight: 600;
      color: var(--color-text);
      font-size: 0.85rem;
      margin-bottom: 0.4rem;
      list-style: none;
    }

    .project-details summary:hover {
      color: var(--color-accent);
    }

    .project-details p {
      color: var(--color-text);
      line-height: 1.6;
      font-size: 0.85rem;
    }

    .details-tech {
      margin-top: 0.6rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .details-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-text-muted);
    }

    .details-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .project-details summary::marker,
    .project-details summary::-webkit-details-marker {
      display: none;
    }

    .project-details summary::after {
      content: '+';
      float: right;
      color: var(--color-text-muted);
    }

    .project-details[open] summary::after {
      content: '−';
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
    }

    .tech-tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.625rem;
      background: rgba(59, 130, 246, 0.1);
      color: var(--color-accent);
      border-radius: 4px;
      font-weight: 500;
    }

    .tech-tag.personal-tag {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }

    .project-links {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .project-link {
      font-size: 0.8125rem;
      color: var(--color-accent);
      text-decoration: none;
      border-bottom: 1px solid rgba(59, 130, 246, 0.4);
      padding-bottom: 0.1rem;
      transition: color 0.2s ease, border-color 0.2s ease;
    }

    .project-link:hover {
      color: #93c5fd;
      border-color: #93c5fd;
    }

    @media (max-width: 400px) {
      .projects-grid {
        flex-direction: column;
      }
      .project-card {
        max-width: 100%;
      }
    }
  `]
})
export class ProjectsComponent {
  private readonly store = inject(PortfolioStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly projectsGrid = viewChild.required<ElementRef>('projectsGrid');
  readonly projectCards = viewChildren<ElementRef>('projectCard');

  readonly allProjects = this.store.projects;
  readonly activeType = signal<'all' | 'company' | 'personal'>('all');
  readonly featuredOnly = signal(false);
  readonly filteredProjects = computed(() => {
    let projects = this.allProjects();
    if (this.activeType() !== 'all') {
      projects = projects.filter(p => p.type === this.activeType());
    }
    if (this.featuredOnly()) {
      projects = projects.filter(p => p.featured);
    }
    return projects;
  });

  private animationCleanupFns: (() => void)[] = [];
  private hoverCleanupFns: (() => void)[] = [];

  constructor() {
    afterNextRender(() => {
      this.initAnimation();
      this.initHoverEffects();

      effect(() => {
        this.filteredProjects();
        setTimeout(() => {
          this.initHoverEffects();
          refreshScrollTriggers();
        }, 0);
      });
    });
  }

  setType(type: 'all' | 'company' | 'personal'): void {
    this.activeType.set(type);
  }

  toggleFeatured(value: boolean): void {
    this.featuredOnly.set(value);
  }

  private initAnimation(): void {
    const trigger = scrollStaggerReveal(
      this.projectsGrid(),
      '.project-card',
      {
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );

    if (trigger) {
      this.animationCleanupFns.push(() => trigger.kill());
    }

    this.destroyRef.onDestroy(() => {
      this.animationCleanupFns.forEach(fn => fn());
      this.hoverCleanupFns.forEach(fn => fn());
    });
  }

  private initHoverEffects(): void {
    this.hoverCleanupFns.forEach(fn => fn());
    this.hoverCleanupFns = [];

    const cards = this.projectCards();

    cards.forEach(card => {
      const el = card.nativeElement;

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--mouse-x', `${x}%`);
        el.style.setProperty('--mouse-y', `${y}%`);
      };

      el.addEventListener('mousemove', onMouseMove);

      this.hoverCleanupFns.push(() => {
        el.removeEventListener('mousemove', onMouseMove);
      });
    });
  }
}
