import {
  Baby,
  Calendar,
  HeartPulse,
  Info,
  Syringe,
  Megaphone,
} from "lucide-react";
import type { AnnouncementCategory } from "@/types";

export function CategoryIcon({
  category,
  className = "h-5 w-5",
}: {
  category: AnnouncementCategory;
  className?: string;
}) {
  switch (category) {
    case "asi":
      return <Syringe className={className} aria-hidden />;
    case "tarama":
      return <HeartPulse className={className} aria-hidden />;
    case "tatil":
      return <Calendar className={className} aria-hidden />;
    case "calisma-duzeni":
      return <Baby className={className} aria-hidden />;
    case "genel":
    default:
      return <Megaphone className={className} aria-hidden />;
  }
}

export function InfoIconFallback() {
  return <Info className="h-5 w-5" aria-hidden />;
}
