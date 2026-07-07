import { ArrowDownToLine, ArrowUpRight } from 'lucide-react'
import { Badge, Button, Magnetic } from '@/components/ui'
import { SocialIcon } from '@/components/molecules'
import { site } from '@/content/site'

export const ContactSection = () => (
  <section id="contact" aria-labelledby="contact-title" className="section">
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <p className="mono-caption">Contact</p>
          <h2 id="contact-title" className="display-1 mt-4">
            Let’s build
            <br />
            <span className="text-gradient">something calm.</span>
          </h2>
          <p className="mt-8 text-lg text-muted leading-relaxed max-w-xl">
            I’m currently open to senior frontend roles and select contract work. I’m most useful on
            products where craft, performance, and a real design partnership matter.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic strength={20}>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-foreground text-background px-6 text-base font-medium hover:bg-foreground/90 transition-colors"
              >
                {site.email}
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>
            <Button asChild variant="outline" size="lg">
              <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
                <ArrowDownToLine size={14} aria-hidden />
                Download résumé
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            <SocialIcon type="github" />
            <SocialIcon type="linkedin" />
            <SocialIcon type="email" />
          </div>
        </div>

        {/* Right card — facts */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="mono-caption">Working preferences</p>
              <Badge variant="success">Available · Q3 2026</Badge>
            </div>
            <dl className="mt-8 space-y-5 text-sm">
              <Row label="Timezone" value="WIB (UTC+7) · flexible" />
              <Row label="Engagement" value="Full-time · contract · fractional" />
              <Row label="Stack" value="React, TypeScript, Vue, Tailwind" />
              <Row label="Nice to have" value="Design system ownership, perf work" />
              <Row label="Not a fit" value="Crypto, gambling, anything predatory" />
            </dl>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-3 gap-4 pb-5 border-b border-border last:border-b-0 last:pb-0">
    <dt className="text-muted col-span-1">{label}</dt>
    <dd className="text-foreground col-span-2 font-medium">{value}</dd>
  </div>
)

export default ContactSection