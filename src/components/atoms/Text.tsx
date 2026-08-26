import React from "react"
import { cn } from '@/lib/utils'

interface TextProps {
  children: React.ReactNode
  size?: 'sm' | 'base' | 'lg' | 'xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'default' | 'muted' | 'accent'
  className?: string
}

export default function Text({
  children,
  size = 'base',
  weight = 'normal',
  color = 'default',
  className = '',
}: TextProps) {
  const sizeStyles = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  const colorStyles = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    accent: 'text-accent',
  }

  return (
    <p
      className={cn(
        'leading-relaxed',
        sizeStyles[size],
        weightStyles[weight],
        colorStyles[color],
        className,
      )}
    >
      {children}
    </p>
  )
}
