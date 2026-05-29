"use client";

interface DayCellProps {
  /** ISO date string for this cell, e.g. "2026-05-29". */
  date: string;
  /** Number of habits completed on this date. */
  completedCount: number;
  /** Total number of habits currently defined. */
  totalHabits: number;
  /** Whether this cell represents the current calendar day. */
  isToday: boolean;
  onSelect: (date: string) => void;
}

type VisualState = "neutral" | "partial" | "full";

function deriveState(completedCount: number, totalHabits: number): VisualState {
  if (totalHabits === 0 || completedCount === 0) return "neutral";
  if (completedCount === totalHabits) return "full";
  return "partial";
}

const STATE_STYLES: Record<VisualState, string> = {
  neutral: "bg-transparent text-black/70 dark:text-white/70",
  partial: "bg-emerald-200 text-emerald-950 dark:bg-emerald-800/60 dark:text-emerald-50",
  full: "bg-emerald-500 text-white dark:bg-emerald-500",
};

/**
 * Purely presentational calendar cell. Derives a neutral/partial/full visual
 * state from the completion props, highlights today, and fires onSelect on
 * click. Holds no internal state.
 */
export default function DayCell({
  date,
  completedCount,
  totalHabits,
  isToday,
  onSelect,
}: DayCellProps) {
  const state = deriveState(completedCount, totalHabits);
  const dayNumber = Number(date.split("-")[2]);

  return (
    <button
      type="button"
      onClick={() => onSelect(date)}
      aria-label={`${date}${isToday ? " (today)" : ""}`}
      className={[
        "flex aspect-square items-center justify-center rounded-md text-sm font-medium transition-colors",
        STATE_STYLES[state],
        isToday ? "ring-2 ring-black ring-offset-1 dark:ring-white" : "",
      ].join(" ")}
    >
      {dayNumber}
    </button>
  );
}
