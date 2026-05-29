import { cn } from "@/lib/utils";

/**
 * The Signal wordmark: a small, understated pulse mark beside the name set in
 * the display serif. Monochrome and quiet. Presentational.
 */
export default function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-7 place-items-center rounded-md border border-border">
        <svg
          viewBox="0 0 28 28"
          className="size-4 text-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M2 14 H8 L11 7 L15 21 L18 12 L20 14 H26" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-xl font-semibold tracking-tight">
          Signal
        </span>
      )}
    </span>
  );
}
