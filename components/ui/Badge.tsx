import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  tone?: "blue" | "green" | "orange" | "red" | "gray";
  className?: string;
  pulse?: boolean;
};

const tones = {
  blue: "bg-[var(--color-soft-blue)] text-[var(--color-medical)]",
  green: "bg-emerald-50 text-[var(--color-success)]",
  orange: "bg-amber-50 text-[var(--color-warning)]",
  red: "bg-red-50 text-[var(--color-emergency)]",
  gray: "bg-[var(--color-soft-gray)] text-[var(--color-text-gray)]",
};

export function Badge({
  children,
  tone = "blue",
  className,
  pulse,
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
        </span>
      )}
      {children}
    </span>
  );
}
