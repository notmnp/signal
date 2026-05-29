"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DayCell from "@/components/DayCell";
import { Button } from "@/components/ui/button";
import { todayISO } from "@/lib/date";

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

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.01 } },
};
const cellVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

/**
 * Month-view heatmap calendar. Generates one DayCell per day of the active
 * month (leap-year safe via native Date), aligns to weekday columns, and
 * provides prev/next month navigation with year wrap.
 */
export default function CalendarGrid({
  year,
  month,
  completionsByDate,
  totalHabits,
  onDaySelect,
  onMonthChange,
}: CalendarGridProps) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const leadingBlanks = new Date(year, month - 1, 1).getDay();
  const today = todayISO();

  const monthLabel = new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const goPrev = () =>
    month === 1 ? onMonthChange(year - 1, 12) : onMonthChange(year, month - 1);
  const goNext = () =>
    month === 12 ? onMonthChange(year + 1, 1) : onMonthChange(year, month + 1);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-8">
      <div className="mb-7 flex items-center justify-between gap-4">
        <Button variant="ghost" size="icon-lg" aria-label="Previous month" onClick={goPrev}>
          <ChevronLeft />
        </Button>
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          {monthLabel}
        </h2>
        <Button variant="ghost" size="icon-lg" aria-label="Next month" onClick={goNext}>
          <ChevronRight />
        </Button>
      </div>

      <div className="mb-3 grid grid-cols-7 gap-2.5">
        {WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            className="text-center text-xs uppercase tracking-wider text-muted-foreground"
          >
            {weekday.slice(0, 3)}
          </div>
        ))}
      </div>

      <motion.div
        key={`${year}-${month}`}
        variants={gridVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-7 gap-2.5"
      >
        {Array.from({ length: leadingBlanks }, (_, i) => (
          <div key={`blank-${i}`} aria-hidden />
        ))}
        {days.map((day) => {
          const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          return (
            <motion.div key={date} variants={cellVariants}>
              <DayCell
                date={date}
                completedCount={completionsByDate[date] ?? 0}
                totalHabits={totalHabits}
                isToday={date === today}
                onSelect={onDaySelect}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-7 flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <span className="size-3.5 rounded-[5px] border border-border" />
        <span className="size-3.5 rounded-[5px] bg-ink/14" />
        <span className="size-3.5 rounded-[5px] bg-ink/30" />
        <span className="size-3.5 rounded-[5px] bg-ink/60" />
        <span className="size-3.5 rounded-[5px] bg-ink" />
        <span>More</span>
      </div>
    </div>
  );
}
