import type { ContactInformation } from "@/types";

export const contactInfo: ContactInformation = {
  institutionName: "Ergani 1 No'lu Aile Sağlığı Merkezi",
  shortName: "Ergani 1 No'lu ASM",
  address: {
    street: "Camikebir Mah. Sağlık Cad. No: 12",
    district: "Ergani",
    city: "Diyarbakır",
    full: "Camikebir Mah. Sağlık Cad. No: 12, Ergani / Diyarbakır",
  },
  phone: "0 (412) 123 45 67",
  phoneHref: "tel:+904121234567",
  email: "ergani1asm@saglik.gov.tr",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Ergani+1+Nolu+Aile+Sagligi+Merkezi",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Ergani%20Diyarbak%C4%B1r&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mhrsUrl: "https://www.mhrs.gov.tr",
  emergencyText: "Acil durumlarda 112 Acil Çağrı Merkezi'ni arayınız.",
  workingHoursSummary: "Pazartesi–Cuma 08.00–17.00 (Öğle arası 12.00–13.00)",
};
