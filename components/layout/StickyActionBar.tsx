"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { useMenu } from "@/components/layout/MenuContext";
import { cn } from "@/lib/utils";

export function StickyActionBar() {
  const { open } = useMenu();
  const [show, setShow] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const visible = show && !open && !footerVisible;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--ivory)_88%,transparent)] backdrop-blur-xl transition-all duration-300 lg:hidden",
        "pb-[env(safe-area-inset-bottom,0px)]",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
      role="navigation"
      aria-label="Hızlı işlemler"
      aria-hidden={!visible}
    >
      <div className="grid h-[72px] grid-cols-3">
        <a
          href={contactInfo.phoneHref}
          className="flex flex-col items-center justify-center gap-1 text-[var(--ink)] transition-transform active:scale-95"
        >
          <Phone className="h-5 w-5 text-[var(--medical-blue)]" aria-hidden />
          <span className="text-xs font-semibold">Ara</span>
        </a>
        <a
          href={contactInfo.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 border-x border-[var(--line)] text-[var(--ink)] transition-transform active:scale-95"
        >
          <MapPin className="h-5 w-5 text-[var(--medical-blue)]" aria-hidden />
          <span className="text-xs font-semibold">Yol Tarifi</span>
        </a>
        <Link
          href="/calisma-saatleri"
          className="flex flex-col items-center justify-center gap-1 text-[var(--ink)] transition-transform active:scale-95"
        >
          <Clock className="h-5 w-5 text-[var(--medical-blue)]" aria-hidden />
          <span className="text-xs font-semibold">Saatler</span>
        </Link>
      </div>
    </div>
  );
}
