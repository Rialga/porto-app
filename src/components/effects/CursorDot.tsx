import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CursorDot — subtle accent dot that follows the pointer.
 * - Hidden on touch / coarse pointers and on reduced motion
 * - Scales up when hovering interactive elements (a, button)
 */
export function CursorDot() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 400, damping: 32, mass: 0.5 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on fine pointers, no reduced motion
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest('a, button, [role="button"]');
      setHovering(isInteractive);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          scale: hovering ? 2.2 : 1,
          opacity: hovering ? 0.9 : 0.55,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="h-2 w-2 rounded-full bg-[var(--accent)] mix-blend-difference"
      />
    </motion.div>
  );
}