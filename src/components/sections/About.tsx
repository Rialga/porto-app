import { profile } from '@/data/portfolio';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function About() {
  return (
    <section id="about" className="border-t border-[var(--border-soft)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionLabel number="01" label="About" />

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Title column */}
          <div className="md:col-span-4">
            <Reveal>
              <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-[1.15] tracking-tight text-[var(--fg)]">
                Building internal tools
                <br />
                that hold up under load.
              </h2>
            </Reveal>
          </div>

          {/* Body column */}
          <div className="md:col-span-8">
            <Reveal delay={0.08}>
              <div className="space-y-4 text-[15px] leading-[1.7] text-[var(--fg-muted)] md:text-[16px]">
                {profile.intro.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>

            {/* Beyond Code — single highlight, not a marketing list */}
            <Reveal delay={0.18}>
              <div className="mt-10 rounded-md border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="mono mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                  <span className="text-[var(--accent)]">/</span>
                  {profile.beyondCode[0].label}
                </div>
                <p className="text-[15px] leading-[1.7] text-[var(--fg)]">
                  {profile.beyondCode[0].body}
                </p>
              </div>
            </Reveal>

            {/* Quick facts — mono line */}
            <Reveal delay={0.26}>
              <dl className="mono mt-10 grid grid-cols-2 gap-y-3 text-[12px] uppercase tracking-[0.12em] sm:grid-cols-4">
                {[
                  ['Based', profile.location],
                  ['Role', profile.role],
                  ['Years', '4+'],
                  ['Email', profile.email],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[var(--fg-subtle)]">{k}</dt>
                    <dd className="mt-1 text-[var(--fg)]">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}