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
  selector: 'app-credentials',
  standalone: true,
  template: `
    <section class="credentials section" id="credentials">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Credentials</h2>
          <p class="section-subtitle">Education, certifications, and recognition.</p>
        </div>
        <div #grid class="credentials-grid">
          <article class="credential-card">
            <h3 class="credential-title">Education</h3>
            <ul class="credential-list">
              @for (item of education(); track item.id) {
                <li>
                  <span class="item-primary">{{ item.degree }}</span>
                  <span class="item-secondary">{{ item.field }}</span>
                </li>
              }
            </ul>
          </article>

          <article class="credential-card">
            <h3 class="credential-title">Certifications</h3>
            <ul class="credential-list">
              @for (cert of certifications(); track cert.id) {
                <li>
                  <span class="item-primary">{{ cert.name }}</span>
                  @if (cert.issuer) {
                    <span class="item-secondary">{{ cert.issuer }}</span>
                  }
                </li>
              }
            </ul>
          </article>

          <article class="credential-card">
            <h3 class="credential-title">Awards &amp; Recognition</h3>
            <ul class="credential-list">
              @for (award of awards(); track award.id) {
                <li>
                  <span class="item-primary">{{ award.title }}</span>
                  @if (award.period) {
                    <span class="item-secondary">{{ award.period }}</span>
                  }
                </li>
              }
            </ul>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .credentials {
      background: var(--color-bg-alt);
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-subtitle {
      color: var(--color-text-muted);
      font-size: 1.0625rem;
    }

    .credentials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .credential-card {
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 0 18px rgba(59, 130, 246, 0.08);
    }

    .credential-title {
      font-size: 1.0625rem;
      font-weight: 600;
      color: var(--color-text);
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
      border-bottom: 2px solid var(--color-accent);
      display: inline-block;
      width: fit-content;
    }

    .credential-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .credential-list li {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      padding-left: 1rem;
      position: relative;
    }

    .credential-list li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      background: var(--color-accent);
      border-radius: 50%;
    }

    .item-primary {
      color: var(--color-text);
      font-weight: 500;
      font-size: 0.9375rem;
    }

    .item-secondary {
      color: var(--color-text-muted);
      font-size: 0.8125rem;
    }
  `]
})
export class CredentialsComponent {
  private readonly store = inject(PortfolioStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly grid = viewChild.required<ElementRef>('grid');
  readonly education = this.store.education;
  readonly certifications = this.store.certifications;
  readonly awards = this.store.awards;

  constructor() {
    afterNextRender(() => {
      this.initAnimation();
    });
  }

  private initAnimation(): void {
    const trigger = scrollStaggerReveal(
      this.grid(),
      '.credential-card',
      {
        y: 30,
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
