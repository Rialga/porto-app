import { cn } from '@/lib/utils'

interface DotGridProps {
  className?: string
  /** Fade edges to transparent. */
  masked?: boolean
}

/**
 * Decorative dot-grid background. Pure CSS — no DOM nodes, no images.
 */
export const DotGrid = ({ className, masked = true }: DotGridProps) => (
  <div
    aria-hidden
    className={cn(
      'bg-dot-grid pointer-events-none',
      masked &&
        '[mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black_25%,transparent_85%)]',
      className,
    )}
  />
)