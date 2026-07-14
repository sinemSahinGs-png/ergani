"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Props = {
  isOpenToday?: boolean;
  openHoursLabel?: string;
  className?: string;
};

export function HeroVideo({
  isOpenToday = true,
  openHoursLabel = "08.00–17.00",
  className,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    video.play().catch(() => {
      /* autoplay may be blocked; poster remains */
    });
  }, [failed]);

  return (
    <div className={cn("relative", className)}>
      <div
        className="pointer-events-none absolute -inset-6 rounded-[40%] bg-[radial-gradient(circle_at_center,rgba(35,100,210,0.22),transparent_70%)] blur-2xl"
        aria-hidden
      />

      <motion.div
        className="relative overflow-hidden rounded-[var(--radius-hero)] border border-[var(--color-border)] bg-[var(--color-soft-blue)] shadow-[var(--shadow-lg)]"
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.018, 1],
              }
        }
        transition={
          reduced
            ? undefined
            : { duration: 14, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          boxShadow:
            "0 0 0 1px rgba(35,100,210,0.12), 0 20px 50px rgba(35,100,210,0.12)",
        }}
      >
        <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-auto lg:min-h-[560px] lg:h-full">
          {!failed ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/asm-video-poster.svg"
              onError={() => setFailed(true)}
              aria-label="Ergani 1 No'lu Aile Sağlığı Merkezi tanıtım videosu"
            >
              <source src="/videos/asm-hero.webm" type="video/webm" />
              <source src="/videos/asm-hero.mp4" type="video/mp4" />
            </video>
          ) : !posterFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/asm-video-poster.svg"
              alt="Ergani 1 No'lu Aile Sağlığı Merkezi"
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setPosterFailed(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-soft-blue)] via-white to-[var(--color-pale-blue)] p-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-medical)] text-white shadow-[var(--shadow-md)]">
                <Plus className="h-8 w-8" aria-hidden />
              </div>
              <p className="text-lg font-bold text-[var(--color-navy)]">
                Ergani 1 No&apos;lu
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-gray)]">
                Aile Sağlığı Merkezi
              </p>
              <p className="mt-4 max-w-xs text-sm text-[var(--color-text-gray)]">
                Tanıtım videosu yakında eklenecektir. Poster dosyasını{" "}
                <code className="text-xs">/public/images/</code> altına
                koyabilirsiniz.
              </p>
            </div>
          )}

          <div className="absolute top-4 left-4 z-10">
            <Badge tone="green" pulse>
              {isOpenToday ? "Bugün Açık" : "Kapalı"} · {openHoursLabel}
            </Badge>
          </div>
        </div>
      </motion.div>

      {isDesktop && (
        <>
          <FloatingBadge className="-left-3 top-[18%]" delay={0}>
            <Plus className="h-4 w-4 text-[var(--color-medical)]" />
            Sağlık
          </FloatingBadge>
          <FloatingBadge className="-right-2 top-[28%]" delay={0.4}>
            <MapPin className="h-4 w-4 text-[var(--color-medical)]" />
            Ergani
          </FloatingBadge>
          <FloatingBadge className="-left-2 bottom-[22%]" delay={0.8}>
            <Clock className="h-4 w-4 text-[var(--color-medical)]" />
            08.00–17.00
          </FloatingBadge>
          <FloatingBadge className="-right-4 bottom-[16%]" delay={1.2}>
            Aile Sağlığı Merkezi
          </FloatingBadge>
        </>
      )}

      <p className="sr-only">
        Video içeriği: Ergani 1 No&apos;lu Aile Sağlığı Merkezi hakkında
        bilgilendirme. Flash içeren animasyon yoktur.
      </p>
    </div>
  );
}

function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn(
        "absolute z-20 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3 py-2 text-xs font-semibold text-[var(--color-navy)] shadow-[var(--shadow-md)] backdrop-blur-md",
        className,
      )}
      animate={
        reduced
          ? undefined
          : { y: [0, -8, 0] }
      }
      transition={
        reduced
          ? undefined
          : {
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }
      }
    >
      {children}
    </motion.div>
  );
}
