"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface DayCellProps {
  date: string;
  completedCount: number;
  totalHabits: number;
  isToday: boolean;
  onSelect: (date: string) => void;
}

/** Monochrome ink fill intensity scaled to the day's completion ratio. */
function intensityClass(completedCount: number, totalHabits: number): string {
  if (totalHabits === 0 || completedCount === 0)
    return "border-border bg-transparent hover:bg-muted";
  const ratio = completedCount / totalHabits;
  if (ratio >= 1) return "border-transparent bg-ink text-ink-foreground";
  if (ratio >= 0.66) return "border-transparent bg-ink/60 text-ink-foreground";
  if (ratio >= 0.34) return "border-transparent bg-ink/30";
  return "border-transparent bg-ink/14";
}

/**
 * Purely presentational heatmap cell. Derives an emerald intensity from the
 * completion ratio, rings today, scales on hover, and fires onSelect on click.
 */
export default function DayCell({
  date,
  completedCount,
  totalHabits,
  isToday,
  onSelect,
}: DayCellProps) {
  const day = Number(date.split("-")[2]);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(date)}
      whileHover={{ scale: 1.09 }}
      whileTap={{ scale: 0.94 }}
      aria-label={`${date}${isToday ? " (today)" : ""}: ${completedCount} of ${totalHabits} completed`}
      title={`${completedCount}/${totalHabits} completed`}
      className={cn(
        "relative grid aspect-square place-items-center rounded-lg border text-sm transition-colors",
        intensityClass(completedCount, totalHabits),
        isToday && "ring-2 ring-foreground ring-offset-2 ring-offset-background"
      )}
    >
      <span
        className={cn(
          "tabular-nums",
          totalHabits === 0 || completedCount === 0
            ? "text-muted-foreground"
            : "text-current"
        )}
      >
        {day}
      </span>
    </motion.button>
  );
}
