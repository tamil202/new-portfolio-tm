import {
  Component,
  ElementRef,
  afterNextRender,
  viewChild,
  inject,
  DestroyRef,
  output,
  signal
} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-start-button',
  standalone: true,
  template: `
    <!-- Start Button Screen -->
    <div class="start-screen" [class.hidden]="isStartScreenHidden()">
      <!-- Animated Background Grid -->
      <div class="grid-bg"></div>

      <!-- Floating Particles -->
      <div class="particles-container">
        @for (i of particleCount; track i) {
          <div class="particle" [style.--delay]="i * 0.3 + 's'" [style.--x]="getRandomX(i)"></div>
        }
      </div>

      <!-- Corner Decorations -->
      <div class="corner-decor top-left"></div>
      <div class="corner-decor top-right"></div>
      <div class="corner-decor bottom-left"></div>
      <div class="corner-decor bottom-right"></div>

      <!-- Main Start Button Container -->
      <div class="start-container" #startContainer>
        <!-- Outer Rotating Ring -->
        <div class="outer-ring" #outerRing>
          <svg viewBox="0 0 200 200">
            <circle class="ring-track" cx="100" cy="100" r="95" />
            <circle class="ring-progress" #ringProgress cx="100" cy="100" r="95" />
          </svg>
        </div>

        <!-- Middle Rotating Ring -->
        <div class="middle-ring" #middleRing></div>

        <!-- Inner Button -->
        <button
          #startButton
          class="start-button"
          [class.loading]="isLoading()"
          (click)="onStart()"
          (mouseenter)="onHover(true)"
          (mouseleave)="onHover(false)"
          [disabled]="isLoading()"
          aria-label="Start">
          <span class="start-ring" #startRing></span>
          <span class="start-glow" #startGlow></span>
          <span class="button-core" #buttonCore></span>
        </button>

        <!-- Loading Progress Text -->
        <div class="loading-text" #loadingText>
          <span class="progress-value">{{ loadingProgress() }}%</span>
        </div>

        <!-- Press Start Text -->
        <div class="press-start" #pressStart [class.hidden]="isLoading()">
          <span class="press-text">PRESS</span>
          <span class="start-text">START</span>
        </div>
      </div>

      <!-- System Status -->
      <div class="system-status" #systemStatus>
        <div class="status-line">
          <span class="status-label">SYSTEM</span>
          <span class="status-value ready">READY</span>
        </div>
        <div class="status-line">
          <span class="status-label">PORTFOLIO</span>
          <span class="status-value">v1.0.0</span>
        </div>
      </div>
    </div>

    <!-- Door Overlay -->
    <div class="door-overlay" [class.hidden]="isDoorHidden()">
      <div class="door-panel door-left" #doorLeft>
        <div class="door-lines"></div>
      </div>
      <div class="door-panel door-right" #doorRight>
        <div class="door-lines"></div>
      </div>
      <div class="door-light" #doorLight></div>
    </div>
  `,
  styles: [`
    /* Start Screen */
    .start-screen {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0a0a0f;
      z-index: 1001;
      transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
      overflow: hidden;
    }

    .start-screen.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    /* Animated Grid Background */
    .grid-bg {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: gridMove 20s linear infinite;
    }

    @keyframes gridMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 50px); }
    }

    /* Floating Particles */
    .particles-container {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(59, 130, 246, 0.6);
      border-radius: 50%;
      left: var(--x);
      bottom: -10px;
      animation: floatUp 8s ease-in-out infinite;
      animation-delay: var(--delay);
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
    }

    @keyframes floatUp {
      0% {
        transform: translateY(0) scale(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
        transform: translateY(-10vh) scale(1);
      }
      90% {
        opacity: 0.6;
        transform: translateY(-90vh) scale(0.5);
      }
      100% {
        transform: translateY(-100vh) scale(0);
        opacity: 0;
      }
    }

    /* Corner Decorations */
    .corner-decor {
      position: absolute;
      width: 80px;
      height: 80px;
      border: 2px solid rgba(59, 130, 246, 0.2);
    }

    .top-left {
      top: 20px;
      left: 20px;
      border-right: none;
      border-bottom: none;
    }

    .top-right {
      top: 20px;
      right: 20px;
      border-left: none;
      border-bottom: none;
    }

    .bottom-left {
      bottom: 20px;
      left: 20px;
      border-right: none;
      border-top: none;
    }

    .bottom-right {
      bottom: 20px;
      right: 20px;
      border-left: none;
      border-top: none;
    }

    /* Start Container */
    .start-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 220px;
      height: 220px;
    }

    /* Outer Rotating Ring */
    .outer-ring {
      position: absolute;
      width: 200px;
      height: 200px;
      animation: rotateClockwise 10s linear infinite;
    }

    .outer-ring svg {
      width: 100%;
      height: 100%;
    }

    .ring-track {
      fill: none;
      stroke: rgba(59, 130, 246, 0.1);
      stroke-width: 2;
    }

    .ring-progress {
      fill: none;
      stroke: rgba(59, 130, 246, 0.6);
      stroke-width: 2;
      stroke-dasharray: 597;
      stroke-dashoffset: 597;
      stroke-linecap: round;
      transform-origin: center;
    }

    @keyframes rotateClockwise {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Middle Ring */
    .middle-ring {
      position: absolute;
      width: 160px;
      height: 160px;
      border: 1px dashed rgba(59, 130, 246, 0.3);
      border-radius: 50%;
      animation: rotateCounterClockwise 15s linear infinite;
    }

    @keyframes rotateCounterClockwise {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }

    /* Start Button */
    .start-button {
      position: relative;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: transparent;
      border: 2px solid rgba(59, 130, 246, 0.6);
      cursor: pointer;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .start-button.loading {
      cursor: default;
      border-color: rgba(59, 130, 246, 0.9);
    }

    .start-ring {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 1px solid rgba(59, 130, 246, 0.3);
      pointer-events: none;
    }

    .start-glow {
      position: absolute;
      inset: -20px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba(59, 130, 246, 0.15) 0%,
        transparent 70%
      );
      pointer-events: none;
    }

    .button-core {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(59, 130, 246, 0.8);
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
      animation: corePulse 1.5s ease-in-out infinite;
    }

    @keyframes corePulse {
      0%, 100% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.2); opacity: 1; }
    }

    .start-button::before {
      content: '';
      position: absolute;
      inset: 6px;
      border-radius: 50%;
      border: 1px solid rgba(59, 130, 246, 0.2);
    }

    /* Loading Text */
    .loading-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      opacity: 0;
    }

    .progress-value {
      font-family: 'Courier New', monospace;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-accent);
      text-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
    }

    /* Press Start Text */
    .press-start {
      position: absolute;
      bottom: -60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      animation: blink 1s ease-in-out infinite;
    }

    .press-start.hidden {
      opacity: 0;
      visibility: hidden;
    }

    .press-text {
      font-size: 0.75rem;
      letter-spacing: 0.3em;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
    }

    .start-text {
      font-size: 1.25rem;
      letter-spacing: 0.5em;
      font-weight: 700;
      color: var(--color-accent);
      text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    /* System Status */
    .system-status {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: 'Courier New', monospace;
      font-size: 0.75rem;
    }

    .status-line {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    .status-label {
      color: rgba(255, 255, 255, 0.4);
      letter-spacing: 0.1em;
    }

    .status-value {
      color: rgba(255, 255, 255, 0.6);
    }

    .status-value.ready {
      color: #10b981;
      animation: statusBlink 2s ease-in-out infinite;
    }

    @keyframes statusBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Door Overlay */
    .door-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      pointer-events: none;
      display: flex;
    }

    .door-overlay.hidden {
      display: none;
    }

    .door-panel {
      width: 50%;
      height: 100%;
      background: linear-gradient(
        180deg,
        #0d0d12 0%,
        #0a0a0f 50%,
        #0d0d12 100%
      );
      will-change: transform;
      position: relative;
      overflow: hidden;
      transform-origin: center;
    }

    .door-lines {
      position: absolute;
      inset: 0;
      background:
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 40px,
          rgba(59, 130, 246, 0.03) 40px,
          rgba(59, 130, 246, 0.03) 41px
        );
    }

    .door-left {
      border-right: 2px solid rgba(59, 130, 246, 0.3);
      transform-origin: 0 0;
    }

    .door-right {
      border-left: 2px solid rgba(59, 130, 246, 0.3);
      transform-origin: 100% 100%;
    }

    .door-light {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 4px;
      height: 0;
      background: linear-gradient(
        180deg,
        transparent,
        rgba(59, 130, 246, 0.8),
        transparent
      );
      transform: translate(-50%, -50%);
      opacity: 0;
      box-shadow: 0 0 40px 20px rgba(59, 130, 246, 0.3);
    }
  `]
})
export class StartButtonComponent {
  private readonly destroyRef = inject(DestroyRef);

  // View references
  readonly startButton = viewChild.required<ElementRef>('startButton');
  readonly startRing = viewChild.required<ElementRef>('startRing');
  readonly startGlow = viewChild.required<ElementRef>('startGlow');
  readonly buttonCore = viewChild.required<ElementRef>('buttonCore');
  readonly outerRing = viewChild.required<ElementRef>('outerRing');
  readonly ringProgress = viewChild.required<ElementRef>('ringProgress');
  readonly loadingText = viewChild.required<ElementRef>('loadingText');
  readonly pressStart = viewChild.required<ElementRef>('pressStart');
  readonly doorLeft = viewChild.required<ElementRef>('doorLeft');
  readonly doorRight = viewChild.required<ElementRef>('doorRight');
  readonly doorLight = viewChild.required<ElementRef>('doorLight');
  readonly systemStatus = viewChild.required<ElementRef>('systemStatus');

  // Output event
  readonly started = output<void>();

  // State signals
  readonly isStartScreenHidden = signal(false);
  readonly isDoorHidden = signal(false);
  readonly isLoading = signal(false);
  readonly loadingProgress = signal(0);

  // Particles
  readonly particleCount = Array.from({ length: 20 }, (_, i) => i);

  private pulseTimeline: gsap.core.Timeline | null = null;

  constructor() {
    afterNextRender(() => {
      this.initPulseAnimation();
      this.disableScroll();
    });
  }

  getRandomX(index: number): string {
    // Generate deterministic random positions based on index
    const positions = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 10, 20, 30, 40, 50, 60, 70, 80, 90, 3];
    return `${positions[index % positions.length]}%`;
  }

  private initPulseAnimation(): void {
    const button = this.startButton().nativeElement;
    const ring = this.startRing().nativeElement;
    const glow = this.startGlow().nativeElement;
    const core = this.buttonCore().nativeElement;

    // Set initial states
    gsap.set(button, { opacity: 0.8, scale: 1 });
    gsap.set(ring, { opacity: 0.4, scale: 1 });
    gsap.set(glow, { opacity: 0.6 });
    gsap.set(core, { scale: 1 });

    // Create infinite pulse timeline
    this.pulseTimeline = gsap.timeline({ repeat: -1, yoyo: true });

    this.pulseTimeline
      .to(button, {
        scale: 1.08,
        opacity: 1,
        duration: 1.2,
        ease: 'sine.inOut'
      }, 0)
      .to(ring, {
        scale: 1.15,
        opacity: 0.7,
        duration: 1.2,
        ease: 'sine.inOut'
      }, 0)
      .to(glow, {
        opacity: 1,
        scale: 1.2,
        duration: 1.2,
        ease: 'sine.inOut'
      }, 0)
      .to(core, {
        scale: 1.3,
        duration: 1.2,
        ease: 'sine.inOut'
      }, 0);

    this.destroyRef.onDestroy(() => {
      this.pulseTimeline?.kill();
    });
  }

  private disableScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private enableScroll(): void {
    document.body.style.overflow = '';
  }

  onHover(isHovering: boolean): void {
    if (this.isLoading()) return;

    const button = this.startButton().nativeElement;
    const core = this.buttonCore().nativeElement;

    if (isHovering) {
      gsap.to(button, {
        boxShadow: '0 0 60px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(59, 130, 246, 0.15)',
        borderColor: 'rgba(59, 130, 246, 1)',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(core, {
        scale: 1.5,
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)',
        duration: 0.3
      });
    } else {
      gsap.to(button, {
        boxShadow: 'none',
        borderColor: 'rgba(59, 130, 246, 0.6)',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(core, {
        scale: 1,
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
        duration: 0.3
      });
    }
  }

  onStart(): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);

    // Stop pulse animation
    this.pulseTimeline?.kill();

    const button = this.startButton().nativeElement;
    const core = this.buttonCore().nativeElement;
    const ring = this.startRing().nativeElement;
    const glow = this.startGlow().nativeElement;
    const ringProgress = this.ringProgress().nativeElement;
    const loadingText = this.loadingText().nativeElement;
    const pressStart = this.pressStart().nativeElement;
    const doorLeft = this.doorLeft().nativeElement;
    const doorRight = this.doorRight().nativeElement;
    const doorLight = this.doorLight().nativeElement;
    const systemStatus = this.systemStatus().nativeElement;

    // Hide press start text and show loading
    gsap.to(pressStart, {
      opacity: 0,
      y: 10,
      duration: 0.3
    });

    // Show loading text
    gsap.to(loadingText, {
      opacity: 1,
      duration: 0.3,
      delay: 0.2
    });

    // Hide core button
    gsap.to(core, {
      opacity: 0,
      scale: 0.5,
      duration: 0.3
    });

    // Loading progress animation
    const loadingTimeline = gsap.timeline({
      onComplete: () => {
        this.startDoorAnimation(
          button, ring, glow, loadingText,
          doorLeft, doorRight, doorLight, systemStatus
        );
      }
    });

    // Animate progress ring (SVG stroke-dashoffset)
    // Full circumference = 2 * PI * 95 = 597
    loadingTimeline.to(ringProgress, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const progress = gsap.getProperty(ringProgress, 'strokeDashoffset') as number;
        const percent = Math.round((1 - progress / 597) * 100);
        this.loadingProgress.set(percent);
      }
    });

    // Button glow effect during loading
    loadingTimeline.to(button, {
      boxShadow: '0 0 80px rgba(59, 130, 246, 0.8), inset 0 0 40px rgba(59, 130, 246, 0.2)',
      borderColor: 'rgba(59, 130, 246, 1)',
      duration: 1.5,
      ease: 'power2.inOut'
    }, 0);
  }

  private startDoorAnimation(
    button: HTMLElement,
    ring: HTMLElement,
    glow: HTMLElement,
    loadingText: HTMLElement,
    doorLeft: HTMLElement,
    doorRight: HTMLElement,
    doorLight: HTMLElement,
    systemStatus: HTMLElement
  ): void {
    // Master timeline for door sequence
    const masterTimeline = gsap.timeline({
      onComplete: () => {
        this.isDoorHidden.set(true);
        this.enableScroll();
        this.started.emit();
      }
    });

    // Step 1: Flash effect and fade out start screen elements
    masterTimeline
      .to(button, {
        scale: 1.5,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in'
      }, 0)
      .to(ring, {
        scale: 2,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in'
      }, 0)
      .to(glow, {
        scale: 3,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in'
      }, 0)
      .to(loadingText, {
        opacity: 0,
        scale: 1.2,
        duration: 0.3,
        ease: 'power2.in'
      }, 0)
      .to(systemStatus, {
        opacity: 0,
        y: 20,
        duration: 0.3
      }, 0);

    // Step 2: Hide start screen
    masterTimeline.call(() => {
      this.isStartScreenHidden.set(true);
    }, [], 0.4);

    // Step 3: Light beam effect
    masterTimeline
      .to(doorLight, {
        opacity: 1,
        height: '100vh',
        duration: 0.6,
        ease: 'power2.out'
      }, 0.5);

    // Step 4: Door opening with light
    masterTimeline
    .to(doorLeft, {
      x: '-120%',
      y: '-120%',
      duration: 1.2,
      ease: 'power3.inOut'
    }, 0.7)
    .to(doorRight, {
      x: '120%',
      y: '120%',
      duration: 1.2,
      ease: 'power3.inOut'
    }, 0.75)
      .to(doorLight, {
        opacity: 0,
        width: '100vw',
        duration: 0.8,
        ease: 'power2.out'
      }, 1.0);

    // Step 5: Content depth effect (scale in)
    const mainContent = document.querySelector('main');
    if (mainContent) {
      gsap.set(mainContent, { scale: 0.92, opacity: 0 });
      masterTimeline
        .to(mainContent, {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }, 0.9);
    }
  }
}
