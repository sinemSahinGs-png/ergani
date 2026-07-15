"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const viewport = { once: true, amount: 0.18 } as const;

function useRevealSafety(ms = 900) {
  const [safe, setSafe] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setSafe(true), ms);
    return () => window.clearTimeout(t);
  }, [ms]);
  return safe;
}

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function FadeUp({ children, className, delay = 0, y }: Props) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const safe = useRevealSafety(1000);
  const move = y ?? (mobile ? 18 : 26);

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: move, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      animate={safe ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      viewport={viewport}
      transition={{
        duration: mobile ? 0.7 : 0.9,
        ease: easeOutExpo,
        delay: mobile ? Math.min(delay, 0.2) : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const safe = useRevealSafety(1000);

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      animate={safe ? { opacity: 1 } : undefined}
      viewport={viewport}
      transition={{
        duration: mobile ? 0.55 : 0.75,
        delay: mobile ? Math.min(delay, 0.15) : delay,
        ease: easeOutExpo,
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const safe = useRevealSafety(1000);

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      animate={safe ? { opacity: 1, scale: 1, filter: "blur(0px)" } : undefined}
      viewport={viewport}
      transition={{ duration: 0.95, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}
