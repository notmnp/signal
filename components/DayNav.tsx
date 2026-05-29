"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addDays, parseISODate, relativeLabel, todayISO } from "@/lib/date";

interface DayNavProps {
  /** Current Log Date as an ISO 8601 date string, e.g. "2026-05-29". */
  date: string;
  /** Called with the new ISO date string when the user steps a day. */
  onChange: (date: string) => void;
}

/**
 * Controlled day stepper for the Daily Habit Log. Shows the date prominently
 * with a relative eyebrow (Today/Yesterday/Tomorrow), steps one day in either
 * direction, and offers a quick jump back to today. Navigation is unrestricted.
 */
export default function DayNav({ date, onChange }: DayNavProps) {
  const parsed = parseISODate(date);
  const relative = relativeLabel(date);
  const weekday = parsed.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const isToday = date === todayISO();

  return (
    <div className="flex items-center justify-between gap-3">
      <Button
        variant="outline"
        size="icon-lg"
        aria-label="Previous day"
        onClick={() => onChange(addDays(date, -1))}
      >
        <ChevronLeft />
      </Button>

      <div className="text-center">
        <div className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {relative ?? weekday}
        </div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          {fullDate}
        </h1>
        {!isToday && (
          <button
            type="button"
            onClick={() => onChange(todayISO())}
            className="mx-auto mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            Back to today
          </button>
        )}
      </div>

      <Button
        variant="outline"
        size="icon-lg"
        aria-label="Next day"
        onClick={() => onChange(addDays(date, 1))}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
