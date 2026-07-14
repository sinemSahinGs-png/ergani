"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { duration, easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ServicesSection({ services }: { services: Service[] }) {
  const [openId, setOpenId] = useState<string | null>(services[0]?.id ?? null);
  const isMobile = useIsMobile();

  return (
    <section className="section-pad bg-[var(--mist-blue)]">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className={cn(!isMobile && "lg:sticky lg:top-28")}>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[var(--muted-text)]">
              02 / Hizmetler
            </p>
            <h2 className="section-title">Hizmetlerimiz</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--muted-text)] md:text-[17px]">
              Birinci basamak aile hekimliği kapsamında sunduğumuz koruyucu ve
              danışmanlık hizmetleri.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul>
            {services.map((service, i) => {
              const open = openId === service.id;
              return (
                <li
                  key={service.id}
                  className="border-b border-[var(--line)] first:border-t"
                >
                  <button
                    type="button"
                    className="group relative flex w-full items-start gap-4 py-5 text-left md:gap-8 md:py-6"
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
                    <span className="relative z-[1] w-8 shrink-0 pt-1 text-sm font-semibold text-[var(--muted-text)] md:w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative z-[1] min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-serif text-[clamp(1.25rem,4.5vw,2.15rem)] leading-tight tracking-tight text-[var(--ink)] transition-transform duration-300 md:group-hover:translate-x-2">
                          {service.title}
                        </h3>
                        <ArrowUpRight
                          className={cn(
                            "h-5 w-5 shrink-0 text-[var(--ink)]/35 transition-transform duration-300",
                            open && "rotate-45 text-[var(--medical-blue)]",
                          )}
                        />
                      </div>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: easeOutExpo,
                            }}
                            className="overflow-hidden"
                          >
                            <span className="mt-2 block max-w-xl pb-1 text-[15px] text-[var(--muted-text)] md:text-[16px]">
                              {service.description}
                            </span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
