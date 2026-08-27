import { projects } from '@/data/portfolio';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectRow } from '@/components/ui/ProjectRow';

export function SelectedWork() {
  return (
    <section id="work" className="border-t border-[var(--border-soft)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionLabel number="02" label="Selected Work" />

        <Reveal>
          <div className="mt-10 mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-[1.15] tracking-tight text-[var(--fg)]">
              Six projects from PCS Payment Indonesia,
              <br className="hidden md:block" />
              the operational backbone for the POSe ecosystem.
            </h2>
            <p className="mono max-w-sm text-[12px] uppercase leading-relaxed tracking-[0.12em] text-[var(--fg-muted)]">
              Six products, four years, one team. Internal tools that
              <br className="hidden md:block" />
              run the day-to-day of PCS operations.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            {projects.map((project) => (
              <ProjectRow key={project.index} project={project} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}