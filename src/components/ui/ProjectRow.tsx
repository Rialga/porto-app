import { useRef } from 'react';
import type { Project } from '@/data/portfolio';
import { TechTag } from './TechTag';
import posePortal from '@/assets/images/pose-portal.jpg';
import poseExternal from '@/assets/images/pose-external.jpg';
import mentor from '@/assets/images/mentor.jpg';
import tap from '@/assets/images/tap.jpg';
import reKerjaYuk from '@/assets/images/re-kerja-yuk.jpg';
import kyLoyalty from '@/assets/images/ky-loyalty.jpg';
import posePpob from '@/assets/images/poseppob.jpg';

/* Real POSe ID product screenshots (downloaded from previously-deployed portfolio). */
const IMAGE_BY_PROJECT: Record<string, string> = {
  'POSe PPOB': posePpob,
  'POSe Portal': posePortal,
  'POSe External': poseExternal,
  'MENTOR': mentor,
  'TAP': tap,
  'RE-KerjaYuk!': reKerjaYuk,
  'KY-Loyalty': kyLoyalty,
};

interface ProjectRowProps {
  project: Project;
  onOpen: (project: Project, triggerRef: React.RefObject<HTMLButtonElement | null>) => void;
  /** Index of currently-open drawer — for dimming non-active rows */
  activeSlug?: string | null;
}

/**
 * ProjectRow — image-led vertical row.
 *
 * Click target: the screenshot is a button that opens the case-study modal.
 * No layoutId morph, no staggered reveals — those live inside the modal.
 * Hover affordance is the cursor change + focus ring + index stamp.
 *
 * When another row's modal is open, non-active rows dim to 25% to direct
 * attention to the active card behind the modal backdrop.
 */
export function ProjectRow({ project, onOpen, activeSlug }: ProjectRowProps) {
  const src = IMAGE_BY_PROJECT[project.title];
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isDimmed = activeSlug != null && activeSlug !== project.slug;

  return (
    <article
      className="group relative grid gap-6 border-t border-[var(--border-soft)] py-10 first:border-t-0 transition-opacity duration-200 md:grid-cols-12 md:gap-10 md:py-12"
      style={{ opacity: isDimmed ? 0.25 : 1 }}
    >
      {/* Screenshot — click target opens the modal */}
      <div className="md:col-span-7">
        <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-2)] shadow-[var(--shadow-image)]">
          {src ? (
            <button
              ref={triggerRef}
              type="button"
              onClick={() => onOpen(project, triggerRef)}
              aria-label={`Open ${project.title} details`}
              aria-haspopup="dialog"
              className="relative block h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              <img
                src={src}
                alt={`Screenshot of ${project.title}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
              {/* Index mark — sits over the screenshot like a stamp */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-3 top-3 inline-block rounded-sm bg-[var(--surface)]/80 px-1.5 py-0.5 text-[11px] backdrop-blur-sm"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="text-[var(--accent)]">{project.index}</span>
              </span>
            </button>
          ) : (
            /* Placeholder while image is pending */
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,transparent_0_12px,rgba(0,0,0,0.025)_12px_13px)]">
              <span
                className="text-[10px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Screenshot pending
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]/60"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {project.title}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content (right column) */}
      <div className="md:col-span-5">
        <div
          className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span className="text-[var(--accent)]">{project.index}</span>
          <span aria-hidden className="h-px w-6 bg-[var(--border)]" />
          <span>{project.period}</span>
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-[var(--fg)] md:text-[28px]">
          <button
            type="button"
            onClick={() => onOpen(project, triggerRef)}
            className="link-underline inline text-left"
          >
            {project.title}
          </button>
        </h3>

        <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-muted)]">{project.short}</p>

        {/* Scope */}
        <ul className="mt-5 space-y-1.5">
          {project.scope.map((line) => (
            <li
              key={line}
              className="flex gap-2 text-[12px] leading-relaxed text-[var(--fg-subtle)]"
              style={{ fontFamily: 'var(--font-mono)' }}
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
    </article>
  );
}
