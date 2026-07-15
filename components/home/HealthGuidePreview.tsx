"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { HealthArticle } from "@/types";
import { Button } from "@/components/ui/Button";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { AnimatedArrow, SectionIndex } from "@/components/ui/MotionBits";
import { AmbientLights } from "@/components/ui/AmbientLights";
import { WordReveal } from "@/components/animations/WordReveal";
import { duration, easeOutExpo } from "@/lib/motion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const categoryImage: Record<string, string> = {
  "bebek-sagligi": "/images/health/baby-health.jpg",
  asilar: "/images/health/vaccination.jpg",
  "koruyucu-saglik": "/images/health/preventive-care.jpg",
  "kronik-hastaliklar": "/images/health/chronic-disease.jpg",
  gebelik: "/images/health/baby-health.jpg",
};

export function HealthGuidePreview({
  articles,
}: {
  articles: HealthArticle[];
}) {
  const [featured, ...rest] = articles;
  const support = rest.slice(0, 3);
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false });
  if (!featured) return null;

  const featuredSrc =
    featured.image ?? categoryImage[featured.category] ?? undefined;

  return (
    <section className="section-pad relative overflow-hidden bg-[var(--mist-blue)]/90">
      <AmbientLights variant="section" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/60 to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-[2]">
        <div className="mb-8 flex flex-col gap-5 md:mb-11 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionIndex index="06" label="Sağlık Rehberi" />
            <WordReveal as="h2" className="section-title" text="Sağlık Rehberi" />
          </div>
          <Button href="/saglik-rehberi" variant="secondary">
            Tüm içerikler
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Link
              href={`/saglik-rehberi/${featured.slug}`}
              className="group relative block"
              onMouseMove={(e) => {
                if (mobile) return;
                const rect = e.currentTarget.getBoundingClientRect();
                setCursor({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                  on: true,
                });
              }}
              onMouseLeave={() => setCursor((c) => ({ ...c, on: false }))}
            >
              <motion.div
                className="relative mb-5 overflow-hidden"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: duration.image, ease: easeOutExpo }}
              >
                <div className="overflow-hidden rounded-tl-[24px] rounded-br-[24px]">
                  <MediaFallback
                    type="health"
                    src={featuredSrc}
                    alt=""
                    label={featured.categoryLabel}
                    aspectRatio="16 / 10"
                    className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                  />
                </div>
                {cursor.on && !mobile && (
                  <span
                    className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ink)] px-4 py-2 text-[12px] font-semibold tracking-[0.16em] text-white uppercase lg:inline-flex"
                    style={{ left: cursor.x, top: cursor.y }}
                  >
                    Oku
                  </span>
                )}
              </motion.div>
              <p className="meta-text text-[var(--medical-blue)]">
                {featured.categoryLabel}
              </p>
              <h3 className="mt-2 font-serif text-[clamp(1.5rem,5vw,2.75rem)] leading-tight tracking-tight text-[var(--ink)]">
                <span className="relative">
                  {featured.title}
                  <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-[var(--medical-blue)] transition-transform duration-500 group-hover:scale-x-100" />
                </span>
              </h3>
              <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[var(--muted-text)] line-clamp-2 md:text-[17px]">
                {featured.summary}
              </p>
              <div className="mt-4 flex items-center gap-4">
                <p className="text-[13px] text-[var(--muted-text)]">
                  {featured.readingTime} dk okuma
                </p>
                <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--ink)]">
                  Rehberi Oku
                  <AnimatedArrow className="!h-4 !w-4" />
                </span>
              </div>
            </Link>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            {support.map((article, i) => (
              <motion.div
                key={article.id}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: easeOutExpo,
                }}
              >
                <Link
                  href={`/saglik-rehberi/${article.slug}`}
                  className="group flex items-start justify-between gap-4 border-b border-[var(--line)] py-5 first:border-t"
                >
                  <div>
                    <p className="meta-text text-[var(--medical-blue)]">
                      {article.categoryLabel}
                    </p>
                    <h3 className="mt-2 font-serif text-[clamp(18px,4.5vw,21px)] leading-snug tracking-tight text-[var(--ink)] transition-transform duration-300 group-hover:translate-x-1 md:text-[1.35rem]">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-[var(--muted-text)]">
                      {article.readingTime} dk
                    </p>
                  </div>
                  <AnimatedArrow className="mt-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
