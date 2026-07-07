import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { site } from '@/content/site'
import { Magnetic } from '@/components/ui'
import { SocialIcon } from '@/components/molecules'
import { useScrollY } from '@/hooks/useScrollY'
import { cn } from '@/lib/utils'

interface NavLink {
  label: string
  href: string
  external?: boolean
}

const NAV_GROUPS: Array<{ title: string; links: NavLink[] }> = [
  {
    title: 'Site',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Work', href: '#work' },
      { label: 'Case studies', href: '#process' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'GitHub', href: site.socials.find(s => s.type === 'github')!.href, external: true },
      {
        label: 'LinkedIn',
        href: site.socials.find(s => s.type === 'linkedin')!.href,
        external: true,
      },
      { label: 'Email', href: site.socials.find(s => s.type === 'email')!.href },
      { label: 'Résumé', href: site.resumeUrl, external: true },
    ],
  },
]

export const Footer = () => {
  const y = useScrollY()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const showTop = y > 800

  return (
    <footer className="relative border-t border-border bg-background">
      {/* Section reading progress */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
        style={{ scaleX }}
      />

      <div className="container py-20 md:py-28">
        {/* Big editorial CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="mono-caption mb-6">Get in touch</p>
            <h2 className="display-1 text-foreground">
              Have a project
              <br />
              <span className="text-gradient">in mind?</span>
            </h2>
            <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
              I work with small product teams and design-led companies. If you’re building
              something calm, fast, and a little bit beautiful — let’s talk.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
            <Magnetic strength={18}>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-foreground text-background px-6 text-base font-medium hover:bg-foreground/90 transition-colors"
              >
                {site.email}
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>
            <div className="flex flex-wrap gap-2">
              <SocialIcon type="github" />
              <SocialIcon type="linkedin" />
              <SocialIcon type="email" showLabel={false} />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5">
            <Link to="/" className="font-semibold text-foreground">
              {site.name}
            </Link>
            <p className="mt-3 text-sm text-muted max-w-xs leading-relaxed">
              Senior frontend engineer based in Indonesia. Available for remote-friendly work
              worldwide.
            </p>
          </div>

          {NAV_GROUPS.map(group => (
            <div key={group.title} className="md:col-span-3">
              <p className="mono-caption mb-4">{group.title}</p>
              <ul className="space-y-2.5">
                {group.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                      {link.external && (
                        <ArrowUpRight
                          size={12}
                          aria-hidden
                          className="opacity-0 transition-opacity group-hover:opacity-70"
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1 flex md:justify-end">
            <Link
              to="/"
              aria-label="Back to top"
              className={cn(
                'group inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface transition-all duration-300',
                showTop
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-2 pointer-events-none',
              )}
            >
              <ArrowUp size={14} aria-hidden className="transition-transform group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-2">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-2 font-mono">
            Built with{' '}
            {site.builtWith.map((item, i) => (
              <span key={item}>
                <span className="text-foreground">{item}</span>
                {i < site.builtWith.length - 1 && <span className="mx-1.5 text-muted-2">·</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer