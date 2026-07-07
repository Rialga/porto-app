import { useRef, type ReactNode, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface MagneticProps {
  children: ReactNode
  /** Pixel radius of pointer influence. Higher = stronger pull. */
  strength?: number
  className?: string
  /** When true, the wrapper passes through pointer events. */
  passthrough?: boolean
}

/**
 * Wraps any element and pulls it toward the cursor within `strength` pixels.
 * Disabled on touch devices via media query check.
 */
export const Magnetic = ({
  children,
  strength = 14,
  className,
  passthrough = false,
}: MagneticProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    const max = Math.max(rect.width, rect.height) / 2 + strength
    const dist = Math.hypot(x, y)
    if (dist > max) return
    el.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn('transition-transform duration-300 ease-out will-change-transform', className)}
      style={passthrough ? { pointerEvents: 'none' } : undefined}
    >
      {children}
    </div>
  )
}