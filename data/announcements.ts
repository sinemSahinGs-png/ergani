import type { Announcement } from "@/types";

export const announcements: Announcement[] = [
  {
    id: "1",
    slug: "bayram-tatili-calisma-duzeni",
    title: "Bayram Tatili Çalışma Düzeni Hakkında",
    excerpt:
      "Yaklaşan bayram tatilinde merkezimizin çalışma saatleri güncellenmiştir. Lütfen planlı başvurularınızı buna göre düzenleyiniz.",
    content: `Sayın vatandaşlarımız,

Yaklaşan bayram tatili nedeniyle aile sağlığı merkezimizin çalışma düzeni aşağıdaki şekilde güncellenmiştir:

• Resmî tatil günlerinde merkezimiz kapalı olacaktır.
• Tatil sonrası ilk iş günü normal çalışma saatlerimizle hizmete devam edilecektir.
• Acil durumlarda 112 Acil Çağrı Merkezi’ni arayınız.

Randevusu bulunan hastalara mümkün olduğunca önceden bilgi verilecektir. Anlayışınız için teşekkür ederiz.`,
    category: "tatil",
    categoryLabel: "Tatil",
    date: "2026-06-10",
    relatedIds: ["2", "3"],
  },
  {
    id: "2",
    slug: "asi-uygulama-gunleri",
    title: "Aşı Uygulama Günleri Hakkında Bilgilendirme",
    excerpt:
      "Çocukluk çağı aşıları ve erişkin aşı uygulamaları için belirlenen gün ve saatler güncellenmiştir.",
    content: `Sayın vatandaşlarımız,

Aşı uygulama hizmetlerimiz hafta içi her gün 08.30–11.30 ve 13.30–16.00 saatleri arasında sürdürülmektedir.

Bebek ve çocuk aşıları için peşin numara almanız, yoğunluğu azaltmaya yardımcı olur. Eksik aşılarınızı tamamlamak için aile hekiminize danışabilirsiniz.

Aşı kartınızı yanınızda bulundurmayı unutmayınız.`,
    category: "asi",
    categoryLabel: "Aşı",
    date: "2026-05-28",
    relatedIds: ["1", "3"],
  },
  {
    id: "3",
    slug: "rahim-agzi-kanseri-taramasi",
    title: "Rahim Ağzı Kanseri Taraması Hakkında",
    excerpt:
      "30–65 yaş arası kadınlar için rahim ağzı kanseri tarama hizmeti merkezimizde ücretsiz olarak sunulmaktadır.",
    content: `Sayın vatandaşlarımız,

Ulusal kanser tarama programı kapsamında 30–65 yaş arası kadınlara rahim ağzı kanseri taraması yapılmaktadır.

Randevu için aile hekiminize başvurabilir veya merkezimizin danışma biriminden bilgi alabilirsiniz. Tarama sonuçları size ve hekiminize bildirilir.

Erken teşhis hayat kurtarır. Düzenli tarama yaptırmanızı öneririz.`,
    category: "tarama",
    categoryLabel: "Tarama",
    date: "2026-05-15",
    relatedIds: ["2", "4"],
  },
  {
    id: "4",
    slug: "gebe-izlem-hatirlatma",
    title: "Gebe İzlem Randevuları Hakkında Hatırlatma",
    excerpt:
      "Gebe izlemleri planlı randevu ile yapılmaktadır. Takip takviminize uymanız sağlığınız için önemlidir.",
    content: `Sayın gebe hastalarımız,

Gebe izlemleri, anne ve bebek sağlığı açısından kritik öneme sahiptir. Planlı randevu saatlerinize gelmenizi önemle rica ederiz.

Randevu değişikliği için lütfen önceden merkezimizi arayınız. Acil durumlar (kanama, şiddetli ağrı, su gelmesi vb.) için vakit kaybetmeden 112’yi arayınız.`,
    category: "calisma-duzeni",
    categoryLabel: "Çalışma Düzeni",
    date: "2026-04-22",
    relatedIds: ["3", "5"],
  },
  {
    id: "5",
    slug: "kan-alma-saatleri-guncelleme",
    title: "Kan Alma Saatleri Güncellemesi",
    excerpt:
      "Laboratuvar kan alma işlemleri sabah saatlerinde yoğunlaşmaktadır. Güncel saatler duyurulmuştur.",
    content: `Sayın vatandaşlarımız,

Kan alma işlemleri Pazartesi–Cuma günleri 08.00–10.30 saatleri arasında yapılmaktadır.

Aç karnına gelmeniz gereken tetkikler için bir gece öncesinden yeme-içme kurallarına uymanız gerekmektedir. Ayrıntılı bilgi için aile hekiminize danışınız.`,
    category: "genel",
    categoryLabel: "Genel",
    date: "2026-04-08",
    relatedIds: ["1", "2"],
  },
];
