import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Header from '@/components/organisms/porto/Header'
import Footer from '@/components/organisms/porto/Footer'
import { NoiseOverlay } from '@/components/ui'
import { SEO } from '@/components/seo/SEO'

const EASE = [0.16, 1, 0.3, 1] as const

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.2, ease: EASE } },
}

export const WebLayout = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const location = useLocation()

  // Reset scroll to top on route change so the user lands at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {/* Skip link for keyboard users. */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <SEO path={location.pathname.replace(/^\//, '')} />

      {/* Top scroll progress. */}
      <motion.div
        aria-hidden
        className="fixed top-0 inset-x-0 h-[2px] origin-left z-[60] bg-accent"
        style={{ scaleX }}
      />

      {/* Subtle grain overlay — 4% opacity, blend overlay. */}
      <NoiseOverlay className="fixed inset-0 z-[1] opacity-[0.035]" />

      <Header />

      <main id="main" className="flex-1 relative z-[2] pt-16 md:pt-[68px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default WebLayout