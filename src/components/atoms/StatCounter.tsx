import { useState } from 'react'
import { useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'

interface StatCounterProps {
  /** Final value to count up to. */
  value: number
  /** Optional suffix (e.g. "+", "%"). */
  suffix?: string
  /** Label shown under the number. */
  label: string
  /** 0..1 motion value that drives the count-up. */
  progress: MotionValue<number>
  /** When progress reaches this value the counter should be at `value`. Default: 0.4. */
  reachAt?: number
  /** Optional className. */
  className?: string
}

/**
 * Count-up stat that reacts to a 0..1 progress motion value.
 * Used in both the Hero strip and the Footer CTA row.
 */
export default function StatCounter({
  value,
  suffix = '',
  label,
  progress,
  reachAt = 0.4,
  className = '',
}: StatCounterProps) {
  const n = useTransform(progress, [0, reachAt], [0, value])
  const [display, setDisplay] = useState(0)
  useMotionValueEvent(n, 'change', latest => {
    setDisplay(Math.round(latest))
  })
  return (
    <div className={className}>
      <div className="text-4xl md:text-5xl font-bold tabular-nums leading-none">
        {display}
        {suffix}
      </div>
      <div className="text-xs md:text-sm tracking-[0.2em] uppercase opacity-60 mt-2">
        {label}
      </div>
    </div>
  )
}