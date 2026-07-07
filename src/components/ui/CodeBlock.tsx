import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Copy, Link as LinkIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  /** Optional filename / heading shown in the toolbar. */
  filename?: string
  className?: string
}

/**
 * Premium code block — reusable across the site. Has a copy button,
 * a "copy link to snippet" button, and a tiny token-tinted color hint.
 *
 * Token colors are intentionally minimal — we tint only string literals,
 * comments, and a handful of keywords. This is *visual* syntax coloring
 * for portfolio polish, not a full highlighter.
 */
export const CodeBlock = ({ code, language = 'tsx', filename, className }: CodeBlockProps) => {
  const reduced = useReducedMotion()
  const [copied, setCopied] = useState<'code' | 'link' | null>(null)
  const id = useIdSafe()

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied('code')
      window.setTimeout(() => setCopied(null), 1600)
    } catch {
      /* ignore */
    }
  }

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.href}#${id}`
      await navigator.clipboard.writeText(url)
      setCopied('link')
      window.setTimeout(() => setCopied(null), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <motion.div
      id={id}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative my-2 overflow-hidden rounded-xl border border-border bg-surface-2',
        className,
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-3 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-2">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2 rounded-full bg-foreground/20" />
            <span className="inline-block size-2 rounded-full bg-foreground/20" />
            <span className="inline-block size-2 rounded-full bg-foreground/20" />
          </span>
          <span className="font-mono uppercase tracking-[0.18em]">
            {filename ?? language}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={handleCopyCode}
            label={copied === 'code' ? 'Copied' : 'Copy code'}
            active={copied === 'code'}
            icon={<Copy size={13} aria-hidden />}
            activeIcon={<Check size={13} aria-hidden />}
          />
          <ToolbarButton
            onClick={handleCopyLink}
            label={copied === 'link' ? 'Link copied' : 'Copy link'}
            active={copied === 'link'}
            icon={<LinkIcon size={13} aria-hidden />}
            activeIcon={<Check size={13} aria-hidden />}
          />
        </div>
      </div>

      {/* Body */}
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed font-mono text-foreground">
        <code dangerouslySetInnerHTML={{ __html: tint(code, language) }} />
      </pre>
    </motion.div>
  )
}

const ToolbarButton = ({
  onClick,
  label,
  active,
  icon,
  activeIcon,
}: {
  onClick: () => void
  label: string
  active: boolean
  icon: React.ReactNode
  activeIcon: React.ReactNode
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={cn(
      'inline-flex items-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-xs font-medium transition-colors',
      active
        ? 'border-accent/40 bg-accent-soft text-accent'
        : 'text-muted hover:border-border-strong hover:bg-surface hover:text-foreground',
    )}
  >
    {active ? activeIcon : icon}
    <span>{active && label.startsWith('Copied') ? label : label.split(' ')[0]}</span>
  </button>
)

/**
 * Tiny token tinting. Just enough to feel like a real syntax highlighter
 * without pulling in prism / shiki and inflating the bundle.
 *
 * The output HTML uses inline color tokens via Tailwind arbitrary classes
 * (defined in the @theme layer of global.css).
 */
const tint = (raw: string, _lang: string): string => {
  let out = escapeHtml(raw)

  // Comments — line and block.
  out = out.replace(/(\/\/[^\n]*)/g, '<span class="text-muted-2 italic">$1</span>')
  out = out.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-muted-2 italic">$1</span>')
  out = out.replace(/(^|\n)(#[^\n]*)/g, '$1<span class="text-muted-2 italic">$2</span>')

  // Strings (double + single quoted + template).
  out = out.replace(/(`[^`]*`)/g, '<span class="text-[color:var(--code-string)]">$1</span>')
  out = out.replace(/(&quot;[^&]*?&quot;)/g, '<span class="text-[color:var(--code-string)]">$1</span>')
  out = out.replace(/(&#39;[^&]*?&#39;)/g, '<span class="text-[color:var(--code-string)]">$1</span>')

  // Keywords (small, common set).
  const kws =
    /\b(import|export|from|const|let|var|function|return|if|else|switch|case|default|new|class|extends|interface|type|as|async|await|try|catch|finally|throw|of|in|for|while|do|break|continue|void|null|undefined|true|false)\b/g
  out = out.replace(kws, '<span class="text-[color:var(--code-keyword)]">$1</span>')

  // Numbers.
  out = out.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="text-[color:var(--code-number)]">$1</span>')

  // JSX/HTML tag names — `<Foo>` or `</Foo>`.
  out = out.replace(/(&lt;\/?)([A-Za-z][A-Za-z0-9-]*)/g, '$1<span class="text-[color:var(--code-tag)]">$2</span>')

  return out
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/** Stable-ish id for the anchor link, computed once per mount. */
let counter = 0
const useIdSafe = (): string => {
  const [id] = useState(() => `code-${++counter}`)
  useEffect(() => {
    /* keep counter stable */
  }, [])
  return id
}

export default CodeBlock