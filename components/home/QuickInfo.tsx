"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Megaphone, Phone } from "lucide-react";
import { contactInfo } from "@/data/contact";
import type { Announcement } from "@/types";
import { HorizontalRail } from "@/components/ui/MotionBits";
import { duration, easeOutExpo, stagger } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type Props = { latestAnnouncement?: Announcement };

function items(latest?: Announcement) {
  return [
    {
      label: "Çalışma Saatleri",
      value: "08.00 — 17.00",
      support: "Hafta içi · öğle 12.00–13.00",
      href: "/calisma-saatleri",
      icon: Clock,
      external: false,
    },
    {
      label: "Telefon",
      value: contactInfo.phone,
      support: "Mesai saatleri içinde arayın",
      href: contactInfo.phoneHref,
      icon: Phone,
      external: true,
    },
    {
      label: "Adres",
      value: `${contactInfo.address.district} / ${contactInfo.address.city}`,
      support: contactInfo.address.street,
      href: contactInfo.mapsUrl,
      icon: MapPin,
      external: true,
    },
    {
      label: "Son Duyuru",
      value: latest?.title ?? "Duyurulara göz atın",
      support: latest?.categoryLabel ?? "Bilgilendirme",
      href: latest ? `/duyurular/${latest.slug}` : "/duyurular",
      icon: Megaphone,
      external: false,
    },
  ] as const;
}

export function InfoStrip({ latestAnnouncement }: Props) {
  const cols = items(latestAnnouncement);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section
      className="relative z-20 border-y border-[var(--line)] bg-white/75"
      aria-label="Hızlı bilgiler"
    >
      <div className="container-page py-5 md:py-0">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: duration.reveal, ease: easeOutExpo }}
        >
          {/* Desktop */}
          <div className="hidden lg:grid lg:grid-cols-4">
            {cols.map((col, i) => (
              <div key={col.label} className="relative">
                {i > 0 && (
                  <motion.div
                    className="absolute inset-y-7 left-0 w-px origin-top bg-[var(--line)]"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 * i,
                      ease: easeOutExpo,
                    }}
                    aria-hidden
                  />
                )}
                <InfoCell {...col} />
              </div>
            ))}
          </div>

          {/* Mobile rail */}
          <div className="lg:hidden">
            <HorizontalRail
              className="-mx-[var(--pad-x)] px-[var(--pad-x)]"
              onScrollProgress={setProgress}
            >
              {cols.map((col, i) => (
                <motion.div
                  key={col.label}
                  className="snap-start w-[82vw] max-w-[340px] shrink-0"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: i * stagger.standard,
                    ease: easeOutExpo,
                  }}
                >
                  <InfoCell {...col} bordered />
                </motion.div>
              ))}
            </HorizontalRail>
            <div className="rail-progress mt-4">
              <span style={{ transform: `scaleX(${0.25 + progress * 0.75})` }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoCell({
  label,
  value,
  support,
  href,
  icon: Icon,
  external,
  bordered,
}: {
  label: string;
  value: string;
  support: string;
  href: string;
  icon: typeof Clock;
  external: boolean;
  bordered?: boolean;
}) {
  const className =
    "group flex min-h-[128px] flex-col justify-between gap-5 px-1 py-6 transition-colors hover:bg-[var(--mist-blue)]/40 md:min-h-[148px] md:px-7 md:py-8" +
    (bordered
      ? " rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--pure-white)]/60 px-5"
      : "");

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="meta-text text-[var(--muted-text)]">{label}</span>
        <Icon className="h-4 w-4 text-[var(--medical-blue)]" aria-hidden />
      </div>
      <div>
        <p className="font-serif text-[clamp(1.25rem,4vw,1.75rem)] leading-[1.15] tracking-tight text-[var(--ink)] line-clamp-3">
          {value}
        </p>
        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="text-[13px] leading-snug text-[var(--muted-text)] line-clamp-2">
            {support}
          </p>
          <ArrowUpRight className="mb-0.5 h-4 w-4 shrink-0 text-[var(--ink)]/35 transition-transform duration-[220ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {body}
    </Link>
  );
}
