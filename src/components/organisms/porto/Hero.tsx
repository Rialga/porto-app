import { Heading, Text, Button, MotionReveal } from '@/components/atoms'
import SocialLink from '@/components/molecules/SocialLink'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="home"
      className="section container min-h-[95vh] flex flex-col justify-center relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-1">
        {/* Content */}
        <MotionReveal direction="left" delay={0.2}>
          <div className="space-y-6">
            <div>
              <p className="text-accent font-semibold mb-2">Hi! I'm Gani</p>
              <Heading level={1}>Frontend Developer & Creative Problem Solver</Heading>
            </div>

            <Text size="lg" color="muted">
              3+ years of experience building beautiful, responsive web applications with React,
              Vue.js, and modern web technologies. I specialize in creating user-centered
              experiences that combine elegant design with robust functionality.
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
                onClick={() => window.open('https://s.id/resume-drive', '_blank')}
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
        </MotionReveal>

        {/* Avatar/Image */}
        <MotionReveal direction="right" delay={0.4}>
          <div className="hidden md:flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border-4 border-accent/20 shadow-lg relative group">
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
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
        </MotionReveal>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hidden md:flex"
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <Text size="sm" color="muted">
          Scroll to explore
        </Text>
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
