import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'ul' | 'header' | 'article';
  once?: boolean;
}

/**
 * Reveal — fade + small Y-translate on enter viewport.
 * Single shared timing: 480ms cubic-bezier. Respects prefers-reduced-motion.
 * Parent variants stagger children (used in lists).
 */
export function Reveal({
  children,
  delay = 0,
  y = 8,
  className,
  as = 'div',
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{
        duration: 0.48,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger — wraps children with parent variant so each child fades in
 * slightly after the previous one. Caps total animation under 600ms.
 */
export function Stagger({
  children,
  className,
  as = 'ul',
  stagger = 0.06,
}: {
  children: ReactNode[];
  className?: string;
  as?: 'ul' | 'div' | 'ol';
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {children.map((child, i) => (
        <motion.li
          key={i}
          className="list-none"
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {child}
        </motion.li>
      ))}
    </MotionTag>
  );
}