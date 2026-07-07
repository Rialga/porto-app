import { useEffect, useState } from 'react'

/**
 * Returns true when the user has asked for reduced motion.
 * Defaults to `false` on the server / first render to avoid mismatched SSR,
 * then updates after mount.
 */
export const useReducedMotionSafe = (): boolean => {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    // `addEventListener` is the modern path; `addListener` is the legacy fallback.
    if (mq.addEventListener) {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }
    mq.addListener(update)
    return () => mq.removeListener(update)
  }, [])

  return reduced
}