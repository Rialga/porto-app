import { useEffect } from 'react';
import { destroyLenis, initLenis } from '@/lib/lenis';

/**
 * useScrollLock — locks page scroll while `locked` is true.
 *
 * Bulletproof lock for nested scroll containers (modal inner scroll):
 *   1. Lenis.destroy() — removes ALL wheel/touch listeners from window,
 *      removes `overflow: hidden` from html, and stops the raf loop. Lenis's
 *      wheel handler calls preventDefault() even when stopped(), so destroying
 *      is the only way to guarantee wheel events reach the modal's overflow
 *      container and trigger native browser scroll.
 *   2. body position:fixed with negative top — prevents the page from
 *      showing any scroll jump on lock/unlock.
 *
 * On unlock:
 *   - Restore body styles
 *   - Restore scroll position
 *   - Re-init Lenis so smooth scroll resumes on the page
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const body = document.body;

    // Tear down Lenis completely so its wheel listener is gone. Without
    // this, Lenis intercepts wheel events even when isStopped and the
    // modal's overflow container can't scroll.
    destroyLenis();

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';

      // Restore the page to where it was before the modal opened.
      window.scrollTo({ top: scrollY, behavior: 'auto' });

      // Re-init Lenis AFTER body is unlocked so it reattaches to the
      // scrollable document.
      const lenis = initLenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      });

      // Sync Lenis's internal scroll state to the document's actual position.
      // Without this, Lenis was instantiated while the body was position:fixed
      // (so window.scrollY was 0), and the first raf tick would tween from 0
      // down to the captured scrollY — a distracting top-to-bottom glide.
      lenis.scrollTo(scrollY, { immediate: true });

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };
  }, [locked]);
}
