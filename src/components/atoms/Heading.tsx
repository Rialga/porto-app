import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: ReactNode
  className?: string
  id?: string
}

const sizeClass: Record<NonNullable<HeadingProps['level']>, string> = {
  1: 'display-1',
  2: 'display-2',
  3: 'text-2xl md:text-3xl font-semibold leading-tight',
  4: 'text-xl md:text-2xl font-semibold leading-snug',
  5: 'text-lg md:text-xl font-semibold',
  6: 'text-base md:text-lg font-semibold',
}

export const Heading = ({ level = 2, children, className, id }: HeadingProps) => {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return (
    <Tag id={id} className={cn('text-foreground tracking-tight', sizeClass[level], className)}>
      {children}
    </Tag>
  )
}

export default Heading