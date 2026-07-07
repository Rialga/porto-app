import { skillCategories, primaryStack } from '@/content/skills'
import { SectionHeading } from '@/components/ui'
import { MotionReveal } from '@/components/atoms'
import { SkillChip, StackStrip } from '@/components/molecules'

export const SkillsSection = () => (
  <section id="skills" aria-labelledby="skills-title" className="section">
    <div className="container">
      <SectionHeading
        eyebrow="Skills"
        title={
          <span id="skills-title">
            The toolbox, ordered by what I reach for first.
          </span>
        }
        lede="Same taxonomy as my résumé — grouped by role, kept honest about depth."
      />

      {/* Primary stack strip */}
      <MotionReveal as="div" direction="up" delay={0.1} className="mt-10">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-5">
          <span className="mono-caption shrink-0">Primary stack</span>
          <div className="flex-1 min-w-0">
            <StackStrip items={primaryStack} speed={42} />
          </div>
        </div>
      </MotionReveal>

      {/* Categorized grids */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {skillCategories.map((category, ci) => (
          <MotionReveal
            key={category.id}
            as="div"
            direction="up"
            delay={ci * 0.06}
            className="rounded-2xl border border-border bg-surface p-6 md:p-8"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold text-foreground">{category.label}</h3>
              <span className="font-mono text-xs text-muted-2 tabular-nums">
                {String(ci + 1).padStart(2, '0')} / {String(skillCategories.length).padStart(2, '0')}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <SkillChip key={skill.name} name={skill.name} />
              ))}
            </div>
          </MotionReveal>
        ))}
      </div>
    </div>
  </section>
)

export default SkillsSection