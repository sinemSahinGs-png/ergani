"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { duration, easeOutExpo, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const viewport = { once: true, amount: 0.12 } as const;

export function StaggerContainer({
  children,
  className,
  delay = 0.04,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [force, setForce] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setForce(true), 500);
    return () => window.clearTimeout(t);
  }, []);

  if (reduced || mobile) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      animate={force ? "visible" : undefined}
      viewport={viewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger.fast,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  if (reduced || mobile) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: duration.standard, ease: easeOutExpo },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
