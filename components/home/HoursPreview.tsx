"use client";

import { workingHoursData } from "@/data/working-hours";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function HoursPreview() {
  const today = new Date().getDay();
  const todayRow = workingHoursData.weekly.find((d) => d.dayIndex === today);

  return (
    <section className="relative bg-[var(--deep-navy)] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.22),transparent_55%)]"
        aria-hidden
      />
      <div className="container-page relative grid gap-10 px-[var(--pad-x)] py-20 md:gap-14 md:py-[clamp(5rem,8vw,7rem)] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[var(--sky-blue)] uppercase">
            Çalışma saatleri
          </p>
          <h2 className="font-serif text-[clamp(2.375rem,8vw,4.5rem)] leading-[1.05] tracking-tight">
            Hafta içi sizin için buradayız.
          </h2>
          <div className="mt-5 inline-flex items-center gap-2.5 text-[15px] text-white/75">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sage)] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sage)]" />
            </span>
            Bugün: {todayRow?.hours ?? "—"}
          </div>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/55">
            Öğle arası {workingHoursData.lunchBreak}. Özel uygulama saatleri
            birimlere göre değişebilir.
          </p>
          <p className="mt-3 max-w-md text-[14px] text-white/45">
            {workingHoursData.holidayNote}
          </p>
          <div className="mt-8">
            <Button
              href="/calisma-saatleri"
              className="!bg-white !text-[var(--deep-navy)] hover:!bg-[var(--sky-blue)]"
            >
              Detaylı program
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul>
            {workingHoursData.weekly.map((row) => {
              const isToday = row.dayIndex === today;
              return (
                <li
                  key={row.day}
                  className={cn(
                    "grid grid-cols-[1fr_auto] items-center gap-4 border-b border-white/12 py-4",
                    isToday && "relative",
                  )}
                >
                  {isToday && (
                    <span
                      className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--sky-blue)] shadow-[0_0_0_4px_rgba(191,216,255,0.2)]"
                      aria-hidden
                    />
                  )}
                  <span
                    className={cn(
                      "font-serif text-xl md:text-2xl",
                      isToday ? "text-[var(--sky-blue)]" : "text-white/90",
                    )}
                  >
                    {row.day}
                    {isToday && (
                      <span className="ml-2 font-sans text-xs tracking-wide uppercase opacity-70">
                        Bugün
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-right tabular-nums text-[15px] md:text-base",
                      row.isClosed ? "text-white/40" : "text-white/85",
                    )}
                  >
                    {row.isClosed ? "Kapalı" : "08.00 / 17.00"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
