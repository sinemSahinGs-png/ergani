import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function EmptyState({
  title = "Sonuç bulunamadı",
  description = "Arama veya filtre kriterlerinizi değiştirerek tekrar deneyiniz.",
  actionLabel,
  actionHref,
  className,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-dashed border-[var(--line)] bg-white px-6 py-16 text-center",
        className,
      )}
      role="status"
    >
      <Inbox className="mb-4 h-8 w-8 text-[var(--medical-blue)]" aria-hidden />
      <h3 className="font-serif text-2xl text-[var(--ink)]">{title}</h3>
      <p className="mt-2 max-w-md text-[15px] text-[var(--muted-text)]">
        {description}
      </p>
      {actionLabel && actionHref && (
        <div className="mt-6">
          <Button href={actionHref} variant="secondary">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
