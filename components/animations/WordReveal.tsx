"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { duration, easeOutExpo, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function HeroTitleReveal({
  lines,
  highlight = "yanınızdayız.",
  className,
}: {
  lines: string[];
  highlight?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  if (reduced || mobile) {
    return (
      <h1 className={cn("hero-title", className)}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line.split(" ").map((word, wi) => {
              const clean = word.replace(/[.,]/g, "");
              const isHi =
                clean.toLocaleLowerCase("tr") ===
                highlight.replace(/[.,]/g, "").toLocaleLowerCase("tr");
              return (
                <span key={wi}>
                  <span
                    className={
                      isHi ? "relative text-[var(--medical-blue)] italic" : undefined
                    }
                  >
                    {word}
                    {isHi && (
                      <span
                        className="absolute -bottom-1 left-0 h-[2px] w-full bg-[var(--medical-blue)]/45"
                        aria-hidden
                      />
                    )}
                  </span>
                  {wi < line.split(" ").length - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 className={cn("hero-title", className)}>
      {lines.map((line, li) => (
        <motion.span
          key={li}
          className="block overflow-hidden pb-1"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.35 + li * 0.18,
                staggerChildren: stagger.standard,
              },
            },
          }}
        >
          {line.split(" ").map((word, wi) => {
            const clean = word.replace(/[.,]/g, "");
            const isHi =
              clean.toLocaleLowerCase("tr") ===
              highlight.replace(/[.,]/g, "").toLocaleLowerCase("tr");
            return (
              <span key={wi} className="inline-block whitespace-pre">
                <motion.span
                  className={cn(
                    "inline-block",
                    isHi && "relative text-[var(--medical-blue)] italic",
                  )}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: duration.hero,
                        ease: easeOutExpo,
                        delay: isHi ? 0.08 : 0,
                      },
                    },
                  }}
                >
                  {word}
                  {isHi && (
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[2px] w-full bg-[var(--medical-blue)]/50"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        delay: 1.2,
                        duration: 0.45,
                        ease: easeOutExpo,
                      }}
                      style={{ originX: 0 }}
                      aria-hidden
                    />
                  )}
                </motion.span>
                {wi < line.split(" ").length - 1 ? " " : ""}
              </span>
            );
          })}
        </motion.span>
      ))}
    </h1>
  );
}

export function WordReveal({
  text,
  className,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [safe, setSafe] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const t = window.setTimeout(() => setSafe(true), 500);
    return () => window.clearTimeout(t);
  }, []);

  if (reduced || mobile) {
    return <Tag className={cn(className)}>{text}</Tag>;
  }

  return (
    <Tag className={cn(className)}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        animate={safe ? "visible" : undefined}
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: stagger.fast },
          },
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden whitespace-pre align-bottom"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "90%", opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: duration.standard,
                    ease: easeOutExpo,
                  },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
