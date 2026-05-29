"use client";

import { motion } from "motion/react";

/** Animated progress ring showing completed/total for the day. */
export default function CompletionRing({
  completed,
  total,
  size = 76,
}: {
  completed: number;
  total: number;
  size?: number;
}) {
  const pct = total > 0 ? completed / total : 0;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div
      className="relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-muted"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-foreground"
          style={{ strokeDasharray: circumference }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </svg>
      <span className="absolute text-sm font-semibold tabular-nums">
        {completed}
        <span className="text-muted-foreground">/{total}</span>
      </span>
    </div>
  );
}
