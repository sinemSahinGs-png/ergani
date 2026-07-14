import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnnouncementFilters } from "@/components/announcements/AnnouncementFilters";
import { FadeUp } from "@/components/animations/FadeUp";
import { PageShell } from "@/components/layout/PageShell";
import { getAnnouncements } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Duyurular",
  description:
    "Ergani 1 No'lu Aile Sağlığı Merkezi güncel duyuruları: çalışma düzeni, aşı ve tarama bilgilendirmeleri.",
};

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <PageShell>
      <div className="section-pad">
        <div className="container-page">
          <FadeUp>
            <SectionTitle
              className="mb-12"
              eyebrow="Bilgilendirme"
              title="Duyurular"
              subtitle="Çalışma düzeni, aşı uygulamaları ve merkezimizle ilgili duyurular."
            />
          </FadeUp>
          <AnnouncementFilters announcements={announcements} />
        </div>
      </div>
    </PageShell>
  );
}
