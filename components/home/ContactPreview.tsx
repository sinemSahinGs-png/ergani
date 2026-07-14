"use client";

import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { Button } from "@/components/ui/Button";

export function ContactPreview() {
  return (
    <section className="section-pad bg-[var(--ivory)]">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="editorial-label mb-4">İletişim</p>
          <h2 className="section-title">
            Bize ulaşmak
            <br />
            birkaç saniye.
          </h2>

          <ul className="mt-8 space-y-4">
            <li className="flex gap-3 text-[16px] text-[var(--muted-text)]">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--medical-blue)]" />
              {contactInfo.address.full}
            </li>
            <li>
              <a
                href={contactInfo.phoneHref}
                className="inline-flex min-h-11 items-center gap-3 text-[16px] font-semibold text-[var(--ink)] hover:text-[var(--medical-blue)]"
              >
                <Phone className="h-4 w-4 text-[var(--medical-blue)]" />
                {contactInfo.phone}
              </a>
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
            <li className="flex gap-3 text-[16px] text-[var(--muted-text)]">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-[var(--medical-blue)]" />
              {contactInfo.workingHoursSummary}
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

          <p className="mt-8 border-l-2 border-[var(--emergency)] pl-4 text-[15px] text-[var(--muted-text)]">
            <span className="font-semibold text-[var(--emergency)]">
              Acil durumlarda
            </span>{" "}
            112 Acil Çağrı Merkezi&apos;ni arayınız.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-tl-[28px] rounded-br-[28px] border border-[var(--line)] bg-[var(--mist-blue)] md:rounded-tl-[var(--radius-hero)] md:rounded-br-[var(--radius-hero)]">
            <div className="relative aspect-[16/11] min-h-[240px] w-full">
              <iframe
                title="Ergani 1 No'lu Aile Sağlığı Merkezi konumu"
                src={contactInfo.mapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
