"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Announcement } from "@/types";
import { formatDateTR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AnimatedArrow, SectionIndex } from "@/components/ui/MotionBits";
import { AmbientLights } from "@/components/ui/AmbientLights";
import { WordReveal } from "@/components/animations/WordReveal";
import { duration, easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function AnnouncementsPreview({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const [latest, ...rest] = announcements;
  const support = rest.slice(0, 2);
  const reduced = useReducedMotion();
  if (!latest) return null;

  return (
    <section className="section-pad relative overflow-hidden bg-white/70">
      <AmbientLights variant="section" />
      <div className="container-page relative z-[2]">
        <div className="mb-8 flex flex-col gap-5 md:mb-11 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionIndex index="04" label="Duyurular" />
            <WordReveal
              as="h2"
              className="section-title"
              text="Güncel Duyurular"
            />
          </div>
          <Button href="/duyurular" variant="secondary" showArrow>
            Tüm Duyuruları Gör
          </Button>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.reveal, ease: easeOutExpo }}
        >
          <Link
            href={`/duyurular/${latest.slug}`}
            className="group relative block border-y border-[var(--line)] py-8 transition-colors hover:bg-[var(--mist-blue)]/40 md:py-10"
          >
            <div className="absolute inset-y-0 left-0 w-0 bg-[var(--soft-blue)]/50 transition-all duration-500 group-hover:w-full" aria-hidden />
            <div className="relative grid gap-5 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-3">
                <time className="text-[13px] tracking-wide text-[var(--muted-text)]">
                  {formatDateTR(latest.date)}
                </time>
                <p className="meta-text mt-2 text-[var(--medical-blue)]">
                  {latest.categoryLabel}
                </p>
              </div>
              <div className="lg:col-span-8">
                <h3 className="font-serif text-[clamp(26px,8vw,32px)] leading-[1.12] tracking-tight text-[var(--ink)] transition-transform duration-300 group-hover:translate-x-1.5 md:text-[clamp(1.85rem,3.2vw,3rem)]">
                  {latest.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[var(--muted-text)] line-clamp-2 md:text-[17px]">
                  {latest.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--ink)]">
                  Devamını oku
                  <AnimatedArrow className="!h-4 !w-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="mt-2">
          {support.map((item, i) => (
            <motion.div
              key={item.id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: easeOutExpo,
              }}
            >
              <Link
                href={`/duyurular/${item.slug}`}
                className="group flex flex-col gap-2 border-b border-[var(--line)] py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-10">
                  <time className="w-36 shrink-0 text-[13px] text-[var(--muted-text)]">
                    {formatDateTR(item.date)}
                  </time>
                  <h3 className="font-serif text-[clamp(18px,4.8vw,21px)] tracking-tight text-[var(--ink)] transition-transform duration-300 group-hover:translate-x-1.5 md:text-[1.35rem]">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="meta-text text-[var(--muted-text)]">
                    {item.categoryLabel}
                  </span>
                  <AnimatedArrow className="!h-4 !w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
