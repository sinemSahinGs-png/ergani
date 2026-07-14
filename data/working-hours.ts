import type { WorkingHoursData } from "@/types";

export const workingHoursData: WorkingHoursData = {
  weekly: [
    { day: "Pazartesi", dayIndex: 1, hours: "08.00–17.00", isClosed: false },
    { day: "Salı", dayIndex: 2, hours: "08.00–17.00", isClosed: false },
    { day: "Çarşamba", dayIndex: 3, hours: "08.00–17.00", isClosed: false },
    { day: "Perşembe", dayIndex: 4, hours: "08.00–17.00", isClosed: false },
    { day: "Cuma", dayIndex: 5, hours: "08.00–17.00", isClosed: false },
    { day: "Cumartesi", dayIndex: 6, hours: "Kapalı", isClosed: true },
    { day: "Pazar", dayIndex: 0, hours: "Kapalı", isClosed: true },
  ],
  lunchBreak: "12.00–13.00",
  specialServices: [
    {
      id: "1",
      title: "Kan Alma Saatleri",
      hours: "08.00–10.30",
      description: "Laboratuvar numune alma işlemleri sabah saatlerinde yapılır.",
      icon: "droplets",
    },
    {
      id: "2",
      title: "Aşı Uygulama Saatleri",
      hours: "08.30–11.30 / 13.30–16.00",
      description: "Çocuk ve erişkin aşı uygulamaları için uygun saat aralıkları.",
      icon: "syringe",
    },
    {
      id: "3",
      title: "Bebek İzlem Saatleri",
      hours: "09.00–12.00 / 13.30–16.00",
      description: "Bebek büyüme-gelişme izlemleri planlı randevu ile yapılır.",
      icon: "baby",
    },
    {
      id: "4",
      title: "Gebe İzlem Saatleri",
      hours: "09.00–12.00 / 13.30–16.00",
      description: "Gebe takibi için randevulu başvuru önerilir.",
      icon: "heart-pulse",
    },
  ],
  holidayNote:
    "Resmî tatillerde merkezimiz kapalıdır. Güncel tatil duyuruları için Duyurular sayfasını takip ediniz.",
  disclaimer:
    "Çalışma saatleri resmî tatillerde ve özel durumlarda değişiklik gösterebilir. Güncel duyuruları kontrol ediniz.",
};
