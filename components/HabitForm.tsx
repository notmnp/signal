"use client";

import { useState } from "react";
import type { Habit } from "@/lib/types";

interface HabitFormProps {
  /** When provided, the form opens in edit mode pre-populated with this habit. */
  habit?: Habit;
  /** Called with trimmed name and description on a valid submission. */
  onSubmit: (name: string, description: string) => void;
  /** Called when the user cancels; the parent dismisses the form. */
  onCancel: () => void;
}

/**
 * Controlled create/edit form for a habit.
 *
 * Validates that Name is non-empty before submitting; on failure it shows an
 * inline error and does not call `onSubmit`. Storage is the parent's concern —
 * this component only reports the entered values back via `onSubmit`.
 */
export default function HabitForm({ habit, onSubmit, onCancel }: HabitFormProps) {
  const [name, setName] = useState(habit?.name ?? "");
  const [description, setDescription] = useState(habit?.description ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName === "") {
      setError("Name is required.");
      return;
    }
    setError(null);
    onSubmit(trimmedName, description.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <h2 className="text-lg font-semibold">
        {habit ? "Edit habit" : "New habit"}
      </h2>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Name</span>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoFocus
          aria-invalid={error ? true : undefined}
          className="rounded-md border border-black/15 px-3 py-2 dark:border-white/20 dark:bg-neutral-900"
        />
        {error && <span className="text-sm text-red-600">{error}</span>}
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">
          Description <span className="text-black/40 dark:text-white/40">(optional)</span>
        </span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          className="rounded-md border border-black/15 px-3 py-2 dark:border-white/20 dark:bg-neutral-900"
        />
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          {habit ? "Save changes" : "Create habit"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-black/15 px-4 py-2 text-sm font-medium dark:border-white/20"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
