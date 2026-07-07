import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, projectCategories, type ProjectCategory } from '@/content/projects'
import { SectionHeading } from '@/components/ui'
import { MotionReveal } from '@/components/atoms'
import { ProjectTile } from '@/components/molecules'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

export const ProjectsSection = () => {
  const [category, setCategory] = useState<ProjectCategory>('all')

  const filtered = useMemo(
    () => (category === 'all' ? projects : projects.filter(p => p.category === category)),
    [category],
  )

  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <span id="work-title">A gallery of the things I’ve shipped.</span>
          }
          lede="The projects I built or owned end-to-end. Featured tiles open into full case studies; the rest are clickable to live demos or repos."
        />

        {/* Filter chips — desktop only. Mobile shows all projects; recruiters
            view on desktop anyway and the chips cost vertical space on phones. */}
        <MotionReveal
          as="div"
          direction="up"
          delay={0.1}
          className="mt-10 hidden md:block"
        >
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {projectCategories.map(cat => {
              const active = category === cat.id
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setCategory(cat.id as ProjectCategory)}
                  className={cn(
                    'relative inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200',
                    active
                      ? 'border-foreground/40 bg-foreground text-background'
                      : 'border-border bg-surface text-muted hover:text-foreground hover:border-foreground/30',
                  )}
                >
                  {cat.label}
                  <span
                    aria-hidden
                    className={cn(
                      'inline-flex size-5 items-center justify-center rounded-full text-[10px] font-mono tabular-nums',
                      active
                        ? 'bg-background/20 text-background'
                        : 'bg-surface-2 text-muted',
                    )}
                  >
                    {cat.id === 'all'
                      ? projects.length
                      : projects.filter(p => p.category === cat.id).length}
                  </span>
                </button>
              )
            })}
          </div>
        </MotionReveal>

        {/* Grid — uniform 3-col on lg, 2-col on sm, 1-col on mobile */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectTile key={project.id} project={project} index={i + 1} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-muted">No projects in this category yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection