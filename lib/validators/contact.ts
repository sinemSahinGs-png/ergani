import { z } from "zod";

export const contactFormSchema = z.object({
  adSoyad: z
    .string()
    .min(2, "Ad soyad en az 2 karakter olmalıdır.")
    .max(100, "Ad soyad çok uzun."),
  telefon: z
    .string()
    .min(10, "Geçerli bir telefon numarası giriniz.")
    .max(20, "Telefon numarası çok uzun.")
    .regex(/^[0-9+\s()-]+$/, "Geçerli bir telefon numarası giriniz."),
  eposta: z.string().email("Geçerli bir e-posta adresi giriniz."),
  konu: z
    .string()
    .min(3, "Konu en az 3 karakter olmalıdır.")
    .max(120, "Konu çok uzun."),
  mesaj: z
    .string()
    .min(10, "Mesajınız en az 10 karakter olmalıdır.")
    .max(2000, "Mesajınız çok uzun."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
