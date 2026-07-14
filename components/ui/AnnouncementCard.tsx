"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Announcement } from "@/types";
import { formatDateTR, cn } from "@/lib/utils";

export function AnnouncementCard({
  announcement,
  className,
  variant = "row",
}: {
  announcement: Announcement;
  className?: string;
  variant?: "row" | "card";
}) {
  if (variant === "card") {
    return (
      <Link
        href={`/duyurular/${announcement.slug}`}
        className={cn(
          "group flex flex-col border border-[var(--line)] bg-white p-6 transition-colors hover:bg-[var(--mist-blue)]/50",
          className,
        )}
      >
        <div className="mb-3 flex items-center gap-2 text-xs">
          <span className="font-semibold tracking-wide text-[var(--medical-blue)] uppercase">
            {announcement.categoryLabel}
          </span>
          <time className="text-[var(--muted-text)]">
            {formatDateTR(announcement.date)}
          </time>
        </div>
        <h3 className="font-serif text-xl leading-snug tracking-tight text-[var(--ink)] transition-transform group-hover:translate-x-1">
          {announcement.title}
        </h3>
        <p className="mt-3 flex-1 text-[15px] text-[var(--muted-text)]">
          {announcement.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--medical-blue)]">
          Devamını oku
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/duyurular/${announcement.slug}`}
      className={cn(
        "group flex items-start justify-between gap-4 border-b border-[var(--line)] py-5",
        className,
      )}
    >
      <div>
        <time className="text-sm text-[var(--muted-text)]">
          {formatDateTR(announcement.date)}
        </time>
        <h3 className="mt-1 font-serif text-lg text-[var(--ink)] transition-transform group-hover:translate-x-1">
          {announcement.title}
        </h3>
      </div>
      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[var(--ink)]/30" />
    </Link>
  );
}
