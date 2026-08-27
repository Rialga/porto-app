import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface TechTagProps {
  children: ReactNode;
  className?: string;
}

/**
 * TechTag — mono pill, subtle accent on hover.
 * Border thickens to accent, text goes accent. 200ms ease.
 */
export function TechTag({ children, className = '' }: TechTagProps) {
  return (
    <motion.span
      whileHover={{ y: -1 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={`mono inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[11px] uppercase tracking-[0.06em] text-[var(--fg-muted)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] ${className}`}
    >
      {children}
    </motion.span>
  );
}