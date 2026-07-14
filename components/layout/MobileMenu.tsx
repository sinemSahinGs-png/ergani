"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { useMenu } from "@/components/layout/MenuContext";
import { duration, easeOutExpo, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const { open, setOpen } = useMenu();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobil menü"
          className="fixed inset-0 z-[60] xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 overflow-hidden bg-[var(--deep-navy)]">
            <div
              className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[var(--medical-blue)]/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[var(--sage)]/20 blur-3xl"
              aria-hidden
            />
          </div>

          <div className="relative flex h-full flex-col px-6 pt-28 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <motion.nav
              aria-label="Mobil navigasyon"
              className="flex flex-1 flex-col gap-1 overflow-y-auto"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: stagger.standard } },
              }}
            >
              {mainNav.map((item, i) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 28 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: duration.standard,
                          ease: easeOutExpo,
                        },
                      },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block py-3 font-serif text-[clamp(2rem,8vw,2.75rem)] leading-none tracking-tight transition-colors",
                        active
                          ? "text-[var(--sky-blue)]"
                          : "text-white/90 hover:text-white",
                      )}
                    >
                      <span className="mr-3 text-sm font-sans font-medium text-white/35">
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <motion.div
              className="mt-8 space-y-4 border-t border-white/15 pt-6 text-white/75"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45, ease: easeOutExpo }}
            >
              <a
                href={contactInfo.phoneHref}
                className="flex min-h-12 items-center gap-3 text-[15px] font-medium text-white"
              >
                <Phone className="h-4 w-4 text-[var(--sky-blue)]" />
                {contactInfo.phone}
              </a>
              <div className="flex items-start gap-3 text-[15px]">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sky-blue)]" />
                {contactInfo.workingHoursSummary}
              </div>
              <a
                href={contactInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] bg-white px-5 py-3 text-sm font-semibold text-[var(--deep-navy)]"
              >
                <MapPin className="h-4 w-4" />
                Yol Tarifi Al
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
