import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { site } from '@/content/site'
import { ThemeToggle } from '@/components/ui'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type NavItem =
  | { kind: 'anchor'; id: string; label: string; href: string }
  | { kind: 'route'; label: string; href: string; match: (path: string) => boolean }

const NAV_ITEMS: NavItem[] = [
  { kind: 'anchor', id: 'home', label: 'Home', href: '/#home' },
  { kind: 'anchor', id: 'about', label: 'About', href: '/#about' },
  { kind: 'anchor', id: 'work', label: 'Work', href: '/#work' },
  { kind: 'anchor', id: 'process', label: 'Case studies', href: '/#process' },
  { kind: 'anchor', id: 'contact', label: 'Contact', href: '/#contact' },
]

export const Header = () => {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const dir = useScrollDirection({ threshold: 8 })
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { scrollY } = useScroll()
  const [condensed, setCondensed] = useState(false)
  const location = useLocation()
  const drawerId = useId()
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  // Condensed state once we've scrolled past the hero.
  useMotionValueEvent(scrollY, 'change', latest => {
    setCondensed(latest > 32)
  })

  // Close drawer on route change.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Track the active in-page section via IntersectionObserver.
  // Only run on the home route — on subroutes, no section is "active" and
  // route-based nav items get aria-current="page" instead.
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('')
      return
    }
    const anchorIds = NAV_ITEMS.filter(
      (n): n is Extract<NavItem, { kind: 'anchor' }> => n.kind === 'anchor',
    ).map(n => n.id)
    const visible = new Set<string>()
    const observers: IntersectionObserver[] = []

    anchorIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) visible.add(id)
            else visible.delete(id)
          })
          const topmost = anchorIds.find(i => visible.has(i))
          if (topmost) setActiveSection(topmost)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [location.pathname])

  // Focus trap + Esc handler for the mobile drawer.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const hidden = dir === 'down' && condensed && !open && isDesktop

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: hidden ? '-100%' : '0%',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50',
          'transition-[background-color,border-color,backdrop-filter,padding] duration-300',
          condensed
            ? 'bg-background/70 backdrop-blur-xl border-b border-border/60'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <div className="container flex items-center justify-between h-16 md:h-[68px]">
          {/* Logo */}
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-semibold tracking-tight text-foreground"
            aria-label={`${site.name} — Home`}
          >
            <span className="relative flex size-7 items-center justify-center rounded-lg bg-foreground text-background text-xs font-bold">
              {site.shortName.charAt(0)}
              <span
                aria-hidden
                className="absolute inset-0 rounded-lg ring-1 ring-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </span>
            <span className="hidden sm:inline text-sm md:text-base">{site.shortName}</span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-1 relative"
          >
            {NAV_ITEMS.map(item => {
              const isActive =
                item.kind === 'anchor'
                  ? activeSection === item.id
                  : item.match(location.pathname)
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    'relative px-3.5 py-2 text-sm rounded-full transition-colors duration-200',
                    isActive ? 'text-foreground' : 'text-muted hover:text-foreground',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-surface-2 border border-border"
                      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex h-10 items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-medium text-foreground hover:bg-surface-2 hover:border-foreground/30 transition-colors"
            >
              Résumé
              <ArrowUpRight size={14} aria-hidden />
            </a>
            <button
              ref={triggerRef}
              type="button"
              className="md:hidden inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-foreground"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls={drawerId}
              onClick={() => setOpen(o => !o)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={16} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              id={drawerId}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[68px] z-50 md:hidden rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-lg)]"
            >
              <nav aria-label="Mobile primary" className="flex flex-col">
                {NAV_ITEMS.map(item => {
                  const isActive =
                    item.kind === 'anchor'
                      ? activeSection === item.id
                      : item.match(location.pathname)
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl text-base',
                        'transition-colors',
                        isActive
                          ? 'bg-surface-2 text-foreground'
                          : 'text-muted hover:bg-surface-2 hover:text-foreground',
                      )}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight size={14} aria-hidden />
                    </Link>
                  )
                })}
                <div className="my-2 h-px bg-border" />
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base text-foreground hover:bg-surface-2"
                >
                  Read résumé
                  <ArrowUpRight size={14} aria-hidden />
                </a>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-muted">Theme</span>
                  <ThemeToggle />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header