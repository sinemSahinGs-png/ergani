import type { HealthArticle } from "@/types";

export const healthArticles: HealthArticle[] = [
  {
    id: "1",
    slug: "bebek-izlemlerinin-onemi",
    title: "Bebek İzlemlerinin Önemi",
    summary:
      "Düzenli bebek izlemleri büyüme, gelişme ve aşı takibi için kritik bir koruyucu sağlık hizmetidir.",
    content: `Bebek izlemleri, sağlıklı büyüme ve gelişmenin izlenmesi, aşıların zamanında yapılması ve olası sorunların erken fark edilmesi için düzenli olarak yapılır.

Aile hekiminiz; boy, kilo, baş çevresi ölçümleri yapar, gelişim basamaklarını değerlendirir ve sizi bilgilendirir. İzlem randevularına düzenli katılım, bebek sağlığı açısından büyük önem taşır.

Herhangi bir endişeniz olduğunda beklemeden aile hekiminize başvurunuz.`,
    category: "bebek-sagligi",
    categoryLabel: "Bebek Sağlığı",
    readingTime: 4,
    image: "/images/health/baby-health.jpg",
    publishedAt: "2026-03-12",
  },
  {
    id: "2",
    slug: "gebelikte-duzenli-kontroller",
    title: "Gebelikte Düzenli Kontroller",
    summary:
      "Gebe izlemleri anne ve bebek sağlığını korumak için planlı aralıklarla yapılmalıdır.",
    content: `Gebelik döneminde düzenli kontroller; anne ve bebeğin sağlığının izlenmesi, risklerin erken tespiti ve gebeliğin sağlıklı ilerlemesi için gereklidir.

Aile sağlığı merkezinde gebe izlemleri planlı randevu ile yürütülür. Demir ve vitamin desteği, beslenme önerileri ve doğum hazırlığı konularında bilgilendirme yapılır.

Kanama, şiddetli karın ağrısı veya su gelmesi gibi acil belirtilerde 112’yi arayınız.`,
    category: "gebelik",
    categoryLabel: "Gebelik",
    readingTime: 5,
    image: "/images/health/baby-health.jpg",
    publishedAt: "2026-03-05",
  },
  {
    id: "3",
    slug: "asilar-hakkinda-bilmeniz-gerekenler",
    title: "Aşılar Hakkında Bilmeniz Gerekenler",
    summary:
      "Aşılar, bulaşıcı hastalıklara karşı bireyi ve toplumu koruyan en etkili yöntemlerden biridir.",
    content: `Ulusal aşı takvimi, çocukluk çağından itibaren uygulanan aşıları kapsar. Eksik aşılar tamamlanarak bağışıklık güçlendirilir.

Erişkinlerde influenza, tetanoz ve diğer önerilen aşılar da aile hekimi değerlendirmesiyle uygulanabilir. Aşı kartınızı saklamanız takip kolaylığı sağlar.

Aşı sonrası hafif ateş veya lokal şişlik görülebilir; şiddetli reaksiyonlarda hekiminize başvurunuz.`,
    category: "asilar",
    categoryLabel: "Aşılar",
    readingTime: 4,
    image: "/images/health/vaccination.jpg",
    publishedAt: "2026-02-20",
  },
  {
    id: "4",
    slug: "hipertansiyon-ve-diyabet-takibi",
    title: "Hipertansiyon ve Diyabet Takibi",
    summary:
      "Kronik hastalıkların düzenli izlemi komplikasyon riskini azaltır ve yaşam kalitesini artırır.",
    content: `Hipertansiyon ve diyabet gibi kronik hastalıklar düzenli tansiyon/şeker ölçümü, ilaç uyumu ve yaşam tarzı düzenlemeleri ile yönetilir.

Aile hekiminiz tetkiklerinizi planlar, ilaçlarınızı gözden geçirir ve beslenme–egzersiz önerileri sunar. Kontrolleri aksatmamak önemlidir.

Ani göğüs ağrısı, bilinç bulanıklığı veya çok yüksek–çok düşük şeker belirtilerinde acil yardım alın.`,
    category: "kronik-hastaliklar",
    categoryLabel: "Kronik Hastalıklar",
    readingTime: 5,
    image: "/images/health/chronic-disease.jpg",
    publishedAt: "2026-02-10",
  },
  {
    id: "5",
    slug: "saglikli-beslenme-ipuclari",
    title: "Sağlıklı Beslenme İpuçları",
    summary:
      "Dengeli beslenme; kilo yönetimi, kronik hastalık riskinin azaltılması ve enerji dengesi için temeldir.",
    content: `Sağlıklı beslenme; sebze, meyve, tam tahıl, yeterli protein ve sağlıklı yağları içeren dengeli bir tabak düzenini ifade eder.

Şekerli içecekler, aşırı tuz ve işlenmiş gıdaların azaltılması önerilir. Bol su tüketimi ve düzenli öğünler destekleyicidir.

Özel diyet gerektiren durumlarda aile hekiminize danışınız; kişiye özel tıbbi diyet bu içeriğin yerini tutmaz.`,
    category: "saglikli-beslenme",
    categoryLabel: "Sağlıklı Beslenme",
    readingTime: 3,
    publishedAt: "2026-01-28",
  },
  {
    id: "6",
    slug: "kanser-taramalari-neden-onemli",
    title: "Kanser Taramaları Neden Önemli?",
    summary:
      "Erken teşhis imkanı sunan taramalar, tedavi şansını artırır ve ücretsiz olarak sunulabilir.",
    content: `Ulusal kanser tarama programları; meme, rahim ağzı ve kolon kanseri için belirli yaş gruplarında önerilir.

Tarama sonucu olağan dışı bulunursa ileri tetkik için yönlendirilirsiniz. Düzenli tarama hayat kurtarabilir.

Tarama uygunluğunuz için aile hekiminize başvurunuz.`,
    category: "kanser-taramalari",
    categoryLabel: "Kanser Taramaları",
    readingTime: 4,
    publishedAt: "2026-01-15",
  },
  {
    id: "7",
    slug: "sigara-birakma-destegi",
    title: "Sigara Bırakma Desteği",
    summary:
      "Sigarayı bırakmak için doğru yöntem ve düzenli takip başarı şansını artırır.",
    content: `Sigara bırakma danışmanlığı; motivasyon, yöntem seçimi ve takip sürecini kapsar. Aile hekiminiz size uygun yaklaşımı birlikte planlayabilir.

Nikotin yerine koyma tedavileri veya diğer destekler tıbbi değerlendirme ile ele alınır. Bırakma sürecinde çevrenizin desteği önemlidir.

İlk günler zorlayıcı olabilir; planlı randevularla süreci sürdürmek faydalıdır.`,
    category: "sigara-birakma",
    categoryLabel: "Sigara Bırakma",
    readingTime: 4,
    publishedAt: "2026-01-08",
  },
  {
    id: "8",
    slug: "koruyucu-saglik-hizmetleri",
    title: "Koruyucu Sağlık Hizmetleri",
    summary:
      "Hastalık ortaya çıkmadan önce alınan önlemler, sağlıklı yaşamın temelidir.",
    content: `Koruyucu sağlık; aşılar, tarama programları, sağlıklı yaşam danışmanlığı ve risk faktörlerinin yönetimi gibi hizmetleri kapsar.

Aile sağlığı merkezi, birinci basamakta koruyucu hizmetlerin sunulduğu temel kurumdur. Düzenli kontroller ihmal edilmemelidir.

Kişisel sağlık kararlarınızı aile hekiminizle birlikte planlayınız.`,
    category: "koruyucu-saglik",
    categoryLabel: "Koruyucu Sağlık",
    readingTime: 3,
    publishedAt: "2025-12-20",
  },
];
