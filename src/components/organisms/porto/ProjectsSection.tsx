import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Heading, Text, MotionReveal } from '@/components/atoms'
import ProjectCard from '@/components/molecules/ProjectCard'
import { projects } from '@/lib/constant'

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 })

  // Subtle parallax + scale on the section as it enters & exits
  const sectionY = useTransform(smooth, [0, 0.3, 0.7, 1], [60, 0, 0, -60])
  const sectionScale = useTransform(smooth, [0, 0.3, 0.7, 1], [0.96, 1, 1, 0.98])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section bg-secondary/30 rounded-2xl relative overflow-hidden"
    >
      <motion.div
        className="container relative"
        style={{ y: sectionY, scale: sectionScale }}
      >
        {/* Decorative concentric ring behind the heading */}
        <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[28rem] h-[28rem] opacity-30 hidden md:block">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="92" fill="none" stroke="#2F5D62" strokeOpacity="0.15" strokeWidth="1" />
            <circle cx="100" cy="100" r="74" fill="none" stroke="#2F5D62" strokeOpacity="0.1" strokeWidth="1" />
            <circle cx="100" cy="100" r="56" fill="none" stroke="#2F5D62" strokeOpacity="0.06" strokeWidth="1" />
          </svg>
        </div>

        <MotionReveal direction="up">
          <div className="text-center mb-12 relative">
            <Heading level={2}>Featured Projects</Heading>
            <Text size="lg" color="muted" className="mt-4 max-w-2xl mx-auto">
              A showcase of my recent work and technical expertise across various technologies and
              project types.
            </Text>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <MotionReveal
              key={project.id}
              direction="up"
              delay={0.08 * (index + 1)}
              className={project.featured ? 'md:col-span-2 lg:col-span-2' : ''}
            >
              <ProjectCard {...project} />
            </MotionReveal>
          ))}
        </div>
      </motion.div>
    </section>
  )
}