import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface SectionLabelProps {
  number: string; // "01", "02", ...
  label: string; // "About"
  className?: string;
}

/**
 * SectionLabel — Brittany Chiang signature.
 * Numbered section header that animates from 00 → target digit
 * when scrolled into view. Mono, uppercase, accent on the digit.
 */
export function SectionLabel({ number, label, className = '' }: SectionLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? number : '00');

  useEffect(() => {
    if (inView && !reduce) {
      // Animate 00 -> target digit with a tiny count-up.
      const target = number;
      let raf = 0;
      const start = performance.now();
      const duration = 520;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        // For two-digit "01".."09" or "10".."99": count up the integer
        const targetNum = parseInt(target, 10);
        const current = Math.floor(eased * targetNum);
        setShown(current.toString().padStart(target.length, '0'));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }
  }, [inView, number, reduce]);

  return (
    <div
      ref={ref}
      className={`flex items-baseline gap-3 mono text-[11px] uppercase tracking-[0.18em] ${className}`}
    >
      <motion.span
        initial={{ opacity: 0, x: -6 }}
        animate={inView || reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-accent"
        aria-hidden
      >
        {shown}
      </motion.span>
      <span aria-hidden="true" className="h-px w-8 bg-[var(--border)] translate-y-[-2px]" />
      <motion.span
        initial={{ opacity: 0, x: -4 }}
        animate={inView || reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
        transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="text-[var(--fg-muted)]"
      >
        {label}
      </motion.span>
    </div>
  );
}