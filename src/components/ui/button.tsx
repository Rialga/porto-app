import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-medium tracking-tight',
    'transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    '[&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-foreground text-background hover:bg-foreground/90 hover:-translate-y-0.5 active:translate-y-0 shadow-[var(--shadow-sm)]',
        accent:
          'bg-accent text-accent-foreground hover:bg-accent/90 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_8px_24px_-12px_var(--accent-glow)]',
        outline:
          'border border-border-strong bg-transparent text-foreground hover:bg-surface-2 hover:border-foreground/30',
        ghost: 'bg-transparent text-foreground hover:bg-surface-2',
        secondary: 'bg-surface-2 text-foreground hover:bg-surface-3',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm rounded-lg [&_svg]:size-3.5',
        md: 'h-11 px-5 text-sm rounded-xl [&_svg]:size-4',
        lg: 'h-12 px-6 text-base rounded-xl [&_svg]:size-4',
        icon: 'size-10 rounded-xl [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Renders an arrow that nudges right on hover. */
  withArrow?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild,
      withArrow,
      leadingIcon,
      trailingIcon,
      children,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    // Slot requires a single React element child. When asChild is true we
    // collapse the inner spans into the children themselves.
    if (asChild) {
      return (
        <Comp ref={ref as any} className={cn(buttonVariants({ variant, size, className }))} {...props}>
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        ref={ref as any}
        type={type ?? 'button'}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {leadingIcon}
        <span>{children}</span>
        {(withArrow || trailingIcon) && (
          <span
            className="inline-flex transition-transform duration-300 ease-out group-hover:translate-x-1"
            aria-hidden
          >
            {trailingIcon ?? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12m0 0L7.5 1.5M13 7l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }