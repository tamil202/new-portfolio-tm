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
  selector: 'app-testimonials',
  standalone: true,
  template: `
    <section class="testimonials section" id="testimonials">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Testimonials</h2>
          <p class="section-subtitle">What teammates and stakeholders say.</p>
        </div>
        <div #grid class="testimonial-grid">
          @for (item of testimonials(); track item.id) {
            <article class="testimonial-card">
              <p class="testimonial-quote">“{{ item.quote }}”</p>
              <div class="testimonial-meta">
                <span class="testimonial-name">{{ item.name }}</span>
                <span class="testimonial-role">{{ item.role }} · {{ item.company }}</span>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials {
      background: var(--color-bg);
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-subtitle {
      color: var(--color-text-muted);
      font-size: 1.0625rem;
    }

    .testimonial-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .testimonial-card {
      background: var(--color-bg-alt);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      box-shadow: 0 0 18px rgba(0, 240, 255, 0.08);
    }

    .testimonial-quote {
      color: var(--color-text);
      line-height: 1.7;
    }

    .testimonial-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .testimonial-name {
      font-weight: 600;
      color: var(--color-accent);
    }

    .testimonial-role {
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }
  `]
})
export class TestimonialsComponent {
  private readonly store = inject(PortfolioStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly grid = viewChild.required<ElementRef>('grid');
  readonly testimonials = this.store.testimonials;

  constructor() {
    afterNextRender(() => {
      this.initAnimation();
    });
  }

  private initAnimation(): void {
    const trigger = scrollStaggerReveal(
      this.grid(),
      '.testimonial-card',
      {
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );

    this.destroyRef.onDestroy(() => {
      trigger?.kill();
    });
  }
}
