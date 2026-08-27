import { useCallback, useRef, useState } from 'react';
import type { Project } from '@/data/portfolio';
import { projects } from '@/data/portfolio';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectRow } from '@/components/ui/ProjectRow';
import { ProjectDrawer } from '@/components/ProjectDrawer';
import posePortal from '@/assets/images/pose-portal.jpg';
import poseExternal from '@/assets/images/pose-external.jpg';
import mentor from '@/assets/images/mentor.jpg';
import tap from '@/assets/images/tap.jpg';
import reKerjaYuk from '@/assets/images/re-kerja-yuk.jpg';
import kyLoyalty from '@/assets/images/ky-loyalty.jpg';
import posePpob from '@/assets/images/poseppob.jpg';

/* Same map as in ProjectRow — kept here so the drawer can resolve the
   hero image independently of the row's lifecycle. */
const IMAGE_BY_PROJECT: Record<string, string> = {
  'POSe PPOB': posePpob,
  'POSe Portal': posePortal,
  'POSe External': poseExternal,
  'MENTOR': mentor,
  'TAP': tap,
  'RE-KerjaYuk!': reKerjaYuk,
  'KY-Loyalty': kyLoyalty,
};

export function SelectedWork() {
  const [active, setActive] = useState<Project | null>(null);
  // Stable ref to the most recently clicked trigger button — passed to the
  // drawer so it can return focus on close.
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefBag = useRef<HTMLButtonElement | null>(null);

  const handleOpen = useCallback(
    (project: Project, triggerRef: React.RefObject<HTMLButtonElement | null>) => {
      // Snapshot the live DOM node now — ref.current is stable across renders
      // but we want the element that was actually clicked.
      triggerRefBag.current = triggerRef.current;
      lastTriggerRef.current = triggerRef.current;
      setActive(project);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setActive(null);
  }, []);

  const drawerImageSrc = active ? IMAGE_BY_PROJECT[active.title] : undefined;

  return (
    <section id="work" className="border-t border-[var(--border-soft)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionLabel number="02" label="Selected Work" />

        <Reveal>
          <div className="mt-10 mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-[1.15] tracking-tight text-[var(--fg)]">
              Seven projects from POSe ID,
              <br className="hidden md:block" />
              the operational backbone for the POSe ecosystem.
            </h2>
            <p
              className="max-w-sm text-[12px] uppercase leading-relaxed tracking-[0.16em] text-[var(--fg-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Seven products, four years, one team. Internal tools that
              <br className="hidden md:block" />
              run the day-to-day of POSe operations.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            {projects.map((project) => (
              <ProjectRow
                key={project.slug}
                project={project}
                onOpen={handleOpen}
                activeSlug={active?.slug ?? null}
              />
            ))}
          </div>
        </Reveal>
      </div>

      <ProjectDrawer
        project={active}
        imageSrc={drawerImageSrc}
        onClose={handleClose}
        triggerRef={lastTriggerRef}
      />
    </section>
  );
}
