"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Doctor } from "@/types";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { cn } from "@/lib/utils";

export function DoctorFilters({ doctors }: { doctors: Doctor[] }) {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState<string>("all");

  const units = useMemo(
    () =>
      Array.from(new Set(doctors.map((d) => d.unit))).sort((a, b) =>
        a.localeCompare(b, "tr"),
      ),
    [doctors],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    return doctors.filter((d) => {
      const matchesUnit = unit === "all" || d.unit === unit;
      const matchesQuery =
        !q ||
        d.name.toLocaleLowerCase("tr").includes(q) ||
        d.title.toLocaleLowerCase("tr").includes(q) ||
        d.unit.toLocaleLowerCase("tr").includes(q);
      return matchesUnit && matchesQuery;
    });
  }, [doctors, query, unit]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 border-b border-[var(--line)] pb-8 sm:flex-row sm:items-end">
        <label className="relative flex-1">
          <span className="sr-only">Hekim ara</span>
          <Search className="pointer-events-none absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 text-[var(--muted-text)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="İsim veya birim ara…"
            className="min-h-12 w-full border-0 border-b border-transparent bg-transparent py-3 pr-4 pl-7 text-[16px] text-[var(--ink)] outline-none transition focus:border-[var(--medical-blue)]"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={unit === "all"} onClick={() => setUnit("all")}>
            Tümü
          </FilterChip>
          {units.map((u) => (
            <FilterChip
              key={u}
              active={unit === u}
              onClick={() => setUnit(u)}
            >
              {u}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Hekim bulunamadı" />
      ) : (
        <StaggerContainer
          key={`${unit}-${query}`}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((doctor) => (
            <StaggerItem key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-10 border px-4 text-sm font-semibold transition-colors",
        active
          ? "border-[var(--deep-navy)] bg-[var(--deep-navy)] text-white"
          : "border-[var(--line)] bg-transparent text-[var(--ink)] hover:border-[var(--ink)]",
      )}
    >
      {children}
    </button>
  );
}
