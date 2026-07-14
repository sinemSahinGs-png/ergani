import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  index,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  index?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <div className="mb-5 flex flex-wrap items-center gap-4">
        {index && (
          <span className="text-xs font-semibold tracking-[0.2em] text-[var(--muted-text)]">
            {index}
          </span>
        )}
        {eyebrow && <p className="editorial-label">{eyebrow}</p>}
      </div>
      <Tag className="section-title text-balance">{title}</Tag>
      {subtitle && (
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--muted-text)] md:text-[18px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
