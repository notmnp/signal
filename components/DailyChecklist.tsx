"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import HabitCheck from "@/components/HabitCheck";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import type { Habit } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DailyChecklistProps {
  habits: Habit[];
  /** Habit ids completed on the active Log Date. */
  completedIds: string[];
  /** Called when an item is toggled; the parent persists the change. */
  onToggle: (habitId: string) => void;
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function DailyChecklist({
  habits,
  completedIds,
  onToggle,
}: DailyChecklistProps) {
  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
        <Logo showWordmark={false} className="scale-125 opacity-90" />
        <div className="space-y-1.5">
          <p className="font-display text-lg font-semibold">No signal yet</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Create your first habit and it&apos;ll show up here, ready to check
            off each day.
          </p>
        </div>
        <Button asChild>
          <Link href="/habits">
            Add a habit
            <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-2.5"
    >
      {habits.map((habit) => {
        const checked = completedIds.includes(habit.id);
        return (
          <motion.li key={habit.id} variants={itemVariants}>
            <motion.button
              type="button"
              onClick={() => onToggle(habit.id)}
              whileTap={{ scale: 0.99 }}
              aria-pressed={checked}
              className={cn(
                "group flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-colors",
                checked
                  ? "border-transparent bg-muted"
                  : "border-border bg-card hover:bg-muted/50"
              )}
            >
              <HabitCheck checked={checked} />
              <span className="min-w-0 pt-0.5">
                <span
                  className={cn(
                    "block font-medium transition-colors",
                    checked && "text-muted-foreground"
                  )}
                >
                  {habit.name}
                </span>
                {habit.description && (
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {habit.description}
                  </span>
                )}
              </span>
            </motion.button>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
