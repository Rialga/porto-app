import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { CaseStudy } from '@/content/case-studies'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  className?: string
}

/**
 * Editorial case-study teaser. Big number + problem statement + result line.
 * Designed to be more text-heavy than ProjectTile to signal "long-form".
 */
export const CaseStudyCard = ({ caseStudy, className }: CaseStudyCardProps) => (
  <motion.article
    whileHover={{ y: -4 }}
    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    className={cn(
      'group relative flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 md:p-8',
      'transition-[border-color,box-shadow] duration-300',
      'hover:border-foreground/30 hover:shadow-[var(--shadow-md)]',
      className,
    )}
  >
    <div className="flex items-center justify-between gap-4">
      <p className="mono-caption">Case study</p>
      <ArrowUpRight
        size={16}
        aria-hidden
        className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
      />
    </div>

    <div>
      <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-snug">
        {caseStudy.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{caseStudy.subtitle}</p>
    </div>

    <div className="space-y-4">
      <div>
        <p className="mono-caption mb-1.5">Problem</p>
        <p className="text-sm md:text-base text-muted leading-relaxed">{caseStudy.problem}</p>
      </div>
      <div>
        <p className="mono-caption mb-1.5">Result</p>
        <p className="text-sm md:text-base text-foreground leading-relaxed">{caseStudy.result}</p>
      </div>
    </div>

    <Link
      to={`/projects/${caseStudy.slug}`}
      className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-accent self-start"
    >
      Read the full case study
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  </motion.article>
)

export default CaseStudyCard