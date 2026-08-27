import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import type { Project } from '@/data/portfolio';
import { TechTag } from './ui/TechTag';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useScrollLock } from '@/hooks/useScrollLock';
import { EASE_OUT_EXPO, EASE_STANDARD } from '@/lib/motion';

interface ProjectDrawerProps {
  project: Project | null;
  imageSrc: string | undefined;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * ProjectModal — centered case-study modal.
 *
 * Single orchestrated entrance:
 *   1. Backdrop fades in (0.2s)
 *   2. Card scales 0.96 → 1 with opacity (0.32s, easeOutExpo)
 *   3. Image + content fade in after card settles (0.06–0.1s delay)
 *
 * Scroll-linked detail:
 *   As the inner content scrolls, the hero image's height collapses from
 *   its 16:9 hero size down to a compact strip. A subtle scale-up keeps
 *   the focal point alive. Driven by a MotionValue bound to the inner
 *   container's scroll position — no React re-renders per scroll frame.
 *
 * - ESC closes; backdrop click closes everywhere (card fills viewport on mobile).
 * - Focus trapped; returns focus to trigger on close.
 * - Scroll locked via body position:fixed (Lenis-safe — Lenis destroyed on lock).
 * - Reduced motion: skip scale + height collapse, fade only.
 */
export function ProjectDrawer({ project, imageSrc, onClose, triggerRef }: ProjectDrawerProps) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked MotionValues. useMotionValue does NOT trigger React
  // re-renders — it pushes directly to DOM via framer-motion's optimized
  // style subscription.
  const scrollY = useMotionValue(0);

  const open = !!project;

  useScrollLock(open);
  useFocusTrap(open, panelRef, triggerRef, closeBtnRef);

  // Scroll-driven image collapse. Hero shrinks from full 16:9 to a thin
  // strip over the first 280px of scroll, with a 1.0 → 1.08 scale on the
  // image itself to keep the focal point alive.
  const imageHeight = useTransform(scrollY, [0, 280], [380, 96]);
  const imageScale = useTransform(scrollY, [0, 280], [1, 1.08]);
  const imageOpacity = useTransform(scrollY, [0, 320], [1, 0.85]);

  // Bind scrollY to the inner container's scroll position.
  useEffect(() => {
    if (!open) return;
    const inner = innerRef.current;
    if (!inner) return;
    const onScroll = () => scrollY.set(inner.scrollTop);
    inner.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // sync initial state
    return () => inner.removeEventListener('scroll', onScroll);
  }, [open, scrollY]);

  // ESC handler
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && project && (
        <div
          key="modal-root"
          className="fixed inset-0 z-[60] flex items-stretch justify-center md:items-center md:p-6"
        >
          {/* Backdrop — click anywhere outside card closes */}
          <motion.div
            className="absolute inset-0 bg-[var(--bg)]/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.08 : 0.2, ease: EASE_STANDARD }}
          />

          {/* Card */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.slug}`}
            data-lenis-prevent
            className="relative z-10 flex h-full w-full flex-col overflow-hidden bg-[var(--bg)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] md:h-[88vh] md:w-[min(820px,92vw)] md:rounded-2xl md:border md:border-[var(--border-soft)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{
              duration: reduce ? 0.1 : 0.32,
              ease: reduce ? EASE_STANDARD : EASE_OUT_EXPO,
            }}
          >
            {/* Hero image — collapses on scroll */}
            {imageSrc ? (
              <motion.div
                style={{
                  // Override aspect-ratio's height with the scroll-driven value.
                  // Reduced motion: keep natural 16:9 hero size.
                  height: reduce ? undefined : imageHeight,
                }}
                className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-[var(--surface-2)] md:rounded-t-2xl"
              >
                <motion.img
                  src={imageSrc}
                  alt={`Screenshot of ${project.title}`}
                  loading="eager"
                  decoding="async"
                  style={{
                    scale: reduce ? 1 : imageScale,
                    opacity: reduce ? 1 : imageOpacity,
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: reduce ? 0 : 0.06,
                    duration: reduce ? 0.08 : 0.28,
                    ease: EASE_OUT_EXPO,
                  }}
                />
              </motion.div>
            ) : null}

            {/* Close button — top-right over the card. Stays put as image collapses. */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-3 right-3 z-20 inline-flex min-h-[44px] min-w-[44px] items-center gap-1.5 rounded-sm bg-[var(--surface)]/90 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg)] backdrop-blur-sm transition-colors hover:bg-[var(--surface)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Close
              <span className="text-[14px] leading-none">×</span>
            </button>

            {/* Scrollable content — fades in after image */}
            <motion.div
              ref={innerRef}
              className="flex-1 overflow-y-auto overscroll-contain px-5 pt-8 pb-12 md:px-10 md:pt-10 md:pb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: reduce ? 0 : 0.1,
                duration: reduce ? 0.08 : 0.28,
                ease: EASE_OUT_EXPO,
              }}
            >
              {/* Meta */}
              <div
                className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="text-[var(--accent)]">{project.index}</span>
                <span aria-hidden className="h-px w-6 bg-[var(--border)]" />
                <span>{project.period}</span>
                <span aria-hidden className="h-px w-6 bg-[var(--border)]" />
                <span>{project.role}</span>
              </div>

              {/* Title */}
              <h2
                id={`modal-title-${project.slug}`}
                className="text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-[var(--fg)]"
              >
                {project.title}
              </h2>

              {/* One-liner short */}
              <p className="mt-4 max-w-prose text-[14px] leading-[1.6] text-[var(--fg-subtle)]">
                {project.short}
              </p>

              {/* Lead */}
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-[var(--fg-muted)]">
                {project.lead}
              </p>

              {/* Sections */}
              {project.sections.map((section) => (
                <section key={section.heading} className="mt-8 max-w-prose">
                  <h3
                    className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {section.heading}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-[var(--fg-muted)]">{section.body}</p>
                </section>
              ))}

              {/* Highlights */}
              <section className="mt-10 max-w-prose">
                <h3
                  className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Highlights
                </h3>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li key={h} className="flex gap-3 text-[14px] leading-[1.6] text-[var(--fg)]">
                      <span className="mt-1.5 h-px w-4 shrink-0 bg-[var(--border)]" aria-hidden />
                      <span className="flex-1">
                        <span
                          className="mr-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Pull quote */}
              <blockquote className="mt-10 max-w-prose border-l-2 border-[var(--accent)] pl-5">
                <p className="text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.4] text-[var(--fg)]">
                  &ldquo;{project.pullQuote}&rdquo;
                </p>
              </blockquote>

              {/* Stack */}
              <section className="mt-10">
                <h3
                  className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </div>
              </section>

              {/* Scope */}
              <section className="mt-10">
                <h3
                  className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Scope
                </h3>
                <ul className="space-y-1.5">
                  {project.scope.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2 text-[14px] leading-[1.6] text-[var(--fg-muted)]"
                    >
                      <span className="mt-2 inline-block h-px w-4 shrink-0 bg-[var(--border)]" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Footer */}
              <div
                className="mt-16 border-t border-[var(--border-soft)] pt-6 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Selected Work · {project.index} / 07 · {project.title}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
