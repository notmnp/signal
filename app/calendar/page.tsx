"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, Sparkles, Target } from "lucide-react";
import CalendarGrid from "@/components/CalendarGrid";
import { useCompletions } from "@/hooks/useCompletions";
import { useHabits } from "@/hooks/useHabits";
import { computeStreak } from "@/lib/streak";

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-xl font-semibold tabular-nums leading-none">
          {value}
        </div>
        <div className="mt-1 truncate text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const router = useRouter();
  const { habits } = useHabits();
  const { getCompletionsByMonth, getCompletionsForDate } = useCompletions();

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-indexed

  const completionsByDate = getCompletionsByMonth(year, month);
  const totalHabits = habits.length;

  const streak = computeStreak(
    (date) => getCompletionsForDate(date).length,
    totalHabits
  );
  const perfectDays =
    totalHabits === 0
      ? 0
      : Object.values(completionsByDate).filter((n) => n >= totalHabits).length;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pt-8 pb-24">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-sm text-muted-foreground">
          Every lit square is a day you showed up.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat
          icon={<Flame className="size-5" strokeWidth={1.75} />}
          value={streak}
          label="Day streak"
        />
        <Stat
          icon={<Sparkles className="size-5" strokeWidth={1.75} />}
          value={perfectDays}
          label="Perfect days this month"
        />
        <Stat
          icon={<Target className="size-5" strokeWidth={1.75} />}
          value={totalHabits}
          label="Active habits"
        />
      </div>

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
    </main>
  );
}
