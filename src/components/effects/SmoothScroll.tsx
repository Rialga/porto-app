import { useEffect } from 'react';
import { initLenis, destroyLenis } from '@/lib/lenis';

/**
 * SmoothScroll — initializes the singleton Lenis instance once on mount
 * and cleans up on unmount. Reduced-motion users get native scroll
 * (Lenis auto-detects prefers-reduced-motion).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = initLenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}
