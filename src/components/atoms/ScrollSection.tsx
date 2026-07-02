import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface ScrollSectionProps {
  children: ReactNode
  /** Y-translate in pixels from start (negative) to end (positive) of the trigger range. */
  y?: [number, number]
  /** Opacity 0..1 at start, middle, end. */
  opacity?: [number, number, number]
  /** Scale 0..1+ at start, middle, end. */
  scale?: [number, number, number]
  className?: string
  /** Trigger offsets. Defaults to a generous "enter from bottom, exit to top" range. */
  offset?: [`${string} ${string}`, `${string} ${string}`]
  /** Render as a different element. */
  as?: 'div' | 'section' | 'article' | 'header' | 'footer'
}

/**
 * Declarative scroll-driven section transform.
 * Wraps any children in a motion element whose y/opacity/scale are bound to
 * its progress through the viewport.
 */
export default function ScrollSection({
  children,
  y = [40, -40],
  opacity = [0, 1, 1],
  scale,
  className = '',
  offset = ['start end', 'end start'] as const,
  as = 'div',
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as any })

  const yValue: MotionValue<number> = useTransform(scrollYProgress, [0, 1], y)
  const opacityValue: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    opacity,
  )
  const scaleValue: MotionValue<number> | undefined = scale
    ? useTransform(scrollYProgress, [0, 0.5, 1], scale)
    : undefined

  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      style={{ y: yValue, opacity: opacityValue, scale: scaleValue }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
