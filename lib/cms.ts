import { announcements } from "@/data/announcements";
import { doctors } from "@/data/doctors";
import { healthArticles } from "@/data/health-guide";
import type { Announcement, Doctor, HealthArticle } from "@/types";

/**
 * CMS adapter layer.
 * Currently returns local mock data.
 * Replace implementations with WordPress REST API (or another CMS) later.
 */

export async function getAnnouncements(): Promise<Announcement[]> {
  return [...announcements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getAnnouncementBySlug(
  slug: string,
): Promise<Announcement | undefined> {
  return announcements.find((item) => item.slug === slug);
}

export async function getDoctors(): Promise<Doctor[]> {
  return [...doctors].sort((a, b) => a.unitNumber - b.unitNumber);
}

export async function getDoctorBySlug(
  slug: string,
): Promise<Doctor | undefined> {
  return doctors.find((item) => item.slug === slug);
}

export async function getHealthArticles(): Promise<HealthArticle[]> {
  return [...healthArticles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getHealthArticleBySlug(
  slug: string,
): Promise<HealthArticle | undefined> {
  return healthArticles.find((item) => item.slug === slug);
}

export async function getLatestAnnouncements(
  count = 3,
): Promise<Announcement[]> {
  const all = await getAnnouncements();
  return all.slice(0, count);
}

export async function getRelatedAnnouncements(
  current: Announcement,
  count = 3,
): Promise<Announcement[]> {
  if (current.relatedIds?.length) {
    const related = announcements.filter((a) =>
      current.relatedIds?.includes(a.id),
    );
    if (related.length) return related.slice(0, count);
  }
  const all = await getAnnouncements();
  return all.filter((a) => a.id !== current.id).slice(0, count);
}

export async function getAdjacentAnnouncements(slug: string): Promise<{
  prev?: Announcement;
  next?: Announcement;
}> {
  const all = await getAnnouncements();
  const index = all.findIndex((a) => a.slug === slug);
  if (index === -1) return {};
  return {
    prev: all[index + 1],
    next: all[index - 1],
  };
}

export async function getAdjacentDoctors(slug: string): Promise<{
  prev?: Doctor;
  next?: Doctor;
}> {
  const all = await getDoctors();
  const index = all.findIndex((d) => d.slug === slug);
  if (index === -1) return {};
  return {
    prev: all[index - 1],
    next: all[index + 1],
  };
}

export async function getAdjacentHealthArticles(slug: string): Promise<{
  prev?: HealthArticle;
  next?: HealthArticle;
}> {
  const all = await getHealthArticles();
  const index = all.findIndex((a) => a.slug === slug);
  if (index === -1) return {};
  return {
    prev: all[index + 1],
    next: all[index - 1],
  };
}
