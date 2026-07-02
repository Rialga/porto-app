import { Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Header from '@/components/organisms/porto/Header'
import Footer from '@/components/organisms/porto/Footer'

interface WebLayoutProps {
  children?: ReactNode
}

export const WebLayout = ({ children }: WebLayoutProps) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Traveller position on the winding line
  const travellerY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const travellerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 1])

  return (
    <div className="min-h-screen bg-[#F0EEE9] flex flex-col relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-accent origin-left z-100"
        style={{ scaleX }}
      />

      {/* Section-to-section winding line — fixed left margin, only on lg+ */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-4 top-0 bottom-0 z-30 hidden lg:block"
      >
        <svg width="20" height="100%" preserveAspectRatio="none" viewBox="0 0 20 1000" className="h-full">
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="1000"
            stroke="#2F5D62"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
          <motion.circle
            cx="10"
            r="5"
            fill="#F4A261"
            style={{ cy: travellerY, scale: travellerScale }}
          />
          <motion.circle
            cx="10"
            r="10"
            fill="#F4A261"
            fillOpacity="0.2"
            style={{ cy: travellerY, scale: travellerScale }}
          />
        </svg>
      </div>

      {/* Film-grain overlay (CSS-only) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />

      <Header />
      <main className="flex-1">{children || <Outlet />}</main>
      <Footer />
    </div>
  )
}

export default WebLayout