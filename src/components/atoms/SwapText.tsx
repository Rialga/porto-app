import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/scrollytelling'

interface SwapTextProps {
  /** Text shown before the trigger. */
  children: ReactNode
  /** Text shown after the trigger enters the viewport. */
  revealAs: ReactNode
  /** Trigger threshold. Default: 0.5 */
  threshold?: number
  className?: string
}

/**
 * Crossfades between two children when the wrapper enters the viewport.
 * Both layers stack in the same grid cell so layout doesn't jump.
 */
export default function SwapText({
  children,
  revealAs,
  threshold = 0.5,
  className = '',
}: SwapTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, amount: threshold })

  return (
    <span ref={ref} className={`relative inline-grid ${className}`}>
      {/* Lead text — fades out once the swap happens */}
      <motion.span
        className="col-start-1 row-start-1 [grid-area:1/1]"
        animate={{ opacity: inView ? 0 : 1, y: inView ? -8 : 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        aria-hidden={inView}
      >
        {children}
      </motion.span>

      {/* Reveal text — fades in */}
      <motion.span
        className="col-start-1 row-start-1 [grid-area:1/1]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        aria-hidden={!inView}
      >
        {revealAs}
      </motion.span>
    </span>
  )
}
