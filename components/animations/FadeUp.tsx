"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { duration, easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const viewport = { once: true, amount: 0.15 } as const;

function useRevealSafety(ms = 600) {
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
  const safe = useRevealSafety(700);
  const move = y ?? (mobile ? 16 : 24);

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: move }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={safe ? { opacity: 1, y: 0 } : undefined}
      viewport={viewport}
      transition={{
        duration: mobile ? 0.45 : duration.standard,
        ease: easeOutExpo,
        delay: mobile ? Math.min(delay, 0.15) : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const safe = useRevealSafety(700);

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
        duration: mobile ? 0.4 : duration.standard,
        delay: mobile ? Math.min(delay, 0.12) : delay,
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
  const mobile = useIsMobile();
  const safe = useRevealSafety(700);

  if (reduced || mobile) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={safe ? { opacity: 1, scale: 1 } : undefined}
      viewport={viewport}
      transition={{ duration: duration.standard, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}
