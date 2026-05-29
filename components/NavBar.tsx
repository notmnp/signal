"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/log", label: "Log" },
  { href: "/calendar", label: "Calendar" },
  { href: "/habits", label: "Habits" },
] as const;

/**
 * Persistent navigation bar mounted in the root layout on every screen.
 *
 * Derives the active route from `usePathname()` so the correct link stays
 * highlighted after client-side navigation and full page refreshes alike.
 */
export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-black/10 dark:border-white/15">
      <div className="mx-auto flex max-w-3xl items-center gap-1 px-4 py-3">
        <span className="mr-4 font-semibold tracking-tight">Signal</span>
        {LINKS.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-black"
                  : "rounded-md px-3 py-1.5 text-sm font-medium text-black/60 hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
              }
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
