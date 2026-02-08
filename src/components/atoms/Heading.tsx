import React from "react"
import { cn } from '@/lib/utils'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

export default function Heading({ level, children, className = '' }: HeadingProps) {
  const levelStyles = {
    1: 'text-4xl md:text-5xl font-bold',
    2: 'text-3xl md:text-4xl font-bold',
    3: 'text-2xl md:text-3xl font-bold',
    4: 'text-xl md:text-2xl font-bold',
    5: 'text-lg md:text-xl font-semibold',
    6: 'text-base md:text-lg font-semibold',
  }

  const Element = `h${level}` as const

  return (
    <Element className={cn('text-foreground', levelStyles[level], className)}>
      {children}
    </Element>
  )
}
