import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'
import { fadeUp, fadeIn, inViewOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface MotionRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  className?: string
  /** When the wrapper enters the viewport. */
  amount?: number
  /** Re-animates if it scrolls back into view. */
  repeat?: boolean
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'li'
}

const directionMap = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Reveals children on enter. With reduced-motion, transforms collapse to a
 * pure opacity fade so essential content stays accessible.
 */
export const MotionReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration,
  className,
  amount = 0.2,
  repeat = false,
  as = 'div',
}: MotionRevealProps) => {
  const reduced = useReducedMotion()
  const offset = directionMap[direction]

  const variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4, delay } },
      }
    : {
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: duration ?? 0.7,
            delay,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
      }

  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={repeat ? { amount } : ({ once: true, amount } as any)}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}

// Re-export the canonical variants in case consumers want them.
export { fadeUp, fadeIn, inViewOnce }
export default MotionReveal