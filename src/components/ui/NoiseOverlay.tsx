import { cn } from '@/lib/utils'

interface NoiseOverlayProps {
  className?: string
  /** 0..1. */
  opacity?: number
}

/**
 * Static SVG-noise layer. Pointer-events disabled; mix-blend-mode overlays it
 * subtly onto whatever sits underneath. Cheap (no JS, no animation).
 */
export const NoiseOverlay = ({ className, opacity = 0.04 }: NoiseOverlayProps) => (
  <div
    aria-hidden
    className={cn('pointer-events-none bg-noise mix-blend-overlay', className)}
    style={{ opacity }}
  />
)