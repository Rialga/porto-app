import { useState } from 'react'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge from '@/components/atoms/Badge'

interface ProjectCardProps {
  title: string
  subtitle: string
  description: string
  image?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

const FALLBACK_IMAGE = '/code-icon-png-0.png'

export default function ProjectCard({
  title,
  subtitle,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  featured = false,
}: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={cn(
        'group relative h-[380px]',
        'perspective-[1500px]',
      )}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className={cn(
          'relative h-full w-full',
          'transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          '[transform-style:preserve-3d]',
          'group-hover:[transform:rotateY(180deg)]',
          flipped && '[transform:rotateY(180deg)]',
        )}
      >
        {/* ─── FRONT ─── */}
        <div
          className={cn(
            'absolute inset-0 [backface-visibility:hidden] overflow-hidden',
            'rounded-2xl border border-border bg-background shadow-sm',
          )}
        >
          {/* Decorative hover ring — fades in on hover, surrounds the front face */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <rect
              x="2"
              y="2"
              width="96"
              height="96"
              rx="14"
              fill="none"
              stroke="#F4A261"
              strokeWidth="0.5"
              strokeDasharray="2 3"
              strokeOpacity="0.7"
            />
          </svg>

          {/* Image */}
          {image && (
            <div className="absolute inset-0">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
                onError={e => {
                  if (!e.currentTarget.dataset.fallback) {
                    e.currentTarget.dataset.fallback = '1'
                    e.currentTarget.src = image
                  } else {
                    e.currentTarget.src = FALLBACK_IMAGE
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>
          )}

          {/* Top-right arrow */}
          <span className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45 z-20">
            <ArrowUpRight size={16} />
          </span>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2">{subtitle}</p>
            <h3 className="text-2xl font-bold text-primary leading-tight">{title}</h3>
            {featured && (
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60 mt-2">
                Featured
              </p>
            )}
          </div>
        </div>

        {/* ─── BACK ─── */}
        <div
          className={cn(
            'absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]',
            'rounded-2xl border border-accent/40 bg-primary text-primary-foreground',
            'p-6 flex flex-col shadow-xl',
          )}
        >
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent text-accent-foreground self-end">
            <ArrowUpRight size={16} />
          </span>

          <h3 className="text-2xl font-bold leading-tight mt-2">{title}</h3>
          <p className="text-sm text-primary-foreground/80 leading-relaxed mt-3 mb-4">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {technologies.map(tech => (
              <Badge key={tech} variant="accent" size="sm" className="text-[10px]">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-primary-foreground/10">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:scale-105 transition-transform"
              >
                <ExternalLink size={14} />
                Live
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-foreground/30 text-primary-foreground text-sm font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                <Github size={14} />
                Code
              </a>
            )}
            {!liveUrl && !githubUrl && (
              <span className="text-primary-foreground/50 text-xs italic">
                Private project — details on request.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}