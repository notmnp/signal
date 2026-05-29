"use client";

import { useState } from "react";
import type { Habit } from "@/lib/types";

interface HabitListProps {
  habits: Habit[];
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

/**
 * Renders the full habit list with per-item edit/delete actions and a create
 * action. Deletion requires inline confirmation before `onDelete` is fired;
 * cancelling the confirmation leaves the list untouched. Habits are rendered in
 * the order received (creation order, owned by useHabits).
 */
export default function HabitList({
  habits,
  onEdit,
  onDelete,
  onCreate,
}: HabitListProps) {
  // Id of the habit currently awaiting delete confirmation, if any.
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Habits</h1>
        <button
          type="button"
          onClick={onCreate}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          New habit
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="rounded-lg border border-dashed border-black/15 p-8 text-center dark:border-white/20">
          <p className="text-black/60 dark:text-white/60">
            No habits yet. Create your first habit to start tracking.
          </p>
          <button
            type="button"
            onClick={onCreate}
            className="mt-4 rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            Create a habit
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {habits.map((habit) => (
            <li
              key={habit.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-black/10 p-4 dark:border-white/15"
            >
              <div className="min-w-0">
                <p className="font-medium">{habit.name}</p>
                {habit.description && (
                  <p className="mt-0.5 text-sm text-black/60 dark:text-white/60">
                    {habit.description}
                  </p>
                )}
              </div>

              {confirmingId === habit.id ? (
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm text-black/60 dark:text-white/60">
                    Delete?
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(habit.id);
                      setConfirmingId(null);
                    }}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingId(null)}
                    className="rounded-md border border-black/15 px-3 py-1.5 text-sm font-medium dark:border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(habit)}
                    className="rounded-md border border-black/15 px-3 py-1.5 text-sm font-medium dark:border-white/20"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingId(habit.id)}
                    className="rounded-md border border-black/15 px-3 py-1.5 text-sm font-medium text-red-600 dark:border-white/20"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
