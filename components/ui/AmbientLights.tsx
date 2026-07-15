"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Orb = {
  className: string;
  color: string;
  duration: number;
  delay: number;
};

const orbs: Orb[] = [
  {
    className: "top-[-10%] left-[-8%] h-[46vw] max-h-[520px] w-[46vw] max-w-[520px]",
    color: "rgba(37, 99, 235, 0.38)",
    duration: 6.5,
    delay: 0,
  },
  {
    className: "top-[28%] right-[-12%] h-[40vw] max-h-[460px] w-[40vw] max-w-[460px]",
    color: "rgba(96, 165, 250, 0.42)",
    duration: 8.2,
    delay: 1.1,
  },
  {
    className: "bottom-[-8%] left-[22%] h-[36vw] max-h-[400px] w-[36vw] max-w-[400px]",
    color: "rgba(59, 130, 246, 0.28)",
    duration: 7.4,
    delay: 0.5,
  },
  {
    className: "top-[55%] left-[55%] h-[28vw] max-h-[300px] w-[28vw] max-w-[300px]",
    color: "rgba(147, 197, 253, 0.35)",
    duration: 9,
    delay: 2,
  },
];

/** Soft blue circular lights — fixed site-wide atmosphere */
export function PageAtmosphere() {
  const reduced = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {orbs.map((orb, i) =>
        reduced ? (
          <div
            key={i}
            className={cn("absolute rounded-full blur-[90px]", orb.className)}
            style={{ background: orb.color, opacity: 0.35 }}
          />
        ) : (
          <motion.div
            key={i}
            className={cn("absolute rounded-full blur-[90px]", orb.className)}
            style={{ background: orb.color }}
            initial={{ opacity: 0.25, scale: 0.92 }}
            animate={{
              opacity: [0.22, 0.78, 0.3, 0.7, 0.22],
              scale: [1, 1.18, 0.96, 1.12, 1],
              x: [0, 24, -12, 18, 0],
              y: [0, -18, 14, -8, 0],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ),
      )}
    </div>
  );
}

/** Section-local lights (extra intensity inside a section) */
export function AmbientLights({
  className,
  variant = "section",
}: {
  className?: string;
  variant?: "page" | "section" | "hero";
}) {
  const reduced = useReducedMotion();

  const local =
    variant === "hero"
      ? [
          {
            className: "top-[10%] left-[5%] h-[50vw] max-h-[420px] w-[50vw] max-w-[420px]",
            color: "rgba(96, 165, 250, 0.45)",
            duration: 5.5,
            delay: 0,
          },
          {
            className: "bottom-[5%] right-[0%] h-[42vw] max-h-[360px] w-[42vw] max-w-[360px]",
            color: "rgba(37, 99, 235, 0.4)",
            duration: 7,
            delay: 0.8,
          },
        ]
      : [
          {
            className: "top-[-5%] right-[-5%] h-[42vw] max-h-[380px] w-[42vw] max-w-[380px]",
            color: "rgba(59, 130, 246, 0.32)",
            duration: 6.8,
            delay: 0.2,
          },
          {
            className: "bottom-[-10%] left-[-5%] h-[38vw] max-h-[340px] w-[38vw] max-w-[340px]",
            color: "rgba(147, 197, 253, 0.4)",
            duration: 8,
            delay: 1.2,
          },
        ];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {local.map((orb, i) =>
        reduced ? (
          <div
            key={i}
            className={cn("absolute rounded-full blur-[80px]", orb.className)}
            style={{ background: orb.color, opacity: 0.4 }}
          />
        ) : (
          <motion.div
            key={i}
            className={cn("absolute rounded-full blur-[80px]", orb.className)}
            style={{ background: orb.color }}
            animate={{
              opacity: [0.28, 0.85, 0.35, 0.75, 0.28],
              scale: [1, 1.2, 1.05, 1.15, 1],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ),
      )}
    </div>
  );
}
