import { ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, motionScale } from '../utils/motion.utils';

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  y?: number;
  x?: number;
  stagger?: number;
}

const DEFAULT_OPTIONS: AnimationOptions = {
  duration: 0.6,
  delay: 0,
  ease: 'power2.out',
  y: 30,
  x: 0,
  stagger: 0.1
};

/**
 * Creates a GSAP context for scoped animations with automatic cleanup
 */
export function createAnimationContext(scope: ElementRef): gsap.Context {
  return gsap.context(() => {}, scope.nativeElement);
}

/**
 * Fade and slide in animation for single elements
 */
export function fadeSlideIn(
  element: ElementRef | HTMLElement,
  options: AnimationOptions = {}
): gsap.core.Tween | null {
  if (prefersReducedMotion()()) {
    return null;
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };
  const target = element instanceof ElementRef ? element.nativeElement : element;
  const scale = motionScale();

  return gsap.from(target, {
    opacity: 0,
    y: (opts.y ?? 0) * scale,
    x: (opts.x ?? 0) * scale,
    duration: (opts.duration ?? 0) * scale,
    delay: opts.delay,
    ease: opts.ease
  });
}

/**
 * Staggered reveal animation for multiple elements
 */
export function staggerReveal(
  elements: HTMLElement[] | NodeListOf<Element>,
  options: AnimationOptions = {}
): gsap.core.Tween | null {
  if (prefersReducedMotion()()) {
    return null;
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };
  const scale = motionScale();

  return gsap.from(elements, {
    opacity: 0,
    y: (opts.y ?? 0) * scale,
    duration: (opts.duration ?? 0) * scale,
    delay: opts.delay,
    ease: opts.ease,
    stagger: (opts.stagger ?? 0) * scale
  });
}

/**
 * Creates a scroll-triggered animation
 */
export function scrollReveal(
  element: ElementRef | HTMLElement,
  animationFn: (target: HTMLElement) => gsap.core.Tween | gsap.core.Timeline,
  triggerOptions: ScrollTrigger.Vars = {}
): ScrollTrigger | null {
  if (prefersReducedMotion()()) {
    return null;
  }

  const target = element instanceof ElementRef ? element.nativeElement : element;

  const defaultTrigger: ScrollTrigger.Vars = {
    trigger: target,
    start: 'top 85%',
    toggleActions: 'play none none none',
    ...triggerOptions
  };

  const animation = animationFn(target);

  return ScrollTrigger.create({
    ...defaultTrigger,
    animation
  });
}

/**
 * Creates a scroll-triggered stagger animation for child elements
 */
export function scrollStaggerReveal(
  container: ElementRef | HTMLElement,
  childSelector: string,
  options: AnimationOptions = {}
): ScrollTrigger | null {
  if (prefersReducedMotion()()) {
    return null;
  }

  const target = container instanceof ElementRef ? container.nativeElement : container;
  const children = target.querySelectorAll(childSelector);
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const scale = motionScale();

  const tween = gsap.from(children, {
    opacity: 0,
    y: (opts.y ?? 0) * scale,
    duration: (opts.duration ?? 0) * scale,
    ease: opts.ease,
    stagger: (opts.stagger ?? 0) * scale,
    paused: true
  });

  return ScrollTrigger.create({
    trigger: target,
    start: 'top 85%',
    toggleActions: 'play none none none',
    animation: tween
  });
}

/**
 * Creates hover scale effect for interactive elements
 */
export function createHoverEffect(
  element: ElementRef | HTMLElement,
  scale: number = 1.02
): () => void {
  if (prefersReducedMotion()()) {
    return () => {};
  }

  const target = element instanceof ElementRef ? element.nativeElement : element;

  const onEnter = () => {
    gsap.to(target, {
      scale,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  const onLeave = () => {
    gsap.to(target, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  target.addEventListener('mouseenter', onEnter);
  target.addEventListener('mouseleave', onLeave);

  // Return cleanup function
  return () => {
    target.removeEventListener('mouseenter', onEnter);
    target.removeEventListener('mouseleave', onLeave);
    gsap.killTweensOf(target);
  };
}

/**
 * Creates a timeline for sequenced animations
 */
export function createTimeline(options: gsap.TimelineVars = {}): gsap.core.Timeline {
  return gsap.timeline(options);
}

/**
 * Kills all GSAP animations on an element
 */
export function killAnimations(element: ElementRef | HTMLElement): void {
  const target = element instanceof ElementRef ? element.nativeElement : element;
  gsap.killTweensOf(target);
}

/**
 * Refreshes all ScrollTriggers (call after layout changes)
 */
export function refreshScrollTriggers(): void {
  ScrollTrigger.refresh();
}
