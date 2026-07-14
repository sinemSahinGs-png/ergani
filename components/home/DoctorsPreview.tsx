"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Doctor } from "@/types";
import { Button } from "@/components/ui/Button";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { duration, easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const palette = [
  "from-[#c8daf0] via-[#eaf3ff] to-[#f4f8fc]",
  "from-[#c9d9ce] via-[#e7efea] to-[#f8f7f2]",
  "from-[#d2cce3] via-[#f0ecf7] to-[#f8f7f2]",
  "from-[#c5d8e6] via-[#eaf3ff] to-[#f4f8fc]",
];

export function DoctorsPreview({ doctors }: { doctors: Doctor[] }) {
  const list = doctors.slice(0, 4);
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const doctor = list[index] ?? list[0];

  if (!doctor) return null;

  function go(dir: -1 | 1) {
    setIndex((i) => (i + dir + list.length) % list.length);
  }

  return (
    <section className="section-pad bg-[var(--ivory)]">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[var(--muted-text)]">
              03 / Hekimler
            </p>
            <h2 className="section-title">Hekimlerimiz</h2>
            <p className="mt-3 max-w-lg text-[16px] text-[var(--muted-text)] md:mt-4 md:text-[17px]">
              Merkezimizde görev yapan aile hekimlerini ve birim bilgilerini
              inceleyebilirsiniz.
            </p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <NavBtn onClick={() => go(-1)} label="Önceki" />
            <NavBtn onClick={() => go(1)} label="Sonraki" next />
          </div>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--mist-blue)] lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={doctor.id}
                className="absolute inset-0"
                initial={
                  reduced || mobile
                    ? { opacity: 0 }
                    : { opacity: 0, y: 24 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={reduced || mobile ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
              >
                <DoctorPortrait
                  doctor={doctor}
                  tone={palette[index % palette.length]}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={doctor.id + "-meta"}
                initial={reduced || mobile ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.standard, ease: easeOutExpo }}
              >
                <p className="text-sm font-semibold tracking-[0.16em] text-[var(--medical-blue)] uppercase">
                  {doctor.unit}
                </p>
                <h3 className="mt-2 font-serif text-[clamp(1.75rem,6vw,3.25rem)] leading-[1.05] tracking-tight text-[var(--ink)]">
                  {doctor.name}
                </h3>
                <p className="mt-2 text-[16px] text-[var(--muted-text)]">
                  {doctor.title}
                </p>
                <p className="mt-5 text-[16px] leading-relaxed text-[var(--muted-text)] md:mt-6 md:text-[17px]">
                  {doctor.shortBio}
                </p>
                <p className="mt-3 text-sm text-[var(--ink)]/70">
                  {doctor.workingDays.join(" · ")}
                </p>
                <div className="mt-7">
                  <Button href={`/hekimler/${doctor.slug}`}>
                    Profili İncele
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[var(--line)]">
                <div
                  className="h-full bg-[var(--medical-blue)] transition-all duration-400"
                  style={{ width: `${((index + 1) / list.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold tabular-nums text-[var(--muted-text)]">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(list.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-5 flex gap-2 md:hidden">
              <NavBtn onClick={() => go(-1)} label="Önceki" />
              <NavBtn onClick={() => go(1)} label="Sonraki" next />
            </div>
          </div>
        </div>

        <div className="hide-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {list.map((d, i) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "min-h-11 shrink-0 border px-4 text-sm font-semibold transition-colors",
                i === index
                  ? "border-[var(--deep-navy)] bg-[var(--deep-navy)] text-white"
                  : "border-[var(--line)] bg-white text-[var(--ink)]",
              )}
            >
              {d.unit}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/hekimler"
            className="text-sm font-semibold text-[var(--medical-blue)] hover:underline"
          >
            Tüm hekimleri gör →
          </Link>
        </div>
      </div>
    </section>
  );
}

function DoctorPortrait({
  doctor,
  tone,
}: {
  doctor: Doctor;
  tone: string;
}) {
  const [err, setErr] = useState(false);
  return (
    <div className={cn("absolute inset-0 bg-gradient-to-br", tone)}>
      {!err ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={doctor.image}
          alt={`${doctor.name} portresi`}
          className="h-full w-full object-cover"
          onError={() => setErr(true)}
        />
      ) : (
        <div className="relative flex h-full w-full flex-col justify-end p-6 md:p-10">
          <div
            className="absolute top-[14%] left-1/2 h-[52%] w-[58%] -translate-x-1/2 rounded-[45%_45%_40%_40%] bg-white/35"
            aria-hidden
          />
          <div
            className="absolute top-[22%] left-1/2 h-[28%] w-[32%] -translate-x-1/2 rounded-full bg-[var(--deep-navy)]/12"
            aria-hidden
          />
          <p className="relative font-serif text-4xl text-[var(--ink)]/25 md:text-6xl">
            {doctor.initials}
          </p>
          <p className="relative mt-1 text-sm text-[var(--muted-text)]">
            Portre görseli yakında eklenecek
          </p>
        </div>
      )}
    </div>
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
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--ink)] transition-colors hover:border-[var(--medical-blue)] hover:text-[var(--medical-blue)]"
    >
      {next ? (
        <ArrowRight className="h-4 w-4" />
      ) : (
        <ArrowLeft className="h-4 w-4" />
      )}
    </button>
  );
}
