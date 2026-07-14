import type { Metadata } from "next";
import {
  AlertTriangle,
  Baby,
  Clock,
  Droplets,
  HeartPulse,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import { workingHoursData } from "@/data/working-hours";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { HoursTodayClient } from "@/components/home/HoursTodayClient";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Çalışma Saatleri",
  description:
    "Ergani 1 No'lu Aile Sağlığı Merkezi haftalık çalışma saatleri, öğle arası ve özel hizmet saatleri.",
};

const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  syringe: Syringe,
  baby: Baby,
  "heart-pulse": HeartPulse,
};

export default function WorkingHoursPage() {
  return (
    <PageShell>
      <div className="section-pad">
        <div className="container-page">
          <FadeUp>
            <SectionTitle
              className="mb-12"
              eyebrow="Program"
              title="Çalışma Saatleri"
              subtitle="Haftalık çalışma düzeni, özel hizmet saatleri ve resmi tatil bilgilendirmesi."
            />
          </FadeUp>

          <div className="grid gap-10 lg:grid-cols-12">
            <FadeUp className="lg:col-span-7">
              <div className="overflow-hidden border border-[var(--line)] bg-white">
                <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--mist-blue)] px-6 py-4">
                  <Clock className="h-5 w-5 text-[var(--medical-blue)]" />
                  <h2 className="font-semibold text-[var(--ink)]">
                    Haftalık Çalışma Tablosu
                  </h2>
                </div>
                <HoursTodayClient weekly={workingHoursData.weekly} />
                <div className="border-t border-[var(--line)] px-6 py-4 text-[15px] text-[var(--muted-text)]">
                  Öğle arası:{" "}
                  <strong className="text-[var(--ink)]">
                    {workingHoursData.lunchBreak}
                  </strong>
                </div>
              </div>
            </FadeUp>

            <FadeUp className="lg:col-span-5" delay={0.1}>
              <div className="border border-[var(--line)] bg-[var(--soft-sage)]/40 p-6">
                <div className="mb-2 flex items-center gap-2 font-semibold text-[var(--ink)]">
                  <AlertTriangle className="h-5 w-5 text-[var(--color-warning)]" />
                  Resmî tatiller
                </div>
                <p className="text-[15px] text-[var(--muted-text)]">
                  {workingHoursData.holidayNote}
                </p>
              </div>
              <p className="mt-5 text-sm text-[var(--muted-text)]">
                {workingHoursData.disclaimer}
              </p>
            </FadeUp>
          </div>

          <div className="mt-16">
            <FadeUp>
              <h2 className="mb-8 font-serif text-3xl tracking-tight text-[var(--ink)]">
                Özel Hizmet Saatleri
              </h2>
            </FadeUp>
            <StaggerContainer className="grid gap-0 sm:grid-cols-2">
              {workingHoursData.specialServices.map((item) => {
                const Icon = iconMap[item.icon] ?? Clock;
                return (
                  <StaggerItem key={item.id}>
                    <article className="border border-[var(--line)] bg-white p-6 transition-colors hover:bg-[var(--mist-blue)]/50">
                      <Icon
                        className="mb-4 h-5 w-5 text-[var(--medical-blue)]"
                        aria-hidden
                      />
                      <h3 className="font-serif text-xl text-[var(--ink)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-[var(--medical-blue)]">
                        {item.hours}
                      </p>
                      <p className="mt-2 text-sm text-[var(--muted-text)]">
                        {item.description}
                      </p>
                    </article>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
