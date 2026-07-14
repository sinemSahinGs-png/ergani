"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Announcement, AnnouncementCategory } from "@/types";
import { AnnouncementCard } from "@/components/ui/AnnouncementCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 4;

const categoryOptions: { value: AnnouncementCategory | "all"; label: string }[] =
  [
    { value: "all", label: "Tümü" },
    { value: "calisma-duzeni", label: "Çalışma Düzeni" },
    { value: "asi", label: "Aşı" },
    { value: "tarama", label: "Tarama" },
    { value: "tatil", label: "Tatil" },
    { value: "genel", label: "Genel" },
  ];

export function AnnouncementFilters({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<AnnouncementCategory | "all">(
    "all",
  );
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    return announcements.filter((a) => {
      const matchesCat = category === "all" || a.category === category;
      const matchesQuery =
        !q ||
        a.title.toLocaleLowerCase("tr").includes(q) ||
        a.excerpt.toLocaleLowerCase("tr").includes(q);
      return matchesCat && matchesQuery;
    });
  }, [announcements, query, category]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Duyuru ara</span>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--color-text-gray)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Duyuru ara…"
            className="min-h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white py-3 pr-4 pl-10 text-[15px] shadow-[var(--shadow-sm)] outline-none focus:border-[var(--color-medical)] focus:ring-2 focus:ring-[var(--color-medical)]/20"
          />
        </label>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categoryOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              setCategory(opt.value);
              setVisible(PAGE_SIZE);
            }}
            className={cn(
              "min-h-10 rounded-full px-4 text-sm font-semibold transition-colors",
              category === opt.value
                ? "bg-[var(--color-medical)] text-white"
                : "border border-[var(--color-border)] bg-white text-[var(--color-navy)]",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <EmptyState
          title="Duyuru bulunamadı"
          description="Farklı bir arama veya kategori deneyiniz."
        />
      ) : (
        <>
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid gap-4 sm:grid-cols-2"
            >
              {shown.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnnouncementCard announcement={item} variant="card" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {visible < filtered.length && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="min-h-12 rounded-[var(--radius-md)] border border-[var(--color-medical)]/40 bg-white px-6 font-semibold text-[var(--color-medical)] transition hover:bg-[var(--color-soft-blue)]"
              >
                Daha fazla göster
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
