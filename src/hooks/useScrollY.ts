import { useEffect, useState } from 'react'

/**
 * Tracks `window.scrollY` reactively. Cheap; updates on every scroll event.
 */
export const useScrollY = (): number => {
  const [y, setY] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const update = () => setY(window.scrollY)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return y
}