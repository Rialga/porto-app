import { techStack } from '@/data/portfolio';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TechTag } from '@/components/ui/TechTag';

export function TechStack() {
  return (
    <section id="stack" className="border-t border-[var(--border-soft)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionLabel number="04" label="Stack" />

        <Reveal>
          <div className="mt-10 mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-[1.15] tracking-tight text-[var(--fg)]">
              Tools I reach for,
              <br className="hidden md:block" />
              ordered by where they sit in the build.
            </h2>
            <p className="mono max-w-sm text-[12px] uppercase leading-relaxed tracking-[0.12em] text-[var(--fg-muted)]">
              No icon clouds. Tags only. Hover for the accent.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {techStack.map((group) => (
              <div key={group.label} className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-3">
                  <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
                    {group.label}
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-9">
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <TechTag key={item}>{item}</TechTag>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}