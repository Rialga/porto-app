'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Heading from '@/components/atoms/Heading'
import Icon from '../../../../public/code-icon-png-0.png'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeHref, setActiveHref] = useState<string>('#home')
  const lastY = useRef(0)

  const { scrollY } = useScroll()

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', y => {
    const diff = y - lastY.current
    if (Math.abs(diff) < 4) return
    if (y > 80 && diff > 0) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    lastY.current = y
  })

  // Track which section is in view to drive active-link underline
  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []
    const visible = new Set<string>()

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              visible.add(id)
            } else {
              visible.delete(id)
            }
          })
          // pick the topmost visible
          const topmost = ids.find(i => visible.has(i))
          if (topmost) setActiveHref('#' + topmost)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: '-100%', opacity: 0 },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
    >
      <nav className="container flex items-center justify-between h-16">
        <Heading level={3} className="text-xl! md:text-2xl!">
          <img src={Icon} alt="Logo" className="w-8 h-8 inline-block mr-2 -mt-1" />
        </Heading>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 relative">
          {navLinks.map(link => {
            const isActive = activeHref === link.href
            return (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm text-foreground hover:text-accent transition-colors duration-200 py-1"
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground hover:text-accent transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
