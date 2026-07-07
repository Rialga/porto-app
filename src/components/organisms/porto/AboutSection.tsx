import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { about } from '@/content/about'
import { Badge, SectionHeading } from '@/components/ui'
import { MotionReveal } from '@/components/atoms'
import { StatBlock } from '@/components/molecules'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

// Live metrics use the Performance API — only needed below the fold.
const LiveMetrics = lazy(() => import('@/components/atoms/LiveMetrics'))

const ABOUT_STATS = [
  { value: 3, suffix: '+', label: 'Years shipping' },
  { value: 5, suffix: '+', label: 'Projects on shared boilerplate' },
  { value: 2, prefix: '−', suffix: 's', decimals: 1, label: 'Page-load saved' },
]

export const AboutSection = () => {
  const reduced = useReducedMotion()

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={about.eyebrow}
              title={
                <span id="about-title" className="block">
                  {about.title}
                </span>
              }
              lede={about.body[0]}
            />

            <MotionReveal as="div" direction="up" delay={0.2} className="mt-8">
              <p className="text-muted leading-relaxed text-lg max-w-2xl">{about.body[1]}</p>
            </MotionReveal>

            {/* Currently focused on */}
            <MotionReveal as="div" direction="up" delay={0.3} className="mt-10">
              <p className="mono-caption mb-4">Currently focused on</p>
              <div className="flex flex-wrap gap-2">
                {about.focus.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </MotionReveal>
          </div>

          {/* Right rail — stat blocks */}
          <div className="lg:col-span-5">
            <MotionReveal as="div" direction="up" delay={0.1} className="relative">
              <div className="rounded-2xl border border-border bg-surface p-8 md:p-10">
                <p className="mono-caption mb-8">By the numbers</p>
                <div className="grid grid-cols-3 gap-6 md:gap-8">
                  {ABOUT_STATS.map(s => (
                    <StatBlock
                      key={s.label}
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals}
                      label={s.label}
                    />
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-sm text-muted leading-relaxed">
                    Based in {site.location} · open to remote-friendly engagements.
                  </p>
                </div>
              </div>

              {/* Subtle decorative glow */}
              {!reduced && (
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className={cn(
                    'absolute -inset-6 -z-10 rounded-3xl opacity-50',
                    'bg-[radial-gradient(60%_60%_at_50%_50%,var(--accent-soft),transparent)]',
                  )}
                />
              )}
            </MotionReveal>
          </div>
        </div>

        {/* Pillars */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {about.pillars.map((pillar, i) => (
            <MotionReveal
              key={pillar.title}
              as="div"
              direction="up"
              delay={i * 0.08}
              className="rounded-2xl border border-border bg-surface p-6 md:p-8 hover:border-foreground/30 transition-colors"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-muted-2 tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
              </div>
              <p className="mt-4 text-muted leading-relaxed">{pillar.body}</p>
            </MotionReveal>
          ))}
        </div>

        {/* Measured metrics */}
        <MotionReveal as="div" direction="up" delay={0.1} className="mt-20 md:mt-28">
          <Suspense fallback={<div className="h-64 rounded-2xl border border-border bg-surface" aria-hidden />}>
            <LiveMetrics />
          </Suspense>
        </MotionReveal>
      </div>
    </section>
  )
}

export default AboutSection