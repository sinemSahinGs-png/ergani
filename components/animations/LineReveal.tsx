"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { duration, easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function LineReveal({
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

  if (reduced || mobile) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: duration.standard,
          ease: easeOutExpo,
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function MaskReveal({
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
  const [safe, setSafe] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setSafe(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  if (reduced || mobile) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        animate={safe ? { y: 0, opacity: 1 } : undefined}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: duration.standard,
          ease: easeOutExpo,
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function DrawLine({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  if (reduced || mobile) {
    return <div className={cn("h-px bg-[var(--line)]", className)} />;
  }

  return (
    <motion.div
      className={cn("h-px origin-left bg-[var(--line)]", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: duration.editorial,
        ease: easeOutExpo,
        delay,
      }}
    />
  );
}

export function HorizontalMask({
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

  if (reduced || mobile) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: easeOutExpo,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
