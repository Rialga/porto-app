import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import ProjectCard from '@/components/molecules/ProjectCard'
import { projects } from '@/lib/constant'

export default function ProjectsSection() {
  return (
    <section id="projects" className="section bg-secondary/30 rounded-2xl">
      <div className="container">
        <div className="text-center mb-12">
          <Heading level={2}>Featured Projects</Heading>
          <Text size="lg" color="muted" className="mt-4 max-w-2xl mx-auto">
            A showcase of my recent work and technical expertise across various technologies and
            project types.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
