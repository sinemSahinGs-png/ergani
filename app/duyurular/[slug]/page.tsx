import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAdjacentAnnouncements,
  getAnnouncementBySlug,
  getAnnouncements,
  getRelatedAnnouncements,
} from "@/lib/cms";
import { formatDateTR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AnnouncementCard } from "@/components/ui/AnnouncementCard";
import { FadeUp } from "@/components/animations/FadeUp";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { PageShell } from "@/components/layout/PageShell";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await getAnnouncements();
  return items.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getAnnouncementBySlug(slug);
  if (!item) return { title: "Duyuru bulunamadı" };
  return { title: item.title, description: item.excerpt };
}

export default async function AnnouncementDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getAnnouncementBySlug(slug);
  if (!item) notFound();

  const [{ prev, next }, related] = await Promise.all([
    getAdjacentAnnouncements(slug),
    getRelatedAnnouncements(item, 3),
  ]);

  return (
    <PageShell>
    <div className="section-pad">
      <article className="container-page max-w-3xl">
        <FadeUp>
          <nav className="mb-6 text-sm text-[var(--muted-text)]" aria-label="Sayfa yolu">
            <Link href="/" className="hover:text-[var(--medical-blue)]">
              Ana Sayfa
            </Link>
            <span className="mx-2">/</span>
            <Link href="/duyurular" className="hover:text-[var(--medical-blue)]">
              Duyurular
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-navy)] line-clamp-1">
              {item.title}
            </span>
          </nav>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-soft-blue)] px-3 py-1 text-xs font-semibold text-[var(--color-medical)]">
              <CategoryIcon category={item.category} className="h-3.5 w-3.5" />
              {item.categoryLabel}
            </span>
            <time className="text-sm text-[var(--color-text-gray)]">
              {formatDateTR(item.date)}
            </time>
          </div>
          <h1 className="text-balance text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
            {item.title}
          </h1>
          <div className="prose-asm mt-8 whitespace-pre-line text-[16px] leading-relaxed text-[var(--color-text-gray)]">
            {item.content}
          </div>
        </FadeUp>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--line)] pt-6 sm:flex-row sm:justify-between">
          {prev ? (
            <Button href={`/duyurular/${prev.slug}`} variant="secondary">
              ← Önceki
            </Button>
          ) : (
            <span />
          )}
          {next ? (
            <Button href={`/duyurular/${next.slug}`} variant="secondary">
              Sonraki
            </Button>
          ) : null}
        </div>
      </article>

      {related.length > 0 && (
        <div className="container-page mt-14 max-w-5xl">
          <h2 className="mb-6 font-serif text-2xl tracking-tight text-[var(--ink)]">
            İlgili duyurular
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <AnnouncementCard key={r.id} announcement={r} variant="card" />
            ))}
          </div>
        </div>
      )}
    </div>
    </PageShell>
  );
}
