"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Habit } from "@/lib/types";

interface HabitFormProps {
  /** When provided, the form opens in edit mode pre-populated with this habit. */
  habit?: Habit;
  /** Called with trimmed name and description on a valid submission. */
  onSubmit: (name: string, description: string) => void;
  /** Called when the user cancels; the parent dismisses the form. */
  onCancel: () => void;
}

/**
 * Controlled create/edit form for a habit. Validates that Name is non-empty
 * before submitting; storage is the parent's concern.
 */
export default function HabitForm({ habit, onSubmit, onCancel }: HabitFormProps) {
  const [name, setName] = useState(habit?.name ?? "");
  const [description, setDescription] = useState(habit?.description ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName === "") {
      setError("Give your habit a name.");
      return;
    }
    setError(null);
    onSubmit(trimmedName, description.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="habit-name">Name</Label>
        <Input
          id="habit-name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (error) setError(null);
          }}
          placeholder="e.g. Read for 20 minutes"
          autoFocus
          aria-invalid={error ? true : undefined}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="habit-description">
          Description
          <span className="ml-1 font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="habit-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="A note to your future self about why this matters."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="lg" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="lg">
          {habit ? "Save changes" : "Create habit"}
        </Button>
      </div>
    </form>
  );
}
