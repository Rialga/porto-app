import Hero from '@/components/organisms/porto/Hero'
import ProjectsSection from '@/components/organisms/porto/ProjectsSection'
import ExperienceSection from '@/components/organisms/porto/ExperienceSection'
import SkillsSection from '@/components/organisms/porto/SkillsSection'

const Home = () => {
  return (
    <div className='flex-1'>
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
    </div>
  )
}

export default Home
