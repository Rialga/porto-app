import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { experiences } from '@/content/experience'
import { Badge, SectionHeading } from '@/components/ui'

export const ExperienceSection = () => {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 30%'],
  })
  const lineSmooth = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.3 })
  const lineHeight = useTransform(lineSmooth, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-title"
      className="section"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title={
            <span id="experience-title">A timeline of the work I’m proudest of.</span>
          }
          lede="Three roles, four years, and a steady shift toward senior IC work — leading frontend decisions on products used by real people every day."
        />

        <div className="mt-16 md:mt-20 relative">
          {/* Track */}
          <div
            aria-hidden
            className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-2 bottom-2 w-px bg-border"
          />
          {/* Drawn line */}
          <motion.div
            aria-hidden
            className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-2 w-px bg-accent origin-top"
            style={{ height: reduced ? '100%' : lineHeight }}
          />

          <ol className="space-y-14 md:space-y-20">
            {experiences.map((exp, i) => (
              <ExperienceItem key={exp.id} exp={exp} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

interface ExperienceItemProps {
  exp: (typeof experiences)[number]
  index: number
}

const ExperienceItem = ({ exp, index }: ExperienceItemProps) => {
  const ref = useRef<HTMLLIElement | null>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'center 55%'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 24 })
  const y = useTransform(smooth, [0, 1], [reduced ? 0 : 24, 0])
  const opacity = useTransform(smooth, [0, 1], [reduced ? 1 : 0.3, 1])
  const dotScale = useTransform(smooth, [0, 1], [reduced ? 1 : 0.6, 1])

  // Alternate left/right on desktop.
  const isEven = index % 2 === 0

  return (
    <motion.li
      ref={ref}
      style={{ y, opacity }}
      className="relative grid grid-cols-1 md:grid-cols-2 md:gap-16 pl-10 md:pl-0"
    >
      {/* Dot */}
      <motion.span
        aria-hidden
        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-3 size-4 rounded-full border-2 border-background bg-foreground shadow-[var(--shadow-sm)]"
        style={{ scale: dotScale }}
      />

      <div className={`md:col-span-1 ${isEven ? 'md:col-start-1 md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'}`}>
        <div className={`flex flex-col gap-2 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
          <span className="mono-caption">{exp.period}</span>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
            {exp.role}
          </h3>
          <p className="text-base text-accent font-medium">
            {exp.company}
            {exp.location && (
              <span className="text-muted font-normal"> · {exp.location}</span>
            )}
          </p>
        </div>

        <ul
          className={`mt-5 space-y-2 text-muted leading-relaxed ${isEven ? 'md:text-right' : ''}`}
        >
          {exp.highlights.map((h, hi) => (
            <li
              key={hi}
              className={`relative pl-5 md:pl-0 ${isEven ? 'md:before:hidden' : 'md:before:hidden'}`}
            >
              <span
                aria-hidden
                className={`absolute top-2 size-1.5 rounded-full bg-foreground/40 ${isEven ? 'md:hidden' : 'md:hidden'} left-0`}
              />
              <span aria-hidden className="md:hidden absolute left-0 top-2.5 h-px w-3 bg-foreground/30" />
              <span className={`block ${isEven ? '' : 'md:pl-0'}`}>{h}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-5 flex flex-wrap gap-1.5 ${isEven ? 'md:justify-end' : ''}`}>
          {exp.technologies.map(tech => (
            <Badge key={tech} variant="default">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.li>
  )
}

export default ExperienceSection