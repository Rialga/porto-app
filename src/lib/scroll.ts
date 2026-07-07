import { useRef, type RefObject } from 'react'
import { useScroll, useTransform, type MotionValue } from 'framer-motion'

type ScrollOffsetTuple = readonly [`${string} ${string}`, `${string} ${string}`]

/**
 * Returns a ref + parallax motion values for an element.
 * `distance` is pixels — positive means the element drifts slower than scroll.
 */
export const useParallax = (
  distance = 60,
  offset: ScrollOffsetTuple = ['start end', 'end start'] as ScrollOffsetTuple,
): {
  ref: RefObject<HTMLElement | null>
  y: MotionValue<number>
  opacity: MotionValue<number>
} => {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as any })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0])
  return { ref, y, opacity }
}

/** Returns a 0..1 motion value for an element's progress through the viewport. */
export const useScrollProgress = (
  offset: ScrollOffsetTuple = ['start end', 'end start'] as ScrollOffsetTuple,
): {
  ref: RefObject<HTMLElement | null>
  progress: MotionValue<number>
} => {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as any })
  return { ref, progress: scrollYProgress }
}