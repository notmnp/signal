import { addDays, todayISO } from "@/lib/date";

/**
 * Current streak: the number of consecutive days, ending today (or yesterday
 * if today isn't done yet), on which every habit was completed.
 *
 * A "perfect day" requires at least one habit to exist and all of them to be
 * completed. Counting starts at today when today is already perfect, otherwise
 * at yesterday — so an unfinished today never breaks an active streak.
 *
 * @param countForDate returns how many habits were completed on a given date.
 */
export function computeStreak(
  countForDate: (date: string) => number,
  totalHabits: number,
  today: string = todayISO()
): number {
  if (totalHabits === 0) return 0;

  const isPerfect = (date: string) => countForDate(date) >= totalHabits;

  let cursor = isPerfect(today) ? today : addDays(today, -1);
  let streak = 0;
  // Cap the walk-back to avoid an unbounded loop on corrupt data.
  for (let i = 0; i < 3660 && isPerfect(cursor); i++) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}
