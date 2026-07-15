"use client";

import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { Button } from "@/components/ui/Button";
import { MapStage } from "@/components/ui/MediaFallback";
import { AmbientLights } from "@/components/ui/AmbientLights";
import { SectionIndex } from "@/components/ui/MotionBits";
import { WordReveal } from "@/components/animations/WordReveal";

export function ContactPreview() {
  return (
    <section className="section-pad relative overflow-hidden bg-white/70">
      <AmbientLights variant="section" />
      <div className="section-rule absolute inset-x-0 top-0" aria-hidden />
      <div className="container-page relative z-[2] grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionIndex index="07" label="İletişim" />
          <WordReveal
            as="h2"
            className="section-title"
            text="Bize ulaşmak birkaç saniye."
          />

          <ul className="mt-8 space-y-4">
            <li className="flex gap-3 text-[16px] leading-relaxed text-[var(--muted-text)]">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--medical-blue)]" />
              {contactInfo.address.full}
            </li>
            <li>
              <a
                href={contactInfo.phoneHref}
                className="inline-flex min-h-11 items-center gap-3 text-[17px] font-semibold text-[var(--ink)] hover:text-[var(--medical-blue)]"
              >
                <Phone className="h-4 w-4 text-[var(--medical-blue)]" />
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex gap-3 text-[16px] text-[var(--muted-text)]">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-[var(--medical-blue)]" />
              {contactInfo.workingHoursSummary}
            </li>
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex min-h-11 items-center gap-3 text-[16px] text-[var(--muted-text)] hover:text-[var(--medical-blue)]"
              >
                <Mail className="h-4 w-4 text-[var(--medical-blue)]" />
                {contactInfo.email}
              </a>
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={contactInfo.mapsUrl} external>
              Yol Tarifi Al
            </Button>
            <Button
              href={contactInfo.phoneHref}
              variant="secondary"
              showArrow={false}
            >
              Bizi Ara
            </Button>
          </div>

          <p className="mt-8 text-[14px] leading-relaxed text-[var(--muted-text)]">
            Acil durumlarda 112 Acil Çağrı Merkezi&apos;ni arayınız.
          </p>
        </div>

        <div className="lg:col-span-7">
          <MapStage
            embedUrl={contactInfo.mapsEmbedUrl}
            mapsUrl={contactInfo.mapsUrl}
            label={contactInfo.shortName}
          />
        </div>
      </div>
    </section>
  );
}
