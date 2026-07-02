import React from "react"
import { cn } from '@/lib/utils'
import SwapText from './SwapText'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  /**
   * Optional alternate text that fades in once the heading enters the viewport.
   * Useful for swap-state section titles like MetaMask's "before/after" headings.
   */
  revealAs?: React.ReactNode
}

export default function Heading({ level, children, className = '', revealAs }: HeadingProps) {
  const levelStyles = {
    1: 'text-4xl md:text-5xl font-bold',
    2: 'text-3xl md:text-4xl font-bold',
    3: 'text-2xl md:text-3xl font-bold',
    4: 'text-xl md:text-2xl font-bold',
    5: 'text-lg md:text-xl font-semibold',
    6: 'text-base md:text-lg font-semibold',
  }

  const Element = `h${level}` as const

  const inner = revealAs ? (
    <SwapText revealAs={revealAs}>{children}</SwapText>
  ) : (
    children
  )

  return (
    <Element className={cn('text-foreground', levelStyles[level], className)}>
      {inner}
    </Element>
  )
}
