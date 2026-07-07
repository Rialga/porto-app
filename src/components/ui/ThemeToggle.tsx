import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/providers/ThemeProvider'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

/**
 * Pill-shaped theme toggle. Renders inside the header; controlled by
 * `useThemeStore` so multiple instances stay in sync.
 */
export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const theme = useThemeStore(s => s.theme)
  const toggle = useThemeStore(s => s.toggle)
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={isDark}
      className={cn(
        'group relative inline-flex h-10 w-[68px] items-center rounded-full',
        'border border-border-strong bg-surface-2',
        'transition-colors duration-300',
        'hover:border-foreground/30',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      {/* Track icons */}
      <Sun
        size={14}
        aria-hidden
        className={cn(
          'absolute left-2.5 transition-opacity duration-300',
          isDark ? 'opacity-30' : 'opacity-0',
        )}
        strokeWidth={1.75}
      />
      <Moon
        size={14}
        aria-hidden
        className={cn(
          'absolute right-2.5 transition-opacity duration-300',
          isDark ? 'opacity-0' : 'opacity-30',
        )}
        strokeWidth={1.75}
      />
      {/* Thumb */}
      <span
        aria-hidden
        className={cn(
          'absolute top-1 size-8 rounded-full bg-foreground text-background',
          'flex items-center justify-center shadow-[var(--shadow-sm)]',
          'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isDark ? 'translate-x-9' : 'translate-x-1',
        )}
      >
        {isDark ? <Moon size={14} strokeWidth={2} /> : <Sun size={14} strokeWidth={2} />}
      </span>
    </button>
  )
}