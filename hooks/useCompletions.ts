"use client";

import { useEffect, useState } from "react";
import type { CompletionsMap } from "@/lib/types";

const COMPLETIONS_KEY = "signal:completions";

/** Read and parse the completions map, falling back to {} on missing/corrupt data. */
function readCompletions(): CompletionsMap {
  try {
    const raw = localStorage.getItem(COMPLETIONS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as CompletionsMap) : {};
  } catch {
    return {};
  }
}

function writeCompletions(map: CompletionsMap): void {
  localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(map));
}

/**
 * Manages the date-keyed completions map in `localStorage`.
 *
 * Reads `signal:completions` on mount (defaulting to `{}`) and writes back on
 * every toggle. Completion state for one date is fully independent of any other.
 */
export function useCompletions() {
  const [completions, setCompletions] = useState<CompletionsMap>({});

  useEffect(() => {
    setCompletions(readCompletions());
  }, []);

  /** Add the habitId to the date if absent, remove it if present (set semantics). */
  const toggleCompletion = (habitId: string, date: string): void => {
    setCompletions((prev) => {
      const current = prev[date] ?? [];
      const next: CompletionsMap = { ...prev };
      if (current.includes(habitId)) {
        const remaining = current.filter((id) => id !== habitId);
        if (remaining.length > 0) next[date] = remaining;
        else delete next[date];
      } else {
        next[date] = [...current, habitId];
      }
      writeCompletions(next);
      return next;
    });
  };

  const isCompleted = (habitId: string, date: string): boolean =>
    (completions[date] ?? []).includes(habitId);

  const getCompletionsForDate = (date: string): string[] =>
    completions[date] ?? [];

  /**
   * Returns a map of date string -> completed habit count for every date in the
   * given year/month. `month` is 1-indexed (1 = January).
   */
  const getCompletionsByMonth = (
    year: number,
    month: number
  ): Record<string, number> => {
    const prefix = `${year}-${String(month).padStart(2, "0")}-`;
    const result: Record<string, number> = {};
    for (const [date, habitIds] of Object.entries(completions)) {
      if (date.startsWith(prefix)) {
        result[date] = habitIds.length;
      }
    }
    return result;
  };

  return {
    toggleCompletion,
    isCompleted,
    getCompletionsForDate,
    getCompletionsByMonth,
  };
}
