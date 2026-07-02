import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Text, Button } from '@/components/atoms'
import SocialLink from '@/components/molecules/SocialLink'
import { EASE_OUT_EXPO } from '@/lib/scrollytelling'

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  })

  // Whole content lifts and softly fades as you scroll past
  const contentY = useTransform(smoothProgress, [0, 1], [0, -120])
  const contentOpacity = useTransform(smoothProgress, [0, 0.7, 1], [1, 0.7, 0])
  // Avatar parallaxes at a slightly different rate (depth)
  const avatarY = useTransform(smoothProgress, [0, 1], [0, -60])
  // One soft accent blob drifts opposite to scroll
  const blobY = useTransform(smoothProgress, [0, 1], [0, 200])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[150vh] overflow-hidden bg-[#F0EEE9]"
    >
      {/* Pinned stage */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* One subtle drifting blob */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-accent/20 blur-3xl"
          style={{ y: blobY }}
        />

        <motion.div
          className="container relative z-10"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Left: content */}
            <div className="md:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
              >
                <Text
                  size="sm"
                  weight="semibold"
                  color="accent"
                  className="tracking-[0.3em] uppercase"
                >
                  Hi! I&apos;m Gani
                </Text>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-primary"
              >
                Frontend Developer
                <br />
                <span className="text-accent">&</span> Creative Problem Solver
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.45 }}
                className="max-w-xl"
              >
                <Text size="lg" color="muted">
                  3+ years building calm, fast, responsive web applications with React, Vue.js and
                  modern web tech — user-centred, elegant, robust.
                </Text>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
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
                  onClick={() => window.open('https://s.id/cv-gani', '_blank')}
                >
                  Download CV
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="flex flex-wrap gap-6 pt-2"
              >
                <SocialLink type="github" href="https://github.com/Rialga/" label="GitHub" />
                <SocialLink
                  type="linkedin"
                  href="https://www.linkedin.com/in/muhamad-febri-algani-311533205/"
                  label="LinkedIn"
                />
                <SocialLink type="email" href="mailto:febrialganios@gmail.com" label="Email" />
              </motion.div>
            </div>

            {/* Right: avatar with decorative ring */}
            <motion.div
              className="md:col-span-5 hidden md:flex justify-center"
              style={{ y: avatarY }}
            >
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                {/* Decorative SVG ring — keep */}
                <motion.div
                  aria-hidden
                  className="absolute -inset-12 lg:-inset-16 pointer-events-none"
                  style={{ y: useTransform(smoothProgress, [0, 1], [40, -40]) }}
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <linearGradient id="ring-grad" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#F4A261" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#2F5D62" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="92"
                      fill="none"
                      stroke="url(#ring-grad)"
                      strokeWidth="1"
                      strokeDasharray="2 6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                      style={{ originX: '100px', originY: '100px' }}
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="78"
                      fill="none"
                      stroke="#2F5D62"
                      strokeOpacity="0.18"
                      strokeWidth="1"
                    />
                    {[0, 90, 180, 270].map(deg => (
                      <line
                        key={deg}
                        x1="100"
                        y1="14"
                        x2="100"
                        y2="20"
                        stroke="#F4A261"
                        strokeOpacity="0.7"
                        strokeWidth="2"
                        transform={`rotate(${deg} 100 100)`}
                      />
                    ))}
                  </svg>
                </motion.div>

                {/* Single avatar layer — no stacked depth layers */}
                <div className="absolute inset-8 rounded-2xl overflow-hidden bg-linear-to-br from-accent/20 to-primary/20 border-2 border-background/50 shadow-xl">
                  <img
                    src="https://lh3.googleusercontent.com/d/1sYmtmCFuvH9BjoMmYpcbV_4mqJ4mSkft"
                    alt="Portfolio avatar"
                    className="w-full h-full object-cover p-3 rounded-2xl"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={e => {
                      if (!e.currentTarget.dataset.fallback) {
                        e.currentTarget.dataset.fallback = '1'
                        e.currentTarget.src =
                          'https://lh3.googleusercontent.com/d/1sYmtmCFuvH9BjoMmYpcbV_4mqJ4mSkft'
                      } else {
                        e.currentTarget.src = '/code-icon-png-0.png'
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}