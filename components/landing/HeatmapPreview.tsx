/**
 * A decorative, deterministic completion heatmap for the landing page — shows
 * off the calendar aesthetic without any real data. Presentational.
 */
const LEVEL_CLASS = [
  "border border-border",
  "bg-ink/14",
  "bg-ink/30",
  "bg-ink/60",
  "bg-ink",
];

// A fixed, pleasant-looking distribution (no Math.random → no hydration drift).
const PATTERN = [4, 3, 1, 4, 2, 0, 3, 4, 2, 4, 1, 3, 4, 0, 2, 4, 3, 1, 4, 2, 3, 0, 4, 2];

export default function HeatmapPreview({ columns = 20, rows = 7 }: { columns?: number; rows?: number }) {
  const cells = Array.from({ length: columns * rows }, (_, i) => PATTERN[(i * 7 + 3) % PATTERN.length]);
  return (
    <div
      className="grid w-full gap-1.5"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      aria-hidden
    >
      {cells.map((level, i) => (
        <span
          key={i}
          className={`aspect-square rounded-[4px] ${LEVEL_CLASS[level]}`}
        />
      ))}
    </div>
  );
}
