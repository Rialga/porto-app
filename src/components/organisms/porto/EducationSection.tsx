import { GraduationCap } from 'lucide-react'
import { SectionHeading } from '@/components/ui'
import { MotionReveal } from '@/components/atoms'

interface Education {
  school: string
  degree: string
  period: string
  location: string
  meta: string
  /** Final-year project or notable work. */
  project?: {
    title: string
    body: string
    stack: string[]
  }
}

const education: Education[] = [
  {
    school: 'Andalas University',
    degree: 'Bachelor of Information Systems',
    period: 'Graduated Feb 2021',
    location: 'Padang, Indonesia',
    meta: 'GPA 3.33 / 4.00',
    project: {
      title: 'Final Year Project — Web-based Outdoor Equipment Rental',
      body:
        'Full-stack academic project covering property listing, booking management, and an admin dashboard — built solo end-to-end.',
      stack: ['Laravel', 'MySQL'],
    },
  },
]

export const EducationSection = () => (
  <section id="education" aria-labelledby="education-title" className="section">
    <div className="container">
      <SectionHeading
        eyebrow="Education"
        title={
          <span id="education-title">Where the foundation was laid.</span>
        }
        lede="And one academic project that started a habit of building whole products."
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {education.map((ed, i) => (
          <MotionReveal
            key={ed.school}
            as="article"
            direction="up"
            delay={i * 0.06}
            className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6 md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-xl border border-border-strong bg-surface-2 text-foreground">
                <GraduationCap size={16} aria-hidden />
              </span>
              <p className="mono-caption">{ed.period}</p>
            </div>

            <h3 className="mt-6 text-2xl md:text-3xl font-semibold text-foreground leading-tight">
              {ed.degree}
            </h3>
            <p className="mt-1 text-base text-accent font-medium">
              {ed.school}
              <span className="text-muted font-normal"> · {ed.location}</span>
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="mono-caption">GPA</dt>
                <dd className="mt-1 text-foreground font-medium">{ed.meta}</dd>
              </div>
              <div>
                <dt className="mono-caption">Duration</dt>
                <dd className="mt-1 text-foreground font-medium">2016 — 2021</dd>
              </div>
            </dl>

            {ed.project && (
              <div className="mt-8 rounded-xl border border-border bg-surface-2 p-5">
                <p className="mono-caption">{ed.project.title}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">{ed.project.body}</p>
                <p className="mt-3 text-xs font-mono text-muted-2">
                  {ed.project.stack.join(' · ')}
                </p>
              </div>
            )}
          </MotionReveal>
        ))}

        <MotionReveal
          as="aside"
          direction="up"
          delay={0.08}
          className="lg:col-span-5 rounded-2xl border border-border bg-surface-2/40 p-6 md:p-8 flex flex-col justify-between gap-6"
        >
          <div>
            <p className="mono-caption mb-3">Continuing the habit</p>
            <p className="text-lg text-foreground leading-relaxed">
              Since graduating I’ve kept the same instinct the FYP required: build the whole thing —
              frontend, data layer, deploy — and ship it to someone who will use it.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="mono-caption">Reading</p>
              <p className="mt-1 text-foreground">Designing Data-Intensive Applications</p>
            </div>
            <div>
              <p className="mono-caption">Side projects</p>
              <p className="mt-1 text-foreground">This portfolio, mostly.</p>
            </div>
          </div>
        </MotionReveal>
      </div>
    </div>
  </section>
)

export default EducationSection