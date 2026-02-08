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
            <p className="text-accent font-semibold mb-2">Welcome to my portfolio</p>
            <Heading level={1}>
              Frontend Developer & Creative Problem Solver
            </Heading>
          </div>

          <Text size="lg" color="muted">
            3+ years of experience building beautiful, responsive web applications with React, Vue.js,
            and modern web technologies. I specialize in creating user-centered experiences that
            combine elegant design with robust functionality.
          </Text>

          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg">
              View My Work
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button variant="outline" size="lg">
              Download CV
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-6 pt-6">
            <SocialLink
              type="github"
              href="https://github.com"
              label="GitHub"
            />
            <SocialLink
              type="linkedin"
              href="https://linkedin.com"
              label="LinkedIn"
            />
            <SocialLink
              type="email"
              href="mailto:hello@example.com"
              label="Email"
            />
          </div>
        </div>

        {/* Avatar/Image */}
        <div className="flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border-4 border-accent/20 shadow-lg">
            <div className="w-full h-full bg-gradient-to-br from-accent/10 to-secondary flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
