import { cn } from '@/lib/utils'

interface SkillChipProps {
  name: string
  years?: number
  /** When true the chip is slightly more prominent. */
  emphasis?: boolean
  className?: string
}

/**
 * Minimal skill chip. Proficiency is shown via subtle weight + accent ring
 * — no progress bars.
 */
export const SkillChip = ({ name, years, emphasis, className }: SkillChipProps) => (
  <span
    className={cn(
      'group inline-flex items-center gap-2 rounded-full border border-border',
      'bg-surface px-3 py-1.5 text-sm',
      'transition-[transform,border-color,background-color] duration-200 ease-out',
      'hover:-translate-y-0.5 hover:border-foreground/30',
      emphasis && 'border-foreground/30 bg-surface-2 font-medium',
      className,
    )}
  >
    <span
      aria-hidden
      className={cn(
        'inline-block size-1.5 rounded-full',
        emphasis ? 'bg-accent' : 'bg-foreground/30 group-hover:bg-accent',
        'transition-colors duration-200',
      )}
    />
    <span className="text-foreground">{name}</span>
    {typeof years === 'number' && (
      <span className="ml-1 text-muted-2 text-xs tabular-nums">{years}y</span>
    )}
  </span>
)

export default SkillChip