import { Marquee } from '@/components/ui'

interface StackStripProps {
  items: readonly string[]
  speed?: number
  className?: string
}

/**
 * Horizontal marquee of stack names — sits between hero and the rest of
 * the page to reinforce "senior engineer, modern stack" without taking
 * screen space.
 */
export const StackStrip = ({ items, speed = 50, className }: StackStripProps) => (
  <Marquee speed={speed} className={className}>
    {items.map(item => (
      <span
        key={item}
        className="font-mono text-sm uppercase tracking-[0.22em] text-muted"
      >
        {item}
      </span>
    ))}
  </Marquee>
)

export default StackStrip