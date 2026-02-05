import { signal, Signal } from '@angular/core';

/**
 * Creates a reactive signal that tracks user's motion preference
 * Respects prefers-reduced-motion media query for accessibility
 */
export function createReducedMotionSignal(): Signal<boolean> {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = signal(mediaQuery.matches);

  mediaQuery.addEventListener('change', (event) => {
    prefersReducedMotion.set(event.matches);
  });

  return prefersReducedMotion.asReadonly();
}

/**
 * Singleton instance for reduced motion preference
 */
let _reducedMotionSignal: Signal<boolean> | null = null;

export function prefersReducedMotion(): Signal<boolean> {
  if (!_reducedMotionSignal) {
    _reducedMotionSignal = createReducedMotionSignal();
  }
  return _reducedMotionSignal;
}

export function isLowPerfDevice(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 4;
  return memory <= 4 || cores <= 4;
}

export function motionScale(): number {
  return isLowPerfDevice() ? 0.7 : 1;
}

export function applyMotionClass(): void {
  if (isLowPerfDevice()) {
    document.documentElement.classList.add('reduce-motion-lite');
  }
}
