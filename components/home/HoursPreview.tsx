"use client";

import { motion } from "framer-motion";
import { workingHoursData } from "@/data/working-hours";
import { Button } from "@/components/ui/Button";
import { SectionIndex } from "@/components/ui/MotionBits";
import { AmbientLights } from "@/components/ui/AmbientLights";
import { WordReveal } from "@/components/animations/WordReveal";
import { duration, easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function HoursPreview() {
  const today = new Date().getDay();
  const todayRow = workingHoursData.weekly.find((d) => d.dayIndex === today);
  const isOpenToday = todayRow && !todayRow.isClosed;
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--deep-navy)] text-white">
      <AmbientLights variant="hero" />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.35),transparent_55%)]"
        initial={reduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: easeOutExpo }}
        aria-hidden
      />
      <div className="container-page relative z-[2] grid gap-10 px-[var(--pad-x)] py-16 md:gap-14 md:py-[clamp(4.5rem,7vw,6.5rem)] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionIndex
            index="05"
            label="Çalışma Saatleri"
            tone="light"
            className="!text-[var(--sky-blue)]"
          />
          <WordReveal
            as="h2"
            className="font-serif text-[clamp(38px,10.5vw,52px)] leading-[1.05] tracking-tight text-white md:text-[clamp(2.75rem,5vw,4.5rem)]"
            text="Hafta içi sizin için buradayız."
          />

          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-3.5 py-2 text-[14px] text-white/85">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                isOpenToday ? "bg-[var(--sage)]" : "bg-white/35",
              )}
              aria-hidden
            />
            {isOpenToday ? "Bugün Açık" : "Bugün Kapalı"}
            <span className="text-white/45">·</span>
            <span className="tabular-nums">{todayRow?.hours ?? "—"}</span>
          </div>

          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/65">
            Öğle arası {workingHoursData.lunchBreak}. Özel uygulama saatleri
            birimlere göre değişebilir.
          </p>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/45">
            {workingHoursData.holidayNote}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="/calisma-saatleri"
              className="!bg-white !text-[var(--deep-navy)] hover:!bg-[var(--sky-blue)]"
            >
              Detaylı program
            </Button>
            <Button
              href="/iletisim"
              variant="secondary"
              className="!border-white/30 !text-white hover:!border-white hover:!bg-white hover:!text-[var(--deep-navy)]"
              showArrow={false}
            >
              Yol Tarifi
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul>
            {workingHoursData.weekly.map((row, i) => {
              const isToday = row.dayIndex === today;
              return (
                <motion.li
                  key={row.day}
                  className={cn(
                    "grid grid-cols-[1fr_auto] items-center gap-4 border-b border-white/12 py-4",
                    isToday && "relative",
                  )}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05 * i,
                    ease: easeOutExpo,
                  }}
                >
                  {isToday && (
                    <motion.span
                      className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--sage)]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.45, duration: 0.35 }}
                      aria-hidden
                    />
                  )}
                  <span
                    className={cn(
                      "font-serif text-[20px] md:text-[24px]",
                      isToday ? "text-[var(--sky-blue)]" : "text-white/90",
                    )}
                  >
                    {row.day}
                    {isToday && (
                      <span className="ml-2 font-sans text-[12px] tracking-[0.14em] uppercase opacity-70">
                        Bugün
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "overflow-hidden text-right tabular-nums text-[15px] md:text-base",
                      row.isClosed ? "text-white/40" : "text-white/85",
                    )}
                  >
                    <motion.span
                      className="inline-block"
                      initial={reduced ? false : { y: "100%", opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.55,
                        delay: 0.08 * i,
                        ease: easeOutExpo,
                      }}
                    >
                      {row.isClosed ? "Kapalı" : "08.00 / 17.00"}
                    </motion.span>
                  </span>
                  {isToday && (
                    <span
                      className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--sage)]/70"
                      aria-hidden
                    />
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
