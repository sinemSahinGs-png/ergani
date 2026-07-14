"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { HealthArticle, HealthGuideCategory } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

const categories: { value: HealthGuideCategory | "all"; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "bebek-sagligi", label: "Bebek Sağlığı" },
  { value: "gebelik", label: "Gebelik" },
  { value: "asilar", label: "Aşılar" },
  { value: "kronik-hastaliklar", label: "Kronik Hastalıklar" },
  { value: "saglikli-beslenme", label: "Sağlıklı Beslenme" },
  { value: "kanser-taramalari", label: "Kanser Taramaları" },
  { value: "sigara-birakma", label: "Sigara Bırakma" },
  { value: "koruyucu-saglik", label: "Koruyucu Sağlık" },
];

export function HealthGuideList({ articles }: { articles: HealthArticle[] }) {
  const [category, setCategory] = useState<HealthGuideCategory | "all">("all");

  const filtered = useMemo(
    () =>
      category === "all"
        ? articles
        : articles.filter((a) => a.category === category),
    [articles, category],
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setCategory(c.value)}
            className={cn(
              "min-h-10 border px-4 text-sm font-semibold transition-colors",
              category === c.value
                ? "border-[var(--deep-navy)] bg-[var(--deep-navy)] text-white"
                : "border-[var(--line)] text-[var(--ink)]",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="İçerik bulunamadı" />
      ) : (
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {filtered.map((article) => (
            <Link
              key={article.id}
              href={`/saglik-rehberi/${article.slug}`}
              className="group grid gap-4 py-8 transition-colors hover:bg-[var(--mist-blue)]/40 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:px-2"
            >
              <BookOpen
                className="hidden h-5 w-5 text-[var(--medical-blue)] sm:block"
                aria-hidden
              />
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[var(--medical-blue)] uppercase">
                  {article.categoryLabel}
                </p>
                <h2 className="mt-2 font-serif text-2xl tracking-tight text-[var(--ink)] transition-transform group-hover:translate-x-1.5 md:text-3xl">
                  {article.title}
                </h2>
                <p className="mt-2 max-w-2xl text-[15px] text-[var(--muted-text)]">
                  {article.summary}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-[var(--muted-text)]">
                <span>{article.readingTime} dk</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
