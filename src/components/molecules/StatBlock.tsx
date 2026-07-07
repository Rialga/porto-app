import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatBlockProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  /** Animation duration in seconds. Default 1.4. */
  duration?: number
  /** Decimal places to display. Default 0. */
  decimals?: number
  className?: string
}

/**
 * Counts up to `value` when the block enters the viewport. With reduced-motion,
 * renders the final value immediately so the statistic is still legible.
 */
export const StatBlock = ({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 1.4,
  decimals = 0,
  className,
}: StatBlockProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    const start = performance.now()
    let raf = 0
    const factor = Math.pow(10, decimals)
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(eased * value * factor) / factor
      setDisplay(current)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration, decimals, reduced])

  const formatted = decimals > 0 ? display.toFixed(decimals) : display.toString()

  return (
    <div ref={ref} className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-baseline gap-0.5 font-semibold leading-none tracking-tight">
        {prefix && <span className="text-2xl md:text-3xl text-muted">{prefix}</span>}
        <span className="text-4xl md:text-5xl tabular-nums">{formatted}</span>
        {suffix && <span className="text-2xl md:text-3xl text-muted">{suffix}</span>}
      </div>
      <span className="mono-caption">{label}</span>
    </div>
  )
}

export default StatBlock