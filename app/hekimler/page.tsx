import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { DoctorFilters } from "@/components/doctors/DoctorFilters";
import { FadeUp } from "@/components/animations/FadeUp";
import { PageShell } from "@/components/layout/PageShell";
import { getDoctors } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Hekimlerimiz",
  description:
    "Ergani 1 No'lu Aile Sağlığı Merkezi'nde görev yapan aile hekimleri ve birim bilgileri.",
};

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <PageShell>
      <div className="section-pad">
        <div className="container-page">
          <FadeUp>
            <SectionTitle
              className="mb-12"
              index="01"
              eyebrow="Ekibimiz"
              title="Hekimlerimiz"
              subtitle="Merkezimizde görev yapan aile hekimlerimizi birim ve çalışma bilgileriyle inceleyebilirsiniz. Kişisel telefon numaraları paylaşılmaz; iletişim için merkezimizi arayınız."
            />
          </FadeUp>
          <DoctorFilters doctors={doctors} />
        </div>
      </div>
    </PageShell>
  );
}
