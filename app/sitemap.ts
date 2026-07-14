import type { MetadataRoute } from "next";
import { announcements } from "@/data/announcements";
import { doctors } from "@/data/doctors";
import { healthArticles } from "@/data/health-guide";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  const staticRoutes = [
    "",
    "/hekimler",
    "/calisma-saatleri",
    "/duyurular",
    "/saglik-rehberi",
    "/iletisim",
    "/gizlilik",
    "/cerez-politikasi",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const doctorRoutes = doctors.map((d) => ({
    url: `${base}/hekimler/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const announcementRoutes = announcements.map((a) => ({
    url: `${base}/duyurular/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const articleRoutes = healthArticles.map((a) => ({
    url: `${base}/saglik-rehberi/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...doctorRoutes,
    ...announcementRoutes,
    ...articleRoutes,
  ];
}
