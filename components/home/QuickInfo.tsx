"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Megaphone, Phone } from "lucide-react";
import { contactInfo } from "@/data/contact";
import type { Announcement } from "@/types";

type Props = { latestAnnouncement?: Announcement };

function items(latest?: Announcement) {
  return [
    {
      label: "Çalışma Saatleri",
      value: "08.00 — 17.00",
      href: "/calisma-saatleri",
      icon: Clock,
      external: false,
    },
    {
      label: "Telefon",
      value: contactInfo.phone,
      href: contactInfo.phoneHref,
      icon: Phone,
      external: true,
    },
    {
      label: "Adres",
      value: `${contactInfo.address.district} / ${contactInfo.address.city}`,
      href: contactInfo.mapsUrl,
      icon: MapPin,
      external: true,
    },
    {
      label: "Son Duyuru",
      value: latest?.title ?? "Duyurulara göz atın",
      href: latest ? `/duyurular/${latest.slug}` : "/duyurular",
      icon: Megaphone,
      external: false,
    },
  ] as const;
}

export function InfoStrip({ latestAnnouncement }: Props) {
  const cols = items(latestAnnouncement);

  return (
    <section
      className="relative z-20 mt-4 lg:-mt-10"
      aria-label="Hızlı bilgiler"
    >
      <div className="container-page">
        <div className="border border-[var(--line)] bg-[var(--pure-white)] shadow-[var(--shadow-sm)] md:shadow-[var(--shadow-md)]">
          <div className="hidden lg:grid lg:grid-cols-4">
            {cols.map((col, i) => (
              <div key={col.label} className="relative">
                {i > 0 && (
                  <div
                    className="absolute inset-y-6 left-0 w-px bg-[var(--line)]"
                    aria-hidden
                  />
                )}
                <InfoCell {...col} />
              </div>
            ))}
          </div>

          <div className="hide-scrollbar snap-x-mandatory flex overflow-x-auto lg:hidden">
            {cols.map((col) => (
              <div
                key={col.label}
                className="snap-start w-[85vw] max-w-[340px] shrink-0 border-r border-[var(--line)] last:border-r-0"
              >
                <InfoCell {...col} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCell({
  label,
  value,
  href,
  icon: Icon,
  external,
}: {
  label: string;
  value: string;
  href: string;
  icon: typeof Clock;
  external: boolean;
}) {
  const className =
    "group flex min-h-[132px] flex-col justify-between gap-5 p-6 transition-colors hover:bg-[var(--mist-blue)]/55 md:min-h-[150px] md:p-8";

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-semibold tracking-[0.16em] text-[var(--muted-text)] uppercase">
          {label}
        </span>
        <Icon
          className="h-4 w-4 text-[var(--medical-blue)]"
          aria-hidden
        />
      </div>
      <div className="flex items-end justify-between gap-3">
        <p className="font-serif text-[clamp(1.2rem,3.5vw,1.7rem)] leading-tight tracking-tight text-[var(--ink)] line-clamp-3">
          {value}
        </p>
        <ArrowUpRight className="mb-0.5 h-4 w-4 shrink-0 text-[var(--ink)]/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
