import { profile } from '@/data/portfolio';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ArrowUpRight } from './icons';

export function Contact() {
  return (
    <section id="contact" className="border-t border-[var(--border-soft)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionLabel number="04" label="Contact" />

        <Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-10">
            {/* Title + email CTA */}
            <div className="md:col-span-8">
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-[var(--fg)]">
                Want to talk shop
                <br />
                about a frontend role?
              </h2>

              <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-[var(--fg-muted)] md:text-[16px]">
                Open to senior frontend positions and select consulting work. The fastest way in is email — I reply within a couple of days.
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="mono group mt-8 inline-flex items-center gap-2 border-b border-[var(--accent)] pb-2 text-[clamp(1.25rem,2.4vw,1.85rem)] font-medium tracking-tight text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
              >
                {profile.email}
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Aside */}
            <aside className="md:col-span-4 md:pt-2">
              <dl className="mono space-y-5 text-[12px] uppercase tracking-[0.14em]">
                <div>
                  <dt className="text-[var(--fg-subtle)]">Phone</dt>
                  <dd className="mt-1 text-[var(--fg)]">
                    <a
                      href={`tel:${profile.phone.replace(/\s/g, '')}`}
                      className="link-underline"
                    >
                      {profile.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[var(--fg-subtle)]">Based in</dt>
                  <dd className="mt-1 text-[var(--fg)]">{profile.location}</dd>
                </div>
                <div>
                  <dt className="text-[var(--fg-subtle)]">Status</dt>
                  <dd className="mt-1 flex items-center gap-2 text-[var(--fg)]">
                    <span className="relative inline-flex h-1.5 w-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                      <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    </span>
                    {profile.status}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </Reveal>

        {/* Social row */}
        <Reveal delay={0.1}>
          <ul className="mono mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] uppercase tracking-[0.18em]">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group inline-flex items-center gap-2 text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                >
                  <span className="link-underline">{s.label}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Footer line */}
      <div className="mx-auto mt-24 max-w-6xl px-5 md:px-8">
        <div className="mono flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-soft)] pt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Designed + built in South Tangerang</span>
        </div>
      </div>
    </section>
  );
}