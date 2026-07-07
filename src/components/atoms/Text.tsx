import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'body' | 'lede' | 'small' | 'mono'
type Tone = 'default' | 'muted' | 'subtle' | 'accent'

interface TextProps {
  children: ReactNode
  variant?: Variant
  tone?: Tone
  as?: 'p' | 'span' | 'div'
  className?: string
}

const variantClass: Record<Variant, string> = {
  body: 'text-base leading-relaxed',
  lede: 'text-lg md:text-xl leading-relaxed',
  small: 'text-sm leading-relaxed',
  mono: 'font-mono text-xs uppercase tracking-[0.18em]',
}

const toneClass: Record<Tone, string> = {
  default: 'text-foreground',
  muted: 'text-muted',
  subtle: 'text-muted-2',
  accent: 'text-accent',
}

export const Text = ({
  children,
  variant = 'body',
  tone = 'default',
  as = 'p',
  className,
}: TextProps) => {
  const Tag = as
  return <Tag className={cn(variantClass[variant], toneClass[tone], className)}>{children}</Tag>
}

export default Text