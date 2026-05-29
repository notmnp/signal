"use client";

import DayCell from "@/components/DayCell";

interface CalendarGridProps {
  year: number;
  /** 1-indexed month (1 = January). */
  month: number;
  /** Map of "YYYY-MM-DD" -> completed habit count for the active month. */
  completionsByDate: Record<string, number>;
  totalHabits: number;
  onDaySelect: (date: string) => void;
  onMonthChange: (year: number, month: number) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Today in the user's local timezone as "YYYY-MM-DD". */
function todayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Month-view calendar. Generates one DayCell per day of the active month
 * (handling varying month lengths and leap years via native Date), aligns days
 * to weekday columns, and provides prev/next month navigation with year wrap.
 */
export default function CalendarGrid({
  year,
  month,
  completionsByDate,
  totalHabits,
  onDaySelect,
  onMonthChange,
}: CalendarGridProps) {
  // new Date(year, month, 0) is the last day of `month` (month is 1-indexed
  // here, so this resolves to day 0 of the following month).
  const daysInMonth = new Date(year, month, 0).getDate();
  // Weekday (0=Sun) of the first of the month — number of leading blank cells.
  const leadingBlanks = new Date(year, month - 1, 1).getDay();
  const today = todayISO();

  const monthLabel = new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const goPrev = () => {
    if (month === 1) onMonthChange(year - 1, 12);
    else onMonthChange(year, month - 1);
  };

  const goNext = () => {
    if (month === 12) onMonthChange(year + 1, 1);
    else onMonthChange(year, month + 1);
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous month"
          className="rounded-md border border-black/15 px-3 py-2 text-sm font-medium dark:border-white/20"
        >
          ← Prev
        </button>
        <h1 className="text-lg font-semibold tracking-tight">{monthLabel}</h1>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next month"
          className="rounded-md border border-black/15 px-3 py-2 text-sm font-medium dark:border-white/20"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            className="py-1 text-center text-xs font-medium text-black/50 dark:text-white/50"
          >
            {weekday}
          </div>
        ))}

        {Array.from({ length: leadingBlanks }, (_, i) => (
          <div key={`blank-${i}`} aria-hidden />
        ))}

        {days.map((day) => {
          const date = `${year}-${String(month).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`;
          return (
            <DayCell
              key={date}
              date={date}
              completedCount={completionsByDate[date] ?? 0}
              totalHabits={totalHabits}
              isToday={date === today}
              onSelect={onDaySelect}
            />
          );
        })}
      </div>
    </div>
  );
}
