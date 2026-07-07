import { useEffect, useRef, useState } from 'react'

interface UseScrollDirectionOptions {
  /** Pixels of movement required to flip state. */
  threshold?: number
  /** Initial direction; flips once threshold is exceeded. */
  initial?: 'up' | 'down'
}

/**
 * Returns the current vertical scroll direction (`'up' | 'down'`).
 * Used by the sticky header to hide-on-scroll-down, show-on-scroll-up.
 */
export const useScrollDirection = (
  options: UseScrollDirectionOptions = {},
): 'up' | 'down' => {
  const { threshold = 6, initial = 'up' } = options
  const [direction, setDirection] = useState<'up' | 'down'>(initial)
  const lastY = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    lastY.current = window.scrollY

    const update = () => {
      const y = window.scrollY
      const diff = y - lastY.current
      if (Math.abs(diff) < threshold) return
      setDirection(diff > 0 ? 'down' : 'up')
      lastY.current = y
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [threshold])

  return direction
}