import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds the gradient-border treatment. */
  bordered?: boolean
  /** Surfaces an interactive hover state (lift + shadow). */
  interactive?: boolean
  children?: ReactNode
}

/**
 * Surface primitive. All cards in the app compose this so the radius,
 * border, and shadow are consistent.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, bordered, interactive, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative rounded-2xl bg-surface border border-border shadow-[var(--shadow-sm)]',
        'transition-[transform,box-shadow,border-color] duration-300 ease-out',
        interactive &&
          'hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] hover:border-border-strong cursor-pointer',
        bordered && 'gradient-border',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
)
Card.displayName = 'Card'