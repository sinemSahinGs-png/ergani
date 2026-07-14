"use client";

import { DrawLine } from "@/components/animations/LineReveal";

export function EditorialIntro() {
  return (
    <section className="section-pad relative overflow-hidden bg-[var(--ivory)]">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--mist-blue)]/35 to-[var(--soft-blue)]/25"
        aria-hidden
      />
      <div className="container-page relative">
        <p className="editorial-label mb-6">Merkezimiz</p>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h2 className="section-title max-w-4xl">
              Sağlık hizmetine ulaşmanın sade, güvenli ve insani yolu.
            </h2>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4">
            <p className="text-[16px] leading-relaxed text-[var(--muted-text)] md:text-[18px]">
              Aile hekimliği, koruyucu uygulamalar ve danışmanlık desteğini tek
              bir yerde sunuyoruz. Anlaşılır bilgi, erişilebilir hizmet.
            </p>
          </div>
        </div>

        <DrawLine className="mt-10 mb-8 md:mt-14 md:mb-10" />

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          <p className="font-serif text-[clamp(1.65rem,5vw,2.5rem)] tracking-tight text-[var(--ink)]">
            8 temel koruyucu
            <br />
            sağlık hizmeti
          </p>
          <p className="font-serif text-[clamp(1.65rem,5vw,2.5rem)] tracking-tight text-[var(--ink)]">
            Hafta içi
            <br />
            kesintisiz hizmet
          </p>
        </div>
      </div>
    </section>
  );
}
