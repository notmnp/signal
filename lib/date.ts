/** Date helpers shared across the daily log and calendar. All arithmetic is
 *  done on local-time Date objects parsed from component parts so there is no
 *  UTC off-by-one drift. */

/** Format a Date as a local "YYYY-MM-DD" string. */
export function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Parse "YYYY-MM-DD" into a local-time Date at midnight. */
export function parseISODate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Today in the user's local timezone as "YYYY-MM-DD". */
export function todayISO(): string {
  return toISODate(new Date());
}

/** The ISO date `delta` calendar days away from `date`. */
export function addDays(date: string, delta: number): string {
  const d = parseISODate(date);
  d.setDate(d.getDate() + delta);
  return toISODate(d);
}

/** Long, human-readable label, e.g. "Friday, May 29, 2026". */
export function formatLong(date: string): string {
  return parseISODate(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** A short relative label for today / yesterday / tomorrow, else null. */
export function relativeLabel(date: string, today = todayISO()): string | null {
  if (date === today) return "Today";
  if (date === addDays(today, -1)) return "Yesterday";
  if (date === addDays(today, 1)) return "Tomorrow";
  return null;
}
