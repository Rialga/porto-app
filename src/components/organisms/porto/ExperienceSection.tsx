import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Heading, Text, Badge } from '@/components/atoms'
import { experiences } from '@/lib/constant'

export default function ExperienceSection() {
  const headingRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  // Heading: fade + scale on entry
  const { scrollYProgress: hProgress } = useScroll({
    target: headingRef,
    offset: ['start 90%', 'start 50%'],
  })
  const hSmooth = useSpring(hProgress, { stiffness: 100, damping: 24 })
  const hY = useTransform(hSmooth, [0, 1], [40, 0])
  const hOpacity = useTransform(hSmooth, [0, 1], [0, 1])
  const hScale = useTransform(hSmooth, [0, 1], [0.95, 1])

  // Timeline line: drawn as you scroll the section
  const { scrollYProgress: lineProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 30%'],
  })
  const lineSmooth = useSpring(lineProgress, { stiffness: 100, damping: 28, mass: 0.3 })
  const lineHeight = useTransform(lineSmooth, [0, 1], ['0%', '100%'])

  return (
    <section ref={sectionRef} id="experience" className="section container">
      <motion.div
        ref={headingRef}
        className="text-center mb-12"
        style={{ y: hY, opacity: hOpacity, scale: hScale }}
      >
        <Heading level={2}>Work Experience</Heading>
        <Text size="lg" color="muted" className="mt-4 max-w-2xl mx-auto">
          A timeline of my professional journey and career progression in frontend development.
        </Text>
      </motion.div>

      <div className="max-w-3xl mx-auto relative">
        <div aria-hidden className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />
        <motion.div
          aria-hidden
          className="absolute left-[7px] top-2 w-0.5 bg-accent origin-top"
          style={{ height: lineHeight }}
        />

        <ul className="space-y-10">
          {experiences.map(exp => (
            <ExperienceItem key={exp.id} {...exp} />
          ))}
        </ul>
      </div>
    </section>
  )
}

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

function ExperienceItem({
  title,
  company,
  period,
  description,
  technologies,
}: ExperienceItemProps) {
  const ref = useRef<HTMLLIElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'center 55%'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 24 })
  const y = useTransform(smooth, [0, 1], [40, 0])
  const opacity = useTransform(smooth, [0, 0.5, 1], [0, 0.6, 1])
  const dotScale = useTransform(smooth, [0, 0.5, 1], [0.6, 1.1, 1])
  const dotBg = useTransform(
    smooth,
    [0, 0.5, 1],
    ['rgb(189,189,189)', 'rgb(244,162,97)', 'rgb(244,162,97)'],
  )

  return (
    <motion.li ref={ref} style={{ y, opacity }} className="relative pl-10">
      <motion.span
        aria-hidden
        className="absolute left-0 top-2 w-4 h-4 rounded-full ring-4 ring-background"
        style={{ backgroundColor: dotBg, scale: dotScale }}
      />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1">
        <Heading level={3} className="text-xl md:text-2xl!">
          {title}
        </Heading>
        <Text size="sm" color="muted" weight="medium" className="md:text-right">
          {period}
        </Text>
      </div>
      <Text size="base" weight="semibold" className="text-accent mb-2">
        {company}
      </Text>
      <Text size="base" color="muted" className="mb-3">
        {description}
      </Text>
      <div className="flex flex-wrap gap-2">
        {technologies.map(tech => (
          <Badge key={tech} variant="secondary" size="sm">
            {tech}
          </Badge>
        ))}
      </div>
    </motion.li>
  )
}