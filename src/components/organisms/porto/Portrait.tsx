import { motion, useReducedMotion } from 'framer-motion'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

const AVATAR_URL = 'https://lh3.googleusercontent.com/d/1sYmtmCFuvH9BjoMmYpcbV_4mqJ4mSkft'
const FALLBACK_AVATAR = '/code-icon-png-0.png'

/**
 * Stylized portrait tile — same visual language as the rest of the page
 * (gradient border, soft floating shapes, dot grid behind). Hidden below `lg`.
 */
export const Portrait = () => {
  const reduced = useReducedMotion()

  return (
    <div className="relative w-[280px] h-[340px] md:w-[320px] md:h-[388px]">
      {/* Decorative SVG ring */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="absolute -inset-10 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="size-full">
          <defs>
            <linearGradient id="portrait-ring" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="url(#portrait-ring)"
            strokeWidth="1"
            strokeDasharray="2 6"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            style={{ originX: '100px', originY: '100px' }}
          />
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="var(--border-strong)"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          {[0, 90, 180, 270].map(deg => (
            <line
              key={deg}
              x1="100"
              y1="14"
              x2="100"
              y2="20"
              stroke="var(--accent)"
              strokeOpacity="0.8"
              strokeWidth="2"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating accent shapes — desktop only, hidden with reduced motion */}
      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="absolute -top-3 -right-3 size-12 rounded-full bg-accent-soft border border-border-strong"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-4 -left-4 size-8 rounded-md bg-foreground/10 border border-border-strong rotate-12"
            animate={{ y: [0, 6, 0], rotate: [12, 18, 12] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Photo tile */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'absolute inset-0 rounded-2xl overflow-hidden',
          'border border-border-strong bg-surface shadow-[var(--shadow-md)]',
        )}
      >
        {/* Dot grid behind the photo for depth */}
        <div
          aria-hidden
          className="absolute inset-0 bg-dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
        />
        <img
          src={AVATAR_URL}
          alt={`${site.name} portrait`}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={e => {
            const el = e.currentTarget
            if (!el.dataset.fallback) {
              el.dataset.fallback = '1'
              el.src = AVATAR_URL
            } else {
              el.src = FALLBACK_AVATAR
            }
          }}
          className="relative size-full object-cover"
        />
        {/* Bottom caption strip */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-background/95 via-background/70 to-transparent px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-[var(--animate-pulse-soft)] rounded-full bg-[color-mix(in_oklch,#10b981_70%,transparent)]" />
              <span className="relative inline-flex size-2 rounded-full bg-[color-mix(in_oklch,#10b981_85%,transparent)]" />
            </span>
            <span className="mono-caption !text-foreground/80">{site.location}</span>
          </div>
        </div>
      </motion.div>

      {/* Floating skill chip */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute -left-6 top-1/2 hidden md:flex items-center gap-2 rounded-full border border-border-strong bg-surface/90 px-3 py-1.5 shadow-[var(--shadow-sm)] backdrop-blur"
      >
        <span className="size-1.5 rounded-full bg-accent" />
        <span className="text-xs font-medium text-foreground">4+ yrs shipping</span>
      </motion.div>
    </div>
  )
}

export default Portrait