import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: ReactNode
  /** Seconds for one full cycle. Lower = faster. */
  speed?: number
  className?: string
  /** Reverse direction. */
  reverse?: boolean
}

/**
 * Pure CSS marquee. Pauses on hover/focus via `.animate-marquee-pause`.
 * Duplicates children so the loop is seamless.
 */
export const Marquee = ({ children, speed = 40, className, reverse }: MarqueeProps) => {
  const duration = `${speed}s`
  return (
    <div
      className={cn(
        'group animate-marquee-pause relative w-full overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div
        className={cn('animate-marquee flex w-max items-center gap-12', reverse && 'reverse')}
        style={{ animationDuration: duration }}
      >
        <div className="flex items-center gap-12 shrink-0">{children}</div>
        <div className="flex items-center gap-12 shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}