import { cn } from "@/lib/utils";

export function LoadingState({
  label = "Yükleniyor…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--color-soft-blue)] border-t-[var(--color-medical)]"
        aria-hidden
      />
      <p className="text-sm font-medium text-[var(--color-text-gray)]">
        {label}
      </p>
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5",
        className,
      )}
      aria-hidden
    >
      <div className="mb-4 h-12 w-12 rounded-[var(--radius-sm)] bg-[var(--color-soft-gray)]" />
      <div className="mb-2 h-5 w-2/3 rounded bg-[var(--color-soft-gray)]" />
      <div className="h-4 w-full rounded bg-[var(--color-soft-gray)]" />
      <div className="mt-2 h-4 w-4/5 rounded bg-[var(--color-soft-gray)]" />
    </div>
  );
}
