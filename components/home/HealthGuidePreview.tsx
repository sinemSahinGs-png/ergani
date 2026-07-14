"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HealthArticle } from "@/types";
import { Button } from "@/components/ui/Button";

export function HealthGuidePreview({
  articles,
}: {
  articles: HealthArticle[];
}) {
  const [featured, ...rest] = articles;
  if (!featured) return null;
  const support = rest.slice(0, 3);

  return (
    <section className="section-pad bg-[var(--mist-blue)]">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-label mb-3">Bilgi</p>
            <h2 className="section-title">Sağlık Rehberi</h2>
          </div>
          <Button href="/saglik-rehberi" variant="secondary">
            Tüm içerikler
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Link
              href={`/saglik-rehberi/${featured.slug}`}
              className="group block"
            >
              <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#bfd8ff_0%,#eaf3ff_50%,#e7efea_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.55),transparent_55%)]" />
                <span className="absolute top-4 left-4 bg-white/85 px-3 py-1 text-xs font-semibold text-[var(--ink)] backdrop-blur-sm">
                  {featured.categoryLabel}
                </span>
                <span className="absolute right-4 bottom-4 font-serif text-4xl text-[var(--ink)]/10 md:text-6xl">
                  Rehber
                </span>
              </div>
              <h3 className="font-serif text-[clamp(1.5rem,5vw,2.75rem)] leading-tight tracking-tight text-[var(--ink)]">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-xl text-[16px] text-[var(--muted-text)]">
                {featured.summary}
              </p>
              <p className="mt-2 text-sm text-[var(--muted-text)]">
                {featured.readingTime} dk okuma
              </p>
            </Link>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            {support.map((article) => (
              <Link
                key={article.id}
                href={`/saglik-rehberi/${article.slug}`}
                className="group flex items-start justify-between gap-4 border-b border-[var(--line)] py-5 first:border-t"
              >
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-[var(--medical-blue)] uppercase">
                    {article.categoryLabel}
                  </p>
                  <h3 className="mt-2 font-serif text-[clamp(1.15rem,3.5vw,1.65rem)] leading-snug tracking-tight text-[var(--ink)] transition-transform group-hover:translate-x-1">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted-text)]">
                    {article.readingTime} dk
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--ink)]/30" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
