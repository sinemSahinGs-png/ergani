import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="editorial-label">404</p>
        <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4rem)] tracking-tight text-[var(--ink)]">
          Sayfa bulunamadı
        </h1>
        <p className="mt-4 max-w-md text-[var(--muted-text)]">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/">Ana Sayfa</Button>
          <Button href="/iletisim" variant="secondary">
            İletişim
          </Button>
        </div>
        <Link
          href="/duyurular"
          className="mt-8 text-sm font-semibold text-[var(--medical-blue)] hover:underline"
        >
          Duyurulara göz at
        </Link>
      </div>
    </PageShell>
  );
}
