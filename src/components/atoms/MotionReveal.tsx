import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface MotionRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

const MotionReveal = ({
  children,
  direction = 'up',
  delay = 0.1,
  duration = 0.4,
  className = '',
  once = true,
}: MotionRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  } as any

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default MotionReveal
