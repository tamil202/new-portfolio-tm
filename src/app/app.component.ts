import { Component, signal, afterNextRender, inject, DestroyRef, viewChild, ElementRef } from '@angular/core';
import { HeroComponent } from '@features/hero/hero.component';
import { AboutComponent } from '@features/about/about.component';
import { SkillsComponent } from '@features/skills/skills.component';
import { ProjectsComponent } from '@features/projects/projects.component';
import { TestimonialsComponent } from '@features/testimonials/testimonials.component';
import { ExperienceComponent } from '@features/experience/experience.component';
import { ContactComponent } from '@features/contact/contact.component';
import { StartButtonComponent } from '@features/start-button/start-button.component';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    TestimonialsComponent,
    ExperienceComponent,
    ContactComponent,
    StartButtonComponent
  ],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="scroll-progress" [style.width.%]="scrollProgress()"></div>
    <div class="hud-frame" aria-hidden="true">
      <span class="hud-corner top-left"></span>
      <span class="hud-corner top-right"></span>
      <span class="hud-corner bottom-left"></span>
      <span class="hud-corner bottom-right"></span>
      <span class="hud-line hud-line-left"></span>
      <span class="hud-line hud-line-right"></span>
    </div>

    <!-- Start Button + Door Animation Overlay -->
    <app-start-button (started)="onStarted()" />

    <!-- Main Content (always rendered, animated by GSAP) -->
    <header class="header" [class.visible]="hasStarted()">
      <!-- Snake Game Background -->
      <canvas #snakeCanvas class="snake-canvas"></canvas>
      <nav class="nav container" aria-label="Primary">
        <a href="#home" class="nav-logo" (click)="scrollTo($event, 'home')">Tamilvanan</a>
        <button
          type="button"
          class="nav-toggle"
          aria-label="Toggle navigation"
          [attr.aria-expanded]="mobileNavOpen()"
          (click)="toggleMobileNav()">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="nav-links" [class.open]="mobileNavOpen()">
          <li><a href="#about" [class.active]="activeSection() === 'about'" (click)="scrollTo($event, 'about'); closeMobileNav()">About</a></li>
          <li><a href="#skills" [class.active]="activeSection() === 'skills'" (click)="scrollTo($event, 'skills'); closeMobileNav()">Skills</a></li>
          <li><a href="#projects" [class.active]="activeSection() === 'projects'" (click)="scrollTo($event, 'projects'); closeMobileNav()">Work</a></li>
          <li><a href="#testimonials" [class.active]="activeSection() === 'testimonials'" (click)="scrollTo($event, 'testimonials'); closeMobileNav()">Reviews</a></li>
          <li><a href="#experience" [class.active]="activeSection() === 'experience'" (click)="scrollTo($event, 'experience'); closeMobileNav()">Timeline</a></li>
          <li><a href="#contact" [class.active]="activeSection() === 'contact'" (click)="scrollTo($event, 'contact'); closeMobileNav()">Contact</a></li>
        </ul>
        <div class="nav-actions">
          <a class="nav-link" href="/assets/Tamilvanan_Resume.pdf" download>Resume</a>
          <a class="nav-cta" href="#contact" (click)="scrollTo($event, 'contact')">Hire Me</a>
        </div>
      </nav>
    </header>

    <main id="main">
      <app-hero />
      <app-about />
      <app-skills />
      <app-projects />
      <app-testimonials />
      <app-experience />
      <app-contact />
    </main>

    <a class="sticky-cta" href="#contact" (click)="scrollTo($event, 'contact')">Hire Me</a>
    @if (showBackToTop()) {
      <button class="back-to-top" type="button" (click)="scrollToTop()" aria-label="Back to top">
        ↑
      </button>
    }

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} Tamilvanan. Built with Angular.</p>
      </div>
    </footer>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: rgba(10, 10, 15, 0.6);
      backdrop-filter: blur(4px);
      border-bottom: 1px solid rgba(59, 130, 246, 0.3);
      opacity: 0;
      transform: translateY(-20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
      overflow: hidden;
    }

    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--color-accent), #10b981);
      z-index: 200;
      width: 0%;
      transition: width 0.1s linear;
    }

    .skip-link {
      position: fixed;
      top: -40px;
      left: 1rem;
      background: var(--color-accent);
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      z-index: 300;
      text-decoration: none;
      transition: top 0.2s ease;
    }

    .skip-link:focus {
      top: 1rem;
    }

    .hud-frame {
      position: fixed;
      inset: 16px;
      border: 1px solid rgba(59, 130, 246, 0.18);
      pointer-events: none;
      z-index: 50;
      box-shadow: 0 0 40px rgba(59, 130, 246, 0.08);
      background:
        linear-gradient(90deg, rgba(59, 130, 246, 0.08), transparent 30%, transparent 70%, rgba(59, 130, 246, 0.08));
    }

    .hud-corner {
      position: absolute;
      width: 24px;
      height: 24px;
      border: 2px solid rgba(59, 130, 246, 0.4);
    }

    .hud-corner.top-left {
      top: -2px;
      left: -2px;
      border-right: none;
      border-bottom: none;
    }

    .hud-corner.top-right {
      top: -2px;
      right: -2px;
      border-left: none;
      border-bottom: none;
    }

    .hud-corner.bottom-left {
      bottom: -2px;
      left: -2px;
      border-right: none;
      border-top: none;
    }

    .hud-corner.bottom-right {
      bottom: -2px;
      right: -2px;
      border-left: none;
      border-top: none;
    }

    .hud-line {
      position: absolute;
      width: 2px;
      height: 120px;
      background: linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.6), transparent);
      opacity: 0.6;
      animation: hudPulse 3s ease-in-out infinite;
    }

    .hud-line-left {
      left: 6px;
      top: 40%;
    }

    .hud-line-right {
      right: 6px;
      top: 20%;
    }

    @keyframes hudPulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.9; }
    }

    .header.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .snake-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
      z-index: 0;
    }

    .nav {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
    }

    .nav-logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text);
      text-decoration: none;
      cursor: pointer;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      color: var(--color-text-muted);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9375rem;
      transition: color 0.2s ease;
      cursor: pointer;
    }

    .nav-links a:hover {
      color: var(--color-accent);
    }

    .nav-links a.active {
      color: var(--color-accent);
    }

    .nav-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .nav-link {
      color: var(--color-text-muted);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.875rem;
    }

    .nav-cta {
      padding: 0.5rem 1rem;
      background: var(--color-accent);
      color: white;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.875rem;
      box-shadow: 0 0 18px rgba(59, 130, 246, 0.45);
    }

    .nav-toggle {
      display: none;
      background: transparent;
      border: none;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;
    }

    .nav-toggle span {
      width: 22px;
      height: 2px;
      background: var(--color-text);
      display: block;
    }

    main {
      padding-top: 60px;
    }

    .sticky-cta {
      position: fixed;
      right: 1.5rem;
      bottom: 1.5rem;
      background: var(--color-accent);
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(59, 130, 246, 0.5);
      z-index: 120;
    }

    .back-to-top {
      position: fixed;
      right: 1.5rem;
      bottom: 4.5rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--color-border);
      background: var(--color-bg-alt);
      color: var(--color-text);
      cursor: pointer;
      z-index: 120;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .back-to-top:hover {
      transform: translateY(-2px);
      border-color: var(--color-accent);
    }

    .footer {
      padding: 2rem;
      text-align: center;
      border-top: 1px solid var(--color-border);
      color: var(--color-text-muted);
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .nav-links {
        position: absolute;
        top: 100%;
        right: 0;
        background: var(--color-bg-alt);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
        min-width: 200px;
        display: none;
      }

      .nav-links.open {
        display: flex;
      }

      .nav-actions {
        display: none;
      }

      .nav-toggle {
        display: inline-flex;
      }

      .hud-frame {
        inset: 10px;
      }
    }
  `]
})
export class AppComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly snakeCanvas = viewChild<ElementRef>('snakeCanvas');
  readonly currentYear = new Date().getFullYear();
  readonly hasStarted = signal(false);
  readonly activeSection = signal('home');
  readonly mobileNavOpen = signal(false);
  readonly scrollProgress = signal(0);
  readonly showBackToTop = signal(false);

  private sectionObserver: IntersectionObserver | null = null;
  private readonly sectionIds = ['home', 'about', 'skills', 'projects', 'testimonials', 'experience', 'contact'];

  // Snake game properties
  private snakeGameInterval: any = null;
  private snakeCtx: CanvasRenderingContext2D | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private canvasMetrics = { width: 0, height: 0, dpr: 1 };
  private snake: { x: number; y: number }[] = [];
  private food: { x: number; y: number } = { x: 0, y: 0 };
  private direction: { x: number; y: number } = { x: 1, y: 0 };
  private readonly gridSize = 8;

  constructor() {
    afterNextRender(() => {
      // Disable default smooth scroll to let GSAP handle it
      document.documentElement.style.scrollBehavior = 'auto';
      this.setupScrollTracking();
      this.setupSectionObserver();
      this.setupKeyboardNavigation();
    });
  }

  onStarted(): void {
    this.hasStarted.set(true);
    // Start snake game after a short delay
    setTimeout(() => this.startSnakeGame(), 500);
  }

  toggleMobileNav(): void {
    this.mobileNavOpen.update(value => !value);
  }

  closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }

  private setupScrollTracking(): void {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      this.scrollProgress.set(Math.min(100, Math.max(0, progress)));
      this.showBackToTop.set(scrollTop > 500);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
    });
  }

  private setupSectionObserver(): void {
    const sections = this.sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          this.activeSection.set(visible.target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0.1, 0.3, 0.6] }
    );

    sections.forEach(section => this.sectionObserver?.observe(section));

    this.destroyRef.onDestroy(() => {
      this.sectionObserver?.disconnect();
      this.sectionObserver = null;
    });
  }

  private setupKeyboardNavigation(): void {
    const onKeyDown = (event: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      const tag = active?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || active?.isContentEditable) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const currentIndex = this.sectionIds.indexOf(this.activeSection());
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        const next = this.sectionIds[Math.min(this.sectionIds.length - 1, currentIndex + 1)];
        this.scrollToId(next);
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        const prev = this.sectionIds[Math.max(0, currentIndex - 1)];
        this.scrollToId(prev);
      } else if (event.key === 'Home') {
        event.preventDefault();
        this.scrollToId(this.sectionIds[0]);
      } else if (event.key === 'End') {
        event.preventDefault();
        this.scrollToId(this.sectionIds[this.sectionIds.length - 1]);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('keydown', onKeyDown);
    });
  }

  scrollToTop(): void {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0, offsetY: 0 },
      ease: 'power3.inOut'
    });
  }

  private startSnakeGame(): void {
    const canvas = this.snakeCanvas()?.nativeElement as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.snakeCtx = ctx;

    // Set canvas size to match header (respect device pixel ratio)
    this.setupSnakeCanvas(canvas);

    // Initialize snake in the middle
    const startY = Math.floor(this.canvasMetrics.height / this.gridSize / 2);
    this.snake = [
      { x: 10, y: startY },
      { x: 9, y: startY },
      { x: 8, y: startY },
      { x: 7, y: startY },
      { x: 6, y: startY }
    ];
    this.direction = { x: 1, y: 0 };
    this.spawnFood(canvas);

    // Start game loop
    this.snakeGameInterval = setInterval(() => this.updateSnakeGame(), 80);

    // Handle resize with ResizeObserver for accurate canvas sizing
    this.resizeObserver = new ResizeObserver(() => {
      this.setupSnakeCanvas(canvas);
    });
    this.resizeObserver.observe(canvas);

    this.destroyRef.onDestroy(() => {
      if (this.snakeGameInterval) {
        clearInterval(this.snakeGameInterval);
      }
      this.resizeObserver?.disconnect();
      this.resizeObserver = null;
    });
  }

  private setupSnakeCanvas(canvas: HTMLCanvasElement): void {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    this.canvasMetrics = { width, height, dpr };

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (this.snakeCtx) {
      this.snakeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  private spawnFood(canvas: HTMLCanvasElement): void {
    const maxX = Math.floor(this.canvasMetrics.width / this.gridSize);
    const maxY = Math.floor(this.canvasMetrics.height / this.gridSize);
    this.food = {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    };
  }

  private updateSnakeGame(): void {
    const canvas = this.snakeCanvas()?.nativeElement as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = this.snakeCtx;
    if (!ctx) return;

    if (this.canvasMetrics.width === 0 || this.canvasMetrics.height === 0) {
      return;
    }

    const maxX = Math.floor(this.canvasMetrics.width / this.gridSize);
    const maxY = Math.floor(this.canvasMetrics.height / this.gridSize);

    // Move snake
    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y
    };

    // Wrap around edges
    if (head.x >= maxX) head.x = 0;
    if (head.x < 0) head.x = maxX - 1;
    if (head.y >= maxY) head.y = 0;
    if (head.y < 0) head.y = maxY - 1;

    this.snake.unshift(head);

    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.spawnFood(canvas);
      // Random direction change
      if (Math.random() > 0.5) {
        const dirs = [
          { x: 1, y: 0 }, { x: -1, y: 0 },
          { x: 0, y: 1 }, { x: 0, y: -1 }
        ].filter(d => !(d.x === -this.direction.x && d.y === -this.direction.y));
        this.direction = dirs[Math.floor(Math.random() * dirs.length)];
      }
    } else {
      this.snake.pop();
    }

    // Keep snake length reasonable
    if (this.snake.length > 20) {
      this.snake.pop();
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake with glow
    this.snake.forEach((segment, i) => {
      const alpha = 0.8 - (i / this.snake.length) * 0.5;
      ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
      ctx.shadowColor = 'rgba(59, 130, 246, 0.6)';
      ctx.shadowBlur = i === 0 ? 8 : 4;
      ctx.fillRect(
        segment.x * this.gridSize + 1,
        segment.y * this.gridSize + 1,
        this.gridSize - 2,
        this.gridSize - 2
      );
    });

    // Draw food
    ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(
      this.food.x * this.gridSize + this.gridSize / 2,
      this.food.y * this.gridSize + this.gridSize / 2,
      this.gridSize / 2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();

    const element = document.getElementById(sectionId);
    if (!element) return;

    // Update active section
    this.activeSection.set(sectionId);

    // GSAP smooth scroll animation
    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: element,
        offsetY: 80 // Header offset
      },
      ease: 'power3.inOut'
    });
  }

  private scrollToId(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (!element) return;

    this.activeSection.set(sectionId);
    gsap.to(window, {
      duration: 1.0,
      scrollTo: {
        y: element,
        offsetY: 80
      },
      ease: 'power3.inOut'
    });
  }
}
