"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Service } from "@/types";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { AnimatedArrow, SectionIndex } from "@/components/ui/MotionBits";
import { AmbientLights } from "@/components/ui/AmbientLights";
import { WordReveal, ParagraphReveal } from "@/components/animations/WordReveal";
import { duration, easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function ServicesSection({ services }: { services: Service[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <section className="section-pad relative overflow-hidden bg-[var(--mist-blue)]/90">
      <AmbientLights variant="section" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/60 to-transparent"
        aria-hidden
      />
      <div className="container-page relative z-[2] grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className={cn(!isMobile && "lg:sticky lg:top-28")}>
            <SectionIndex index="02" label="Hizmetler" />
            <WordReveal as="h2" className="section-title" text="Hizmetlerimiz" />
            <ParagraphReveal
              className="body-intro mt-4 max-w-sm"
              delay={0.12}
              text="Birinci basamak aile hekimliği kapsamında sunduğumuz koruyucu ve danışmanlık hizmetleri."
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul>
            {services.map((service, i) => {
              const open = openId === service.id;
              return (
                <motion.li
                  key={service.id}
                  className="border-b border-[var(--line)] first:border-t"
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: Math.min(i * 0.05, 0.3),
                    ease: easeOutExpo,
                  }}
                >
                  <button
                    type="button"
                    className={cn(
                      "group relative flex w-full items-start gap-4 py-5 text-left transition-colors duration-[350ms] md:gap-8 md:py-6",
                      open
                        ? "bg-[var(--soft-blue)]/70"
                        : "bg-transparent md:hover:bg-[var(--soft-blue)]/55",
                    )}
                    style={{ minHeight: 74 }}
                    onClick={() => setOpenId(open ? null : service.id)}
                    onMouseEnter={() => {
                      if (!isMobile) setOpenId(service.id);
                    }}
                    aria-expanded={open}
                  >
                    {!isMobile && (
                      <span
                        className="absolute inset-y-0 left-0 origin-left scale-x-0 bg-[var(--soft-blue)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                        aria-hidden
                      />
                    )}
                    <span className="relative z-[1] w-8 shrink-0 pt-1.5 text-[13px] font-semibold tabular-nums text-[var(--muted-text)] md:w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative z-[1] min-w-0 flex-1 px-1 md:px-2">
                      <div className="flex items-center justify-between gap-3">
                        <h3
                          className={cn(
                            "font-serif text-[clamp(18px,4.8vw,21px)] leading-tight tracking-tight text-[var(--ink)] transition-transform duration-300 md:text-[clamp(1.35rem,2.4vw,2.05rem)]",
                            "md:group-hover:translate-x-2.5",
                          )}
                        >
                          {service.title}
                        </h3>
                        <AnimatedArrow open={open} />
                      </div>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: duration.standard,
                              ease: easeOutExpo,
                            }}
                            className="overflow-hidden"
                          >
                            <p className="mt-2.5 max-w-xl pb-1 text-[16px] leading-relaxed text-[var(--muted-text)]">
                              {service.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
