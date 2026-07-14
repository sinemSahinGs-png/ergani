import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Çerez Politikası",
};

export default function CookiePage() {
  return (
    <PageShell>
      <div className="section-pad">
        <div className="container-page max-w-3xl">
          <SectionTitle title="Çerez Politikası" />
          <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-[var(--muted-text)]">
            <p>
              Bu web sitesi, temel işlevsellik ve performans için zorunlu
              çerezler kullanabilir. Tercih ve analitik çerezler kullanılacaksa
              ayrıca bilgilendirme yapılır.
            </p>
            <p>
              Tarayıcı ayarlarından çerezleri yönetebilir veya silebilirsiniz.
              Zorunlu çerezlerin kapatılması bazı özelliklerin çalışmamasına
              neden olabilir.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
