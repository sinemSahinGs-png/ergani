"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/animations/MagneticButton";

type Variant = "primary" | "secondary" | "text";
type Size = "md" | "lg";

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  fullWidth?: boolean;
  showArrow?: boolean;
};

type AsButton = Common &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
  };

type AsLink = Common & {
  href: string;
  external?: boolean;
};

type Props = AsButton | AsLink;

const sizeCls: Record<Size, string> = {
  md: "min-h-12 px-6 text-[15px]",
  lg: "min-h-[52px] px-8 text-[16px] md:min-h-14",
};

export function Button(props: Props) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    magnetic = false,
    fullWidth,
    showArrow = true,
  } = props;

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden font-semibold tracking-tight transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--medical-blue)] active:scale-[0.97] disabled:opacity-55 disabled:pointer-events-none rounded-[var(--radius-md)]";

  const variants: Record<Variant, string> = {
    primary:
      "bg-[var(--deep-navy)] text-white hover:bg-[var(--ink)]",
    secondary:
      "bg-transparent text-[var(--ink)] border border-[var(--ink)]/25 hover:border-[var(--ink)] hover:text-white",
    text: "bg-transparent text-[var(--ink)] px-0 min-h-11 rounded-none",
  };

  const classes = cn(
    base,
    variants[variant],
    variant !== "text" && sizeCls[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {variant === "primary" && (
        <span
          className="absolute inset-0 translate-y-full bg-[var(--medical-blue)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
          aria-hidden
        />
      )}
      {variant === "secondary" && (
        <span
          className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--ink)] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
          aria-hidden
        />
      )}
      <span className="relative z-[1]">{children}</span>
      {showArrow && variant !== "text" && (
        <ArrowUpRight
          className="relative z-[1] h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
      {variant === "text" && (
        <span className="relative z-[1] ml-1 inline-flex items-center">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
        </span>
      )}
    </>
  );

  let inner: React.ReactNode;
  if ("href" in props && props.href) {
    inner = props.external ? (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    ) : (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  } else {
    const p = props as AsButton;
    const {
      children: _c,
      className: _cl,
      variant: _v,
      size: _s,
      magnetic: _m,
      fullWidth: _f,
      showArrow: _a,
      ...rest
    } = p;
    inner = (
      <button type="button" className={classes} {...rest}>
        {content}
      </button>
    );
  }

  if (magnetic && variant !== "text") {
    return <MagneticButton>{inner}</MagneticButton>;
  }
  return inner;
}

export function AnimatedLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(
    "group inline-flex items-center gap-2 font-semibold text-[var(--ink)] transition-colors hover:text-[var(--medical-blue)]",
    className,
  );
  const body = (
    <>
      <span className="relative">
        {children}
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
      </span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
