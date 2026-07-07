import { caseStudies } from '@/content/case-studies'
import { SectionHeading } from '@/components/ui'
import { MotionReveal } from '@/components/atoms'
import { CaseStudyCard } from '@/components/molecules'

export const FeaturedCaseStudies = () => {
  const featured = caseStudies.slice(0, 3)

  return (
    <section id="process" aria-labelledby="process-title" className="section bg-surface-2/40">
      <div className="container">
        <SectionHeading
          eyebrow="Case studies"
          title={
            <span id="process-title">The thinking behind the work.</span>
          }
          lede="Long-form breakdowns of the projects I’m proudest of — problem, architecture, tradeoffs, and what I’d do differently next time."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((cs, i) => (
            <MotionReveal key={cs.slug} direction="up" delay={i * 0.08} as="div">
              <CaseStudyCard caseStudy={cs} className="h-full" />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCaseStudies