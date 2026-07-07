import { lazy, Suspense } from 'react'
import Hero from '@/components/organisms/porto/Hero'
import AboutSection from '@/components/organisms/porto/AboutSection'
import SkillsSection from '@/components/organisms/porto/SkillsSection'
import ExperienceSection from '@/components/organisms/porto/ExperienceSection'

// Below-the-fold sections — lazy-load so the main bundle stays small.
const EducationSection = lazy(() => import('@/components/organisms/porto/EducationSection'))
const ProjectsSection = lazy(() => import('@/components/organisms/porto/ProjectsSection'))
const FeaturedCaseStudies = lazy(
  () => import('@/components/organisms/porto/FeaturedCaseStudies'),
)
const ContactSection = lazy(() => import('@/components/organisms/porto/ContactSection'))

const BelowFold = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="section" aria-hidden />}>{children}</Suspense>
)

const Home = () => (
  <>
    <Hero />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <BelowFold>
      <EducationSection />
    </BelowFold>
    <BelowFold>
      <ProjectsSection />
    </BelowFold>
    <BelowFold>
      <FeaturedCaseStudies />
    </BelowFold>
    <BelowFold>
      <ContactSection />
    </BelowFold>
  </>
)

export default Home