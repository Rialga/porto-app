import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile, nav } from '@/data/portfolio';

/**
 * Nav — sticky top bar.
 * - Hidden on scroll down, shown on scroll up (subtle editorial touch)
 * - Active section: mono number + label highlight with accent dot
 * - No logo image, just monogrammed initials in mono
 */
export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>('');
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 80);
      setLastY(y);

      // Determine active section
      const ids = ['about', 'work', 'stack', 'contact'];
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  const onClickAnchor = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const initials = profile.name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('');

  return (
    <AnimatePresence>
      <motion.header
        key="nav"
        initial={false}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="border-b border-[var(--border-soft)] bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] backdrop-blur-md">
          <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:h-16 md:px-8">
            <a
              href="#top"
              onClick={onClickAnchor('#top')}
              className="mono group flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[var(--fg)]"
              aria-label={`${profile.name} — home`}
            >
              <span className="rounded-sm border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-[var(--fg-muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
                {initials}
              </span>
              <span className="hidden sm:inline">{profile.name}</span>
              <span className="mono hidden text-[var(--fg-subtle)] sm:inline">/ portfolio</span>
            </a>

            <ul className="mono flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] sm:gap-2">
              {nav.map((item) => {
                const isActive = active === item.href.replace('#', '');
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={onClickAnchor(item.href)}
                      className={`group relative flex items-center gap-1.5 rounded-sm px-2 py-1.5 transition-colors ${
                        isActive
                          ? 'text-[var(--fg)]'
                          : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                      }`}
                    >
                      <span
                        className={`text-[10px] ${isActive ? 'text-[var(--accent)]' : 'text-[var(--fg-subtle)] group-hover:text-[var(--accent)]'}`}
                      >
                        {item.n}
                      </span>
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-1 -bottom-px h-px bg-[var(--accent)]"
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
              <li className="ml-1 sm:ml-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="mono flex items-center gap-1 rounded-sm border border-[var(--border)] px-2.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Hire
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}