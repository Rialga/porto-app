import { Heading, Text, Badge, MotionReveal } from '@/components/atoms'
import { experiences } from '@/lib/constant'

export default function ExperienceSection() {
  return (
    <section id="experience" className="section container">
      <MotionReveal direction="up">
        <div className="text-center mb-12">
          <Heading level={2}>Work Experience</Heading>
          <Text size="lg" color="muted" className="mt-4 max-w-2xl mx-auto">
            A timeline of my professional journey and career progression in frontend development.
          </Text>
        </div>
      </MotionReveal>

      <div className="max-w-3xl mx-auto">
        {experiences.map((exp, index) => (
          <MotionReveal key={exp.id} direction="up" delay={0.2 * (index + 1)}>
            <div className="relative">
              {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-2 top-8 w-0.5 h-[85%] bg-border" />
              )}

              <div className="flex gap-6">
                {/* Timeline Dot */}
                <div className="relative pt-1">
                  <div className="w-4 h-4 bg-accent rounded-full ring-4 ring-background" />
                </div>

                {/* Content */}
                <div className="pb-12 flex-1">
                  <div className="mb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <Heading level={3} className="text-lg! md:text-xl!">
                        {exp.title}
                      </Heading>
                      <Text size="sm" color="muted" weight="medium">
                        {exp.period}
                      </Text>
                    </div>
                    <Text size="base" weight="semibold" className="text-accent">
                      {exp.company}
                    </Text>
                  </div>

                  <Text size="base" color="muted" className="mb-4">
                    {exp.description}
                  </Text>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                      <Badge key={tech} variant="secondary" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>
        ))}
      </div>
    </section>
  )
}
