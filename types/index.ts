export type Doctor = {
  id: string;
  slug: string;
  name: string;
  title: string;
  unit: string;
  unitNumber: number;
  bio: string;
  shortBio: string;
  workingDays: string[];
  workingHours: string;
  services: string[];
  image: string;
  initials: string;
};

export type AnnouncementCategory =
  | "calisma-duzeni"
  | "asi"
  | "tarama"
  | "genel"
  | "tatil";

export type Announcement = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: AnnouncementCategory;
  categoryLabel: string;
  date: string;
  relatedIds?: string[];
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type DaySchedule = {
  day: string;
  dayIndex: number;
  hours: string;
  isClosed: boolean;
  isLunch?: boolean;
  note?: string;
};

export type SpecialServiceHour = {
  id: string;
  title: string;
  hours: string;
  description: string;
  icon: string;
};

export type WorkingHoursData = {
  weekly: DaySchedule[];
  lunchBreak: string;
  specialServices: SpecialServiceHour[];
  holidayNote: string;
  disclaimer: string;
};

export type HealthGuideCategory =
  | "bebek-sagligi"
  | "gebelik"
  | "asilar"
  | "kronik-hastaliklar"
  | "saglikli-beslenme"
  | "kanser-taramalari"
  | "sigara-birakma"
  | "koruyucu-saglik";

export type HealthArticle = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: HealthGuideCategory;
  categoryLabel: string;
  readingTime: number;
  image?: string;
  publishedAt: string;
};

export type ContactInformation = {
  institutionName: string;
  shortName: string;
  address: {
    street: string;
    district: string;
    city: string;
    full: string;
  };
  phone: string;
  phoneHref: string;
  email: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  mhrsUrl: string;
  emergencyText: string;
  workingHoursSummary: string;
};

export type NavItem = {
  label: string;
  href: string;
};
