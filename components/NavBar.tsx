"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Flame } from "lucide-react";
import Logo from "@/components/Logo";
import { useCompletions } from "@/hooks/useCompletions";
import { useHabits } from "@/hooks/useHabits";
import { computeStreak } from "@/lib/streak";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/log", label: "Log" },
  { href: "/calendar", label: "Calendar" },
  { href: "/habits", label: "Habits" },
] as const;

export default function NavBar() {
  const pathname = usePathname();
  const { habits } = useHabits();
  const { getCompletionsForDate } = useCompletions();

  // The landing page owns its own chrome — no app nav there.
  if (pathname === "/") return null;

  const streak = computeStreak(
    (date) => getCompletionsForDate(date).length,
    habits.length
  );

  return (
    <header className="glass sticky top-0 z-40 border-b border-border/70">
      <nav className="mx-auto flex h-16 w-full max-w-2xl items-center justify-between gap-4 px-4">
        {/* Clicking the wordmark returns to the landing page. */}
        <Link href="/" aria-label="Signal — home" className="shrink-0">
          <Logo />
        </Link>

        <div className="flex items-center gap-0.5">
          {LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  isActive
                    ? "text-ink-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {label}
              </Link>
            );
          })}
        </div>

        <div
          className={cn(
            "flex shrink-0 items-center gap-1.5 text-sm tabular-nums transition-colors",
            streak > 0 ? "text-foreground" : "text-muted-foreground"
          )}
          title={streak > 0 ? `${streak}-day streak` : "No active streak yet"}
        >
          <Flame className="size-4" strokeWidth={1.75} />
          {streak}
        </div>
      </nav>
    </header>
  );
}
