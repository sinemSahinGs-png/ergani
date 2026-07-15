"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnimatedArrow({
  className,
  open,
}: {
  className?: string;
  open?: boolean;
}) {
  return (
    <ArrowUpRight
      className={cn(
        "h-5 w-5 shrink-0 text-[var(--ink)]/35 transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--medical-blue)]",
        open && "rotate-45 text-[var(--medical-blue)]",
        className,
      )}
      aria-hidden
    />
  );
}

export function SectionIndex({
  index,
  label,
  className,
  tone = "default",
}: {
  index: string;
  label: string;
  className?: string;
  tone?: "default" | "light";
}) {
  return (
    <p
      className={cn(
        "mb-4 text-[13px] font-semibold tracking-[0.18em] uppercase",
        tone === "light" ? "text-[var(--sky-blue)]" : "text-[var(--muted-text)]",
        className,
      )}
    >
      <span className="tabular-nums">{index}</span>
      <span className="mx-2 opacity-40">/</span>
      <span>{label}</span>
    </p>
  );
}

export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(12% 0 0 0)", opacity: 0.85 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function HorizontalRail({
  children,
  className,
  onScrollProgress,
}: {
  children: React.ReactNode;
  className?: string;
  onScrollProgress?: (progress: number) => void;
}) {
  return (
    <div
      className={cn(
        "hide-scrollbar snap-x-mandatory flex gap-3 overflow-x-auto overscroll-x-contain pb-1",
        className,
      )}
      onScroll={(e) => {
        if (!onScrollProgress) return;
        const el = e.currentTarget;
        const max = el.scrollWidth - el.clientWidth;
        onScrollProgress(max > 0 ? el.scrollLeft / max : 0);
      }}
    >
      {children}
    </div>
  );
}
