import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * useFocusTrap — vanilla focus trap for a dialog root.
 *
 * - Tab cycles forward inside root
 * - Shift+Tab cycles backward
 * - On mount, focuses first focusable (use initialFocusRef for override)
 * - On unmount, returns focus to triggerRef
 */
export function useFocusTrap(
  enabled: boolean,
  rootRef: React.RefObject<HTMLElement | null>,
  triggerRef?: React.RefObject<HTMLElement | null>,
  initialFocusRef?: React.RefObject<HTMLElement | null>,
) {
  // Keep latest refs accessible from the document keydown listener
  const rootRefLatest = useRef(rootRef.current);
  const triggerRefLatest = useRef(triggerRef?.current);
  const initialRefLatest = useRef(initialFocusRef?.current);

  useEffect(() => {
    rootRefLatest.current = rootRef.current;
    triggerRefLatest.current = triggerRef?.current ?? null;
    initialRefLatest.current = initialFocusRef?.current ?? null;
  });

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    if (!root) return;

    // Focus initial element (or first focusable) — on next tick so
    // AnimatePresence has mounted + accessibility tree is ready.
    const focusInitial = () => {
      const target = initialRefLatest.current ?? root.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      target?.focus({ preventScroll: true });
    };

    const raf = requestAnimationFrame(focusInitial);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const rootEl = rootRefLatest.current;
      if (!rootEl) return;

      const focusables = Array.from(
        rootEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute('aria-hidden') && el.offsetParent !== null);

      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !rootEl.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !rootEl.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      // Return focus to trigger
      triggerRefLatest.current?.focus({ preventScroll: true });
    };
  }, [enabled, rootRef, triggerRef, initialFocusRef]);
}
