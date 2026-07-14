"use client";

import {
  Activity,
  Apple,
  Baby,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Syringe,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  baby: Baby,
  "heart-pulse": HeartPulse,
  syringe: Syringe,
  activity: Activity,
  "shield-check": ShieldCheck,
  leaf: Leaf,
  apple: Apple,
  users: Users,
};

type Props = {
  service: Service;
  className?: string;
};

export function ServiceCard({ service, className }: Props) {
  const Icon = iconMap[service.icon] ?? Activity;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-medical)]/35 hover:shadow-[var(--shadow-md)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-[var(--color-soft-blue)] opacity-60 transition-transform duration-500 group-hover:scale-125"
        aria-hidden
      />
      <div className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-soft-blue)] text-[var(--color-medical)]">
        <Icon
          className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.75}
          aria-hidden
        />
      </div>
      <h3 className="relative mb-1.5 text-[15px] font-bold text-[var(--color-navy)] md:text-base">
        {service.title}
      </h3>
      <p className="relative text-sm leading-relaxed text-[var(--color-text-gray)]">
        {service.description}
      </p>
    </article>
  );
}
