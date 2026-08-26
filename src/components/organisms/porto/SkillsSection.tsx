import { Heading, Text, MotionReveal } from '@/components/atoms'
import SkillBadge from '@/components/molecules/SkillBadge'
import { skillCategories } from '@/lib/constant'

export default function SkillsSection() {
  return (
    <section id="skills" className="section bg-secondary/30 rounded-2xl">
      <div className="container">
        <MotionReveal direction="up">
          <div className="text-center mb-12">
            <Heading level={2}>Skills & Expertise</Heading>
            <Text size="lg" color="muted" className="mt-4 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels across various
              technologies and domains.
            </Text>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <MotionReveal key={category.category} direction="up" delay={0.1 * (index + 1)}>
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
      </div>
    </section>
  )
}
