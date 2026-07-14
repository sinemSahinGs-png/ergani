import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animations/FadeUp";
import { PageShell } from "@/components/layout/PageShell";
import { getHealthArticles } from "@/lib/cms";
import { HealthGuideList } from "@/components/announcements/HealthGuideList";

export const metadata: Metadata = {
  title: "Sağlık Rehberi",
  description:
    "Bebek sağlığı, gebelik, aşılar, kronik hastalıklar ve koruyucu sağlık hakkında bilgilendirme içerikleri.",
};

export default async function HealthGuidePage() {
  const articles = await getHealthArticles();

  return (
    <PageShell>
      <div className="section-pad">
        <div className="container-page">
          <FadeUp>
            <SectionTitle
              className="mb-12"
              eyebrow="Bilgi"
              title="Sağlık Rehberi"
              subtitle="Koruyucu sağlık ve sağlıklı yaşam hakkında genel bilgilendirme içerikleri. Kişisel tıbbi değerlendirme yerine geçmez."
            />
          </FadeUp>
          <HealthGuideList articles={articles} />
        </div>
      </div>
    </PageShell>
  );
}
