"use client";

import type { Doctor } from "@/types";
import { Button } from "@/components/ui/Button";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { cn } from "@/lib/utils";

export function DoctorCard({
  doctor,
  className,
}: {
  doctor: Doctor;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden border border-[var(--line)] bg-[var(--pure-white)] transition-shadow duration-400 hover:shadow-[var(--shadow-md)]",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <MediaFallback
          type="doctor"
          src={doctor.image}
          alt={`${doctor.name} profil fotoğrafı`}
          label={doctor.unit}
          aspectRatio="4 / 5"
          className="transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute top-4 left-4 z-[3] bg-white/90 px-3 py-1 text-[12px] font-semibold tracking-wide text-[var(--ink)] backdrop-blur-sm">
          {doctor.unit}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-[clamp(1.35rem,3vw,1.75rem)] leading-tight tracking-tight text-[var(--ink)]">
          {doctor.name}
        </h3>
        <p className="mt-1 text-[14px] font-medium text-[var(--medical-blue)]">
          {doctor.title}
        </p>
        <p className="mt-4 flex-1 text-[16px] leading-relaxed text-[var(--muted-text)]">
          {doctor.shortBio}
        </p>
        <div className="mt-6">
          <Button href={`/hekimler/${doctor.slug}`} variant="secondary" size="md">
            Profili İncele
          </Button>
        </div>
      </div>
    </article>
  );
}
