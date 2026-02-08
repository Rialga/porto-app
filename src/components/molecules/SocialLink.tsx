import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

interface SocialLinkProps {
  type: 'github' | 'linkedin' | 'email' | 'website'
  href: string
  label: string
}

export default function SocialLink({ type, href, label }: SocialLinkProps) {
  const icons = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    website: ExternalLink,
  }

  const Icon = icons[type]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-200"
      aria-label={label}
    >
      <Icon size={20} />
      <span className="text-sm">{label}</span>
    </a>
  )
}
