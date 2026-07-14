"use client";

import type { DaySchedule } from "@/types";
import { cn } from "@/lib/utils";

export function HoursTodayClient({ weekly }: { weekly: DaySchedule[] }) {
  const today = new Date().getDay();

  return (
    <ul>
      {weekly.map((row) => {
        const isToday = row.dayIndex === today;
        return (
          <li
            key={row.day}
            className={cn(
              "flex items-center justify-between border-b border-[var(--line)] px-6 py-4 text-[15px] last:border-b-0",
              isToday &&
                "bg-[var(--soft-blue)] font-semibold text-[var(--medical-blue)]",
            )}
          >
            <span className={cn(!isToday && "text-[var(--ink)]")}>
              {row.day}
              {isToday && (
                <span className="ml-2 text-xs font-medium opacity-80">
                  (Bugün)
                </span>
              )}
            </span>
            <span
              className={cn(
                row.isClosed ? "text-[var(--muted-text)]" : "text-[var(--ink)]",
              )}
            >
              {row.hours}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
