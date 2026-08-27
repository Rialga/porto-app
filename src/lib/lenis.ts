import Lenis from 'lenis';

/**
 * Lenis singleton — single source of truth for the smooth-scroll instance.
 *
 * Why a module-level singleton: useScrollLock (called from any modal/drawer)
 * needs to stop Lenis so wheel/touch events reach inner scroll containers.
 * Lenis is created inside SmoothScroll's mount effect, so we expose it here
 * and let both consumers share the same instance.
 */
let lenis: Lenis | null = null;

export const initLenis = (config?: ConstructorParameters<typeof Lenis>[0]): Lenis => {
  lenis = new Lenis(config);
  return lenis;
};

export const getLenis = (): Lenis | null => lenis;

export const stopLenis = (): void => {
  lenis?.stop();
};

export const startLenis = (): void => {
  lenis?.start();
};

export const destroyLenis = (): void => {
  lenis?.destroy();
  lenis = null;
};
