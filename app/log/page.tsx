"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import DailyChecklist from "@/components/DailyChecklist";
import DayNav from "@/components/DayNav";
import { useCompletions } from "@/hooks/useCompletions";
import { useHabits } from "@/hooks/useHabits";

/** Today in the user's local timezone as a "YYYY-MM-DD" string. */
function todayISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** True for a well-formed, real "YYYY-MM-DD" calendar date. */
function isValidISODate(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return (
    d.getFullYear() === year &&
    d.getMonth() === month - 1 &&
    d.getDate() === day
  );
}

function LogView() {
  const searchParams = useSearchParams();

  // Seed the Log Date from ?date when present and valid; otherwise today.
  // The URL only seeds the initial state — day navigation updates state only.
  const [logDate, setLogDate] = useState<string>(() => {
    const param = searchParams.get("date");
    return isValidISODate(param) ? param : todayISO();
  });

  const { habits } = useHabits();
  const { toggleCompletion, getCompletionsForDate } = useCompletions();

  const completedIds = getCompletionsForDate(logDate);

  return (
    <div className="flex flex-col gap-6">
      <DayNav date={logDate} onChange={setLogDate} />
      <DailyChecklist
        habits={habits}
        completedIds={completedIds}
        onToggle={(habitId) => toggleCompletion(habitId, logDate)}
      />
    </div>
  );
}

/**
 * Daily Habit Log — the default screen.
 *
 * useSearchParams() requires a Suspense boundary, so the view that reads the
 * ?date seed is rendered inside one.
 */
export default function LogPage() {
  return (
    <Suspense fallback={null}>
      <LogView />
    </Suspense>
  );
}
