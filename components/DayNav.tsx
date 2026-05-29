"use client";

interface DayNavProps {
  /** Current Log Date as an ISO 8601 date string, e.g. "2026-05-29". */
  date: string;
  /** Called with the new ISO date string when the user steps a day. */
  onChange: (date: string) => void;
}

/** Format a "YYYY-MM-DD" Date object back into a "YYYY-MM-DD" string. */
function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Parse "YYYY-MM-DD" into a local-time Date at midnight (no timezone shift). */
function parseISODate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Return the ISO date `delta` calendar days away from `date`. */
function addDays(date: string, delta: number): string {
  const d = parseISODate(date);
  d.setDate(d.getDate() + delta);
  return toISODate(d);
}

/**
 * Controlled day stepper. Displays the Log Date prominently and steps it one
 * calendar day at a time via the parent's onChange. Navigation is unrestricted
 * in both directions — past and future days are allowed.
 */
export default function DayNav({ date, onChange }: DayNavProps) {
  const label = parseISODate(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={() => onChange(addDays(date, -1))}
        aria-label="Previous day"
        className="rounded-md border border-black/15 px-3 py-2 text-sm font-medium dark:border-white/20"
      >
        ← Prev
      </button>

      <h1 className="text-center text-lg font-semibold tracking-tight">
        {label}
      </h1>

      <button
        type="button"
        onClick={() => onChange(addDays(date, 1))}
        aria-label="Next day"
        className="rounded-md border border-black/15 px-3 py-2 text-sm font-medium dark:border-white/20"
      >
        Next →
      </button>
    </div>
  );
}
