import { Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import Header from '@/components/organisms/porto/Header'
import Footer from '@/components/organisms/porto/Footer'
import { motion, useScroll, useSpring } from 'framer-motion'

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

  return (
    <div className="min-h-screen bg-[#F0EEE9] flex flex-col relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-accent origin-left z-100"
        style={{ scaleX }}
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">{children || <Outlet />}</main>
      <Footer />
    </div>
  )
}

export default WebLayout
