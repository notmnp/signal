"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import CompletionRing from "@/components/CompletionRing";
import DailyChecklist from "@/components/DailyChecklist";
import DayNav from "@/components/DayNav";
import { useCompletions } from "@/hooks/useCompletions";
import { useHabits } from "@/hooks/useHabits";
import { todayISO } from "@/lib/date";

/** True for a well-formed, real "YYYY-MM-DD" calendar date. */
function isValidISODate(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return (
    d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day
  );
}

function summaryLine(completed: number, total: number): string {
  if (total === 0) return "Nothing to track yet.";
  if (completed === total) return "Every habit done for the day.";
  if (completed === 0) return "A fresh slate. Check one off to begin.";
  const left = total - completed;
  return `${left} habit${left === 1 ? "" : "s"} left to go.`;
}

function LogView() {
  const searchParams = useSearchParams();

  // Seed the Log Date from a valid ?date param; otherwise today. The URL only
  // seeds the initial state — day navigation updates state only.
  const [logDate, setLogDate] = useState<string>(() => {
    const param = searchParams.get("date");
    return isValidISODate(param) ? param : todayISO();
  });

  const { habits } = useHabits();
  const { toggleCompletion, getCompletionsForDate } = useCompletions();

  const completedIds = getCompletionsForDate(logDate);
  const completed = completedIds.length;
  const total = habits.length;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pt-8 pb-24">
      <DayNav date={logDate} onChange={setLogDate} />

      {total > 0 && (
        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-4">
          <CompletionRing completed={completed} total={total} />
          <div>
            <p className="font-display text-lg font-semibold">
              {completed === total ? "All done" : "Today's progress"}
            </p>
            <p className="text-sm text-muted-foreground">
              {summaryLine(completed, total)}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <DailyChecklist
          habits={habits}
          completedIds={completedIds}
          onToggle={(habitId) => toggleCompletion(habitId, logDate)}
        />
      </div>
    </main>
  );
}

/**
 * Daily Habit Log — the app's primary screen. useSearchParams() requires a
 * Suspense boundary, so the view that reads the ?date seed sits inside one.
 */
export default function LogPage() {
  return (
    <Suspense fallback={null}>
      <LogView />
    </Suspense>
  );
}
