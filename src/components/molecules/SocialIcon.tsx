import { Github, Linkedin, Mail, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

type SocialKey = 'github' | 'linkedin' | 'email'

interface SocialIconProps {
  type?: SocialKey
  /** Override the label / href from site content. */
  href?: string
  label?: string
  className?: string
  iconSize?: number
  showLabel?: boolean
}

const iconMap: Record<SocialKey, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
}

const socialHref = (type: SocialKey): string => {
  if (type === 'github') return site.socials.find(s => s.type === 'github')!.href
  if (type === 'linkedin') return site.socials.find(s => s.type === 'linkedin')!.href
  return site.socials.find(s => s.type === 'email')!.href
}

const socialLabel = (type: SocialKey): string => {
  if (type === 'github') return 'GitHub'
  if (type === 'linkedin') return 'LinkedIn'
  return 'Email'
}

export const SocialIcon = ({
  type = 'github',
  href,
  label,
  className,
  iconSize = 16,
  showLabel = true,
}: SocialIconProps) => {
  const Icon = iconMap[type]
  const finalHref = href ?? socialHref(type)
  const finalLabel = label ?? socialLabel(type)
  const isEmail = type === 'email'

  return (
    <a
      href={finalHref}
      target={isEmail ? undefined : '_blank'}
      rel={isEmail ? undefined : 'noopener noreferrer'}
      aria-label={finalLabel}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full border border-border bg-surface',
        'px-3.5 py-2 text-sm text-foreground',
        'transition-[transform,border-color,background-color] duration-200 ease-out',
        'hover:-translate-y-0.5 hover:border-foreground/30',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <Icon size={iconSize} aria-hidden />
      {showLabel && <span>{finalLabel}</span>}
      {!showLabel && (
        <ArrowUpRight
          size={12}
          aria-hidden
          className="opacity-0 transition-opacity group-hover:opacity-70"
        />
      )}
    </a>
  )
}

export default SocialIcon