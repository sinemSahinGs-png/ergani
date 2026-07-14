import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { contactInfo } from "@/data/contact";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="section-pad">
        <div className="container-page max-w-3xl">
          <SectionTitle title="Gizlilik Politikası" />
          <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-[var(--muted-text)]">
            <p>
              {contactInfo.institutionName}, web sitesi üzerinden paylaşılan
              kişisel verilerin korunmasına özen gösterir. İletişim formu
              aracılığıyla ilettiğiniz ad soyad, telefon, e-posta ve mesaj
              içeriği yalnızca talebinize yanıt vermek amacıyla kullanılır.
            </p>
            <p>
              Bu web sitesi üzerinden T.C. kimlik numarası, hasta dosyası,
              teşhis veya reçete bilgisi talep edilmez ve gönderilmemelidir.
            </p>
            <p>
              Sorularınız için:{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                className="font-semibold text-[var(--medical-blue)]"
              >
                {contactInfo.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
