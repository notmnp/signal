"use client";

import { motion } from "motion/react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Habit } from "@/lib/types";

interface HabitListProps {
  habits: Habit[];
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

/**
 * Renders habits as cards (in creation order) with per-item edit and delete
 * actions. Deletion is gated behind an AlertDialog confirmation before onDelete
 * fires. Shows an empty state when there are no habits.
 */
export default function HabitList({
  habits,
  onEdit,
  onDelete,
  onCreate,
}: HabitListProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Habits</h1>
          <p className="text-sm text-muted-foreground">
            The things you&apos;re keeping a signal on.
          </p>
        </div>
        <Button onClick={onCreate} size="lg">
          <Plus />
          New habit
        </Button>
      </div>

      {habits.length === 0 ? (
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
          <Logo showWordmark={false} className="scale-125 opacity-90" />
          <div className="space-y-1.5">
            <p className="font-display text-lg font-semibold">Nothing tracked yet</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Add your first habit to start building a streak.
            </p>
          </div>
          <Button onClick={onCreate} size="lg">
            <Plus />
            Create a habit
          </Button>
        </div>
      ) : (
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2.5"
        >
          {habits.map((habit) => (
            <motion.li
              key={habit.id}
              variants={itemVariants}
              className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card/50 p-4 transition-colors hover:bg-card"
            >
              <div className="min-w-0">
                <p className="font-medium">{habit.name}</p>
                {habit.description && (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {habit.description}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Edit ${habit.name}`}
                  onClick={() => onEdit(habit)}
                >
                  <Pencil />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${habit.name}`}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete “{habit.name}”?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This removes the habit and every completion recorded for
                        it. This can&apos;t be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(habit.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
