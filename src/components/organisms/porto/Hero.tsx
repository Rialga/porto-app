import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { hero } from '@/content/home'
import { Button, DotGrid, Magnetic } from '@/components/ui'
import { SocialIcon, StatBlock } from '@/components/molecules'
import { site } from '@/content/site'
import { Portrait } from './Portrait'

const ROTATE_INTERVAL = 2600

export const Hero = () => {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex(i => (i + 1) % hero.rotatingWords.length)
    }, ROTATE_INTERVAL)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-background"
    >
      {/* Layered backdrop */}
      <div aria-hidden className="absolute inset-0 bg-mesh opacity-90" />
      <DotGrid className="absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
      />

      <div className="container relative pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left — copy */}
          <div className="lg:col-span-8">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="relative inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-[var(--animate-pulse-soft)] rounded-full bg-[color-mix(in_oklch,#10b981_70%,transparent)]" />
                  <span className="relative inline-flex size-2 rounded-full bg-[color-mix(in_oklch,#10b981_85%,transparent)]" />
                </span>
                <span className="mono-caption">{hero.eyebrow}</span>
              </span>
            </motion.div>

            {/* Title block */}
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="mt-8 display-1 text-foreground"
            >
              {hero.titleLead}{' '}
              <RotatingWord words={hero.rotatingWords} index={index} />
              <span className="block md:inline"> {hero.titleTail}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="mt-8 max-w-2xl text-lg md:text-xl text-muted leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button asChild variant="primary" size="lg" withArrow>
                  <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="outline" size="lg">
                  <a
                    href={hero.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {hero.secondaryCta.label}
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                </Button>
              </Magnetic>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-2"
            >
              <SocialIcon type="github" />
              <SocialIcon type="linkedin" />
              <SocialIcon type="email" />
            </motion.div>
          </div>

          {/* Right — portrait */}
          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <Portrait />
          </div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="mt-20 md:mt-28"
        >
          <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur-md p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {hero.stats.map(s => (
              <StatBlock
                key={s.label}
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
                label={s.label}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right-side meta strip */}
      <div className="hidden lg:block absolute right-6 bottom-6 z-10">
        <p className="mono-caption text-muted-2">{site.location}</p>
      </div>
    </section>
  )
}

/**
 * Swapping rotating word. Renders inside a fixed-width inline-block slot so
 * the headline never reflows. The active word uses the same ink color as the
 * surrounding text — no gradient clip, which was causing the previous font
 * rendering glitch.
 */
const RotatingWord = ({
  words,
  index,
}: {
  words: readonly string[]
  index: number
}) => {
  // Reserve the widest word so the slot never reflows during a swap.
  const widest = words.reduce((a, b) => (a.length >= b.length ? a : b))
  return (
    <span
      aria-live="polite"
      className="relative inline-block align-baseline md:ml-1"
      style={{ minWidth: '0.6em' }}
    >
      {/* Spacer — keeps layout width stable. */}
      <span aria-hidden className="invisible inline-block whitespace-nowrap">
        {widest}
      </span>
      {/* Animated active word layered on top. */}
      <span className="absolute inset-0 flex items-baseline">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: '60%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-60%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="whitespace-nowrap text-foreground"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

export default Hero