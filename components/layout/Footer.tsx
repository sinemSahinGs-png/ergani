import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { footerQuickLinks } from "@/data/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[var(--deep-navy)] text-white">
      <div
        className="pointer-events-none absolute top-10 right-[-5%] font-serif text-[clamp(4rem,18vw,14rem)] leading-none text-white/[0.04] select-none"
        aria-hidden
      >
        ASM
      </div>

      <div className="container-page border-t border-white/15 pt-16 pb-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="font-serif text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-tight text-white">
              Ergani 1 No&apos;lu
              <br />
              Aile Sağlığı Merkezi
            </p>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/60">
              Koruyucu sağlık hizmetleri ve aile hekimliği uygulamalarıyla
              Ergani&apos;de yanınızdayız.
            </p>
            <p className="mt-6 text-sm text-white/45">
              Acil durumlarda 112 Acil Çağrı Merkezi&apos;ni arayınız.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-white/45 uppercase">
              Navigasyon
            </p>
            <ul className="space-y-3">
              {footerQuickLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-white/45 uppercase">
              İletişim
            </p>
            <ul className="space-y-3 text-[15px] text-white/70">
              <li>{contactInfo.address.full}</li>
              <li>
                <a
                  href={contactInfo.phoneHref}
                  className="transition-colors hover:text-white"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>Pzt–Cum · 08.00–17.00</li>
              <li>
                <a
                  href={contactInfo.mhrsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--sky-blue)] hover:underline"
                >
                  MHRS
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {contactInfo.institutionName}
          </p>
          <div className="flex gap-5">
            <Link href="/gizlilik" className="hover:text-white">
              Gizlilik
            </Link>
            <Link href="/cerez-politikasi" className="hover:text-white">
              Çerezler
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
