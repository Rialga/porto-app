import {
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion'
import { useRef, type RefObject } from 'react'

/**
 * Shared easing + scroll recipes for the scrollytelling landing page.
 * Kept in one file so all organisms stay consistent.
 */

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT_CUBIC: [number, number, number, number] = [0.65, 0, 0.35, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.1,
    },
  },
})

type ScrollOffsetTuple = readonly [`${string} ${string}`, `${string} ${string}`]

/**
 * Returns a ref + parallax motion values for any element.
 * `distance` is in pixels; positive = element moves slower than scroll.
 */
export const useParallax = (
  distance = 80,
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

/**
 * Returns a 0..1 motion value for a target ref's progress through the viewport.
 */
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
