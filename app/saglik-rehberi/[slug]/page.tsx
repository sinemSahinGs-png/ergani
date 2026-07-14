import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import {
  getAdjacentHealthArticles,
  getHealthArticleBySlug,
  getHealthArticles,
} from "@/lib/cms";
import { formatDateTR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { PageShell } from "@/components/layout/PageShell";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await getHealthArticles();
  return items.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getHealthArticleBySlug(slug);
  if (!item) return { title: "İçerik bulunamadı" };
  return { title: item.title, description: item.summary };
}

export default async function HealthArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = await getHealthArticleBySlug(slug);
  if (!item) notFound();

  const { prev, next } = await getAdjacentHealthArticles(slug);

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
            <Link
              href="/saglik-rehberi"
              className="hover:text-[var(--medical-blue)]"
            >
              Sağlık Rehberi
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-navy)]">{item.title}</span>
          </nav>
        </FadeUp>

        <FadeUp delay={0.08}>
          <span className="text-xs font-semibold tracking-wide text-[var(--color-medical)] uppercase">
            {item.categoryLabel}
          </span>
          <h1 className="mt-2 text-balance text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
            {item.title}
          </h1>
          <p className="mt-3 text-sm text-[var(--color-text-gray)]">
            {formatDateTR(item.publishedAt)} · {item.readingTime} dk okuma
          </p>
          <div className="mt-8 whitespace-pre-line text-[16px] leading-relaxed text-[var(--color-text-gray)]">
            {item.content}
          </div>

          <aside className="mt-10 border-l-2 border-[var(--emergency)] pl-4 text-[15px] text-[var(--muted-text)]">
            <div className="mb-1 flex items-center gap-2 font-semibold text-[var(--emergency)]">
              <AlertTriangle className="h-4 w-4" />
              Tıbbi uyarı
            </div>
            Bu içerik genel bilgilendirme amacı taşır ve kişisel tıbbi
            değerlendirme yerine geçmez. Acil durumlarda 112&apos;yi arayınız.
          </aside>
        </FadeUp>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--line)] pt-6 sm:flex-row sm:justify-between">
          {prev ? (
            <Button href={`/saglik-rehberi/${prev.slug}`} variant="secondary">
              ← Önceki
            </Button>
          ) : (
            <span />
          )}
          {next ? (
            <Button href={`/saglik-rehberi/${next.slug}`} variant="secondary">
              Sonraki
            </Button>
          ) : null}
        </div>
      </article>
    </div>
    </PageShell>
  );
}
