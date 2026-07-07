import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { caseStudies, getCaseStudyBySlug, getProjectByCaseStudy } from '@/content/case-studies'
import { projects } from '@/content/projects'
import { Badge, Button } from '@/components/ui'
import { MotionReveal } from '@/components/atoms'
import { ProjectTile } from '@/components/molecules'
import { cn } from '@/lib/utils'
import { SEO } from '@/components/seo/SEO'
import { NotFoundPage } from './NotFoundPage'

export const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const cs = slug ? getCaseStudyBySlug(slug) : undefined
  const project = slug ? getProjectByCaseStudy(slug, projects) : undefined

  const articleRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState<string | null>(null)

  // Scrollspy — pick the section currently nearest the top quarter of the viewport.
  useEffect(() => {
    if (!cs) return
    const ids = cs.sections.map(s => s.id)
    const observers: IntersectionObserver[] = []

    ids.forEach(id => {
      const el = document.getElementById(`cs-${id}`)
      if (!el) return
      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) setActive(id)
          })
        },
        { rootMargin: '-25% 0px -65% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [cs])

  if (!cs) return <NotFoundPage />

  const related = caseStudies.filter(other => other.slug !== cs.slug).slice(0, 2)

  return (
    <>
      <SEO title={cs.title} description={cs.subtitle} path={`projects/${cs.slug}`} />

      <article ref={articleRef} className="relative">
        {/* Hero */}
        <header className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 bg-mesh opacity-60" />
          <div className="container relative pt-12 md:pt-20 pb-16 md:pb-24">
            <Link
              to="/#work"
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft
                size={14}
                aria-hidden
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Back to work
            </Link>

            <div className="mt-10 max-w-4xl">
              <p className="mono-caption">Case study · {cs.context}</p>
              <h1 className="display-2 mt-4 text-foreground">{cs.title}</h1>
              <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed">{cs.subtitle}</p>

              {project && (
                <div className="mt-10 rounded-2xl border border-border overflow-hidden bg-surface">
                  <ProjectTile project={project} index={0} className="border-0 rounded-none" />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Body — sticky TOC + sections */}
        <div className="container pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* TOC */}
            <aside className="lg:col-span-3">
              <nav aria-label="Case study sections" className="lg:sticky lg:top-28">
                <p className="mono-caption mb-4">Sections</p>
                <ul className="space-y-1.5">
                  {cs.sections.map(s => {
                    const isActive = active === s.id
                    return (
                      <li key={s.id}>
                        <a
                          href={`#cs-${s.id}`}
                          className={cn(
                            'group flex items-center gap-3 rounded-md py-1.5 pl-3 text-sm transition-colors',
                            isActive
                              ? 'text-foreground'
                              : 'text-muted hover:text-foreground',
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              'inline-block h-px transition-all duration-300',
                              isActive ? 'w-6 bg-accent' : 'w-3 bg-border-strong',
                            )}
                          />
                          <span>{s.label}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </aside>

            {/* Sections */}
            <div className="lg:col-span-9 space-y-20 md:space-y-28">
              {cs.sections.map(section => (
                <MotionReveal
                  key={section.id}
                  as="section"
                  direction="up"
                  amount={0.1}
                  className="scroll-mt-28"
                >
                  <section id={`cs-${section.id}`}>
                    <p className="mono-caption mb-3">{section.label}</p>
                    {section.kind === 'prose' && (
                      <div className="space-y-5 text-muted leading-relaxed text-lg max-w-3xl">
                        {section.body?.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    )}
                    {section.kind === 'list' && (
                      <ul className="space-y-3 max-w-3xl">
                        {section.body?.map((item, i) => (
                          <li
                            key={i}
                            className="relative pl-6 text-muted leading-relaxed text-lg"
                          >
                            <span
                              aria-hidden
                              className="absolute left-0 top-3 size-1.5 rounded-full bg-accent"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.kind === 'metrics' && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {section.metrics?.map(m => (
                          <div
                            key={m.label}
                            className="rounded-2xl border border-border bg-surface p-5"
                          >
                            <div className="text-2xl md:text-3xl font-semibold tabular-nums leading-tight">
                              {m.value}
                            </div>
                            <div className="mono-caption mt-3">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {section.kind === 'quote' && section.quote && (
                      <blockquote className="max-w-3xl border-l-2 border-accent pl-6 italic text-foreground text-xl leading-relaxed">
                        “{section.quote.text}”
                        {section.quote.attribution && (
                          <footer className="mt-4 not-italic text-sm text-muted">
                            — {section.quote.attribution}
                          </footer>
                        )}
                      </blockquote>
                    )}
                    {section.kind === 'stack' && section.stack && (
                      <div className="flex flex-wrap gap-2">
                        {section.stack.map(s => (
                          <Badge key={s} variant="outline">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </section>
                </MotionReveal>
              ))}

              {/* CTA */}
              <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="mono-caption mb-2">Next</p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                    Want to dig into the codebase?
                  </h3>
                  <p className="mt-2 text-muted max-w-xl">
                    Most of this work is private, but I’m happy to walk through the source on a call.
                  </p>
                </div>
                <Button asChild variant="primary" size="lg" withArrow>
                  <a href="/#contact">Get in touch</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24">
              <div className="flex items-end justify-between gap-4 mb-8">
                <h2 className="display-2 text-foreground">More case studies</h2>
                <Link
                  to="/#process"
                  className="hidden md:inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                  See all
                  <ArrowUpRight size={14} aria-hidden />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map(other => {
                  const otherProject = projects.find(p => p.id === other.projectId)
                  if (!otherProject) return null
                  return (
                    <Link
                      key={other.slug}
                      to={`/projects/${other.slug}`}
                      className="group"
                    >
                      <div className="rounded-2xl border border-border bg-surface overflow-hidden hover:border-foreground/30 transition-colors">
                        <ProjectTile project={otherProject} index={0} />
                        <div className="p-6">
                          <p className="mono-caption">{other.subtitle}</p>
                          <p className="mt-2 text-lg font-semibold text-foreground">{other.title}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}

export default CaseStudyPage