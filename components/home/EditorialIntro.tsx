"use client";

import { motion } from "framer-motion";
import { WordReveal, ParagraphReveal } from "@/components/animations/WordReveal";
import { DrawLine } from "@/components/animations/LineReveal";
import { AmbientLights } from "@/components/ui/AmbientLights";
import { SectionIndex } from "@/components/ui/MotionBits";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const facts = [
  "8 temel koruyucu sağlık hizmeti",
  "Hafta içi 08.00–17.00",
];

export function EditorialIntro() {
  const reduced = useReducedMotion();

  return (
    <section className="section-pad relative overflow-hidden bg-white/70">
      <AmbientLights variant="section" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--line)]"
        aria-hidden
      />
      <div className="container-page relative z-[2]">
        <SectionIndex index="01" label="Merkezimiz" />

        <WordReveal
          as="h2"
          className="section-title max-w-4xl text-balance"
          text="Sağlık hizmetine ulaşmanın sade, güvenli ve insani yolu."
        />

        <ParagraphReveal
          className="body-intro mt-6 max-w-xl"
          delay={0.15}
          text="Aile hekimliği, koruyucu uygulamalar ve danışmanlık desteğini tek bir yerde sunuyoruz. Anlaşılır bilgi, erişilebilir hizmet."
        />

        <DrawLine className="mt-9 mb-8 md:mt-12 md:mb-10" />

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
          {facts.map((fact, i) => (
            <motion.div
              key={fact}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.75,
                delay: 0.1 + i * 0.12,
                ease: easeOutExpo,
              }}
            >
              <WordReveal
                as="p"
                className="font-serif text-[clamp(1.5rem,5vw,2.35rem)] leading-tight tracking-tight text-[var(--ink)]"
                text={fact}
                delay={0.05 * i}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
