"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { duration, easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const viewport = { once: true, amount: 0.15 } as const;

export function SlideLeft({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [safe, setSafe] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setSafe(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  if (reduced || mobile) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      animate={safe ? { opacity: 1, x: 0 } : undefined}
      viewport={viewport}
      transition={{ duration: duration.standard, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SlideRight({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [safe, setSafe] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setSafe(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  if (reduced || mobile) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      animate={safe ? { opacity: 1, x: 0 } : undefined}
      viewport={viewport}
      transition={{ duration: duration.standard, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  if (reduced || mobile) {
    return <div className={cn(className)}>{children}</div>;
  }
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport}
      transition={{ duration: duration.standard, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}
