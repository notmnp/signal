"use client";

import { useEffect, useState } from "react";
import type { CompletionsMap, Habit } from "@/lib/types";

const HABITS_KEY = "signal:habits";
const COMPLETIONS_KEY = "signal:completions";

/** Read and parse the habit list, falling back to [] on missing/corrupt data. */
function readHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(HABITS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Habit[]) : [];
  } catch {
    return [];
  }
}

function writeHabits(habits: Habit[]): void {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}

/**
 * Single source of truth for habit CRUD, backed by `localStorage`.
 *
 * Reads `signal:habits` on mount (defaulting to `[]` on missing or corrupt
 * data) and writes back after every mutation. Deleting a habit also atomically
 * purges its completions from `signal:completions` so no orphaned records remain.
 */
export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    setHabits(readHabits());
  }, []);

  const createHabit = (name: string, description = ""): void => {
    const habit: Habit = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => {
      const next = [...prev, habit];
      writeHabits(next);
      return next;
    });
  };

  const updateHabit = (id: string, name: string, description = ""): void => {
    setHabits((prev) => {
      const next = prev.map((habit) =>
        habit.id === id ? { ...habit, name, description } : habit
      );
      writeHabits(next);
      return next;
    });
  };

  const deleteHabit = (id: string): void => {
    setHabits((prev) => {
      const next = prev.filter((habit) => habit.id !== id);
      writeHabits(next);
      return next;
    });

    // Atomically remove all completions referencing the deleted habit so that
    // no orphaned completion records survive the deletion.
    try {
      const raw = localStorage.getItem(COMPLETIONS_KEY);
      const map: CompletionsMap = raw ? JSON.parse(raw) : {};
      const cleaned: CompletionsMap = {};
      for (const [date, habitIds] of Object.entries(map)) {
        const remaining = habitIds.filter((habitId) => habitId !== id);
        if (remaining.length > 0) cleaned[date] = remaining;
      }
      localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(cleaned));
    } catch {
      // Corrupt completions data: nothing reliable to purge, leave as-is.
    }
  };

  return { habits, createHabit, updateHabit, deleteHabit };
}
