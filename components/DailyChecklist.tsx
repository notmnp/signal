"use client";

import Link from "next/link";
import type { Habit } from "@/lib/types";

interface DailyChecklistProps {
  habits: Habit[];
  /** Habit ids completed on the active Log Date. */
  completedIds: string[];
  /** Called when an item is checked or unchecked; the parent persists the toggle. */
  onToggle: (habitId: string) => void;
}

/**
 * Renders every habit as a checkable item for the active Log Date. An item is
 * checked when its id is in `completedIds`. Toggling reports back via `onToggle`
 * (the parent writes to storage). Shows an empty state linking to /habits when
 * there are no habits.
 */
export default function DailyChecklist({
  habits,
  completedIds,
  onToggle,
}: DailyChecklistProps) {
  if (habits.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-black/15 p-8 text-center dark:border-white/20">
        <p className="text-black/60 dark:text-white/60">
          No habits yet. Create one to start logging your days.
        </p>
        <Link
          href="/habits"
          className="mt-4 inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          Go to Habits
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {habits.map((habit) => {
        const checked = completedIds.includes(habit.id);
        return (
          <li key={habit.id}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-black/10 p-4 dark:border-white/15">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(habit.id)}
                className="mt-1 size-4"
              />
              <span className="min-w-0">
                <span className="block font-medium">{habit.name}</span>
                {habit.description && (
                  <span className="mt-0.5 block text-sm text-black/60 dark:text-white/60">
                    {habit.description}
                  </span>
                )}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
