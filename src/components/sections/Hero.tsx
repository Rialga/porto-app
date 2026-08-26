import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '@/data/portfolio';
import { ArrowRight, ArrowDown } from './icons';
import me from '@/assets/images/me-casual.jpg';

const nameWords = profile.name.split(' ');

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* faint editorial grid */}
      <div className="bg-editorial-grid absolute inset-0 opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Top row: status (left) + portrait (right) */}
        <div className="mb-10 flex items-start justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--fg-muted)]"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            <span>{profile.status}</span>
            <span aria-hidden className="h-px w-8 bg-[var(--border)]" />
            <span>{profile.location}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0"
          >
            <img
              src={me}
              alt={`Portrait of ${profile.shortName}`}
              width={72}
              height={72}
              className="h-16 w-16 rounded-full border border-[var(--border)] object-cover shadow-[var(--shadow-card)] md:h-[72px] md:w-[72px]"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* The big name — word-by-word reveal */}
        <h1 className="font-semibold tracking-tight text-[var(--fg)] text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95]">
          {nameWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block pr-[0.18em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Role line */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-[var(--fg-muted)]"
        >
          <span className="text-[var(--fg)]">{profile.role}</span> — {profile.tagline}
        </motion.p>

        {/* CTA + nav row (per brief: inline nav, no CTA-button-spam) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <a
            href="#work"
            className="mono group inline-flex items-center gap-2 border-b border-[var(--accent)] pb-1 text-[12px] uppercase tracking-[0.18em] text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
          >
            View Work
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="mono inline-flex items-center gap-2 pb-1 text-[12px] uppercase tracking-[0.18em] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
          >
            <span className="link-underline">Email directly</span>
          </a>
          <a
            href="https://www.linkedin.com/in/muhamad-febri-algani-311533205/"
            target="_blank"
            rel="noopener noreferrer"
            className="mono inline-flex items-center gap-2 pb-1 text-[12px] uppercase tracking-[0.18em] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
          >
            <span className="link-underline">LinkedIn</span>
          </a>
          <a
            href="https://github.com/Rialga"
            target="_blank"
            rel="noopener noreferrer"
            className="mono inline-flex items-center gap-2 pb-1 text-[12px] uppercase tracking-[0.18em] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
          >
            <span className="link-underline">GitHub</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mono mt-20 hidden items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--fg-subtle)] md:flex"
        >
          <ArrowDown className="h-3 w-3" />
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
