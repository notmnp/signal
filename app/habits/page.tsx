"use client";

import { useState } from "react";
import HabitForm from "@/components/HabitForm";
import HabitList from "@/components/HabitList";
import { useHabits } from "@/hooks/useHabits";
import type { Habit } from "@/lib/types";

/**
 * Habit Management screen.
 *
 * Owns the useHabits instance and the create/edit form state, wiring HabitList
 * and HabitForm together. Cascading deletion of completions is handled inside
 * useHabits.deleteHabit, so this page calls it directly after HabitList's own
 * inline confirmation.
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
    } else {
      createHabit(name, description);
    }
    closeForm();
  };

  return (
    <div className="flex flex-col gap-6">
      <HabitList
        habits={habits}
        onCreate={openCreate}
        onEdit={openEdit}
        onDelete={deleteHabit}
      />

      {formOpen && (
        <div className="rounded-lg border border-black/10 p-4 dark:border-white/15">
          <HabitForm
            habit={editingHabit ?? undefined}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </div>
      )}
    </div>
  );
}
