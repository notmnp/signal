/**
 * Shared data contracts for Signal.
 *
 * These types are the boundary between the Local Storage Store (the `useHabits`
 * and `useCompletions` hooks) and every feature component that consumes them.
 */

/** A user-defined activity to be tracked daily. Persisted under `signal:habits`. */
export interface Habit {
  /** UUID assigned via crypto.randomUUID() at creation time; never mutated. */
  id: string;
  /** Required, non-empty display name. */
  name: string;
  /** Optional free-form detail. May be an empty string. */
  description: string;
  /** ISO 8601 datetime the habit was created. */
  createdAt: string;
}

/**
 * Completions map persisted under `signal:completions`.
 *
 * Keyed by ISO 8601 date string (e.g. "2026-05-29"); the value is the list of
 * habit ids completed on that date. At most one entry per (habitId, date) pair.
 */
export type CompletionsMap = Record<string, string[]>;
