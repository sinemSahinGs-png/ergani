import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Info } from "lucide-react";
import {
  getAdjacentDoctors,
  getDoctorBySlug,
  getDoctors,
} from "@/lib/cms";
import { Button } from "@/components/ui/Button";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { FadeUp } from "@/components/animations/FadeUp";
import { PageShell } from "@/components/layout/PageShell";
import { contactInfo } from "@/data/contact";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const doctors = await getDoctors();
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) return { title: "Hekim bulunamadı" };
  return { title: doctor.name, description: doctor.shortBio };
}

export default async function DoctorDetailPage({ params }: Props) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) notFound();
  const { prev, next } = await getAdjacentDoctors(slug);

  return (
    <PageShell>
      <div className="section-pad">
        <div className="container-page max-w-5xl">
          <FadeUp>
            <nav
              className="mb-8 text-sm text-[var(--muted-text)]"
              aria-label="Sayfa yolu"
            >
              <Link href="/" className="hover:text-[var(--medical-blue)]">
                Ana Sayfa
              </Link>
              <span className="mx-2">/</span>
              <Link href="/hekimler" className="hover:text-[var(--medical-blue)]">
                Hekimlerimiz
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--ink)]">{doctor.name}</span>
            </nav>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="grid overflow-hidden border border-[var(--line)] bg-white md:grid-cols-[320px_1fr]">
              <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[480px]">
                <MediaFallback
                  type="doctor"
                  src={doctor.image}
                  alt={`${doctor.name} portresi`}
                  label={doctor.unit}
                  aspectRatio="auto"
                  className="!aspect-auto absolute inset-0 h-full w-full"
                />
              </div>
              <div className="p-8 md:p-12">
                <p className="text-xs font-semibold tracking-[0.16em] text-[var(--medical-blue)] uppercase">
                  {doctor.unit}
                </p>
                <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight text-[var(--ink)]">
                  {doctor.name}
                </h1>
                <p className="mt-2 text-[var(--muted-text)]">{doctor.title}</p>
                <p className="mt-6 text-[17px] leading-relaxed text-[var(--muted-text)]">
                  {doctor.bio}
                </p>

                <div className="mt-8 flex items-start gap-3 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted-text)]">
                  <Clock className="mt-0.5 h-4 w-4 text-[var(--medical-blue)]" />
                  <div>
                    <p className="font-semibold text-[var(--ink)]">
                      Çalışma programı
                    </p>
                    <p>
                      {doctor.workingDays.join(", ")} · {doctor.workingHours}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="mb-3 text-xs font-semibold tracking-[0.16em] text-[var(--muted-text)] uppercase">
                    Hizmet alanları
                  </h2>
                  <ul className="flex flex-wrap gap-2">
                    {doctor.services.map((s) => (
                      <li
                        key={s}
                        className="border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--ink)]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex gap-3 border-l-2 border-[var(--color-warning)] pl-4 text-sm text-[var(--muted-text)]">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-warning)]" />
                  <p>
                    Hekimlere ait kişisel telefon numaraları paylaşılmaz.
                    Bilgi için:{" "}
                    <a
                      href={contactInfo.phoneHref}
                      className="font-semibold text-[var(--medical-blue)]"
                    >
                      {contactInfo.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-between">
            {prev ? (
              <Button href={`/hekimler/${prev.slug}`} variant="secondary">
                ← {prev.name}
              </Button>
            ) : (
              <span />
            )}
            {next ? (
              <Button href={`/hekimler/${next.slug}`} variant="secondary">
                {next.name}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
