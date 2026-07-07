/**
 * Shared motion recipes. Easing + variants kept in one place so every
 * component stays consistent.
 */

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT_CUBIC: [number, number, number, number] = [0.65, 0, 0.35, 1]

/** Fade + slide up, used everywhere a block reveals. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

/** Fade only. */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

/** Fade + small slide-up, for chips / small elements. */
export const fadeUpSmall = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
}

/** Container that staggers its visible children. */
export const staggerContainer = (delay = 0.06, initialDelay = 0.05) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
      delayChildren: initialDelay,
    },
  },
})

/** Common viewport options for `whileInView`. */
export const inViewOnce = { once: true, amount: 0.3 } as const
export const inViewSoft = { once: true, amount: 0.15 } as const