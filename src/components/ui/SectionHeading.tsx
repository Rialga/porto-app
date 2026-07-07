import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: ReactNode
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
  className?: string
  /** When set, eyebrow rendered with a leading line on the left. */
  withRule?: boolean
}

/**
 * Consistent section opener: mono eyebrow + display title + optional lede.
 */
export const SectionHeading = ({
  eyebrow,
  title,
  lede,
  align = 'left',
  className,
  withRule = true,
}: SectionHeadingProps) => {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <header className={cn('flex flex-col gap-4 max-w-3xl', alignment, className)}>
      {eyebrow && (
        <div className={cn('flex items-center gap-3', withRule && 'self-stretch')}>
          {withRule && align === 'left' && (
            <span aria-hidden className="h-px flex-1 max-w-12 bg-border-strong" />
          )}
          <span className="mono-caption">{eyebrow}</span>
          {withRule && align === 'center' && (
            <span aria-hidden className="h-px w-12 bg-border-strong" />
          )}
        </div>
      )}
      <h2 className="display-2 text-foreground">{title}</h2>
      {lede && <p className="text-muted text-lg leading-relaxed max-w-2xl">{lede}</p>}
    </header>
  )
}