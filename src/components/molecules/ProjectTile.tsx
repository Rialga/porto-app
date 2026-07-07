import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Project } from '@/content/projects'

interface ProjectTileProps {
  project: Project
  /** 1-based index in the filtered grid — shown as a corner marker. */
  index: number
  className?: string
}

const FALLBACK_IMAGE = '/code-icon-png-0.png'
const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Project tile — uniform 4:5 card used across the work grid.
 *
 * Niche details:
 *   - Top-half cover image with a shimmer reveal that sweeps on hover.
 *   - Bottom-half content with a dark scrim for legibility on bright covers.
 *   - Corner index `01 / 10` in mono caption, top-left.
 *   - Year badge + arrow circle, top-right.
 *   - Tech tags with a gradient hairline border.
 *   - On hover: image zooms subtly, the corner index underlines,
 *     and the arrow circle fills with foreground.
 */
export const ProjectTile = ({ project, index, className }: ProjectTileProps) => {
  const reduced = useReducedMotion()
  const href = project.hasCaseStudy
    ? `/projects/${project.slug}`
    : project.liveUrl || project.githubUrl || '#'
  const isInternal = href.startsWith('/')

  const inner = (
    <motion.article
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface',
        'transition-[border-color,box-shadow] duration-300',
        'hover:border-foreground/30 hover:shadow-[var(--shadow-md)]',
        className,
      )}
    >
      {/* Cover image — 4:3 of the card */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={e => {
            const el = e.currentTarget
            if (!el.dataset.fallback) {
              el.dataset.fallback = '1'
              el.src = project.image
            } else {
              el.src = FALLBACK_IMAGE
            }
          }}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* Bottom scrim — keeps the corner overlay legible on bright covers. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent"
        />

        {/* Shimmer reveal — diagonal sweep on hover. */}
        {!reduced && <ShimmerSweep />}

        {/* Top-left index */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-2 py-0.5 font-mono text-[10px] tracking-wider text-white/85 backdrop-blur">
          <span className="tabular-nums">{String(index).padStart(2, '0')}</span>
        </span>

        {/* Top-right cluster: year + arrow */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-2 py-0.5 font-mono text-[10px] tracking-wider text-white/85 backdrop-blur">
            {project.year}
          </span>
          <span
            aria-hidden
            className={cn(
              'inline-flex size-7 items-center justify-center rounded-full border border-white/25 bg-background/80 backdrop-blur transition-all duration-300',
              'group-hover:bg-foreground group-hover:text-background group-hover:border-foreground',
              'group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
            )}
          >
            <ArrowUpRight size={13} />
          </span>
        </span>

        {/* Featured ribbon */}
        {project.featured && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase text-accent backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent" />
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <p className="mono-caption">{project.subtitle}</p>
        <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
          {project.title}
        </h3>

        {/* Tech tags with gradient hairline border */}
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {project.technologies.slice(0, 4).map(tech => (
            <li
              key={tech}
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] tracking-wider uppercase text-muted',
                'gradient-border bg-surface-2/40',
              )}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )

  if (isInternal) {
    return (
      <Link
        to={href}
        className="block h-full focus-visible:outline-none"
        aria-label={`Open case study: ${project.title}`}
      >
        {inner}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
      aria-label={`Open ${project.title}`}
    >
      {inner}
    </a>
  )
}

/**
 * Shimmer sweep overlay — diagonal light line that travels across the
 * cover image on hover. Pure CSS, no JS.
 */
const ShimmerSweep = () => (
  <>
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    >
      <div className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer-sweep_1.1s_cubic-bezier(0.16,1,0.3,1)_forwards]" />
    </div>
    <style>{`
      @keyframes shimmer-sweep {
        0%   { transform: translateX(0); }
        100% { transform: translateX(420%); }
      }
    `}</style>
  </>
)

export default ProjectTile