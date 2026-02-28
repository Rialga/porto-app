import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import SocialLink from '@/components/molecules/SocialLink'
import { ArrowRight } from 'lucide-react'
export default function Hero() {
  return (
    <section id="home" className="section container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-6">
          <div>
            <p className="text-accent font-semibold mb-2">Hi! I'm Gani</p>
            <Heading level={1}>Frontend Developer & Creative Problem Solver</Heading>
          </div>

          <Text size="lg" color="muted">
            3+ years of experience building beautiful, responsive web applications with React,
            Vue.js, and modern web technologies. I specialize in creating user-centered experiences
            that combine elegant design with robust functionality.
          </Text>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="lg"
              className="cursor-pointer"
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View My Work
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  'https://bit.ly/gani-resume',
                  '_blank'
                )
              }
            >
              Download CV
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-6 pt-6">
            <SocialLink type="github" href="https://github.com/Rialga/" label="GitHub" />
            <SocialLink
              type="linkedin"
              href="https://www.linkedin.com/in/muhamad-febri-algani-311533205/"
              label="LinkedIn"
            />
            <SocialLink type="email" href="mailto:febrialganios@gmail.com" label="Email" />
          </div>
        </div>

        {/* Avatar/Image */}
        <div className="hidden md:flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border-4 border-accent/20 shadow-lg">
            <div className="w-full h-full bg-linear-to-br from-accent/10 to-secondary flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/d/1sYmtmCFuvH9BjoMmYpcbV_4mqJ4mSkft"
                alt="Portfolio avatar"
                className="w-full h-full object-cover p-4 border rounded-xl"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={e => {
                  if (!e.currentTarget.dataset.fallback) {
                    e.currentTarget.dataset.fallback = '1'
                    e.currentTarget.src =
                      'https://lh3.googleusercontent.com/d/1sYmtmCFuvH9BjoMmYpcbV_4mqJ4mSkft' // retry sekali
                  } else {
                    e.currentTarget.src = '/code-icon-png-0.png'
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
