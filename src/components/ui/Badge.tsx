import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'outline' | 'accent' | 'mono' | 'success'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-2 text-foreground border border-transparent',
  outline: 'bg-transparent text-foreground border border-border-strong',
  accent:
    'bg-accent-soft text-accent border border-transparent',
  mono: 'bg-transparent text-muted border border-border-strong font-mono tracking-wider uppercase text-[10px]',
  success:
    'bg-[color-mix(in_oklch,#10b981_14%,transparent)] text-[color-mix(in_oklch,#10b981_85%,var(--foreground))] border border-transparent',
}

export const Badge = ({ className, variant = 'default', ...rest }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
      variantClasses[variant],
      className,
    )}
    {...rest}
  />
)