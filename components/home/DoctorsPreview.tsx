"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Doctor } from "@/types";
import { Button } from "@/components/ui/Button";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { AmbientLights } from "@/components/ui/AmbientLights";
import { SectionIndex } from "@/components/ui/MotionBits";
import { WordReveal, ParagraphReveal } from "@/components/animations/WordReveal";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { duration, easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function DoctorsPreview({ doctors }: { doctors: Doctor[] }) {
  const list = doctors.slice(0, 4);
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const railRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false });

  const doctor = list[index] ?? list[0];
  if (!doctor) return null;

  function go(dir: -1 | 1) {
    setIndex((i) => (i + dir + list.length) % list.length);
  }

  useEffect(() => {
    if (!mobile || !railRef.current) return;
    const el = railRef.current.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, [index, mobile]);

  return (
    <section className="section-pad relative overflow-hidden bg-white/70">
      <AmbientLights variant="section" />
      <div className="section-rule absolute inset-x-0 top-0" aria-hidden />
      <div className="container-page relative z-[2]">
        <div className="mb-7 flex flex-col gap-5 md:mb-11 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionIndex index="03" label="Hekimlerimiz" />
            <WordReveal as="h2" className="section-title" text="Hekimlerimiz" />
            <ParagraphReveal
              className="body-intro mt-3 max-w-lg"
              delay={0.1}
              text="Merkezimizde görev yapan aile hekimlerini ve birim bilgilerini inceleyebilirsiniz."
            />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <NavBtn onClick={() => go(-1)} label="Önceki" />
            <NavBtn onClick={() => go(1)} label="Sonraki" next />
          </div>
        </div>

        {/* Mobile horizontal cards */}
        <div className="lg:hidden">
          <div
            ref={railRef}
            className="hide-scrollbar snap-x-mandatory -mx-[var(--pad-x)] flex gap-4 overflow-x-auto px-[var(--pad-x)] pb-2"
            onScroll={(e) => {
              const el = e.currentTarget;
              const card = el.children[0] as HTMLElement | undefined;
              if (!card) return;
              const step = card.offsetWidth + 16;
              const next = Math.round(el.scrollLeft / step);
              if (next !== index && next >= 0 && next < list.length) {
                setIndex(next);
              }
            }}
          >
            {list.map((d) => (
              <article
                key={d.id}
                className="snap-start w-[86vw] max-w-[360px] shrink-0"
              >
                <MediaFallback
                  type="doctor"
                  src={d.image}
                  alt={`${d.name} portresi`}
                  label={d.unit}
                  aspectRatio="4 / 5"
                  className="rounded-tl-[24px] rounded-br-[24px]"
                />
                <div className="mt-5">
                  <p className="meta-text text-[var(--medical-blue)]">{d.unit}</p>
                  <h3 className="mt-2 font-serif text-[clamp(30px,8vw,38px)] leading-[1.05] tracking-tight text-[var(--ink)]">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-[16px] text-[var(--muted-text)]">
                    {d.title}
                  </p>
                  <p className="mt-2 text-[14px] text-[var(--ink)]/65">
                    {d.workingDays.join(" · ")}
                  </p>
                  <p className="mt-3 text-[16px] leading-relaxed text-[var(--muted-text)] line-clamp-3">
                    {d.shortBio}
                  </p>
                  <div className="mt-5">
                    <Button href={`/hekimler/${d.slug}`} size="md">
                      Profili İncele
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--line)]">
              <div
                className="h-full bg-[var(--medical-blue)] transition-all duration-500"
                style={{ width: `${((index + 1) / list.length) * 100}%` }}
              />
            </div>
            <span className="text-[13px] font-semibold tabular-nums text-[var(--muted-text)]">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(list.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Desktop featured stage */}
        <div
          className="relative hidden items-stretch gap-10 lg:grid lg:grid-cols-12"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setCursor({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              on: true,
            });
          }}
          onMouseLeave={() => setCursor((c) => ({ ...c, on: false }))}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-tl-[32px] rounded-br-[32px] bg-[var(--mist-blue)] lg:col-span-7 lg:aspect-auto lg:min-h-[560px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={doctor.id}
                className="absolute inset-0"
                initial={
                  reduced
                    ? { opacity: 0 }
                    : { opacity: 0, y: 28, scale: 1.02 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduced
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.98, y: -10 }
                }
                transition={{ duration: duration.image, ease: easeOutExpo }}
              >
                <MediaFallback
                  type="doctor"
                  src={doctor.image}
                  alt={`${doctor.name} portresi`}
                  label={doctor.unit}
                  aspectRatio="auto"
                  className="!aspect-auto h-full w-full"
                />
              </motion.div>
            </AnimatePresence>

            {cursor.on && !mobile && (
              <div
                className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-[var(--ink)]/70 px-4 py-2 text-[12px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-sm lg:flex"
                style={{ left: cursor.x, top: cursor.y }}
              >
                Sürükle
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={doctor.id + "-meta"}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: duration.standard,
                  ease: easeOutExpo,
                  delay: 0.12,
                }}
              >
                <p className="meta-text text-[var(--medical-blue)]">
                  {doctor.unit}
                </p>
                <h3 className="mt-3 font-serif text-[clamp(2rem,3.5vw,3.35rem)] leading-[1.05] tracking-tight text-[var(--ink)]">
                  {doctor.name}
                </h3>
                <p className="mt-2 text-[17px] text-[var(--muted-text)]">
                  {doctor.title}
                </p>
                <p className="mt-5 text-[16px] leading-relaxed text-[var(--muted-text)] md:text-[17px]">
                  {doctor.shortBio}
                </p>
                <p className="mt-3 text-[14px] text-[var(--ink)]/70">
                  {doctor.workingDays.join(" · ")}
                </p>
                <div className="mt-7">
                  <Button href={`/hekimler/${doctor.slug}`}>
                    Profili İncele
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-[var(--line)]">
                <div
                  className="h-full bg-[var(--medical-blue)] transition-all duration-500"
                  style={{ width: `${((index + 1) / list.length) * 100}%` }}
                />
              </div>
              <span className="text-[13px] font-semibold tabular-nums text-[var(--muted-text)]">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(list.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-6 flex gap-2">
              {list.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "min-h-10 px-3 text-[13px] font-semibold tracking-wide transition-colors",
                    i === index
                      ? "text-[var(--medical-blue)]"
                      : "text-[var(--muted-text)] hover:text-[var(--ink)]",
                  )}
                >
                  {d.unit}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/hekimler"
            className="text-[15px] font-semibold text-[var(--medical-blue)] hover:underline"
          >
            Tüm hekimleri gör →
          </Link>
        </div>
      </div>
    </section>
  );
}

function NavBtn({
  onClick,
  label,
  next,
}: {
  onClick: () => void;
  label: string;
  next?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--ink)] transition-transform duration-[220ms] hover:border-[var(--medical-blue)] hover:text-[var(--medical-blue)] active:scale-[0.97]"
    >
      {next ? (
        <ArrowRight className="h-4 w-4" />
      ) : (
        <ArrowLeft className="h-4 w-4" />
      )}
    </button>
  );
}
