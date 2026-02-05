import {
  Component,
  ElementRef,
  afterNextRender,
  viewChild,
  inject,
  DestroyRef
} from '@angular/core';
import { PortfolioStore } from '@core/data/portfolio.store';
import { scrollStaggerReveal } from '@shared/animations/gsap.utils';

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section class="experience section" id="experience">
      <div class="container">
        <h2 class="section-title">Experience</h2>
        <p class="section-subtitle">Roles and responsibilities across product cycles.</p>
        <div #timeline class="timeline">
          @for (exp of experience(); track exp.id) {
            <div class="timeline-item">
              <div class="timeline-marker">
                @if (exp.current) {
                  <span class="marker-dot current"></span>
                } @else {
                  <span class="marker-dot"></span>
                }
              </div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <div>
                    <h3 class="timeline-role">{{ exp.role }}</h3>
                    <p class="timeline-company">{{ exp.company }}</p>
                  </div>
                  <span class="timeline-period">{{ exp.period }}</span>
                </div>
                <ul class="timeline-highlights">
                  @for (highlight of exp.highlights; track highlight) {
                    <li>{{ highlight }}</li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .timeline {
      position: relative;
      padding-left: 2rem;
    }

    .section-subtitle {
      color: var(--color-text-muted);
      text-align: center;
      margin-top: -1.5rem;
      margin-bottom: 2.5rem;
      font-size: 0.95rem;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--color-border);
    }

    .timeline-item {
      position: relative;
      padding-bottom: 2.5rem;
    }

    .timeline-item:last-child {
      padding-bottom: 0;
    }

    .timeline-marker {
      position: absolute;
      left: -2rem;
      top: 0.25rem;
      transform: translateX(-50%);
    }

    .marker-dot {
      display: block;
      width: 12px;
      height: 12px;
      background: var(--color-bg);
      border: 2px solid var(--color-border);
      border-radius: 50%;
    }

    .marker-dot.current {
      background: var(--color-accent);
      border-color: var(--color-accent);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
    }

    .timeline-content {
      background: var(--color-bg-alt);
      border: 1px solid var(--color-border);
      border-radius: 10px;
      padding: 1.1rem;
      box-shadow: 0 0 18px rgba(59, 130, 246, 0.08);
    }

    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .timeline-role {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 0.25rem;
    }

    .timeline-company {
      color: var(--color-accent);
      font-weight: 500;
    }

    .timeline-period {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      white-space: nowrap;
    }

    .timeline-highlights {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    .timeline-highlights li {
      position: relative;
      padding-left: 1.25rem;
      color: var(--color-text-muted);
      line-height: 1.5;
      font-size: 0.9rem;
    }

    .timeline-highlights li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.625rem;
      width: 6px;
      height: 6px;
      background: var(--color-accent);
      border-radius: 50%;
    }

    @media (min-width: 768px) {
      .timeline {
        padding-left: 3rem;
      }

      .timeline-marker {
        left: -3rem;
      }
    }
  `]
})
export class ExperienceComponent {
  private readonly store = inject(PortfolioStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly timeline = viewChild.required<ElementRef>('timeline');

  readonly experience = this.store.experience;

  constructor() {
    afterNextRender(() => {
      this.initAnimation();
    });
  }

  private initAnimation(): void {
    const trigger = scrollStaggerReveal(
      this.timeline(),
      '.timeline-item',
      {
        y: 40,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out'
      }
    );

    this.destroyRef.onDestroy(() => {
      trigger?.kill();
    });
  }
}
