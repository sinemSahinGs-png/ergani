"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeroTitleReveal, ParagraphReveal } from "@/components/animations/WordReveal";
import { Button, AnimatedLink } from "@/components/ui/Button";
import { AmbientLights } from "@/components/ui/AmbientLights";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { easeOutExpo } from "@/lib/motion";

const fadeItem = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo, delay },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.85], [0, reduced ? 0 : -40]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.9],
    [1, 1, reduced ? 1 : 0.35],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.45, 0.72]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const prepare = async () => {
      if (cancelled) return;
      try {
        video.muted = true;
        await video.play();
        video.pause();
      } catch {
        /* autoplay may fail — still scrub from frame 0 */
      }
      video.currentTime = 0;
      setReady(true);
    };

    const onError = () => {
      if (!cancelled) setFailed(true);
    };

    video.addEventListener("loadedmetadata", prepare);
    video.addEventListener("loadeddata", prepare);
    video.addEventListener("error", onError);
    video.load();

    if (video.readyState >= 1) prepare();

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", prepare);
      video.removeEventListener("loadeddata", prepare);
      video.removeEventListener("error", onError);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || reduced || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }
    /* Map scroll through hero to video timeline — discrete scene feel */
    const clamped = Math.min(Math.max(progress, 0), 0.98);
    const next = clamped * video.duration;
    if (Math.abs(video.currentTime - next) > 0.02) {
      video.currentTime = next;
    }
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[185vh] bg-[var(--ink)] md:h-[210vh]"
      aria-label="Ana görsel"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Video / poster background */}
        <div className="absolute inset-0">
          {!failed ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              preload="auto"
              poster="/images/asm-video-poster.jpg"
              aria-hidden
            >
              <source src="/videos/asm-hero.mp4" type="video/mp4" />
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/asm-video-poster.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <motion.div
            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,26,45,0.78)_0%,rgba(7,26,45,0.45)_42%,rgba(7,26,45,0.28)_100%)]"
            style={{ opacity: overlayOpacity }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/55 via-transparent to-[var(--ink)]/25"
            aria-hidden
          />

          {/* Soft blue atmosphere lights over video */}
          <AmbientLights variant="hero" className="z-[1]" />
        </div>

        <motion.div
          className="container-page relative z-10 flex h-full flex-col justify-center pt-[72px] pb-16 md:pt-[88px]"
          style={
            reduced
              ? undefined
              : { y: contentY, opacity: contentOpacity }
          }
        >
          <div className="max-w-3xl lg:max-w-4xl">
            <motion.p
              className="mb-5 text-[13px] font-semibold tracking-[0.2em] text-[var(--sky-blue)] uppercase md:mb-6"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
            >
              Ergani&apos;de sağlık hizmeti
            </motion.p>

            <HeroTitleReveal
              lines={["Sağlığınız için", "her zaman", "yanınızdayız."]}
              light
            />

            <ParagraphReveal
              className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/80 md:mt-8 md:text-[18px]"
              delay={0.85}
              text="Koruyucu sağlık hizmetleri, aile hekimliği uygulamaları ve danışmanlık desteğiyle size en yakın sağlık noktasındayız."
              glow
            />

            <motion.div
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-10"
              custom={1.12}
              initial={reduced ? false : "hidden"}
              animate="visible"
              variants={fadeItem}
            >
              <Button
                href="/hekimler"
                size="lg"
                magnetic={!mobile}
                className="min-w-[220px] !bg-white !text-[var(--ink)] hover:!bg-[var(--sky-blue)] sm:w-auto"
              >
                Hekimlerimizi Tanıyın
              </Button>
              <AnimatedLink
                href="/iletisim"
                className="min-h-11 text-[15px] !text-white hover:!text-[var(--sky-blue)]"
              >
                Merkeze Yol Tarifi
              </AnimatedLink>
            </motion.div>

            <motion.div
              className="mt-8 inline-flex items-center gap-2.5 text-[14px] text-white/75"
              custom={1.28}
              initial={reduced ? false : "hidden"}
              animate="visible"
              variants={fadeItem}
            >
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sage)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--sage)]" />
              </span>
              Bugün 08.00–17.00 arası açığız
            </motion.div>
          </div>

          {!ready && !failed && (
            <span className="sr-only">Arka plan videosu yükleniyor</span>
          )}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase">
            <span>Kaydırın</span>
            <span className="h-8 w-px origin-top bg-white/40 animate-[scrollCue_1.8s_ease-in-out_infinite]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
