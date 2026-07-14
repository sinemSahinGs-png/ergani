"use client";

import { useState } from "react";
import type { Doctor } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function DoctorCard({
  doctor,
  className,
}: {
  doctor: Doctor;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden border border-[var(--line)] bg-[var(--pure-white)] transition-shadow duration-400 hover:shadow-[var(--shadow-md)]",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[var(--soft-blue)] to-[var(--mist-blue)]">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={doctor.image}
            alt={`${doctor.name} profil fotoğrafı`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-end p-6">
            <p className="font-serif text-5xl text-[var(--ink)]/15">
              {doctor.initials}
            </p>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Portre yakında
            </p>
          </div>
        )}
        <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-[var(--ink)] backdrop-blur-sm">
          {doctor.unit}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl leading-tight tracking-tight text-[var(--ink)]">
          {doctor.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-[var(--medical-blue)]">
          {doctor.title}
        </p>
        <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--muted-text)]">
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
