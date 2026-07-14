import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Ergani 1 No'lu Aile Sağlığı Merkezi iletişim bilgileri, konum ve iletişim formu.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <div className="section-pad">
        <div className="container-page">
          <FadeUp>
            <SectionTitle
              className="mb-12"
              eyebrow="Ulaşım"
              title="İletişim"
              subtitle="Adres, telefon ve konum bilgileri. Genel sorularınız için iletişim formunu kullanabilirsiniz."
            />
          </FadeUp>

          <div className="grid gap-12 lg:grid-cols-12">
            <FadeUp className="lg:col-span-5">
              <ul className="space-y-5 text-[16px]">
                <li className="flex gap-3 text-[var(--muted-text)]">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--medical-blue)]" />
                  {contactInfo.address.full}
                </li>
                <li>
                  <a
                    href={contactInfo.phoneHref}
                    className="inline-flex items-center gap-3 font-semibold text-[var(--ink)] hover:text-[var(--medical-blue)]"
                  >
                    <Phone className="h-4 w-4 text-[var(--medical-blue)]" />
                    {contactInfo.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="inline-flex items-center gap-3 text-[var(--muted-text)] hover:text-[var(--medical-blue)]"
                  >
                    <Mail className="h-4 w-4 text-[var(--medical-blue)]" />
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex gap-3 text-[var(--muted-text)]">
                  <Clock className="mt-1 h-4 w-4 shrink-0 text-[var(--medical-blue)]" />
                  {contactInfo.workingHoursSummary}
                </li>
              </ul>

              <div className="mt-8">
                <Button href={contactInfo.mapsUrl} external magnetic>
                  Yol Tarifi Al
                </Button>
              </div>

              <p className="mt-10 border-l-2 border-[var(--emergency)] pl-4 text-[15px] text-[var(--muted-text)]">
                <span className="font-semibold text-[var(--emergency)]">
                  Acil durumlarda
                </span>{" "}
                112 Acil Çağrı Merkezi&apos;ni arayınız.
              </p>

              <div className="mt-10 overflow-hidden rounded-tl-[var(--radius-hero)] rounded-br-[var(--radius-hero)] border border-[var(--line)]">
                <div className="relative aspect-[16/10]">
                  <iframe
                    title="Harita"
                    src={contactInfo.mapsEmbedUrl}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </FadeUp>

            <FadeUp className="lg:col-span-7" delay={0.1}>
              <div className="border border-[var(--line)] bg-white p-6 md:p-10">
                <h2 className="font-serif text-2xl tracking-tight text-[var(--ink)] md:text-3xl">
                  İletişim Formu
                </h2>
                <p className="mt-2 mb-8 text-[15px] text-[var(--muted-text)]">
                  Mesajınızı iletin; size en kısa sürede dönüş yapılacaktır.
                </p>
                <ContactForm />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
