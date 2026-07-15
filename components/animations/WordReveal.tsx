"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

export function HeroTitleReveal({
  lines,
  highlight = "yanınızdayız.",
  className,
  light = false,
}: {
  lines: string[];
  highlight?: string;
  className?: string;
  light?: boolean;
}) {
  const reduced = useReducedMotion();
  const base = light ? "text-white" : "text-[var(--ink)]";
  const hi = light
    ? "relative text-[var(--sky-blue)] italic"
    : "relative text-[var(--medical-blue)] italic";
  const underline = light
    ? "bg-[var(--sky-blue)]/70"
    : "bg-[var(--medical-blue)]/55";

  if (reduced) {
    return (
      <h1 className={cn("hero-title", base, className)}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line.split(" ").map((word, wi) => {
              const isHi = isHighlight(word, highlight);
              return (
                <span key={wi}>
                  <span className={isHi ? hi : undefined}>
                    {word}
                    {isHi && (
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-[2px] w-full",
                          underline,
                        )}
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

  let wordIndex = 0;

  return (
    <h1 className={cn("hero-title", base, className)}>
      {lines.map((line, li) => (
        <span key={li} className="block pb-[0.06em]">
          {line.split(" ").map((word, wi) => {
            const isHi = isHighlight(word, highlight);
            const delay = 0.18 + wordIndex * 0.1;
            wordIndex += 1;
            return (
              <span key={wi} className="inline-block whitespace-pre">
                <motion.span
                  className={cn(
                    "inline-block will-change-[opacity,transform,filter]",
                    isHi && hi,
                  )}
                  initial={{
                    opacity: 0,
                    y: 22,
                    filter: "blur(10px)",
                    textShadow: light
                      ? "0 0 0 rgba(191,216,255,0)"
                      : "0 0 0 rgba(37,99,235,0)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    textShadow: light
                      ? [
                          "0 0 0 rgba(191,216,255,0)",
                          "0 0 28px rgba(191,216,255,0.65)",
                          "0 0 12px rgba(191,216,255,0.2)",
                        ]
                      : [
                          "0 0 0 rgba(37,99,235,0)",
                          "0 0 28px rgba(37,99,235,0.55)",
                          "0 0 8px rgba(37,99,235,0.12)",
                        ],
                  }}
                  transition={{
                    duration: 0.95,
                    ease: easeOutExpo,
                    delay,
                  }}
                >
                  {word}
                  {isHi && (
                    <motion.span
                      className={cn(
                        "absolute -bottom-[0.12em] left-0 h-[2px] w-full origin-left",
                        underline,
                      )}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{
                        delay: delay + 0.4,
                        duration: 0.7,
                        ease: easeOutExpo,
                      }}
                      aria-hidden
                    />
                  )}
                </motion.span>
                {wi < line.split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function isHighlight(word: string, highlight: string) {
  const clean = word.replace(/[.,]/g, "");
  return (
    clean.toLocaleLowerCase("tr") ===
    highlight.replace(/[.,]/g, "").toLocaleLowerCase("tr")
  );
}

/** Word-by-word fade + soft blue light for headings and body copy */
export function WordReveal({
  text,
  className,
  as: Tag = "h2",
  glow = true,
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: Tag;
  glow?: boolean;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={cn(className)}>{text}</Tag>;
  }

  return (
    <Tag className={cn(className)}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.07,
              delayChildren: delay,
            },
          },
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block whitespace-pre align-bottom"
          >
            <motion.span
              className="inline-block will-change-[opacity,transform,filter]"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                  filter: "blur(8px)",
                  textShadow: "0 0 0 rgba(37,99,235,0)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  textShadow: glow
                    ? [
                        "0 0 0 rgba(37,99,235,0)",
                        "0 0 22px rgba(37,99,235,0.45)",
                        "0 0 0 rgba(37,99,235,0)",
                      ]
                    : "0 0 0 rgba(37,99,235,0)",
                  transition: {
                    duration: 0.85,
                    ease: easeOutExpo,
                  },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Multi-line body with word stagger */
export function ParagraphReveal({
  text,
  className,
  delay = 0,
  glow = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  glow?: boolean;
}) {
  return (
    <WordReveal
      text={text}
      as="p"
      className={className}
      glow={glow}
      delay={delay}
    />
  );
}
