/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-[color,box-shadow] disabled:border-[0px] disabled:cursor-not-allowed disabled:bg-light-2 disabled:text-gray-1 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 disabled:bg-light-2 disabled:opacity-100 disabled:text-gray-1',
        'primary-flat':
          'bg-primary-100 text-primary shadow-xs hover:bg-primary hover:text-white focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        'danger-flat':
          'bg-danger-100 text-danger shadow-xs hover:bg-danger hover:text-white focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        danger:
          'bg-danger text-white shadow-xs hover:bg-danger/90 focus-visible:ring-danger/20 dark:focus-visible:ring-danger/40 disabled:bg-[var(--color-light-2)] disabled:text-[var(--color-gray-1)] disabled:opacity-100 ',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-secondary hover:text-black',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        md: 'min-h-[52px] h-[52px] px-[16px] py-[12px] has-[>svg]:px-4 min-w-[128px]',
        'toolbar-md': 'h-[44px] px-[16px] py-[12px] has-[>svg]:px-4',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

function Button({
  className = '',
  variant = 'primary',
  size = 'default',
  asChild = false,
  isLoading = false,
  children = null,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), 'cursor-pointer')}
      {...props}
      disabled={props.disabled || isLoading}
    >
      {isLoading ? <LoaderCircle className="animate-spin" /> : children}
    </Comp>
  )
}

export { Button, buttonVariants }
