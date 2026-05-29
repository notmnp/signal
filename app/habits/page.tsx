"use client";

import { useState } from "react";
import { toast } from "sonner";
import HabitForm from "@/components/HabitForm";
import HabitList from "@/components/HabitList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHabits } from "@/hooks/useHabits";
import type { Habit } from "@/lib/types";

/**
 * Habit Management screen. Owns the useHabits instance and the create/edit
 * dialog state, wiring HabitList and HabitForm together. Cascading deletion of
 * completions is handled inside useHabits.deleteHabit.
 */
export default function HabitsPage() {
  const { habits, createHabit, updateHabit, deleteHabit } = useHabits();
  const [formOpen, setFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const openCreate = () => {
    setEditingHabit(null);
    setFormOpen(true);
  };

  const openEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingHabit(null);
  };

  const handleSubmit = (name: string, description: string) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, name, description);
      toast.success("Habit updated");
    } else {
      createHabit(name, description);
      toast.success(`“${name}” added`);
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    const removed = habits.find((habit) => habit.id === id);
    deleteHabit(id);
    toast(removed ? `Deleted “${removed.name}”` : "Habit deleted");
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pt-8 pb-24">
      <HabitList
        habits={habits}
        onCreate={openCreate}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <Dialog
        open={formOpen}
        onOpenChange={(open) => {
          if (!open) closeForm();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingHabit ? "Edit habit" : "New habit"}
            </DialogTitle>
            <DialogDescription>
              {editingHabit
                ? "Update the name or description. Your completions stay put."
                : "Name it, optionally describe it, and start tracking today."}
            </DialogDescription>
          </DialogHeader>
          <HabitForm
            habit={editingHabit ?? undefined}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}
