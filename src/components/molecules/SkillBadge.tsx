import Badge from '@/components/atoms/Badge'

interface SkillBadgeProps {
  skill: string
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export default function SkillBadge({
  skill,
  proficiency = 'intermediate',
}: SkillBadgeProps) {
  const proficiencyColors = {
    beginner: 'bg-gray-200 text-gray-800',
    intermediate: 'bg-blue-200 text-blue-800',
    advanced: 'bg-green-200 text-green-800',
    expert: 'bg-accent text-accent-foreground',
  }

  return (
    <Badge variant="secondary" className={proficiencyColors[proficiency]}>
      {skill}
    </Badge>
  )
}
