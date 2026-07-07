import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { measured, type RuntimeMetrics, formatRuntime } from '@/content/measured'
import { cn } from '@/lib/utils'

interface LiveMetricsProps {
  className?: string
}

/**
 * Surfaces the build-time + runtime measurements of this site as a
 * panel. Numbers come from the production build and the browser
 * Performance API — no aspirational claims.
 */
export const LiveMetrics = ({ className }: LiveMetricsProps) => {
  const reduced = useReducedMotion()
  const [runtime, setRuntime] = useState<RuntimeMetrics | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    const paint = performance.getEntriesByName('first-contentful-paint')[0] as PerformanceEntry | undefined

    if (!nav) return
    setRuntime({
      pageLoad: nav.loadEventEnd - nav.startTime,
      domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
      fcp: paint ? paint.startTime : null,
      resources: performance.getEntriesByType('resource').length,
    })
  }, [])

  const fmt = runtime ? formatRuntime(runtime) : null

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'rounded-2xl border border-border bg-surface p-6 md:p-8',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-lg border border-border-strong bg-surface-2 text-foreground">
            <Activity size={14} aria-hidden />
          </span>
          <p className="mono-caption">Measured, not assumed</p>
        </div>
        <span className="mono-caption">This build · via Performance API</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
        {measured.map(m => (
          <div key={m.id} className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
              {m.label}
            </span>
            <span className="text-2xl md:text-3xl font-semibold tabular-nums leading-none">
              {m.prefix ?? ''}
              {m.value}
              {m.suffix ?? ''}
            </span>
            <span className="text-xs text-muted leading-snug">{m.detail}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="mono-caption mb-3">Live in this tab</p>
        {fmt ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            <Cell label="DOMContentLoaded" value={fmt.domContentLoaded} />
            <Cell label="Page load" value={fmt.pageLoad} />
            <Cell label="First Contentful Paint" value={fmt.fcp} />
            <Cell label="Resources loaded" value={fmt.resources} />
          </div>
        ) : (
          <p className="text-sm text-muted">Measuring…</p>
        )}
      </div>
    </motion.div>
  )
}

const Cell = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
      {label}
    </span>
    <span className="text-2xl md:text-3xl font-semibold tabular-nums leading-none">
      {value}
    </span>
  </div>
)

export default LiveMetrics