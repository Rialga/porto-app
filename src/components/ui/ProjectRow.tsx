import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '@/data/portfolio';
import { TechTag } from './TechTag';
import posePortal from '@/assets/images/pose-portal.jpg';
import poseExternal from '@/assets/images/pose-external.jpg';
import mentor from '@/assets/images/mentor.jpg';
import tap from '@/assets/images/tap.jpg';
import reKerjaYuk from '@/assets/images/re-kerja-yuk.jpg';
import kyLoyalty from '@/assets/images/ky-loyalty.jpg';

/* Real PCS product screenshots (downloaded from previously-deployed portfolio). */
const IMAGE_BY_PROJECT: Record<string, string> = {
  'POSe Portal': posePortal,
  'POSe External': poseExternal,
  'MENTOR': mentor,
  'TAP': tap,
  'RE-KerjaYuk!': reKerjaYuk,
  'KY-Loyalty': kyLoyalty,
};

interface ProjectRowProps {
  project: Project;
}

/**
 * ProjectRow — image-led vertical row, NOT a 3-column grid.
 * - Full-width image on top (existing product screenshot)
 * - Index (mono), title, category, period
 * - One-sentence description
 * - Scope bullets (small, mono)
 * - Tech pills
 *
 * Hover: row lifts -2px, title underline draws in.
 */
export function ProjectRow({ project }: ProjectRowProps) {
  const reduce = useReducedMotion();
  const src = IMAGE_BY_PROJECT[project.title];

  return (
    <motion.article
      className="group relative grid gap-6 border-t border-[var(--border-soft)] py-10 first:border-t-0 md:grid-cols-12 md:gap-10 md:py-12"
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Screenshot */}
      <div className="md:col-span-7">
        <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--shadow-image)]">
          <img
            src={src}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
          {/* Index mark — sits over the screenshot like a stamp */}
          <div className="mono pointer-events-none absolute right-3 top-3 z-10 text-[11px]">
            <span className="rounded-sm bg-[var(--surface)]/80 px-1.5 py-0.5 text-[var(--fg)] backdrop-blur-sm">
              <span className="text-[var(--accent)]">{project.index}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="md:col-span-5">
        <div className="mono mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)]">
          <span className="text-[var(--accent)]">{project.index}</span>
          <span aria-hidden className="h-px w-6 bg-[var(--border)]" />
          <span>{project.period}</span>
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-[var(--fg)] md:text-[28px]">
          <a
            href="#contact"
            className="link-underline inline"
            aria-label={`${project.title} — get in touch about this`}
          >
            {project.title}
          </a>
        </h3>

        <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-muted)]">
          {project.short}
        </p>

        {/* Scope */}
        <ul className="mt-5 space-y-1.5">
          {project.scope.map((line) => (
            <li
              key={line}
              className="mono flex gap-2 text-[12px] leading-relaxed text-[var(--fg-subtle)]"
            >
              <span className="mt-2 inline-block h-px w-3 shrink-0 bg-[var(--border)]" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {/* Tech pills */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
