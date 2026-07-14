"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Announcement } from "@/types";
import { formatDateTR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function AnnouncementsPreview({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const [latest, ...rest] = announcements;
  if (!latest) return null;

  return (
    <section className="section-pad bg-[var(--pure-white)]">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-label mb-3">Bilgilendirme</p>
            <h2 className="section-title">Güncel Duyurular</h2>
          </div>
          <Button href="/duyurular" variant="secondary" showArrow>
            Tüm Duyuruları Gör
          </Button>
        </div>

        <Link
          href={`/duyurular/${latest.slug}`}
          className="group relative block border-y border-[var(--line)] py-8 transition-colors hover:bg-[var(--mist-blue)]/35 md:py-12"
        >
          <div className="relative grid gap-4 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <time className="text-sm text-[var(--muted-text)]">
                {formatDateTR(latest.date)}
              </time>
              <p className="mt-2 text-xs font-semibold tracking-[0.14em] text-[var(--medical-blue)] uppercase">
                {latest.categoryLabel}
              </p>
            </div>
            <div className="lg:col-span-8">
              <h3 className="font-serif text-[clamp(1.5rem,5.5vw,3.25rem)] leading-[1.08] tracking-tight text-[var(--ink)] transition-transform duration-300 group-hover:translate-x-1 md:group-hover:translate-x-2">
                {latest.title}
              </h3>
              <p className="mt-3 max-w-2xl text-[16px] text-[var(--muted-text)] md:mt-4 md:text-[17px]">
                {latest.excerpt}
              </p>
            </div>
            <div className="hidden items-start justify-end lg:col-span-1 lg:flex">
              <ArrowUpRight className="h-7 w-7 text-[var(--ink)]/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--medical-blue)]" />
            </div>
          </div>
        </Link>

        <div className="mt-1">
          {rest.map((item) => (
            <Link
              key={item.id}
              href={`/duyurular/${item.slug}`}
              className="group flex flex-col gap-2 border-b border-[var(--line)] py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
            >
              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-10">
                <time className="w-36 shrink-0 text-sm text-[var(--muted-text)]">
                  {formatDateTR(item.date)}
                </time>
                <h3 className="font-serif text-[clamp(1.15rem,4vw,1.75rem)] tracking-tight text-[var(--ink)] transition-transform duration-300 group-hover:translate-x-1.5">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tracking-wide text-[var(--muted-text)] uppercase">
                  {item.categoryLabel}
                </span>
                <ArrowUpRight className="h-4 w-4 text-[var(--ink)]/30" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
