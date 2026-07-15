"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type MediaFallbackType = "doctor" | "health" | "map" | "hero";

type Props = {
  type: MediaFallbackType;
  label?: string;
  src?: string;
  alt?: string;
  aspectRatio?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Premium media shell: shows designed fallback, swaps to real media when available.
 */
export function MediaFallback({
  type,
  label,
  src,
  alt = "",
  aspectRatio = "4 / 5",
  className,
  children,
}: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-[var(--mist-blue)]",
        className,
      )}
      style={aspectRatio === "auto" ? undefined : { aspectRatio }}
    >
      <div className="absolute inset-0" aria-hidden>
        <FallbackArt type={type} label={label} />
      </div>

      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 z-[1] h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}

      {children && <div className="absolute inset-0 z-[2]">{children}</div>}
    </div>
  );
}

function FallbackArt({
  type,
  label,
}: {
  type: MediaFallbackType;
  label?: string;
}) {
  if (type === "doctor") return <DoctorFallback label={label} />;
  if (type === "health") return <HealthFallback label={label} />;
  if (type === "map") return <MapFallback label={label} />;
  return <HeroFallback label={label} />;
}

function Grain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

function DoctorFallback({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(155deg,#9bb6d6_0%,#d7e6f6_38%,#f2f0e8_72%,#e8efe9_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_18%,rgba(255,255,255,0.75),transparent_52%)]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 500"
        fill="none"
        aria-hidden
      >
        {/* coat / torso */}
        <path
          d="M95 500 C95 360 120 300 200 300 C280 300 305 360 305 500"
          fill="rgba(255,255,255,0.72)"
        />
        <path
          d="M150 320 C165 360 175 390 180 500 M250 320 C235 360 225 390 220 500"
          stroke="rgba(11,41,71,0.08)"
          strokeWidth="1.5"
        />
        {/* shoulders */}
        <path
          d="M110 340 C70 390 55 450 48 500 M290 340 C330 390 345 450 352 500"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="28"
          strokeLinecap="round"
        />
        {/* head silhouette */}
        <ellipse cx="200" cy="210" rx="58" ry="70" fill="rgba(11,41,71,0.12)" />
        <ellipse cx="200" cy="205" rx="48" ry="58" fill="rgba(11,41,71,0.08)" />
        {/* medical lapel accent */}
        <path
          d="M188 350 L200 420 L212 350"
          stroke="rgba(37,99,235,0.35)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <Grain />
      {label && (
        <div className="absolute right-5 bottom-5 left-5">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-[var(--ink)]/45 uppercase">
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

function HealthFallback({ label }: { label?: string }) {
  const word = (label ?? "REHBER").toLocaleUpperCase("tr").slice(0, 14);
  return (
    <div className="absolute inset-0 bg-[linear-gradient(145deg,#9ec0ef_0%,#d5e6fb_42%,#eaf3ff_68%,#e7efea_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_35%,rgba(255,255,255,0.72),transparent_55%)]" />
      <svg
        className="absolute inset-0 h-full w-full opacity-55"
        viewBox="0 0 640 400"
        fill="none"
        aria-hidden
      >
        <circle cx="420" cy="120" r="70" stroke="rgba(11,41,71,0.14)" strokeWidth="1.25" />
        <circle cx="420" cy="120" r="38" stroke="rgba(37,99,235,0.28)" strokeWidth="1.25" />
        <path
          d="M80 280 C160 220 220 300 300 250 C380 200 430 280 560 230"
          stroke="rgba(11,41,71,0.18)"
          strokeWidth="1.5"
        />
        <path
          d="M100 310 C190 255 250 320 340 275"
          stroke="rgba(123,156,139,0.45)"
          strokeWidth="1.25"
        />
        <path
          d="M405 105 H435 M420 90 V135"
          stroke="rgba(37,99,235,0.45)"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
      </svg>
      <p
        className="pointer-events-none absolute right-3 bottom-5 font-serif text-[clamp(3.25rem,13vw,5.5rem)] leading-none tracking-tight text-[var(--ink)]/[0.1]"
        aria-hidden
      >
        {word}
      </p>
      <Grain />
      {label && (
        <span className="absolute top-4 left-4 bg-white/90 px-3 py-1.5 text-[12px] font-semibold tracking-[0.12em] text-[var(--ink)] uppercase backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}

function MapFallback({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(180deg,#e8eef5_0%,#f4f7fb_55%,#ebe8df_100%)]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 520"
        fill="none"
        aria-hidden
      >
        <path d="M0 140 H800" stroke="rgba(11,41,71,0.06)" strokeWidth="10" />
        <path d="M0 280 H800" stroke="rgba(11,41,71,0.05)" strokeWidth="14" />
        <path d="M0 400 H800" stroke="rgba(11,41,71,0.05)" strokeWidth="8" />
        <path d="M180 0 V520" stroke="rgba(11,41,71,0.05)" strokeWidth="12" />
        <path d="M420 0 V520" stroke="rgba(37,99,235,0.12)" strokeWidth="16" />
        <path d="M640 0 V520" stroke="rgba(11,41,71,0.05)" strokeWidth="10" />
        <path
          d="M80 420 C180 360 260 300 420 250 C520 220 600 180 720 140"
          stroke="rgba(37,99,235,0.35)"
          strokeWidth="2"
          strokeDasharray="6 8"
        />
        <path
          d="M400 210 C400 210 360 260 360 290 C360 320 380 340 400 340 C420 340 440 320 440 290 C440 260 400 210 400 210 Z"
          fill="var(--medical-blue)"
        />
        <circle cx="400" cy="288" r="10" fill="white" />
      </svg>
      <Grain />
      {label && (
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
          <p className="max-w-[70%] text-[14px] font-semibold text-[var(--ink)]">
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

function HeroFallback({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(150deg,#7f9bc4_0%,#c5d8ef_40%,#e7efea_72%,#f7f5ef_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(255,255,255,0.85),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_85%,rgba(123,156,139,0.3),transparent_50%)]" />
      <Grain />
      {label && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--ink)]/45 via-[var(--ink)]/10 to-transparent p-5 pt-16 md:p-7">
          <span className="mb-2 block h-0.5 w-10 bg-[var(--medical-blue)]" />
          <p className="font-serif text-2xl tracking-tight text-white md:text-3xl">
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

export function MapStage({
  embedUrl,
  mapsUrl,
  label,
  className,
}: {
  embedUrl: string;
  mapsUrl: string;
  label: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-[var(--line)] bg-[var(--mist-blue)]",
        "rounded-tl-[28px] rounded-br-[28px] md:rounded-tl-[var(--radius-hero)] md:rounded-br-[var(--radius-hero)]",
        className,
      )}
    >
      <div className="relative aspect-[16/11] min-h-[240px] w-full">
        <MediaFallback
          type="map"
          label={label}
          aspectRatio="16 / 11"
          className="!aspect-auto absolute inset-0 h-full w-full"
        />
        <iframe
          title={`${label} konumu`}
          src={embedUrl}
          className={cn(
            "absolute inset-0 z-[1] h-full w-full border-0 transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
          )}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-3 bg-gradient-to-t from-[var(--ink)]/40 via-[var(--ink)]/15 to-transparent p-4 pt-16 md:p-5 md:pt-20">
          <p className="max-w-[55%] text-[13px] font-semibold text-white/90 md:text-[14px]">
            {label}
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white px-4 text-[13px] font-semibold text-[var(--ink)] transition-transform active:scale-[0.97] md:text-[14px]"
          >
            Google Haritalar&apos;da Aç
          </a>
        </div>
      </div>
    </div>
  );
}
