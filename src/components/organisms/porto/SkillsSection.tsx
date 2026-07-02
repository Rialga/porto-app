import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Heading, Text, MotionReveal } from '@/components/atoms'
import SkillBadge from '@/components/molecules/SkillBadge'
import { skillCategories } from '@/lib/constant'

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })

  const sectionY = useTransform(smooth, [0, 1], [80, -80])
  const sectionScale = useTransform(smooth, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.97])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section bg-secondary/30 rounded-2xl relative overflow-hidden"
    >
      <motion.div
        className="container relative"
        style={{ y: sectionY, scale: sectionScale }}
      >
        {/* Decorative drifting blob */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 w-[26rem] h-[26rem] rounded-full bg-accent/10 blur-3xl"
          style={{ y: useTransform(smooth, [0, 1], [-60, 60]) }}
        />

        <MotionReveal direction="up">
          <div className="text-center mb-12">
            <Heading level={2}>Skills &amp; Expertise</Heading>
            <Text size="lg" color="muted" className="mt-4 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels across various
              technologies and domains.
            </Text>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <MotionReveal key={category.category} direction="up" delay={0.08 * (index + 1)}>
              <div>
                <Heading level={4} className="mb-4">
                  {category.category}
                </Heading>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <SkillBadge
                      key={skill.name}
                      skill={skill.name}
                      proficiency={skill.proficiency}
                    />
                  ))}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </motion.div>
    </section>
  )
}