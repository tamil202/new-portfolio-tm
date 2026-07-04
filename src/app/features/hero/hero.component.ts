import {
  Component,
  ElementRef,
  afterNextRender,
  viewChild,
  inject,
  DestroyRef,
  signal
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { PortfolioStore } from '@core/data/portfolio.store';
import { prefersReducedMotion } from '@shared/utils/motion.utils';

gsap.registerPlugin(ScrollToPlugin, TextPlugin);

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero" id="home">
      <!-- Floating Particles -->
      <div class="particles" #particles>
        @for (i of particleCount; track i) {
          <div class="particle"></div>
        }
      </div>

      <!-- Scanline Overlay -->
      <div class="scanlines"></div>

      <!-- Grid Background -->
      <div class="grid-bg"></div>

      <div class="hero-content">
        <div class="hero-badge" #badge>
          <span class="badge-dot"></span>
          <span class="badge-text">ARCHITECT ONLINE</span>
        </div>

        <!-- Glitch Name -->
        <h1 #name class="hero-name glitch" data-text="Thirumurugan Gnanam">
          <span class="glitch-text">Thirumurugan Gnanam</span>
        </h1>

        <!-- Typing Role -->
        <h2 #role class="hero-role">
          <span class="role-prefix">&gt;</span>
          <span #roleText class="role-text"></span>
          <span class="cursor">_</span>
        </h2>

        <p #intro class="hero-intro">
          Leading IT infrastructure, cloud, database, and security programs across AWS, Azure, and GCP — with 20+ years driving FinOps savings, compliance, and production reliability.
        </p>

        <div #cta class="hero-cta">
          <a href="#projects" class="btn btn-primary cyber-btn" (click)="scrollTo($event, 'projects')">
            <span class="btn-glitch" data-text="View Architecture Work">View Architecture Work</span>
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
          <a href="#contact" class="btn btn-secondary cyber-btn" (click)="scrollTo($event, 'contact')">
            <span class="btn-glitch" data-text="Connect on Architecture">Connect on Architecture</span>
          </a>
          <a href="/assets/Thirumurugan-Gnanam-Resume.pdf" class="btn btn-secondary cyber-btn" download>
            <span class="btn-glitch" data-text="Download Resume">Download Resume</span>
          </a>
        </div>

        <div class="hero-badges" #badges>
          <span class="badge-pill">Cloud & FinOps</span>
          <span class="badge-pill">Database Architecture</span>
          <span class="badge-pill">Security & Compliance</span>
        </div>

        <!-- Stats HUD -->
        <div #hud class="hero-hud">
          <div class="hud-item">
            <span class="hud-label">EXP</span>
            <div class="hud-bar">
              <div class="hud-fill" style="width: 75%"></div>
            </div>
          </div>
          <div class="hud-item">
            <span class="hud-label">SKILL</span>
            <div class="hud-bar">
              <div class="hud-fill" style="width: 90%"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-decoration">
        <div class="decoration-ring" #ring1></div>
        <div class="decoration-ring ring-2" #ring2></div>
        <div class="decoration-ring ring-3" #ring3></div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }

    /* Floating Particles */
    .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--color-accent);
      border-radius: 50%;
      opacity: 0;
      animation: float-particle 15s infinite linear;
    }

    @for $i from 1 through 30 {
      .particle:nth-child(#{$i}) {
        left: calc(#{$i * 3.33}% - 1.5%);
        top: #{random(100)}%;
        animation-delay: #{$i * -0.5}s;
        animation-duration: #{10 + random(10)}s;
      }
    }

    @keyframes float-particle {
      0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(-100vh) scale(1);
        opacity: 0;
      }
    }

    /* Scanlines */
    .scanlines {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.1) 2px,
        rgba(0, 0, 0, 0.1) 4px
      );
      opacity: 0.3;
      z-index: 10;
    }

    /* Grid Background */
    .grid-bg {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
    }

    .hero-content {
      max-width: 800px;
      text-align: center;
      position: relative;
      z-index: 5;
    }

    /* Badge */
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 4px;
      margin-bottom: 1.5rem;
      font-size: 0.75rem;
      color: #10b981;
      font-family: 'Courier New', monospace;
      letter-spacing: 0.15em;
      opacity: 0;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      animation: pulse-dot 1s ease-in-out infinite;
      box-shadow: 0 0 10px #10b981;
    }

    @keyframes pulse-dot {
      0%, 100% { opacity: 1; box-shadow: 0 0 10px #10b981; }
      50% { opacity: 0.5; box-shadow: 0 0 20px #10b981; }
    }

    /* Glitch Name Effect */
    .hero-name {
      font-size: clamp(2.5rem, 8vw, 4.5rem);
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 0.5rem;
      line-height: 1.1;
      opacity: 0;
      letter-spacing: -0.02em;
      position: relative;
    }

    .glitch {
      position: relative;
    }

    .glitch .glitch-text {
      position: relative;
      display: inline-block;
    }

    .glitch::before,
    .glitch::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0.8;
    }

    .glitch::before {
      color: #ff00ff;
      animation: glitch-1 2s infinite linear alternate-reverse;
      clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
    }

    .glitch::after {
      color: #00ffff;
      animation: glitch-2 3s infinite linear alternate-reverse;
      clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
    }

    @keyframes glitch-1 {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-3px); }
      40% { transform: translateX(3px); }
      60% { transform: translateX(-1px); }
      80% { transform: translateX(1px); }
    }

    @keyframes glitch-2 {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(3px); }
      40% { transform: translateX(-3px); }
      60% { transform: translateX(1px); }
      80% { transform: translateX(-1px); }
    }

    /* Typing Role */
    .hero-role {
      font-size: clamp(1.25rem, 4vw, 1.75rem);
      font-weight: 500;
      color: var(--color-accent);
      margin-bottom: 1.5rem;
      opacity: 0;
      font-family: 'Courier New', monospace;
    }

    .role-prefix {
      color: #10b981;
      margin-right: 0.5rem;
    }

    .cursor {
      animation: blink 1s step-end infinite;
      color: var(--color-accent);
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    .hero-intro {
      font-size: 1.125rem;
      color: var(--color-text-muted);
      max-width: 500px;
      margin: 0 auto 2rem;
      line-height: 1.7;
      opacity: 0;
    }

    .hero-cta {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      opacity: 0;
    }

    .hero-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
      margin-top: 2rem;
      opacity: 0;
    }

    .badge-pill {
      padding: 0.4rem 0.9rem;
      border-radius: 999px;
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #10b981;
      font-size: 0.8125rem;
      letter-spacing: 0.04em;
    }

    /* Cyber Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      border-radius: 0;
      font-weight: 500;
      text-decoration: none;
      font-size: 0.9375rem;
      position: relative;
      overflow: hidden;
      clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
      transition: all 0.3s ease;
    }

    .cyber-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
    }

    .cyber-btn:hover::before {
      left: 100%;
    }

    .btn-icon {
      transition: transform 0.3s ease;
    }

    .btn:hover .btn-icon {
      transform: translate(2px, -2px);
    }

    .btn-primary {
      background: var(--color-accent);
      color: white;
      border: 2px solid var(--color-accent);
    }

    .btn-primary:hover {
      background: #2563eb;
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(255,255,255,0.1);
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: transparent;
      color: var(--color-text);
      border: 2px solid var(--color-border);
    }

    .btn-secondary:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }

    /* HUD Stats */
    .hero-hud {
      display: flex;
      gap: 2rem;
      justify-content: center;
      margin-top: 3rem;
      opacity: 0;
    }

    .hud-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .hud-label {
      font-size: 0.7rem;
      font-family: 'Courier New', monospace;
      color: var(--color-text-muted);
      letter-spacing: 0.1em;
    }

    .hud-bar {
      width: 80px;
      height: 6px;
      background: rgba(59, 130, 246, 0.2);
      border: 1px solid rgba(59, 130, 246, 0.3);
      position: relative;
      overflow: hidden;
    }

    .hud-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--color-accent), #10b981);
      box-shadow: 0 0 10px var(--color-accent);
      animation: hud-pulse 2s ease-in-out infinite;
    }

    @keyframes hud-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    /* Decorative rings */
    .hero-decoration {
      position: absolute;
      inset: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .decoration-ring {
      position: absolute;
      border: 1px solid rgba(59, 130, 246, 0.15);
      border-radius: 50%;
      opacity: 0;
    }

    .decoration-ring:nth-child(1) {
      width: 500px;
      height: 500px;
      animation: ring-rotate 30s linear infinite;
    }

    .decoration-ring:nth-child(2) {
      width: 700px;
      height: 700px;
      animation: ring-rotate 40s linear infinite reverse;
    }

    .decoration-ring:nth-child(3) {
      width: 900px;
      height: 900px;
      animation: ring-rotate 50s linear infinite;
      border-style: dashed;
    }

    @keyframes ring-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .decoration-ring:nth-child(1) { width: 350px; height: 350px; }
      .decoration-ring:nth-child(2) { width: 500px; height: 500px; }
      .decoration-ring:nth-child(3) { width: 650px; height: 650px; }
      .hero-hud { flex-direction: column; gap: 1rem; }
    }
  `]
})
export class HeroComponent {
  private readonly store = inject(PortfolioStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly currentRole = this.store.currentRole;
  readonly particleCount = Array.from({ length: 30 }, (_, i) => i);

  readonly badge = viewChild.required<ElementRef>('badge');
  readonly name = viewChild.required<ElementRef>('name');
  readonly role = viewChild.required<ElementRef>('role');
  readonly roleText = viewChild.required<ElementRef>('roleText');
  readonly intro = viewChild.required<ElementRef>('intro');
  readonly cta = viewChild.required<ElementRef>('cta');
  readonly badges = viewChild.required<ElementRef>('badges');
  readonly hud = viewChild.required<ElementRef>('hud');
  readonly ring1 = viewChild.required<ElementRef>('ring1');
  readonly ring2 = viewChild.required<ElementRef>('ring2');
  readonly ring3 = viewChild.required<ElementRef>('ring3');
  readonly particles = viewChild.required<ElementRef>('particles');

  constructor() {
    afterNextRender(() => {
      setTimeout(() => this.initAnimation(), 200);
    });
  }

  private initAnimation(): void {
    if (prefersReducedMotion()()) {
      this.showContentInstantly();
      return;
    }

    const tl = gsap.timeline();

    // Particles fade in
    tl.to(this.particles().nativeElement.querySelectorAll('.particle'), {
      opacity: 0.6,
      duration: 2,
      stagger: 0.05,
      ease: 'power2.out'
    }, 0);

    // Decorative rings
    tl.to([this.ring1().nativeElement, this.ring2().nativeElement, this.ring3().nativeElement], {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.15
    }, 0)
    .from([this.ring1().nativeElement, this.ring2().nativeElement, this.ring3().nativeElement], {
      scale: 0.5,
    }, 0);

    // Badge with glitch effect
    tl.to(this.badge().nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.3)
    .from(this.badge().nativeElement, { y: 20 }, '<');

    // Name with dramatic reveal
    tl.to(this.name().nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, 0.5)
    .from(this.name().nativeElement, { y: 50, scale: 0.9 }, '<');

    // Role typing effect
    tl.to(this.role().nativeElement, {
      opacity: 1,
      duration: 0.3
    }, 0.8)
    .to(this.roleText().nativeElement, {
      text: { value: 'Dev Manager - IT & Cloud Infrastructure', delimiter: '' },
      duration: 1.5,
      ease: 'none'
    }, 0.9);

    // Intro
    tl.to(this.intro().nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 1.2)
    .from(this.intro().nativeElement, { y: 20 }, '<');

    // CTA buttons
    tl.to(this.cta().nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 1.4)
    .from(this.cta().nativeElement, { y: 20 }, '<');

    // Availability badges
    tl.to(this.badges().nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 1.5)
    .from(this.badges().nativeElement, { y: 20 }, '<');

    // HUD
    tl.to(this.hud().nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 1.6)
    .from(this.hud().nativeElement, { y: 20 }, '<');

    this.destroyRef.onDestroy(() => {
      tl.kill();
    });
  }

  private showContentInstantly(): void {
    const elements = [
      this.badge().nativeElement,
      this.name().nativeElement,
      this.role().nativeElement,
      this.intro().nativeElement,
      this.cta().nativeElement,
      this.badges().nativeElement,
      this.hud().nativeElement,
      this.ring1().nativeElement,
      this.ring2().nativeElement,
      this.ring3().nativeElement
    ];

    elements.forEach(el => {
      el.style.opacity = '1';
    });

    this.roleText().nativeElement.textContent = 'Dev Manager - IT & Cloud Infrastructure';
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();

    const element = document.getElementById(sectionId);
    if (!element) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: element,
        offsetY: 80
      },
      ease: 'power3.inOut'
    });
  }
}
