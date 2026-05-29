"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CalendarGrid from "@/components/CalendarGrid";
import { useCompletions } from "@/hooks/useCompletions";
import { useHabits } from "@/hooks/useHabits";

/**
 * Habit Calendar screen.
 *
 * Holds the active Calendar Month in state (initialized to the current month),
 * derives per-day completion counts from useCompletions and the total habit
 * count from useHabits, and renders CalendarGrid. Selecting a day hands the
 * date off to the Daily Habit Log via /log?date=YYYY-MM-DD.
 */
export default function CalendarPage() {
  const router = useRouter();
  const { habits } = useHabits();
  const { getCompletionsByMonth } = useCompletions();

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-indexed

  const completionsByDate = getCompletionsByMonth(year, month);
  const totalHabits = habits.length;

  return (
    <CalendarGrid
      year={year}
      month={month}
      completionsByDate={completionsByDate}
      totalHabits={totalHabits}
      onMonthChange={(nextYear, nextMonth) => {
        setYear(nextYear);
        setMonth(nextMonth);
      }}
      onDaySelect={(date) => router.push(`/log?date=${date}`)}
    />
  );
}
