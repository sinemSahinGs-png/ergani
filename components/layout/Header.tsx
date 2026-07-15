"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { useMenu } from "@/components/layout/MenuContext";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { cn } from "@/lib/utils";
import { duration, easeOutExpo } from "@/lib/motion";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { open, setOpen, toggle } = useMenu();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const threshold = isHome ? Math.min(window.innerHeight * 0.75, 520) : 40;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  const transparent = isHome && !scrolled && !open;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: duration.standard, ease: easeOutExpo }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          transparent
            ? "bg-transparent"
            : "border-b border-[var(--line)] bg-[color-mix(in_srgb,#ffffff_88%,transparent)] backdrop-blur-xl",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between gap-6 transition-all duration-500",
            scrolled ? "h-[68px]" : "h-[72px] md:h-[80px]",
          )}
        >
          <Logo compact={scrolled} light={transparent} />

          <nav
            className="hidden items-center gap-1 xl:flex"
            aria-label="Ana navigasyon"
          >
            {mainNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-colors",
                    transparent
                      ? active
                        ? "text-[var(--sky-blue)]"
                        : "text-white/80 hover:text-white"
                      : active
                        ? "text-[var(--medical-blue)]"
                        : "text-[var(--ink)]/75 hover:text-[var(--ink)]",
                  )}
                >
                  <span className="relative overflow-hidden">
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-current transition-transform duration-400",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </span>
                      {active && (
                        <motion.span
                          layoutId="nav-line"
                          className={cn(
                            "absolute inset-x-3.5 -bottom-0.5 h-px",
                            transparent
                              ? "bg-[var(--sky-blue)]"
                              : "bg-[var(--medical-blue)]",
                          )}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <MagneticButton className="hidden md:inline-flex">
              <a
                href={contactInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-[var(--radius-md)] border px-4 py-2.5 text-[13px] font-semibold backdrop-blur-sm transition-colors",
                  transparent
                    ? "border-white/30 bg-white/10 text-white hover:border-white/55 hover:bg-white/20"
                    : "border-[var(--ink)]/15 bg-white/70 text-[var(--ink)] hover:border-[var(--medical-blue)]/40 hover:text-[var(--medical-blue)]",
                )}
              >
                <MapPin className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                Yol Tarifi
              </a>
            </MagneticButton>

            <button
              type="button"
              className={cn(
                "relative inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-sm xl:hidden",
                transparent
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-[var(--line)] bg-white/80 text-[var(--ink)]",
              )}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={toggle}
            >
              <span className="sr-only">Menü</span>
              <span className="relative block h-3.5 w-4">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-current transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-1.5 left-0 block h-px w-full bg-current transition-all duration-300",
                    open ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-current transition-all duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>
      <MobileMenu />
    </>
  );
}
