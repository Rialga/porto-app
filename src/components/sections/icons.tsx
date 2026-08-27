// Tiny inline icons — avoids pulling lucide-react for these two glyphs only.
// Keep these inline so the section reads cleanly as one file.

export function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 7h10" />
      <path d="M8 3l4 4-4 4" />
    </svg>
  );
}

export function ArrowDown({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 2v10" />
      <path d="M3 8l4 4 4-4" />
    </svg>
  );
}

export function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 10L10 4" />
      <path d="M5 4h5v5" />
    </svg>
  );
}