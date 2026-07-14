import { Hero } from "@/components/home/Hero";
import { InfoStrip } from "@/components/home/QuickInfo";
import { EditorialIntro } from "@/components/home/EditorialIntro";
import { AnnouncementsPreview } from "@/components/home/AnnouncementsPreview";
import { ServicesSection } from "@/components/home/ServicesSection";
import { DoctorsPreview } from "@/components/home/DoctorsPreview";
import { HoursPreview } from "@/components/home/HoursPreview";
import { HealthGuidePreview } from "@/components/home/HealthGuidePreview";
import { ContactPreview } from "@/components/home/ContactPreview";
import { services } from "@/data/services";
import {
  getDoctors,
  getHealthArticles,
  getLatestAnnouncements,
} from "@/lib/cms";

export default async function HomePage() {
  const [announcements, doctors, articles] = await Promise.all([
    getLatestAnnouncements(3),
    getDoctors(),
    getHealthArticles(),
  ]);

  return (
    <>
      <Hero />
      <InfoStrip latestAnnouncement={announcements[0]} />
      <EditorialIntro />
      <ServicesSection services={services} />
      <DoctorsPreview doctors={doctors} />
      <AnnouncementsPreview announcements={announcements} />
      <HoursPreview />
      <HealthGuidePreview articles={articles} />
      <ContactPreview />
    </>
  );
}
