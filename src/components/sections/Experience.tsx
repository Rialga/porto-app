import { experience } from '@/data/portfolio';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

/**
 * Experience — chronological job history.
 * Three-column grid: dates · company + role · bullets.
 * Current role gets the accent pulse dot, matching Contact's status indicator.
 */
export function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-[var(--border-soft)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionLabel number="02" label="Experience" />

        <Reveal>
          <div className="mt-10 mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-[1.15] tracking-tight text-[var(--fg)]">
              A timeline of where
              <br className="hidden md:block" />
              I've shipped code.
            </h2>
            <p
              className="max-w-sm text-[12px] uppercase leading-relaxed tracking-[0.16em] text-[var(--fg-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Four years across three teams —
              <br className="hidden md:block" />
              frontend is the through-line.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <ol className="divide-y divide-[var(--border-soft)] border-y border-[var(--border-soft)]">
            {experience.map((entry) => (
              <li
                key={entry.company}
                className="grid grid-cols-1 gap-4 py-7 md:grid-cols-12 md:gap-8 md:py-9"
              >
                {/* Dates */}
                <div className="md:col-span-3">
                  <div className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
                    <span>{entry.period}</span>
                    {entry.current && (
                      <span
                        className="relative inline-flex h-1.5 w-1.5"
                        aria-label="Current role"
                      >
                        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                        <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Company + role + location */}
                <div className="md:col-span-4">
                  <h3 className="text-[17px] font-medium tracking-tight text-[var(--fg)] md:text-[18px]">
                    {entry.company}
                  </h3>
                  <div className="mono mt-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                    {entry.role} · {entry.location}
                  </div>
                </div>

                {/* Bullets */}
                <div className="md:col-span-5">
                  <ul className="space-y-2 text-[14px] leading-[1.65] text-[var(--fg-muted)] md:text-[15px]">
                    {entry.bullets.map((line, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="mono mt-[10px] inline-block h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
