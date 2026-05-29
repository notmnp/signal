"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

// Module-scope variants keep the React Compiler happy and avoid re-allocs.
const checkVariants = {
  unchecked: { pathLength: 0, opacity: 0 },
  checked: { pathLength: 1, opacity: 1 },
};

/**
 * Presentational completion glyph. On check it floods emerald, draws the
 * checkmark via pathLength, and emits a one-shot pulse ring. The parent owns
 * the click — this is purely visual so it can live inside a row button.
 */
export default function HabitCheck({
  checked,
  className,
}: {
  checked: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative grid size-7 shrink-0 place-items-center rounded-full border-2 transition-colors duration-200",
        checked
          ? "border-foreground bg-ink text-ink-foreground"
          : "border-muted-foreground/40 text-transparent group-hover:border-foreground/60",
        className
      )}
    >
      <AnimatePresence>
        {checked && (
          <motion.span
            key="ring"
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 2.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 rounded-full bg-ink"
          />
        )}
      </AnimatePresence>
      <svg
        viewBox="0 0 24 24"
        className="relative size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <motion.path
          d="M5 13l4 4L19 7"
          variants={checkVariants}
          initial={false}
          animate={checked ? "checked" : "unchecked"}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </svg>
    </span>
  );
}
