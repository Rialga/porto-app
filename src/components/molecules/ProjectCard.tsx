import { ExternalLink, Github } from 'lucide-react'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

interface ProjectCardProps {
  title: string
  subtitle: string
  description: string
  image?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  featured = false,
}: ProjectCardProps) {
  return (
    <div className="group rounded-lg  border border-border overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-lg ">
      {image && (
        <div className="relative h-48 md:h-56 overflow-hidden bg-secondary">
          <img
            src={image || '/placeholder.svg'}
            alt={title}
            loading="lazy"
            className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
              featured ? 'object-cover' : 'object-fit sm:object-cover'
            }`}
            referrerPolicy="no-referrer"
            onError={e => {
              if (!e.currentTarget.dataset.fallback) {
                e.currentTarget.dataset.fallback = '1'
                e.currentTarget.src = image // retry sekali
              } else {
                e.currentTarget.src = '/code-icon-png-0.png'
              }
            }}
          />
        </div>
      )}

      <div className="p-6">
        <Heading level={3} className="mb-2">
          {title}
        </Heading>

        <Heading level={5} className="mb-2 text-gray-700">
          {subtitle}
        </Heading>

        <Text size="base" color="muted" className="mb-4">
          {description}
        </Text>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map(tech => (
            <Badge key={tech} variant="secondary" size="sm">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm">
                <ExternalLink size={16} className="mr-2" />
                Live Demo
              </Button>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Github size={16} className="mr-2" />
                Code
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
