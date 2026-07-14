import { cn } from "@/lib/utils";

/** Top spacing for pages under the fixed header */
export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("pt-[88px]", className)}>{children}</div>
  );
}
