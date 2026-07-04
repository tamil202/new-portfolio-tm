import {
  Component,
  ElementRef,
  afterNextRender,
  viewChild,
  viewChildren,
  inject,
  DestroyRef,
  signal
} from '@angular/core';
import { PortfolioStore } from '@core/data/portfolio.store';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@shared/utils/motion.utils';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="about section" id="about" #sectionEl>
      <!-- Screen Transition Overlay -->
      <div class="screen-transition" #screenTransition>
        <div class="scan-line"></div>
        <div class="glitch-overlay"></div>
      </div>

      <!-- Section Indicator -->
      <div class="section-indicator" #indicator>
        <span class="indicator-label">SECTION</span>
        <span class="indicator-number">01</span>
      </div>

      <div class="container">
        <h2 #title class="section-title cyber-title" data-text="About Me">
          <span class="title-glitch">About Me</span>
        </h2>
        <div #content class="about-content">
          <div class="about-text">
            <p class="text-reveal">
              Senior IT and Cloud Manager with 20+ years of experience across IT infrastructure, database
              platforms, cloud operations, and security governance.
            </p>
            <p class="text-reveal">
              Proven ability to lead cross-functional teams, drive cloud cost optimization, strengthen
              compliance, and improve production reliability across enterprise environments.
            </p>
            <p class="text-reveal">
              Certified across cloud, security, and architecture disciplines, guiding teams through
              high-impact program delivery and system modernization.
            </p>
          </div>
          <div class="about-stats">
            <div #statEl class="stat cyber-stat">
              <div class="stat-bar"></div>
              <span class="stat-number" #statNum>{{ displayYears() }}+</span>
              <span class="stat-label">
                <span class="label-bracket">[</span>
                Years Experience
                <span class="label-bracket">]</span>
              </span>
            </div>
            <div #statEl class="stat cyber-stat">
              <div class="stat-bar"></div>
              <span class="stat-number" #statNum>{{ displayProjects() }}+</span>
              <span class="stat-label">
                <span class="label-bracket">[</span>
                Systems Architected
                <span class="label-bracket">]</span>
              </span>
            </div>
            <div #statEl class="stat cyber-stat">
              <div class="stat-bar"></div>
              <span class="stat-number" #statNum>{{ displayTech() }}%</span>
              <span class="stat-label">
                <span class="label-bracket">[</span>
                Cost Reduction
                <span class="label-bracket">]</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Corner Frame -->
      <div class="corner-frame top-left"></div>
      <div class="corner-frame top-right"></div>
      <div class="corner-frame bottom-left"></div>
      <div class="corner-frame bottom-right"></div>
    </section>
  `,
  styles: [`
    .about {
      background: var(--color-bg-alt);
      position: relative;
      overflow: hidden;
    }

    /* Screen Transition Effect */
    .screen-transition {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 10;
      opacity: 0;
    }

    .scan-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(59, 130, 246, 0.8),
        rgba(255, 255, 255, 0.9),
        rgba(59, 130, 246, 0.8),
        transparent
      );
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
      top: -4px;
    }

    .glitch-overlay {
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(59, 130, 246, 0.03) 2px,
        rgba(59, 130, 246, 0.03) 4px
      );
    }

    /* Section Indicator */
    .section-indicator {
      position: absolute;
      top: 2rem;
      right: 2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-family: 'Courier New', monospace;
      opacity: 0;
    }

    .indicator-label {
      font-size: 0.625rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.3);
    }

    .indicator-number {
      font-size: 2rem;
      font-weight: 700;
      color: rgba(59, 130, 246, 0.3);
      line-height: 1;
    }

    /* Corner Frame Decorations */
    .corner-frame {
      position: absolute;
      width: 40px;
      height: 40px;
      border: 2px solid rgba(59, 130, 246, 0.2);
      opacity: 0;
    }

    .corner-frame.top-left {
      top: 1rem;
      left: 1rem;
      border-right: none;
      border-bottom: none;
    }

    .corner-frame.top-right {
      top: 1rem;
      right: 1rem;
      border-left: none;
      border-bottom: none;
    }

    .corner-frame.bottom-left {
      bottom: 1rem;
      left: 1rem;
      border-right: none;
      border-top: none;
    }

    .corner-frame.bottom-right {
      bottom: 1rem;
      right: 1rem;
      border-left: none;
      border-top: none;
    }

    /* Cyber Title */
    .cyber-title {
      position: relative;
      display: inline-block;
    }

    .title-glitch {
      position: relative;
    }

    .cyber-title::before,
    .cyber-title::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    .cyber-title::before {
      color: #ff0040;
      animation: none;
    }

    .cyber-title::after {
      color: #00ffff;
      animation: none;
    }

    .cyber-title.glitching::before {
      animation: glitch-1 0.3s ease-in-out;
    }

    .cyber-title.glitching::after {
      animation: glitch-2 0.3s ease-in-out;
    }

    @keyframes glitch-1 {
      0%, 100% { opacity: 0; transform: translate(0); }
      20% { opacity: 0.8; transform: translate(-3px, 2px); }
      40% { opacity: 0.8; transform: translate(3px, -2px); }
      60% { opacity: 0.8; transform: translate(-2px, 1px); }
      80% { opacity: 0; transform: translate(2px, -1px); }
    }

    @keyframes glitch-2 {
      0%, 100% { opacity: 0; transform: translate(0); }
      20% { opacity: 0.8; transform: translate(3px, -2px); }
      40% { opacity: 0.8; transform: translate(-3px, 2px); }
      60% { opacity: 0.8; transform: translate(2px, -1px); }
      80% { opacity: 0; transform: translate(-2px, 1px); }
    }

    .about-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    @media (min-width: 768px) {
      .about-content {
        grid-template-columns: 2fr 1fr;
        align-items: start;
      }
    }

    .about-text {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .about-text p {
      color: var(--color-text-muted);
      line-height: 1.8;
      font-size: 1.0625rem;
    }

    .text-reveal {
      opacity: 0;
      transform: translateY(20px);
    }

    .about-stats {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      .about-stats {
        padding-left: 2rem;
        border-left: 1px solid var(--color-border);
      }
    }

    /* Cyber Stat Cards */
    .cyber-stat {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 1rem;
      background: rgba(59, 130, 246, 0.03);
      border: 1px solid rgba(59, 130, 246, 0.1);
      opacity: 0;
      transform: translateX(30px);
    }

    .stat-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-accent);
      line-height: 1;
      font-family: 'Courier New', monospace;
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .label-bracket {
      color: rgba(59, 130, 246, 0.5);
    }
  `]
})
export class AboutComponent {
  private readonly store = inject(PortfolioStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly sectionEl = viewChild.required<ElementRef>('sectionEl');
  readonly screenTransition = viewChild.required<ElementRef>('screenTransition');
  readonly indicator = viewChild.required<ElementRef>('indicator');
  readonly title = viewChild.required<ElementRef>('title');
  readonly content = viewChild.required<ElementRef>('content');
  readonly statElements = viewChildren<ElementRef>('statEl');

  readonly yearsExperience = this.store.totalYearsExperience;
  readonly projectCount = this.store.projectCount;
  readonly techCount = () => 40; // 40% cost reduction

  // Animated display values
  readonly displayYears = signal(0);
  readonly displayProjects = signal(0);
  readonly displayTech = signal(0);

  private cleanupFns: (() => void)[] = [];
  private hasAnimated = false;

  constructor() {
    afterNextRender(() => {
      this.initAnimation();
    });
  }

  private initAnimation(): void {
    const section = this.sectionEl().nativeElement;
    const screenTransition = this.screenTransition().nativeElement;
    const scanLine = screenTransition.querySelector('.scan-line');
    const indicator = this.indicator().nativeElement;
    const title = this.title().nativeElement;
    const cornerFrames = section.querySelectorAll('.corner-frame');
    const textReveals = section.querySelectorAll('.text-reveal');
    const stats = this.statElements();

    if (prefersReducedMotion()()) {
      this.showContentInstantly(indicator, title, cornerFrames, textReveals, stats);
      return;
    }

    // Create main scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (this.hasAnimated) return;
        this.hasAnimated = true;
        this.playEntranceAnimation(
          screenTransition, scanLine, indicator, title,
          cornerFrames, textReveals, stats
        );
      }
    });

    // Safety net: if the trigger's position was miscalculated (e.g. layout
    // shifted after fonts loaded) and "onEnter" never fires, reveal anyway.
    setTimeout(() => {
      if (this.hasAnimated) return;
      this.hasAnimated = true;
      this.playEntranceAnimation(
        screenTransition, scanLine, indicator, title,
        cornerFrames, textReveals, stats
      );
    }, 4000);

    this.cleanupFns.push(() => trigger.kill());

    this.destroyRef.onDestroy(() => {
      this.cleanupFns.forEach(fn => fn());
    });
  }

  private playEntranceAnimation(
    screenTransition: HTMLElement,
    scanLine: Element | null,
    indicator: HTMLElement,
    title: HTMLElement,
    cornerFrames: NodeListOf<Element>,
    textReveals: NodeListOf<Element>,
    stats: readonly ElementRef[]
  ): void {
    const tl = gsap.timeline();

    // Screen transition flash
    tl.to(screenTransition, {
      opacity: 1,
      duration: 0.1
    });

    // Scan line sweeps down
    if (scanLine) {
      tl.to(scanLine, {
        top: '100%',
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0);
    }

    // Fade out screen transition
    tl.to(screenTransition, {
      opacity: 0,
      duration: 0.3
    }, 0.4);

    // Show corner frames
    tl.to(cornerFrames, {
      opacity: 1,
      duration: 0.4,
      stagger: 0.05
    }, 0.3);

    // Show section indicator
    tl.to(indicator, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 0.4);

    // Title entrance with glitch
    tl.fromTo(title, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        // Add glitch effect
        title.classList.add('glitching');
        setTimeout(() => title.classList.remove('glitching'), 300);
      }
    }, 0.5);

    // Text reveals staggered
    tl.to(textReveals, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out'
    }, 0.7);

    // Stats entrance with bar animation
    stats.forEach((stat, index) => {
      const el = stat.nativeElement;
      const bar = el.querySelector('.stat-bar');

      tl.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.9 + index * 0.15);

      if (bar) {
        tl.to(bar, {
          width: '100%',
          duration: 0.4,
          ease: 'power2.out'
        }, 1.0 + index * 0.15);
      }
    });

    // Animate stat numbers
    tl.call(() => {
      this.animateNumber(this.displayYears, this.yearsExperience(), 1000);
      this.animateNumber(this.displayProjects, this.projectCount(), 1200);
      this.animateNumber(this.displayTech, this.techCount(), 1400);
    }, [], 1.1);
  }

  private showContentInstantly(
    indicator: HTMLElement,
    title: HTMLElement,
    cornerFrames: NodeListOf<Element>,
    textReveals: NodeListOf<Element>,
    stats: readonly ElementRef[]
  ): void {
    [indicator, title, ...Array.from(cornerFrames), ...Array.from(textReveals)].forEach(el => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });

    stats.forEach(stat => {
      const el = stat.nativeElement;
      el.style.opacity = '1';
      el.style.transform = 'none';
      const bar = el.querySelector('.stat-bar');
      if (bar) {
        (bar as HTMLElement).style.width = '100%';
      }
    });

    this.displayYears.set(this.yearsExperience());
    this.displayProjects.set(this.projectCount());
    this.displayTech.set(this.techCount());
  }

  private animateNumber(
    signalRef: ReturnType<typeof signal<number>>,
    target: number,
    duration: number
  ): void {
    const start = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * easeOut);

      signalRef.set(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
