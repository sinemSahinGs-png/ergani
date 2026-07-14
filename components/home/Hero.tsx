"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion as useFramerReduced,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeroTitleReveal } from "@/components/animations/WordReveal";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

type MediaPhase = "loading" | "playing" | "fallback";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const framerReduced = useFramerReduced();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduced || mobile ? 1 : 1.03],
  );
  const deskY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const deskOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.45]);

  return (
    <section
      ref={ref}
      className="grain relative overflow-hidden bg-[var(--ivory)] pt-[80px] md:min-h-[100svh] md:pt-[88px]"
    >
      <div
        className="pointer-events-none absolute -top-24 left-1/4 h-[280px] w-[280px] rounded-full bg-[var(--sky-blue)]/30 blur-[80px] md:h-[420px] md:w-[420px]"
        aria-hidden
      />

      <div className="container-page relative grid items-start gap-8 py-8 md:min-h-[calc(100svh-88px)] md:items-center md:gap-10 md:py-12 lg:grid-cols-12 lg:gap-6 lg:py-0">
        <motion.div
          className="relative z-10 order-1 lg:col-span-5"
          style={
            framerReduced || mobile || reduced
              ? undefined
              : { y: deskY, opacity: deskOpacity }
          }
        >
          <p className="editorial-label mb-5 md:mb-6">
            Ergani&apos;de sağlık hizmeti
          </p>

          <HeroTitleReveal
            lines={["Sağlığınız için", "her zaman", "yanınızdayız."]}
          />

          <div className="mt-6 max-w-md md:mt-7">
            <p className="text-[16px] leading-relaxed text-[var(--muted-text)] md:text-[18px]">
              Koruyucu sağlık hizmetleri, aile hekimliği uygulamaları ve
              danışmanlık desteğiyle size en yakın sağlık noktasındayız.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-9">
            <Button
              href="/hekimler"
              size="lg"
              magnetic={!mobile}
              fullWidth
              className="sm:w-auto"
            >
              Hekimlerimizi Tanıyın
            </Button>
            <Button
              href="/iletisim"
              variant="secondary"
              size="lg"
              magnetic={!mobile}
              showArrow={false}
              fullWidth
              className="sm:w-auto"
            >
              Merkeze Yol Tarifi
            </Button>
          </div>

          <div className="mt-6 inline-flex items-center gap-2.5 text-[14px] text-[var(--muted-text)] md:mt-8 md:text-sm">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sage)] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sage)]" />
            </span>
            Bugün 08.00–17.00 arası açığız
          </div>
        </motion.div>

        <div className="relative z-[1] order-2 w-full lg:col-span-7 lg:-mr-[max(0px,calc((100vw-1440px)/2+5.5rem))] lg:pl-4">
          <HeroMedia scale={mobile || reduced ? undefined : videoScale} />
        </div>
      </div>
    </section>
  );
}

function HeroMedia({
  scale,
}: {
  scale?: ReturnType<typeof useTransform<number, number>>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<MediaPhase>("loading");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const markPlaying = () => {
      if (!cancelled) setPhase("playing");
    };
    const markFallback = () => {
      if (!cancelled) setPhase("fallback");
    };

    const onLoaded = () => {
      markPlaying();
      video.play().catch(() => {
        /* autoplay may be blocked; still show first frame */
        markPlaying();
      });
    };

    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("canplay", onLoaded);
    video.addEventListener("error", markFallback);
    video.querySelectorAll("source").forEach((source) => {
      source.addEventListener("error", markFallback);
    });

    /* If metadata already cached */
    if (video.readyState >= 2) onLoaded();

    const timeout = window.setTimeout(() => {
      if (!cancelled && video.readyState < 2) markFallback();
    }, 4000);

    video.load();
    video.play().catch(() => undefined);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("canplay", onLoaded);
      video.removeEventListener("error", markFallback);
    };
  }, []);

  const showFallback = phase === "fallback" || phase === "loading";

  const frame = (
    <div
      className={
        phase === "playing"
          ? "video-mask is-organic relative aspect-[4/5] min-h-[430px] w-full overflow-hidden bg-[var(--mist-blue)] shadow-[var(--shadow-md)] sm:min-h-0 lg:aspect-[16/11] lg:min-h-[520px]"
          : "video-mask relative aspect-[4/5] min-h-[430px] w-full overflow-hidden bg-[linear-gradient(150deg,#7f9bc4_0%,#c5d8ef_40%,#e7efea_72%,#f7f5ef_100%)] shadow-[var(--shadow-md)] sm:min-h-0 lg:aspect-[16/11] lg:min-h-[520px]"
      }
    >
      {showFallback && (
        <>
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(255,255,255,0.85),transparent_55%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_85%,rgba(123,156,139,0.35),transparent_50%)]"
            aria-hidden
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/asm-video-poster.svg"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        </>
      )}

      <video
        ref={videoRef}
        className={
          phase === "playing"
            ? "absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-500"
            : "absolute inset-0 h-full w-full object-cover opacity-0"
        }
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/asm-video-poster.svg"
        aria-label="Ergani 1 No'lu Aile Sağlığı Merkezi tanıtım videosu"
      >
        <source src="/videos/asm-hero.mp4" type="video/mp4" />
      </video>

      {phase === "fallback" && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--ink)]/45 via-[var(--ink)]/10 to-transparent p-5 pt-16 md:p-7 md:pt-20">
          <span className="mb-2 block h-0.5 w-10 bg-[var(--medical-blue)]" aria-hidden />
          <p className="font-serif text-2xl tracking-tight text-white md:text-3xl">
            Ergani 1 No&apos;lu
          </p>
          <p className="mt-1 text-sm text-white/85">Aile Sağlığı Merkezi</p>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ink)]/10 via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );

  if (!scale) {
    return <div className="relative w-full">{frame}</div>;
  }

  return (
    <motion.div className="relative w-full" style={{ scale }}>
      {frame}
    </motion.div>
  );
}
