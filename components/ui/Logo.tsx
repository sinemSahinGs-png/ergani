import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  light = false,
  compact = false,
}: {
  className?: string;
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-3 rounded-[var(--radius-sm)]",
        className,
      )}
      aria-label="Ergani 1 No'lu Aile Sağlığı Merkezi — Ana Sayfa"
    >
      <span
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform group-hover:scale-105",
          light
            ? "border-white/25 text-white"
            : "border-[var(--line)] text-[var(--deep-navy)]",
        )}
        aria-hidden
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8V2Z" />
        </svg>
      </span>
      <span className="flex flex-col leading-[1.15]">
        <span
          className={cn(
            "text-[13px] font-semibold tracking-tight sm:text-sm",
            light ? "text-white" : "text-[var(--ink)]",
          )}
        >
          Ergani 1 No&apos;lu
        </span>
        {!compact && (
          <span
            className={cn(
              "text-[11px] tracking-wide sm:text-xs",
              light ? "text-white/65" : "text-[var(--muted-text)]",
            )}
          >
            Aile Sağlığı Merkezi
          </span>
        )}
      </span>
    </Link>
  );
}
