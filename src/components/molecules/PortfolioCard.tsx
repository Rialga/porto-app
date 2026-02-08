import type { ReactNode } from 'react'

interface PortfolioCardProps {
  title: string
  description: string
  category: string
  image: string
  tags: string[]
  link?: string
  icon?: ReactNode
}

export const PortfolioCard = ({
  title,
  description,
  category,
  image,
  tags,
  link,
  icon,
}: PortfolioCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-black text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>

        {/* Icon */}
        {icon && (
          <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-black mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-black/70 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-light-2 text-black/60 text-xs font-medium rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        {link && (
          <a
            href={link}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            View Project
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default PortfolioCard
