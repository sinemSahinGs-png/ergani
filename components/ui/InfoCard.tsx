import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  href?: string;
  className?: string;
};

function isExternalHref(href: string) {
  return (
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:")
  );
}

export function InfoCard({ icon, title, children, href, className }: Props) {
  const body = (
    <>
      <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[var(--color-medical)] to-[var(--color-bright)] transition-transform duration-300 group-hover:scale-x-100" />
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-soft-blue)] text-[var(--color-medical)] transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-[var(--color-navy)]">
        {title}
      </h3>
      <div className="text-[15px] leading-relaxed text-[var(--color-text-gray)]">
        {children}
      </div>
    </>
  );

  const classes = cn(
    "group relative flex min-h-[180px] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)] transition-all duration-300",
    "hover:-translate-y-1 hover:border-[var(--color-medical)]/35 hover:shadow-[var(--shadow-md)]",
    className,
  );

  if (href) {
    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {body}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }

  return <div className={classes}>{body}</div>;
}
