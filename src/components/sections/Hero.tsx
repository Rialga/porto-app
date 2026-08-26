import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '@/data/portfolio';
import { ArrowRight, ArrowDown } from './icons';
import avatar from '@/assets/images/avatar.png';

const nameWords = profile.name.split(' ');

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Layered editorial gimmicks (independent z-stacks, non-destructive) */}
      <div className="bg-editorial-grid absolute inset-0 opacity-50" aria-hidden />
      <div className="bg-paper-grain absolute inset-0" aria-hidden />

      {/* Marginalia — vertical baseline ruler down the left edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-16 left-5 top-28 hidden md:left-8 md:block"
      >
        {/* main hairline */}
        <div className="h-full w-px bg-[var(--fg-subtle)]/30" />
        {/* ticks every 48px via repeating gradient */}
        <div className="absolute inset-0 w-px bg-[repeating-linear-gradient(to_bottom,var(--fg-subtle)_0_6px,transparent_6px_48px)] opacity-70" />
        {/* numbered labels every 4th tick */}
        <div className="mono absolute top-0 left-3 flex flex-col gap-[144px] text-[9px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]/70">
          <span>04</span>
          <span>08</span>
          <span>12</span>
          <span>16</span>
        </div>
      </div>

      {/* Corner registration / crop marks — SVG, 4 absolute corners */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <g stroke="var(--fg-subtle)" strokeWidth="1" opacity="0.45" fill="none">
          {/* top-left */}
          <g transform="translate(28, 28)">
            <line x1="0" y1="0" x2="14" y2="0" />
            <line x1="0" y1="0" x2="0" y2="14" />
            <line x1="-6" y1="0" x2="-2" y2="0" />
            <line x1="0" y1="-6" x2="0" y2="-2" />
          </g>
          {/* top-right */}
          <g transform="translate(calc(100% - 28px), 28)">
            <line x1="0" y1="0" x2="-14" y2="0" />
            <line x1="0" y1="0" x2="0" y2="14" />
            <line x1="6" y1="0" x2="2" y2="0" />
            <line x1="0" y1="-6" x2="0" y2="-2" />
          </g>
          {/* bottom-left */}
          <g transform="translate(28, calc(100% - 28px))">
            <line x1="0" y1="0" x2="14" y2="0" />
            <line x1="0" y1="0" x2="0" y2="-14" />
            <line x1="-6" y1="0" x2="-2" y2="0" />
            <line x1="0" y1="6" x2="0" y2="2" />
          </g>
          {/* bottom-right */}
          <g transform="translate(calc(100% - 28px), calc(100% - 28px))">
            <line x1="0" y1="0" x2="-14" y2="0" />
            <line x1="0" y1="0" x2="0" y2="-14" />
            <line x1="6" y1="0" x2="2" y2="0" />
            <line x1="0" y1="6" x2="0" y2="2" />
          </g>
        </g>
      </svg>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Desktop: two-column asymmetric split */}
        <div className="md:grid md:grid-cols-12 md:gap-10">
          {/* Left column: status → name → role → CTAs */}
          <div className="md:col-span-7">
            {/* Status row (above name, no longer paired with portrait) */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mono mb-6 hidden items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)] md:flex"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
              <span>{profile.status}</span>
              <span aria-hidden className="h-px w-8 bg-[var(--border)]" />
              <span>{profile.location}</span>
            </motion.div>

            {/* Mobile status (compact, above portrait) */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mono mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)] md:hidden"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
              <span>{profile.status}</span>
            </motion.div>

            {/* The big name — word-by-word reveal (delayed slightly so portrait leads) */}
            <h1 className="font-semibold tracking-tight text-[var(--fg)] text-[clamp(2.5rem,8vw,5rem)] leading-[0.96] [text-wrap:balance] md:text-[clamp(3rem,7vw,6rem)]">
              {nameWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.45 + i * 0.07,
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
              transition={{ duration: 0.5, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 max-w-2xl text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-[var(--fg-muted)]"
            >
              <span className="text-[var(--fg)]">{profile.role}</span> — {profile.tagline}
            </motion.p>

            {/* CTA + nav row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <a
                href="#work"
                className="mono group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
              >
                <span className="link-underline">View Work</span>
                {/* Subtle looping nudge after CTA lands — signals affordance without competing with entrance */}
                <motion.span
                  aria-hidden
                  initial={{ x: 0 }}
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.4,
                    delay: 2.1,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="inline-flex"
                >
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </motion.span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="mono inline-flex items-center gap-2 pb-1 text-[12px] uppercase tracking-[0.16em] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
              >
                <span className="link-underline">Email directly</span>
              </a>
              <a
                href="https://www.linkedin.com/in/muhamad-febri-algani-311533205/"
                target="_blank"
                rel="noopener noreferrer"
                className="mono inline-flex items-center gap-2 pb-1 text-[12px] uppercase tracking-[0.16em] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
              >
                <span className="link-underline">LinkedIn</span>
              </a>
              <a
                href="https://github.com/Rialga"
                target="_blank"
                rel="noopener noreferrer"
                className="mono inline-flex items-center gap-2 pb-1 text-[12px] uppercase tracking-[0.16em] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
              >
                <span className="link-underline">GitHub</span>
              </a>
            </motion.div>
          </div>

          {/* Right column: editorial portrait (desktop only) */}
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 hidden flex-col items-end gap-3 md:col-span-5 md:mt-0 md:flex"
          >
            <img
              src={avatar}
              alt={`Portrait of ${profile.shortName}`}
              width={600}
              height={800}
              className="aspect-[3/4] w-full max-w-[380px] object-contain [object-position:50%_35%]"
              loading="eager"
              decoding="async"
            />
            <figcaption className="mono w-full max-w-[380px] pr-1 text-right text-[10px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
              {profile.shortName.toUpperCase()} — SOUTH TANGERANG
            </figcaption>
          </motion.figure>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.75, ease: [0.22, 1, 0.36, 1] }}
          className="mono mt-20 hidden items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-subtle)] md:flex"
        >
          <ArrowDown className="h-3 w-3" />
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
